const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const translations = [
        { lang: 'uk', key: 'home.cta_desc', value: 'Завантажуйте фото просто зараз і зберігайте спогади!' },
        { lang: 'ru', key: 'home.cta_desc', value: 'Загружайте фото прямо сейчас и сохраняйте воспоминания!' },
        { lang: 'en', key: 'home.cta_desc', value: 'Upload photos right now and preserve your memories!' }
    ];

    for (const t of translations) {
        const existing = await prisma.translation.findFirst({
            where: { lang: t.lang, key: t.key }
        });

        if (existing) {
            await prisma.translation.update({
                where: { id: existing.id },
                data: { value: t.value }
            });
            console.log(`Updated ${t.lang}.${t.key}`);
        } else {
            await prisma.translation.create({
                data: { lang: t.lang, key: t.key, value: t.value }
            });
            console.log(`Created ${t.lang}.${t.key}`);
        }
    }
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
