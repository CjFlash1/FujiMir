import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [sizes, papers, options, gifts, magnetPrices, polaroidSetting] = await Promise.all([
            prisma.printSize.findMany({
                where: { isActive: true },
                include: { discounts: true },
                orderBy: { basePrice: 'asc' }
            }),
            prisma.paperType.findMany({ where: { isActive: true } }),
            prisma.printOption.findMany({ where: { isActive: true } }),
            prisma.giftThreshold.findMany({ where: { isActive: true }, orderBy: { minAmount: 'asc' } }),
            prisma.magnetPrice.findMany({ where: { isActive: true } }),
            prisma.setting.findUnique({ where: { key: 'polaroid_frame_price' } })
        ]);

        // Natural sort for magnet prices (e.g. 9x13 < 10x15)
        magnetPrices.sort((a: any, b: any) => {
            const parse = (s: string) => {
                const parts = s.split('x').map(Number);
                return parts.length === 2 && !isNaN(parts[0]) ? parts[0] * parts[1] : 0;
            };
            const areaA = parse(a.sizeSlug);
            const areaB = parse(b.sizeSlug);
            if (areaA && areaB && areaA !== areaB) return areaA - areaB;
            return a.sizeSlug.localeCompare(b.sizeSlug, undefined, { numeric: true });
        });

        const polaroidPrice = parseFloat(polaroidSetting?.value || '10');
        const enhancedOptions = [
            ...options,
            { id: 9999, name: "Polaroid Frame", slug: "polaroid", price: polaroidPrice, isActive: true }
        ];

        return NextResponse.json({ sizes, papers, options: enhancedOptions, gifts, magnetPrices });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
