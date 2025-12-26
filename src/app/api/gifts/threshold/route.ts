import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get the first active gift threshold (lowest minAmount that is active)
        const gift = await prisma.giftThreshold.findFirst({
            where: { isActive: true },
            orderBy: { minAmount: 'asc' }
        });

        if (!gift) {
            return NextResponse.json({ hasGift: false, minAmount: 0, giftName: "" });
        }

        return NextResponse.json({
            hasGift: true,
            minAmount: gift.minAmount,
            giftName: gift.giftName
        });
    } catch (error) {
        console.error("Error fetching gift threshold:", error);
        return NextResponse.json({ hasGift: false, minAmount: 0, giftName: "" });
    }
}
