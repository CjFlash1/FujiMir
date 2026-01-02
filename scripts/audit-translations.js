/**
 * Translation Audit Script
 * Finds:
 * 1. Used translation keys in code
 * 2. Keys in database
 * 3. Missing keys (used but not in DB)
 * 4. Unused keys (in DB but not used)
 */

const fs = require('fs');
const path = require('path');

// Extract translation keys from source code
function extractKeysFromCode(dir) {
    const keys = new Set();
    const pattern = /t\(['"]([^'"]+)['"]/g;

    function walkDir(directory) {
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
                walkDir(fullPath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    keys.add(match[1]);
                }
            }
        }
    }

    walkDir(dir);
    return keys;
}

// Load keys from old_translations.json
function loadOldTranslations(filePath) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const keys = new Set();
        data.forEach(t => keys.add(t.key));
        return keys;
    } catch (e) {
        console.log('⚠️ Could not load old_translations.json:', e.message);
        return new Set();
    }
}

// Main
const srcDir = path.join(__dirname, '..', 'src');
const oldTransPath = path.join(__dirname, '..', 'old_translations.json');

console.log('🔍 Extracting translation keys from source code...\n');
const usedKeys = extractKeysFromCode(srcDir);

console.log(`📊 Found ${usedKeys.size} unique translation keys in code:\n`);

// Categorize keys
const categories = {};
usedKeys.forEach(key => {
    const prefix = key.split('.')[0] || 'general';
    if (!categories[prefix]) categories[prefix] = [];
    categories[prefix].push(key);
});

Object.keys(categories).sort().forEach(cat => {
    console.log(`\n=== ${cat.toUpperCase()} (${categories[cat].length}) ===`);
    categories[cat].sort().forEach(k => console.log(`  ${k}`));
});

// Load old translations for comparison
console.log('\n\n🔄 Comparing with old_translations.json...\n');
const oldKeys = loadOldTranslations(oldTransPath);

console.log(`📚 Found ${oldKeys.size} keys in old_translations.json\n`);

// Find missing (used but not in old DB)
const missing = [...usedKeys].filter(k => !oldKeys.has(k));
if (missing.length > 0) {
    console.log(`\n❌ MISSING KEYS (${missing.length}) - Used in code but not in backup:\n`);
    missing.sort().forEach(k => console.log(`  - ${k}`));
}

// Find potentially unused (in DB but not used in code)
const unused = [...oldKeys].filter(k => !usedKeys.has(k));
if (unused.length > 0) {
    console.log(`\n⚠️ POTENTIALLY UNUSED KEYS (${unused.length}) - In backup but not found in code:`);
    console.log('  (Note: Some may be dynamically used)\n');
    unused.sort().forEach(k => console.log(`  - ${k}`));
}

// Find hardcoded Ukrainian text that should be keys
console.log('\n\n🔍 Searching for potential hardcoded text...\n');
const hardcodedPattern = />\s*[А-Яа-яІіЇїЄєЄёЁ][А-Яа-яІіЇїЄєЄёЁ\s]+</g;

function findHardcoded(directory) {
    const issues = [];

    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
                walkDir(fullPath);
            } else if (file.endsWith('.tsx')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const lines = content.split('\n');
                lines.forEach((line, idx) => {
                    // Skip imports and comments
                    if (line.trim().startsWith('//') || line.trim().startsWith('import')) return;

                    // Look for Cyrillic text in JSX
                    const match = line.match(/>\s*([А-Яа-яІіЇїЄєЄёЁ][А-Яа-яІіЇїЄєЄёЁ\s]{3,})</);
                    if (match) {
                        issues.push({
                            file: fullPath.replace(srcDir, 'src'),
                            line: idx + 1,
                            text: match[1].trim()
                        });
                    }

                    // Also check t() calls with Ukrainian default values
                    const tMatch = line.match(/t\(['"][^'"]+['"]\s*,\s*['"]([^'"]+)['"]\)/);
                    if (tMatch && /[А-Яа-яІіЇїЄє]/.test(tMatch[1])) {
                        issues.push({
                            file: fullPath.replace(srcDir, 'src'),
                            line: idx + 1,
                            text: `t() default: "${tMatch[1]}"`
                        });
                    }
                });
            }
        }
    }

    walkDir(directory);
    return issues;
}

const hardcoded = findHardcoded(srcDir);
if (hardcoded.length > 0) {
    console.log(`Found ${hardcoded.length} potential hardcoded strings:\n`);
    hardcoded.forEach(h => {
        console.log(`  📍 ${h.file}:${h.line}`);
        console.log(`     "${h.text}"\n`);
    });
}

console.log('\n✅ Audit complete!');
