import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { join } from "path";
import { stat } from "fs/promises";

const PHOTOS_PER_PART = 100;

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

    const uploadsDir = join(process.cwd(), "public", "uploads");

    // Count all valid files
    let totalFiles = 0;
    for (const item of order.items) {
        if (!item.files) continue;

        let files: any[] = [];
        try {
            files = JSON.parse(item.files);
        } catch (e) { continue; }

        if (!Array.isArray(files)) continue;

        for (const fileData of files) {
            const serverFileName = fileData.server;
            if (!serverFileName) continue;

            const filePath = join(uploadsDir, serverFileName);
            try {
                await stat(filePath);
                totalFiles++;
            } catch { }
        }
    }

    const totalParts = Math.ceil(totalFiles / PHOTOS_PER_PART);

    return NextResponse.json({
        totalFiles,
        totalParts,
        photosPerPart: PHOTOS_PER_PART,
        parts: Array.from({ length: totalParts }, (_, i) => ({
            part: i + 1,
            from: i * PHOTOS_PER_PART + 1,
            to: Math.min((i + 1) * PHOTOS_PER_PART, totalFiles)
        }))
    });
}
