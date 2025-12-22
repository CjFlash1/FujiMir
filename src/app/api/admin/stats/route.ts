import { NextResponse } from "next/server";
import os from "node:os";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;

        const stats = {
            ram: {
                total: (totalMem / (1024 ** 3)).toFixed(2) + " GB",
                used: (usedMem / (1024 ** 3)).toFixed(2) + " GB",
                percentage: Math.round((usedMem / totalMem) * 100)
            },
            uptime: Math.round(os.uptime() / 3600) + " hours",
            platform: os.platform(),
            cpus: os.cpus().length,
            // Disk usage is harder in pure Node without external commands/libraries 
            // but we can provide a mock or simple platform-specific check later if needed.
            disk: "Available (Mock)"
        };

        return NextResponse.json(stats);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
