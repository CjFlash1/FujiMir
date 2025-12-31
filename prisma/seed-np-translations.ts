
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const translations = [
        // Settings
        { key: 'settings.integrations', uk: 'Інтеграції та API', ru: 'Интеграции и API', en: 'Integrations & API' },
        { key: 'settings.integrations_desc', uk: 'Налаштування зовнішніх сервісів', ru: 'Настройка внешних сервисов', en: 'External services settings' },
        { key: 'settings.np_api_key', uk: 'Ключ API Нової Пошти', ru: 'Ключ API Новой Почты', en: 'Nova Poshta API Key' },

        // TTN Modal & Orders
        { key: 'ttn.create_title', uk: 'Створення ТТН (Нова Пошта)', ru: 'Создание ТТН (Новая Почта)', en: 'Create Waybill (Nova Poshta)' },
        { key: 'ttn.package_params', uk: 'Параметри посилки', ru: 'Параметры посылки', en: 'Package Parameters' },
        { key: 'ttn.p_weight', uk: 'Вага (кг)', ru: 'Вес (кг)', en: 'Weight (kg)' },
        { key: 'ttn.p_width', uk: 'Ширина (см)', ru: 'Ширина (см)', en: 'Width (cm)' },
        { key: 'ttn.p_height', uk: 'Висота (см)', ru: 'Высота (см)', en: 'Height (cm)' },
        { key: 'ttn.p_length', uk: 'Довжина (см)', ru: 'Длина (см)', en: 'Length (cm)' },
        { key: 'ttn.p_cost', uk: 'Оцінка (грн)', ru: 'Оценка (грн)', en: 'Value (UAH)' },
        { key: 'ttn.payer', uk: 'Хто сплачує доставку:', ru: 'Кто платит за доставку:', en: 'Payer:' },
        { key: 'ttn.payer_recipient', uk: 'Отримувач', ru: 'Получатель', en: 'Recipient' },
        { key: 'ttn.payer_sender', uk: 'Відправник', ru: 'Отправитель', en: 'Sender' },

        { key: 'ttn.sender_section', uk: 'Дані відправника', ru: 'Данные отправителя', en: 'Sender Details' },
        { key: 'ttn.sender_select', uk: 'Виберіть збереженого...', ru: 'Выберите сохраненного...', en: 'Select saved...' },
        { key: 'ttn.sender_lastname', uk: 'Прізвище', ru: 'Фамилия', en: 'Last Name' },
        { key: 'ttn.sender_firstname', uk: 'Ім\'я', ru: 'Имя', en: 'First Name' },
        { key: 'ttn.sender_phone', uk: 'Телефон', ru: 'Телефон', en: 'Phone' },
        { key: 'ttn.sender_from', uk: 'Звідки відправляємо', ru: 'Откуда отправляем', en: 'Departure Point' },
        { key: 'ttn.sender_save', uk: 'Зберегти відправника', ru: 'Сохранить отправителя', en: 'Save Sender' },
        { key: 'ttn.sender_delete', uk: 'Видалити', ru: 'Удалить', en: 'Delete' },

        { key: 'ttn.recipient_section', uk: 'Дані отримувача', ru: 'Данные получателя', en: 'Recipient Details' },
        { key: 'ttn.recipient_lastname', uk: 'Прізвище', ru: 'Фамилия', en: 'Last Name' },
        { key: 'ttn.recipient_firstname', uk: 'Ім\'я', ru: 'Имя', en: 'First Name' },
        { key: 'ttn.recipient_phone', uk: 'Телефон', ru: 'Телефон', en: 'Phone' },
        { key: 'ttn.recipient_city', uk: 'Місто отримання', ru: 'Город получения', en: 'Destination City' },
        { key: 'ttn.recipient_warehouse', uk: 'Відділення', ru: 'Отделение', en: 'Warehouse' },

        { key: 'ttn.generate_btn', uk: 'Сформувати ТТН', ru: 'Сформировать ТТН', en: 'Generate Waybill' },
        { key: 'ttn.cancel_btn', uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' },

        { key: 'ttn.validate_recipient', uk: 'Знайти/Створити отримувача', ru: 'Найти/Создать получателя', en: 'Find/Create Recipient' },
        { key: 'ttn.search_placeholder', uk: 'Телефон отримувача', ru: 'Телефон получателя', en: 'Recipient Phone' },

        // New keys
        { key: 'ttn.loading', uk: 'Очікуйте...', ru: 'Ожидайте...', en: 'Please wait...' },
        { key: 'ttn.attention_title', uk: 'Увага!', ru: 'Внимание!', en: 'Attention!' },
        { key: 'ttn.attention_desc', uk: 'Вкажіть місто та відділення Нової Пошти за допомогою пошуку вище.', ru: 'Укажите город и отделение Новой Почты с помощью поиска выше.', en: 'Please specify the Nova Poshta city and warehouse using the search above.' }
    ]

    console.log(`Starting seeding translations...`)

    for (const t of translations) {
        await prisma.translation.upsert({
            where: {
                lang_key: { lang: 'uk', key: t.key }
            },
            update: { value: t.uk },
            create: { lang: 'uk', key: t.key, value: t.uk }
        })
        await prisma.translation.upsert({
            where: {
                lang_key: { lang: 'ru', key: t.key }
            },
            update: { value: t.ru },
            create: { lang: 'ru', key: t.key, value: t.ru }
        })
        await prisma.translation.upsert({
            where: {
                lang_key: { lang: 'en', key: t.key }
            },
            update: { value: t.en },
            create: { lang: 'en', key: t.key, value: t.en }
        })
    }

    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
