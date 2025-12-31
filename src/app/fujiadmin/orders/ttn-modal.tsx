"use client";

import { useState, useEffect } from "react";
import { X, Save, Trash2, Package, Loader2, Search, UserCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NovaPoshtaSelector } from "@/components/novaposhta-selector";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";

interface NPSender {
    id: number;
    name: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    cityRef: string;
    cityName: string;
    warehouseRef: string;
    warehouseName: string;
}

interface TTNModalProps {
    order: any;
    onClose: () => void;
    onSuccess: (ttn: string) => void;
}

export function TTNModal({ order, onClose, onSuccess }: TTNModalProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [senders, setSenders] = useState<NPSender[]>([]);
    const [loadingSenders, setLoadingSenders] = useState(true);

    // Form state
    const [weight, setWeight] = useState("0.1");
    const [width, setWidth] = useState("20");
    const [height, setHeight] = useState("2");
    const [length, setLength] = useState("30");
    const [payerType, setPayerType] = useState("Recipient");

    const [senderFirstName, setSenderFirstName] = useState("");
    const [senderLastName, setSenderLastName] = useState("");
    const [senderPhone, setSenderPhone] = useState("");
    const [senderCityRef, setSenderCityRef] = useState("");
    const [senderWarehouseRef, setSenderWarehouseRef] = useState("");
    const [senderAddressText, setSenderAddressText] = useState("");

    // Recipient state
    const [recipientFirstName, setRecipientFirstName] = useState(order.customerFirstName || "");
    const [recipientLastName, setRecipientLastName] = useState(order.customerLastName || "");
    const [recipientPhone, setRecipientPhone] = useState(order.customerPhone || "");
    const [recipientCityRef, setRecipientCityRef] = useState(order.recipientCityRef || "");
    const [recipientWarehouseRef, setRecipientWarehouseRef] = useState(order.recipientWarehouseRef || "");
    const [recipientAddressText, setRecipientAddressText] = useState(order.deliveryAddress || "");

    const [isSavingSender, setIsSavingSender] = useState(false);

    useEffect(() => {
        fetchSenders();
        const savedPhone = localStorage.getItem('lastSenderPhone');
        if (savedPhone) setSenderPhone(savedPhone);
    }, []);

    const fetchSenders = async () => {
        try {
            const res = await fetch("/api/novaposhta/senders");
            const data = await res.json();
            if (Array.isArray(data)) {
                setSenders(data);
                if (data.length > 0) {
                    applySender(data[0]);
                }
            } else {
                setSenders([]);
                console.error("API returned non-array data:", data);
            }
        } catch (e) {
            console.error("Failed to fetch senders", e);
            setSenders([]);
        } finally {
            setLoadingSenders(false);
        }
    };

    const [selectedSenderId, setSelectedSenderId] = useState<number | null>(null);

    const applySender = (sender: NPSender) => {
        setSelectedSenderId(sender.id);
        setSenderFirstName(sender.firstName || "");
        setSenderLastName(sender.lastName || "");
        setSenderPhone(sender.phone);
        setSenderCityRef(sender.cityRef);
        setSenderWarehouseRef(sender.warehouseRef);
        setSenderAddressText(`${sender.cityName}, ${sender.warehouseName}`);
    };

    // Recipient Search State
    const [recipientVariants, setRecipientVariants] = useState<any[]>([]);
    const [isSearchingRecipient, setIsSearchingRecipient] = useState(false);
    const [selectedRecipientRef, setSelectedRecipientRef] = useState("");
    const [selectedContactRef, setSelectedContactRef] = useState("");

    const handleSearchRecipient = async () => {
        const cleanPhone = recipientPhone.replace(/\D/g, '');
        if (!cleanPhone || cleanPhone.length < 10) return;

        setIsSearchingRecipient(true);
        setRecipientVariants([]);
        try {
            const res = await fetch('/api/fujiadmin/novaposhta/search-recipient', {
                method: 'POST',
                body: JSON.stringify({ phone: cleanPhone })
            });
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                setRecipientVariants(data.results);
                toast.success(`Знайдено ${data.results.length} варіантів`);
            } else {
                toast.info("За цим номером отримувачів не знайдено.");
            }
        } catch (e) {
            console.error(e);
            toast.error("Помилка пошуку");
        } finally {
            setIsSearchingRecipient(false);
        }
    };

    const handleSelectRecipient = (variant: any) => {
        setRecipientFirstName(variant.firstName);
        setRecipientLastName(variant.lastName);
        setSelectedRecipientRef(variant.counterpartyRef);
        setSelectedContactRef(variant.ref);
        setRecipientVariants([]); // Hide list after selection
        toast.success(`Вибрано: ${variant.fullName}`);
    };

    const handleSaveSender = async () => {
        if (!senderFirstName || !senderLastName || !senderPhone || !senderCityRef || !senderWarehouseRef) {
            const missing = [];
            if (!senderFirstName) missing.push("Ім'я");
            if (!senderLastName) missing.push("Прізвище");
            if (!senderPhone) missing.push("Телефон");
            if (!senderCityRef) missing.push("Місто (Ref)");
            if (!senderWarehouseRef) missing.push("Відділення (Ref)");

            toast.error(`Будь ласка, заповніть всі дані відправника: ${missing.join(", ")}`);
            return;
        }
        setIsSavingSender(true);
        try {
            const cityName = senderAddressText.split(',')[0].trim();
            const warehouseName = senderAddressText.split(',').slice(1).join(',').trim();

            const res = await fetch("/api/novaposhta/senders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: senderFirstName,
                    lastName: senderLastName,
                    name: `${senderLastName} ${senderFirstName}`.trim(),
                    phone: senderPhone,
                    cityRef: senderCityRef,
                    cityName,
                    warehouseRef: senderWarehouseRef,
                    warehouseName
                })
            });
            if (res.ok) {
                fetchSenders();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSavingSender(false);
        }
    };

    const handleDeleteSender = async (id: number) => {
        if (!confirm("Видалити ці дані відправника?")) return;
        try {
            const res = await fetch(`/api/novaposhta/senders/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchSenders();
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Cost state
    const [declaredCost, setDeclaredCost] = useState(order.totalAmount?.toString() || "0");

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/fujiadmin/orders/${order.id}/ttn`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    weight: parseFloat(weight),
                    width: parseFloat(width),
                    height: parseFloat(height),
                    length: parseFloat(length),
                    senderFirstName,
                    senderLastName,
                    senderName: `${senderLastName} ${senderFirstName}`.trim(),
                    senderPhone,
                    senderCityRef,
                    senderWarehouseRef,
                    recipientFirstName,
                    recipientLastName,
                    recipientName: `${recipientLastName} ${recipientFirstName}`.trim(),
                    recipientPhone,
                    recipientCityRef,
                    recipientWarehouseRef,
                    cost: parseFloat(declaredCost),
                    payerType,
                    explicitRecipientRef: selectedRecipientRef || undefined,
                    explicitContactRef: selectedContactRef || undefined
                })
            });

            const data = await res.json();
            if (res.ok) {
                onSuccess(data.ttnNumber);
                toast.success('ТТН успішно створено!');
            } else {
                toast.error(`Помилка: ${data.error}\n${data.details?.join(', ') || ''}`);
            }
        } catch (e) {
            console.error(e);
            toast.error("Сталася помилка при генерації ТТН");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Package className="w-6 h-6 text-primary-600" />
                        {t('ttn.create_title', 'Створення ТТН (Нова Пошта)')}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Package Params */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-l-4 border-blue-500 pl-3">{t('ttn.package_params', 'Параметри посилки')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.p_weight', 'Вага (кг)')}</label>
                                <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} step="0.1" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.p_width', 'Ширина (см)')}</label>
                                <Input type="number" value={width} onChange={e => setWidth(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.p_height', 'Висота (см)')}</label>
                                <Input type="number" value={height} onChange={e => setHeight(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.p_length', 'Довжина (см)')}</label>
                                <Input type="number" value={length} onChange={e => setLength(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.p_cost', 'Оцінка (грн)')}</label>
                                <Input type="number" value={declaredCost} onChange={e => setDeclaredCost(e.target.value)} />
                            </div>
                        </div>

                        {/* Payer Selection */}
                        <div className="flex items-center gap-4 pt-2">
                            <label className="text-xs font-medium text-slate-500">{t('ttn.payer', 'Хто сплачує доставку:')}</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payerType"
                                        value="Recipient"
                                        checked={payerType === "Recipient"}
                                        onChange={() => setPayerType("Recipient")}
                                        className="text-primary-600"
                                    />
                                    {t('ttn.payer_recipient', 'Отримувач')}
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="payerType"
                                        value="Sender"
                                        checked={payerType === "Sender"}
                                        onChange={() => setPayerType("Sender")}
                                        className="text-primary-600"
                                    />
                                    {t('ttn.payer_sender', 'Відправник')}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-slate-800 border-l-4 border-orange-500 pl-3">{t('ttn.sender_section', 'Дані відправника')}</h3>
                            {senders.length > 0 && (
                                <div className="flex gap-2">
                                    <select
                                        className="text-xs border rounded px-2 py-1 bg-slate-50"
                                        onChange={(e) => {
                                            const s = senders.find(x => x.id === parseInt(e.target.value));
                                            if (s) applySender(s);
                                        }}
                                    >
                                        <option value="">{t('ttn.sender_select', 'Виберіть збереженого...')}</option>
                                        {senders.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.lastName} {s.firstName} | {s.phone} | {s.cityName} ({s.warehouseName})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.sender_lastname', 'Прізвище')}</label>
                                <Input value={senderLastName} onChange={e => setSenderLastName(e.target.value)} placeholder={t('ttn.sender_lastname')} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.sender_firstname', 'Ім\'я')}</label>
                                <Input value={senderFirstName} onChange={e => setSenderFirstName(e.target.value)} placeholder={t('ttn.sender_firstname')} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">{t('ttn.sender_phone', 'Телефон')}</label>
                            <Input
                                value={senderPhone}
                                onChange={e => {
                                    setSenderPhone(e.target.value);
                                    if (e.target.value.length >= 10) localStorage.setItem('lastSenderPhone', e.target.value);
                                }}
                                placeholder="380..."
                            />
                        </div>



                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">{t('ttn.sender_from', 'Звідки відправляємо')}</label>
                            <NovaPoshtaSelector
                                value={senderAddressText}
                                onChange={setSenderAddressText}
                                onRefsChange={(c, w) => {
                                    setSenderCityRef(c);
                                    setSenderWarehouseRef(w);
                                }}
                            />
                        </div>

                        <div className="flex justify-start gap-2 pt-2">
                            <Button
                                onClick={handleSaveSender}
                                disabled={isSavingSender}
                                variant="outline"
                                className="w-full text-green-600 border-green-200 hover:bg-green-50"
                            >
                                {isSavingSender && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {t('ttn.sender_save', 'Зберегти відправника')}
                            </Button>
                            {selectedSenderId && (
                                <Button
                                    onClick={() => handleDeleteSender(selectedSenderId)}
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    {t('ttn.sender_delete', 'Видалити')}
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-l-4 border-green-500 pl-3">{t('ttn.recipient_section', 'Дані отримувача')}</h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">{t('ttn.recipient_phone', 'Телефон')}</label>
                            <div className="flex gap-2 relative">
                                <Input
                                    value={recipientPhone}
                                    onChange={e => {
                                        setRecipientPhone(e.target.value);
                                        // Reset selection if phone changes significantly? 
                                        // For now, keep it simple, but usually one should reset if typing new number.
                                        if (selectedRecipientRef && e.target.value.replace(/\D/g, '') !== recipientPhone.replace(/\D/g, '')) {
                                            setSelectedRecipientRef("");
                                            setSelectedContactRef("");
                                            setRecipientVariants([]);
                                        }
                                    }}
                                    placeholder={t('ttn.search_placeholder', 'Телефон отримувача')}
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleSearchRecipient}
                                    disabled={isSearchingRecipient || !recipientPhone}
                                    title={t('ttn.validate_recipient', 'Знайти')}
                                    className="shrink-0"
                                >
                                    {isSearchingRecipient ? <Loader2 className="w-4 h-4 animate-spin text-primary-600" /> : <Search className="w-4 h-4 text-slate-600" />}
                                </Button>
                            </div>
                            {recipientVariants.length > 0 && (
                                <div className="mt-2 border border-slate-200 rounded-md bg-white shadow-sm max-h-40 overflow-y-auto">
                                    <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-100 flex justify-between items-center">
                                        <p className="text-xs font-medium text-slate-500">Знайдено {recipientVariants.length} ос.</p>
                                        <button onClick={() => setRecipientVariants([])} className="text-xs text-blue-500 hover:underline">Закрити</button>
                                    </div>
                                    {recipientVariants.map((v, i) => (
                                        <div
                                            key={i}
                                            className="p-3 text-sm hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex justify-between items-center group"
                                            onClick={() => handleSelectRecipient(v)}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800">{v.fullName}</span>
                                                <span className="text-xs text-slate-400">{v.phone}</span>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                                                Вибрати
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.recipient_lastname', 'Прізвище')}</label>
                                <Input value={recipientLastName} onChange={e => setRecipientLastName(e.target.value)} placeholder={t('ttn.recipient_lastname')} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">{t('ttn.recipient_firstname', 'Ім\'я')}</label>
                                <Input value={recipientFirstName} onChange={e => setRecipientFirstName(e.target.value)} placeholder={t('ttn.recipient_firstname')} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">{t('ttn.recipient_city', 'Куди відправляємо')}</label>
                        <NovaPoshtaSelector
                            value={recipientAddressText}
                            onChange={setRecipientAddressText}
                            onRefsChange={(c, w) => {
                                setRecipientCityRef(c);
                                setRecipientWarehouseRef(w);
                            }}
                        />
                    </div>

                    {(!recipientCityRef || !recipientWarehouseRef) && (
                        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-2 items-start">
                            <X className="w-4 h-4 text-amber-500 mt-0.5" />
                            <div className="text-xs text-amber-800">
                                <p className="font-bold">{t('ttn.attention_title', 'Увага!')}</p>
                                <p>{t('ttn.attention_desc', 'Вкажіть місто та відділення Нової Пошти за допомогою пошуку вище.')}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>{t('ttn.cancel_btn', 'Скасувати')}</Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !recipientCityRef || !senderCityRef}
                        className="bg-primary-600 hover:bg-primary-700 min-w-[150px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {t('ttn.loading', 'Очікуйте...')}
                            </>
                        ) : (
                            t('ttn.generate_btn', 'Сформувати ТТН')
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
