"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, calculateItemPrice } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, clearCart, config } = useCartStore();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        deliveryAddress: "",
        deliveryMethod: "PICKUP",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const totalStats = items.reduce((acc, item) => {
        if (!config) return acc;
        const price = calculateItemPrice(item.options, config);
        return {
            total: acc.total + price.total,
            savings: acc.savings + price.savings
        };
    }, { total: 0, savings: 0 });

    const activeGift = config?.gifts
        ?.filter(g => totalStats.total >= g.minAmount)
        ?.sort((a, b) => b.minAmount - a.minAmount)[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            setPhoneError(t('checkout.phone_error'));
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload unique files
            const uploadedFilesMap = new Map<File, { server: string, original: string }>(); // File -> { server, original }
            const uniqueFiles = Array.from(new Set(items.map(i => i.file).filter(Boolean))) as File[];

            for (const file of uniqueFiles) {
                const formData = new FormData();
                formData.append("file", file);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                });

                if (!uploadRes.ok) throw new Error(`Upload failed for ${file.name}`);
                const { fileName, originalName } = await uploadRes.json();
                uploadedFilesMap.set(file, { server: fileName, original: originalName });
            }

            // 2. Create Order
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: formData,
                    items: items.map(item => {
                        const fileData = item.file ? uploadedFilesMap.get(item.file) : null;
                        return {
                            id: item.id,
                            options: item.options,
                            fileName: fileData?.original || item.file?.name,
                            serverFileName: fileData?.server,
                            priceSnapshot: config ? calculateItemPrice(item.options, config).unitPrice : 0,
                        };
                    }),
                    total: totalStats.total
                }),
            });

            if (!response.ok) throw new Error("Order failed");

            const data = await response.json();
            setOrderComplete(data.orderNumber);
            clearCart();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-6">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('checkout.order_confirmed')}</h2>
                    <p className="text-slate-600 mb-6">
                        Order <span className="font-mono font-medium text-slate-900">#{orderComplete}</span>
                    </p>
                    <Button onClick={() => router.push("/")} className="w-full">
                        {t('checkout.return_home')}
                    </Button>
                </Card>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <p className="text-slate-500 mb-4">{t('checkout.empty')}</p>
                <Link href="/upload">
                    <Button>{t('nav.upload')}</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/upload" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> {t('checkout.back')}
                </Link>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('checkout.shipping_contact')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('checkout.name')}</label>
                                            <Input
                                                required
                                                placeholder={t('checkout.name')}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('checkout.phone')}</label>
                                            <Input
                                                required
                                                type="tel"
                                                placeholder="+380..."
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (phoneError) setPhoneError(null);
                                                }}
                                                className={phoneError ? "border-red-500 focus-visible:ring-red-500" : ""}
                                            />
                                            {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('checkout.email')}</label>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">{t('checkout.delivery_method')}</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, deliveryMethod: "PICKUP" })}
                                                className={`p-4 border rounded-lg text-center transition-colors ${formData.deliveryMethod === "PICKUP"
                                                    ? "border-primary-600 bg-primary-50 text-primary-900 font-medium"
                                                    : "border-slate-200 hover:border-slate-300"
                                                    }`}
                                            >
                                                {t('checkout.pickup')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, deliveryMethod: "POST" })}
                                                className={`p-4 border rounded-lg text-center transition-colors ${formData.deliveryMethod === "POST"
                                                    ? "border-primary-600 bg-primary-50 text-primary-900 font-medium"
                                                    : "border-slate-200 hover:border-slate-300"
                                                    }`}
                                            >
                                                {t('checkout.novaposhta')}
                                            </button>
                                        </div>
                                    </div>

                                    {formData.deliveryMethod === "POST" && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">{t('checkout.address_branch')}</label>
                                            <Input
                                                required
                                                placeholder={t('checkout.address_branch')}
                                                value={formData.deliveryAddress}
                                                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                                            />
                                        </div>
                                    )}
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Application Summary */}
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('checkout.summary')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {items.map(item => (
                                        <div key={item.id} className="flex flex-col border-b border-slate-100 last:border-0 pb-2 mb-2">
                                            <div className="flex justify-between text-sm font-medium text-slate-900">
                                                <span>{item.options.size} {item.options.paper} x{item.options.quantity}</span>
                                                <span>{(config ? calculateItemPrice(item.options, config).total : 0).toFixed(2)} ₴</span>
                                            </div>
                                            {item.options.options?.border && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#009846]/10 text-[#009846] border border-[#009846]/20 uppercase">
                                                    {t('badge.border') || t('Border')}
                                                </span>
                                            )}
                                            {item.options.options?.magnetic && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-[#e31e24]/10 text-[#e31e24] border border-[#e31e24]/20 uppercase">
                                                    {t('badge.mag') || t('Magnet')}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    {activeGift && (
                                        <div className="flex justify-between text-sm font-medium text-green-600 bg-green-50 p-2 rounded border border-green-200">
                                            <span>{t('checkout.bonus')}: {activeGift.giftName}</span>
                                            <span>{t('checkout.free')}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="border-t pt-4 flex justify-between items-start">
                                    <span className="font-semibold text-lg mt-1">{t('checkout.total')}</span>
                                    <div className="text-right">
                                        <div className="font-bold text-xl text-primary-600">{totalStats.total.toFixed(2)} ₴</div>
                                        {totalStats.savings > 0 && (
                                            <div className="text-xs font-bold text-green-600 mt-1">
                                                {t('Saved')}: {totalStats.savings.toFixed(2)} ₴
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t('common.processing') || 'Processing...'}
                                        </>
                                    ) : (
                                        t('checkout.placeOrder')
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
