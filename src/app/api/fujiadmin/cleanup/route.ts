import { NextResponse } from "next/server";
import { readdir, stat, unlink, rm, mkdir, rename } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Get storage stats
export async function GET(req: Request) {
    try {
        const uploadsDir = join(process.cwd(), "public", "uploads");
        const thumbDir = join(uploadsDir, "thumb");
        const tempDir = join(uploadsDir, "temp");

        const getDirSize = async (dirPath: string): Promise<{ count: number; size: number }> => {
            try {
                const files = await readdir(dirPath);
                let totalSize = 0;
                let count = 0;

                for (const file of files) {
                    const filePath = join(dirPath, file);
                    const stats = await stat(filePath);
                    if (stats.isFile()) {
                        totalSize += stats.size;
                        count++;
                    }
                }
                return { count, size: totalSize };
            } catch (e) {
                return { count: 0, size: 0 };
            }
        };

        const [mainStats, thumbStats, tempStats] = await Promise.all([
            getDirSize(uploadsDir),
            getDirSize(thumbDir),
            getDirSize(tempDir)
        ]);

        const totalSize = mainStats.size + thumbStats.size + tempStats.size;
        const totalCount = mainStats.count + thumbStats.count + tempStats.count;

        // Format size
        const formatSize = (bytes: number): string => {
            if (bytes < 1024) return `${bytes} B`;
            if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
            if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
            return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        };

        return NextResponse.json({
            main: { count: mainStats.count, size: mainStats.size, formatted: formatSize(mainStats.size) },
            thumb: { count: thumbStats.count, size: thumbStats.size, formatted: formatSize(thumbStats.size) },
            temp: { count: tempStats.count, size: tempStats.size, formatted: formatSize(tempStats.size) },
            total: { count: totalCount, size: totalSize, formatted: formatSize(totalSize) }
        });
    } catch (error: any) {
        console.error("Storage stats error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST - Run cleanup
export async function POST(req: Request) {
    try {
        const uploadsDir = join(process.cwd(), "public", "uploads");
        const thumbDir = join(uploadsDir, "thumb");
        const tempDir = join(uploadsDir, "temp");

        let mode = 'safe';
        try {
            const body = await req.json();
            if (body.mode) mode = body.mode;
        } catch (e) { }

        const isFull = mode === 'full';
        const now = Date.now();

        // Safe: 1 hour temp, 24h orphan. Full: 0 for both.
        const TEMP_MAX_AGE = isFull ? 0 : 60 * 60 * 1000;
        const ORPHAN_MIN_AGE_MS = isFull ? 0 : 24 * 60 * 60 * 1000;

        let tempDeleted = 0;
        let thumbDeleted = 0;
        let orphansDeleted = 0;
        const orphanFiles: string[] = [];
        const errors: string[] = [];

        // 0. (Full Only) Delete PENDING orders to free up their files
        if (isFull) {
            try {
                await prisma.order.deleteMany({ where: { status: 'PENDING' } });
            } catch (e) {
                console.error("Failed to clean PENDING orders", e);
            }
        }

        // 1. Clean temp folder
        try {
            const tempFiles = await readdir(tempDir);
            for (const file of tempFiles) {
                const filePath = join(tempDir, file);
                try {
                    const stats = await stat(filePath);
                    if (stats.isFile() && (now - stats.mtimeMs) > TEMP_MAX_AGE) {
                        await unlink(filePath);
                        tempDeleted++;
                    }
                } catch (e) { }
            }
        } catch (e) { /* temp folder may not exist */ }

        // 2. Get all files linked to orders
        const allItems = await prisma.orderItem.findMany({
            select: { files: true }
        });

        const usedFiles = new Set<string>();
        for (const item of allItems) {
            if (item.files) {
                try {
                    const parsed = JSON.parse(item.files);
                    if (Array.isArray(parsed)) {
                        parsed.forEach((f: any) => {
                            if (f.server) {
                                // Extract just filename if path includes folder
                                const fileName = f.server.includes('/')
                                    ? f.server.split('/').pop()
                                    : f.server;
                                usedFiles.add(fileName);
                            }
                        });
                    }
                } catch (e) { /* ignore parse errors */ }
            }
        }

        // 3. Clean thumbnails without originals (First Pass)
        try {
            const thumbFiles = await readdir(thumbDir);

            // Get actual main files
            const actualMainFiles = new Set<string>();
            try {
                const mainItems = await readdir(uploadsDir);
                for (const item of mainItems) {
                    const itemPath = join(uploadsDir, item);
                    try {
                        const s = await stat(itemPath);
                        if (s.isFile()) actualMainFiles.add(item);
                    } catch (e) { }
                }
            } catch (e) { }

            for (const thumbFile of thumbFiles) {
                // If no original exists, delete thumbnail
                if (!actualMainFiles.has(thumbFile) && !usedFiles.has(thumbFile)) {
                    await unlink(join(thumbDir, thumbFile)).catch(() => { });
                    thumbDeleted++;
                }
            }
        } catch (e) { /* thumb folder may not exist */ }

        // 4. Find orphan files (main files not in any order)
        try {
            const mainItems = await readdir(uploadsDir);
            for (const item of mainItems) {
                // Skip directories and hidden files
                if (item.startsWith('.')) continue;

                const itemPath = join(uploadsDir, item);
                try {
                    const s = await stat(itemPath);
                    if (s.isDirectory()) continue;

                    // Check age
                    const fileAge = now - s.mtimeMs;
                    if (fileAge < ORPHAN_MIN_AGE_MS) continue;

                    // Check usage
                    if (!usedFiles.has(item)) {
                        if (isFull) {
                            // Full Clean: Destroy
                            await unlink(itemPath);
                            orphansDeleted++;
                        } else {
                            // Safe Clean: Recover
                            orphanFiles.push(item);
                        }
                    }
                } catch (e) { }
            }
        } catch (e) { /* main folder may not exist */ }

        // 5. If orphans found (Safe Mode), create recovery order
        let recoveryOrderNumber: string | null = null;
        if (!isFull && orphanFiles.length > 0) {
            // Generate Order Number
            try {
                const seqs = await prisma.$queryRaw<Array<{ id: number, currentValue: number }>>`SELECT id, currentValue FROM OrderSequence LIMIT 1`;
                if (seqs && seqs.length > 0) {
                    const id = seqs[0].id;
                    await prisma.$executeRaw`UPDATE OrderSequence SET currentValue = currentValue + 1 WHERE id = ${id}`;
                    const updated = await prisma.$queryRaw<Array<{ currentValue: number }>>`SELECT currentValue FROM OrderSequence WHERE id = ${id}`;
                    recoveryOrderNumber = updated[0].currentValue.toString();
                } else {
                    await prisma.$executeRaw`INSERT INTO OrderSequence (currentValue) VALUES (10001)`;
                    recoveryOrderNumber = "10001";
                }
            } catch (e) {
                recoveryOrderNumber = `REC-${Date.now()}`;
            }

            // Create Order Folder
            const orderDir = join(uploadsDir, recoveryOrderNumber);
            await mkdir(orderDir, { recursive: true });

            // Move Files & Prepare Items
            const recoveredItems = [];
            for (const fileName of orphanFiles) {
                try {
                    const oldPath = join(uploadsDir, fileName);
                    const newPath = join(orderDir, fileName);
                    await rename(oldPath, newPath);

                    recoveredItems.push({
                        type: "RECOVERED",
                        name: `Lost: ${fileName}`,
                        quantity: 1,
                        price: 0,
                        subtotal: 0,
                        options: JSON.stringify({ isRecovered: true }),
                        files: JSON.stringify([{
                            original: fileName,
                            server: `${recoveryOrderNumber}/${fileName}`
                        }])
                    });
                } catch (e) {
                    errors.push(fileName);
                }
            }

            // Save Order
            if (recoveredItems.length > 0) {
                await prisma.order.create({
                    data: {
                        orderNumber: recoveryOrderNumber,
                        status: "ON_HOLD",
                        customerName: "SYSTEM RECOVERY",
                        customerFirstName: "SYSTEM",
                        customerLastName: "RECOVERY",
                        customerPhone: "-",
                        customerEmail: "admin@localhost",
                        deliveryMethod: "PICKUP",
                        totalAmount: 0,
                        notes: `AUTO: Recovered ${recoveredItems.length} orphan files.`,
                        items: { create: recoveredItems }
                    }
                });
            }
        }

        // 6. Delete thumbnails of processed orphans (both modes)
        try {
            const thumbFiles = await readdir(thumbDir);
            // If Full: orphans were deleted, so we check if thumb has no original (logic 3 again?).
            // Or just check stored list.
            const targetFiles = isFull ? [] : orphanFiles; // In full mode, files are gone, so logic 3 (or 2nd pass) catches them?
            // Actually, if we deleted Main files, the thumbnails are now orphans.

            // Let's simple iterate thumb again if Full mode
            if (isFull) {
                const updatedMainFiles = new Set(await readdir(uploadsDir).catch(() => []));
                for (const t of thumbFiles) {
                    if (!updatedMainFiles.has(t) && !usedFiles.has(t)) {
                        await unlink(join(thumbDir, t)).catch(() => { });
                        thumbDeleted++;
                    }
                }
            } else {
                // Safe Mode: delete thumbs of items moved to folder
                for (const f of orphanFiles) {
                    if (thumbFiles.includes(f)) {
                        await unlink(join(thumbDir, f)).catch(() => { });
                        thumbDeleted++;
                    }
                }
            }
        } catch (e) { }

        let message = "";
        if (isFull) {
            message = `Full Clean Complete. Deleted ${orphansDeleted} orphans, ${tempDeleted} temp files.`;
        } else {
            message = orphanFiles.length > 0
                ? `Recovered ${orphanFiles.length} orphan files to Order #${recoveryOrderNumber}`
                : "No orphan files found.";
        }

        return NextResponse.json({
            success: true,
            message,
            tempDeleted,
            thumbDeleted,
            orphansRecovered: isFull ? 0 : orphanFiles.length,
            orphansDeleted: isFull ? orphansDeleted : 0,
            recoveryOrderNumber,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error: any) {
        console.error("Cleanup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
