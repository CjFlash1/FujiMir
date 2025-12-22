import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    // 1. Paper Types
    await prisma.paperType.upsert({ where: { slug: 'glossy' }, update: {}, create: { name: 'Glossy', slug: 'glossy' } })
    await prisma.paperType.upsert({ where: { slug: 'matte' }, update: {}, create: { name: 'Matte', slug: 'matte' } })

    // 2. Print Options
    await prisma.printOption.upsert({ where: { slug: 'border' }, update: {}, create: { name: 'Border', slug: 'border', price: 0, priceType: 'FIXED' } })
    await prisma.printOption.upsert({ where: { slug: 'magnetic' }, update: {}, create: { name: 'Magnetic', slug: 'magnetic', price: 15, priceType: 'FIXED' } })

    // 3. Print Sizes
    const sizes = [
        { name: '9x13', price: 3.50 },
        { name: '10x15', price: 4.00 },
        { name: '13x18', price: 5.50 },
        { name: '15x20', price: 7.00 },
        { name: '20x30', price: 15.00 },
    ]

    for (const s of sizes) {
        await prisma.printSize.upsert({
            where: { slug: s.name },
            update: {},
            create: { name: s.name, slug: s.name, basePrice: s.price }
        })
    }

    // 4. Translations (Basic)
    const translations = [
        { key: 'nav.upload', val: { uk: 'Завантажити', en: 'Upload', ru: 'Загрузить' } },
        { key: 'nav.pricing', val: { uk: 'Ціни', en: 'Pricing', ru: 'Цены' } },
        { key: 'hero.title', val: { uk: 'Друк фото онлайн', en: 'Online Photo Printing', ru: 'Печать фото онлайн' } },
        { key: 'hero.subtitle', val: { uk: 'Якісно та швидко', en: 'Quality & Fast', ru: 'Качественно и быстро' } },
    ]

    for (const t of translations) {
        await prisma.translation.upsert({ where: { lang_key: { lang: 'uk', key: t.key } }, update: {}, create: { lang: 'uk', key: t.key, value: t.val.uk } })
        await prisma.translation.upsert({ where: { lang_key: { lang: 'en', key: t.key } }, update: {}, create: { lang: 'en', key: t.key, value: t.val.en } })
        await prisma.translation.upsert({ where: { lang_key: { lang: 'ru', key: t.key } }, update: {}, create: { lang: 'ru', key: t.key, value: t.val.ru } })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
