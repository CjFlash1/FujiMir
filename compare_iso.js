const { execSync } = require('child_process');
const fs = require('fs');

try {
    console.log('Reading from git...');
    // Increase maxBuffer to handle large JSON
    const oldDataRaw = execSync('git show d04538b:prisma/data/translations.json', { maxBuffer: 10 * 1024 * 1024 }).toString();
    const oldData = JSON.parse(oldDataRaw);

    // Read current directly
    const currentData = JSON.parse(fs.readFileSync('prisma/data/translations.json', 'utf8').replace(/^\uFEFF/, ''));

    const getMap = (data) => data.reduce((acc, i) => { acc[i.key + ':' + i.lang] = i.value; return acc; }, {});

    const oldMap = getMap(oldData);
    const currentMap = getMap(currentData);

    const keysToCheck = oldData.map(i => i.key).filter(k => k.startsWith('checkout.') || k.startsWith('benefits.'));
    const uniqueKeys = [...new Set(keysToCheck)];

    console.log('--- Differences found (Clean): ---');
    uniqueKeys.forEach(key => {
        ['uk', 'ru'].forEach(lang => {
            const id = key + ':' + lang;
            const oldVal = oldMap[id];
            const curVal = currentMap[id];

            if (oldVal && (!curVal || oldVal !== curVal)) {
                console.log(`KEY: ${key} [${lang}]`);
                console.log('OLD:', oldVal);
                console.log('NEW:', curVal || '(MISSING)');
                console.log('-----------------------------------');
            }
        });
    });

} catch (e) {
    console.error(e);
}
