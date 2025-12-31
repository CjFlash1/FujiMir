import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { join } from "path";
import crypto from "crypto";
import sharp from "sharp";
import busboy from "busboy";

// Force Node.js to not parse body (though App Router ignores this mostly, middleware might respect it)
// Note: App Router handles body parsing automatically or via Request methods.
// We don't need 'export const config' for bodyParser: false in App Router.;

// === VALIDATION CONFIG ===
const ALLOWED_MIME_TYPES = [
    // Standard web formats
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/avif',
    // Other common formats
    'image/bmp', 'image/x-ms-bmp', 'image/tiff', 'image/x-tiff',
    // Apple formats (Sharp supports HEIC/HEIF natively)
    'image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence',
    // Vector (will be rasterized by Sharp)
    'image/svg+xml',
    // Icons
    'image/x-icon', 'image/vnd.microsoft.icon',
    // Archives
    'application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/vnd.rar', 'application/x-7z-compressed',
];

const ALLOWED_EXTENSIONS = [
    // Standard web
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif',
    // Common
    '.bmp', '.tiff', '.tif',
    // Apple
    '.heic', '.heif',
    // Vector
    '.svg',
    // Icons
    '.ico',
    // Archives
    '.zip', '.rar', '.7z',
];

const ARCHIVE_EXTENSIONS = ['.zip', '.rar', '.7z'];
const ARCHIVE_MIME_TYPES = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/vnd.rar',
    'application/x-7z-compressed',
];

const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100 MB for images
// Archives are effectively unlimited (streamed), but we can set a sanity limit if needed.

// Magic bytes signatures for common image formats
const IMAGE_SIGNATURES: { bytes: number[]; offset?: number; mask?: number[] }[] = [
    { bytes: [0xFF, 0xD8, 0xFF] },                          // JPEG
    { bytes: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A] }, // PNG
    { bytes: [0x47, 0x49, 0x46, 0x38] },                    // GIF
    { bytes: [0x42, 0x4D] },                                // BMP
    { bytes: [0x49, 0x49, 0x2A, 0x00] },                    // TIFF (little-endian)
    { bytes: [0x4D, 0x4D, 0x00, 0x2A] },                    // TIFF (big-endian)
    { bytes: [0x00, 0x00, 0x01, 0x00] },                    // ICO
    { bytes: [0x49, 0x49, 0x52, 0x4F] },                    // ORF (Olympus)
];

function isValidImageSignature(buffer: Buffer, mimeType: string, extension: string): boolean {
    for (const sig of IMAGE_SIGNATURES) {
        const offset = sig.offset || 0;
        if (buffer.length < offset + sig.bytes.length) continue;
        let match = true;
        for (let i = 0; i < sig.bytes.length; i++) {
            if (buffer[offset + i] !== sig.bytes[i]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    // HEIC/HEIF/AVIF (ftyp box)
    if (buffer.length > 12) {
        const ftypCheck = buffer.toString('ascii', 4, 8);
        if (ftypCheck === 'ftyp') {
            const brand = buffer.toString('ascii', 8, 12).toLowerCase();
            if (['heic', 'heix', 'hevc', 'mif1', 'avif', 'avis', 'msf1'].includes(brand)) {
                return true;
            }
        }
    }
    // WebP
    if (buffer.length > 12) {
        const riff = buffer.toString('ascii', 0, 4);
        const webp = buffer.toString('ascii', 8, 12);
        if (riff === 'RIFF' && webp === 'WEBP') return true;
    }
    // SVG
    if (extension === '.svg' || mimeType === 'image/svg+xml') {
        const start = buffer.toString('utf8', 0, Math.min(1000, buffer.length));
        if (start.includes('<svg') || start.includes('<?xml')) return true;
    }
    return false;
}

function isJpegFile(buffer: Buffer): boolean {
    return buffer.length >= 3 && buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
}

function sanitizeFilename(name: string): string {
    const translitMap: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
        'я': 'ya', 'і': 'i', 'ї': 'yi', 'є': 'ye', 'ґ': 'g',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'G', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
        'Я': 'Ya', 'Ya': 'I', 'Ї': 'Yi', 'Є': 'Ye', 'Ґ': 'G'
    };
    let result = name.split('').map(char => translitMap[char] || char).join('');
    result = result.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
    return result;
}

export async function POST(req: Request) {
    // Check for Chunked Upload Headers
    const uploadId = req.headers.get('x-upload-id');
    const chunkIndexStr = req.headers.get('x-chunk-index');
    const totalChunksStr = req.headers.get('x-total-chunks');
    const fileNameHeader = req.headers.get('x-file-name') ? decodeURIComponent(req.headers.get('x-file-name')!) : null;

    if (uploadId && chunkIndexStr && totalChunksStr && fileNameHeader) {
        // === CHUNKED UPLOAD HANDLER ===
        try {
            const chunkIndex = parseInt(chunkIndexStr, 10);
            const totalChunks = parseInt(totalChunksStr, 10);
            const uploadsDir = join(process.cwd(), "public", "uploads");
            const tempDir = join(uploadsDir, "temp");
            await mkdir(tempDir, { recursive: true });

            const tempFilePath = join(tempDir, `${uploadId}.part`);

            // Read raw body chunk and append to file
            const body = req.body;
            if (!body) return NextResponse.json({ error: "No body" }, { status: 400 });

            // We use 'flags: a' to append. 
            // Warning: Concurrency issue if parallel chunks? We assume sequential upload from client for safety.
            const writeStream = createWriteStream(tempFilePath, { flags: 'a' });

            // @ts-ignore - Readable.fromWeb works in Node 18+
            const readable = (typeof body.getReader === 'function') ? Readable.fromWeb(body as any) : body;
            // @ts-ignore - mismatch in stream types definition between Web and Node
            await pipeline(readable, writeStream);

            if (chunkIndex === totalChunks - 1) {
                // LAST CHUNK - Finalize
                const extension = '.' + (fileNameHeader.split('.').pop()?.toLowerCase() || '');
                const mimeType = req.headers.get('x-mime-type') || 'application/octet-stream';
                const isArchive = ARCHIVE_EXTENSIONS.includes(extension) || ARCHIVE_MIME_TYPES.includes(mimeType);

                const safeFileName = `${crypto.randomUUID()}${isArchive ? extension : '.jpg'}`; // Enforce JPG for images
                const finalPath = join(uploadsDir, safeFileName);

                if (isArchive) {
                    // Just move the temp file to final path
                    const { rename } = require('fs/promises');
                    await rename(tempFilePath, finalPath);

                    return NextResponse.json({
                        success: true,
                        fileName: safeFileName,
                        originalName: sanitizeFilename(fileNameHeader),
                        wasConverted: false
                    });
                } else {
                    // IMAGE: Process from disk using Sharp
                    try {
                        const { readFile, unlink } = require('fs/promises');
                        const inputBuffer = await readFile(tempFilePath);

                        // Magic Byte Check
                        if (!isValidImageSignature(inputBuffer, mimeType, extension)) {
                            await unlink(tempFilePath);
                            return NextResponse.json({ error: "Invalid image content" }, { status: 400 });
                        }

                        let finalBuffer: Buffer;
                        if (isJpegFile(inputBuffer)) {
                            finalBuffer = inputBuffer;
                        } else {
                            finalBuffer = await sharp(inputBuffer)
                                .flatten({ background: { r: 255, g: 255, b: 255 } })
                                .rotate()
                                .toColorspace('srgb')
                                .toFormat('jpeg', { quality: 100, progressive: true })
                                .toBuffer();
                        }

                        await writeFile(finalPath, finalBuffer);

                        // Generate thumbnail for fast preview (300px, quality 70)
                        const thumbDir = join(uploadsDir, "thumb");
                        await mkdir(thumbDir, { recursive: true });
                        const thumbPath = join(thumbDir, safeFileName);

                        await sharp(finalBuffer)
                            .resize(300, 300, { fit: 'cover', position: 'center' })
                            .jpeg({ quality: 70 })
                            .toFile(thumbPath);

                        await unlink(tempFilePath); // Cleanup temp

                        return NextResponse.json({
                            success: true,
                            fileName: safeFileName,
                            originalName: sanitizeFilename(fileNameHeader),
                            wasConverted: !isJpegFile(inputBuffer)
                        });

                    } catch (err: any) {
                        console.error("Image processing error:", err);
                        return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
                    }
                }
            }

            return NextResponse.json({ success: true, chunk: chunkIndex });

        } catch (err: any) {
            console.error("Chunk upload error:", err);
            return NextResponse.json({ error: `Chunk error: ${err.message}` }, { status: 500 });
        }
    }


    if (!req.headers.get('content-type')?.includes('multipart/form-data')) {
        return NextResponse.json({ error: "Content-Type must be multipart/form-data or Chunked Headers" }, { status: 400 });
    }

    // === FALLBACK: LEAGCY SINGLE REQUEST (Keep for small files if needed, or backward compat) ===
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const bb = busboy({ headers: { 'content-type': req.headers.get('content-type')! } });

    return new Promise<NextResponse>((resolve) => {
        let fileProcessed = false;
        let receivedBytes = 0;

        const sendResponse = (response: NextResponse) => {
            resolve(response);
        };

        bb.on('file', async (name, stream, info) => {
            fileProcessed = true;
            const { filename, mimeType } = info;
            const extension = '.' + (filename.split('.').pop()?.toLowerCase() || '');
            const isArchive = ARCHIVE_EXTENSIONS.includes(extension) || ARCHIVE_MIME_TYPES.includes(mimeType);

            // Validation basics
            if (!ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase()) && !ALLOWED_EXTENSIONS.includes(extension)) {
                stream.resume(); // consume stream
                return sendResponse(NextResponse.json({ error: `Invalid file type: ${mimeType}` }, { status: 400 }));
            }

            const safeFileName = `${crypto.randomUUID()}${isArchive ? extension : '.jpg'}`; // Enforce JPG for images
            const path = join(uploadsDir, safeFileName);

            if (isArchive) {
                // === ARCHIVE: STREAM TO DISK ===
                const writeStream = createWriteStream(path);
                try {
                    await pipeline(stream, writeStream);

                    sendResponse(NextResponse.json({
                        success: true,
                        fileName: safeFileName,
                        originalName: sanitizeFilename(filename),
                        wasConverted: false
                    }));
                } catch (err: any) {
                    console.error("Archive stream error:", err);
                    sendResponse(NextResponse.json({ error: `Archive upload failed: ${err.message}` }, { status: 500 }));
                }
            } else {
                // === IMAGE: BUFFER AND PROCESS ===
                // We must buffer images to process with Sharp. strict limit 100MB.
                const chunks: Buffer[] = [];
                let length = 0;

                stream.on('data', (chunk) => {
                    chunks.push(chunk);
                    length += chunk.length;
                    if (length > MAX_IMAGE_SIZE) {
                        // Stop processing
                        stream.emit('error', new Error(`Image too large (Max ${MAX_IMAGE_SIZE / 1024 / 1024}MB)`));
                    }
                });

                stream.on('error', (err) => {
                    sendResponse(NextResponse.json({ error: err.message }, { status: 400 }));
                });

                stream.on('end', async () => {
                    if (length === 0) {
                        return sendResponse(NextResponse.json({ error: "Empty file" }, { status: 400 }));
                    }
                    const buffer = Buffer.concat(chunks);

                    // Magic Byte Check
                    if (!isValidImageSignature(buffer, mimeType, extension)) {
                        return sendResponse(NextResponse.json({ error: "Invalid image content" }, { status: 400 }));
                    }

                    try {
                        let finalBuffer: Buffer;
                        if (isJpegFile(buffer)) {
                            finalBuffer = buffer;
                        } else {
                            finalBuffer = await sharp(buffer)
                                .flatten({ background: { r: 255, g: 255, b: 255 } })
                                .rotate()
                                .toColorspace('srgb')
                                .toFormat('jpeg', { quality: 100, progressive: true })
                                .toBuffer();
                        }

                        await writeFile(path, finalBuffer);

                        // Generate thumbnail for fast preview (300px, quality 70)
                        const thumbDir = join(uploadsDir, "thumb");
                        await mkdir(thumbDir, { recursive: true });
                        const thumbPath = join(thumbDir, safeFileName);

                        await sharp(finalBuffer)
                            .resize(300, 300, { fit: 'cover', position: 'center' })
                            .jpeg({ quality: 70 })
                            .toFile(thumbPath);

                        sendResponse(NextResponse.json({
                            success: true,
                            fileName: safeFileName,
                            originalName: sanitizeFilename(filename),
                            wasConverted: !isJpegFile(buffer)
                        }));
                    } catch (err: any) {
                        console.error("Image processing error:", err);
                        sendResponse(NextResponse.json({ error: "Image processing failed" }, { status: 500 }));
                    }
                });
            }
        });

        bb.on('error', (err: any) => {
            console.error("Busboy error:", err);
            sendResponse(NextResponse.json({ error: `Upload stream error: ${err.message}` }, { status: 500 }));
        });

        bb.on('finish', () => {
            if (!fileProcessed) {
                // sendResponse(NextResponse.json({ error: "No file found in request" }, { status: 400 }));
            }
        });

        // Pipe Web Stream to Busboy
        const reader = req.body?.getReader();
        if (!reader) {
            return sendResponse(NextResponse.json({ error: "No request body" }, { status: 400 }));
        }

        async function pump() {
            try {
                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;
                    // receivedBytes += value.length; 
                    bb.write(value);
                }
                bb.end();
            } catch (err: any) {
                // console.error("Reader error:", err);
                bb.emit('error', err);
            }
        }
        pump();
    });
}
// Import Readable if needed for types, but we use 'any' cast above for runtime.
import { Readable } from 'stream';

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const fileName = searchParams.get("fileName");
        if (!fileName || fileName.includes("/") || fileName.includes("\\")) {
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }
        const uploadsDir = join(process.cwd(), "public", "uploads");
        const path = join(uploadsDir, fileName);
        const thumbPath = join(uploadsDir, "thumb", fileName);
        const { unlink } = require('fs/promises');
        try {
            await unlink(path);
        } catch (e: any) {
            if (e.code !== 'ENOENT') throw e;
        }
        // Also delete thumbnail
        try {
            await unlink(thumbPath);
        } catch (e: any) {
            if (e.code !== 'ENOENT') { /* ignore */ }
        }
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
