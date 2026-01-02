const fs = require('fs');

const oldData = JSON.parse(fs.readFileSync('old_translations.json', 'utf8').replace(/^\uFEFF/, ''));
const currentData = JSON.parse(fs.readFileSync('prisma/data/translations.json', 'utf8').replace(/^\uFEFF/, ''));

const getMap = (data) => data.reduce((acc, i) => { acc[i.key + ':' + i.lang] = i.value; return acc; }, {});

const oldMap = getMap(oldData);
const currentMap = getMap(currentData);

// Check benefits and checkout keys
const keysToCheck = oldData.map(i => i.key).filter(k => k.startsWith('checkout.') || k.startsWith('benefits.'));
const uniqueKeys = [...new Set(keysToCheck)];

console.log('--- Differences found: ---');
uniqueKeys.forEach(key => {
    ['uk', 'ru'].forEach(lang => {
        const id = key + ':' + lang;
        const oldVal = oldMap[id];
        const curVal = currentMap[id];

        // Show diff only if old value exists and is different (or current is missing)
        if (oldVal && (!curVal || oldVal !== curVal)) {
            console.log(`KEY: ${key} [${lang}]`);
            console.log('OLD:', oldVal);
            console.log('NEW:', curVal || '(MISSING)');
            console.log('-----------------------------------');
        }
    });
});
