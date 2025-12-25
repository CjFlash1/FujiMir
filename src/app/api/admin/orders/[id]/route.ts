
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const orderId = parseInt(id, 10);

    if (isNaN(orderId)) {
        return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // 1. Delete associated files from filesystem
        const uploadsDir = join(process.cwd(), "public", "uploads");

        // Collect all server filenames
        const serverFiles: string[] = [];
        for (const item of order.items) {
            if (item.files) {
                try {
                    const parsed = JSON.parse(item.files);
                    if (Array.isArray(parsed)) {
                        parsed.forEach((f: any) => {
                            if (f.server) serverFiles.push(f.server);
                        });
                    }
                } catch (e) { console.error("Error parsing files JSON", e); }
            }
        }

        const results = await Promise.allSettled(
            serverFiles.map(file => unlink(join(uploadsDir, file)))
        );

        // Log failures but don't stop process
        results.forEach((result, idx) => {
            if (result.status === 'rejected') {
                console.warn(`Failed to delete file ${serverFiles[idx]}:`, result.reason);
            }
        });

        // 2. Delete associated items (Manual Cascade due to missing schema Cascade)
        await prisma.orderItem.deleteMany({
            where: { orderId: orderId }
        });

        // 3. Delete order
        await prisma.order.delete({
            where: { id: orderId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete order error:", error);
        return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
    }
}
