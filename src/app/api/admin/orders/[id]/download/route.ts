import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import archiver from "archiver";
import { join } from "path";
import { stat } from "fs/promises";

const PHOTOS_PER_PART = 100; // Max photos per ZIP part

// Helper to sanitize folder/file names for ZIP
function sanitizeZipName(name: string) {
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// Helper to collect all files from order
async function collectOrderFiles(order: any, uploadsDir: string) {
    const allFiles: { filePath: string; zipPath: string }[] = [];

    for (const item of order.items) {
        if (!item.files) continue;

        let files: any[] = [];
        try {
            files = JSON.parse(item.files);
        } catch (e) { continue; }

        if (!Array.isArray(files)) continue;

        for (const fileData of files) {
            const serverFileName = fileData.server;
            const originalFileName = fileData.original;

            if (!serverFileName) continue;

            const filePath = join(uploadsDir, serverFileName);

            try {
                await stat(filePath); // Check if file exists

                // Parse extra options
                let extraOpts: any = {};
                try {
                    extraOpts = JSON.parse(item.options as string || '{}');
                } catch { }

                // Check if this is a gift magnet photo
                const isGiftMagnet = extraOpts.isGiftMagnet === true;

                let folderPath: string;
                if (isGiftMagnet) {
                    // Gift magnets go to special folder
                    folderPath = "FREE MAGNET";
                } else {
                    // Format folder structure
                    const size = item.size || 'Unknown';
                    const paper = item.paper || 'Unknown';
                    const safeBase = sanitizeZipName(`${size} ${paper}`.trim());

                    const extraFolders = [];
                    // Check cropping option
                    const cropping = extraOpts.cropping;
                    if (cropping === 'fit') {
                        extraFolders.push("FIT-IN");
                    } else if (cropping === 'no_resize') {
                        extraFolders.push("NO-RESIZE");
                    }

                    // Add other extra folders (magnetic, border)
                    // It seems the user wants cropping to be a parent folder: "If crop option is selected, first folder is crop option... then size/paper"
                    // Current logic for magnetic/border joined them with '/', making them subfolders of Size_Paper? 
                    // Let's re-read: "if crop option is selected, first folder is crop option... if not selected (free/standard), folder is not needed"
                    // And standard logic was: `${size} ${paper}`. optionally with "/Magnet" or "/Border"?
                    // Original code: `folderPath = [safeBase, ...extraFolders].join('/');` where extraFolders had "Magnet", "Border".
                    // So it was: "10x15 Glossy/Magnet/photo.jpg" or "10x15 Glossy/photo.jpg"

                    // New logic requested:
                    // If FIT-IN: "FIT-IN/10x15 Glossy/..."
                    // If NO-RESIZE: "NO-RESIZE/10x15 Glossy/..."
                    // If Standard: "10x15 Glossy/..."

                    const subFolders = [];
                    if (extraOpts.magnetic) subFolders.push("Magnet");
                    if (extraOpts.border) subFolders.push("Border");

                    const mainFolder = [safeBase, ...subFolders].join('/');

                    if (cropping === 'fit') {
                        folderPath = `FIT-IN/${mainFolder}`;
                    } else if (cropping === 'no_resize') {
                        folderPath = `NO-RESIZE/${mainFolder}`;
                    } else {
                        folderPath = mainFolder;
                    }
                }

                const baseName = originalFileName
                    ? originalFileName.replace(/\.[^/.]+$/, "")
                    : (item.name || `photo-${item.id}`);

                // Check if it's an archive based on original name or logic
                const isArchive = originalFileName?.toLowerCase().endsWith('.zip')
                    || originalFileName?.toLowerCase().endsWith('.rar')
                    || originalFileName?.toLowerCase().endsWith('.7z');

                if (isArchive) {
                    folderPath = "ARCHIVE";
                    const ext = originalFileName?.split('.').pop() || 'zip';
                    // Keep original name for archive
                    allFiles.push({
                        filePath,
                        zipPath: `${folderPath}/${sanitizeZipName(baseName)}.${ext}`
                    });
                } else {
                    const safeFileName = sanitizeZipName(baseName) + ".jpg";
                    allFiles.push({
                        filePath,
                        zipPath: `${folderPath}/${safeFileName}`
                    });
                }
            } catch (e) {
                console.warn(`File not found for zip: ${filePath}`);
            }
        }
    }

    return allFiles;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const part = parseInt(searchParams.get('part') || '1');
    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
        return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true }
    });

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const uploadsDir = join(process.cwd(), "public", "uploads");
    const allFiles = await collectOrderFiles(order, uploadsDir);

    // Calculate parts
    const totalParts = Math.ceil(allFiles.length / PHOTOS_PER_PART);
    const startIndex = (part - 1) * PHOTOS_PER_PART;
    const endIndex = Math.min(part * PHOTOS_PER_PART, allFiles.length);
    const filesForThisPart = allFiles.slice(startIndex, endIndex);

    if (filesForThisPart.length === 0) {
        return NextResponse.json({ error: "No files in this part" }, { status: 404 });
    }

    // Set headers for download
    const partSuffix = totalParts > 1 ? `_part${part}of${totalParts}` : '';
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${order.orderNumber}${partSuffix}.zip"`);
    headers.set("Content-Type", "application/zip");

    // Use TransformStream for streaming response
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    const archive = archiver("zip", {
        zlib: { level: 6 } // Faster compression for large files
    });

    archive.on("error", (err) => {
        console.error("Archive error:", err);
        writer.abort(err);
    });

    archive.on("data", (chunk) => {
        writer.write(chunk);
    });

    archive.on("end", () => {
        writer.close();
    });

    // Add files to archive
    for (const file of filesForThisPart) {
        archive.file(file.filePath, { name: file.zipPath });
    }

    archive.finalize();

    return new NextResponse(readable, {
        headers
    });
}
