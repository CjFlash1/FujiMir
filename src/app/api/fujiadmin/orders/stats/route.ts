import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to calculate total size of files in uploads folder
async function calculateTotalUploadsSize(): Promise<number> {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    try {
        if (!fs.existsSync(uploadsDir)) {
            return 0;
        }

        const files = fs.readdirSync(uploadsDir);
        let totalSize = 0;

        for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
                totalSize += stat.size;
            }
        }

        return totalSize;
    } catch (error) {
        console.error("Error calculating uploads size:", error);
        return 0;
    }
}

export async function GET() {
    try {
        // Count orders by status
        const [draft, pending, processing, completed, cancelled, total] = await Promise.all([
            prisma.order.count({ where: { status: "DRAFT" } }),
            prisma.order.count({ where: { status: "PENDING" } }),
            prisma.order.count({ where: { status: "PROCESSING" } }),
            prisma.order.count({ where: { status: "COMPLETED" } }),
            prisma.order.count({ where: { status: "CANCELLED" } }),
            prisma.order.count(),
        ]);

        // Calculate total uploads size
        const totalUploadsSize = await calculateTotalUploadsSize();

        return NextResponse.json({
            stats: {
                draft,
                pending,
                processing,
                completed,
                cancelled,
                total,
                totalUploadsSize, // in bytes
            }
        });
    } catch (error) {
        console.error("Error fetching order stats:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
