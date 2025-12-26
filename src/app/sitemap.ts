import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fujimir.com.ua'

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/upload`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    // Dynamic CMS pages
    let cmsPages: MetadataRoute.Sitemap = []
    try {
        const pages = await prisma.page.findMany({
            where: { isActive: true },
            select: { slug: true, lang: true, updatedAt: true },
        })

        cmsPages = pages.map((page) => ({
            url: `${baseUrl}/p/${page.slug}${page.lang !== 'uk' ? `?lang=${page.lang}` : ''}`,
            lastModified: page.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error('Error fetching pages for sitemap:', error)
    }

    return [...staticPages, ...cmsPages]
}
