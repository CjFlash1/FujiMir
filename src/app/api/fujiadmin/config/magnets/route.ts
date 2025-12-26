import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const magnetPrices = await prisma.magnetPrice.findMany({});

        // Natural sort for sizes like "9x13", "10x15"
        magnetPrices.sort((a, b) => {
            const parse = (s: string) => {
                const parts = s.split('x').map(Number);
                return parts.length === 2 && !isNaN(parts[0]) ? parts[0] * parts[1] : 0; // Sort by area or fallback
            };
            const areaA = parse(a.sizeSlug);
            const areaB = parse(b.sizeSlug);
            if (areaA && areaB && areaA !== areaB) return areaA - areaB;
            return a.sizeSlug.localeCompare(b.sizeSlug, undefined, { numeric: true });
        });

        return NextResponse.json(magnetPrices);
    } catch (error) {
        console.error("Error fetching magnet prices:", error);
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const created = await prisma.magnetPrice.create({
            data: {
                sizeSlug: body.sizeSlug,
                price: parseFloat(body.price),
                isActive: body.isActive ?? true,
            }
        });
        return NextResponse.json(created);
    } catch (error) {
        console.error("Error creating magnet price:", error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const updated = await prisma.magnetPrice.update({
            where: { id: body.id },
            data: {
                sizeSlug: body.sizeSlug,
                price: parseFloat(body.price),
                isActive: body.isActive,
            }
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating magnet price:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id') || '0');
        await prisma.magnetPrice.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting magnet price:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
