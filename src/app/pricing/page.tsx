"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Table } from "lucide-react";

export default function PricingPage() {
    const { t } = useTranslation();
    const [config, setConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            <header className="bg-primary-900 text-white py-20 mb-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">{t('nav.pricing')}</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto opacity-90">
                        {t('Professional photo printing with high-quality Fuji materials. Choose your size and options below.')}
                    </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-transparent" />
            </header>

            <div className="max-w-7xl mx-auto px-4 pb-24">
                {config?.sizes?.map((size: any) => (
                    <Card key={size.id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-slate-50 border-b border-slate-100">
                            <CardTitle className="flex justify-between items-center text-slate-900">
                                <span>{size.name}</span>
                                <span className="text-primary-600">{size.basePrice} ₴</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ul className="space-y-3">
                                {size.discounts?.map((d: any) => (
                                    <li key={d.minQuantity} className="flex justify-between items-center text-sm text-slate-600">
                                        <span>{d.minQuantity}+ {t('prints')}</span>
                                        <span className="font-semibold text-primary-700">{d.price} ₴</span>
                                    </li>
                                ))}
                                {size.discounts?.length === 0 && (
                                    <li className="text-sm text-slate-400 italic">No bulk discounts available for this size yet.</li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <section className="mt-20">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Table className="w-6 h-6 text-primary-600" />
                    {t('Extra Options')}
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">{t('Option')}</th>
                                <th className="px-6 py-4">{t('Price')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {config?.options?.map((opt: any) => (
                                <tr key={opt.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{opt.name}</td>
                                    <td className="px-6 py-4 text-primary-600 font-semibold">+{opt.price} ₴</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
