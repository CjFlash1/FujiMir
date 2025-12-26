import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customer, items, total, notes, giftChoice } = body;

        // Generate sequential order number via OrderSequence table (RAW SQL)
        let orderNumber: string;
        try {
            // Check current sequence
            const seqs = await prisma.$queryRaw<Array<{ id: number, currentValue: number }>>`SELECT id, currentValue FROM OrderSequence LIMIT 1`;

            if (seqs && seqs.length > 0) {
                const id = seqs[0].id;
                // Update (Increment)
                await prisma.$executeRaw`UPDATE OrderSequence SET currentValue = currentValue + 1 WHERE id = ${id}`;
                // Fetch Updated Value
                const updated = await prisma.$queryRaw<Array<{ currentValue: number }>>`SELECT currentValue FROM OrderSequence WHERE id = ${id}`;
                orderNumber = updated[0].currentValue.toString();
            } else {
                // Insert Intial (10001) if table empty
                await prisma.$executeRaw`INSERT INTO OrderSequence (currentValue) VALUES (10001)`;
                orderNumber = "10001";
            }
        } catch (e) {
            console.error("Order sequence error (raw)", e);
            orderNumber = Date.now().toString();
        }

        // Sort items so gift magnet comes first
        const sortedItems = [...items].sort((a, b) => {
            if (a.isGiftMagnet && !b.isGiftMagnet) return -1;
            if (!a.isGiftMagnet && b.isGiftMagnet) return 1;
            return 0;
        });

        const order = await prisma.order.create({
            data: {
                orderNumber,
                totalAmount: total,
                customerName: customer.name,
                customerPhone: customer.phone,
                customerEmail: customer.email,
                deliveryMethod: customer.deliveryMethod,
                deliveryAddress: customer.deliveryAddress,
                notes: notes || null,
                items: {
                    create: sortedItems.map((item: any) => ({
                        type: "PRINT",
                        name: item.isGiftMagnet
                            ? `🎁 FREE MAGNET: ${item.options.size}`
                            : `${item.options.size} ${item.options.paper}`,
                        quantity: item.options.quantity,
                        price: item.priceSnapshot,
                        subtotal: item.priceSnapshot * item.options.quantity,
                        size: item.options.size,
                        paper: item.options.paper,
                        options: JSON.stringify({
                            ...item.options.options,
                            isGiftMagnet: item.isGiftMagnet || false,
                        }),
                        files: JSON.stringify([{
                            original: item.fileName,
                            server: item.serverFileName
                        }]),
                    }))
                }
            },
        });

        return NextResponse.json({ success: true, orderNumber: order.orderNumber });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
