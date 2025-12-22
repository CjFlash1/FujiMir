import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import JSZip from "jszip";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: parseInt(params.id) },
            include: { items: true },
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const zip = new JSZip();
        const orderFolder = zip.folder(`Order_${order.orderNumber}`);

        // Logic for folder organization
        for (const item of order.items) {
            const options = JSON.parse(item.options || "{}");

            // Calculate Folder Name: Size_Paper_Option1_Option2
            let folderName = `${item.size}_${item.paper}`;
            const activeOptions = Object.entries(options)
                .filter(([_, val]) => val)
                .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));

            if (activeOptions.length > 0) {
                folderName += `_${activeOptions.join("_")}`;
            }

            const itemFolder = orderFolder?.folder(folderName);
            const fileList = JSON.parse(item.files || "[]");

            // In a real app, we would read the actual file from disk/S3 here
            // const fileData = await fs.readFile(`./uploads/${order.id}/${fileName}`);
            // For this demo, we'll create a text file as a placeholder
            for (const fileName of fileList) {
                itemFolder?.file(
                    fileName || "photo.jpg",
                    `Dummy data for ${fileName}. In production, this would be the actual image buffer.`
                );
            }
        }

        const content = await zip.generateAsync({ type: "nodebuffer" });

        return new Response(content as any, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename=Order_${order.orderNumber}.zip`,
            },
        });
    } catch (error) {
        console.error("ZIP Generation failed:", error);
        return NextResponse.json({ error: "Failed to generate ZIP" }, { status: 500 });
    }
}
