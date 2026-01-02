-- Additional missing translation keys - Part 2
-- All translations include UK, RU, EN

-- TTN Modal translations
INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
('uk', 'admin.confirm_delete_ttn', 'Ви дійсно хочете видалити ТТН у системі Нової Пошти?'),
('ru', 'admin.confirm_delete_ttn', 'Вы действительно хотите удалить ТТН в системе Новой Почты?'),
('en', 'admin.confirm_delete_ttn', 'Are you sure you want to delete this TTN from Nova Poshta?'),

('uk', 'ttn.confirm_delete_sender', 'Видалити ці дані відправника?'),
('ru', 'ttn.confirm_delete_sender', 'Удалить эти данные отправителя?'),
('en', 'ttn.confirm_delete_sender', 'Delete this sender data?'),

('uk', 'ttn.success', 'ТТН успішно створено!'),
('ru', 'ttn.success', 'ТТН успешно создана!'),
('en', 'ttn.success', 'TTN created successfully!'),

('uk', 'ttn.error', 'Помилка'),
('ru', 'ttn.error', 'Ошибка'),
('en', 'ttn.error', 'Error'),

('uk', 'ttn.generation_error', 'Сталася помилка при генерації ТТН'),
('ru', 'ttn.generation_error', 'Произошла ошибка при генерации ТТН'),
('en', 'ttn.generation_error', 'Error generating TTN'),

('uk', 'ttn.no_recipients_found', 'За цим номером отримувачів не знайдено.'),
('ru', 'ttn.no_recipients_found', 'По этому номеру получателей не найдено.'),
('en', 'ttn.no_recipients_found', 'No recipients found for this number.'),

('uk', 'ttn.search_error', 'Помилка пошуку'),
('ru', 'ttn.search_error', 'Ошибка поиска'),
('en', 'ttn.search_error', 'Search error'),

('uk', 'ttn.fill_sender_data', 'Будь ласка, заповніть всі дані відправника'),
('ru', 'ttn.fill_sender_data', 'Пожалуйста, заполните все данные отправителя'),
('en', 'ttn.fill_sender_data', 'Please fill in all sender data'),

('uk', 'ttn.found', 'Знайдено'),
('ru', 'ttn.found', 'Найдено'),
('en', 'ttn.found', 'Found'),

('uk', 'ttn.persons', 'ос.'),
('ru', 'ttn.persons', 'чел.'),
('en', 'ttn.persons', 'person(s)'),

('uk', 'ttn.close', 'Закрити'),
('ru', 'ttn.close', 'Закрыть'),
('en', 'ttn.close', 'Close'),

('uk', 'ttn.select', 'Вибрати'),
('ru', 'ttn.select', 'Выбрать'),
('en', 'ttn.select', 'Select');

-- Verify count per language
SELECT lang, COUNT(*) as count FROM Translation GROUP BY lang;
