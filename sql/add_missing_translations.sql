-- Missing Translation Keys SQL Script
-- Generated from inspection on 2026-01-01
-- Run this in MySQL/MariaDB to add missing keys

-- Upload page keys
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'upload.show_more', 'Показати ще'),
('ru', 'upload.show_more', 'Показать ещё'),
('en', 'upload.show_more', 'Show more'),
('uk', 'upload.photos', 'фото'),
('ru', 'upload.photos', 'фото'),
('en', 'upload.photos', 'photos'),
('uk', 'upload.shown', 'Показано'),
('ru', 'upload.shown', 'Показано'),
('en', 'upload.shown', 'Shown'),
('uk', 'upload.of', 'з'),
('ru', 'upload.of', 'из'),
('en', 'upload.of', 'of');

-- Admin panel keys
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'admin.photo_sizes', 'Розміри фото'),
('ru', 'admin.photo_sizes', 'Размеры фото'),
('en', 'admin.photo_sizes', 'Photo Sizes'),
('uk', 'admin.paper_type', 'Тип паперу'),
('ru', 'admin.paper_type', 'Тип бумаги'),
('en', 'admin.paper_type', 'Paper Type'),
('uk', 'admin.options_title', 'Опції'),
('ru', 'admin.options_title', 'Опции'),
('en', 'admin.options_title', 'Options'),
('uk', 'admin.final', 'Фінал'),
('ru', 'admin.final', 'Итого'),
('en', 'admin.final', 'Final'),
('uk', 'admin.total_photos', 'Всього фото'),
('ru', 'admin.total_photos', 'Всего фото'),
('en', 'admin.total_photos', 'Total photos'),
('uk', 'admin.file', 'Файл'),
('ru', 'admin.file', 'Файл'),
('en', 'admin.file', 'File'),
('uk', 'admin.parameters', 'Параметри'),
('ru', 'admin.parameters', 'Параметры'),
('en', 'admin.parameters', 'Parameters'),
('uk', 'admin.copies', 'Тираж'),
('ru', 'admin.copies', 'Тираж'),
('en', 'admin.copies', 'Copies'),
('uk', 'admin.download_jpg', 'Завантажити JPG'),
('ru', 'admin.download_jpg', 'Скачать JPG'),
('en', 'admin.download_jpg', 'Download JPG');

-- Checkout keys
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'checkout.total', 'Разом'),
('ru', 'checkout.total', 'Итого'),
('en', 'checkout.total', 'Total'),
('uk', 'checkout.free', 'Безкоштовно'),
('ru', 'checkout.free', 'Бесплатно'),
('en', 'checkout.free', 'Free'),
('uk', 'checkout.pickup', 'Самовивіз'),
('ru', 'checkout.pickup', 'Самовывоз'),
('en', 'checkout.pickup', 'Pickup'),
('uk', 'checkout.local', 'Доставка по м. Дніпро'),
('ru', 'checkout.local', 'Доставка по г. Днепр'),
('en', 'checkout.local', 'Delivery in Dnipro'),
('uk', 'checkout.novaposhta', 'Нова Пошта'),
('ru', 'checkout.novaposhta', 'Новая Почта'),
('en', 'checkout.novaposhta', 'Nova Poshta');

-- Status keys
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'admin.status.draft', 'Чернетка'),
('ru', 'admin.status.draft', 'Черновик'),
('en', 'admin.status.draft', 'Draft'),
('uk', 'admin.status.pending', 'Очікує'),
('ru', 'admin.status.pending', 'Ожидает'),
('en', 'admin.status.pending', 'Pending'),
('uk', 'admin.status.processing', 'В обробці'),
('ru', 'admin.status.processing', 'В обработке'),
('en', 'admin.status.processing', 'Processing'),
('uk', 'admin.status.completed', 'Виконано'),
('ru', 'admin.status.completed', 'Выполнено'),
('en', 'admin.status.completed', 'Completed'),
('uk', 'admin.status.cancelled', 'Скасовано'),
('ru', 'admin.status.cancelled', 'Отменено'),
('en', 'admin.status.cancelled', 'Cancelled'),
('uk', 'admin.status_updated', 'Статус оновлено'),
('ru', 'admin.status_updated', 'Статус обновлён'),
('en', 'admin.status_updated', 'Status updated'),
('uk', 'admin.status_update_failed', 'Не вдалося оновити статус'),
('ru', 'admin.status_update_failed', 'Не удалось обновить статус'),
('en', 'admin.status_update_failed', 'Failed to update status');

-- Misc keys
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'pcs', 'шт.'),
('ru', 'pcs', 'шт.'),
('en', 'pcs', 'pcs'),
('uk', 'gift.promo_text', 'При замовленні від {amount} грн — безкоштовна доставка або магніт на вибір!'),
('ru', 'gift.promo_text', 'При заказе от {amount} грн — бесплатная доставка или магнит на выбор!'),
('en', 'gift.promo_text', 'With orders over {amount} UAH — free delivery or magnet of your choice!'),
('uk', 'gift.select_required', 'Будь ласка, виберіть подарунок'),
('ru', 'gift.select_required', 'Пожалуйста, выберите подарок'),
('en', 'gift.select_required', 'Please select a gift'),
('uk', 'error.missing_files_refresh', 'Деякі файли втрачено через оновлення сторінки. Поверніться і додайте їх знову.'),
('ru', 'error.missing_files_refresh', 'Некоторые файлы потеряны из-за обновления страницы. Вернитесь и добавьте их снова.'),
('en', 'error.missing_files_refresh', 'Some files were lost due to page refresh. Please go back and re-add them.'),
('uk', 'common.processing', 'Обробка...'),
('ru', 'common.processing', 'Обработка...'),
('en', 'common.processing', 'Processing...'),
('uk', 'badge.mag', 'Магн'),
('ru', 'badge.mag', 'Магн'),
('en', 'badge.mag', 'Mag'),
('uk', 'badge.border', 'Рамка'),
('ru', 'badge.border', 'Рамка'),
('en', 'badge.border', 'Border'),
('uk', 'validation.invalid_email', 'Введіть коректну електронну адресу'),
('ru', 'validation.invalid_email', 'Введите корректный email'),
('en', 'validation.invalid_email', 'Please enter a valid email');

-- Verify count
SELECT lang, COUNT(*) as count FROM Translation GROUP BY lang;
