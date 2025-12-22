import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const sizes = await prisma.printSize.findMany({ where: { isActive: true } });
        const papers = await prisma.paperType.findMany({ where: { isActive: true } });
        const options = await prisma.printOption.findMany({ where: { isActive: true } });

        return NextResponse.json({ sizes, papers, options });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
