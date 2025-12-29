"use client";

import { useCartStore, calculateItemPrice } from "@/lib/store";
import { Button } from "./ui/button";
import { X, Tag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";

export function ImageOptionsModal({ isOpen, onClose, currentOptions, onSave }: any) {
    const { config } = useCartStore();
    const { t } = useTranslation();
    const [opts, setOpts] = useState(currentOptions);

    useEffect(() => {
        setOpts(currentOptions);
    }, [currentOptions]);

    const handleOptionToggle = (slug: string) => {
        setOpts((prev: any) => ({
            ...prev,
            options: {
                ...prev.options,
                [slug]: !prev.options?.[slug]
            }
        }));
    };

    const priceInfo = useMemo(() => {
        if (!config || !opts) return { total: 0, savings: 0, unitPrice: 0 };
        return calculateItemPrice(opts, config);
    }, [opts, config]);

    if (!isOpen) return null;
    if (!config) return <div>{t('Loading...')}</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">{t('Print Settings')}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[60vh] sm:max-h-[70vh]">
                    {/* Size Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">{t('Size')}</label>
                        <div className="grid grid-cols-3 gap-2">
                            {config.sizes.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setOpts({ ...opts, size: s.name })}
                                    className={`py-2 px-3 text-sm border rounded-md transition-all ${opts.size === s.name
                                        ? "border-primary-600 bg-primary-50 text-primary-700 font-medium ring-1 ring-primary-600"
                                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                                        }`}
                                >
                                    {s.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Paper Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">{t('Paper Type')}</label>
                        <div className="flex gap-3">
                            {config.papers.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setOpts({ ...opts, paper: p.slug })}
                                    className={`flex-1 py-2 px-3 text-sm border rounded-md transition-all ${opts.paper === p.slug
                                        ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                                        }`}
                                >
                                    {t(p.name)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">{t('Quantity')}</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setOpts({ ...opts, quantity: Math.max(1, opts.quantity - 1) })}
                                className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-slate-50 text-lg"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                value={opts.quantity}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setOpts({ ...opts, quantity: isNaN(val) ? 1 : Math.max(1, val) });
                                }}
                                className="w-20 h-10 border rounded-md text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-600"
                            />
                            <button
                                onClick={() => setOpts({ ...opts, quantity: opts.quantity + 1 })}
                                className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-slate-50 text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Additional Options (Cropping) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-700">{t('image_options.additional', 'Дополнительно')}</label>
                            <a
                                href="/p/help/why-cropped#examples"
                                target="_blank"
                                className="text-slate-400 hover:text-primary-600 transition-colors"
                                title={t("What is this?")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
                            </a>
                        </div>
                        <select
                            className="w-full p-2.5 border rounded-md text-sm bg-white focus:ring-2 focus:ring-primary-500 outline-none"
                            value={opts.cropping || 'fill'}
                            onChange={(e) => setOpts({ ...opts, cropping: e.target.value as any })}
                        >
                            <option value="fill">{t('image_options.free_cropping', 'Free Cropping (Произвольная обрезка)')}</option>
                            <option value="fit">{t('image_options.fit_in', 'Не обрезать (FIT-IN)')}</option>
                            <option value="no_resize">{t('image_options.no_resize', 'Без масштабирования (NO-RESIZE)')}</option>
                        </select>
                    </div>

                    {/* Extra Options (Boolean toggles like Border/Magnet) */}
                    {config.options.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">{t('Extras')}</label>
                            <div className="flex flex-wrap gap-2">
                                {config.options.filter(opt => opt.slug !== "polaroid").map((opt) => {
                                    let displayPrice = opt.price;
                                    // Custom display logic for Magnet option
                                    if (opt.slug === 'magnetic' && config.magnetPrices) {
                                        const mp = config.magnetPrices.find(m => m.sizeSlug === opts.size);
                                        const sizeObj = config.sizes.find(s => s.name === opts.size);
                                        if (mp && sizeObj) {
                                            displayPrice = mp.price - sizeObj.basePrice;
                                        }
                                    }

                                    const showPrice = displayPrice > 0 && opt.slug !== 'magnetic';

                                    return (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleOptionToggle(opt.slug)}
                                            className={`py-1.5 px-3 text-sm border rounded-full transition-all ${opts.options?.[opt.slug]
                                                ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-medium"
                                                : "border-slate-200 hover:border-slate-300 text-slate-600"
                                                }`}
                                        >
                                            {t(opt.name)} {showPrice ? `(+${displayPrice.toFixed(0)} ${t('general.currency')})` : ''}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </div>

                <div className="p-4 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
                    <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
                    <Button onClick={() => onSave(opts)}>{t('Save Changes')}</Button>
                </div>
            </div>
        </div>
    );
}
