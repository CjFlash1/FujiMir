import { prisma } from "@/lib/prisma";
import { OrdersTable } from "./orders-table";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// Calculate size of files for an order
function calculateOrderSize(items: any[]): number {
    let totalSize = 0;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    for (const item of items) {
        if (!item.files) continue;
        try {
            const files = JSON.parse(item.files);
            if (Array.isArray(files)) {
                for (const file of files) {
                    const fileName = typeof file === 'string' ? file : file.server;
                    if (fileName) {
                        const filePath = path.join(uploadsDir, fileName);
                        if (fs.existsSync(filePath)) {
                            const stat = fs.statSync(filePath);
                            totalSize += stat.size;
                        }
                    }
                }
            }
        } catch (e) {
            // Skip malformed JSON
        }
    }

    return totalSize;
}

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { items: true } },
            items: { select: { files: true } }
        }
    });

    // Add size to each order
    const ordersWithSize = orders.map(order => ({
        ...order,
        size: calculateOrderSize(order.items),
        items: undefined // Remove items from response to keep it light
    }));

    return <OrdersTable orders={ordersWithSize} />;
}
