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

        const now = Date.now();
        const ONE_HOUR_MS = 60 * 60 * 1000;

        let tempDeleted = 0;
        let thumbDeleted = 0;
        const orphanFiles: string[] = [];
        const errors: string[] = [];

        // 1. Clean temp folder (chunks older than 1 hour)
        try {
            const tempFiles = await readdir(tempDir);
            for (const file of tempFiles) {
                const filePath = join(tempDir, file);
                const stats = await stat(filePath);
                if (stats.isFile() && (now - stats.mtimeMs) > ONE_HOUR_MS) {
                    await unlink(filePath);
                    tempDeleted++;
                }
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

        // 3. Clean thumbnails without originals
        try {
            const thumbFiles = await readdir(thumbDir);
            const mainFiles = new Set(await readdir(uploadsDir).then(f => f.filter(async x => {
                const s = await stat(join(uploadsDir, x)).catch(() => null);
                return s && s.isFile();
            })));

            // Get actual main files (not dirs)
            const actualMainFiles = new Set<string>();
            const mainItems = await readdir(uploadsDir);
            for (const item of mainItems) {
                const itemPath = join(uploadsDir, item);
                try {
                    const s = await stat(itemPath);
                    if (s.isFile()) actualMainFiles.add(item);
                } catch (e) { }
            }

            for (const thumbFile of thumbFiles) {
                // If no original exists, delete thumbnail
                if (!actualMainFiles.has(thumbFile) && !usedFiles.has(thumbFile)) {
                    await unlink(join(thumbDir, thumbFile));
                    thumbDeleted++;
                }
            }
        } catch (e) { /* thumb folder may not exist */ }

        // 4. Find orphan files (main files not in any order)
        // Only consider files older than 24 hours to protect active sessions
        const ORPHAN_MIN_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

        try {
            const mainItems = await readdir(uploadsDir);
            for (const item of mainItems) {
                // Skip directories and hidden files
                if (item.startsWith('.')) continue;

                const itemPath = join(uploadsDir, item);
                try {
                    const s = await stat(itemPath);
                    if (s.isDirectory()) continue;

                    // Skip files younger than 24 hours (protect active sessions/drafts)
                    const fileAge = now - s.mtimeMs;
                    if (fileAge < ORPHAN_MIN_AGE_MS) continue;

                    // Check if file is used in any order
                    if (!usedFiles.has(item)) {
                        orphanFiles.push(item);
                    }
                } catch (e) { }
            }
        } catch (e) { /* main folder may not exist */ }

        // 5. If orphans found, create recovery order
        let recoveryOrderNumber: string | null = null;
        if (orphanFiles.length > 0) {
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

        // 6. Also delete orphan thumbnails now that originals are moved
        try {
            const thumbFiles = await readdir(thumbDir);
            for (const f of orphanFiles) {
                if (thumbFiles.includes(f)) {
                    await unlink(join(thumbDir, f)).catch(() => { });
                    thumbDeleted++;
                }
            }
        } catch (e) { }

        const message = orphanFiles.length > 0
            ? `Recovered ${orphanFiles.length} orphan files to Order #${recoveryOrderNumber}`
            : "No orphan files found.";

        return NextResponse.json({
            success: true,
            message,
            tempDeleted,
            thumbDeleted,
            orphansRecovered: orphanFiles.length,
            recoveryOrderNumber,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error: any) {
        console.error("Cleanup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
