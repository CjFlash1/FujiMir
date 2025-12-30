import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'uk';

    try {
        const translations = await prisma.translation.findMany({
            where: { lang }
        });

        // Convert array to object { "nav.upload": "Завантажити" }
        const tObject: Record<string, string> = {};
        translations.forEach(t => {
            tObject[t.key] = t.value;
        });

        return NextResponse.json(tObject);
    } catch (error) {
        console.error("Translation fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch translations" }, { status: 500 });
    }
}
