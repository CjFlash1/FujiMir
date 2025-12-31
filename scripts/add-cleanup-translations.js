const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const translations = [
    // Ukrainian
    { lang: 'uk', key: 'admin.storage', value: 'Сховище' },
    { lang: 'uk', key: 'admin.files', value: 'файлів' },
    { lang: 'uk', key: 'admin.cleanup', value: 'Очистка' },
    { lang: 'uk', key: 'admin.cleanup_confirm', value: 'Запустити очистку сховища? Загублені файли будуть перенесені в окреме замовлення для перегляду.' },
    { lang: 'uk', key: 'admin.no_orphans', value: 'Загублених файлів не знайдено. Сховище чисте!' },
    // Russian
    { lang: 'ru', key: 'admin.storage', value: 'Хранилище' },
    { lang: 'ru', key: 'admin.files', value: 'файлов' },
    { lang: 'ru', key: 'admin.cleanup', value: 'Очистка' },
    { lang: 'ru', key: 'admin.cleanup_confirm', value: 'Запустить очистку хранилища? Потерянные файлы будут перенесены в отдельный заказ для просмотра.' },
    { lang: 'ru', key: 'admin.no_orphans', value: 'Потерянных файлов не найдено. Хранилище чистое!' },
    // English
    { lang: 'en', key: 'admin.storage', value: 'Storage' },
    { lang: 'en', key: 'admin.files', value: 'files' },
    { lang: 'en', key: 'admin.cleanup', value: 'Cleanup' },
    { lang: 'en', key: 'admin.cleanup_confirm', value: 'Run storage cleanup? Lost files will be moved to a separate order for review.' },
    { lang: 'en', key: 'admin.no_orphans', value: 'No lost files found. Storage is clean!' },
];

async function main() {
    for (const t of translations) {
        await prisma.translation.upsert({
            where: { lang_key: { lang: t.lang, key: t.key } },
            update: { value: t.value },
            create: t
        });
        console.log(`Added: ${t.lang}/${t.key}`);
    }
    console.log('Done!');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
