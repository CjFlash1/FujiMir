const fs = require('fs');

// Read old translations (backup)
let content = fs.readFileSync('old_translations.json', 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}
const oldData = JSON.parse(content);

// Keys that I added/modified during this session (from sql files)
const modifiedKeys = [
    'upload.show_more',
    'upload.photos',
    'upload.shown',
    'upload.of',
    'admin.photo_sizes',
    'admin.paper_type',
    'admin.options_title',
    'admin.final',
    'admin.total_photos',
    'admin.file',
    'admin.parameters',
    'admin.copies',
    'admin.download_jpg',
    'checkout.total',
    'pricing.delivery',
    'pcs',
    'Magnetic',
    'Border',
    'Select Files',
    'Drag & drop photos here, or click to select'
];

console.log('=== COMPARING TRANSLATIONS ===\n');
console.log('Keys that exist in BOTH old backup and new DB:\n');

let changedCount = 0;

modifiedKeys.forEach(key => {
    const oldItems = oldData.filter(t => t.key === key);
    if (oldItems.length > 0) {
        console.log(`KEY: ${key}`);
        oldItems.forEach(item => {
            console.log(`  OLD [${item.lang}]: ${item.value}`);
        });
        console.log('');
        changedCount++;
    }
});

console.log(`\nFound ${changedCount} keys that exist in backup and may need restoration.`);
