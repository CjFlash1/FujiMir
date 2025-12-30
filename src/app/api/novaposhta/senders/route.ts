import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const senders = await prisma.nPSender.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(senders);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to fetch senders" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, firstName, lastName, phone, cityRef, cityName, warehouseRef, warehouseName } = body;

        const sender = await prisma.nPSender.create({
            data: {
                name,
                firstName,
                lastName,
                phone,
                cityRef,
                cityName,
                warehouseRef,
                warehouseName
            }
        });

        return NextResponse.json(sender);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to save sender" }, { status: 500 });
    }
}
