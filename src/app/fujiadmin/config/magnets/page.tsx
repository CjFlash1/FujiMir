"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Pencil, Save, X, Trash2, Plus } from "lucide-react";

interface MagnetPrice {
    id: number;
    sizeSlug: string;
    price: number;
    isActive: boolean;
}

export default function MagnetsPage() {
    const { t } = useTranslation();
    const [items, setItems] = useState<MagnetPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<MagnetPrice>>({});

    const fetchData = async () => {
        const res = await fetch('/api/fujiadmin/config/magnets');
        const data = await res.json();
        setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleEdit = (item: MagnetPrice) => {
        setEditingId(item.id);
        setEditData({ ...item });
    };

    const handleSave = async () => {
        if (!editingId) return;
        await fetch('/api/fujiadmin/config/magnets', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        setEditingId(null);
        fetchData();
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditData({});
    };

    const [newSize, setNewSize] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const handleAdd = async () => {
        if (!newSize || !newPrice) return;
        await fetch('/api/fujiadmin/config/magnets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sizeSlug: newSize, price: newPrice, isActive: true }),
        });
        setNewSize("");
        setNewPrice("");
        fetchData();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this option?")) return;
        await fetch(`/api/fujiadmin/config/magnets?id=${id}`, { method: 'DELETE' });
        fetchData();
    };

    if (loading) return <div className="animate-pulse">{t('Loading')}...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-900">{t('config.magnets')}</h2>
                <p className="text-sm text-slate-500">{t('config.magnets_desc')}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm flex items-end gap-4">
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Size Slug</label>
                    <Input value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder="e.g. 10x15" />
                </div>
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">{t('pricing.price')}</label>
                    <Input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} type="number" placeholder="0.00" />
                </div>
                <Button onClick={handleAdd} disabled={!newSize || !newPrice}><Plus className="w-4 h-4 mr-2" /> {t('bulk.add') || 'Add'}</Button>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">{t('pricing.format')}</th>
                            <th className="text-left py-3 px-4 font-semibold text-slate-600">{t('pricing.price')} ({t('general.currency')})</th>
                            <th className="text-center py-3 px-4 font-semibold text-slate-600">{t('Status')}</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-600">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b last:border-0 hover:bg-slate-50">
                                <td className="py-3 px-4">
                                    {editingId === item.id ? (
                                        <Input
                                            value={editData.sizeSlug || ''}
                                            onChange={(e) => setEditData({ ...editData, sizeSlug: e.target.value })}
                                            className="w-24"
                                        />
                                    ) : (
                                        <span className="font-medium">{item.sizeSlug}</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === item.id ? (
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={editData.price || ''}
                                            onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                                            className="w-28"
                                        />
                                    ) : (
                                        <span className="font-bold text-[#e31e24]">{item.price.toFixed(2)}</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {editingId === item.id ? (
                                        <Switch
                                            checked={editData.isActive ?? true}
                                            onCheckedChange={(checked) => setEditData({ ...editData, isActive: checked })}
                                        />
                                    ) : (
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    {editingId === item.id ? (
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" onClick={handleSave}><Save className="w-4 h-4" /></Button>
                                            <Button size="sm" variant="outline" onClick={handleCancel}><X className="w-4 h-4" /></Button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 justify-end">
                                            <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
