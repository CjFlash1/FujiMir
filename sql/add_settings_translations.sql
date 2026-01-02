-- Additional missing translation keys - Part 3
-- Settings page and remaining admin translations

INSERT IGNORE INTO Translation (lang, `key`, value) VALUES
-- Settings NP validation
('uk', 'settings.np_valid', 'Ключ API дійсний!'),
('ru', 'settings.np_valid', 'Ключ API действителен!'),
('en', 'settings.np_valid', 'API key is valid!'),

('uk', 'settings.np_invalid', 'Недійсний ключ'),
('ru', 'settings.np_invalid', 'Недействительный ключ'),
('en', 'settings.np_invalid', 'Invalid key'),

('uk', 'settings.np_check_error', 'Помилка перевірки'),
('ru', 'settings.np_check_error', 'Ошибка проверки'),
('en', 'settings.np_check_error', 'Verification error'),

('uk', 'settings.np_validate', 'Перевірити ключ'),
('ru', 'settings.np_validate', 'Проверить ключ'),
('en', 'settings.np_validate', 'Validate key'),

-- Admin TTN actions
('uk', 'admin.ttn_deleted', 'ТТН видалено'),
('ru', 'admin.ttn_deleted', 'ТТН удалена'),
('en', 'admin.ttn_deleted', 'TTN deleted'),

('uk', 'admin.ttn_delete_error', 'Помилка при видаленні ТТН'),
('ru', 'admin.ttn_delete_error', 'Ошибка при удалении ТТН'),
('en', 'admin.ttn_delete_error', 'Error deleting TTN');

-- Verify count per language
SELECT lang, COUNT(*) as count FROM Translation GROUP BY lang;
