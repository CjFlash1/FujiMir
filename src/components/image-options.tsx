"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
// import type { PrintOptions } from "@/lib/store"; // We'll infer or import

export function ImageOptionsModal({ isOpen, onClose, currentOptions, onSave }: any) {
    const { config } = useCartStore();
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

    if (!isOpen) return null;
    if (!config) return <div>Loading options...</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Print Settings</h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Size Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Size</label>
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
                        <label className="text-sm font-medium text-slate-700">Paper Type</label>
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
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-slate-700">Quantity</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setOpts({ ...opts, quantity: Math.max(1, opts.quantity - 1) })}
                                className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-slate-50 text-lg"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">{opts.quantity}</span>
                            <button
                                onClick={() => setOpts({ ...opts, quantity: opts.quantity + 1 })}
                                className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-slate-50 text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Extra Options */}
                    {config.options.length > 0 && (
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Extras</label>
                            <div className="flex flex-wrap gap-2">
                                {config.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleOptionToggle(opt.slug)}
                                        className={`py-1.5 px-3 text-sm border rounded-full transition-all ${opts.options?.[opt.slug]
                                                ? "border-emerald-600 bg-emerald-50 text-emerald-700 font-medium"
                                                : "border-slate-200 hover:border-slate-300 text-slate-600"
                                            }`}
                                    >
                                        {opt.name} (+{opt.price} ₴)
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                <div className="p-4 border-t bg-slate-50 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSave(opts)}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
