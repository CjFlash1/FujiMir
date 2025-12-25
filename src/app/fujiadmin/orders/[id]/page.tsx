import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrderDetailView } from "../order-detail-view";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) notFound();

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true }
    });

    if (!order) notFound();

    const transformedOrder = {
        ...order,
        items: order.items.map((item) => {
            let files: any[] = [];
            try { files = JSON.parse(item.files || '[]'); } catch { }
            let extraOptions = {};
            try { extraOptions = JSON.parse(item.options || '{}'); } catch { }

            return {
                ...item,
                fileName: files[0]?.original || item.name,
                serverFileName: files[0]?.server,
                options: {
                    size: item.size,
                    paper: item.paper,
                    quantity: item.quantity,
                    options: extraOptions
                }
            };
        })
    };

    return <OrderDetailView order={transformedOrder} />;
}
