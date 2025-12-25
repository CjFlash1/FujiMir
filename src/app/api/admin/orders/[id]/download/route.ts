
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import archiver from "archiver";
import { createReadStream } from "fs";
import { join } from "path";
import { stat } from "fs/promises";

// Helper to sanitize folder/file names for ZIP
function sanitizeZipName(name: string) {
    return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
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

    // Set headers for download
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${order.orderNumber}.zip"`);
    headers.set("Content-Type", "application/zip");

    const uploadsDir = join(process.cwd(), "public", "uploads");

    // Use TransformStream for streaming response
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();

    const archive = archiver("zip", {
        zlib: { level: 9 }
    });

    archive.on("error", (err) => {
        console.error("Archive error:", err);
        writer.abort(err);
    });

    // Pipe archive data to the writable stream
    archive.on("data", (chunk) => {
        writer.write(chunk);
    });

    archive.on("end", () => {
        writer.close();
    });

    // Add files to archive with structure
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

                // Format folder structure: "10x15 Glossy Magnet Border"
                // Format folder structure: "10x15 Glossy/Magnet/Border"
                const size = item.size || 'Unknown';
                const paper = item.paper || 'Unknown';
                const safeBase = sanitizeZipName(`${size} ${paper}`.trim());

                const extraFolders = [];
                if (extraOpts.magnetic) extraFolders.push("Magnet");
                if (extraOpts.border) extraFolders.push("Border");

                const folderPath = [safeBase, ...extraFolders].join('/');

                // Format filename: Force .jpg extension since we converted it (and sanitize)
                const baseName = originalFileName
                    ? originalFileName.replace(/\.[^/.]+$/, "")
                    : (item.name || `photo-${item.id}`);
                const safeFileName = sanitizeZipName(baseName) + ".jpg";

                // Add to archive
                archive.file(filePath, { name: `${folderPath}/${safeFileName}` });
            } catch (e) {
                console.warn(`File not found for zip: ${filePath}`);
            }
        }
    }

    archive.finalize();

    return new NextResponse(readable, {
        headers
    });
}
