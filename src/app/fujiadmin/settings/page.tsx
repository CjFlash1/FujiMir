"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, Globe, Phone, Mail, Instagram, Facebook, Search, Trash2, Clock, Package, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";

interface SettingItem {
    key: string;
    label: string;
    icon: any;
    placeholder?: string;
    type?: 'text' | 'boolean';
}

export default function SettingsPage() {
    const { t } = useTranslation();
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);

    // NP Validation State
    const [npValidating, setNpValidating] = useState(false);
    const [npValidationResult, setNpValidationResult] = useState<{ valid: boolean, ownerName?: string, city?: string, error?: string } | null>(null);

    const handleValidateNP = async (key: string) => {
        if (!key) return;
        setNpValidating(true);
        setNpValidationResult(null);
        try {
            const res = await fetch('/api/fujiadmin/settings/validate-np', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ apiKey: key })
            });
            const data = await res.json();
            setNpValidationResult(data);
            if (data.valid) {
                toast.success(t('settings.np_valid', 'Ключ дійсний'));
            } else {
                toast.error(t('settings.np_invalid', 'Невірний ключ') + ': ' + (data.error || 'Unknown error'));
            }
        } catch (e) {
            console.error(e);
            toast.error(t('settings.np_check_error', 'Помилка перевірки'));
        } finally {
            setNpValidating(false);
        }
    };

    const SETTING_GROUPS = [
        {
            title: t('settings.general'),
            description: t('settings.general_desc'),
            items: [
                { key: "site_name", label: t('settings.site_name'), icon: Globe, placeholder: "e.g. Fujimir Photo Center" },
                { key: "contact_email", label: t('settings.support_email'), icon: Mail, placeholder: "contact@fujimir.com.ua" },
                { key: "contact_phone1", label: t('settings.contact_phone1'), icon: Phone, placeholder: "+380..." },
                { key: "contact_phone2", label: t('settings.contact_phone2'), icon: Phone, placeholder: "+380..." },

                // Address (Multilingual)
                { key: "contact_address_uk", label: t('settings.contact_address') + " (UA)", icon: Globe, placeholder: "вул. Соборна..." },
                { key: "contact_address_ru", label: t('settings.contact_address') + " (RU)", icon: Globe, placeholder: "ул. Соборная..." },
                { key: "contact_address_en", label: t('settings.contact_address') + " (EN)", icon: Globe, placeholder: "Soborna St..." },

                // Schedule (Multilingual)
                { key: "contact_schedule_uk", label: t('settings.contact_schedule') + " (UA)", icon: Clock, placeholder: "Пн-Пт 9-18..." },
                { key: "contact_schedule_ru", label: t('settings.contact_schedule') + " (RU)", icon: Clock, placeholder: "Пн-Пт 9-18..." },
                { key: "contact_schedule_en", label: t('settings.contact_schedule') + " (EN)", icon: Clock, placeholder: "Mon-Fri 9-18..." },
            ]
        },
        {
            title: t('settings.branding'),
            description: t('settings.branding_desc'),
            items: [
                { key: "logo_suffix_uk", label: t('settings.logo_suffix_uk'), icon: Globe, placeholder: "FUJI-Світ" },
                { key: "logo_suffix_ru", label: t('settings.logo_suffix_ru'), icon: Globe, placeholder: "FUJI-Мир" },
                { key: "logo_suffix_en", label: t('settings.logo_suffix_en'), icon: Globe, placeholder: "FUJI-World" },
                { key: "logo_subtitle_uk", label: t('settings.logo_subtitle_uk'), icon: Globe, placeholder: "ФОТОЛАБ" },
                { key: "logo_subtitle_ru", label: t('settings.logo_subtitle_ru'), icon: Globe, placeholder: "ФОТОЛАБ" },
                { key: "logo_subtitle_en", label: t('settings.logo_subtitle_en'), icon: Globe, placeholder: "PHOTOLAB" },
            ]
        },
        {
            title: t('settings.social'),
            description: t('settings.social_desc'),
            items: [
                { key: "social_instagram", label: t('settings.instagram'), icon: Instagram, placeholder: "https://instagram.com/..." },
                { key: "social_facebook", label: t('settings.facebook'), icon: Facebook, placeholder: "https://facebook.com/..." },
            ]
        },
        {
            title: t('settings.messengers'),
            description: t('settings.messengers_desc'),
            items: [
                { key: "viber_link", label: t('settings.viber'), icon: Phone, placeholder: "viber://chat?number=..." },
                { key: "telegram_link", label: t('settings.telegram'), icon: Globe, placeholder: "https://t.me/..." },
                { key: "viber_active", label: t('settings.viber_active'), icon: Globe, type: 'boolean' as const },
                { key: "telegram_active", label: t('settings.telegram_active'), icon: Globe, type: 'boolean' as const },
            ]
        },
        {
            title: t('settings.analytics'),
            description: t('settings.analytics_desc'),
            items: [
                { key: "ga4_measurement_id", label: t('settings.ga4_measurement_id'), icon: Search, placeholder: "G-XXXXXXXXXX" },
                { key: "yandex_metrica_id", label: t('settings.yandex_metrica_id'), icon: Search, placeholder: "12345678" },
                { key: "facebook_pixel_id", label: t('settings.facebook_pixel_id'), icon: Search, placeholder: "1234567890" },
            ]
        },
        {
            title: t('settings.seo', 'SEO'),
            description: t('settings.seo_desc', 'Оптимизация для поисковиков'),
            items: [
                { key: "google_verification", label: t('settings.google_verification', 'Verification Google'), icon: Search, placeholder: "google-site-verification code" },
                { key: "yandex_verification", label: t('settings.yandex_verification', 'Verification Yandex'), icon: Search, placeholder: "yandex-verification code" },
                { key: "bing_verification", label: t('settings.bing_verification', 'Verification Bing'), icon: Search, placeholder: "msvalidate.01 code" },
            ]
        },
        {
            title: t('settings.integrations', 'Інтеграції та API'),
            description: t('settings.integrations_desc', 'Налаштування зовнішніх сервісів'),
            items: [
                { key: "novaposhta_api_key", label: t('settings.np_api_key', 'Ключ API Нової Пошти'), icon: Package, placeholder: "API Key" },
            ]
        }
    ];

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/fujiadmin/settings");
            const data = await res.json();
            const settingsMap = data.reduce((acc: any, curr: any) => {
                acc[curr.key] = curr.value;
                return acc;
            }, {});
            setSettings(settingsMap);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, value: string) => {
        setSaving(key);
        try {
            await fetch("/api/fujiadmin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value }),
            });
            // Brief delay for UX
            await new Promise(r => setTimeout(r, 500));
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold">{t('admin.settings')}</h1>

            {SETTING_GROUPS.map((group) => (
                <Card key={group.title}>
                    <CardHeader>
                        <CardTitle>{group.title}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {group.items.map((item) => (
                            <div key={item.key} className="space-y-2">
                                <label className="text-sm font-semibold flex items-center gap-2">
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                    {item.label}
                                </label>
                                <div className="flex gap-2">
                                    {item.type === 'boolean' ? (
                                        <div className="flex items-center gap-3 pt-1">
                                            <Switch
                                                checked={settings[item.key] === 'true'}
                                                onCheckedChange={(checked) => {
                                                    const val = checked ? 'true' : 'false';
                                                    setSettings((prev) => ({ ...prev, [item.key]: val }));
                                                    handleSave(item.key, val);
                                                }}
                                            />
                                            <span className={`text-xs font-bold uppercase tracking-wider ${settings[item.key] === 'true' ? 'text-green-600' : 'text-slate-400'}`}>
                                                {settings[item.key] === 'true' ? 'ON' : 'OFF'}
                                            </span>
                                            {saving === item.key && <Loader2 className="w-3 h-3 animate-spin text-slate-400 ml-2" />}
                                        </div>
                                    ) : (
                                        <>
                                            <Input
                                                placeholder={item.placeholder}
                                                value={settings[item.key] || ""}
                                                onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                                                className="flex-1"
                                            />
                                            <Button
                                                onClick={() => handleSave(item.key, settings[item.key])}
                                                disabled={saving === item.key}
                                                variant="outline"
                                                size="sm"
                                            >
                                                {saving === item.key ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Save className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </div>
                                {item.key === 'novaposhta_api_key' && (
                                    <div className="flex flex-wrap items-center gap-2 mt-1 px-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleValidateNP(settings[item.key])}
                                            disabled={npValidating || !settings[item.key]}
                                            className="text-xs h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        >
                                            {npValidating ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                                            {t('settings.np_validate', 'Перевірити ключ')}
                                        </Button>

                                        {npValidationResult && (
                                            <div className={`text-xs px-2 py-1 rounded-md flex items-center gap-1.5 animate-in fade-in transition-all ${npValidationResult.valid ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                                                {npValidationResult.valid ? <CheckCircle className="w-3 h-3 text-green-600" /> : <XCircle className="w-3 h-3 text-red-600" />}
                                                {npValidationResult.valid ? (
                                                    <span className="flex items-center gap-1">
                                                        <span className="font-bold">{npValidationResult.ownerName}</span>
                                                        {npValidationResult.city && <span className="opacity-75 text-[10px] uppercase tracking-wide ml-1">({npValidationResult.city})</span>}
                                                    </span>
                                                ) : (
                                                    <span>{npValidationResult.error || t('ttn.error')}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
