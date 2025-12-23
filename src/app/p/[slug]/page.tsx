import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page) {
        notFound();
    }

    <div className="min-h-screen bg-[#f3f1e9] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-[#c5b98e]/20">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-black tracking-tight text-[#009846] sm:text-5xl uppercase italic">
                    {page.title}
                </h1>
                <div className="h-1 w-24 bg-[#e31e24] mx-auto mt-6 rounded-full" />
            </header>

            <div
                className="prose prose-green prose-lg max-w-none 
                    prose-headings:font-black prose-headings:text-[#009846]
                    prose-p:text-[#4c4c4c] prose-p:leading-relaxed
                    prose-li:text-[#4c4c4c]
                    prose-strong:text-[#4c4c4c] prose-strong:font-black
                    prose-a:text-[#e31e24] prose-a:font-black underline-offset-4"
                dangerouslySetInnerHTML={{ __html: page.content }}
            />
        </div>
    </div>
    );
}

// Optional: Static params for performance if we know all pages. 
// For a CMS, it's usually dynamic or revalidated.
export const revalidate = 3600; // revalidate every hour
