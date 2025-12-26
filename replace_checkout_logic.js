const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/checkout/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Define new grouped content logic
const newContent = `                                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                    {/* Grouped Items Summary */}
                                    {useMemo(() => {
                                        if (!config) return [];
                                        const groups = new Map();
                                        items.forEach(item => {
                                            const key = JSON.stringify({
                                                size: item.options.size,
                                                paper: item.options.paper,
                                                options: item.options.options || {}
                                            });
                                            if (!groups.has(key)) {
                                                groups.set(key, { 
                                                    count: 0, 
                                                    options: item.options, 
                                                    subtotal: 0 
                                                });
                                            }
                                            const group = groups.get(key);
                                            group.count += item.options.quantity;
                                            group.subtotal += calculateItemPrice(item.options, config).total;
                                        });
                                        return Array.from(groups.values());
                                    }, [items, config]).map((group: any, idx) => (
                                        <div key={idx} className="flex flex-col border-b border-slate-100 last:border-0 pb-3 mb-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-slate-900">
                                                        {t('Size')} {group.options.size}, {t(group.options.paper)}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {group.count} {t('pcs')}
                                                    </div>
                                                </div>
                                                <div className="font-bold">
                                                    {group.subtotal.toFixed(2)} {t('general.currency')}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {group.options.options?.border && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#009846]/10 text-[#009846] border border-[#009846]/20 uppercase">
                                                        {t('badge.border') || t('Border')}
                                                    </span>
                                                )}
                                                {group.options.options?.magnetic && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#e31e24]/10 text-[#e31e24] border border-[#e31e24]/20 uppercase">
                                                        {t('badge.mag') || t('Magnet')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>`;

// Find the block to replace. We look for the div wrapper and items.map
const startMarker = '<div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">';
const endMarker = '))}';
const endDivMarker = '</div>';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Start marker not found');
    process.exit(1);
}

// Find the closing div for this block.
// We know the structure: start marker -> items.map -> ... -> ))} -> </div>
// Let's find the closing div AFTER the start marker.
// Actually, using regex or finding the balanced closing div is hard.
// But we know the indentation of the closing div should be 32 spaces.
// Or we can just find the NEXT occurrence of `                                </div>` (32 spaces) after start marker.

// Let's rely on the structure we saw in view_file.
// It ends with `                                </div>` around line 440.

// Let's search for the substring that matches the OLD content structure roughly
const oldContentRegex = /<div className="space-y-2 max-h-\[500px\] overflow-y-auto pr-2">[\s\S]*?className="w-20 h-20[\s\S]*?<\/div>\s*<\/div>\s*\)\)\s*}/;
// Too complex regex.

// Let's just find the closing tag for the items.map block.
// It ends with `                                    ))}` followed by `                                </div>`.

const endBlockIndex = content.indexOf('                                </div>', startIndex);

if (endBlockIndex === -1) {
    console.error('End block not found');
    process.exit(1);
}

const fullEndIndex = endBlockIndex + '                                </div>'.length;

const before = content.substring(0, startIndex);
const after = content.substring(fullEndIndex);

const newFileContent = before + newContent + after;

fs.writeFileSync(filePath, newFileContent);
console.log('Successfully replaced content');
