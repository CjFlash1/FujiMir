import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { customer, items, total } = body;

        // Generate a simple order number
        const orderNumber = `ORD-${Math.floor(Math.random() * 100000)}`;

        const order = await prisma.order.create({
            data: {
                orderNumber,
                totalAmount: total,
                customerName: customer.name,
                customerPhone: customer.phone,
                customerEmail: customer.email,
                deliveryMethod: customer.deliveryMethod,
                deliveryAddress: customer.deliveryAddress,
                items: {
                    create: items.map((item: any) => ({
                        type: "PRINT",
                        name: `${item.options.size} Print`,
                        quantity: item.options.quantity,
                        price: 0.50, // Hardcoded for now, ideal: look up from Product table
                        subtotal: item.options.quantity * 0.50,
                        size: item.options.size,
                        paper: item.options.paper,
                        // Storing metadata about filenames
                        files: JSON.stringify([item.fileName]),
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
