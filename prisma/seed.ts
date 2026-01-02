import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const settings = [
  {
    "key": "contact_address",
    "value": "м. Дніпро, вул. Європейська (Миронова), 8",
    "description": "contact address"
  },
  {
    "key": "contact_address_en",
    "value": "8 Yevropeiska St, Dnipro, Ukraine",
    "description": "contact_address_en"
  },
  {
    "key": "contact_address_ru",
    "value": "г. Днепр, ул. Европейская, 8",
    "description": "contact_address_ru"
  },
  {
    "key": "contact_address_uk",
    "value": "м. Дніпро, вул. Європейська, 8",
    "description": "contact_address_uk"
  },
  {
    "key": "contact_email",
    "value": "fujimir@ukr.net",
    "description": "contact_email"
  },
  {
    "key": "contact_phone",
    "value": "+380992150317",
    "description": "contact phone"
  },
  {
    "key": "contact_phone1",
    "value": "+380992150317",
    "description": "contact_phone1"
  },
  {
    "key": "contact_phone2",
    "value": "+380984927387",
    "description": "contact_phone2"
  },
  {
    "key": "contact_schedule_en",
    "value": "Mon-Sat 9:30-18:30 (Sun closed)",
    "description": "contact_schedule_en"
  },
  {
    "key": "contact_schedule_ru",
    "value": "Пн-Сб 9:30-18:30 (Вс - выходной)",
    "description": "contact_schedule_ru"
  },
  {
    "key": "contact_schedule_uk",
    "value": "Пн-Сб 9:30-18:30 (Нд - вихідний)",
    "description": "contact_schedule_uk"
  },
  {
    "key": "logo_subtitle_ru",
    "value": "ФОТОЛАБОРАТОРИЯ",
    "description": "logo_subtitle_ru"
  },
  {
    "key": "logo_subtitle_uk",
    "value": "ФОТОЛАБОРАТОРІЯ",
    "description": "logo_subtitle_uk"
  },
  {
    "key": "logo_suffix_en",
    "value": "FUJIMIR",
    "description": "logo_suffix_en"
  },
  {
    "key": "novaposhta_api_key",
    "value": "",
    "description": null
  },
  {
    "key": "polaroid_frame_price",
    "value": "10.00",
    "description": "polaroid frame_price"
  },
  {
    "key": "telegram_active",
    "value": "true",
    "description": "telegram_active"
  },
  {
    "key": "telegram_link",
    "value": "https://t.me/+380992150317",
    "description": "telegram_link"
  },
  {
    "key": "viber_active",
    "value": "true",
    "description": "viber_active"
  },
  {
    "key": "viber_link",
    "value": "viber://chat?number=%2B380992150317",
    "description": "viber_link"
  }
];
const translations = [
  {
    "id": 1,
    "lang": "en",
    "key": "Are you sure you want to delete selected orders?",
    "value": "Are you sure you want to delete selected orders?"
  },
  {
    "id": 2,
    "lang": "ru",
    "key": "Are you sure you want to delete selected orders?",
    "value": "Вы уверены, что хотите удалить выбранные заказы?"
  },
  {
    "id": 3,
    "lang": "uk",
    "key": "Are you sure you want to delete selected orders?",
    "value": "Ви впевнені, що хочете видалити обрані замовлення?"
  },
  {
    "id": 4,
    "lang": "en",
    "key": "Are you sure you want to delete this order? This action cannot be undone.",
    "value": "Are you sure you want to delete this order? This action cannot be undone."
  },
  {
    "id": 5,
    "lang": "ru",
    "key": "Are you sure you want to delete this order? This action cannot be undone.",
    "value": "Вы уверены, что хотите удалить этот заказ? Это действие невозможно отменить."
  },
  {
    "id": 6,
    "lang": "uk",
    "key": "Are you sure you want to delete this order? This action cannot be undone.",
    "value": "Ви впевнені, що хочете видалити це замовлення? Цю дію неможливо відмінити."
  },
  {
    "id": 7,
    "lang": "en",
    "key": "Border",
    "value": "Border"
  },
  {
    "id": 8,
    "lang": "ru",
    "key": "Border",
    "value": "Рамка"
  },
  {
    "id": 9,
    "lang": "uk",
    "key": "Border",
    "value": "Рамка"
  },
  {
    "id": 10,
    "lang": "en",
    "key": "CANCELLED",
    "value": "Cancelled"
  },
  {
    "id": 11,
    "lang": "ru",
    "key": "CANCELLED",
    "value": "Отменено"
  },
  {
    "id": 12,
    "lang": "uk",
    "key": "CANCELLED",
    "value": "Скасовано"
  },
  {
    "id": 13,
    "lang": "en",
    "key": "COMPLETED",
    "value": "Completed"
  },
  {
    "id": 14,
    "lang": "ru",
    "key": "COMPLETED",
    "value": "Выполнено"
  },
  {
    "id": 15,
    "lang": "uk",
    "key": "COMPLETED",
    "value": "Виконано"
  },
  {
    "id": 16,
    "lang": "en",
    "key": "Cancel",
    "value": "Cancel"
  },
  {
    "id": 17,
    "lang": "ru",
    "key": "Cancel",
    "value": "Отмена"
  },
  {
    "id": 18,
    "lang": "uk",
    "key": "Cancel",
    "value": "Скасувати"
  },
  {
    "id": 19,
    "lang": "en",
    "key": "Contact Us",
    "value": "Contact Us"
  },
  {
    "id": 20,
    "lang": "ru",
    "key": "Contact Us",
    "value": "Свяжитесь с нами"
  },
  {
    "id": 21,
    "lang": "uk",
    "key": "Contact Us",
    "value": "Зв'яжіться з нами"
  },
  {
    "id": 22,
    "lang": "en",
    "key": "Delete Order",
    "value": "Delete Order"
  },
  {
    "id": 23,
    "lang": "ru",
    "key": "Delete Order",
    "value": "Удалить заказ"
  },
  {
    "id": 24,
    "lang": "uk",
    "key": "Delete Order",
    "value": "Видалити замовлення"
  },
  {
    "id": 25,
    "lang": "en",
    "key": "Deselect All",
    "value": "Deselect All"
  },
  {
    "id": 26,
    "lang": "ru",
    "key": "Deselect All",
    "value": "Снять выделение"
  },
  {
    "id": 27,
    "lang": "uk",
    "key": "Deselect All",
    "value": "Зняти виділення"
  },
  {
    "id": 28,
    "lang": "en",
    "key": "Download Archive",
    "value": "Download Archive"
  },
  {
    "id": 29,
    "lang": "ru",
    "key": "Download Archive",
    "value": "Скачать архив"
  },
  {
    "id": 30,
    "lang": "uk",
    "key": "Download Archive",
    "value": "Завантажити архів"
  },
  {
    "id": 31,
    "lang": "en",
    "key": "Drag & drop photos here, or click to select",
    "value": "Drag & drop photos here, or click to select"
  },
  {
    "id": 32,
    "lang": "ru",
    "key": "Drag & drop photos here, or click to select",
    "value": "Перетащите фото сюда или нажмите для выбора"
  },
  {
    "id": 33,
    "lang": "uk",
    "key": "Drag & drop photos here, or click to select",
    "value": "Перетягніть фото сюди або натисніть для вибору"
  },
  {
    "id": 34,
    "lang": "en",
    "key": "Duplicate All",
    "value": "Duplicate All"
  },
  {
    "id": 35,
    "lang": "ru",
    "key": "Duplicate All",
    "value": "Дублировать все"
  },
  {
    "id": 36,
    "lang": "uk",
    "key": "Duplicate All",
    "value": "Дублювати все"
  },
  {
    "id": 37,
    "lang": "en",
    "key": "Duplicate Selected",
    "value": "Duplicate Selected"
  },
  {
    "id": 38,
    "lang": "ru",
    "key": "Duplicate Selected",
    "value": "Дублировать выбранные"
  },
  {
    "id": 39,
    "lang": "uk",
    "key": "Duplicate Selected",
    "value": "Дублювати обрані"
  },
  {
    "id": 40,
    "lang": "en",
    "key": "Edit Selected",
    "value": "Edit Selected"
  },
  {
    "id": 41,
    "lang": "ru",
    "key": "Edit Selected",
    "value": "Редактировать выбранные"
  },
  {
    "id": 42,
    "lang": "uk",
    "key": "Edit Selected",
    "value": "Редагувати обрані"
  },
  {
    "id": 43,
    "lang": "en",
    "key": "Extra Options",
    "value": "Extra Options"
  },
  {
    "id": 44,
    "lang": "ru",
    "key": "Extra Options",
    "value": "Дополнительные опции"
  },
  {
    "id": 45,
    "lang": "uk",
    "key": "Extra Options",
    "value": "Додаткові опції"
  },
  {
    "id": 46,
    "lang": "en",
    "key": "Extras",
    "value": "Extras"
  },
  {
    "id": 47,
    "lang": "ru",
    "key": "Extras",
    "value": "Доп. опции"
  },
  {
    "id": 48,
    "lang": "uk",
    "key": "Extras",
    "value": "Додатково"
  },
  {
    "id": 49,
    "lang": "en",
    "key": "Glossy",
    "value": "Glossy"
  },
  {
    "id": 50,
    "lang": "ru",
    "key": "Glossy",
    "value": "Глянцевая"
  },
  {
    "id": 51,
    "lang": "uk",
    "key": "Glossy",
    "value": "Глянцевий"
  },
  {
    "id": 52,
    "lang": "en",
    "key": "Loading...",
    "value": "Loading..."
  },
  {
    "id": 53,
    "lang": "ru",
    "key": "Loading...",
    "value": "Загрузка..."
  },
  {
    "id": 54,
    "lang": "uk",
    "key": "Loading...",
    "value": "Завантаження..."
  },
  {
    "id": 55,
    "lang": "en",
    "key": "Magnetic",
    "value": "Magnetic"
  },
  {
    "id": 56,
    "lang": "ru",
    "key": "Magnetic",
    "value": "Магнит"
  },
  {
    "id": 57,
    "lang": "uk",
    "key": "Magnetic",
    "value": "Магніт"
  },
  {
    "id": 58,
    "lang": "en",
    "key": "Matte",
    "value": "Matte"
  },
  {
    "id": 59,
    "lang": "ru",
    "key": "Matte",
    "value": "Матовая"
  },
  {
    "id": 60,
    "lang": "uk",
    "key": "Matte",
    "value": "Матовий"
  },
  {
    "id": 61,
    "lang": "en",
    "key": "No bulk discounts available",
    "value": "No bulk discounts available"
  },
  {
    "id": 62,
    "lang": "ru",
    "key": "No bulk discounts available",
    "value": "Оптовые скидки отсутствуют"
  },
  {
    "id": 63,
    "lang": "uk",
    "key": "No bulk discounts available",
    "value": "Оптові знижки відсутні"
  },
  {
    "id": 64,
    "lang": "en",
    "key": "No orders found",
    "value": "No orders found"
  },
  {
    "id": 65,
    "lang": "ru",
    "key": "No orders found",
    "value": "Заказы не найдены"
  },
  {
    "id": 66,
    "lang": "uk",
    "key": "No orders found",
    "value": "Замовлення не знайдено"
  },
  {
    "id": 67,
    "lang": "en",
    "key": "Option",
    "value": "Option"
  },
  {
    "id": 68,
    "lang": "ru",
    "key": "Option",
    "value": "Опция"
  },
  {
    "id": 69,
    "lang": "uk",
    "key": "Option",
    "value": "Опція"
  },
  {
    "id": 70,
    "lang": "en",
    "key": "PENDING",
    "value": "Pending"
  },
  {
    "id": 71,
    "lang": "ru",
    "key": "PENDING",
    "value": "Ожидает"
  },
  {
    "id": 72,
    "lang": "uk",
    "key": "PENDING",
    "value": "Очікує"
  },
  {
    "id": 73,
    "lang": "en",
    "key": "PROCESSING",
    "value": "Processing"
  },
  {
    "id": 74,
    "lang": "ru",
    "key": "PROCESSING",
    "value": "В обработке"
  },
  {
    "id": 75,
    "lang": "uk",
    "key": "PROCESSING",
    "value": "В обробці"
  },
  {
    "id": 76,
    "lang": "en",
    "key": "Paper Type",
    "value": "Paper Type"
  },
  {
    "id": 77,
    "lang": "ru",
    "key": "Paper Type",
    "value": "Тип бумаги"
  },
  {
    "id": 78,
    "lang": "uk",
    "key": "Paper Type",
    "value": "Тип паперу"
  },
  {
    "id": 79,
    "lang": "en",
    "key": "Photo",
    "value": "Photo"
  },
  {
    "id": 80,
    "lang": "ru",
    "key": "Photo",
    "value": "Фото"
  },
  {
    "id": 81,
    "lang": "uk",
    "key": "Photo",
    "value": "Фото"
  },
  {
    "id": 82,
    "lang": "en",
    "key": "Price",
    "value": "Price"
  },
  {
    "id": 83,
    "lang": "ru",
    "key": "Price",
    "value": "Цена"
  },
  {
    "id": 84,
    "lang": "uk",
    "key": "Price",
    "value": "Ціна"
  },
  {
    "id": 85,
    "lang": "en",
    "key": "Print Settings",
    "value": "Print Settings"
  },
  {
    "id": 86,
    "lang": "ru",
    "key": "Print Settings",
    "value": "Настройки печати"
  },
  {
    "id": 87,
    "lang": "uk",
    "key": "Print Settings",
    "value": "Налаштування друку"
  },
  {
    "id": 88,
    "lang": "en",
    "key": "Professional photo printing with high-quality Fuji materials. Choose your size and options below.",
    "value": "Professional photo printing with high-quality Fuji materials. Choose your size and options below."
  },
  {
    "id": 89,
    "lang": "ru",
    "key": "Professional photo printing with high-quality Fuji materials. Choose your size and options below.",
    "value": "Профессиональная фотопечать на качественных материалах Fuji. Выберите размер и опции."
  },
  {
    "id": 90,
    "lang": "uk",
    "key": "Professional photo printing with high-quality Fuji materials. Choose your size and options below.",
    "value": "Професійний фотодрук на якісних матеріалах Fuji. Оберіть розмір та опції."
  },
  {
    "id": 91,
    "lang": "en",
    "key": "Quantity",
    "value": "Quantity"
  },
  {
    "id": 92,
    "lang": "ru",
    "key": "Quantity",
    "value": "Количество"
  },
  {
    "id": 93,
    "lang": "uk",
    "key": "Quantity",
    "value": "Кількість"
  },
  {
    "id": 94,
    "lang": "en",
    "key": "Save Changes",
    "value": "Save Changes"
  },
  {
    "id": 95,
    "lang": "ru",
    "key": "Save Changes",
    "value": "Сохранить изменения"
  },
  {
    "id": 96,
    "lang": "uk",
    "key": "Save Changes",
    "value": "Зберегти зміни"
  },
  {
    "id": 97,
    "lang": "en",
    "key": "Saved",
    "value": "Saved"
  },
  {
    "id": 98,
    "lang": "ru",
    "key": "Saved",
    "value": "Сохранено"
  },
  {
    "id": 99,
    "lang": "uk",
    "key": "Saved",
    "value": "Збережено"
  },
  {
    "id": 100,
    "lang": "en",
    "key": "Select All",
    "value": "Select All"
  },
  {
    "id": 101,
    "lang": "ru",
    "key": "Select All",
    "value": "Выделить все"
  },
  {
    "id": 102,
    "lang": "uk",
    "key": "Select All",
    "value": "Виділити все"
  },
  {
    "id": 103,
    "lang": "en",
    "key": "Select Files",
    "value": "Select Files"
  },
  {
    "id": 104,
    "lang": "ru",
    "key": "Select Files",
    "value": "Выбрать файлы"
  },
  {
    "id": 105,
    "lang": "uk",
    "key": "Select Files",
    "value": "Обрати файли"
  },
  {
    "id": 106,
    "lang": "en",
    "key": "Selected Photos",
    "value": "Selected Photos"
  },
  {
    "id": 107,
    "lang": "ru",
    "key": "Selected Photos",
    "value": "Выбранные фото"
  },
  {
    "id": 108,
    "lang": "uk",
    "key": "Selected Photos",
    "value": "Обрані фото"
  },
  {
    "id": 109,
    "lang": "en",
    "key": "Size",
    "value": "Size"
  },
  {
    "id": 110,
    "lang": "ru",
    "key": "Size",
    "value": "Размер"
  },
  {
    "id": 111,
    "lang": "uk",
    "key": "Size",
    "value": "Розмір"
  },
  {
    "id": 112,
    "lang": "en",
    "key": "Supports JPG, PNG • Best quality guaranteed",
    "value": "Supports JPG, PNG • Best quality guaranteed"
  },
  {
    "id": 113,
    "lang": "ru",
    "key": "Supports JPG, PNG • Best quality guaranteed",
    "value": "Поддержка JPG, PNG • Лучшее качество гарантировано"
  },
  {
    "id": 114,
    "lang": "uk",
    "key": "Supports JPG, PNG • Best quality guaranteed",
    "value": "Підтримка JPG, PNG • Найкраща якість гарантована"
  },
  {
    "id": 115,
    "lang": "en",
    "key": "Total for checkout",
    "value": "Total for checkout"
  },
  {
    "id": 116,
    "lang": "ru",
    "key": "Total for checkout",
    "value": "Итого к оплате"
  },
  {
    "id": 117,
    "lang": "uk",
    "key": "Total for checkout",
    "value": "Разом до оплати"
  },
  {
    "id": 118,
    "lang": "en",
    "key": "Upload your photos to get started",
    "value": "Upload your photos to get started"
  },
  {
    "id": 119,
    "lang": "ru",
    "key": "Upload your photos to get started",
    "value": "Загрузите фотографии чтобы начать"
  },
  {
    "id": 120,
    "lang": "uk",
    "key": "Upload your photos to get started",
    "value": "Завантажте фотографії щоб почати"
  },
  {
    "id": 121,
    "lang": "en",
    "key": "admin.action",
    "value": "Action"
  },
  {
    "id": 122,
    "lang": "ru",
    "key": "admin.action",
    "value": "Действие"
  },
  {
    "id": 123,
    "lang": "uk",
    "key": "admin.action",
    "value": "Дія"
  },
  {
    "id": 124,
    "lang": "en",
    "key": "admin.add",
    "value": "Add"
  },
  {
    "id": 125,
    "lang": "ru",
    "key": "admin.add",
    "value": "Добавить"
  },
  {
    "id": 126,
    "lang": "uk",
    "key": "admin.add",
    "value": "Додати"
  },
  {
    "id": 127,
    "lang": "en",
    "key": "admin.address_branch",
    "value": "Address / Branch"
  },
  {
    "id": 128,
    "lang": "ru",
    "key": "admin.address_branch",
    "value": "Адрес / Отделение"
  },
  {
    "id": 129,
    "lang": "uk",
    "key": "admin.address_branch",
    "value": "Адреса / Відділення"
  },
  {
    "id": 130,
    "lang": "en",
    "key": "admin.back_to_orders",
    "value": "Back to Orders"
  },
  {
    "id": 131,
    "lang": "ru",
    "key": "admin.back_to_orders",
    "value": "Назад к заказам"
  },
  {
    "id": 132,
    "lang": "uk",
    "key": "admin.back_to_orders",
    "value": "Назад до замовлень"
  },
  {
    "id": 133,
    "lang": "en",
    "key": "admin.config",
    "value": "Config"
  },
  {
    "id": 134,
    "lang": "ru",
    "key": "admin.config",
    "value": "Конфигурация"
  },
  {
    "id": 135,
    "lang": "uk",
    "key": "admin.config",
    "value": "Конфігурація"
  },
  {
    "id": 136,
    "lang": "en",
    "key": "admin.confirm_delete",
    "value": "Are you sure you want to delete?"
  },
  {
    "id": 137,
    "lang": "ru",
    "key": "admin.confirm_delete",
    "value": "Вы уверены, что хотите удалить?"
  },
  {
    "id": 138,
    "lang": "uk",
    "key": "admin.confirm_delete",
    "value": "Ви впевнені, що хочете видалити?"
  },
  {
    "id": 139,
    "lang": "en",
    "key": "admin.content",
    "value": "Content"
  },
  {
    "id": 140,
    "lang": "ru",
    "key": "admin.content",
    "value": "Контент"
  },
  {
    "id": 141,
    "lang": "uk",
    "key": "admin.content",
    "value": "Контент"
  },
  {
    "id": 142,
    "lang": "en",
    "key": "admin.create_ttn",
    "value": "Create TTN"
  },
  {
    "id": 143,
    "lang": "ru",
    "key": "admin.create_ttn",
    "value": "Создать ТТН"
  },
  {
    "id": 144,
    "lang": "uk",
    "key": "admin.create_ttn",
    "value": "Створити ТТН"
  },
  {
    "id": 145,
    "lang": "en",
    "key": "admin.customer",
    "value": "Customer"
  },
  {
    "id": 146,
    "lang": "ru",
    "key": "admin.customer",
    "value": "Клиент"
  },
  {
    "id": 147,
    "lang": "uk",
    "key": "admin.customer",
    "value": "Клієнт"
  },
  {
    "id": 148,
    "lang": "en",
    "key": "admin.customer_info",
    "value": "Customer Info"
  },
  {
    "id": 149,
    "lang": "ru",
    "key": "admin.customer_info",
    "value": "Информация о клиенте"
  },
  {
    "id": 150,
    "lang": "uk",
    "key": "admin.customer_info",
    "value": "Інформація про клієнта"
  },
  {
    "id": 151,
    "lang": "en",
    "key": "admin.dashboard",
    "value": "Dashboard"
  },
  {
    "id": 152,
    "lang": "ru",
    "key": "admin.dashboard",
    "value": "Панель"
  },
  {
    "id": 153,
    "lang": "uk",
    "key": "admin.dashboard",
    "value": "Панель"
  },
  {
    "id": 154,
    "lang": "en",
    "key": "admin.date",
    "value": "Date"
  },
  {
    "id": 155,
    "lang": "ru",
    "key": "admin.date",
    "value": "Дата"
  },
  {
    "id": 156,
    "lang": "uk",
    "key": "admin.date",
    "value": "Дата"
  },
  {
    "id": 157,
    "lang": "en",
    "key": "admin.deleting",
    "value": "Deleting..."
  },
  {
    "id": 158,
    "lang": "ru",
    "key": "admin.deleting",
    "value": "Удаление..."
  },
  {
    "id": 159,
    "lang": "uk",
    "key": "admin.deleting",
    "value": "Видалення..."
  },
  {
    "id": 160,
    "lang": "en",
    "key": "admin.delivery_carrier",
    "value": "By carrier tariffs"
  },
  {
    "id": 161,
    "lang": "ru",
    "key": "admin.delivery_carrier",
    "value": "По тарифам перевозчика"
  },
  {
    "id": 162,
    "lang": "uk",
    "key": "admin.delivery_carrier",
    "value": "За тарифами перевізника"
  },
  {
    "id": 163,
    "lang": "en",
    "key": "admin.download",
    "value": "Download"
  },
  {
    "id": 164,
    "lang": "ru",
    "key": "admin.download",
    "value": "Скачать"
  },
  {
    "id": 165,
    "lang": "uk",
    "key": "admin.download",
    "value": "Завантажити"
  },
  {
    "id": 166,
    "lang": "en",
    "key": "admin.download_zip",
    "value": "Download ZIP"
  },
  {
    "id": 167,
    "lang": "ru",
    "key": "admin.download_zip",
    "value": "Скачать ZIP"
  },
  {
    "id": 168,
    "lang": "uk",
    "key": "admin.download_zip",
    "value": "Завантажити ZIP"
  },
  {
    "id": 169,
    "lang": "en",
    "key": "admin.email",
    "value": "Email"
  },
  {
    "id": 170,
    "lang": "ru",
    "key": "admin.email",
    "value": "Email"
  },
  {
    "id": 171,
    "lang": "uk",
    "key": "admin.email",
    "value": "Email"
  },
  {
    "id": 172,
    "lang": "en",
    "key": "admin.file_info",
    "value": "File Info"
  },
  {
    "id": 173,
    "lang": "ru",
    "key": "admin.file_info",
    "value": "Инфо файла"
  },
  {
    "id": 174,
    "lang": "uk",
    "key": "admin.file_info",
    "value": "Інфо файлу"
  },
  {
    "id": 175,
    "lang": "en",
    "key": "admin.help",
    "value": "Help"
  },
  {
    "id": 176,
    "lang": "ru",
    "key": "admin.help",
    "value": "Помощь"
  },
  {
    "id": 177,
    "lang": "uk",
    "key": "admin.help",
    "value": "Допомога"
  },
  {
    "id": 178,
    "lang": "en",
    "key": "admin.items",
    "value": "Items"
  },
  {
    "id": 179,
    "lang": "ru",
    "key": "admin.items",
    "value": "Позиции"
  },
  {
    "id": 180,
    "lang": "uk",
    "key": "admin.items",
    "value": "Позиції"
  },
  {
    "id": 181,
    "lang": "en",
    "key": "admin.method",
    "value": "Method"
  },
  {
    "id": 182,
    "lang": "ru",
    "key": "admin.method",
    "value": "Метод"
  },
  {
    "id": 183,
    "lang": "uk",
    "key": "admin.method",
    "value": "Метод"
  },
  {
    "id": 184,
    "lang": "en",
    "key": "admin.next",
    "value": "Next"
  },
  {
    "id": 185,
    "lang": "ru",
    "key": "admin.next",
    "value": "Далее"
  },
  {
    "id": 186,
    "lang": "uk",
    "key": "admin.next",
    "value": "Далі"
  },
  {
    "id": 187,
    "lang": "en",
    "key": "admin.of",
    "value": "of"
  },
  {
    "id": 188,
    "lang": "ru",
    "key": "admin.of",
    "value": "из"
  },
  {
    "id": 189,
    "lang": "uk",
    "key": "admin.of",
    "value": "з"
  },
  {
    "id": 190,
    "lang": "en",
    "key": "admin.order_deleted",
    "value": "Order deleted"
  },
  {
    "id": 191,
    "lang": "ru",
    "key": "admin.order_deleted",
    "value": "Заказ удален"
  },
  {
    "id": 192,
    "lang": "uk",
    "key": "admin.order_deleted",
    "value": "Замовлення видалено"
  },
  {
    "id": 193,
    "lang": "en",
    "key": "admin.order_number",
    "value": "Order #"
  },
  {
    "id": 194,
    "lang": "ru",
    "key": "admin.order_number",
    "value": "№ Заказа"
  },
  {
    "id": 195,
    "lang": "uk",
    "key": "admin.order_number",
    "value": "№ Замовлення"
  },
  {
    "id": 196,
    "lang": "en",
    "key": "admin.orders",
    "value": "Orders"
  },
  {
    "id": 197,
    "lang": "ru",
    "key": "admin.orders",
    "value": "Заказы"
  },
  {
    "id": 198,
    "lang": "uk",
    "key": "admin.orders",
    "value": "Замовлення"
  },
  {
    "id": 199,
    "lang": "en",
    "key": "admin.orders_deleted",
    "value": "Orders deleted"
  },
  {
    "id": 200,
    "lang": "ru",
    "key": "admin.orders_deleted",
    "value": "Заказы удалены"
  },
  {
    "id": 201,
    "lang": "uk",
    "key": "admin.orders_deleted",
    "value": "Замовлення видалено"
  },
  {
    "id": 202,
    "lang": "en",
    "key": "admin.pages",
    "value": "Pages"
  },
  {
    "id": 203,
    "lang": "ru",
    "key": "admin.pages",
    "value": "Страницы"
  },
  {
    "id": 204,
    "lang": "uk",
    "key": "admin.pages",
    "value": "Сторінки"
  },
  {
    "id": 205,
    "lang": "en",
    "key": "admin.phone",
    "value": "Phone"
  },
  {
    "id": 206,
    "lang": "ru",
    "key": "admin.phone",
    "value": "Телефон"
  },
  {
    "id": 207,
    "lang": "uk",
    "key": "admin.phone",
    "value": "Телефон"
  },
  {
    "id": 208,
    "lang": "en",
    "key": "admin.prev",
    "value": "Previous"
  },
  {
    "id": 209,
    "lang": "ru",
    "key": "admin.prev",
    "value": "Назад"
  },
  {
    "id": 210,
    "lang": "uk",
    "key": "admin.prev",
    "value": "Назад"
  },
  {
    "id": 211,
    "lang": "en",
    "key": "admin.preview",
    "value": "Preview"
  },
  {
    "id": 212,
    "lang": "ru",
    "key": "admin.preview",
    "value": "Превью"
  },
  {
    "id": 213,
    "lang": "uk",
    "key": "admin.preview",
    "value": "Превʼю"
  },
  {
    "id": 214,
    "lang": "en",
    "key": "admin.print_options",
    "value": "Print Options"
  },
  {
    "id": 215,
    "lang": "ru",
    "key": "admin.print_options",
    "value": "Параметры печати"
  },
  {
    "id": 216,
    "lang": "uk",
    "key": "admin.print_options",
    "value": "Параметри друку"
  },
  {
    "id": 217,
    "lang": "en",
    "key": "admin.print_order",
    "value": "Print Order"
  },
  {
    "id": 218,
    "lang": "ru",
    "key": "admin.print_order",
    "value": "Печать заказа"
  },
  {
    "id": 219,
    "lang": "uk",
    "key": "admin.print_order",
    "value": "Друк замовлення"
  },
  {
    "id": 220,
    "lang": "en",
    "key": "admin.save_all",
    "value": "Save All"
  },
  {
    "id": 221,
    "lang": "ru",
    "key": "admin.save_all",
    "value": "Сохранить все"
  },
  {
    "id": 222,
    "lang": "uk",
    "key": "admin.save_all",
    "value": "Зберегти все"
  },
  {
    "id": 223,
    "lang": "en",
    "key": "admin.selected",
    "value": "Selected"
  },
  {
    "id": 224,
    "lang": "ru",
    "key": "admin.selected",
    "value": "Выбрано"
  },
  {
    "id": 225,
    "lang": "uk",
    "key": "admin.selected",
    "value": "Обрано"
  },
  {
    "id": 226,
    "lang": "en",
    "key": "admin.settings",
    "value": "Settings"
  },
  {
    "id": 227,
    "lang": "ru",
    "key": "admin.settings",
    "value": "Настройки"
  },
  {
    "id": 228,
    "lang": "uk",
    "key": "admin.settings",
    "value": "Налаштування"
  },
  {
    "id": 229,
    "lang": "en",
    "key": "admin.shipping_details",
    "value": "Shipping Details"
  },
  {
    "id": 230,
    "lang": "ru",
    "key": "admin.shipping_details",
    "value": "Детали доставки"
  },
  {
    "id": 231,
    "lang": "uk",
    "key": "admin.shipping_details",
    "value": "Деталі доставки"
  },
  {
    "id": 232,
    "lang": "en",
    "key": "admin.showing",
    "value": "Showing"
  },
  {
    "id": 233,
    "lang": "ru",
    "key": "admin.showing",
    "value": "Показано"
  },
  {
    "id": 234,
    "lang": "uk",
    "key": "admin.showing",
    "value": "Показано"
  },
  {
    "id": 235,
    "lang": "en",
    "key": "admin.signout",
    "value": "Sign Out / Main Site"
  },
  {
    "id": 236,
    "lang": "ru",
    "key": "admin.signout",
    "value": "Выход / На сайт"
  },
  {
    "id": 237,
    "lang": "uk",
    "key": "admin.signout",
    "value": "Вихід / На сайт"
  },
  {
    "id": 238,
    "lang": "en",
    "key": "admin.size",
    "value": "Size"
  },
  {
    "id": 239,
    "lang": "ru",
    "key": "admin.size",
    "value": "Размер"
  },
  {
    "id": 240,
    "lang": "uk",
    "key": "admin.size",
    "value": "Розмір"
  },
  {
    "id": 241,
    "lang": "en",
    "key": "admin.stats.completed",
    "value": "Completed"
  },
  {
    "id": 242,
    "lang": "ru",
    "key": "admin.stats.completed",
    "value": "Выполнено"
  },
  {
    "id": 243,
    "lang": "uk",
    "key": "admin.stats.completed",
    "value": "Виконано"
  },
  {
    "id": 244,
    "lang": "en",
    "key": "admin.stats.done",
    "value": "Successfully completed"
  },
  {
    "id": 245,
    "lang": "ru",
    "key": "admin.stats.done",
    "value": "Успешно завершены"
  },
  {
    "id": 246,
    "lang": "uk",
    "key": "admin.stats.done",
    "value": "Успішно завершені"
  },
  {
    "id": 247,
    "lang": "en",
    "key": "admin.stats.draft",
    "value": "Drafts"
  },
  {
    "id": 248,
    "lang": "ru",
    "key": "admin.stats.draft",
    "value": "Черновики"
  },
  {
    "id": 249,
    "lang": "uk",
    "key": "admin.stats.draft",
    "value": "Чернетки"
  },
  {
    "id": 250,
    "lang": "en",
    "key": "admin.stats.in_progress",
    "value": "Currently in progress"
  },
  {
    "id": 251,
    "lang": "ru",
    "key": "admin.stats.in_progress",
    "value": "Сейчас выполняются"
  },
  {
    "id": 252,
    "lang": "uk",
    "key": "admin.stats.in_progress",
    "value": "Зараз виконуються"
  },
  {
    "id": 253,
    "lang": "en",
    "key": "admin.stats.new_orders",
    "value": "Awaiting processing"
  },
  {
    "id": 254,
    "lang": "ru",
    "key": "admin.stats.new_orders",
    "value": "Ожидают обработки"
  },
  {
    "id": 255,
    "lang": "uk",
    "key": "admin.stats.new_orders",
    "value": "Очікують обробки"
  },
  {
    "id": 256,
    "lang": "en",
    "key": "admin.stats.not_submitted",
    "value": "Not submitted"
  },
  {
    "id": 257,
    "lang": "ru",
    "key": "admin.stats.not_submitted",
    "value": "Не оформлены"
  },
  {
    "id": 258,
    "lang": "uk",
    "key": "admin.stats.not_submitted",
    "value": "Не оформлені"
  },
  {
    "id": 259,
    "lang": "en",
    "key": "admin.stats.pending",
    "value": "New Orders"
  },
  {
    "id": 260,
    "lang": "ru",
    "key": "admin.stats.pending",
    "value": "Новые заказы"
  },
  {
    "id": 261,
    "lang": "uk",
    "key": "admin.stats.pending",
    "value": "Нові замовлення"
  },
  {
    "id": 262,
    "lang": "en",
    "key": "admin.stats.processing",
    "value": "Processing"
  },
  {
    "id": 263,
    "lang": "ru",
    "key": "admin.stats.processing",
    "value": "В обработке"
  },
  {
    "id": 264,
    "lang": "uk",
    "key": "admin.stats.processing",
    "value": "В обробці"
  },
  {
    "id": 265,
    "lang": "en",
    "key": "admin.stats.revenue",
    "value": "Revenue"
  },
  {
    "id": 266,
    "lang": "ru",
    "key": "admin.stats.revenue",
    "value": "Доход"
  },
  {
    "id": 267,
    "lang": "uk",
    "key": "admin.stats.revenue",
    "value": "Дохід"
  },
  {
    "id": 268,
    "lang": "en",
    "key": "admin.stats.storage_used",
    "value": "Storage Used"
  },
  {
    "id": 269,
    "lang": "ru",
    "key": "admin.stats.storage_used",
    "value": "Занято места"
  },
  {
    "id": 270,
    "lang": "uk",
    "key": "admin.stats.storage_used",
    "value": "Зайнято місця"
  },
  {
    "id": 271,
    "lang": "en",
    "key": "admin.stats.this_week",
    "value": "This Week"
  },
  {
    "id": 272,
    "lang": "ru",
    "key": "admin.stats.this_week",
    "value": "За неделю"
  },
  {
    "id": 273,
    "lang": "uk",
    "key": "admin.stats.this_week",
    "value": "За тиждень"
  },
  {
    "id": 274,
    "lang": "en",
    "key": "admin.stats.total_orders",
    "value": "Total Orders"
  },
  {
    "id": 275,
    "lang": "ru",
    "key": "admin.stats.total_orders",
    "value": "Всего заказов"
  },
  {
    "id": 276,
    "lang": "uk",
    "key": "admin.stats.total_orders",
    "value": "Всього замовлень"
  },
  {
    "id": 277,
    "lang": "en",
    "key": "admin.status",
    "value": "Status"
  },
  {
    "id": 278,
    "lang": "ru",
    "key": "admin.status",
    "value": "Статус"
  },
  {
    "id": 279,
    "lang": "uk",
    "key": "admin.status",
    "value": "Статус"
  },
  {
    "id": 280,
    "lang": "en",
    "key": "admin.status.cancelled",
    "value": "Cancelled"
  },
  {
    "id": 281,
    "lang": "ru",
    "key": "admin.status.cancelled",
    "value": "Отменен"
  },
  {
    "id": 282,
    "lang": "uk",
    "key": "admin.status.cancelled",
    "value": "Скасовано"
  },
  {
    "id": 283,
    "lang": "en",
    "key": "admin.status.completed",
    "value": "Completed"
  },
  {
    "id": 284,
    "lang": "ru",
    "key": "admin.status.completed",
    "value": "Выполнен"
  },
  {
    "id": 285,
    "lang": "uk",
    "key": "admin.status.completed",
    "value": "Виконано"
  },
  {
    "id": 286,
    "lang": "en",
    "key": "admin.status.draft",
    "value": "Draft"
  },
  {
    "id": 287,
    "lang": "ru",
    "key": "admin.status.draft",
    "value": "Черновик"
  },
  {
    "id": 288,
    "lang": "uk",
    "key": "admin.status.draft",
    "value": "Чернетка"
  },
  {
    "id": 289,
    "lang": "en",
    "key": "admin.status.pending",
    "value": "New"
  },
  {
    "id": 290,
    "lang": "ru",
    "key": "admin.status.pending",
    "value": "Новый"
  },
  {
    "id": 291,
    "lang": "uk",
    "key": "admin.status.pending",
    "value": "Новий"
  },
  {
    "id": 292,
    "lang": "en",
    "key": "admin.status.processing",
    "value": "Processing"
  },
  {
    "id": 293,
    "lang": "ru",
    "key": "admin.status.processing",
    "value": "Выполняется"
  },
  {
    "id": 294,
    "lang": "uk",
    "key": "admin.status.processing",
    "value": "Виконується"
  },
  {
    "id": 295,
    "lang": "en",
    "key": "admin.status_update_failed",
    "value": "Failed to update status"
  },
  {
    "id": 296,
    "lang": "ru",
    "key": "admin.status_update_failed",
    "value": "Не удалось обновить статус"
  },
  {
    "id": 297,
    "lang": "uk",
    "key": "admin.status_update_failed",
    "value": "Не вдалося оновити статус"
  },
  {
    "id": 298,
    "lang": "en",
    "key": "admin.status_updated",
    "value": "Status updated"
  },
  {
    "id": 299,
    "lang": "ru",
    "key": "admin.status_updated",
    "value": "Статус обновлен"
  },
  {
    "id": 300,
    "lang": "uk",
    "key": "admin.status_updated",
    "value": "Статус оновлено"
  },
  {
    "id": 301,
    "lang": "en",
    "key": "admin.total",
    "value": "Total"
  },
  {
    "id": 302,
    "lang": "ru",
    "key": "admin.total",
    "value": "Итого"
  },
  {
    "id": 303,
    "lang": "uk",
    "key": "admin.total",
    "value": "Разом"
  },
  {
    "id": 304,
    "lang": "en",
    "key": "admin.translations",
    "value": "Translations"
  },
  {
    "id": 305,
    "lang": "ru",
    "key": "admin.translations",
    "value": "Переводы"
  },
  {
    "id": 306,
    "lang": "uk",
    "key": "admin.translations",
    "value": "Переклади"
  },
  {
    "id": 307,
    "lang": "en",
    "key": "admin.unknown",
    "value": "Unknown"
  },
  {
    "id": 308,
    "lang": "ru",
    "key": "admin.unknown",
    "value": "Неизвестно"
  },
  {
    "id": 309,
    "lang": "uk",
    "key": "admin.unknown",
    "value": "Невідомо"
  },
  {
    "id": 310,
    "lang": "en",
    "key": "admin.users",
    "value": "Users"
  },
  {
    "id": 311,
    "lang": "ru",
    "key": "admin.users",
    "value": "Пользователи"
  },
  {
    "id": 312,
    "lang": "uk",
    "key": "admin.users",
    "value": "Користувачі"
  },
  {
    "id": 313,
    "lang": "en",
    "key": "admin.view",
    "value": "View"
  },
  {
    "id": 314,
    "lang": "ru",
    "key": "admin.view",
    "value": "Просмотр"
  },
  {
    "id": 315,
    "lang": "uk",
    "key": "admin.view",
    "value": "Перегляд"
  },
  {
    "id": 316,
    "lang": "en",
    "key": "and_more",
    "value": "and more"
  },
  {
    "id": 317,
    "lang": "ru",
    "key": "and_more",
    "value": "и ещё"
  },
  {
    "id": 318,
    "lang": "uk",
    "key": "and_more",
    "value": "та ще"
  },
  {
    "id": 319,
    "lang": "en",
    "key": "badge.border",
    "value": "Border"
  },
  {
    "id": 320,
    "lang": "ru",
    "key": "badge.border",
    "value": "Рамка"
  },
  {
    "id": 321,
    "lang": "uk",
    "key": "badge.border",
    "value": "Рамка"
  },
  {
    "id": 322,
    "lang": "en",
    "key": "badge.mag",
    "value": "Magnet"
  },
  {
    "id": 323,
    "lang": "ru",
    "key": "badge.mag",
    "value": "Магнит"
  },
  {
    "id": 324,
    "lang": "uk",
    "key": "badge.mag",
    "value": "Магніт"
  },
  {
    "id": 343,
    "lang": "en",
    "key": "bulk.add",
    "value": "Add"
  },
  {
    "id": 344,
    "lang": "ru",
    "key": "bulk.add",
    "value": "Добавить"
  },
  {
    "id": 345,
    "lang": "uk",
    "key": "bulk.add",
    "value": "Додати"
  },
  {
    "id": 346,
    "lang": "en",
    "key": "bulk.delete",
    "value": "Delete"
  },
  {
    "id": 347,
    "lang": "ru",
    "key": "bulk.delete",
    "value": "Удалить"
  },
  {
    "id": 348,
    "lang": "uk",
    "key": "bulk.delete",
    "value": "Видалити"
  },
  {
    "id": 349,
    "lang": "en",
    "key": "checkout.address_branch",
    "value": "Delivery Address / Branch #"
  },
  {
    "id": 350,
    "lang": "ru",
    "key": "checkout.address_branch",
    "value": "Адрес доставки / № Отделения"
  },
  {
    "id": 351,
    "lang": "uk",
    "key": "checkout.address_branch",
    "value": "Адреса доставки / № Відділення"
  },
  {
    "id": 352,
    "lang": "en",
    "key": "checkout.back",
    "value": "Back"
  },
  {
    "id": 355,
    "lang": "en",
    "key": "checkout.bonus",
    "value": "Bonus"
  },
  {
    "id": 356,
    "lang": "ru",
    "key": "checkout.bonus",
    "value": "Бонус"
  },
  {
    "id": 357,
    "lang": "uk",
    "key": "checkout.bonus",
    "value": "Бонус"
  },
  {
    "id": 358,
    "lang": "en",
    "key": "checkout.delivery_address",
    "value": "Delivery Address"
  },
  {
    "id": 359,
    "lang": "ru",
    "key": "checkout.delivery_address",
    "value": "Адрес доставки"
  },
  {
    "id": 360,
    "lang": "uk",
    "key": "checkout.delivery_address",
    "value": "Адреса доставки"
  },
  {
    "id": 361,
    "lang": "en",
    "key": "checkout.delivery_method",
    "value": "Delivery Method"
  },
  {
    "id": 362,
    "lang": "ru",
    "key": "checkout.delivery_method",
    "value": "Способ доставки"
  },
  {
    "id": 363,
    "lang": "uk",
    "key": "checkout.delivery_method",
    "value": "Спосіб доставки"
  },
  {
    "id": 364,
    "lang": "en",
    "key": "checkout.email",
    "value": "Email"
  },
  {
    "id": 367,
    "lang": "en",
    "key": "checkout.empty",
    "value": "Your cart is empty"
  },
  {
    "id": 370,
    "lang": "en",
    "key": "checkout.firstname",
    "value": "First Name"
  },
  {
    "id": 371,
    "lang": "ru",
    "key": "checkout.firstname",
    "value": "Имя"
  },
  {
    "id": 372,
    "lang": "uk",
    "key": "checkout.firstname",
    "value": "Ім'я"
  },
  {
    "id": 373,
    "lang": "en",
    "key": "checkout.free",
    "value": "Free"
  },
  {
    "id": 374,
    "lang": "ru",
    "key": "checkout.free",
    "value": "Бесплатно"
  },
  {
    "id": 375,
    "lang": "uk",
    "key": "checkout.free",
    "value": "Безкоштовно"
  },
  {
    "id": 376,
    "lang": "en",
    "key": "checkout.fullname_hint",
    "value": "Type your first and last name"
  },
  {
    "id": 379,
    "lang": "en",
    "key": "checkout.lastname",
    "value": "Last Name"
  },
  {
    "id": 380,
    "lang": "ru",
    "key": "checkout.lastname",
    "value": "Фамилия"
  },
  {
    "id": 381,
    "lang": "uk",
    "key": "checkout.lastname",
    "value": "Прізвище"
  },
  {
    "id": 382,
    "lang": "en",
    "key": "checkout.local",
    "value": "Local Pickup"
  },
  {
    "id": 383,
    "lang": "ru",
    "key": "checkout.local",
    "value": "Самовывоз"
  },
  {
    "id": 384,
    "lang": "uk",
    "key": "checkout.local",
    "value": "Самовивіз"
  },
  {
    "id": 385,
    "lang": "en",
    "key": "checkout.name",
    "value": "Full Name"
  },
  {
    "id": 386,
    "lang": "ru",
    "key": "checkout.name",
    "value": "ФИО"
  },
  {
    "id": 387,
    "lang": "uk",
    "key": "checkout.name",
    "value": "ПІБ"
  },
  {
    "id": 388,
    "lang": "en",
    "key": "checkout.novaposhta",
    "value": "Nova Poshta"
  },
  {
    "id": 389,
    "lang": "ru",
    "key": "checkout.novaposhta",
    "value": "Новая Почта"
  },
  {
    "id": 390,
    "lang": "uk",
    "key": "checkout.novaposhta",
    "value": "Нова Пошта"
  },
  {
    "id": 391,
    "lang": "en",
    "key": "checkout.order_confirmed",
    "value": "Order Confirmed!"
  },
  {
    "id": 392,
    "lang": "ru",
    "key": "checkout.order_confirmed",
    "value": "Заказ подтвержден!"
  },
  {
    "id": 393,
    "lang": "uk",
    "key": "checkout.order_confirmed",
    "value": "Замовлення підтверджено!"
  },
  {
    "id": 394,
    "lang": "en",
    "key": "checkout.phone",
    "value": "Phone"
  },
  {
    "id": 395,
    "lang": "ru",
    "key": "checkout.phone",
    "value": "Телефон"
  },
  {
    "id": 396,
    "lang": "uk",
    "key": "checkout.phone",
    "value": "Телефон"
  },
  {
    "id": 397,
    "lang": "en",
    "key": "checkout.phone_error",
    "value": "Invalid phone number"
  },
  {
    "id": 400,
    "lang": "en",
    "key": "checkout.pickup",
    "value": "Pickup"
  },
  {
    "id": 401,
    "lang": "ru",
    "key": "checkout.pickup",
    "value": "Самовывоз"
  },
  {
    "id": 402,
    "lang": "uk",
    "key": "checkout.pickup",
    "value": "Самовивіз"
  },
  {
    "id": 403,
    "lang": "en",
    "key": "checkout.placeOrder",
    "value": "Place Order"
  },
  {
    "id": 404,
    "lang": "ru",
    "key": "checkout.placeOrder",
    "value": "Оформить заказ"
  },
  {
    "id": 405,
    "lang": "uk",
    "key": "checkout.placeOrder",
    "value": "Оформити замовлення"
  },
  {
    "id": 406,
    "lang": "en",
    "key": "checkout.return_home",
    "value": "Return to Home"
  },
  {
    "id": 409,
    "lang": "en",
    "key": "checkout.shipping_contact",
    "value": "Shipping & Contact"
  },
  {
    "id": 410,
    "lang": "ru",
    "key": "checkout.shipping_contact",
    "value": "Доставка и контакты"
  },
  {
    "id": 411,
    "lang": "uk",
    "key": "checkout.shipping_contact",
    "value": "Доставка та контакти"
  },
  {
    "id": 412,
    "lang": "en",
    "key": "checkout.summary",
    "value": "Order Summary"
  },
  {
    "id": 413,
    "lang": "ru",
    "key": "checkout.summary",
    "value": "Итого заказа"
  },
  {
    "id": 414,
    "lang": "uk",
    "key": "checkout.summary",
    "value": "Підсумок замовлення"
  },
  {
    "id": 415,
    "lang": "en",
    "key": "checkout.total",
    "value": "Total"
  },
  {
    "id": 418,
    "lang": "en",
    "key": "common.cancel",
    "value": "Cancel"
  },
  {
    "id": 419,
    "lang": "ru",
    "key": "common.cancel",
    "value": "Отмена"
  },
  {
    "id": 420,
    "lang": "uk",
    "key": "common.cancel",
    "value": "Скасувати"
  },
  {
    "id": 421,
    "lang": "en",
    "key": "common.close",
    "value": "Close"
  },
  {
    "id": 422,
    "lang": "ru",
    "key": "common.close",
    "value": "Закрыть"
  },
  {
    "id": 423,
    "lang": "uk",
    "key": "common.close",
    "value": "Закрити"
  },
  {
    "id": 424,
    "lang": "en",
    "key": "common.confirm",
    "value": "Confirm"
  },
  {
    "id": 425,
    "lang": "ru",
    "key": "common.confirm",
    "value": "Подтвердить"
  },
  {
    "id": 426,
    "lang": "uk",
    "key": "common.confirm",
    "value": "Підтвердити"
  },
  {
    "id": 427,
    "lang": "en",
    "key": "common.delete",
    "value": "Delete"
  },
  {
    "id": 428,
    "lang": "ru",
    "key": "common.delete",
    "value": "Удалить"
  },
  {
    "id": 429,
    "lang": "uk",
    "key": "common.delete",
    "value": "Видалити"
  },
  {
    "id": 430,
    "lang": "en",
    "key": "common.edit",
    "value": "Edit"
  },
  {
    "id": 431,
    "lang": "ru",
    "key": "common.edit",
    "value": "Редактировать"
  },
  {
    "id": 432,
    "lang": "uk",
    "key": "common.edit",
    "value": "Редагувати"
  },
  {
    "id": 433,
    "lang": "en",
    "key": "common.no",
    "value": "No"
  },
  {
    "id": 434,
    "lang": "ru",
    "key": "common.no",
    "value": "Нет"
  },
  {
    "id": 435,
    "lang": "uk",
    "key": "common.no",
    "value": "Ні"
  },
  {
    "id": 436,
    "lang": "en",
    "key": "common.processing",
    "value": "Processing..."
  },
  {
    "id": 437,
    "lang": "ru",
    "key": "common.processing",
    "value": "Обработка..."
  },
  {
    "id": 438,
    "lang": "uk",
    "key": "common.processing",
    "value": "Обробка..."
  },
  {
    "id": 439,
    "lang": "en",
    "key": "common.save",
    "value": "Save"
  },
  {
    "id": 440,
    "lang": "ru",
    "key": "common.save",
    "value": "Сохранить"
  },
  {
    "id": 441,
    "lang": "uk",
    "key": "common.save",
    "value": "Зберегти"
  },
  {
    "id": 442,
    "lang": "en",
    "key": "common.yes",
    "value": "Yes"
  },
  {
    "id": 443,
    "lang": "ru",
    "key": "common.yes",
    "value": "Да"
  },
  {
    "id": 444,
    "lang": "uk",
    "key": "common.yes",
    "value": "Так"
  },
  {
    "id": 445,
    "lang": "en",
    "key": "config.add_size",
    "value": "Add Size"
  },
  {
    "id": 446,
    "lang": "ru",
    "key": "config.add_size",
    "value": "Добавить размер"
  },
  {
    "id": 447,
    "lang": "uk",
    "key": "config.add_size",
    "value": "Додати розмір"
  },
  {
    "id": 448,
    "lang": "en",
    "key": "config.add_tier",
    "value": "Add Tier"
  },
  {
    "id": 449,
    "lang": "ru",
    "key": "config.add_tier",
    "value": "Добавить уровень"
  },
  {
    "id": 450,
    "lang": "uk",
    "key": "config.add_tier",
    "value": "Додати рівень"
  },
  {
    "id": 451,
    "lang": "en",
    "key": "config.base_price",
    "value": "Base Price"
  },
  {
    "id": 452,
    "lang": "ru",
    "key": "config.base_price",
    "value": "Базовая цена"
  },
  {
    "id": 453,
    "lang": "uk",
    "key": "config.base_price",
    "value": "Базова ціна"
  },
  {
    "id": 454,
    "lang": "en",
    "key": "config.delivery",
    "value": "Delivery"
  },
  {
    "id": 455,
    "lang": "ru",
    "key": "config.delivery",
    "value": "Доставка"
  },
  {
    "id": 456,
    "lang": "uk",
    "key": "config.delivery",
    "value": "Доставка"
  },
  {
    "id": 457,
    "lang": "en",
    "key": "config.delivery_desc",
    "value": "Delivery settings"
  },
  {
    "id": 458,
    "lang": "ru",
    "key": "config.delivery_desc",
    "value": "Настройки доставки"
  },
  {
    "id": 459,
    "lang": "uk",
    "key": "config.delivery_desc",
    "value": "Налаштування доставки"
  },
  {
    "id": 460,
    "lang": "en",
    "key": "config.discounts",
    "value": "Discounts"
  },
  {
    "id": 461,
    "lang": "ru",
    "key": "config.discounts",
    "value": "Скидки"
  },
  {
    "id": 462,
    "lang": "uk",
    "key": "config.discounts",
    "value": "Знижки"
  },
  {
    "id": 463,
    "lang": "en",
    "key": "config.drag_to_sort",
    "value": "Drag to sort"
  },
  {
    "id": 464,
    "lang": "ru",
    "key": "config.drag_to_sort",
    "value": "Перетащите для сортировки"
  },
  {
    "id": 465,
    "lang": "uk",
    "key": "config.drag_to_sort",
    "value": "Перетягніть для сортування"
  },
  {
    "id": 466,
    "lang": "en",
    "key": "config.gifts",
    "value": "Gifts"
  },
  {
    "id": 467,
    "lang": "ru",
    "key": "config.gifts",
    "value": "Подарки"
  },
  {
    "id": 468,
    "lang": "uk",
    "key": "config.gifts",
    "value": "Подарунки"
  },
  {
    "id": 469,
    "lang": "en",
    "key": "config.magnets",
    "value": "Magnets"
  },
  {
    "id": 470,
    "lang": "ru",
    "key": "config.magnets",
    "value": "Магниты"
  },
  {
    "id": 471,
    "lang": "uk",
    "key": "config.magnets",
    "value": "Магніти"
  },
  {
    "id": 472,
    "lang": "en",
    "key": "config.magnets_desc",
    "value": "Magnet settings"
  },
  {
    "id": 473,
    "lang": "ru",
    "key": "config.magnets_desc",
    "value": "Настройки магнитов"
  },
  {
    "id": 474,
    "lang": "uk",
    "key": "config.magnets_desc",
    "value": "Налаштування магнітів"
  },
  {
    "id": 475,
    "lang": "en",
    "key": "config.min_qty",
    "value": "Minimum Quantity"
  },
  {
    "id": 476,
    "lang": "ru",
    "key": "config.min_qty",
    "value": "Минимальное количество"
  },
  {
    "id": 477,
    "lang": "uk",
    "key": "config.min_qty",
    "value": "Мінімальна кількість"
  },
  {
    "id": 478,
    "lang": "en",
    "key": "config.no_sizes",
    "value": "No sizes configured"
  },
  {
    "id": 479,
    "lang": "ru",
    "key": "config.no_sizes",
    "value": "Размеры не настроены"
  },
  {
    "id": 480,
    "lang": "uk",
    "key": "config.no_sizes",
    "value": "Розміри не налаштовані"
  },
  {
    "id": 481,
    "lang": "en",
    "key": "config.options",
    "value": "Options"
  },
  {
    "id": 482,
    "lang": "ru",
    "key": "config.options",
    "value": "Опции"
  },
  {
    "id": 483,
    "lang": "uk",
    "key": "config.options",
    "value": "Опції"
  },
  {
    "id": 484,
    "lang": "en",
    "key": "config.paper",
    "value": "Paper"
  },
  {
    "id": 485,
    "lang": "ru",
    "key": "config.paper",
    "value": "Бумага"
  },
  {
    "id": 486,
    "lang": "uk",
    "key": "config.paper",
    "value": "Папір"
  },
  {
    "id": 487,
    "lang": "en",
    "key": "config.papers",
    "value": "Paper Types"
  },
  {
    "id": 488,
    "lang": "ru",
    "key": "config.papers",
    "value": "Типы бумаги"
  },
  {
    "id": 489,
    "lang": "uk",
    "key": "config.papers",
    "value": "Типи паперу"
  },
  {
    "id": 490,
    "lang": "en",
    "key": "config.pricing_table",
    "value": "Pricing Table"
  },
  {
    "id": 491,
    "lang": "ru",
    "key": "config.pricing_table",
    "value": "Таблица цен"
  },
  {
    "id": 492,
    "lang": "uk",
    "key": "config.pricing_table",
    "value": "Таблиця цін"
  },
  {
    "id": 493,
    "lang": "en",
    "key": "config.size_name",
    "value": "Size Name"
  },
  {
    "id": 494,
    "lang": "ru",
    "key": "config.size_name",
    "value": "Название размера"
  },
  {
    "id": 495,
    "lang": "uk",
    "key": "config.size_name",
    "value": "Назва розміру"
  },
  {
    "id": 496,
    "lang": "en",
    "key": "config.sizes",
    "value": "Print Sizes"
  },
  {
    "id": 497,
    "lang": "ru",
    "key": "config.sizes",
    "value": "Размеры"
  },
  {
    "id": 498,
    "lang": "uk",
    "key": "config.sizes",
    "value": "Розміри"
  },
  {
    "id": 499,
    "lang": "en",
    "key": "config.system_title",
    "value": "System Configuration"
  },
  {
    "id": 500,
    "lang": "ru",
    "key": "config.system_title",
    "value": "Конфигурация системы"
  },
  {
    "id": 501,
    "lang": "uk",
    "key": "config.system_title",
    "value": "Конфігурація системи"
  },
  {
    "id": 502,
    "lang": "en",
    "key": "config.tier_label",
    "value": "Tier"
  },
  {
    "id": 503,
    "lang": "ru",
    "key": "config.tier_label",
    "value": "Уровень"
  },
  {
    "id": 504,
    "lang": "uk",
    "key": "config.tier_label",
    "value": "Рівень"
  },
  {
    "id": 505,
    "lang": "en",
    "key": "currency",
    "value": "UAH"
  },
  {
    "id": 506,
    "lang": "ru",
    "key": "currency",
    "value": "грн"
  },
  {
    "id": 507,
    "lang": "uk",
    "key": "currency",
    "value": "грн"
  },
  {
    "id": 508,
    "lang": "en",
    "key": "error.missing_files_refresh",
    "value": "Some files are missing. Please refresh."
  },
  {
    "id": 509,
    "lang": "ru",
    "key": "error.missing_files_refresh",
    "value": "Некоторые файлы отсутствуют. Обновите страницу."
  },
  {
    "id": 510,
    "lang": "uk",
    "key": "error.missing_files_refresh",
    "value": "Деякі файли відсутні. Оновіть сторінку."
  },
  {
    "id": 511,
    "lang": "en",
    "key": "general.currency",
    "value": "UAH"
  },
  {
    "id": 512,
    "lang": "ru",
    "key": "general.currency",
    "value": "грн"
  },
  {
    "id": 513,
    "lang": "uk",
    "key": "general.currency",
    "value": "грн"
  },
  {
    "id": 514,
    "lang": "en",
    "key": "gift.choose",
    "value": "Choose your gift"
  },
  {
    "id": 515,
    "lang": "ru",
    "key": "gift.choose",
    "value": "Выберите подарок"
  },
  {
    "id": 516,
    "lang": "uk",
    "key": "gift.choose",
    "value": "Оберіть подарунок"
  },
  {
    "id": 517,
    "lang": "en",
    "key": "gift.free_delivery",
    "value": "Free Delivery"
  },
  {
    "id": 518,
    "lang": "ru",
    "key": "gift.free_delivery",
    "value": "Бесплатная доставка"
  },
  {
    "id": 519,
    "lang": "uk",
    "key": "gift.free_delivery",
    "value": "Безкоштовна доставка"
  },
  {
    "id": 520,
    "lang": "en",
    "key": "gift.free_magnet",
    "value": "Free Magnet"
  },
  {
    "id": 521,
    "lang": "ru",
    "key": "gift.free_magnet",
    "value": "Бесплатный магнит"
  },
  {
    "id": 522,
    "lang": "uk",
    "key": "gift.free_magnet",
    "value": "Безкоштовний магніт"
  },
  {
    "id": 523,
    "lang": "en",
    "key": "gift.magnet_comment",
    "value": "Magnet comment"
  },
  {
    "id": 524,
    "lang": "ru",
    "key": "gift.magnet_comment",
    "value": "Комментарий к магниту"
  },
  {
    "id": 525,
    "lang": "uk",
    "key": "gift.magnet_comment",
    "value": "Коментар до магніту"
  },
  {
    "id": 526,
    "lang": "en",
    "key": "gift.magnet_existing",
    "value": "Use existing photo"
  },
  {
    "id": 527,
    "lang": "ru",
    "key": "gift.magnet_existing",
    "value": "Использовать загруженное фото"
  },
  {
    "id": 528,
    "lang": "uk",
    "key": "gift.magnet_existing",
    "value": "Використати завантажене фото"
  },
  {
    "id": 529,
    "lang": "en",
    "key": "gift.magnet_photo_placeholder",
    "value": "Select photo for magnet"
  },
  {
    "id": 530,
    "lang": "ru",
    "key": "gift.magnet_photo_placeholder",
    "value": "Выберите фото для магнита"
  },
  {
    "id": 531,
    "lang": "uk",
    "key": "gift.magnet_photo_placeholder",
    "value": "Оберіть фото для магніту"
  },
  {
    "id": 532,
    "lang": "en",
    "key": "gift.magnet_upload",
    "value": "Upload new photo"
  },
  {
    "id": 533,
    "lang": "ru",
    "key": "gift.magnet_upload",
    "value": "Загрузить новое фото"
  },
  {
    "id": 534,
    "lang": "uk",
    "key": "gift.magnet_upload",
    "value": "Завантажити нове фото"
  },
  {
    "id": 535,
    "lang": "en",
    "key": "gift.promo_text",
    "value": "Order over {amount} UAH and get a gift!"
  },
  {
    "id": 536,
    "lang": "ru",
    "key": "gift.promo_text",
    "value": "Сделайте заказ на сумму от {amount} грн и получите подарок!"
  },
  {
    "id": 537,
    "lang": "uk",
    "key": "gift.promo_text",
    "value": "Зробіть замовлення на суму від {amount} грн і отримайте подарунок!"
  },
  {
    "id": 538,
    "lang": "en",
    "key": "gift.select_photo",
    "value": "Select Photo"
  },
  {
    "id": 539,
    "lang": "ru",
    "key": "gift.select_photo",
    "value": "Выбрать фото"
  },
  {
    "id": 540,
    "lang": "uk",
    "key": "gift.select_photo",
    "value": "Обрати фото"
  },
  {
    "id": 541,
    "lang": "en",
    "key": "gift.select_required",
    "value": "Please, select a gift"
  },
  {
    "id": 542,
    "lang": "ru",
    "key": "gift.select_required",
    "value": "Пожалуйста, выберите подарок"
  },
  {
    "id": 543,
    "lang": "uk",
    "key": "gift.select_required",
    "value": "Будь ласка, оберіть подарунок"
  },
  {
    "id": 544,
    "lang": "en",
    "key": "gift.selected",
    "value": "Selected gift"
  },
  {
    "id": 545,
    "lang": "ru",
    "key": "gift.selected",
    "value": "Выбранный подарок"
  },
  {
    "id": 546,
    "lang": "uk",
    "key": "gift.selected",
    "value": "Обраний подарунок"
  },
  {
    "id": 547,
    "lang": "en",
    "key": "gift.step2_desc",
    "value": "Customize your gift"
  },
  {
    "id": 548,
    "lang": "ru",
    "key": "gift.step2_desc",
    "value": "Настройте свой подарок"
  },
  {
    "id": 549,
    "lang": "uk",
    "key": "gift.step2_desc",
    "value": "Налаштуйте свій подарунок"
  },
  {
    "id": 550,
    "lang": "en",
    "key": "gift.step2_text",
    "value": "After uploading photos, choose size, quantity and other options. Bulk discounts available. Orders over {amount} UAH get a free magnet or free delivery!"
  },
  {
    "id": 551,
    "lang": "ru",
    "key": "gift.step2_text",
    "value": "После того как фотографии загружены, выберите размер, количество и другие параметры. При печати большого количества фотографий предоставляется скидка. При заказе от {amount} грн — магнит или бесплатная доставка в подарок!"
  },
  {
    "id": 552,
    "lang": "uk",
    "key": "gift.step2_text",
    "value": "Після того як фотографії завантажені, оберіть розмір, кількість та інші параметри. При друку великої кількості фотографій надається знижка. При замовленні від {amount} грн — магніт або безкоштовна доставка у подарунок!"
  },
  {
    "id": 553,
    "lang": "en",
    "key": "gift.title",
    "value": "Gift"
  },
  {
    "id": 554,
    "lang": "ru",
    "key": "gift.title",
    "value": "Подарок"
  },
  {
    "id": 555,
    "lang": "uk",
    "key": "gift.title",
    "value": "Подарунок"
  },
  {
    "id": 556,
    "lang": "en",
    "key": "header.schedule_default",
    "value": "Mon-Sat 9:00-18:00"
  },
  {
    "id": 557,
    "lang": "ru",
    "key": "header.schedule_default",
    "value": "Пн-Сб 9:00-18:00"
  },
  {
    "id": 558,
    "lang": "uk",
    "key": "header.schedule_default",
    "value": "Пн-Сб 9:00-18:00"
  },
  {
    "id": 559,
    "lang": "en",
    "key": "hero.subtitle",
    "value": "Professional photo printing online"
  },
  {
    "id": 560,
    "lang": "ru",
    "key": "hero.subtitle",
    "value": "Профессиональная печать фото онлайн"
  },
  {
    "id": 561,
    "lang": "uk",
    "key": "hero.subtitle",
    "value": "Професійний друк фото онлайн"
  },
  {
    "id": 562,
    "lang": "en",
    "key": "hero.title",
    "value": "Print Your Memories"
  },
  {
    "id": 563,
    "lang": "ru",
    "key": "hero.title",
    "value": "Напечатайте ваши воспоминания"
  },
  {
    "id": 564,
    "lang": "uk",
    "key": "hero.title",
    "value": "Надрукуйте ваші спогади"
  },
  {
    "id": 565,
    "lang": "en",
    "key": "image_options.additional",
    "value": "Additional Options"
  },
  {
    "id": 566,
    "lang": "ru",
    "key": "image_options.additional",
    "value": "Дополнительные опции"
  },
  {
    "id": 567,
    "lang": "uk",
    "key": "image_options.additional",
    "value": "Додаткові опції"
  },
  {
    "id": 568,
    "lang": "en",
    "key": "image_options.crop_std_default",
    "value": ""
  },
  {
    "id": 569,
    "lang": "ru",
    "key": "image_options.crop_std_default",
    "value": ""
  },
  {
    "id": 570,
    "lang": "uk",
    "key": "image_options.crop_std_default",
    "value": ""
  },
  {
    "id": 571,
    "lang": "en",
    "key": "image_options.fit_in",
    "value": "Fit-in"
  },
  {
    "id": 572,
    "lang": "ru",
    "key": "image_options.fit_in",
    "value": "Не обрезать (FIT-IN)"
  },
  {
    "id": 573,
    "lang": "uk",
    "key": "image_options.fit_in",
    "value": "Не обрізати (FIT-IN)"
  },
  {
    "id": 574,
    "lang": "en",
    "key": "image_options.free_cropping",
    "value": "Free Cropping"
  },
  {
    "id": 575,
    "lang": "ru",
    "key": "image_options.free_cropping",
    "value": "Free Cropping (Произвольная обрезка)"
  },
  {
    "id": 576,
    "lang": "uk",
    "key": "image_options.free_cropping",
    "value": "Free Cropping (Довільна обрізка)"
  },
  {
    "id": 577,
    "lang": "en",
    "key": "image_options.no_resize",
    "value": "No Resize"
  },
  {
    "id": 578,
    "lang": "ru",
    "key": "image_options.no_resize",
    "value": "Без масштабирования (NO-RESIZE)"
  },
  {
    "id": 579,
    "lang": "uk",
    "key": "image_options.no_resize",
    "value": "Без масштабування (NO-RESIZE)"
  },
  {
    "id": 580,
    "lang": "en",
    "key": "item_short",
    "value": "item"
  },
  {
    "id": 581,
    "lang": "ru",
    "key": "item_short",
    "value": "шт"
  },
  {
    "id": 582,
    "lang": "uk",
    "key": "item_short",
    "value": "шт"
  },
  {
    "id": 583,
    "lang": "en",
    "key": "nav.about",
    "value": "About"
  },
  {
    "id": 584,
    "lang": "ru",
    "key": "nav.about",
    "value": "О нас"
  },
  {
    "id": 585,
    "lang": "uk",
    "key": "nav.about",
    "value": "Про нас"
  },
  {
    "id": 586,
    "lang": "en",
    "key": "nav.contact",
    "value": "Contact"
  },
  {
    "id": 587,
    "lang": "ru",
    "key": "nav.contact",
    "value": "Контакты"
  },
  {
    "id": 588,
    "lang": "uk",
    "key": "nav.contact",
    "value": "Контакти"
  },
  {
    "id": 589,
    "lang": "en",
    "key": "nav.help",
    "value": "Help"
  },
  {
    "id": 590,
    "lang": "ru",
    "key": "nav.help",
    "value": "Помощь"
  },
  {
    "id": 591,
    "lang": "uk",
    "key": "nav.help",
    "value": "Допомога"
  },
  {
    "id": 592,
    "lang": "en",
    "key": "nav.pricing",
    "value": "Pricing"
  },
  {
    "id": 593,
    "lang": "ru",
    "key": "nav.pricing",
    "value": "Цены"
  },
  {
    "id": 594,
    "lang": "uk",
    "key": "nav.pricing",
    "value": "Ціни"
  },
  {
    "id": 595,
    "lang": "en",
    "key": "nav.signin",
    "value": "Sign In"
  },
  {
    "id": 596,
    "lang": "ru",
    "key": "nav.signin",
    "value": "Войти"
  },
  {
    "id": 597,
    "lang": "uk",
    "key": "nav.signin",
    "value": "Увійти"
  },
  {
    "id": 598,
    "lang": "en",
    "key": "nav.upload",
    "value": "Upload Photos"
  },
  {
    "id": 599,
    "lang": "ru",
    "key": "nav.upload",
    "value": "Закачать фотографии"
  },
  {
    "id": 600,
    "lang": "uk",
    "key": "nav.upload",
    "value": "Завантажити фотографії"
  },
  {
    "id": 601,
    "lang": "en",
    "key": "np.city",
    "value": "City"
  },
  {
    "id": 602,
    "lang": "ru",
    "key": "np.city",
    "value": "Город"
  },
  {
    "id": 603,
    "lang": "uk",
    "key": "np.city",
    "value": "Місто"
  },
  {
    "id": 604,
    "lang": "en",
    "key": "np.city_placeholder",
    "value": "Enter city name"
  },
  {
    "id": 605,
    "lang": "ru",
    "key": "np.city_placeholder",
    "value": "Введите название города"
  },
  {
    "id": 606,
    "lang": "uk",
    "key": "np.city_placeholder",
    "value": "Введіть назву міста"
  },
  {
    "id": 607,
    "lang": "en",
    "key": "np.no_results",
    "value": "No results found"
  },
  {
    "id": 608,
    "lang": "ru",
    "key": "np.no_results",
    "value": "Ничего не найдено"
  },
  {
    "id": 609,
    "lang": "uk",
    "key": "np.no_results",
    "value": "Нічого не знайдено"
  },
  {
    "id": 610,
    "lang": "en",
    "key": "np.warehouse",
    "value": "Warehouse"
  },
  {
    "id": 611,
    "lang": "ru",
    "key": "np.warehouse",
    "value": "Отделение"
  },
  {
    "id": 612,
    "lang": "uk",
    "key": "np.warehouse",
    "value": "Відділення"
  },
  {
    "id": 613,
    "lang": "en",
    "key": "np.warehouse_placeholder",
    "value": "Select warehouse"
  },
  {
    "id": 614,
    "lang": "ru",
    "key": "np.warehouse_placeholder",
    "value": "Выберите отделение"
  },
  {
    "id": 615,
    "lang": "uk",
    "key": "np.warehouse_placeholder",
    "value": "Оберіть відділення"
  },
  {
    "id": 616,
    "lang": "en",
    "key": "pcs",
    "value": "pcs"
  },
  {
    "id": 617,
    "lang": "ru",
    "key": "pcs",
    "value": "шт"
  },
  {
    "id": 618,
    "lang": "uk",
    "key": "pcs",
    "value": "шт"
  },
  {
    "id": 619,
    "lang": "en",
    "key": "photos",
    "value": "photos"
  },
  {
    "id": 620,
    "lang": "ru",
    "key": "photos",
    "value": "фото"
  },
  {
    "id": 621,
    "lang": "uk",
    "key": "photos",
    "value": "фото"
  },
  {
    "id": 622,
    "lang": "en",
    "key": "pricing.by_tariff",
    "value": "By carrier tariff"
  },
  {
    "id": 623,
    "lang": "ru",
    "key": "pricing.by_tariff",
    "value": "По тарифу перевозчика"
  },
  {
    "id": 624,
    "lang": "uk",
    "key": "pricing.by_tariff",
    "value": "За тарифом перевізника"
  },
  {
    "id": 625,
    "lang": "en",
    "key": "pricing.contact_for_services",
    "value": "Contact us for services"
  },
  {
    "id": 626,
    "lang": "ru",
    "key": "pricing.contact_for_services",
    "value": "Свяжитесь с нами"
  },
  {
    "id": 627,
    "lang": "uk",
    "key": "pricing.contact_for_services",
    "value": "Зв'яжіться з нами"
  },
  {
    "id": 628,
    "lang": "en",
    "key": "pricing.currency_note",
    "value": "All prices in UAH"
  },
  {
    "id": 629,
    "lang": "ru",
    "key": "pricing.currency_note",
    "value": "Все цены в гривнях"
  },
  {
    "id": 630,
    "lang": "uk",
    "key": "pricing.currency_note",
    "value": "Всі ціни в гривнях"
  },
  {
    "id": 631,
    "lang": "en",
    "key": "pricing.delivery",
    "value": "Delivery"
  },
  {
    "id": 632,
    "lang": "ru",
    "key": "pricing.delivery",
    "value": "Доставка"
  },
  {
    "id": 633,
    "lang": "uk",
    "key": "pricing.delivery",
    "value": "Доставка"
  },
  {
    "id": 634,
    "lang": "en",
    "key": "pricing.format",
    "value": "Format"
  },
  {
    "id": 635,
    "lang": "ru",
    "key": "pricing.format",
    "value": "Формат"
  },
  {
    "id": 636,
    "lang": "uk",
    "key": "pricing.format",
    "value": "Формат"
  },
  {
    "id": 637,
    "lang": "en",
    "key": "pricing.magnet_note",
    "value": "Magnet with your photo"
  },
  {
    "id": 638,
    "lang": "ru",
    "key": "pricing.magnet_note",
    "value": "Магнит с вашим фото"
  },
  {
    "id": 639,
    "lang": "uk",
    "key": "pricing.magnet_note",
    "value": "Магніт з вашим фото"
  },
  {
    "id": 640,
    "lang": "en",
    "key": "pricing.magnets",
    "value": "Magnets"
  },
  {
    "id": 641,
    "lang": "ru",
    "key": "pricing.magnets",
    "value": "Магниты"
  },
  {
    "id": 642,
    "lang": "uk",
    "key": "pricing.magnets",
    "value": "Магніти"
  },
  {
    "id": 643,
    "lang": "en",
    "key": "pricing.photo_print",
    "value": "Photo Print"
  },
  {
    "id": 644,
    "lang": "ru",
    "key": "pricing.photo_print",
    "value": "Печать фото"
  },
  {
    "id": 645,
    "lang": "uk",
    "key": "pricing.photo_print",
    "value": "Друк фото"
  },
  {
    "id": 646,
    "lang": "en",
    "key": "pricing.price",
    "value": "Price"
  },
  {
    "id": 647,
    "lang": "ru",
    "key": "pricing.price",
    "value": "Цена"
  },
  {
    "id": 648,
    "lang": "uk",
    "key": "pricing.price",
    "value": "Ціна"
  },
  {
    "id": 649,
    "lang": "en",
    "key": "pricing.promo_desc",
    "value": "Orders over 1200 UAH get a free magnet or free delivery!"
  },
  {
    "id": 650,
    "lang": "ru",
    "key": "pricing.promo_desc",
    "value": "При заказе от 1200 грн — бесплатный магнит или бесплатная доставка в подарок!"
  },
  {
    "id": 651,
    "lang": "uk",
    "key": "pricing.promo_desc",
    "value": "При замовленні від 1200 грн — безкоштовний магніт або безкоштовна доставка у подарунок!"
  },
  {
    "id": 652,
    "lang": "en",
    "key": "pricing.promo_title",
    "value": "Special Offer!"
  },
  {
    "id": 653,
    "lang": "ru",
    "key": "pricing.promo_title",
    "value": "Специальное предложение!"
  },
  {
    "id": 654,
    "lang": "uk",
    "key": "pricing.promo_title",
    "value": "Спеціальна пропозиція!"
  },
  {
    "id": 655,
    "lang": "en",
    "key": "pricing.service_collage",
    "value": "Collage"
  },
  {
    "id": 656,
    "lang": "ru",
    "key": "pricing.service_collage",
    "value": "Коллаж"
  },
  {
    "id": 657,
    "lang": "uk",
    "key": "pricing.service_collage",
    "value": "Колаж"
  },
  {
    "id": 658,
    "lang": "en",
    "key": "pricing.service_documents",
    "value": "Document Photo"
  },
  {
    "id": 659,
    "lang": "ru",
    "key": "pricing.service_documents",
    "value": "Фото на документы"
  },
  {
    "id": 660,
    "lang": "uk",
    "key": "pricing.service_documents",
    "value": "Фото на документи"
  },
  {
    "id": 661,
    "lang": "en",
    "key": "pricing.service_redeye",
    "value": "Red Eye Removal"
  },
  {
    "id": 662,
    "lang": "ru",
    "key": "pricing.service_redeye",
    "value": "Удаление красных глаз"
  },
  {
    "id": 663,
    "lang": "uk",
    "key": "pricing.service_redeye",
    "value": "Видалення червоних очей"
  },
  {
    "id": 664,
    "lang": "en",
    "key": "pricing.service_restore",
    "value": "Photo Restoration"
  },
  {
    "id": 665,
    "lang": "ru",
    "key": "pricing.service_restore",
    "value": "Реставрация фото"
  },
  {
    "id": 666,
    "lang": "uk",
    "key": "pricing.service_restore",
    "value": "Реставрація фото"
  },
  {
    "id": 667,
    "lang": "en",
    "key": "pricing.service_scan",
    "value": "Photo Scanning"
  },
  {
    "id": 668,
    "lang": "ru",
    "key": "pricing.service_scan",
    "value": "Сканирование фото"
  },
  {
    "id": 669,
    "lang": "uk",
    "key": "pricing.service_scan",
    "value": "Сканування фото"
  },
  {
    "id": 670,
    "lang": "en",
    "key": "pricing.services",
    "value": "Services"
  },
  {
    "id": 671,
    "lang": "ru",
    "key": "pricing.services",
    "value": "Услуги"
  },
  {
    "id": 672,
    "lang": "uk",
    "key": "pricing.services",
    "value": "Послуги"
  },
  {
    "id": 673,
    "lang": "en",
    "key": "pricing.subtitle",
    "value": "Transparent pricing"
  },
  {
    "id": 674,
    "lang": "ru",
    "key": "pricing.subtitle",
    "value": "Прозрачные цены"
  },
  {
    "id": 675,
    "lang": "uk",
    "key": "pricing.subtitle",
    "value": "Прозорі ціни"
  },
  {
    "id": 676,
    "lang": "en",
    "key": "pricing.title",
    "value": "Pricing"
  },
  {
    "id": 677,
    "lang": "ru",
    "key": "pricing.title",
    "value": "Цены"
  },
  {
    "id": 678,
    "lang": "uk",
    "key": "pricing.title",
    "value": "Ціни"
  },
  {
    "id": 679,
    "lang": "en",
    "key": "prints",
    "value": "pcs."
  },
  {
    "id": 680,
    "lang": "ru",
    "key": "prints",
    "value": "шт."
  },
  {
    "id": 681,
    "lang": "uk",
    "key": "prints",
    "value": "шт."
  },
  {
    "id": 682,
    "lang": "en",
    "key": "settings.analytics",
    "value": "Analytics"
  },
  {
    "id": 683,
    "lang": "ru",
    "key": "settings.analytics",
    "value": "Аналитика"
  },
  {
    "id": 684,
    "lang": "uk",
    "key": "settings.analytics",
    "value": "Аналітика"
  },
  {
    "id": 685,
    "lang": "en",
    "key": "settings.analytics_desc",
    "value": "Tracking and analytics settings"
  },
  {
    "id": 686,
    "lang": "ru",
    "key": "settings.analytics_desc",
    "value": "Настройки отслеживания и аналитики"
  },
  {
    "id": 687,
    "lang": "uk",
    "key": "settings.analytics_desc",
    "value": "Налаштування відстеження та аналітики"
  },
  {
    "id": 688,
    "lang": "en",
    "key": "settings.bing_verification",
    "value": "Bing Verification"
  },
  {
    "id": 689,
    "lang": "ru",
    "key": "settings.bing_verification",
    "value": "Верификация Bing"
  },
  {
    "id": 690,
    "lang": "uk",
    "key": "settings.bing_verification",
    "value": "Верифікація Bing"
  },
  {
    "id": 691,
    "lang": "en",
    "key": "settings.branding",
    "value": "Branding"
  },
  {
    "id": 692,
    "lang": "ru",
    "key": "settings.branding",
    "value": "Брендинг"
  },
  {
    "id": 693,
    "lang": "uk",
    "key": "settings.branding",
    "value": "Брендинг"
  },
  {
    "id": 694,
    "lang": "en",
    "key": "settings.branding_desc",
    "value": "Logo and brand settings"
  },
  {
    "id": 695,
    "lang": "ru",
    "key": "settings.branding_desc",
    "value": "Настройки логотипа и бренда"
  },
  {
    "id": 696,
    "lang": "uk",
    "key": "settings.branding_desc",
    "value": "Налаштування логотипу та бренду"
  },
  {
    "id": 697,
    "lang": "en",
    "key": "settings.cleanup_error",
    "value": "Error during cleanup"
  },
  {
    "id": 698,
    "lang": "ru",
    "key": "settings.cleanup_error",
    "value": "Ошибка при очистке"
  },
  {
    "id": 699,
    "lang": "uk",
    "key": "settings.cleanup_error",
    "value": "Помилка під час очищення"
  },
  {
    "id": 700,
    "lang": "en",
    "key": "settings.cleanup_files",
    "value": "Cleanup old files"
  },
  {
    "id": 701,
    "lang": "ru",
    "key": "settings.cleanup_files",
    "value": "Очистка старых файлов"
  },
  {
    "id": 702,
    "lang": "uk",
    "key": "settings.cleanup_files",
    "value": "Очищення старих файлів"
  },
  {
    "id": 703,
    "lang": "en",
    "key": "settings.cleanup_files_desc",
    "value": "Check and archive files not linked to orders"
  },
  {
    "id": 704,
    "lang": "ru",
    "key": "settings.cleanup_files_desc",
    "value": "Проверка и архивация файлов, не привязанных к заказам"
  },
  {
    "id": 705,
    "lang": "uk",
    "key": "settings.cleanup_files_desc",
    "value": "Перевірка та архівація файлів, які не прив'язані до замовлень"
  },
  {
    "id": 706,
    "lang": "en",
    "key": "settings.cleanup_success",
    "value": "Cleanup completed successfully"
  },
  {
    "id": 707,
    "lang": "ru",
    "key": "settings.cleanup_success",
    "value": "Очистка успешно завершена"
  },
  {
    "id": 708,
    "lang": "uk",
    "key": "settings.cleanup_success",
    "value": "Очищення завершено успішно"
  },
  {
    "id": 709,
    "lang": "en",
    "key": "settings.confirm_cleanup",
    "value": "Are you sure? This will move orphaned files to archive."
  },
  {
    "id": 710,
    "lang": "ru",
    "key": "settings.confirm_cleanup",
    "value": "Вы уверены? Это переместит потерянные файлы в архив."
  },
  {
    "id": 711,
    "lang": "uk",
    "key": "settings.confirm_cleanup",
    "value": "Ви впевнені? Це перемістить осиротілі файли в архів."
  },
  {
    "id": 712,
    "lang": "en",
    "key": "settings.contact_address",
    "value": "Address"
  },
  {
    "id": 713,
    "lang": "ru",
    "key": "settings.contact_address",
    "value": "Адрес"
  },
  {
    "id": 714,
    "lang": "uk",
    "key": "settings.contact_address",
    "value": "Адреса"
  },
  {
    "id": 715,
    "lang": "en",
    "key": "settings.contact_phone",
    "value": "Contact Phone"
  },
  {
    "id": 716,
    "lang": "ru",
    "key": "settings.contact_phone",
    "value": "Контактный телефон"
  },
  {
    "id": 717,
    "lang": "uk",
    "key": "settings.contact_phone",
    "value": "Контактний телефон"
  },
  {
    "id": 718,
    "lang": "en",
    "key": "settings.contact_phone1",
    "value": "Phone 1"
  },
  {
    "id": 719,
    "lang": "ru",
    "key": "settings.contact_phone1",
    "value": "Телефон 1"
  },
  {
    "id": 720,
    "lang": "uk",
    "key": "settings.contact_phone1",
    "value": "Телефон 1"
  },
  {
    "id": 721,
    "lang": "en",
    "key": "settings.contact_phone2",
    "value": "Phone 2"
  },
  {
    "id": 722,
    "lang": "ru",
    "key": "settings.contact_phone2",
    "value": "Телефон 2"
  },
  {
    "id": 723,
    "lang": "uk",
    "key": "settings.contact_phone2",
    "value": "Телефон 2"
  },
  {
    "id": 724,
    "lang": "en",
    "key": "settings.contact_schedule",
    "value": "Schedule"
  },
  {
    "id": 725,
    "lang": "ru",
    "key": "settings.contact_schedule",
    "value": "Расписание"
  },
  {
    "id": 726,
    "lang": "uk",
    "key": "settings.contact_schedule",
    "value": "Розклад"
  },
  {
    "id": 727,
    "lang": "en",
    "key": "settings.facebook",
    "value": "Facebook"
  },
  {
    "id": 728,
    "lang": "ru",
    "key": "settings.facebook",
    "value": "Facebook"
  },
  {
    "id": 729,
    "lang": "uk",
    "key": "settings.facebook",
    "value": "Facebook"
  },
  {
    "id": 730,
    "lang": "en",
    "key": "settings.facebook_pixel_id",
    "value": "Facebook Pixel ID"
  },
  {
    "id": 731,
    "lang": "ru",
    "key": "settings.facebook_pixel_id",
    "value": "Facebook Pixel ID"
  },
  {
    "id": 732,
    "lang": "uk",
    "key": "settings.facebook_pixel_id",
    "value": "Facebook Pixel ID"
  },
  {
    "id": 733,
    "lang": "en",
    "key": "settings.ga4_measurement_id",
    "value": "GA4 Measurement ID"
  },
  {
    "id": 734,
    "lang": "ru",
    "key": "settings.ga4_measurement_id",
    "value": "GA4 Measurement ID"
  },
  {
    "id": 735,
    "lang": "uk",
    "key": "settings.ga4_measurement_id",
    "value": "GA4 Measurement ID"
  },
  {
    "id": 736,
    "lang": "en",
    "key": "settings.general",
    "value": "General"
  },
  {
    "id": 737,
    "lang": "ru",
    "key": "settings.general",
    "value": "Общие"
  },
  {
    "id": 738,
    "lang": "uk",
    "key": "settings.general",
    "value": "Загальні"
  },
  {
    "id": 739,
    "lang": "en",
    "key": "settings.general_desc",
    "value": "General site settings"
  },
  {
    "id": 740,
    "lang": "ru",
    "key": "settings.general_desc",
    "value": "Общие настройки сайта"
  },
  {
    "id": 741,
    "lang": "uk",
    "key": "settings.general_desc",
    "value": "Загальні налаштування сайту"
  },
  {
    "id": 742,
    "lang": "en",
    "key": "settings.google_verification",
    "value": "Google Verification"
  },
  {
    "id": 743,
    "lang": "ru",
    "key": "settings.google_verification",
    "value": "Верификация Google"
  },
  {
    "id": 744,
    "lang": "uk",
    "key": "settings.google_verification",
    "value": "Верифікація Google"
  },
  {
    "id": 745,
    "lang": "en",
    "key": "settings.instagram",
    "value": "Instagram"
  },
  {
    "id": 746,
    "lang": "ru",
    "key": "settings.instagram",
    "value": "Instagram"
  },
  {
    "id": 747,
    "lang": "uk",
    "key": "settings.instagram",
    "value": "Instagram"
  },
  {
    "id": 748,
    "lang": "en",
    "key": "settings.logo_subtitle_en",
    "value": "Subtitle EN"
  },
  {
    "id": 749,
    "lang": "ru",
    "key": "settings.logo_subtitle_en",
    "value": "Подзаголовок EN"
  },
  {
    "id": 750,
    "lang": "uk",
    "key": "settings.logo_subtitle_en",
    "value": "Підзаголовок EN"
  },
  {
    "id": 751,
    "lang": "en",
    "key": "settings.logo_subtitle_ru",
    "value": "Subtitle RU"
  },
  {
    "id": 752,
    "lang": "ru",
    "key": "settings.logo_subtitle_ru",
    "value": "Подзаголовок RU"
  },
  {
    "id": 753,
    "lang": "uk",
    "key": "settings.logo_subtitle_ru",
    "value": "Підзаголовок RU"
  },
  {
    "id": 754,
    "lang": "en",
    "key": "settings.logo_subtitle_uk",
    "value": "Subtitle UK"
  },
  {
    "id": 755,
    "lang": "ru",
    "key": "settings.logo_subtitle_uk",
    "value": "Подзаголовок UK"
  },
  {
    "id": 756,
    "lang": "uk",
    "key": "settings.logo_subtitle_uk",
    "value": "Підзаголовок UK"
  },
  {
    "id": 757,
    "lang": "en",
    "key": "settings.logo_suffix_en",
    "value": "Suffix EN"
  },
  {
    "id": 758,
    "lang": "ru",
    "key": "settings.logo_suffix_en",
    "value": "Суффикс EN"
  },
  {
    "id": 759,
    "lang": "uk",
    "key": "settings.logo_suffix_en",
    "value": "Суфікс EN"
  },
  {
    "id": 760,
    "lang": "en",
    "key": "settings.logo_suffix_ru",
    "value": "Suffix RU"
  },
  {
    "id": 761,
    "lang": "ru",
    "key": "settings.logo_suffix_ru",
    "value": "Суффикс RU"
  },
  {
    "id": 762,
    "lang": "uk",
    "key": "settings.logo_suffix_ru",
    "value": "Суфікс RU"
  },
  {
    "id": 763,
    "lang": "en",
    "key": "settings.logo_suffix_uk",
    "value": "Suffix UK"
  },
  {
    "id": 764,
    "lang": "ru",
    "key": "settings.logo_suffix_uk",
    "value": "Суффикс UK"
  },
  {
    "id": 765,
    "lang": "uk",
    "key": "settings.logo_suffix_uk",
    "value": "Суфікс UK"
  },
  {
    "id": 766,
    "lang": "en",
    "key": "settings.maintenance",
    "value": "Maintenance"
  },
  {
    "id": 767,
    "lang": "ru",
    "key": "settings.maintenance",
    "value": "Обслуживание"
  },
  {
    "id": 768,
    "lang": "uk",
    "key": "settings.maintenance",
    "value": "Обслуговування"
  },
  {
    "id": 769,
    "lang": "en",
    "key": "settings.maintenance_desc",
    "value": "System operations and cleanup"
  },
  {
    "id": 770,
    "lang": "ru",
    "key": "settings.maintenance_desc",
    "value": "Системные операции и очистка"
  },
  {
    "id": 771,
    "lang": "uk",
    "key": "settings.maintenance_desc",
    "value": "Системні операції та очищення"
  },
  {
    "id": 772,
    "lang": "en",
    "key": "settings.messengers",
    "value": "Messengers"
  },
  {
    "id": 773,
    "lang": "ru",
    "key": "settings.messengers",
    "value": "Мессенджеры"
  },
  {
    "id": 774,
    "lang": "uk",
    "key": "settings.messengers",
    "value": "Месенджери"
  },
  {
    "id": 775,
    "lang": "en",
    "key": "settings.messengers_desc",
    "value": "Messenger settings"
  },
  {
    "id": 776,
    "lang": "ru",
    "key": "settings.messengers_desc",
    "value": "Настройки мессенджеров"
  },
  {
    "id": 777,
    "lang": "uk",
    "key": "settings.messengers_desc",
    "value": "Налаштування месенджерів"
  },
  {
    "id": 778,
    "lang": "en",
    "key": "settings.run_cleanup",
    "value": "Run Cleanup"
  },
  {
    "id": 779,
    "lang": "ru",
    "key": "settings.run_cleanup",
    "value": "Запустить очистку"
  },
  {
    "id": 780,
    "lang": "uk",
    "key": "settings.run_cleanup",
    "value": "Запустити очищення"
  },
  {
    "id": 781,
    "lang": "en",
    "key": "settings.seo",
    "value": "SEO"
  },
  {
    "id": 782,
    "lang": "ru",
    "key": "settings.seo",
    "value": "SEO"
  },
  {
    "id": 783,
    "lang": "uk",
    "key": "settings.seo",
    "value": "SEO"
  },
  {
    "id": 784,
    "lang": "en",
    "key": "settings.seo_desc",
    "value": "Search Engine Optimization"
  },
  {
    "id": 785,
    "lang": "ru",
    "key": "settings.seo_desc",
    "value": "Оптимизация для поисковиков"
  },
  {
    "id": 786,
    "lang": "uk",
    "key": "settings.seo_desc",
    "value": "Оптимізація для пошуковиків"
  },
  {
    "id": 787,
    "lang": "en",
    "key": "settings.site_name",
    "value": "Site Name"
  },
  {
    "id": 788,
    "lang": "ru",
    "key": "settings.site_name",
    "value": "Название сайта"
  },
  {
    "id": 789,
    "lang": "uk",
    "key": "settings.site_name",
    "value": "Назва сайту"
  },
  {
    "id": 790,
    "lang": "en",
    "key": "settings.social",
    "value": "Social"
  },
  {
    "id": 791,
    "lang": "ru",
    "key": "settings.social",
    "value": "Соцсети"
  },
  {
    "id": 792,
    "lang": "uk",
    "key": "settings.social",
    "value": "Соцмережі"
  },
  {
    "id": 793,
    "lang": "en",
    "key": "settings.social_desc",
    "value": "Social media links"
  },
  {
    "id": 794,
    "lang": "ru",
    "key": "settings.social_desc",
    "value": "Ссылки на соцсети"
  },
  {
    "id": 795,
    "lang": "uk",
    "key": "settings.social_desc",
    "value": "Посилання на соцмережі"
  },
  {
    "id": 796,
    "lang": "en",
    "key": "settings.support_email",
    "value": "Support Email"
  },
  {
    "id": 797,
    "lang": "ru",
    "key": "settings.support_email",
    "value": "Email поддержки"
  },
  {
    "id": 798,
    "lang": "uk",
    "key": "settings.support_email",
    "value": "Email підтримки"
  },
  {
    "id": 799,
    "lang": "en",
    "key": "settings.telegram",
    "value": "Telegram"
  },
  {
    "id": 800,
    "lang": "ru",
    "key": "settings.telegram",
    "value": "Telegram"
  },
  {
    "id": 801,
    "lang": "uk",
    "key": "settings.telegram",
    "value": "Telegram"
  },
  {
    "id": 802,
    "lang": "en",
    "key": "settings.telegram_active",
    "value": "Telegram Active"
  },
  {
    "id": 803,
    "lang": "ru",
    "key": "settings.telegram_active",
    "value": "Telegram активен"
  },
  {
    "id": 804,
    "lang": "uk",
    "key": "settings.telegram_active",
    "value": "Telegram активний"
  },
  {
    "id": 805,
    "lang": "en",
    "key": "settings.viber",
    "value": "Viber"
  },
  {
    "id": 806,
    "lang": "ru",
    "key": "settings.viber",
    "value": "Viber"
  },
  {
    "id": 807,
    "lang": "uk",
    "key": "settings.viber",
    "value": "Viber"
  },
  {
    "id": 808,
    "lang": "en",
    "key": "settings.viber_active",
    "value": "Viber Active"
  },
  {
    "id": 809,
    "lang": "ru",
    "key": "settings.viber_active",
    "value": "Viber активен"
  },
  {
    "id": 810,
    "lang": "uk",
    "key": "settings.viber_active",
    "value": "Viber активний"
  },
  {
    "id": 811,
    "lang": "en",
    "key": "settings.yandex_metrica_id",
    "value": "Yandex Metrica ID"
  },
  {
    "id": 812,
    "lang": "ru",
    "key": "settings.yandex_metrica_id",
    "value": "ID Яндекс Метрики"
  },
  {
    "id": 813,
    "lang": "uk",
    "key": "settings.yandex_metrica_id",
    "value": "ID Яндекс Метрики"
  },
  {
    "id": 814,
    "lang": "en",
    "key": "settings.yandex_verification",
    "value": "Yandex Verification"
  },
  {
    "id": 815,
    "lang": "ru",
    "key": "settings.yandex_verification",
    "value": "Верификация Яндекс"
  },
  {
    "id": 816,
    "lang": "uk",
    "key": "settings.yandex_verification",
    "value": "Верифікація Яндекс"
  },
  {
    "id": 817,
    "lang": "en",
    "key": "upload.add_more",
    "value": "Add more"
  },
  {
    "id": 818,
    "lang": "ru",
    "key": "upload.add_more",
    "value": "Добавить еще"
  },
  {
    "id": 819,
    "lang": "uk",
    "key": "upload.add_more",
    "value": "Додати ще"
  },
  {
    "id": 820,
    "lang": "en",
    "key": "upload.all_default_notice",
    "value": "Note! After uploading to our site, all photos will be 10x15 Glossy. Change if needed."
  },
  {
    "id": 821,
    "lang": "ru",
    "key": "upload.all_default_notice",
    "value": "Внимание! После загрузки на наш сайт все фото будут 10х15 Глянец. Измените если необходимо."
  },
  {
    "id": 822,
    "lang": "uk",
    "key": "upload.all_default_notice",
    "value": "Увага! Після завантаження на наш сайт всі фото будуть 10х15 Глянець. Змініть якщо потрібно."
  },
  {
    "id": 823,
    "lang": "en",
    "key": "upload.default_notice",
    "value": "Default: 10x15, Glossy"
  },
  {
    "id": 824,
    "lang": "ru",
    "key": "upload.default_notice",
    "value": "По умолчанию: 10x15, Глянцевая"
  },
  {
    "id": 825,
    "lang": "uk",
    "key": "upload.default_notice",
    "value": "За замовчуванням: 10x15, Глянцевий"
  },
  {
    "id": 826,
    "lang": "en",
    "key": "upload.failed",
    "value": "Failed"
  },
  {
    "id": 827,
    "lang": "ru",
    "key": "upload.failed",
    "value": "Ошибка"
  },
  {
    "id": 828,
    "lang": "uk",
    "key": "upload.failed",
    "value": "Помилка"
  },
  {
    "id": 829,
    "lang": "en",
    "key": "upload.retry",
    "value": "Retry"
  },
  {
    "id": 830,
    "lang": "ru",
    "key": "upload.retry",
    "value": "Повторить"
  },
  {
    "id": 831,
    "lang": "uk",
    "key": "upload.retry",
    "value": "Повторити"
  },
  {
    "id": 832,
    "lang": "en",
    "key": "upload.uploaded",
    "value": "Uploaded"
  },
  {
    "id": 833,
    "lang": "ru",
    "key": "upload.uploaded",
    "value": "Загружено"
  },
  {
    "id": 834,
    "lang": "uk",
    "key": "upload.uploaded",
    "value": "Завантажено"
  },
  {
    "id": 835,
    "lang": "en",
    "key": "upload.uploading",
    "value": "Uploading..."
  },
  {
    "id": 836,
    "lang": "ru",
    "key": "upload.uploading",
    "value": "Загрузка..."
  },
  {
    "id": 837,
    "lang": "uk",
    "key": "upload.uploading",
    "value": "Завантаження..."
  },
  {
    "id": 838,
    "lang": "en",
    "key": "validation.required_field",
    "value": "Required field"
  },
  {
    "id": 839,
    "lang": "ru",
    "key": "validation.required_field",
    "value": "Обязательное поле"
  },
  {
    "id": 840,
    "lang": "uk",
    "key": "validation.required_field",
    "value": "Обов'язкове поле"
  },
  {
    "id": 841,
    "lang": "en",
    "key": "Для того, щоб зробити замовлення фотографій онлайн, завантажте їх на наш сайт. Файли приймаються у форматі JPG, PNG та інших популярних форматах. Максимальний розмір одного файлу — 100 MB.",
    "value": "To place an order for photos online, upload them to our website. Files are accepted in JPG, PNG and other popular formats. Maximum file size — 100 MB."
  },
  {
    "id": 842,
    "lang": "ru",
    "key": "Для того, щоб зробити замовлення фотографій онлайн, завантажте їх на наш сайт. Файли приймаються у форматі JPG, PNG та інших популярних форматах. Максимальний розмір одного файлу — 100 MB.",
    "value": "Для того, чтобы сделать заказ фотографий онлайн, загрузите их на наш сайт. Файлы принимаются в формате JPG, PNG и других популярных форматах. Максимальный размер одного файла — 100 MB."
  },
  {
    "id": 843,
    "lang": "uk",
    "key": "Для того, щоб зробити замовлення фотографій онлайн, завантажте їх на наш сайт. Файли приймаються у форматі JPG, PNG та інших популярних форматах. Максимальний розмір одного файлу — 100 MB.",
    "value": "Для того, щоб зробити замовлення фотографій онлайн, завантажте їх на наш сайт. Файли приймаються у форматі JPG, PNG та інших популярних форматах. Максимальний розмір одного файлу — 100 MB."
  },
  {
    "id": 844,
    "lang": "en",
    "key": "Завантажте фотографії",
    "value": "Upload your photos"
  },
  {
    "id": 845,
    "lang": "ru",
    "key": "Завантажте фотографії",
    "value": "Загрузите фотографии"
  },
  {
    "id": 846,
    "lang": "uk",
    "key": "Завантажте фотографії",
    "value": "Завантажте фотографії"
  },
  {
    "id": 847,
    "lang": "en",
    "key": "Наш сервіс для тих людей, хто цінує свій час та гроші!",
    "value": "Our service is for people who value their time and money!"
  },
  {
    "id": 848,
    "lang": "ru",
    "key": "Наш сервіс для тих людей, хто цінує свій час та гроші!",
    "value": "Наш сервис для тех людей кто ценит свое время и деньги!"
  },
  {
    "id": 849,
    "lang": "uk",
    "key": "Наш сервіс для тих людей, хто цінує свій час та гроші!",
    "value": "Наш сервіс для тих людей, хто цінує свій час та гроші!"
  },
  {
    "id": 850,
    "lang": "en",
    "key": "Отримайте фотографії",
    "value": "Receive your photos"
  },
  {
    "id": 851,
    "lang": "ru",
    "key": "Отримайте фотографії",
    "value": "Получите фотографии"
  },
  {
    "id": 852,
    "lang": "uk",
    "key": "Отримайте фотографії",
    "value": "Отримайте фотографії"
  },
  {
    "id": 853,
    "lang": "en",
    "key": "Оформіть замовлення",
    "value": "Place your order"
  },
  {
    "id": 854,
    "lang": "ru",
    "key": "Оформіть замовлення",
    "value": "Оформите заказ"
  },
  {
    "id": 855,
    "lang": "uk",
    "key": "Оформіть замовлення",
    "value": "Оформіть замовлення"
  },
  {
    "id": 856,
    "lang": "en",
    "key": "Показано",
    "value": "Showing"
  },
  {
    "id": 857,
    "lang": "ru",
    "key": "Показано",
    "value": "Показано"
  },
  {
    "id": 858,
    "lang": "uk",
    "key": "Показано",
    "value": "Показано"
  },
  {
    "id": 859,
    "lang": "en",
    "key": "Показати ще",
    "value": "Show more"
  },
  {
    "id": 860,
    "lang": "ru",
    "key": "Показати ще",
    "value": "Показать ещё"
  },
  {
    "id": 861,
    "lang": "uk",
    "key": "Показати ще",
    "value": "Показати ще"
  },
  {
    "id": 862,
    "lang": "en",
    "key": "Послуги цифрового фотодруку через інтернет у м. Дніпро",
    "value": "Digital photo printing services online in Dnipro"
  },
  {
    "id": 863,
    "lang": "ru",
    "key": "Послуги цифрового фотодруку через інтернет у м. Дніпро",
    "value": "Услуги цифровой фотопечати через интернет в г. Днепр"
  },
  {
    "id": 864,
    "lang": "uk",
    "key": "Послуги цифрового фотодруку через інтернет у м. Дніпро",
    "value": "Послуги цифрового фотодруку через інтернет у м. Дніпро"
  },
  {
    "id": 865,
    "lang": "en",
    "key": "У нас ви можете замовити ряд дизайнерських послуг таких як:",
    "value": "You can order a range of design services from us, such as:"
  },
  {
    "id": 866,
    "lang": "ru",
    "key": "У нас ви можете замовити ряд дизайнерських послуг таких як:",
    "value": "У нас вы можете заказать ряд дизайнерских услуг таких как:"
  },
  {
    "id": 867,
    "lang": "uk",
    "key": "У нас ви можете замовити ряд дизайнерських послуг таких як:",
    "value": "У нас ви можете замовити ряд дизайнерських послуг таких як:"
  },
  {
    "id": 868,
    "lang": "en",
    "key": "Фотографії ви можете забрати самостійно за адресою вул. Європейська, 8, або замовити доставку кур'єром по м. Дніпро чи у будь-яке місто України службою доставки «Нова Пошта».",
    "value": "You can pick up your photos at 8 Yevropeyska St, or order courier delivery in Dnipro or to any city in Ukraine via Nova Poshta."
  },
  {
    "id": 869,
    "lang": "ru",
    "key": "Фотографії ви можете забрати самостійно за адресою вул. Європейська, 8, або замовити доставку кур'єром по м. Дніпро чи у будь-яке місто України службою доставки «Нова Пошта».",
    "value": "Фотографии вы можете забрать самостоятельно по адресу ул. Европейская, 8, или заказать доставку курьером по г. Днепр или в любой город Украины службой доставки «Новая почта»."
  },
  {
    "id": 870,
    "lang": "uk",
    "key": "Фотографії ви можете забрати самостійно за адресою вул. Європейська, 8, або замовити доставку кур'єром по м. Дніпро чи у будь-яке місто України службою доставки «Нова Пошта».",
    "value": "Фотографії ви можете забрати самостійно за адресою вул. Європейська, 8, або замовити доставку кур'єром по м. Дніпро чи у будь-яке місто України службою доставки «Нова Пошта»."
  },
  {
    "id": 871,
    "lang": "en",
    "key": "Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!",
    "value": "What do you think photographs are for? Photographs are needed to capture unique moments in life that may never happen again!"
  },
  {
    "id": 872,
    "lang": "ru",
    "key": "Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!",
    "value": "Как вы думаете, для чего нужны фотографии? Фотографии нужны для того чтобы зафиксировать уникальные моменты жизни, которые возможно ни разу не повторятся!"
  },
  {
    "id": 873,
    "lang": "uk",
    "key": "Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!",
    "value": "Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!"
  },
  {
    "id": 874,
    "lang": "en",
    "key": "Як замовити друк фотографій онлайн",
    "value": "How to order photo printing online"
  },
  {
    "id": 875,
    "lang": "ru",
    "key": "Як замовити друк фотографій онлайн",
    "value": "Как заказать печать фотографий онлайн"
  },
  {
    "id": 876,
    "lang": "uk",
    "key": "Як замовити друк фотографій онлайн",
    "value": "Як замовити друк фотографій онлайн"
  },
  {
    "id": 877,
    "lang": "en",
    "key": "а також зробити фотографію на документи",
    "value": "as well as passport/ID photos"
  },
  {
    "id": 878,
    "lang": "ru",
    "key": "а також зробити фотографію на документи",
    "value": "а так же сделать фотографию на документы"
  },
  {
    "id": 879,
    "lang": "uk",
    "key": "а також зробити фотографію на документи",
    "value": "а також зробити фотографію на документи"
  },
  {
    "id": 880,
    "lang": "en",
    "key": "з",
    "value": "of"
  },
  {
    "id": 881,
    "lang": "ru",
    "key": "з",
    "value": "из"
  },
  {
    "id": 882,
    "lang": "uk",
    "key": "з",
    "value": "з"
  },
  {
    "id": 883,
    "lang": "en",
    "key": "продаж фотоплівки та проявка плівок",
    "value": "photo film sales and film development"
  },
  {
    "id": 884,
    "lang": "ru",
    "key": "продаж фотоплівки та проявка плівок",
    "value": "продажа фотопленки и проявка пленок"
  },
  {
    "id": 885,
    "lang": "uk",
    "key": "продаж фотоплівки та проявка плівок",
    "value": "продаж фотоплівки та проявка плівок"
  },
  {
    "id": 886,
    "lang": "en",
    "key": "продаж фоторамок різних розмірів",
    "value": "photo frames of various sizes"
  },
  {
    "id": 887,
    "lang": "ru",
    "key": "продаж фоторамок різних розмірів",
    "value": "продажа фоторамок разных размеров"
  },
  {
    "id": 888,
    "lang": "uk",
    "key": "продаж фоторамок різних розмірів",
    "value": "продаж фоторамок різних розмірів"
  },
  {
    "id": 889,
    "lang": "en",
    "key": "реставрація та комп'ютерна обробка фотографій",
    "value": "restoration and computer processing of photos"
  },
  {
    "id": 890,
    "lang": "ru",
    "key": "реставрація та комп'ютерна обробка фотографій",
    "value": "реставрация и компьютерная обработка фотографий"
  },
  {
    "id": 891,
    "lang": "uk",
    "key": "реставрація та комп'ютерна обробка фотографій",
    "value": "реставрація та комп'ютерна обробка фотографій"
  },
  {
    "id": 892,
    "lang": "en",
    "key": "розробка різноманітних макетів та колажів",
    "value": "development of various layouts and collages"
  },
  {
    "id": 893,
    "lang": "ru",
    "key": "розробка різноманітних макетів та колажів",
    "value": "разработка различных макетов и коллажей"
  },
  {
    "id": 894,
    "lang": "uk",
    "key": "розробка різноманітних макетів та колажів",
    "value": "розробка різноманітних макетів та колажів"
  },
  {
    "id": 895,
    "lang": "en",
    "key": "сканування фотографій та плівок",
    "value": "scanning of photos and films"
  },
  {
    "id": 896,
    "lang": "ru",
    "key": "сканування фотографій та плівок",
    "value": "сканирование фотографий и пленок"
  },
  {
    "id": 897,
    "lang": "uk",
    "key": "сканування фотографій та плівок",
    "value": "сканування фотографій та плівок"
  },
  {
    "id": 898,
    "lang": "en",
    "key": "усунення ефекту червоних очей",
    "value": "red-eye removal"
  },
  {
    "id": 899,
    "lang": "ru",
    "key": "усунення ефекту червоних очей",
    "value": "устранение эффекта красных глаз"
  },
  {
    "id": 900,
    "lang": "uk",
    "key": "усунення ефекту червоних очей",
    "value": "усунення ефекту червоних очей"
  },
  {
    "id": 901,
    "lang": "en",
    "key": "фото",
    "value": "photos"
  },
  {
    "id": 902,
    "lang": "ru",
    "key": "фото",
    "value": "фото"
  },
  {
    "id": 903,
    "lang": "uk",
    "key": "фото",
    "value": "фото"
  },
  {
    "id": 904,
    "lang": "en",
    "key": "admin.cleanup_confirm",
    "value": "Are you sure you want to run cleanup?"
  },
  {
    "id": 905,
    "lang": "ru",
    "key": "admin.cleanup_confirm",
    "value": "Вы уверены, что хотите выполнить очистку?"
  },
  {
    "id": 906,
    "lang": "uk",
    "key": "admin.cleanup_confirm",
    "value": "Ви впевнені, що хочете виконати очищення?"
  },
  {
    "id": 907,
    "lang": "en",
    "key": "admin.no_orphans",
    "value": "No orphaned files found"
  },
  {
    "id": 908,
    "lang": "ru",
    "key": "admin.no_orphans",
    "value": "Осиротевших файлов не найдено"
  },
  {
    "id": 909,
    "lang": "uk",
    "key": "admin.no_orphans",
    "value": "Осиротілих файлів не знайдено"
  },
  {
    "id": 910,
    "lang": "en",
    "key": "admin.order_statistics",
    "value": "Order Statistics"
  },
  {
    "id": 911,
    "lang": "ru",
    "key": "admin.order_statistics",
    "value": "Статистика заказов"
  },
  {
    "id": 912,
    "lang": "uk",
    "key": "admin.order_statistics",
    "value": "Статистика замовлень"
  },
  {
    "id": 913,
    "lang": "en",
    "key": "admin.storage",
    "value": "Storage"
  },
  {
    "id": 914,
    "lang": "ru",
    "key": "admin.storage",
    "value": "Хранилище"
  },
  {
    "id": 915,
    "lang": "uk",
    "key": "admin.storage",
    "value": "Сховище"
  },
  {
    "id": 916,
    "lang": "en",
    "key": "admin.files",
    "value": "files"
  },
  {
    "id": 917,
    "lang": "ru",
    "key": "admin.files",
    "value": "файлов"
  },
  {
    "id": 918,
    "lang": "uk",
    "key": "admin.files",
    "value": "файлів"
  },
  {
    "id": 919,
    "lang": "en",
    "key": "admin.cleanup",
    "value": "Cleanup"
  },
  {
    "id": 920,
    "lang": "ru",
    "key": "admin.cleanup",
    "value": "Очистка"
  },
  {
    "id": 921,
    "lang": "uk",
    "key": "admin.cleanup",
    "value": "Очистка"
  },
  {
    "id": 922,
    "lang": "en",
    "key": "checkout.order_number",
    "value": "Order Number"
  },
  {
    "id": 923,
    "lang": "ru",
    "key": "checkout.order_number",
    "value": "Номер заказа"
  },
  {
    "id": 924,
    "lang": "uk",
    "key": "checkout.order_number",
    "value": "Номер замовлення"
  },
  {
    "id": 925,
    "lang": "en",
    "key": "nav.items",
    "value": "Items"
  },
  {
    "id": 926,
    "lang": "ru",
    "key": "nav.items",
    "value": "Позиции"
  },
  {
    "id": 927,
    "lang": "uk",
    "key": "nav.items",
    "value": "Позиції"
  },
  {
    "id": 928,
    "lang": "en",
    "key": "nav.status",
    "value": "Order Status"
  },
  {
    "id": 929,
    "lang": "ru",
    "key": "nav.status",
    "value": "Статус заказа"
  },
  {
    "id": 930,
    "lang": "uk",
    "key": "nav.status",
    "value": "Статус замовлення"
  },
  {
    "id": 931,
    "lang": "en",
    "key": "settings.integrations",
    "value": "Integrations"
  },
  {
    "id": 932,
    "lang": "ru",
    "key": "settings.integrations",
    "value": "Интеграции"
  },
  {
    "id": 933,
    "lang": "uk",
    "key": "settings.integrations",
    "value": "Інтеграції"
  },
  {
    "id": 934,
    "lang": "en",
    "key": "settings.integrations_desc",
    "value": "External Service Integrations"
  },
  {
    "id": 935,
    "lang": "ru",
    "key": "settings.integrations_desc",
    "value": "Интеграции внешних сервисов"
  },
  {
    "id": 936,
    "lang": "uk",
    "key": "settings.integrations_desc",
    "value": "Інтеграції зовнішніх сервісів"
  },
  {
    "id": 937,
    "lang": "en",
    "key": "settings.np_api_key",
    "value": "Nova Poshta API Key"
  },
  {
    "id": 938,
    "lang": "ru",
    "key": "settings.np_api_key",
    "value": "API ключ Новой Почты"
  },
  {
    "id": 939,
    "lang": "uk",
    "key": "settings.np_api_key",
    "value": "API ключ Нової Пошти"
  },
  {
    "id": 940,
    "lang": "en",
    "key": "status.check_btn",
    "value": "Check Status"
  },
  {
    "id": 941,
    "lang": "ru",
    "key": "status.check_btn",
    "value": "Проверить статус"
  },
  {
    "id": 942,
    "lang": "uk",
    "key": "status.check_btn",
    "value": "Перевірити статус"
  },
  {
    "id": 943,
    "lang": "en",
    "key": "status.desc",
    "value": "Enter your order number"
  },
  {
    "id": 944,
    "lang": "ru",
    "key": "status.desc",
    "value": "Введите номер заказа"
  },
  {
    "id": 945,
    "lang": "uk",
    "key": "status.desc",
    "value": "Введіть номер замовлення"
  },
  {
    "id": 946,
    "lang": "en",
    "key": "status.track",
    "value": "Track Order"
  },
  {
    "id": 947,
    "lang": "ru",
    "key": "status.track",
    "value": "Отследить заказ"
  },
  {
    "id": 948,
    "lang": "uk",
    "key": "status.track",
    "value": "Відстежити замовлення"
  },
  {
    "id": 949,
    "lang": "en",
    "key": "ttn.attention_desc",
    "value": "Please verify all data before creating TTN"
  },
  {
    "id": 950,
    "lang": "ru",
    "key": "ttn.attention_desc",
    "value": "Проверьте все данные перед созданием ТТН"
  },
  {
    "id": 951,
    "lang": "uk",
    "key": "ttn.attention_desc",
    "value": "Перевірте всі дані перед створенням ТТН"
  },
  {
    "id": 952,
    "lang": "en",
    "key": "ttn.attention_title",
    "value": "Attention"
  },
  {
    "id": 953,
    "lang": "ru",
    "key": "ttn.attention_title",
    "value": "Внимание"
  },
  {
    "id": 954,
    "lang": "uk",
    "key": "ttn.attention_title",
    "value": "Увага"
  },
  {
    "id": 955,
    "lang": "en",
    "key": "ttn.cancel_btn",
    "value": "Cancel"
  },
  {
    "id": 956,
    "lang": "ru",
    "key": "ttn.cancel_btn",
    "value": "Отмена"
  },
  {
    "id": 957,
    "lang": "uk",
    "key": "ttn.cancel_btn",
    "value": "Скасувати"
  },
  {
    "id": 958,
    "lang": "en",
    "key": "ttn.create_title",
    "value": "Create TTN"
  },
  {
    "id": 959,
    "lang": "ru",
    "key": "ttn.create_title",
    "value": "Создать ТТН"
  },
  {
    "id": 960,
    "lang": "uk",
    "key": "ttn.create_title",
    "value": "Створити ТТН"
  },
  {
    "id": 961,
    "lang": "en",
    "key": "ttn.generate_btn",
    "value": "Generate"
  },
  {
    "id": 962,
    "lang": "ru",
    "key": "ttn.generate_btn",
    "value": "Сгенерировать"
  },
  {
    "id": 963,
    "lang": "uk",
    "key": "ttn.generate_btn",
    "value": "Згенерувати"
  },
  {
    "id": 964,
    "lang": "en",
    "key": "ttn.loading",
    "value": "Loading..."
  },
  {
    "id": 965,
    "lang": "ru",
    "key": "ttn.loading",
    "value": "Загрузка..."
  },
  {
    "id": 966,
    "lang": "uk",
    "key": "ttn.loading",
    "value": "Завантаження..."
  },
  {
    "id": 967,
    "lang": "en",
    "key": "ttn.p_cost",
    "value": "Declared Value"
  },
  {
    "id": 968,
    "lang": "ru",
    "key": "ttn.p_cost",
    "value": "Объявленная стоимость"
  },
  {
    "id": 969,
    "lang": "uk",
    "key": "ttn.p_cost",
    "value": "Оголошена вартість"
  },
  {
    "id": 970,
    "lang": "en",
    "key": "ttn.p_height",
    "value": "Height (cm)"
  },
  {
    "id": 971,
    "lang": "ru",
    "key": "ttn.p_height",
    "value": "Высота (см)"
  },
  {
    "id": 972,
    "lang": "uk",
    "key": "ttn.p_height",
    "value": "Висота (см)"
  },
  {
    "id": 973,
    "lang": "en",
    "key": "ttn.p_length",
    "value": "Length (cm)"
  },
  {
    "id": 974,
    "lang": "ru",
    "key": "ttn.p_length",
    "value": "Длина (см)"
  },
  {
    "id": 975,
    "lang": "uk",
    "key": "ttn.p_length",
    "value": "Довжина (см)"
  },
  {
    "id": 976,
    "lang": "en",
    "key": "ttn.p_weight",
    "value": "Weight (kg)"
  },
  {
    "id": 977,
    "lang": "ru",
    "key": "ttn.p_weight",
    "value": "Вес (кг)"
  },
  {
    "id": 978,
    "lang": "uk",
    "key": "ttn.p_weight",
    "value": "Вага (кг)"
  },
  {
    "id": 979,
    "lang": "en",
    "key": "ttn.p_width",
    "value": "Width (cm)"
  },
  {
    "id": 980,
    "lang": "ru",
    "key": "ttn.p_width",
    "value": "Ширина (см)"
  },
  {
    "id": 981,
    "lang": "uk",
    "key": "ttn.p_width",
    "value": "Ширина (см)"
  },
  {
    "id": 982,
    "lang": "en",
    "key": "ttn.package_params",
    "value": "Package Parameters"
  },
  {
    "id": 983,
    "lang": "ru",
    "key": "ttn.package_params",
    "value": "Параметры посылки"
  },
  {
    "id": 984,
    "lang": "uk",
    "key": "ttn.package_params",
    "value": "Параметри посилки"
  },
  {
    "id": 985,
    "lang": "en",
    "key": "ttn.payer",
    "value": "Payer"
  },
  {
    "id": 986,
    "lang": "ru",
    "key": "ttn.payer",
    "value": "Плательщик"
  },
  {
    "id": 987,
    "lang": "uk",
    "key": "ttn.payer",
    "value": "Платник"
  },
  {
    "id": 988,
    "lang": "en",
    "key": "ttn.payer_recipient",
    "value": "Recipient pays"
  },
  {
    "id": 989,
    "lang": "ru",
    "key": "ttn.payer_recipient",
    "value": "Получатель"
  },
  {
    "id": 990,
    "lang": "uk",
    "key": "ttn.payer_recipient",
    "value": "Отримувач"
  },
  {
    "id": 991,
    "lang": "en",
    "key": "ttn.payer_sender",
    "value": "Sender pays"
  },
  {
    "id": 992,
    "lang": "ru",
    "key": "ttn.payer_sender",
    "value": "Отправитель"
  },
  {
    "id": 993,
    "lang": "uk",
    "key": "ttn.payer_sender",
    "value": "Відправник"
  },
  {
    "id": 994,
    "lang": "en",
    "key": "ttn.recipient_city",
    "value": "Recipient City"
  },
  {
    "id": 995,
    "lang": "ru",
    "key": "ttn.recipient_city",
    "value": "Город получателя"
  },
  {
    "id": 996,
    "lang": "uk",
    "key": "ttn.recipient_city",
    "value": "Місто отримувача"
  },
  {
    "id": 997,
    "lang": "en",
    "key": "ttn.recipient_firstname",
    "value": "First Name"
  },
  {
    "id": 998,
    "lang": "ru",
    "key": "ttn.recipient_firstname",
    "value": "Имя"
  },
  {
    "id": 999,
    "lang": "uk",
    "key": "ttn.recipient_firstname",
    "value": "Ім'я"
  },
  {
    "id": 1000,
    "lang": "en",
    "key": "ttn.recipient_lastname",
    "value": "Last Name"
  },
  {
    "id": 1001,
    "lang": "ru",
    "key": "ttn.recipient_lastname",
    "value": "Фамилия"
  },
  {
    "id": 1002,
    "lang": "uk",
    "key": "ttn.recipient_lastname",
    "value": "Прізвище"
  },
  {
    "id": 1003,
    "lang": "en",
    "key": "ttn.recipient_phone",
    "value": "Phone"
  },
  {
    "id": 1004,
    "lang": "ru",
    "key": "ttn.recipient_phone",
    "value": "Телефон"
  },
  {
    "id": 1005,
    "lang": "uk",
    "key": "ttn.recipient_phone",
    "value": "Телефон"
  },
  {
    "id": 1006,
    "lang": "en",
    "key": "ttn.recipient_section",
    "value": "Recipient"
  },
  {
    "id": 1007,
    "lang": "ru",
    "key": "ttn.recipient_section",
    "value": "Получатель"
  },
  {
    "id": 1008,
    "lang": "uk",
    "key": "ttn.recipient_section",
    "value": "Отримувач"
  },
  {
    "id": 1009,
    "lang": "en",
    "key": "ttn.search_placeholder",
    "value": "Search..."
  },
  {
    "id": 1010,
    "lang": "ru",
    "key": "ttn.search_placeholder",
    "value": "Поиск..."
  },
  {
    "id": 1011,
    "lang": "uk",
    "key": "ttn.search_placeholder",
    "value": "Пошук..."
  },
  {
    "id": 1012,
    "lang": "en",
    "key": "ttn.sender_delete",
    "value": "Delete"
  },
  {
    "id": 1013,
    "lang": "ru",
    "key": "ttn.sender_delete",
    "value": "Удалить"
  },
  {
    "id": 1014,
    "lang": "uk",
    "key": "ttn.sender_delete",
    "value": "Видалити"
  },
  {
    "id": 1015,
    "lang": "en",
    "key": "ttn.sender_firstname",
    "value": "First Name"
  },
  {
    "id": 1016,
    "lang": "ru",
    "key": "ttn.sender_firstname",
    "value": "Имя"
  },
  {
    "id": 1017,
    "lang": "uk",
    "key": "ttn.sender_firstname",
    "value": "Ім'я"
  },
  {
    "id": 1018,
    "lang": "en",
    "key": "ttn.sender_from",
    "value": "From"
  },
  {
    "id": 1019,
    "lang": "ru",
    "key": "ttn.sender_from",
    "value": "От"
  },
  {
    "id": 1020,
    "lang": "uk",
    "key": "ttn.sender_from",
    "value": "Від"
  },
  {
    "id": 1021,
    "lang": "en",
    "key": "ttn.sender_lastname",
    "value": "Last Name"
  },
  {
    "id": 1022,
    "lang": "ru",
    "key": "ttn.sender_lastname",
    "value": "Фамилия"
  },
  {
    "id": 1023,
    "lang": "uk",
    "key": "ttn.sender_lastname",
    "value": "Прізвище"
  },
  {
    "id": 1024,
    "lang": "en",
    "key": "ttn.sender_phone",
    "value": "Phone"
  },
  {
    "id": 1025,
    "lang": "ru",
    "key": "ttn.sender_phone",
    "value": "Телефон"
  },
  {
    "id": 1026,
    "lang": "uk",
    "key": "ttn.sender_phone",
    "value": "Телефон"
  },
  {
    "id": 1027,
    "lang": "en",
    "key": "ttn.sender_save",
    "value": "Save"
  },
  {
    "id": 1028,
    "lang": "ru",
    "key": "ttn.sender_save",
    "value": "Сохранить"
  },
  {
    "id": 1029,
    "lang": "uk",
    "key": "ttn.sender_save",
    "value": "Зберегти"
  },
  {
    "id": 1030,
    "lang": "en",
    "key": "ttn.sender_section",
    "value": "Sender"
  },
  {
    "id": 1031,
    "lang": "ru",
    "key": "ttn.sender_section",
    "value": "Отправитель"
  },
  {
    "id": 1032,
    "lang": "uk",
    "key": "ttn.sender_section",
    "value": "Відправник"
  },
  {
    "id": 1033,
    "lang": "en",
    "key": "ttn.sender_select",
    "value": "Select Sender"
  },
  {
    "id": 1034,
    "lang": "ru",
    "key": "ttn.sender_select",
    "value": "Выбрать отправителя"
  },
  {
    "id": 1035,
    "lang": "uk",
    "key": "ttn.sender_select",
    "value": "Обрати відправника"
  },
  {
    "id": 1036,
    "lang": "en",
    "key": "ttn.validate_recipient",
    "value": "Validate Recipient"
  },
  {
    "id": 1037,
    "lang": "ru",
    "key": "ttn.validate_recipient",
    "value": "Проверить получателя"
  },
  {
    "id": 1038,
    "lang": "uk",
    "key": "ttn.validate_recipient",
    "value": "Перевірити отримувача"
  },
  {
    "id": 1039,
    "lang": "en",
    "key": "validation.invalid_email",
    "value": "Invalid email"
  },
  {
    "id": 1040,
    "lang": "ru",
    "key": "validation.invalid_email",
    "value": "Неверный email"
  },
  {
    "id": 1041,
    "lang": "uk",
    "key": "validation.invalid_email",
    "value": "Невірний email"
  },
  {
    "id": 1042,
    "lang": "en",
    "key": "Actions",
    "value": "Actions"
  },
  {
    "id": 1043,
    "lang": "ru",
    "key": "Actions",
    "value": "Действия"
  },
  {
    "id": 1044,
    "lang": "uk",
    "key": "Actions",
    "value": "Дії"
  },
  {
    "id": 1045,
    "lang": "en",
    "key": "Description",
    "value": "Description"
  },
  {
    "id": 1046,
    "lang": "ru",
    "key": "Description",
    "value": "Описание"
  },
  {
    "id": 1047,
    "lang": "uk",
    "key": "Description",
    "value": "Опис"
  },
  {
    "id": 1048,
    "lang": "en",
    "key": "Loading",
    "value": "Loading"
  },
  {
    "id": 1049,
    "lang": "ru",
    "key": "Loading",
    "value": "Загрузка"
  },
  {
    "id": 1050,
    "lang": "uk",
    "key": "Loading",
    "value": "Завантаження"
  },
  {
    "id": 1051,
    "lang": "en",
    "key": "Lost File",
    "value": "Lost File"
  },
  {
    "id": 1052,
    "lang": "ru",
    "key": "Lost File",
    "value": "Потерянный файл"
  },
  {
    "id": 1053,
    "lang": "uk",
    "key": "Lost File",
    "value": "Втрачений файл"
  },
  {
    "id": 1054,
    "lang": "en",
    "key": "Magnet",
    "value": "Magnet"
  },
  {
    "id": 1055,
    "lang": "ru",
    "key": "Magnet",
    "value": "Магнит"
  },
  {
    "id": 1056,
    "lang": "uk",
    "key": "Magnet",
    "value": "Магніт"
  },
  {
    "id": 1057,
    "lang": "en",
    "key": "Name",
    "value": "Name"
  },
  {
    "id": 1058,
    "lang": "ru",
    "key": "Name",
    "value": "Имя"
  },
  {
    "id": 1059,
    "lang": "uk",
    "key": "Name",
    "value": "Ім'я"
  },
  {
    "id": 1060,
    "lang": "en",
    "key": "Not available for this size",
    "value": "Not available for this size"
  },
  {
    "id": 1061,
    "lang": "ru",
    "key": "Not available for this size",
    "value": "Недоступно для этого размера"
  },
  {
    "id": 1062,
    "lang": "uk",
    "key": "Not available for this size",
    "value": "Недоступно для цього розміру"
  },
  {
    "id": 1063,
    "lang": "en",
    "key": "Page not found",
    "value": "Page not found"
  },
  {
    "id": 1064,
    "lang": "ru",
    "key": "Page not found",
    "value": "Страница не найдена"
  },
  {
    "id": 1065,
    "lang": "uk",
    "key": "Page not found",
    "value": "Сторінку не знайдено"
  },
  {
    "id": 1066,
    "lang": "en",
    "key": "Print",
    "value": "Print"
  },
  {
    "id": 1067,
    "lang": "ru",
    "key": "Print",
    "value": "Печать"
  },
  {
    "id": 1068,
    "lang": "uk",
    "key": "Print",
    "value": "Друк"
  },
  {
    "id": 1069,
    "lang": "en",
    "key": "Remove",
    "value": "Remove"
  },
  {
    "id": 1070,
    "lang": "ru",
    "key": "Remove",
    "value": "Удалить"
  },
  {
    "id": 1071,
    "lang": "uk",
    "key": "Remove",
    "value": "Видалити"
  },
  {
    "id": 1072,
    "lang": "en",
    "key": "Settings",
    "value": "Settings"
  },
  {
    "id": 1073,
    "lang": "ru",
    "key": "Settings",
    "value": "Настройки"
  },
  {
    "id": 1074,
    "lang": "uk",
    "key": "Settings",
    "value": "Налаштування"
  },
  {
    "id": 1075,
    "lang": "en",
    "key": "Status",
    "value": "Status"
  },
  {
    "id": 1076,
    "lang": "ru",
    "key": "Status",
    "value": "Статус"
  },
  {
    "id": 1077,
    "lang": "uk",
    "key": "Status",
    "value": "Статус"
  },
  {
    "id": 1078,
    "lang": "en",
    "key": "Uploading",
    "value": "Uploading"
  },
  {
    "id": 1079,
    "lang": "ru",
    "key": "Uploading",
    "value": "Загрузка"
  },
  {
    "id": 1080,
    "lang": "uk",
    "key": "Uploading",
    "value": "Завантаження"
  },
  {
    "id": 1081,
    "lang": "en",
    "key": "Wait for uploads",
    "value": "Wait for uploads"
  },
  {
    "id": 1082,
    "lang": "ru",
    "key": "Wait for uploads",
    "value": "Дождитесь загрузки"
  },
  {
    "id": 1083,
    "lang": "uk",
    "key": "Wait for uploads",
    "value": "Дочекайтесь завантаження"
  },
  {
    "id": 1084,
    "lang": "en",
    "key": "What is this?",
    "value": "What is this?"
  },
  {
    "id": 1085,
    "lang": "ru",
    "key": "What is this?",
    "value": "Что это?"
  },
  {
    "id": 1086,
    "lang": "uk",
    "key": "What is this?",
    "value": "Що це?"
  },
  {
    "id": 1087,
    "lang": "uk",
    "key": "hero.best_quality",
    "value": "Найкраща якість друку"
  },
  {
    "id": 1088,
    "lang": "ru",
    "key": "hero.best_quality",
    "value": "Лучшее качество печати"
  },
  {
    "id": 1089,
    "lang": "en",
    "key": "hero.best_quality",
    "value": "Best print quality"
  },
  {
    "id": 1090,
    "lang": "uk",
    "key": "home.what_we_print",
    "value": "Що ми друкуємо"
  },
  {
    "id": 1091,
    "lang": "ru",
    "key": "home.what_we_print",
    "value": "Что мы печатаем"
  },
  {
    "id": 1092,
    "lang": "en",
    "key": "home.what_we_print",
    "value": "What we print"
  },
  {
    "id": 1096,
    "lang": "uk",
    "key": "home.ready_to_print",
    "value": "Готові надрукувати спогади?"
  },
  {
    "id": 1097,
    "lang": "ru",
    "key": "home.ready_to_print",
    "value": "Готовы напечатать воспоминания?"
  },
  {
    "id": 1098,
    "lang": "en",
    "key": "home.ready_to_print",
    "value": "Ready to print memories?"
  },
  {
    "id": 1099,
    "lang": "uk",
    "key": "home.upload_discount",
    "value": "Завантаження займе всього хвилину. Отримайте 5% знижку на перше замовлення."
  },
  {
    "id": 1100,
    "lang": "ru",
    "key": "home.upload_discount",
    "value": "Загрузка займет всего минуту. Получите скидку 5% на первый заказ."
  },
  {
    "id": 1101,
    "lang": "en",
    "key": "home.upload_discount",
    "value": "Upload takes just a minute. Get a 5% discount on your first order."
  },
  {
    "id": 1102,
    "lang": "uk",
    "key": "format.classic",
    "value": "Класичний формат"
  },
  {
    "id": 1103,
    "lang": "ru",
    "key": "format.classic",
    "value": "Классический формат"
  },
  {
    "id": 1104,
    "lang": "en",
    "key": "format.classic",
    "value": "Classic Format"
  },
  {
    "id": 1105,
    "lang": "uk",
    "key": "format.magnet",
    "value": "Магніти на холодильник"
  },
  {
    "id": 1106,
    "lang": "ru",
    "key": "format.magnet",
    "value": "Магниты на холодильник"
  },
  {
    "id": 1107,
    "lang": "en",
    "key": "format.magnet",
    "value": "Fridge Magnets"
  },
  {
    "id": 1108,
    "lang": "uk",
    "key": "format.a5",
    "value": "Формат А5"
  },
  {
    "id": 1109,
    "lang": "ru",
    "key": "format.a5",
    "value": "Формат А5"
  },
  {
    "id": 1110,
    "lang": "en",
    "key": "format.a5",
    "value": "A5 Format"
  },
  {
    "id": 1111,
    "lang": "uk",
    "key": "format.a4",
    "value": "Формат А4"
  },
  {
    "id": 1112,
    "lang": "ru",
    "key": "format.a4",
    "value": "Формат А4"
  },
  {
    "id": 1113,
    "lang": "en",
    "key": "format.a4",
    "value": "A4 Format"
  },
  {
    "id": 1114,
    "lang": "uk",
    "key": "hero.description",
    "value": "Професійний фотодрук онлайн. Завантажуйте фото з телефону чи комп'ютера, обирайте формат та отримуйте готові знімки вже сьогодні."
  },
  {
    "id": 1115,
    "lang": "ru",
    "key": "hero.description",
    "value": "Профессиональная фотопечать онлайн. Загружайте фото с телефона или компьютера, выбирайте формат и получайте готовые снимки уже сегодня."
  },
  {
    "id": 1116,
    "lang": "en",
    "key": "hero.description",
    "value": "Professional photo printing online. Upload photos from your phone or computer, choose format and get prints today."
  },
  {
    "id": 1117,
    "lang": "uk",
    "key": "benefits.delivery.desc",
    "value": "Виробництво починається відразу після завантаження. Доставка по всій Україні."
  },
  {
    "id": 1118,
    "lang": "uk",
    "key": "benefits.delivery.title",
    "value": "Швидка Доставка"
  },
  {
    "id": 1119,
    "lang": "uk",
    "key": "benefits.discounts.desc",
    "value": "Замовляйте більше, платіть менше. Знижки застосовуються автоматично в кошику."
  },
  {
    "id": 1120,
    "lang": "uk",
    "key": "benefits.discounts.title",
    "value": "Авто Знижки"
  },
  {
    "id": 1121,
    "lang": "uk",
    "key": "benefits.quality.desc",
    "value": "Оригінальний папір Fuji Crystal Archive для яскравих кольорів та чітких деталей."
  },
  {
    "id": 1122,
    "lang": "uk",
    "key": "benefits.quality.title",
    "value": "Преміум Якість"
  },
  {
    "id": 1123,
    "lang": "ru",
    "key": "benefits.delivery.desc",
    "value": "Производство начинается сразу после загрузки. Доставка по всей Украине."
  },
  {
    "id": 1124,
    "lang": "ru",
    "key": "benefits.delivery.title",
    "value": "Быстрая Доставка"
  },
  {
    "id": 1125,
    "lang": "ru",
    "key": "benefits.discounts.desc",
    "value": "Заказывайте больше, платите меньше. Скидки применяются автоматически в корзине."
  },
  {
    "id": 1126,
    "lang": "ru",
    "key": "benefits.discounts.title",
    "value": "Авто Скидки"
  },
  {
    "id": 1127,
    "lang": "ru",
    "key": "benefits.quality.desc",
    "value": "Оригинальная бумага Fuji Crystal Archive для ярких цветов и четких деталей."
  },
  {
    "id": 1128,
    "lang": "ru",
    "key": "benefits.quality.title",
    "value": "Премиум Качество"
  },
  {
    "id": 1129,
    "lang": "uk",
    "key": "checkout.back",
    "value": "Назад до завантаження"
  },
  {
    "id": 1130,
    "lang": "uk",
    "key": "checkout.email",
    "value": "Email (необов'язково)"
  },
  {
    "id": 1131,
    "lang": "uk",
    "key": "checkout.empty",
    "value": "Ваш кошик порожній."
  },
  {
    "id": 1132,
    "lang": "uk",
    "key": "checkout.fullname_hint",
    "value": "Для Нової Пошти вкажіть ім'я та прізвище"
  },
  {
    "id": 1133,
    "lang": "uk",
    "key": "checkout.phone_error",
    "value": "Будь ласка, введіть коректний номер телефону (мінімум 10 цифр)"
  },
  {
    "id": 1134,
    "lang": "uk",
    "key": "checkout.return_home",
    "value": "На головну"
  },
  {
    "id": 1135,
    "lang": "uk",
    "key": "checkout.total",
    "value": "Всього"
  },
  {
    "id": 1136,
    "lang": "ru",
    "key": "checkout.back",
    "value": "Назад к загрузке"
  },
  {
    "id": 1137,
    "lang": "ru",
    "key": "checkout.email",
    "value": "Email (необязательно)"
  },
  {
    "id": 1138,
    "lang": "ru",
    "key": "checkout.empty",
    "value": "Ваша корзина пуста."
  },
  {
    "id": 1139,
    "lang": "ru",
    "key": "checkout.fullname_hint",
    "value": "Для Новой Почты укажите имя и фамилию"
  },
  {
    "id": 1140,
    "lang": "ru",
    "key": "checkout.phone_error",
    "value": "Пожалуйста, введите корректный номер телефона (минимум 10 цифр)"
  },
  {
    "id": 1141,
    "lang": "ru",
    "key": "checkout.return_home",
    "value": "На главную"
  },
  {
    "id": 1142,
    "lang": "ru",
    "key": "checkout.total",
    "value": "Всего"
  },
  {
    "id": 1160,
    "lang": "uk",
    "key": "home.seo.title",
    "value": "Послуги цифрового фотодруку через інтернет у м. Дніпро"
  },
  {
    "id": 1161,
    "lang": "uk",
    "key": "home.seo.intro",
    "value": "Як ви думаєте, для чого потрібні фотографії? Фотографії потрібні для того, щоб зафіксувати унікальні моменти життя, які, можливо, ніколи не повторяться!"
  },
  {
    "id": 1162,
    "lang": "uk",
    "key": "home.seo.offer",
    "value": "Саме це і пропонує своїм клієнтам служба друку фотографій онлайн «FUJI-Світ» — друк фотографій у Дніпрі. Ви скажете, що друк фото у Дніпрі пропонують багато хто, і, звісно ж, маєте рацію! Але відчути себе на крок попереду всіх, скориставшись послугою друку фотографій через інтернет у Дніпрі, допоможемо вам саме ми!"
  },
  {
    "id": 1163,
    "lang": "uk",
    "key": "home.seo.services_title",
    "value": "У нас ви можете замовити ряд дизайнерських послуг таких як:"
  },
  {
    "id": 1164,
    "lang": "uk",
    "key": "home.seo.service_scanning",
    "value": "сканування фотографій та плівок"
  },
  {
    "id": 1165,
    "lang": "uk",
    "key": "home.seo.service_restoration",
    "value": "реставрація та комп'ютерна обробка фотографій"
  },
  {
    "id": 1166,
    "lang": "uk",
    "key": "home.seo.service_redeye",
    "value": "усунення ефекту червоних очей"
  },
  {
    "id": 1167,
    "lang": "uk",
    "key": "home.seo.service_collage",
    "value": "розробка різноманітних макетів та колажів"
  },
  {
    "id": 1168,
    "lang": "uk",
    "key": "home.seo.service_docs",
    "value": "а також зробити фотографію на документи"
  },
  {
    "id": 1169,
    "lang": "uk",
    "key": "home.seo.service_film",
    "value": "продаж фотоплівки та проявка плівок"
  },
  {
    "id": 1170,
    "lang": "uk",
    "key": "home.seo.service_frames",
    "value": "продаж фоторамок різних розмірів"
  },
  {
    "id": 1171,
    "lang": "uk",
    "key": "home.seo.slogan",
    "value": "Наш сервіс для тих людей, хто цінує свій час та гроші!"
  },
  {
    "id": 1172,
    "lang": "ru",
    "key": "home.seo.title",
    "value": "Услуги цифровой фотопечати через интернет в г. Днепр"
  },
  {
    "id": 1173,
    "lang": "ru",
    "key": "home.seo.intro",
    "value": "Как вы думаете, для чего нужны фотографии? Фотографии нужны для того, чтобы запечатлеть уникальные моменты жизни, которые, возможно, никогда не повторятся!"
  },
  {
    "id": 1174,
    "lang": "ru",
    "key": "home.seo.offer",
    "value": "Именно это и предлагает своим клиентам служба печати фотографий онлайн «FUJI-Світ» — печать фотографий в Днепре. Вы скажете, что печать фото в Днепре предлагают многие, и, конечно же, будете правы! Но почувствовать себя на шаг впереди всех, воспользовавшись услугой печати фотографий через интернет в Днепре, поможем вам именно мы!"
  },
  {
    "id": 1175,
    "lang": "ru",
    "key": "home.seo.services_title",
    "value": "У нас вы можете заказать ряд дизайнерских услуг, таких как:"
  },
  {
    "id": 1176,
    "lang": "ru",
    "key": "home.seo.service_scanning",
    "value": "сканирование фотографий и пленок"
  },
  {
    "id": 1177,
    "lang": "ru",
    "key": "home.seo.service_restoration",
    "value": "реставрация и компьютерная обработка фотографий"
  },
  {
    "id": 1178,
    "lang": "ru",
    "key": "home.seo.service_redeye",
    "value": "устранение эффекта красных глаз"
  },
  {
    "id": 1179,
    "lang": "ru",
    "key": "home.seo.service_collage",
    "value": "разработка разнообразных макетов и коллажей"
  },
  {
    "id": 1180,
    "lang": "ru",
    "key": "home.seo.service_docs",
    "value": "а также сделать фотографию на документы"
  },
  {
    "id": 1181,
    "lang": "ru",
    "key": "home.seo.service_film",
    "value": "продажа фотопленки и проявка пленок"
  },
  {
    "id": 1182,
    "lang": "ru",
    "key": "home.seo.service_frames",
    "value": "продажа фоторамок разных размеров"
  },
  {
    "id": 1183,
    "lang": "ru",
    "key": "home.seo.slogan",
    "value": "Наш сервис для тех людей, кто ценит свое время и деньги!"
  },
  {
    "id": 1184,
    "lang": "en",
    "key": "home.seo.title",
    "value": "Digital photo printing services via the Internet in Dnipro"
  },
  {
    "id": 1185,
    "lang": "en",
    "key": "home.seo.intro",
    "value": "What do you think photographs are for? Photographs are needed to capture unique moments in life that may never happen again!"
  },
  {
    "id": 1186,
    "lang": "en",
    "key": "home.seo.offer",
    "value": "This is exactly what the online photo printing service «FUJI-Svit» offers — photo printing in Dnipro. You might say that many offer photo printing in Dnipro, and, of course, you would be right! But we are the ones who will help you feel a step ahead of everyone else by taking advantage of the online photo printing service in Dnipro!"
  },
  {
    "id": 1187,
    "lang": "en",
    "key": "home.seo.services_title",
    "value": "Here you can order a range of design services such as:"
  },
  {
    "id": 1188,
    "lang": "en",
    "key": "home.seo.service_scanning",
    "value": "scanning photos and films"
  },
  {
    "id": 1189,
    "lang": "en",
    "key": "home.seo.service_restoration",
    "value": "restoration and computer processing of photos"
  },
  {
    "id": 1190,
    "lang": "en",
    "key": "home.seo.service_redeye",
    "value": "red-eye removal"
  },
  {
    "id": 1191,
    "lang": "en",
    "key": "home.seo.service_collage",
    "value": "development of various layouts and collages"
  },
  {
    "id": 1192,
    "lang": "en",
    "key": "home.seo.service_docs",
    "value": "as well as take a photo for documents"
  },
  {
    "id": 1193,
    "lang": "en",
    "key": "home.seo.service_film",
    "value": "sale of photographic film and film development"
  },
  {
    "id": 1194,
    "lang": "en",
    "key": "home.seo.service_frames",
    "value": "sale of photo frames of various sizes"
  },
  {
    "id": 1195,
    "lang": "en",
    "key": "home.seo.slogan",
    "value": "Our service is for those who value their time and money!"
  },
  {
    "id": 1196,
    "lang": "en",
    "key": "benefits.delivery.desc",
    "value": "Production starts immediately after upload. Delivery throughout Ukraine."
  },
  {
    "id": 1197,
    "lang": "en",
    "key": "benefits.delivery.title",
    "value": "Fast Delivery"
  },
  {
    "id": 1198,
    "lang": "en",
    "key": "benefits.discounts.desc",
    "value": "Order more, pay less. Discounts are applied automatically in the cart."
  },
  {
    "id": 1199,
    "lang": "en",
    "key": "benefits.discounts.title",
    "value": "Auto Discounts"
  },
  {
    "id": 1200,
    "lang": "en",
    "key": "benefits.quality.desc",
    "value": "Original Fuji Crystal Archive paper for bright colors and clear details."
  },
  {
    "id": 1201,
    "lang": "en",
    "key": "benefits.quality.title",
    "value": "Premium Quality"
  },
  {
    "id": 1202,
    "lang": "uk",
    "key": "home.formats_desc",
    "value": "Оберіть формат, який підходить саме вам. Від класичних фотокарток до магнітів."
  },
  {
    "id": 1203,
    "lang": "ru",
    "key": "home.formats_desc",
    "value": "Выберите формат, который подходит именно вам. От классических фото до магнитов."
  },
  {
    "id": 1204,
    "lang": "en",
    "key": "home.formats_desc",
    "value": "Choose the format that suits you best. From classic photos to magnets."
  },
  {
    "id": 1205,
    "lang": "uk",
    "key": "home.cta_desc",
    "value": "Завантажуйте фото просто зараз і зберігайте спогади!"
  },
  {
    "id": 1206,
    "lang": "ru",
    "key": "home.cta_desc",
    "value": "Загружайте фото прямо сейчас и сохраняйте воспоминания!"
  },
  {
    "id": 1207,
    "lang": "en",
    "key": "home.cta_desc",
    "value": "Upload photos right now and preserve your memories!"
  },
  {
    "id": 1208,
    "lang": "uk",
    "key": "upload.show_more",
    "value": "Показати ще"
  },
  {
    "id": 1209,
    "lang": "ru",
    "key": "upload.show_more",
    "value": "Показать ещё"
  },
  {
    "id": 1210,
    "lang": "en",
    "key": "upload.show_more",
    "value": "Show more"
  },
  {
    "id": 1211,
    "lang": "uk",
    "key": "upload.photos",
    "value": "фото"
  },
  {
    "id": 1212,
    "lang": "ru",
    "key": "upload.photos",
    "value": "фото"
  },
  {
    "id": 1213,
    "lang": "en",
    "key": "upload.photos",
    "value": "photos"
  },
  {
    "id": 1214,
    "lang": "uk",
    "key": "upload.shown",
    "value": "Показано"
  },
  {
    "id": 1215,
    "lang": "ru",
    "key": "upload.shown",
    "value": "Показано"
  },
  {
    "id": 1216,
    "lang": "en",
    "key": "upload.shown",
    "value": "Shown"
  },
  {
    "id": 1217,
    "lang": "uk",
    "key": "upload.of",
    "value": "з"
  },
  {
    "id": 1218,
    "lang": "ru",
    "key": "upload.of",
    "value": "из"
  },
  {
    "id": 1219,
    "lang": "en",
    "key": "upload.of",
    "value": "of"
  },
  {
    "id": 1220,
    "lang": "uk",
    "key": "admin.photo_sizes",
    "value": "Розміри фото"
  },
  {
    "id": 1221,
    "lang": "ru",
    "key": "admin.photo_sizes",
    "value": "Размеры фото"
  },
  {
    "id": 1222,
    "lang": "en",
    "key": "admin.photo_sizes",
    "value": "Photo Sizes"
  },
  {
    "id": 1223,
    "lang": "uk",
    "key": "admin.paper_type",
    "value": "Тип паперу"
  },
  {
    "id": 1224,
    "lang": "ru",
    "key": "admin.paper_type",
    "value": "Тип бумаги"
  },
  {
    "id": 1225,
    "lang": "en",
    "key": "admin.paper_type",
    "value": "Paper Type"
  },
  {
    "id": 1226,
    "lang": "uk",
    "key": "admin.options_title",
    "value": "Опції"
  },
  {
    "id": 1227,
    "lang": "ru",
    "key": "admin.options_title",
    "value": "Опции"
  },
  {
    "id": 1228,
    "lang": "en",
    "key": "admin.options_title",
    "value": "Options"
  },
  {
    "id": 1229,
    "lang": "uk",
    "key": "admin.final",
    "value": "Фінал"
  },
  {
    "id": 1230,
    "lang": "ru",
    "key": "admin.final",
    "value": "Итого"
  },
  {
    "id": 1231,
    "lang": "en",
    "key": "admin.final",
    "value": "Final"
  },
  {
    "id": 1232,
    "lang": "uk",
    "key": "admin.total_photos",
    "value": "Всього фото"
  },
  {
    "id": 1233,
    "lang": "ru",
    "key": "admin.total_photos",
    "value": "Всего фото"
  },
  {
    "id": 1234,
    "lang": "en",
    "key": "admin.total_photos",
    "value": "Total photos"
  },
  {
    "id": 1235,
    "lang": "uk",
    "key": "admin.file",
    "value": "Файл"
  },
  {
    "id": 1236,
    "lang": "ru",
    "key": "admin.file",
    "value": "Файл"
  },
  {
    "id": 1237,
    "lang": "en",
    "key": "admin.file",
    "value": "File"
  },
  {
    "id": 1238,
    "lang": "uk",
    "key": "admin.parameters",
    "value": "Параметри"
  },
  {
    "id": 1239,
    "lang": "ru",
    "key": "admin.parameters",
    "value": "Параметры"
  },
  {
    "id": 1240,
    "lang": "en",
    "key": "admin.parameters",
    "value": "Parameters"
  },
  {
    "id": 1241,
    "lang": "uk",
    "key": "admin.copies",
    "value": "Тираж"
  },
  {
    "id": 1242,
    "lang": "ru",
    "key": "admin.copies",
    "value": "Тираж"
  },
  {
    "id": 1243,
    "lang": "en",
    "key": "admin.copies",
    "value": "Copies"
  },
  {
    "id": 1244,
    "lang": "uk",
    "key": "admin.download_jpg",
    "value": "Завантажити JPG"
  },
  {
    "id": 1245,
    "lang": "ru",
    "key": "admin.download_jpg",
    "value": "Скачать JPG"
  },
  {
    "id": 1246,
    "lang": "en",
    "key": "admin.download_jpg",
    "value": "Download JPG"
  },
  {
    "id": 1307,
    "lang": "uk",
    "key": "admin.confirm_delete_ttn",
    "value": "Ви дійсно хочете видалити ТТН у системі Нової Пошти?"
  },
  {
    "id": 1308,
    "lang": "ru",
    "key": "admin.confirm_delete_ttn",
    "value": "Вы действительно хотите удалить ТТН в системе Новой Почты?"
  },
  {
    "id": 1309,
    "lang": "en",
    "key": "admin.confirm_delete_ttn",
    "value": "Are you sure you want to delete this TTN from Nova Poshta?"
  },
  {
    "id": 1310,
    "lang": "uk",
    "key": "ttn.confirm_delete_sender",
    "value": "Видалити ці дані відправника?"
  },
  {
    "id": 1311,
    "lang": "ru",
    "key": "ttn.confirm_delete_sender",
    "value": "Удалить эти данные отправителя?"
  },
  {
    "id": 1312,
    "lang": "en",
    "key": "ttn.confirm_delete_sender",
    "value": "Delete this sender data?"
  },
  {
    "id": 1313,
    "lang": "uk",
    "key": "ttn.success",
    "value": "ТТН успішно створено!"
  },
  {
    "id": 1314,
    "lang": "ru",
    "key": "ttn.success",
    "value": "ТТН успешно создана!"
  },
  {
    "id": 1315,
    "lang": "en",
    "key": "ttn.success",
    "value": "TTN created successfully!"
  },
  {
    "id": 1316,
    "lang": "uk",
    "key": "ttn.error",
    "value": "Помилка"
  },
  {
    "id": 1317,
    "lang": "ru",
    "key": "ttn.error",
    "value": "Ошибка"
  },
  {
    "id": 1318,
    "lang": "en",
    "key": "ttn.error",
    "value": "Error"
  },
  {
    "id": 1319,
    "lang": "uk",
    "key": "ttn.generation_error",
    "value": "Сталася помилка при генерації ТТН"
  },
  {
    "id": 1320,
    "lang": "ru",
    "key": "ttn.generation_error",
    "value": "Произошла ошибка при генерации ТТН"
  },
  {
    "id": 1321,
    "lang": "en",
    "key": "ttn.generation_error",
    "value": "Error generating TTN"
  },
  {
    "id": 1322,
    "lang": "uk",
    "key": "ttn.no_recipients_found",
    "value": "За цим номером отримувачів не знайдено."
  },
  {
    "id": 1323,
    "lang": "ru",
    "key": "ttn.no_recipients_found",
    "value": "По этому номеру получателей не найдено."
  },
  {
    "id": 1324,
    "lang": "en",
    "key": "ttn.no_recipients_found",
    "value": "No recipients found for this number."
  },
  {
    "id": 1325,
    "lang": "uk",
    "key": "ttn.search_error",
    "value": "Помилка пошуку"
  },
  {
    "id": 1326,
    "lang": "ru",
    "key": "ttn.search_error",
    "value": "Ошибка поиска"
  },
  {
    "id": 1327,
    "lang": "en",
    "key": "ttn.search_error",
    "value": "Search error"
  },
  {
    "id": 1328,
    "lang": "uk",
    "key": "ttn.fill_sender_data",
    "value": "Будь ласка, заповніть всі дані відправника"
  },
  {
    "id": 1329,
    "lang": "ru",
    "key": "ttn.fill_sender_data",
    "value": "Пожалуйста, заполните все данные отправителя"
  },
  {
    "id": 1330,
    "lang": "en",
    "key": "ttn.fill_sender_data",
    "value": "Please fill in all sender data"
  },
  {
    "id": 1331,
    "lang": "uk",
    "key": "ttn.found",
    "value": "Знайдено"
  },
  {
    "id": 1332,
    "lang": "ru",
    "key": "ttn.found",
    "value": "Найдено"
  },
  {
    "id": 1333,
    "lang": "en",
    "key": "ttn.found",
    "value": "Found"
  },
  {
    "id": 1334,
    "lang": "uk",
    "key": "ttn.persons",
    "value": "ос."
  },
  {
    "id": 1335,
    "lang": "ru",
    "key": "ttn.persons",
    "value": "чел."
  },
  {
    "id": 1336,
    "lang": "en",
    "key": "ttn.persons",
    "value": "person(s)"
  },
  {
    "id": 1337,
    "lang": "uk",
    "key": "ttn.close",
    "value": "Закрити"
  },
  {
    "id": 1338,
    "lang": "ru",
    "key": "ttn.close",
    "value": "Закрыть"
  },
  {
    "id": 1339,
    "lang": "en",
    "key": "ttn.close",
    "value": "Close"
  },
  {
    "id": 1340,
    "lang": "uk",
    "key": "ttn.select",
    "value": "Вибрати"
  },
  {
    "id": 1341,
    "lang": "ru",
    "key": "ttn.select",
    "value": "Выбрать"
  },
  {
    "id": 1342,
    "lang": "en",
    "key": "ttn.select",
    "value": "Select"
  },
  {
    "id": 1343,
    "lang": "uk",
    "key": "gift.make_choice",
    "value": "Будь ласка, зробіть вибір"
  },
  {
    "id": 1344,
    "lang": "ru",
    "key": "gift.make_choice",
    "value": "Пожалуйста, сделайте выбор"
  },
  {
    "id": 1345,
    "lang": "en",
    "key": "gift.make_choice",
    "value": "Please make a choice"
  },
  {
    "id": 1346,
    "lang": "ru",
    "key": "order.note_delivery_prefix",
    "value": "🚚 Доставка: "
  },
  {
    "id": 1347,
    "lang": "uk",
    "key": "order.note_delivery_prefix",
    "value": "🚚 Доставка: "
  },
  {
    "id": 1348,
    "lang": "en",
    "key": "order.note_delivery_prefix",
    "value": "🚚 Delivery: "
  },
  {
    "id": 1349,
    "lang": "ru",
    "key": "order.note_free_bonus",
    "value": "(БЕСПЛАТНО ЗА БОНУС)"
  },
  {
    "id": 1350,
    "lang": "uk",
    "key": "order.note_free_bonus",
    "value": "(БЕЗКОШТОВНО ЗА БОНУС)"
  },
  {
    "id": 1351,
    "lang": "en",
    "key": "order.note_free_bonus",
    "value": "(FREE WITH BONUS)"
  },
  {
    "id": 1352,
    "lang": "ru",
    "key": "order.note_gift_prefix",
    "value": "🎁 ПОДАРОК: "
  },
  {
    "id": 1353,
    "lang": "uk",
    "key": "order.note_gift_prefix",
    "value": "🎁 ПОДАРУНОК: "
  },
  {
    "id": 1354,
    "lang": "en",
    "key": "order.note_gift_prefix",
    "value": "🎁 GIFT: "
  },
  {
    "id": 1355,
    "lang": "ru",
    "key": "order.note_free_delivery",
    "value": "БЕСПЛАТНАЯ ДОСТАВКА"
  },
  {
    "id": 1356,
    "lang": "uk",
    "key": "order.note_free_delivery",
    "value": "БЕЗКОШТОВНА ДОСТАВКА"
  },
  {
    "id": 1357,
    "lang": "en",
    "key": "order.note_free_delivery",
    "value": "FREE DELIVERY"
  },
  {
    "id": 1358,
    "lang": "ru",
    "key": "order.note_free_magnet",
    "value": "БЕСПЛАТНЫЙ МАГНИТ 10x15"
  },
  {
    "id": 1359,
    "lang": "uk",
    "key": "order.note_free_magnet",
    "value": "БЕЗКОШТОВНИЙ МАГНІТ 10x15"
  },
  {
    "id": 1360,
    "lang": "en",
    "key": "order.note_free_magnet",
    "value": "FREE MAGNET 10x15"
  },
  {
    "id": 1361,
    "lang": "ru",
    "key": "order.note_new_photo",
    "value": "📷 Новое фото (загружено): "
  },
  {
    "id": 1362,
    "lang": "uk",
    "key": "order.note_new_photo",
    "value": "📷 Нове фото (завантажено): "
  },
  {
    "id": 1363,
    "lang": "en",
    "key": "order.note_new_photo",
    "value": "📷 New photo (uploaded): "
  },
  {
    "id": 1364,
    "lang": "ru",
    "key": "order.note_existing_photo",
    "value": "📷 Фото из заказа: "
  },
  {
    "id": 1365,
    "lang": "uk",
    "key": "order.note_existing_photo",
    "value": "📷 Фото з замовлення: "
  },
  {
    "id": 1366,
    "lang": "en",
    "key": "order.note_existing_photo",
    "value": "📷 Photo from order: "
  },
  {
    "id": 1367,
    "lang": "ru",
    "key": "order.note_client_comment",
    "value": "💬 Комментарий клиента: "
  },
  {
    "id": 1368,
    "lang": "uk",
    "key": "order.note_client_comment",
    "value": "💬 Коментар клієнта: "
  },
  {
    "id": 1369,
    "lang": "en",
    "key": "order.note_client_comment",
    "value": "💬 Client comment: "
  },
  {
    "id": 1370,
    "lang": "ru",
    "key": "settings.np_validate",
    "value": "Проверить ключ"
  },
  {
    "id": 1371,
    "lang": "uk",
    "key": "settings.np_validate",
    "value": "Перевірити ключ"
  },
  {
    "id": 1372,
    "lang": "en",
    "key": "settings.np_validate",
    "value": "Validate Key"
  },
  {
    "id": 1373,
    "lang": "ru",
    "key": "settings.np_valid",
    "value": "Ключ действителен"
  },
  {
    "id": 1374,
    "lang": "uk",
    "key": "settings.np_valid",
    "value": "Ключ дійсний"
  },
  {
    "id": 1375,
    "lang": "en",
    "key": "settings.np_valid",
    "value": "Key is valid"
  },
  {
    "id": 1376,
    "lang": "ru",
    "key": "settings.np_invalid",
    "value": "Неверный ключ"
  },
  {
    "id": 1377,
    "lang": "uk",
    "key": "settings.np_invalid",
    "value": "Невірний ключ"
  },
  {
    "id": 1378,
    "lang": "en",
    "key": "settings.np_invalid",
    "value": "Invalid key"
  },
  {
    "id": 1379,
    "lang": "ru",
    "key": "settings.np_check_error",
    "value": "Ошибка проверки"
  },
  {
    "id": 1380,
    "lang": "uk",
    "key": "settings.np_check_error",
    "value": "Помилка перевірки"
  },
  {
    "id": 1381,
    "lang": "en",
    "key": "settings.np_check_error",
    "value": "Validation error"
  },
  {
    "id": 1382,
    "lang": "ru",
    "key": "ttn.key_error_title",
    "value": "Ошибка ключа API"
  },
  {
    "id": 1383,
    "lang": "uk",
    "key": "ttn.key_error_title",
    "value": "Помилка ключа API"
  },
  {
    "id": 1384,
    "lang": "en",
    "key": "ttn.key_error_title",
    "value": "API Key Error"
  },
  {
    "id": 1385,
    "lang": "ru",
    "key": "ttn.key_error_msg",
    "value": "Введите действующий ключ в настройках"
  },
  {
    "id": 1386,
    "lang": "uk",
    "key": "ttn.key_error_msg",
    "value": "Введіть діючий ключ в налаштуваннях"
  },
  {
    "id": 1387,
    "lang": "en",
    "key": "ttn.key_error_msg",
    "value": "Enter a valid key in settings"
  },
  {
    "id": 1388,
    "lang": "ru",
    "key": "ttn.goto_settings",
    "value": "Перейти в настройки"
  },
  {
    "id": 1389,
    "lang": "uk",
    "key": "ttn.goto_settings",
    "value": "Перейти в налаштування"
  },
  {
    "id": 1390,
    "lang": "en",
    "key": "ttn.goto_settings",
    "value": "Go to Settings"
  },
  {
    "id": 1391,
    "lang": "ru",
    "key": "admin.ttn_deleted",
    "value": "ТТН удалена"
  },
  {
    "id": 1392,
    "lang": "uk",
    "key": "admin.ttn_deleted",
    "value": "ТТН видалено"
  },
  {
    "id": 1393,
    "lang": "en",
    "key": "admin.ttn_deleted",
    "value": "TTN deleted"
  },
  {
    "id": 1394,
    "lang": "ru",
    "key": "admin.confirm_delete_order",
    "value": "Вы уверены, что хотите удалить этот заказ? Это действие необратимо."
  },
  {
    "id": 1395,
    "lang": "uk",
    "key": "admin.confirm_delete_order",
    "value": "Ви впевнені, що хочете видалити це замовлення? Ця дія незворотна."
  },
  {
    "id": 1396,
    "lang": "en",
    "key": "admin.confirm_delete_order",
    "value": "Are you sure you want to delete this order? This action cannot be undone."
  },
  {
    "id": 1397,
    "lang": "ru",
    "key": "admin.view_btn",
    "value": "Просмотр"
  },
  {
    "id": 1398,
    "lang": "uk",
    "key": "admin.view_btn",
    "value": "Перегляд"
  },
  {
    "id": 1399,
    "lang": "en",
    "key": "admin.view_btn",
    "value": "View"
  },
  {
    "id": 1400,
    "lang": "ru",
    "key": "admin.cleanup_safe",
    "value": "Soft Clean (Безопасная)"
  },
  {
    "id": 1401,
    "lang": "uk",
    "key": "admin.cleanup_safe",
    "value": "Soft Clean (Безпечна)"
  },
  {
    "id": 1402,
    "lang": "en",
    "key": "admin.cleanup_safe",
    "value": "Soft Clean (Safe)"
  },
  {
    "id": 1403,
    "lang": "ru",
    "key": "admin.cleanup_safe_desc",
    "value": "Удаляет временные файлы >1ч и потерянные >24ч. Безопасно для активных пользователей."
  },
  {
    "id": 1404,
    "lang": "uk",
    "key": "admin.cleanup_safe_desc",
    "value": "Видаляє тимчасові файли >1г та загублені >24г. Безпечно для активних користувачів."
  },
  {
    "id": 1405,
    "lang": "en",
    "key": "admin.cleanup_safe_desc",
    "value": "Removes temp files >1h and orphans >24h. Safe for active users."
  },
  {
    "id": 1406,
    "lang": "ru",
    "key": "admin.cleanup_full",
    "value": "Full Clean (Полная)"
  },
  {
    "id": 1407,
    "lang": "uk",
    "key": "admin.cleanup_full",
    "value": "Full Clean (Повна)"
  },
  {
    "id": 1408,
    "lang": "en",
    "key": "admin.cleanup_full",
    "value": "Full Clean (Deep)"
  },
  {
    "id": 1409,
    "lang": "ru",
    "key": "admin.cleanup_full_confirm",
    "value": "ВНИМАНИЕ! Это удалит все временные файлы и очистит незавершенные заказы. Активные загрузки могут быть потеряны. Вы уверены?"
  },
  {
    "id": 1410,
    "lang": "uk",
    "key": "admin.cleanup_full_confirm",
    "value": "УВАГА! Це видалить всі тимчасові файли та очистить незавершені замовлення. Активні завантаження можуть бути втрачені. Ви впевнені?"
  },
  {
    "id": 1411,
    "lang": "en",
    "key": "admin.cleanup_full_confirm",
    "value": "WARNING! This will delete all temp files and pending orders. Active uploads may be lost. Are you sure?"
  },
  {
    "id": 1412,
    "lang": "ru",
    "key": "admin.full_cleaned",
    "value": "Полная очистка завершена!"
  },
  {
    "id": 1413,
    "lang": "uk",
    "key": "admin.full_cleaned",
    "value": "Повна очистка завершена!"
  },
  {
    "id": 1414,
    "lang": "en",
    "key": "admin.full_cleaned",
    "value": "Full cleaning completed!"
  },
  {
    "id": 1415,
    "lang": "ru",
    "key": "admin.cleanup_desc",
    "value": "Выберите режим очистки"
  },
  {
    "id": 1416,
    "lang": "uk",
    "key": "admin.cleanup_desc",
    "value": "Виберіть режим очистки"
  },
  {
    "id": 1417,
    "lang": "en",
    "key": "admin.cleanup_desc",
    "value": "Choose cleanup mode"
  },
  {
    "id": 1418,
    "lang": "ru",
    "key": "admin.run_safe_cleanup",
    "value": "Запустить Soft Clean"
  },
  {
    "id": 1419,
    "lang": "uk",
    "key": "admin.run_safe_cleanup",
    "value": "Запустити Soft Clean"
  },
  {
    "id": 1420,
    "lang": "en",
    "key": "admin.run_safe_cleanup",
    "value": "Run Soft Clean"
  },
  {
    "id": 1421,
    "lang": "ru",
    "key": "admin.cleanup_full_warning",
    "value": "Внимание: Удаляет ВСЕ временные файлы и заказы PENDING немедленно. Активные загрузки будут потеряны."
  },
  {
    "id": 1422,
    "lang": "uk",
    "key": "admin.cleanup_full_warning",
    "value": "Увага: Видаляє ВСІ тимчасові файли та замовлення PENDING негайно. Активні завантаження будуть втрачені."
  },
  {
    "id": 1423,
    "lang": "en",
    "key": "admin.cleanup_full_warning",
    "value": "Warning: Removes ALL temp files and PENDING orders immediately. Active uploads will be lost."
  },
  {
    "id": 1424,
    "lang": "ru",
    "key": "admin.run_full_cleanup",
    "value": "Запустить Full Clean"
  },
  {
    "id": 1425,
    "lang": "uk",
    "key": "admin.run_full_cleanup",
    "value": "Запустити Full Clean"
  },
  {
    "id": 1426,
    "lang": "en",
    "key": "admin.run_full_cleanup",
    "value": "Run Full Clean"
  }
];
const pages = [
  {
    "id": 1,
    "lang": "en",
    "title": "About Us",
    "slug": "about",
    "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <div class=\"flex flex-col md:flex-row gap-8 items-start mb-8\">\n        <div class=\"flex-1\">\n            <p class=\"mb-4\">\n                <b>FUJI-Mir</b> is one of the best enterprises providing digital photo printing services for both amateurs and professional photographers.\n            </p>\n            <p class=\"mb-4\">You can order a range of design services such as:</p>\n            <ul class=\"list-disc pl-5 mb-4 space-y-1\">\n                <li>scanning photos and films;</li>\n                <li>restoration and computer processing of photos;</li>\n                <li>red-eye removal;</li>\n                <li>development of various layouts and collages;</li>\n                <li>and also ID photos.</li>\n            </ul>\n            <p class=\"mb-4\">\n                Printing is done on professional equipment from <b>FUJI</b> - digital minilab <b>Frontier 500</b>.\n            </p>\n            <p class=\"mb-4\">\n                The highest quality of your photos is guaranteed because all files are reviewed by an operator before printing, and in most cases, we perform necessary color and tone corrections, eliminating potential errors made during shooting.\n            </p>\n            <p class=\"font-bold text-[#009846] text-lg\">\n                We look forward to seeing you among our clients and will try to meet your expectations.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/3 flex flex-col gap-6\">\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/real_map.gif\" alt=\"Map Fujimir\" class=\"w-full h-auto\" />\n             </div>\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/refined_magazin.png\" alt=\"Fujimir Shop\" class=\"w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n</div>\n        ",
    "description": "About Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:51.972Z",
    "updatedAt": "2026-01-01T17:50:51.972Z"
  },
  {
    "id": 2,
    "lang": "ru",
    "title": "О нас",
    "slug": "about",
    "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <div class=\"flex flex-col md:flex-row gap-8 items-start mb-8\">\n        <div class=\"flex-1\">\n            <p class=\"mb-4\">\n                <b>FUJI-Мир</b> - одно из лучших предприятий предоставляющих услуги цифровой печати фотографий как для фотолюбителей, так и для профессиональных фотографов.\n            </p>\n            <p class=\"mb-4\">У нас вы можете заказать ряд дизайнерских услуг таких как:</p>\n            <ul class=\"list-disc pl-5 mb-4 space-y-1\">\n                <li>сканирование фотографий и пленок;</li>\n                <li>реставрация и компьютерная обработка фотографий;</li>\n                <li>устранение эффекта красных глаз;</li>\n                <li>разработка различных макетов и коллажей;</li>\n                <li>а так же сделать фотографию на документы.</li>\n            </ul>\n            <p class=\"mb-4\">\n                Печать производится на профессиональном оборудовании фирмы <b>FUJI</b> - цифровой фотолаборатории <b>Frontier 500</b>.\n            </p>\n            <p class=\"mb-4\">\n                Высочайшее качество ваших фотографий гарантировано тем, что перед печатью все файлы просматриваются оператором и в большинстве случаев мы проводим необходимую цветовую и тоновую коррекцию изображения, устраняя таким образом возможные ошибки допущеные при съемке.\n            </p>\n            <p class=\"font-bold text-[#009846] text-lg\">\n                Будем рады всегда Вас видеть в числе наших клиентов, и постараемся оправдать Ваши ожидания.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/3 flex flex-col gap-6\">\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/real_map.gif\" alt=\"Карта Фуджи Мир\" class=\"w-full h-auto\" />\n             </div>\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/refined_magazin.png\" alt=\"Вход в магазин Фуджи Мир\" class=\"w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n</div>\n        ",
    "description": "О фотоцентре Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.149Z",
    "updatedAt": "2026-01-01T17:50:52.149Z"
  },
  {
    "id": 3,
    "lang": "uk",
    "title": "Про нас",
    "slug": "about",
    "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <div class=\"flex flex-col md:flex-row gap-8 items-start mb-8\">\n        <div class=\"flex-1\">\n            <p class=\"mb-4\">\n                <b>FUJI-Світ</b> - одне з найкращих підприємств, що надають послуги цифрового друку фотографій як для фотолюбителів, так і для професійних фотографів.\n            </p>\n            <p class=\"mb-4\">У нас ви можете замовити ряд дизайнерських послуг, таких як:</p>\n            <ul class=\"list-disc pl-5 mb-4 space-y-1\">\n                <li>сканування фотографій та плівок;</li>\n                <li>реставрація та комп'ютерна обробка фотографій;</li>\n                <li>усунення ефекту червоних очей;</li>\n                <li>розробка різноманітних макетів та колажів;</li>\n                <li>а також зробити фотографію на документи.</li>\n            </ul>\n            <p class=\"mb-4\">\n                Друк проводиться на професійному обладнанні фірми <b>FUJI</b> - цифровій фотолабораторії <b>Frontier 500</b>.\n            </p>\n            <p class=\"mb-4\">\n                Найвища якість ваших фотографій гарантована тим, що перед друком всі файли переглядаються оператором і в більшості випадків ми проводимо необхідну кольорову та тонову корекцію зображення, усуваючи таким чином можливі помилки допущені при зйомці.\n            </p>\n            <p class=\"font-bold text-[#009846] text-lg\">\n                Будемо раді завжди Вас бачити серед наших клієнтів, і намагатимемося виправдати Ваші очікування.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/3 flex flex-col gap-6\">\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/real_map.gif\" alt=\"Карта Fuji-Світ\" class=\"w-full h-auto\" />\n             </div>\n             <div class=\"rounded-xl overflow-hidden shadow-md bg-white border p-2\">\n                <img src=\"/images/about/refined_magazin.png\" alt=\"Магазин Fuji-Світ\" class=\"w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n</div>\n        ",
    "description": "Про фотоцентр Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.372Z",
    "updatedAt": "2026-01-01T17:50:52.372Z"
  },
  {
    "id": 4,
    "lang": "en",
    "title": "Contact",
    "slug": "contact",
    "content": "\n                <h1 class=\"text-2xl font-bold text-[#009846] mb-4\">Our Contacts</h1>\n                <p class=\"mb-2\"><strong>Address:</strong> 8 Yevropeiska St, Dnipro, Ukraine</p>\n                <p class=\"mb-2\"><strong>Working Hours:</strong> 9:30 to 18:30 daily</p>\n                <div class=\"mt-4\">\n                    <p class=\"mb-1\"><strong>Phones:</strong> (099) 215-03-17, (098) 492-73-87</p>\n                    <p class=\"mb-1\"><strong>Email:</strong> fujimir@ukr.net</p>\n                </div>\n            ",
    "description": "Contact Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.427Z",
    "updatedAt": "2026-01-01T17:50:52.427Z"
  },
  {
    "id": 5,
    "lang": "ru",
    "title": "Контакты",
    "slug": "contact",
    "content": "\n                <h1 class=\"text-2xl font-bold text-[#009846] mb-4\">Наши контакты</h1>\n                <p class=\"mb-2\"><strong>Адрес:</strong> г. Днепр, ул. Европейская (Миронова), д.8</p>\n                <p class=\"mb-2\"><strong>Время работы:</strong> с 9:30 до 18:30 без выходных</p>\n                <div class=\"mt-4\">\n                    <p class=\"mb-1\"><strong>Телефоны:</strong> (099) 215-03-17, (098) 492-73-87</p>\n                    <p class=\"mb-1\"><strong>Email:</strong> fujimir@ukr.net</p>\n                </div>\n            ",
    "description": "Контакты Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.483Z",
    "updatedAt": "2026-01-01T17:50:52.483Z"
  },
  {
    "id": 6,
    "lang": "uk",
    "title": "Контакти",
    "slug": "contact",
    "content": "\n                <h1 class=\"text-2xl font-bold text-[#009846] mb-4\">Наші контакти</h1>\n                <p class=\"mb-2\"><strong>Адреса:</strong> м. Дніпро, вул. Європейська (Миронова), буд.8</p>\n                <p class=\"mb-2\"><strong>Час роботи:</strong> з 9:30 до 18:30 без вихідних</p>\n                <div class=\"mt-4\">\n                    <p class=\"mb-1\"><strong>Телефони:</strong> (099) 215-03-17, (098) 492-73-87</p>\n                    <p class=\"mb-1\"><strong>Email:</strong> fujimir@ukr.net</p>\n                </div>\n            ",
    "description": "Контакти Fujimir",
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.527Z",
    "updatedAt": "2026-01-01T17:50:52.527Z"
  }
];
const printSizes = [
  {
    "id": 1,
    "name": "9x13",
    "slug": "9x13",
    "widthMm": null,
    "heightMm": null,
    "basePrice": 10,
    "sortOrder": 0,
    "isActive": true,
    "createdAt": "2026-01-01T16:51:09.885Z",
    "discounts": [
      {
        "id": 1,
        "printSizeId": 1,
        "tierId": 1,
        "minQuantity": 1,
        "price": 3.8
      },
      {
        "id": 2,
        "printSizeId": 1,
        "tierId": 2,
        "minQuantity": 100,
        "price": 3.5
      },
      {
        "id": 3,
        "printSizeId": 1,
        "tierId": 3,
        "minQuantity": 200,
        "price": 8
      }
    ]
  },
  {
    "id": 2,
    "name": "10x15",
    "slug": "10x15",
    "widthMm": null,
    "heightMm": null,
    "basePrice": 12,
    "sortOrder": 1,
    "isActive": true,
    "createdAt": "2026-01-01T16:51:10.149Z",
    "discounts": [
      {
        "id": 4,
        "printSizeId": 2,
        "tierId": 1,
        "minQuantity": 1,
        "price": 12
      },
      {
        "id": 5,
        "printSizeId": 2,
        "tierId": 2,
        "minQuantity": 100,
        "price": 10.8
      },
      {
        "id": 6,
        "printSizeId": 2,
        "tierId": 3,
        "minQuantity": 200,
        "price": 9.6
      }
    ]
  },
  {
    "id": 3,
    "name": "13x18",
    "slug": "13x18",
    "widthMm": null,
    "heightMm": null,
    "basePrice": 20,
    "sortOrder": 2,
    "isActive": true,
    "createdAt": "2026-01-01T16:51:10.382Z",
    "discounts": [
      {
        "id": 7,
        "printSizeId": 3,
        "tierId": 1,
        "minQuantity": 1,
        "price": 20
      },
      {
        "id": 8,
        "printSizeId": 3,
        "tierId": 2,
        "minQuantity": 100,
        "price": 18
      },
      {
        "id": 9,
        "printSizeId": 3,
        "tierId": 3,
        "minQuantity": 200,
        "price": 16
      }
    ]
  },
  {
    "id": 4,
    "name": "15x20",
    "slug": "15x20",
    "widthMm": null,
    "heightMm": null,
    "basePrice": 24,
    "sortOrder": 3,
    "isActive": true,
    "createdAt": "2026-01-01T16:51:10.437Z",
    "discounts": [
      {
        "id": 10,
        "printSizeId": 4,
        "tierId": 1,
        "minQuantity": 1,
        "price": 24
      },
      {
        "id": 11,
        "printSizeId": 4,
        "tierId": 2,
        "minQuantity": 100,
        "price": 21.6
      },
      {
        "id": 12,
        "printSizeId": 4,
        "tierId": 3,
        "minQuantity": 200,
        "price": 19.2
      }
    ]
  },
  {
    "id": 5,
    "name": "20x30",
    "slug": "20x30",
    "widthMm": null,
    "heightMm": null,
    "basePrice": 48,
    "sortOrder": 4,
    "isActive": true,
    "createdAt": "2026-01-01T16:51:10.493Z",
    "discounts": [
      {
        "id": 13,
        "printSizeId": 5,
        "tierId": 1,
        "minQuantity": 1,
        "price": 48
      },
      {
        "id": 14,
        "printSizeId": 5,
        "tierId": 2,
        "minQuantity": 100,
        "price": 43.2
      },
      {
        "id": 15,
        "printSizeId": 5,
        "tierId": 3,
        "minQuantity": 200,
        "price": 38.4
      }
    ]
  }
];
const quantityTiers = [
  {
    "id": 1,
    "label": "Менее 100 шт.",
    "minQuantity": 1,
    "sortOrder": 0,
    "isActive": true
  },
  {
    "id": 2,
    "label": "Более 100 шт.",
    "minQuantity": 100,
    "sortOrder": 1,
    "isActive": true
  },
  {
    "id": 3,
    "label": "Более 200 шт.",
    "minQuantity": 200,
    "sortOrder": 2,
    "isActive": true
  }
];
const printOptions = [
  {
    "id": 1,
    "name": "Border",
    "slug": "border",
    "priceType": "FIXED",
    "price": 0,
    "isActive": true
  },
  {
    "id": 2,
    "name": "Magnetic",
    "slug": "magnetic",
    "priceType": "FIXED",
    "price": 15,
    "isActive": true
  }
];
const magnetPrices = [
  {
    "id": 1,
    "sizeSlug": "10x15",
    "price": 35,
    "isActive": true
  },
  {
    "id": 2,
    "sizeSlug": "13x18",
    "price": 60,
    "isActive": true
  },
  {
    "id": 3,
    "sizeSlug": "15x20",
    "price": 70,
    "isActive": true
  },
  {
    "id": 4,
    "sizeSlug": "20x30",
    "price": 130,
    "isActive": true
  }
];
const deliveryOptions = [
  {
    "id": 1,
    "slug": "local",
    "name": "Доставка по м. Дніпро",
    "price": 150,
    "description": "Доставка кур'єром по місту Дніпро",
    "isActive": true
  },
  {
    "id": 2,
    "slug": "novaposhta",
    "name": "Нова Пошта",
    "price": 0,
    "description": "Доставка в інші міста України за тарифами Нової Пошти",
    "isActive": true
  },
  {
    "id": 3,
    "slug": "pickup",
    "name": "Самовивіз",
    "price": 0,
    "description": "вул. Європейська, 8",
    "isActive": true
  }
];
const products = [];
const helpCategories = [
  {
    "id": 1,
    "slug": "general",
    "sortOrder": 10,
    "isActive": true,
    "createdAt": "2026-01-01T17:50:52.629Z",
    "updatedAt": "2026-01-01T17:50:52.629Z",
    "translations": [
      {
        "id": 1,
        "helpCategoryId": 1,
        "lang": "ru",
        "name": "Общие вопросы"
      },
      {
        "id": 2,
        "helpCategoryId": 1,
        "lang": "uk",
        "name": "Загальні питання"
      },
      {
        "id": 3,
        "helpCategoryId": 1,
        "lang": "en",
        "name": "General Questions"
      }
    ],
    "articles": [
      {
        "id": 1,
        "helpCategoryId": 1,
        "slug": "how-to-order",
        "sortOrder": 1,
        "isActive": true,
        "createdAt": "2026-01-01T17:50:52.705Z",
        "updatedAt": "2026-01-01T17:50:52.705Z",
        "translations": [
          {
            "id": 1,
            "helpArticleId": 1,
            "lang": "ru",
            "title": "Как сделать заказ?",
            "content": "\n        <div class=\"space-y-8\">\n            <h3 class=\"text-xl font-bold mb-6 text-center\">Всего 3 шага к вашим фотографиям</h3>\n            \n            <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n                <!-- Step 1 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_upload.png\" alt=\"Загрузка\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">1</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Загрузите фото</h4>\n                    <p class=\"text-sm text-gray-600\">Загрузите файлы на наш сайт с компьютера или телефона в пару кликов.</p>\n                </div>\n                \n                <!-- Step 2 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_sizes.png\" alt=\"Выбор формата\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">2</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Настройте печать</h4>\n                    <p class=\"text-sm text-gray-600\">Выберите нужный формат (9x13, 10x15, 15x20...), тип бумаги и рамку.</p>\n                </div>\n\n                <!-- Step 3 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_delivery.png\" alt=\"Доставка\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">3</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Получите заказ</h4>\n                    <p class=\"text-sm text-gray-600\">Быстрая доставка почтой или самовывоз из нашей фотолаборатории.</p>\n                </div>\n            </div>\n\n            <div class=\"mt-8 p-6 bg-green-50 rounded-xl border border-green-100 text-center\">\n                <p class=\"text-green-800 font-medium mb-4\">Готовы приступить?</p>\n                <a href=\"/upload\" class=\"inline-block bg-[#009846] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007a38] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5\">\n                    Начать загрузку\n                </a>\n            </div>\n        </div>\n    "
          },
          {
            "id": 2,
            "helpArticleId": 1,
            "lang": "uk",
            "title": "Як зробити замовлення?",
            "content": "\n        <div class=\"space-y-8\">\n            <h3 class=\"text-xl font-bold mb-6 text-center\">Всього 3 кроки до ваших фотографій</h3>\n            \n            <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n                <!-- Step 1 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_upload.png\" alt=\"Завантаження\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">1</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Завантажте фото</h4>\n                    <p class=\"text-sm text-gray-600\">Завантажте файли на наш сайт з комп'ютера або телефону в пару кліків.</p>\n                </div>\n                \n                <!-- Step 2 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_sizes.png\" alt=\"Вибір формату\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">2</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Налаштуйте друк</h4>\n                    <p class=\"text-sm text-gray-600\">Оберіть потрібний формат (9x13, 10x15, 15x20...), тип паперу та рамку.</p>\n                </div>\n\n                <!-- Step 3 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_delivery.png\" alt=\"Доставка\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">3</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Отримайте замовлення</h4>\n                    <p class=\"text-sm text-gray-600\">Швидка доставка поштою або самовивіз з нашої фотолабораторії.</p>\n                </div>\n            </div>\n\n             <div class=\"mt-8 p-6 bg-green-50 rounded-xl border border-green-100 text-center\">\n                <p class=\"text-green-800 font-medium mb-4\">Готові розпочати?</p>\n                <a href=\"/upload\" class=\"inline-block bg-[#009846] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007a38] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5\">\n                    Почати завантаження\n                </a>\n            </div>\n        </div>\n    "
          },
          {
            "id": 3,
            "helpArticleId": 1,
            "lang": "en",
            "title": "How to order?",
            "content": "\n        <div class=\"space-y-8\">\n            <h3 class=\"text-xl font-bold mb-6 text-center\">Just 3 steps to your photos</h3>\n            \n            <div class=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n                <!-- Step 1 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_upload.png\" alt=\"Upload\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">1</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Upload Photos</h4>\n                    <p class=\"text-sm text-gray-600\">Upload files to our website from your computer or phone in a few clicks.</p>\n                </div>\n                \n                <!-- Step 2 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_sizes.png\" alt=\"Select Size\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">2</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Configure Print</h4>\n                    <p class=\"text-sm text-gray-600\">Choose format (9x13, 10x15, 15x20...), paper type, and boarders.</p>\n                </div>\n\n                <!-- Step 3 -->\n                <div class=\"flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200\">\n                    <img src=\"/images/help/step_delivery.png\" alt=\"Delivery\" class=\"w-full max-w-[180px] h-auto mb-4 border-b border-gray-100 pb-2 bg-blend-multiply\" />\n                    <div class=\"bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 shadow-sm\">3</div>\n                    <h4 class=\"font-bold text-lg mb-2\">Receive Order</h4>\n                    <p class=\"text-sm text-gray-600\">Fast delivery by mail or pickup from our photolab.</p>\n                </div>\n            </div>\n\n            <div class=\"mt-8 p-6 bg-green-50 rounded-xl border border-green-100 text-center\">\n                <p class=\"text-green-800 font-medium mb-4\">Ready to start?</p>\n                <a href=\"/upload\" class=\"inline-block bg-[#009846] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#007a38] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5\">\n                    Start Uploading\n                </a>\n            </div>\n        </div>\n    "
          }
        ]
      },
      {
        "id": 2,
        "helpCategoryId": 1,
        "slug": "photo-sizes",
        "sortOrder": 2,
        "isActive": true,
        "createdAt": "2026-01-01T17:50:52.917Z",
        "updatedAt": "2026-01-01T17:50:52.917Z",
        "translations": [
          {
            "id": 4,
            "helpArticleId": 2,
            "lang": "ru",
            "title": "Размеры фотографий",
            "content": "\n<h3 class=\"text-lg font-bold mb-4\">Размеры фотографий</h3>\n<table class=\"w-full border-collapse border border-gray-300 mb-6 text-sm\">\n    <thead class=\"bg-gray-100\">\n        <tr>\n            <th class=\"border border-gray-300 p-2 text-left\">Формат</th>\n            <th class=\"border border-gray-300 p-2 text-left\">Точный размер</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">9x13</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">89x127mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center\">13x18</td><td class=\"border border-gray-300 p-2\">127x178mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">10x15</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">100x152mm</td></tr>\n        <tr>\n            <td class=\"border border-gray-300 p-2 text-center align-middle\" rowspan=\"3\">15x20</td>\n            <td class=\"border border-gray-300 p-2\">152x203mm</td>\n        </tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x210mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x216mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">20x30</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">203x305mm</td></tr>\n    </tbody>\n</table>\n<div class=\"space-y-4 text-sm text-gray-800\">\n    <p><strong>Тип фотографий JPEG (расширение jpg, jpeg), цветовая модель RGB.</strong></p>\n    <p>Для получения точных геометрических размеров фотоснимка помимо точных размеров нужно указать разрешение снимка 300dpi (точек на дюйм). Во всех остальных случаях это необязательно, но разрешение не должно превышать отметку в 300dpi.</p>\n    <div class=\"p-4 bg-red-50 border border-red-100 rounded-lg text-red-900\">\n        <p><strong>Важно:</strong> Старайтесь не размещать важных элементов и надписей близко (\"в притык\") к краю фотографии, т.к. в результате постепенного износа, и последующей калибровки форматов, размер края снимка может варьироваться в пределах 2мм.</p>\n    </div>\n</div>"
          },
          {
            "id": 5,
            "helpArticleId": 2,
            "lang": "uk",
            "title": "Розміри фотографій",
            "content": "\n<h3 class=\"text-lg font-bold mb-4\">Розміри фотографій</h3>\n<table class=\"w-full border-collapse border border-gray-300 mb-6 text-sm\">\n    <thead class=\"bg-gray-100\">\n        <tr>\n            <th class=\"border border-gray-300 p-2 text-left\">Формат</th>\n            <th class=\"border border-gray-300 p-2 text-left\">Точний розмір</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">9x13</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">89x127mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center\">13x18</td><td class=\"border border-gray-300 p-2\">127x178mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">10x15</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">100x152mm</td></tr>\n        <tr>\n            <td class=\"border border-gray-300 p-2 text-center align-middle\" rowspan=\"3\">15x20</td>\n            <td class=\"border border-gray-300 p-2\">152x203mm</td>\n        </tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x210mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x216mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">20x30</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">203x305mm</td></tr>\n    </tbody>\n</table>\n<div class=\"space-y-4 text-sm text-gray-800\">\n    <p><strong>Тип фотографій JPEG (розширення jpg, jpeg), колірна модель RGB.</strong></p>\n    <p>Для отримання точних геометричних розмірів фотознімку, крім точних розмірів, потрібно вказати роздільну здатність знімка 300dpi (точок на дюйм). У всіх інших випадках це необов'язково, але роздільна здатність не повинна перевищувати позначку в 300dpi.</p>\n    <div class=\"p-4 bg-red-50 border border-red-100 rounded-lg text-red-900\">\n        <p><strong>Важливо:</strong> Намагайтеся не розміщувати важливих елементів і написів близько (\"впритул\") до краю фотографії, оскільки в результаті поступового зносу і подальшого калібрування форматів розмір краю знімка може варіюватися в межах 2мм.</p>\n    </div>\n</div>"
          },
          {
            "id": 6,
            "helpArticleId": 2,
            "lang": "en",
            "title": "Photo Sizes",
            "content": "\n<h3 class=\"text-lg font-bold mb-4\">Photo Sizes</h3>\n<table class=\"w-full border-collapse border border-gray-300 mb-6 text-sm\">\n    <thead class=\"bg-gray-100\">\n        <tr>\n            <th class=\"border border-gray-300 p-2 text-left\">Size</th>\n            <th class=\"border border-gray-300 p-2 text-left\">Exact Size</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">9x13</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">89x127mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center\">13x18</td><td class=\"border border-gray-300 p-2\">127x178mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">10x15</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">100x152mm</td></tr>\n        <tr>\n            <td class=\"border border-gray-300 p-2 text-center align-middle\" rowspan=\"3\">15x20</td>\n            <td class=\"border border-gray-300 p-2\">152x203mm</td>\n        </tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x210mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2\">152x216mm</td></tr>\n        <tr><td class=\"border border-gray-300 p-2 text-center bg-yellow-50/50\">20x30</td><td class=\"border border-gray-300 p-2 bg-yellow-50/50\">203x305mm</td></tr>\n    </tbody>\n</table>\n<div class=\"space-y-4 text-sm text-gray-800\">\n    <p><strong>Photo type JPEG (extension jpg, jpeg), color model RGB.</strong></p>\n    <p>To obtain exact geometric dimensions of the photograph, in addition to exact dimensions, a resolution of 300dpi (dots per inch) must be specified. In all other cases this is not mandatory, but resolution should not exceed 300dpi.</p>\n    <div class=\"p-4 bg-red-50 border border-red-100 rounded-lg text-red-900\">\n        <p><strong>Important:</strong> Try not to place important elements and text too close to the edge of the photo, as due to gradual wear and subsequent calibration of print dimensions, the border size of the print may vary within 2mm.</p>\n    </div>\n</div>"
          }
        ]
      },
      {
        "id": 3,
        "helpCategoryId": 1,
        "slug": "why-cropped",
        "sortOrder": 2,
        "isActive": true,
        "createdAt": "2026-01-01T17:50:53.406Z",
        "updatedAt": "2026-01-01T17:50:53.406Z",
        "translations": [
          {
            "id": 7,
            "helpArticleId": 3,
            "lang": "ru",
            "title": "Почему фотография при печати обрезаются",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <p class=\"mb-4 text-justify\">\n        Изначально форматы печати рассчитывались под наиболее распространенные форматы кадров. На рассвете пленочной эры большинство любительских камер снимало на пленку 135-го типа в формате кадра 24х36 мм. Соотношение сторон такого кадра <b>2:3</b> — именно под него создавались форматы печати 10х15, 20х30, 30х45 и др.\n    </p>\n    <p class=\"mb-4 text-justify\">\n        С появлением цифровых фотоаппаратов производители стали ориентироваться на формат компьютерных мониторов, который в большинстве случаев близок к соотношению сторон <b>3:4</b>. На сегодняшний день распространены камеры обоих типов:\n    </p>\n    <ul class=\"list-disc pl-5 mb-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100\">\n        <li>с соотношением сторон кадра <span class=\"font-bold text-slate-700\">2:3</span> (как правило, цифровые зеркальные камеры, пленочные фотоаппараты);</li>\n        <li>с соотношением сторон кадра <span class=\"font-bold text-slate-700\">3:4</span> (как правило, цифровые любительские камеры).</li>\n    </ul>\n    \n    <div class=\"bg-amber-50 border-l-4 border-amber-400 p-4 mb-6\">\n        <p class=\"font-medium text-amber-900\">\n            Если напечатать кадр 3:4 в формате 10х15 (который имеет соотношение 2:3), то значительная часть изображения либо останется за пределами печати, либо на снимке образуются широкие белые поля (в зависимости от режима печати).\n        </p>\n    </div>\n\n    <p class=\"mb-4\">\n        Так как в общем виде любой файл имеет произвольные размеры (произвольные соотношения сторон), то при его печати в любом стандартном формате всегда есть вероятность что часть фото обрежет.\n    </p>\n    <p class=\"mb-4 font-semibold\">\n        Что же нужно делать заказчику фотографий, если по какой-то причине на фотоснимке любой элемент важный, и хотелось бы его сохранить?\n    </p>\n    <p class=\"mb-4\">\n        Наша фотолаборатория позволяет напечатать фотоснимок в следующих режимах:\n    </p>\n\n    <div class=\"space-y-8 mt-6\">\n        \n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n            <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/orig.jpg\" alt=\"Оригинал\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Оригинал</h3>\n                <p class=\"text-slate-600\">\n                    Снимок полученный с любительской цифровой камеры, и так мы его видим на экране монитора.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200 relative\">\n                    <img src=\"/images/help/crop.jpg\" alt=\"Free Cropping\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Free Cropping (произвольная обрезка)</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    Приблизительно так кадрируется фотография, когда нет особых требований к обрезке.\n                </p>\n                <p class=\"text-slate-500 text-sm\">\n                    Оператор печати сам решает какая часть снимка менее значительна, и при печати обрезает её.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/no_crop.jpg\" alt=\"Fit-in\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Fit-in (НЕ ОБРЕЗАТЬ)</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    Если любая часть фотографии важна, и обрезка недопустима, то при заказе указывают данный режим печати.\n                </p>\n                <div class=\"bg-blue-50 p-3 rounded-lg text-sm text-blue-800\">\n                     Единственный его недостаток, это белые поля по краям фотографии, которые возникают из-за разных соотношений сторон фотографии, и формата на котором печатается фото.\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200\">\n        <h4 class=\"font-bold text-slate-800 mb-2\">No Resize (без масштабирования)</h4>\n        <p class=\"text-slate-600 text-sm\">\n            Отдельный режим печати, предназначен для пользователей владеющих графическими редакторами, и способных самостоятельно откадрировать снимок точно под наши размеры печати.\n        </p>\n    </div>\n</div>\n    "
          },
          {
            "id": 8,
            "helpArticleId": 3,
            "lang": "uk",
            "title": "Чому фотографія при друку обрізається",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <p class=\"mb-4 text-justify\">\n        Спочатку формати друку розраховувалися під найбільш поширені формати кадрів. На світанку плівкової ери більшість аматорських камер знімало на плівку 135-го типу у форматі кадру 24х36 мм. Співвідношення сторін такого кадру <b>2:3</b> — саме під нього створювалися формати друку 10х15, 20х30, 30х45 та ін.\n    </p>\n    <p class=\"mb-4 text-justify\">\n        З появою цифрових фотоапаратів виробники стали орієнтуватися на формат комп'ютерних моніторів, який у більшості випадків близький до співвідношення сторін <b>3:4</b>. На сьогоднішній день поширені камери обох типів:\n    </p>\n    <ul class=\"list-disc pl-5 mb-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100\">\n        <li>зі співвідношенням сторін кадру <span class=\"font-bold text-slate-700\">2:3</span> (як правило, цифрові дзеркальні камери, плівкові фотоапарати);</li>\n        <li>зі співвідношенням сторін кадру <span class=\"font-bold text-slate-700\">3:4</span> (як правило, цифрові аматорські камери).</li>\n    </ul>\n    \n    <div class=\"bg-amber-50 border-l-4 border-amber-400 p-4 mb-6\">\n        <p class=\"font-medium text-amber-900\">\n            Якщо надрукувати кадр 3:4 у форматі 10х15 (який має співвідношення 2:3), то значна частина зображення або залишиться за межами друку, або на знімку утворяться широкі білі поля (залежно від режиму друку).\n        </p>\n    </div>\n\n    <p class=\"mb-4\">\n        Так як у загальному вигляді будь-який файл має довільні розміри (довільні співвідношення сторін), то при його друку в будь-якому стандартному форматі завжди є ймовірність що частина фото обріжеться.\n    </p>\n    <p class=\"mb-4\">\n        Наша фотолабораторія дозволяє надрукувати фотознімок у наступних режимах:\n    </p>\n\n    <div class=\"space-y-8 mt-6\">\n        \n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n            <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/orig.jpg\" alt=\"Оригінал\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Оригінал</h3>\n                <p class=\"text-slate-600\">\n                    Знімок отриманий з аматорської цифрової камери, і так ми його бачимо на екрані монітора.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200 relative\">\n                    <img src=\"/images/help/crop.jpg\" alt=\"Free Cropping\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Free Cropping (довільна обрізка)</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    Приблизно так кадрується фотографія, коли немає особливих вимог до обрізки.\n                </p>\n                <p class=\"text-slate-500 text-sm\">\n                    Оператор друку сам вирішує яка частина знімка менш значна, і при друку обрізає її.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/no_crop.jpg\" alt=\"Fit-in\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Fit-in (НЕ ОБРІЗАТИ)</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    Якщо будь-яка частина фотографії важлива, і обрізка неприпустима, то при замовленні вказують даний режим друку.\n                </p>\n                <div class=\"bg-blue-50 p-3 rounded-lg text-sm text-blue-800\">\n                     Єдиний його недолік, це білі поля по краях фотографії, які виникають через різні співвідношення сторін фотографії, і формату на якому друкується фото.\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200\">\n        <h4 class=\"font-bold text-slate-800 mb-2\">No Resize (без масштабування)</h4>\n        <p class=\"text-slate-600 text-sm\">\n            Окремий режим друку, призначений для користувачів, що володіють графічними редакторами, і здатних самостійно відкадрувати знімок точно під наші розміри друку.\n        </p>\n    </div>\n</div>\n    "
          },
          {
            "id": 9,
            "helpArticleId": 3,
            "lang": "en",
            "title": "Why photos are cropped when printed",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <p class=\"mb-4 text-justify\">\n        Initially, print formats were calculated for the most common frame formats. At the dawn of the film era, most amateur cameras shot on 135 type film in 24x36 mm frame format. The aspect ratio of such a frame is <b>2:3</b> — print formats 10x15, 20x30, 30x45 etc. were created specifically for it.\n    </p>\n    <p class=\"mb-4 text-justify\">\n        With the advent of digital cameras, manufacturers began to focus on the format of computer monitors, which in most cases is close to the aspect ratio of <b>3:4</b>. Today, cameras of both types are common:\n    </p>\n    <ul class=\"list-disc pl-5 mb-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100\">\n        <li>Frame aspect ratio <span class=\"font-bold text-slate-700\">2:3</span> (usually digital SLR cameras, film cameras);</li>\n        <li>Frame aspect ratio <span class=\"font-bold text-slate-700\">3:4</span> (usually digital amateur cameras).</li>\n    </ul>\n    \n    <div class=\"bg-amber-50 border-l-4 border-amber-400 p-4 mb-6\">\n        <p class=\"font-medium text-amber-900\">\n            If you print a 3:4 frame in 10x15 format (which is 2:3), a significant part of the image will either remain outside the print area, or wide white borders will form on the picture (depending on the print mode).\n        </p>\n    </div>\n\n    <p class=\"mb-4\">\n        Since any file generally has arbitrary dimensions (arbitrary aspect ratios), when printing in any standard format there is always a probability that part of the photo will be cropped.\n    </p>\n    <p class=\"mb-4\">\n        Our photo lab allows you to print photos in the following modes:\n    </p>\n\n    <div class=\"space-y-8 mt-6\">\n        \n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n            <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/orig.jpg\" alt=\"Original\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Original</h3>\n                <p class=\"text-slate-600\">\n                    A snapshot obtained from an amateur digital camera, as we see it on the monitor screen.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200 relative\">\n                    <img src=\"/images/help/crop.jpg\" alt=\"Free Cropping\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Free Cropping</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    The photo is cropped approximately like this when there are no special cropping requirements.\n                </p>\n                <p class=\"text-slate-500 text-sm\">\n                    The print operator decides which part of the shot is less significant and crops it during printing.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 shadow-sm border border-slate-200\">\n             <div class=\"w-full md:w-1/3 flex-shrink-0\">\n                <div class=\"rounded-lg overflow-hidden border border-slate-200\">\n                    <img src=\"/images/help/no_crop.jpg\" alt=\"Fit-in\" class=\"w-full h-auto object-cover\" />\n                </div>\n            </div>\n            <div class=\"flex-1 flex flex-col justify-center\">\n                <h3 class=\"text-xl font-bold text-slate-900 mb-2\">Fit-in (NO CROP)</h3>\n                <p class=\"text-slate-600 mb-2\">\n                    If any part of the photo is important and cropping is unacceptable, this print mode is specified when ordering.\n                </p>\n                <div class=\"bg-blue-50 p-3 rounded-lg text-sm text-blue-800\">\n                     Its only drawback is white borders on the edges of the photo, which occur due to different aspect ratios of the photo and the format on which the photo is printed.\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n    <div class=\"mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200\">\n        <h4 class=\"font-bold text-slate-800 mb-2\">No Resize</h4>\n        <p class=\"text-slate-600 text-sm\">\n            A separate print mode intended for users who know how to use graphic editors and are capable of independently cropping the image exactly to our print dimensions.\n        </p>\n    </div>\n</div>\n    "
          }
        ]
      },
      {
        "id": 4,
        "helpCategoryId": 1,
        "slug": "equipment",
        "sortOrder": 3,
        "isActive": true,
        "createdAt": "2026-01-01T17:50:53.616Z",
        "updatedAt": "2026-01-01T17:50:53.616Z",
        "translations": [
          {
            "id": 10,
            "helpArticleId": 4,
            "lang": "ru",
            "title": "Наше оборудование и материалы",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <h3 class=\"text-3xl font-bold text-[#009846] mb-6\">Наше оборудование и материалы</h3>\n\n    <!-- Frontier 500 Section -->\n    <div class=\"flex flex-col md:flex-row gap-8 mb-12\">\n        <div class=\"w-full md:w-1/3 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center\">\n                <img src=\"/images/help/frontier500.png\" alt=\"Fuji Frontier 500\" class=\"w-full h-auto object-contain mx-auto mb-2\" />\n                <p class=\"text-sm font-bold text-slate-500\">Fujifilm Frontier 500</p>\n             </div>\n        </div>\n        <div class=\"flex-1\">\n            <p class=\"text-lg mb-4\">\n                Мы работаем на современной, высокоскоростной компактной цифровой минилаборатории <span class=\"font-bold text-[#009846]\">Fuji Frontier 500</span> — это лучшее решение для получения высококачественных цифровых отпечатков.\n            </p>\n            <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n                <h4 class=\"font-bold text-slate-800 mb-4 flex items-center gap-2\">\n                    <span>⚡</span> Характеристики и преимущества\n                </h4>\n                <ul class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm\">\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Высокая эффективность</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Высококачественная лазерная система экспонирования</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Новейшее программное обеспечение</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Скорость печати до 800 отпечатков 10х15 см в час</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Пониженное энергопотребление</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Максимальный формат печати — А4 (21х30)</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Основа системы \"Fujifilm Digital Imaging\"</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <!-- Image Intelligence Section -->\n    <div class=\"flex flex-col-reverse md:flex-row gap-8 mb-12 items-center bg-blue-50 p-6 rounded-2xl border border-blue-100\">\n        <div class=\"flex-1\">\n            <h4 class=\"text-xl font-bold text-blue-900 mb-3 flex items-center gap-2\">\n                Image Intelligence™ <span class=\"text-sm font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full\">Технология</span>\n            </h4>\n            <p class=\"mb-4 text-blue-900\">\n                Накопленные Fujifilm за последние 7 десятилетий знания воплотились в мощные алгоритмы обработки.\n            </p>\n            <p class=\"text-sm text-blue-800 leading-relaxed text-justify\">\n                Технология <b>\"Image Intelligence\"</b> автоматически компенсирует недостаточное освещение и другие проблемные условия съемки, а также позволяет добиться более естественных оттенков кожи. Коррекция выполняется автоматически, обеспечивая оптимальный результат даже для снимков, сделанных в сложных условиях.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/4 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-center\">\n                <img src=\"/images/help/image-intelligence.jpg\" alt=\"Image Intelligence\" class=\"max-w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n\n    <!-- Paper Section -->\n    <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n        <h4 class=\"text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200\">\n            Фотобумага FUJICOLOR CRYSTAL ARCHIVE PAPER\n        </h4>\n        \n        <div class=\"flex flex-col md:flex-row gap-8\">\n            <div class=\"w-full md:w-1/4 flex-shrink-0\">\n                <div class=\"bg-white p-2 rounded-xl border border-slate-200 shadow-sm rotate-1 hover:rotate-0 transition-transform duration-300\">\n                    <img src=\"/images/help/crystalarhive.jpg\" alt=\"Fujicolor Paper\" class=\"w-full h-auto rounded\" />\n                </div>\n            </div>\n            <div class=\"flex-1\">\n                <p class=\"font-bold text-lg mb-2 text-slate-800\">\n                    Профессиональное качество для любительской фотографии.\n                </p>\n                <p class=\"text-slate-600 mb-4 italic\">\n                    Высокая стабильность цвета, высокая белизна бумаги, чистые цвета, точная цветопередача.\n                </p>\n                <p class=\"mb-6 text-justify\">\n                    <b>FUJICOLOR CRYSTAL ARCHIVE PAPER</b> представляет собой цветную фотобумагу с галогенидами серебра, предназначенную для создания высококачественных цветных отпечатков. Она создана на основе новой технологии нанесения слоев для улучшенного воспроизведения цветов и чистого белого цвета.\n                </p>\n\n                <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Яркие цвета</h5>\n                        <p class=\"text-xs text-slate-600\">Сохраняются великолепные цвета, нежные оттенки зеленого, яркие синие и красные.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Идеальный белый</h5>\n                        <p class=\"text-xs text-slate-600\">Блестящая передача белого цвета и улучшенная детализация в светлых тонах.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Долговечность</h5>\n                        <p class=\"text-xs text-slate-600\">Отличная стойкость изображения. Не выцветает при длительном хранении.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Прочность</h5>\n                        <p class=\"text-xs text-slate-600\">Нечувствительность к механическим воздействиям.</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n                        "
          },
          {
            "id": 11,
            "helpArticleId": 4,
            "lang": "uk",
            "title": "Наше обладнання та матеріали",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <h3 class=\"text-3xl font-bold text-[#009846] mb-6\">Наше обладнання та матеріали</h3>\n\n    <!-- Frontier 500 Section -->\n    <div class=\"flex flex-col md:flex-row gap-8 mb-12\">\n        <div class=\"w-full md:w-1/3 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center\">\n                <img src=\"/images/help/frontier500.png\" alt=\"Fuji Frontier 500\" class=\"w-full h-auto object-contain mx-auto mb-2\" />\n                <p class=\"text-sm font-bold text-slate-500\">Fujifilm Frontier 500</p>\n             </div>\n        </div>\n        <div class=\"flex-1\">\n            <p class=\"text-lg mb-4\">\n                Ми працюємо на сучасній, високошвидкісній компактній цифровій мінілабораторії <span class=\"font-bold text-[#009846]\">Fuji Frontier 500</span> — це найкраще рішення для отримання високоякісних цифрових відбитків.\n            </p>\n            <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n                <h4 class=\"font-bold text-slate-800 mb-4 flex items-center gap-2\">\n                    <span>⚡</span> Характеристики та переваги\n                </h4>\n                <ul class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm\">\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Висока ефективність</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Високоякісна лазерна система експонування</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Новітнє програмне забезпечення</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Швидкість друку до 800 відбитків 10х15 см на годину</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Знижене енергоспоживання</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Максимальний формат друку — А4 (21х30)</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Основа системи \"Fujifilm Digital Imaging\"</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <!-- Image Intelligence Section -->\n    <div class=\"flex flex-col-reverse md:flex-row gap-8 mb-12 items-center bg-blue-50 p-6 rounded-2xl border border-blue-100\">\n        <div class=\"flex-1\">\n            <h4 class=\"text-xl font-bold text-blue-900 mb-3 flex items-center gap-2\">\n                Image Intelligence™ <span class=\"text-sm font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full\">Технологія</span>\n            </h4>\n            <p class=\"mb-4 text-blue-900\">\n                Накопичені Fujifilm за останні 7 десятиліть знання втілилися в потужні алгоритми обробки.\n            </p>\n            <p class=\"text-sm text-blue-800 leading-relaxed text-justify\">\n                Технологія <b>\"Image Intelligence\"</b> автоматично компенсує недостатнє освітлення та інші проблемні умови зйомки, а також дозволяє домогтися більш природних відтінків шкіри. Корекція виконується автоматично, забезпечуючи оптимальний результат навіть для знімків, зроблених у складних умовах.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/4 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-center\">\n                <img src=\"/images/help/image-intelligence.jpg\" alt=\"Image Intelligence\" class=\"max-w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n\n    <!-- Paper Section -->\n    <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n        <h4 class=\"text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200\">\n            Фотопапір FUJICOLOR CRYSTAL ARCHIVE PAPER\n        </h4>\n        \n        <div class=\"flex flex-col md:flex-row gap-8\">\n            <div class=\"w-full md:w-1/4 flex-shrink-0\">\n                <div class=\"bg-white p-2 rounded-xl border border-slate-200 shadow-sm rotate-1 hover:rotate-0 transition-transform duration-300\">\n                    <img src=\"/images/help/crystalarhive.jpg\" alt=\"Fujicolor Paper\" class=\"w-full h-auto rounded\" />\n                </div>\n            </div>\n            <div class=\"flex-1\">\n                <p class=\"font-bold text-lg mb-2 text-slate-800\">\n                    Професійна якість для аматорської фотографії.\n                </p>\n                <p class=\"text-slate-600 mb-4 italic\">\n                    Висока стабільність кольору, висока білизна паперу, чисті кольори, точна передача кольору.\n                </p>\n                <p class=\"mb-6 text-justify\">\n                    <b>FUJICOLOR CRYSTAL ARCHIVE PAPER</b> являє собою кольоровий фотопапір з галогенідами срібла, призначений для створення високоякісних кольорових відбитків. Він створений на основі нової технології нанесення шарів для поліпшеного відтворення кольорів і чистого білого кольору.\n                </p>\n\n                <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Яскраві кольори</h5>\n                        <p class=\"text-xs text-slate-600\">Зберігаються чудові кольори, ніжні відтінки зеленого, яскраві сині та червоні.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Ідеальний білий</h5>\n                        <p class=\"text-xs text-slate-600\">Блискуча передача білого кольору та покращена деталізація у світлих тонах.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Довговічність</h5>\n                        <p class=\"text-xs text-slate-600\">Відмінна стійкість зображення. Не вицвітає при тривалому зберіганні.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Міцність</h5>\n                        <p class=\"text-xs text-slate-600\">Нечутливість до механічних впливів.</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n                        "
          },
          {
            "id": 12,
            "helpArticleId": 4,
            "lang": "en",
            "title": "Our Equipment and Materials",
            "content": "\n<div class=\"prose max-w-none text-slate-800\">\n    <h3 class=\"text-3xl font-bold text-[#009846] mb-6\">Our Equipment and Materials</h3>\n\n    <!-- Frontier 500 Section -->\n    <div class=\"flex flex-col md:flex-row gap-8 mb-12\">\n        <div class=\"w-full md:w-1/3 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center\">\n                <img src=\"/images/help/frontier500.png\" alt=\"Fuji Frontier 500\" class=\"w-full h-auto object-contain mx-auto mb-2\" />\n                <p class=\"text-sm font-bold text-slate-500\">Fujifilm Frontier 500</p>\n             </div>\n        </div>\n        <div class=\"flex-1\">\n            <p class=\"text-lg mb-4\">\n                We work on a modern, high-speed compact digital minilab <span class=\"font-bold text-[#009846]\">Fuji Frontier 500</span> — it is the best solution for obtaining high-quality digital prints.\n            </p>\n            <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n                <h4 class=\"font-bold text-slate-800 mb-4 flex items-center gap-2\">\n                    <span>⚡</span> Features and Benefits\n                </h4>\n                <ul class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm\">\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>High efficiency</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>High-quality laser exposure system</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Newest software</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Print speed up to 800 prints (10x15) per hour</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Reduced power consumption</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Maximum print format — A4 (21x30)</li>\n                    <li class=\"flex items-start gap-2\"><div class=\"w-1.5 h-1.5 mt-1.5 rounded-full bg-[#009846] flex-shrink-0\"></div>Based on \"Fujifilm Digital Imaging\" system</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <!-- Image Intelligence Section -->\n    <div class=\"flex flex-col-reverse md:flex-row gap-8 mb-12 items-center bg-blue-50 p-6 rounded-2xl border border-blue-100\">\n        <div class=\"flex-1\">\n            <h4 class=\"text-xl font-bold text-blue-900 mb-3 flex items-center gap-2\">\n                Image Intelligence™ <span class=\"text-sm font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full\">Technology</span>\n            </h4>\n            <p class=\"mb-4 text-blue-900\">\n                Knowledge accumulated by Fujifilm over the last 7 decades embodied in powerful processing algorithms.\n            </p>\n            <p class=\"text-sm text-blue-800 leading-relaxed text-justify\">\n                <b>\"Image Intelligence\"</b> technology automatically compensates for insufficient lighting and other problematic shooting conditions, and also achieves more natural skin tones. Correction is performed automatically, ensuring optimal results even for shots taken in difficult conditions.\n            </p>\n        </div>\n        <div class=\"w-full md:w-1/4 flex-shrink-0\">\n             <div class=\"bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-center\">\n                <img src=\"/images/help/image-intelligence.jpg\" alt=\"Image Intelligence\" class=\"max-w-full h-auto\" />\n             </div>\n        </div>\n    </div>\n\n    <!-- Paper Section -->\n    <div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\">\n        <h4 class=\"text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200\">\n            FUJICOLOR CRYSTAL ARCHIVE PAPER\n        </h4>\n        \n        <div class=\"flex flex-col md:flex-row gap-8\">\n            <div class=\"w-full md:w-1/4 flex-shrink-0\">\n                <div class=\"bg-white p-2 rounded-xl border border-slate-200 shadow-sm rotate-1 hover:rotate-0 transition-transform duration-300\">\n                    <img src=\"/images/help/crystalarhive.jpg\" alt=\"Fujicolor Paper\" class=\"w-full h-auto rounded\" />\n                </div>\n            </div>\n            <div class=\"flex-1\">\n                <p class=\"font-bold text-lg mb-2 text-slate-800\">\n                    Professional quality for amateur photography.\n                </p>\n                <p class=\"text-slate-600 mb-4 italic\">\n                    High color stability, high paper whiteness, pure colors, accurate color reproduction.\n                </p>\n                <p class=\"mb-6 text-justify\">\n                    <b>FUJICOLOR CRYSTAL ARCHIVE PAPER</b> is a silver halide color photo paper designed to create high-quality color prints. It is created based on new layer technology for improved color reproduction and pure white color.\n                </p>\n\n                <div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Vivid Colors</h5>\n                        <p class=\"text-xs text-slate-600\">Preserves magnificent colors, delicate green shades, bright blues and reds.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Perfect White</h5>\n                        <p class=\"text-xs text-slate-600\">Brilliant white reproduction and improved detail in highlights.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Durability</h5>\n                        <p class=\"text-xs text-slate-600\">Excellent image stability. Does not fade during long-term storage.</p>\n                    </div>\n                    <div class=\"bg-white p-4 rounded-lg border border-slate-100 shadow-sm\">\n                        <h5 class=\"font-bold text-[#009846] mb-1\">Robustness</h5>\n                        <p class=\"text-xs text-slate-600\">Insensitivity to mechanical impacts.</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n                        "
          }
        ]
      }
    ]
  }
];

async function main() {
  console.log('Starting seed...');

  // 1. Settings
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log('Seeded Settings');

  // 2. Translations
  for (const t of translations) {
    await prisma.translation.upsert({
      where: { lang_key: { lang: t.lang, key: t.key } },
      update: { value: t.value },
      create: { lang: t.lang, key: t.key, value: t.value },
    });
  }
  console.log('Seeded Translations');

  // 3. Pages
  for (const p of pages) {
    const { id, ...data } = p;
    await prisma.page.upsert({
      where: { slug_lang: { slug: p.slug, lang: p.lang } },
      update: data,
      create: data,
    });
  }
  console.log('Seeded Pages');

  // 4. Quantity Tiers (needed for discounts)
  for (const q of quantityTiers) {
    const { id, discounts, ...data } = q;
    await prisma.quantityTier.upsert({
      where: { id: q.id },
      update: data,
      create: { ...data, id: q.id },
    });
  }

  // 5. Print Sizes & Discounts
  for (const ps of printSizes) {
    const { id, discounts, ...data } = ps;
    await prisma.printSize.upsert({
      where: { slug: ps.slug },
      update: data,
      create: { ...data, id: ps.id },
    }); // Upsert size by slug

    // Re-create discounts (simplest way: delete existing for size and re-add)
    // Or upsert map. Since logic is complex, deleting old discounts for size is safer during seed.
    // However, explicit IDs help.
    if (discounts && discounts.length > 0) {
        for(const d of discounts) {
             // We need to link by tierId/printSizeId
             // Since we upserted tiers and sizes with IDs, we can use them.
             await prisma.volumeDiscount.upsert({
                 where: { id: d.id },
                 update: {
                     minQuantity: d.minQuantity,
                     price: d.price,
                     tierId: d.tierId,
                     printSizeId: ps.id
                 },
                 create: {
                     minQuantity: d.minQuantity,
                     price: d.price,
                     tierId: d.tierId,
                     printSizeId: ps.id
                 }
             }).catch(() => {
                 // Fallback if ID conflict (unlikely) -> Create new
                  prisma.volumeDiscount.create({
                     data: {
                         minQuantity: d.minQuantity,
                         price: d.price,
                         tierId: d.tierId,
                         printSizeId: ps.id
                     }
                  });
             });
        }
    }
  }
  console.log('Seeded Print Sizes & Discounts');

  // 6. Print Options
  for (const o of printOptions) {
    const { id, ...data } = o;
    await prisma.printOption.upsert({
      where: { slug: o.slug },
      update: data,
      create: data,
    });
  }

  // 7. Magnet Prices
  for (const mp of magnetPrices) {
    const { id, ...data } = mp;
    // No unique constraint on sizeSlug easily visible other than ID.
    // We'll upsert by ID if preserved, or create if not exist?
    // Let's usert by ID.
    await prisma.magnetPrice.upsert({
      where: { id: mp.id },
      update: data,
      create: { ...data, id: mp.id },
    });
  }

  // 8. Delivery Options
  for (const d of deliveryOptions) {
    const { id, ...data } = d;
    await prisma.deliveryOption.upsert({
      where: { slug: d.slug },
      update: data,
      create: data,
    });
  }

  // 9. Products
  for (const p of products) {
    const { id, ...data } = p;
    await prisma.product.upsert({
      where: { id: p.id },
      update: data,
      create: { ...data, id: p.id },
    });
  }
  console.log('Seeded Products & Configs');

  // 10. Help Center
  for (const cat of helpCategories) {
    const { id, translations, articles, ...catData } = cat;
    
    // Upsert Category
    const createdCat = await prisma.helpCategory.upsert({
      where: { slug: cat.slug },
      update: catData,
      create: catData,
    });

    // Category Translations
    for (const tr of translations) {
        const { id: trId, helpCategoryId, ...trData } = tr;
        await prisma.helpCategoryTranslation.upsert({
            where: { helpCategoryId_lang: { helpCategoryId: createdCat.id, lang: tr.lang } },
            update: trData,
            create: { ...trData, helpCategoryId: createdCat.id }
        });
    }

    // Articles
    for (const art of articles) {
         const { id: artId, translations: artTrans, helpCategoryId: ignored, ...artData } = art;
         const createdArt = await prisma.helpArticle.upsert({
            where: { slug: art.slug },
            update: { ...artData, helpCategoryId: createdCat.id },
            create: { ...artData, helpCategoryId: createdCat.id },
         });

         // Article Translations
         for (const at of artTrans) {
            const { id: atId, helpArticleId, ...atData } = at;
            await prisma.helpArticleTranslation.upsert({
                where: { helpArticleId_lang: { helpArticleId: createdArt.id, lang: at.lang } },
                update: atData,
                create: { ...atData, helpArticleId: createdArt.id }
            });
         }
    }
  }
  console.log('Seeded Help Center');

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
