import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { type CartItem } from "@/lib/store";

export const dynamic = "force-dynamic";

// Helper to calculate total
const calculateOrderTotal = (items: CartItem[]) => {
    // This is a simplified calculation. Ideally reuse the logic from store/server
    // For draft purposes, we might just sum up what we have or rely on strict sync
    // We will just use the passed total or calculate roughly? 
    // Let's rely on the client passing the calculated total for now, or just sum subtable.
    return 0; // Placeholder
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, orderNumber: existingOrderNumber, total } = body;

        let order;

        if (existingOrderNumber) {
            // Update existing draft
            // We use a transaction to clean up old items and add new ones
            // Check if order exists and is DRAFT
            const existing = await prisma.order.findUnique({
                where: { orderNumber: existingOrderNumber }
            });

            if (existing) {
                // Update
                /* 
                   Strategy:
                   1. Delete all current items for this order.
                   2. Create new items from the cart.
                   3. Update total.
                */
                await prisma.orderItem.deleteMany({
                    where: { orderId: existing.id }
                });

                order = await prisma.order.update({
                    where: { id: existing.id },
                    data: {
                        totalAmount: total || 0,
                        updatedAt: new Date(),
                        items: {
                            create: items.map((item: any) => ({
                                type: "PRINT",
                                name: `${item.options.size} ${item.options.paper}`,
                                quantity: item.options.quantity,
                                price: item.options.priceSnapshot || 0,
                                subtotal: (item.options.priceSnapshot || 0) * item.options.quantity,
                                size: item.options.size,
                                paper: item.options.paper,
                                options: JSON.stringify({
                                    ...item.options.options || {},
                                    cropping: item.options.cropping || 'fill'
                                }),
                                files: JSON.stringify([{
                                    original: item.name,
                                    server: item.serverFileName
                                }])
                            }))
                        }
                    }
                });
                return NextResponse.json({ success: true, orderNumber: order.orderNumber });
            }
        }

        // Create NEW Draft
        // Generate Order Number
        let orderNumber = `DRAFT-${Date.now().toString().slice(-6)}`;

        // Use dummy customer data if schema defaults/optionality not applied
        order = await prisma.order.create({
            data: {
                orderNumber,
                status: "DRAFT", // "Оформляется"
                totalAmount: total || 0,
                customerName: "Draft Customer",
                customerPhone: "",
                customerEmail: "",
                deliveryMethod: "PICKUP",
                deliveryAddress: "",
                notes: "Order in progress...",
                items: {
                    create: items.map((item: any) => ({
                        type: "PRINT",
                        name: `${item.options.size} ${item.options.paper}`,
                        quantity: item.options.quantity,
                        price: item.options.priceSnapshot || 0,
                        subtotal: (item.options.priceSnapshot || 0) * item.options.quantity,
                        size: item.options.size,
                        paper: item.options.paper,
                        options: JSON.stringify({
                            ...item.options.options || {},
                            cropping: item.options.cropping || 'fill'
                        }),
                        files: JSON.stringify([{
                            original: item.name,
                            server: item.serverFileName
                        }])
                    }))
                }
            }
        });

        return NextResponse.json({ success: true, orderNumber: order.orderNumber });

    } catch (error) {
        console.error("Draft sync failed:", error);
        return NextResponse.json({ error: "Draft sync failed" }, { status: 500 });
    }
}
