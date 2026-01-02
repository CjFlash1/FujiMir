
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { npRequest } from "@/lib/novaposhta";

export async function GET() {
    try {
        // 1. Check if key exists in DB
        const setting = await prisma.setting.findUnique({ where: { key: "novaposhta_api_key" } });
        if (!setting?.value) {
            return NextResponse.json({ ok: false, reason: "missing" });
        }

        // 2. Validate key by making a lightweight request (getAreas)
        const check = await npRequest("Address", "getAreas", { Limit: 1 });

        if (check.success) {
            return NextResponse.json({ ok: true });
        } else {
            return NextResponse.json({ ok: false, reason: "invalid", details: check.errors });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, reason: "error" }, { status: 500 });
    }
}
