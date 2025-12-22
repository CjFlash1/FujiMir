"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types corresponding to what the user needs
export type PrintSize = "10x15" | "13x18" | "15x21" | "20x30" | "30x40" | "A4" | "A3";
export type PaperType = "Glossy" | "Matte" | "Silk" | "Metallic";

export interface PhotoOptions {
    quantity: number;
    size: PrintSize;
    paper: PaperType;
    autoEnhance: boolean;
}

interface ImageOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (options: PhotoOptions) => void;
    currentOptions: PhotoOptions;
}

export function ImageOptionsModal({ isOpen, onClose, onSave, currentOptions }: ImageOptionsModalProps) {
    const [options, setOptions] = useState<PhotoOptions>(currentOptions);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-lg">Print Options</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Size Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Print Size</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["10x15", "13x18", "15x21", "20x30", "30x40", "A4"] as PrintSize[]).map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setOptions({ ...options, size })}
                                    className={`px-3 py-2 text-sm rounded-md border ${options.size === size
                                            ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Paper Type */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Paper Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(["Glossy", "Matte"] as PaperType[]).map((paper) => (
                                <button
                                    key={paper}
                                    onClick={() => setOptions({ ...options, paper })}
                                    className={`px-3 py-2 text-sm rounded-md border ${options.paper === paper
                                            ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                                            : "border-slate-200 hover:border-slate-300 text-slate-600"
                                        }`}
                                >
                                    {paper}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Quantity</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setOptions({ ...options, quantity: Math.max(1, options.quantity - 1) })}
                                className="w-10 h-10 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                            >
                                -
                            </button>
                            <span className="text-lg font-medium w-12 text-center">{options.quantity}</span>
                            <button
                                onClick={() => setOptions({ ...options, quantity: options.quantity + 1 })}
                                className="w-10 h-10 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Auto Enhance */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                            <div className="font-medium text-sm text-slate-900">Auto-Enhance</div>
                            <div className="text-xs text-slate-500">Improve color & contrast</div>
                        </div>
                        <button
                            onClick={() => setOptions({ ...options, autoEnhance: !options.autoEnhance })}
                            className={`w-11 h-6 rounded-full transition-colors relative ${options.autoEnhance ? "bg-primary-600" : "bg-slate-300"
                                }`}
                        >
                            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${options.autoEnhance ? "translate-x-5" : "translate-x-0"
                                }`} />
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t bg-slate-50 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={() => onSave(options)}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
