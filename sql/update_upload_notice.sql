-- Update upload.all_default_notice with new text on all languages

UPDATE Translation SET value = 'Внимание! После загрузки на наш сайт все фото будут 10х15 Глянец. Измените если необходимо.' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'ru';

UPDATE Translation SET value = 'Увага! Після завантаження на наш сайт всі фото будуть 10х15 Глянець. Змініть якщо потрібно.' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'uk';

UPDATE Translation SET value = 'Note! After uploading to our site, all photos will be 10x15 Glossy. Change if needed.' 
WHERE `key` = 'upload.all_default_notice' AND lang = 'en';

-- Verify
SELECT `key`, lang, value FROM Translation WHERE `key` = 'upload.all_default_notice' ORDER BY lang;
