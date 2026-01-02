-- Restore original translation for upload.all_default_notice

UPDATE Translation SET value = 'Note: All uploaded photos are 10x15 Glossy (unless changed)' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'en';

UPDATE Translation SET value = 'Внимание! Все загруженные фото: 10x15 Глянцевая (если не изменено)' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'ru';

UPDATE Translation SET value = 'Увага! Всі завантажені фото: 10x15 Глянцевий (якщо не змінено)' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'uk';

-- Verify
SELECT `key`, lang, value FROM Translation WHERE `key` = 'upload.all_default_notice' ORDER BY lang;
