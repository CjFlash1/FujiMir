"use client";

import { useState, useEffect } from "react";
import { X, Save, Trash2, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NovaPoshtaSelector } from "@/components/novaposhta-selector";
import { useTranslation } from "@/lib/i18n";

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

    const applySender = (sender: NPSender) => {
        setSenderFirstName(sender.firstName || "");
        setSenderLastName(sender.lastName || "");
        setSenderPhone(sender.phone);
        setSenderCityRef(sender.cityRef);
        setSenderWarehouseRef(sender.warehouseRef);
        setSenderAddressText(`${sender.cityName}, ${sender.warehouseName}`);
    };

    const handleSaveSender = async () => {
        if (!senderFirstName || !senderLastName || !senderPhone || !senderCityRef || !senderWarehouseRef) {
            const missing = [];
            if (!senderFirstName) missing.push("Ім'я");
            if (!senderLastName) missing.push("Прізвище");
            if (!senderPhone) missing.push("Телефон");
            if (!senderCityRef) missing.push("Місто (Ref)");
            if (!senderWarehouseRef) missing.push("Відділення (Ref)");

            alert(`Будь ласка, заповніть всі дані відправника: ${missing.join(", ")}`);
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
                    cost: order.totalAmount,
                    payerType
                })
            });

            const data = await res.json();
            if (res.ok) {
                onSuccess(data.ttnNumber);
            } else {
                alert(`Помилка: ${data.error}\n${data.details?.join(', ') || ''}`);
            }
        } catch (e) {
            console.error(e);
            alert("Сталася помилка при генерації ТТН");
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
                        Створення ТТН (Нова Пошта)
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Package Params */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-l-4 border-blue-500 pl-3">Параметри посилки</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Вага (кг)</label>
                                <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} step="0.1" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Ширина (см)</label>
                                <Input type="number" value={width} onChange={e => setWidth(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Висота (см)</label>
                                <Input type="number" value={height} onChange={e => setHeight(e.target.value)} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Довжина (см)</label>
                                <Input type="number" value={length} onChange={e => setLength(e.target.value)} />
                            </div>
                        </div>

                        {/* Payer Selection */}
                        <div className="flex items-center gap-4 pt-2">
                            <label className="text-xs font-medium text-slate-500">Хто сплачує доставку:</label>
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
                                    Отримувач
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
                                    Відправник
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sender Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-slate-800 border-l-4 border-orange-500 pl-3">Дані відправника</h3>
                            {senders.length > 0 && (
                                <div className="flex gap-2">
                                    <select
                                        className="text-xs border rounded px-2 py-1 bg-slate-50"
                                        onChange={(e) => {
                                            const s = senders.find(x => x.id === parseInt(e.target.value));
                                            if (s) applySender(s);
                                        }}
                                    >
                                        <option value="">Виберіть збереженого...</option>
                                        {senders.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.cityName})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">Телефон</label>
                            <Input
                                value={senderPhone}
                                onChange={e => {
                                    setSenderPhone(e.target.value);
                                    if (e.target.value.length >= 10) localStorage.setItem('lastSenderPhone', e.target.value);
                                }}
                                placeholder="380..."
                            />
                        </div>

                        <div className="hidden">
                            {/* Hidden name inputs since they are ignored by API for PrivatePerson */}
                            <Input value={senderLastName} onChange={e => setSenderLastName(e.target.value)} />
                            <Input value={senderFirstName} onChange={e => setSenderFirstName(e.target.value)} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">Звідки відправляємо</label>
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
                                variant="outline"
                                size="sm"
                                onClick={handleSaveSender}
                                disabled={isSavingSender}
                                className="gap-2 text-xs"
                            >
                                <Save className="w-3.5 h-3.5" />
                                {isSavingSender ? 'Збереження...' : 'Зберегти ці дані'}
                            </Button>

                            {senders.some(s => s.phone === senderPhone) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        const s = senders.find(x => x.phone === senderPhone);
                                        if (s) handleDeleteSender(s.id);
                                    }}
                                    className="gap-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Видалити збережене
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Recipient Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-800 border-l-4 border-green-500 pl-3">Дані отримувача</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Прізвище отримувача</label>
                                <Input value={recipientLastName} onChange={e => setRecipientLastName(e.target.value)} placeholder="Прізвище" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-500">Ім'я отримувача</label>
                                <Input value={recipientFirstName} onChange={e => setRecipientFirstName(e.target.value)} placeholder="Ім'я" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-500">Телефон</label>
                            <Input value={recipientPhone} onChange={e => setRecipientPhone(e.target.value)} placeholder="380..." />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">Куди відправляємо</label>
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
                                <p className="font-bold">Увага!</p>
                                <p>Вкажіть місто та відділення Нової Пошти за допомогою пошуку вище.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Скасувати</Button>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !order.recipientCityRef || !senderCityRef}
                        className="bg-primary-600 hover:bg-primary-700 min-w-[150px]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Очікуйте...
                            </>
                        ) : (
                            'Сформувати ТТН'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
