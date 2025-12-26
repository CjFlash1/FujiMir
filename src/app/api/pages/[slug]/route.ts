import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "uk";

    try {
        // Try to find page with exact slug and language
        let page = await prisma.page.findFirst({
            where: { slug, lang }
        });

        // Fallback to any version of this slug
        if (!page) {
            page = await prisma.page.findFirst({
                where: { slug }
            });
        }

        if (!page) {
            return NextResponse.json({ error: "Page not found" }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        console.error("API Page Error:", error);
        return NextResponse.json({ error: "Failed to fetch page", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}

