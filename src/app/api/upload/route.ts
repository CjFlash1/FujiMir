import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import crypto from "crypto";
import sharp from "sharp";

// Helper for transliteration and sanitization
function sanitizeFilename(name: string): string {
    const translitMap: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
        'я': 'ya', 'і': 'i', 'ї': 'yi', 'є': 'ye', 'ґ': 'g',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'Ts',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
        'Я': 'Ya', 'І': 'I', 'Ї': 'Yi', 'Є': 'Ye', 'Ґ': 'G'
    };

    let result = name.split('').map(char => translitMap[char] || char).join('');
    // Replace spaces with underscores
    result = result.replace(/\s+/g, '_');
    // Remove non-latin/non-numeric chars except dot, underscore, dash
    result = result.replace(/[^a-zA-Z0-9._-]/g, '');
    return result;
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Always use .jpg extension for the saved file
        const fileName = `${crypto.randomUUID()}.jpg`;
        const uploadsDir = join(process.cwd(), "public", "uploads");
        const path = join(uploadsDir, fileName);

        // Ensure directory exists
        await mkdir(uploadsDir, { recursive: true });

        // Process with sharp:
        // 1. toFormat('jpeg') - convert to JPG
        // 2. jpeg({ quality: 90 }) - set quality
        // 3. flatten({ background: { r: 255, g: 255, b: 255 } }) - remove transparency (important for PNG)
        // 4. toBuffer() - get the processed bytes
        const processedBuffer = await sharp(buffer)
            .flatten({ background: { r: 255, g: 255, b: 255 } }) // Handle PNG transparency
            .rotate() // Auto-rotate based on EXIF
            .toColorspace('srgb') // Ensure standard RGB color space
            .toFormat('jpeg', { quality: 90, progressive: true })
            .toBuffer();

        await writeFile(path, processedBuffer);
        console.log(`File converted and saved to ${path}`);

        return NextResponse.json({
            success: true,
            fileName: fileName,
            originalName: sanitizeFilename(file.name)
        });
    } catch (error: any) {
        console.error("Upload/Processing error:", error);
        return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }
}
