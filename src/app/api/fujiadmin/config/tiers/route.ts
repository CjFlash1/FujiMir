import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tiers = await prisma.quantityTier.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' }
        });
        return NextResponse.json(tiers);
    } catch (error) {
        console.error("Error fetching tiers:", error);
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Get max sortOrder
        const maxSort = await prisma.quantityTier.aggregate({ _max: { sortOrder: true } });
        const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

        const tier = await prisma.quantityTier.create({
            data: {
                label: data.label,
                minQuantity: parseInt(data.minQuantity),
                sortOrder: data.sortOrder ?? nextOrder,
                isActive: true,
            }
        });
        return NextResponse.json(tier);
    } catch (error) {
        console.error("Error creating tier:", error);
        return NextResponse.json({ error: "Failed to create tier" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const tier = await prisma.quantityTier.update({
            where: { id: data.id },
            data: {
                label: data.label,
                minQuantity: data.minQuantity,
                sortOrder: data.sortOrder,
                isActive: data.isActive,
            }
        });
        return NextResponse.json(tier);
    } catch (error) {
        console.error("Error updating tier:", error);
        return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        // Also delete related discounts
        await prisma.volumeDiscount.deleteMany({
            where: { tierId: parseInt(id) }
        });

        await prisma.quantityTier.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting tier:", error);
        return NextResponse.json({ error: "Failed to delete tier" }, { status: 500 });
    }
}
