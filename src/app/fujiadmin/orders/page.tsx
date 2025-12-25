import { prisma } from "@/lib/prisma";
import { OrdersTable } from "./orders-table";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { items: true } } }
    });

    return <OrdersTable orders={orders} />;
}
