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

    // 4. Translations (Extensive)
    const translations = [
        // Navigation
        { key: 'nav.upload', val: { uk: 'Завантажити фотографії', en: 'Upload Photos', ru: 'Закачать фотографии' } },
        { key: 'nav.pricing', val: { uk: 'Ціни', en: 'Pricing', ru: 'Цены' } },
        { key: 'nav.about', val: { uk: 'Про нас', en: 'About US', ru: 'О нас' } },
        { key: 'nav.contact', val: { uk: 'Контакти', en: 'Contact', ru: 'Контакты' } },
        { key: 'nav.help', val: { uk: 'Помощь', en: 'Help', ru: 'Помощь' } },
        { key: 'nav.signin', val: { uk: 'Увійти', en: 'Sign In', ru: 'Войти' } },

        // Checkout UI
        { key: 'checkout.summary', val: { uk: 'Підсумок замовлення', en: 'Order Summary', ru: 'Итог заказа' } },
        { key: 'checkout.total', val: { uk: 'Всього', en: 'Total', ru: 'Всего' } },
        { key: 'checkout.bonus', val: { uk: 'Бонус', en: 'Bonus', ru: 'Бонус' } },
        { key: 'checkout.free', val: { uk: 'Безкоштовно', en: 'Free', ru: 'Бесплатно' } },
        { key: 'checkout.placeOrder', val: { uk: 'Оформити замовлення', en: 'Place Order', ru: 'Оформить заказ' } },
        { key: 'common.processing', val: { uk: 'Обробка...', en: 'Processing...', ru: 'Обработка...' } },

        // Options Labels
        { key: 'Border', val: { uk: 'З рамкою', en: 'With Border', ru: 'С рамкой' } },
        { key: 'Magnet', val: { uk: 'Магніт', en: 'Magnet', ru: 'Магнит' } },
        { key: 'prints', val: { uk: 'шт.', en: 'pcs.', ru: 'шт.' } },

        // Admin Sidebar
        { key: 'admin.dashboard', val: { uk: 'Панель', en: 'Dashboard', ru: 'Панель' } },
        { key: 'admin.orders', val: { uk: 'Замовлення', en: 'Orders', ru: 'Заказы' } },
        { key: 'admin.content', val: { uk: 'Медіа / Контент', en: 'Media / Content', ru: 'Медиа / Контент' } },
        { key: 'admin.users', val: { uk: 'Користувачі', en: 'Users', ru: 'Пользователи' } },
        { key: 'admin.pages', val: { uk: 'Сторінки CMS', en: 'CMS Pages', ru: 'Страницы CMS' } },
        { key: 'admin.translations', val: { uk: 'Переклади', en: 'Translations', ru: 'Переводы' } },
        { key: 'admin.settings', val: { uk: 'Налаштування', en: 'Global Settings', ru: 'Настройки' } },
        { key: 'admin.config', val: { uk: 'Конфігурація', en: 'System Config', ru: 'Конфигурация' } },

        // Config Submenu
        { key: 'config.sizes', val: { uk: 'Розміри', en: 'Print Sizes', ru: 'Размеры' } },
        { key: 'config.papers', val: { uk: 'Типи паперу', en: 'Paper Types', ru: 'Типы бумаги' } },
        { key: 'config.options', val: { uk: 'Опції', en: 'Extra Options', ru: 'Опции' } },
        { key: 'config.gifts', val: { uk: 'Подарунки', en: 'Gifts', ru: 'Подарки' } },
        { key: 'config.discounts', val: { uk: 'Знижки', en: 'Discounts', ru: 'Скидки' } },
    ]

    for (const t of translations) {
        await prisma.translation.upsert({ where: { lang_key: { lang: 'uk', key: t.key } }, update: { value: t.val.uk }, create: { lang: 'uk', key: t.key, value: t.val.uk } })
        await prisma.translation.upsert({ where: { lang_key: { lang: 'en', key: t.key } }, update: { value: t.val.en }, create: { lang: 'en', key: t.key, value: t.val.en } })
        await prisma.translation.upsert({ where: { lang_key: { lang: 'ru', key: t.key } }, update: { value: t.val.ru }, create: { lang: 'ru', key: t.key, value: t.val.ru } })
    }

    // 5. Sample Volume Discounts & Gifts
    const size10x15 = await prisma.printSize.findUnique({ where: { slug: '10x15' } });
    if (size10x15) {
        await prisma.volumeDiscount.upsert({
            where: { id: 1 },
            update: { price: 3.80 },
            create: { id: 1, printSizeId: size10x15.id, minQuantity: 51, price: 3.80 }
        });
        await prisma.volumeDiscount.upsert({
            where: { id: 2 },
            update: { price: 3.50 },
            create: { id: 2, printSizeId: size10x15.id, minQuantity: 101, price: 3.50 }
        });
    }

    // 6. Default Informational Pages
    const pages = [
        {
            title: 'О нас',
            slug: 'about',
            content: `
                <h1 style="color: #009846;">FUJI-Мир: Профессиональный подход к вашим снимкам</h1>
                <p>Предприятие «FUJI-Мир» — лидер на рынке цифровой фотопечати, предлагающий услуги как для фотолюбителей, так и для профессионалов. Мы используем передовое оборудование Fuji Frontier 500 и оригинальную фотобумагу Fujicolor Crystal Archive Paper.</p>
                <h3 style="color: #e31e24;">Наши преимущества:</h3>
                <ul>
                    <li><strong>Image Intelligence™:</strong> Автоматическая оптимизация каждого снимка.</li>
                    <li><strong>Ручная коррекция:</strong> Каждый файл проверяется оператором.</li>
                    <li><strong>Долговечность:</strong> Снимки не выцветают десятилетиями.</li>
                </ul>
            `,
            description: 'О нашем фотоцентре Fujimir',
            isActive: true
        },
        {
            title: 'Помощь (FAQ)',
            slug: 'help',
            content: `
                <h1 style="color: #009846;">Техническая информация и требования</h1>
                <h2 style="color: #e31e24;">Размеры фотографий</h2>
                <table style="width: 100%; border-collapse: collapse; margin: 10px 0; border: 1px solid #c5b98e;">
                    <tr style="background: #c5b98e; color: white;"><th>Формат</th><th>Размер (мм)</th></tr>
                    <tr><td>9x13</td><td>89 x 127</td></tr>
                    <tr style="background: #f9f7f0;"><td>10x15</td><td>102 x 152</td></tr>
                    <tr><td>13x18</td><td>127 x 178</td></tr>
                    <tr style="background: #f9f7f0;"><td>15x21</td><td>152 x 210</td></tr>
                    <tr><td>20x30</td><td>203 x 305</td></tr>
                </table>
                <h2 style="color: #e31e24;">Требования к файлам</h2>
                <p>Мы принимаем файлы в формате <strong>JPEG RGB</strong>. Рекомендуемое разрешение — 300 dpi. Из-за особенностей оборудования при печати может происходить обрезка по 2мм с каждой стороны — не располагайте важные детали вплотную к краям.</p>
            `,
            description: 'Часто задаваемые вопросы и технические требования',
            isActive: true
        },
        {
            title: 'Контакти',
            slug: 'contact',
            content: '<h1>Контактна інформація</h1><p>Зв\'яжіться з нами зручним для вас способом.</p>',
            description: 'Як нас знайти та як з нами зв\'язатися',
            isActive: true
        }
    ];

    for (const p of pages) {
        await prisma.page.upsert({
            where: { slug: p.slug },
            update: { ...p },
            create: { ...p }
        });
    }

    // 7. Social Links Settings
    const defaultSettings = [
        { key: 'viber_link', value: 'viber://chat?number=+380000000000', description: 'Viber chat link' },
        { key: 'telegram_link', value: 'https://t.me/fujimir', description: 'Telegram chat link' },
        { key: 'viber_active', value: 'true', description: 'Show Viber button' },
        { key: 'telegram_active', value: 'true', description: 'Show Telegram button' },
    ];

    for (const s of defaultSettings) {
        await prisma.setting.upsert({
            where: { key: s.key },
            update: { description: s.description },
            create: { ...s }
        });
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
