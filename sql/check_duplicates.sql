SELECT * FROM Translation WHERE 
value LIKE '%Видалити%' OR 
value LIKE '%Удалить%' OR 
value LIKE '%Remove%' OR 
value LIKE '%Cancel%' OR 
value LIKE '%Отмена%' OR
value LIKE '%Скасувати%'
ORDER BY value;
