import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const lang = searchParams.get("lang") || "uk";

        const pages = await prisma.page.findMany({
            where: {
                lang: lang,
                isActive: true
            },
            select: {
                slug: true,
                title: true
            },
            orderBy: {
                id: 'asc' // Or createdAt
            }
        });

        return NextResponse.json(pages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
    }
}
