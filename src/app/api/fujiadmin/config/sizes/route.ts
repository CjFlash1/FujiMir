import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const sizes = await prisma.printSize.findMany({
        orderBy: { sortOrder: 'asc' }
    });
    return NextResponse.json(sizes);
}

export async function POST(req: Request) {
    const data = await req.json();

    // Get max sortOrder
    const maxSort = await prisma.printSize.aggregate({ _max: { sortOrder: true } });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    const size = await prisma.printSize.create({
        data: {
            name: data.name,
            slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
            widthMm: data.widthMm,
            heightMm: data.heightMm,
            basePrice: parseFloat(data.basePrice) || 0,
            sortOrder: data.sortOrder ?? nextOrder,
            isActive: data.isActive ?? true,
        }
    });

    // Auto-create discounts for existing tiers
    try {
        const tiers = await prisma.quantityTier.findMany({ orderBy: { sortOrder: 'asc' } });
        const basePrice = parseFloat(data.basePrice) || 0;

        const discountsToCreate = tiers.map((tier, index) => {
            let price = basePrice;
            if (index === 1) { // 2nd tier (e.g. 100+) -> 10% discount
                price = Math.round((basePrice * 0.9) * 10) / 10;
            } else if (index >= 2) { // 3rd tier+ (e.g. 200+) -> 20% discount
                price = Math.round((basePrice * 0.8) * 10) / 10;
            }
            // Ensure price is not negative
            price = Math.max(0, price);

            return {
                printSizeId: size.id,
                tierId: tier.id,
                minQuantity: tier.minQuantity,
                price: price
            };
        });

        if (discountsToCreate.length > 0) {
            await prisma.volumeDiscount.createMany({
                data: discountsToCreate
            });
        }
    } catch (e) {
        console.error("Failed to auto-create discounts", e);
    }

    return NextResponse.json(size);
}

export async function PUT(req: Request) {
    const data = await req.json();
    const size = await prisma.printSize.update({
        where: { id: data.id },
        data: {
            name: data.name,
            slug: data.slug,
            widthMm: data.widthMm,
            heightMm: data.heightMm,
            basePrice: parseFloat(data.basePrice) || data.basePrice,
            sortOrder: data.sortOrder,
            isActive: data.isActive,
        }
    });
    return NextResponse.json(size);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    // Also delete related discounts
    await prisma.volumeDiscount.deleteMany({
        where: { printSizeId: parseInt(id) }
    });

    await prisma.printSize.delete({
        where: { id: parseInt(id) }
    });
    return NextResponse.json({ success: true });
}
