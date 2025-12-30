"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Save, GripVertical } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface PrintSize {
    id: number;
    name: string;
    slug: string;
    basePrice: number;
    sortOrder: number;
    isActive: boolean;
}

interface QuantityTier {
    id: number;
    label: string;
    minQuantity: number;
    sortOrder: number;
}

interface VolumeDiscount {
    id: number;
    printSizeId: number;
    tierId: number | null;
    minQuantity: number;
    price: number;
}

export default function DiscountsConfig() {
    const { t } = useTranslation();
    const [sizes, setSizes] = useState<PrintSize[]>([]);
    const [tiers, setTiers] = useState<QuantityTier[]>([]);
    const [discounts, setDiscounts] = useState<VolumeDiscount[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [newSizeName, setNewSizeName] = useState("");
    const [newSizePrice, setNewSizePrice] = useState("");
    const [newTierLabel, setNewTierLabel] = useState("");
    const [newTierMinQty, setNewTierMinQty] = useState("");
    const [draggedSizeIndex, setDraggedSizeIndex] = useState<number | null>(null);
    const [draggedTierIndex, setDraggedTierIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sizesRes, tiersRes, discountsRes] = await Promise.all([
                fetch("/api/fujiadmin/config/sizes"),
                fetch("/api/fujiadmin/config/tiers"),
                fetch("/api/fujiadmin/config/discounts"),
            ]);
            const sizesData = await sizesRes.json();
            const tiersData = await tiersRes.json();
            const discountsData = await discountsRes.json();

            setSizes(sizesData.sort((a: PrintSize, b: PrintSize) => a.sortOrder - b.sortOrder));
            setTiers(tiersData.sort((a: QuantityTier, b: QuantityTier) => a.sortOrder - b.sortOrder));
            setDiscounts(discountsData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    // Get price for a specific size and tier
    const getPrice = (sizeId: number, minQuantity: number): string => {
        const discount = discounts.find(d => d.printSizeId === sizeId && d.minQuantity === minQuantity);
        return discount ? discount.price.toString() : "";
    };

    // Update price in state
    const updatePrice = (sizeId: number, minQuantity: number, value: string) => {
        const numValue = parseFloat(value) || 0;
        setHasChanges(true);

        const existingIndex = discounts.findIndex(d => d.printSizeId === sizeId && d.minQuantity === minQuantity);
        const tier = tiers.find(t => t.minQuantity === minQuantity);

        if (existingIndex >= 0) {
            setDiscounts(discounts.map((d, i) => i === existingIndex ? { ...d, price: numValue } : d));
        } else {
            setDiscounts([...discounts, {
                id: -Date.now(),
                printSizeId: sizeId,
                tierId: tier?.id || null,
                minQuantity,
                price: numValue
            }]);
        }
    };

    // Add new size
    const handleAddSize = async () => {
        if (!newSizeName.trim()) return;

        try {
            const res = await fetch("/api/fujiadmin/config/sizes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newSizeName.trim(),
                    slug: newSizeName.trim().toLowerCase().replace(/\s+/g, '-'),
                    basePrice: parseFloat(newSizePrice) || 0,
                    sortOrder: sizes.length,
                }),
            });

            if (res.ok) {
                setNewSizeName("");
                setNewSizePrice("");
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Add new tier
    const handleAddTier = async () => {
        if (!newTierLabel.trim() || !newTierMinQty) return;

        try {
            const res = await fetch("/api/fujiadmin/config/tiers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    label: newTierLabel.trim(),
                    minQuantity: parseInt(newTierMinQty),
                    sortOrder: tiers.length,
                }),
            });

            if (res.ok) {
                setNewTierLabel("");
                setNewTierMinQty("");
                fetchData();
            }
        } catch (e) {
            console.error(e);
        }
    };

    // Delete size
    const handleDeleteSize = async (sizeId: number) => {
        if (!confirm(t("admin.confirm_delete"))) return;

        try {
            await fetch(`/api/fujiadmin/config/sizes?id=${sizeId}`, { method: "DELETE" });
            fetchData();
        } catch (e) {
            console.error(e);
        }
    };

    // Delete tier
    const handleDeleteTier = async (tierId: number) => {
        if (!confirm(t("admin.confirm_delete"))) return;

        try {
            await fetch(`/api/fujiadmin/config/tiers?id=${tierId}`, { method: "DELETE" });
            fetchData();
        } catch (e) {
            console.error(e);
        }
    };

    // Save all changes
    const handleSaveAll = async () => {
        setSaving(true);
        try {
            // Update sizes sort order
            await Promise.all(sizes.map((size, index) =>
                fetch("/api/fujiadmin/config/sizes", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...size, sortOrder: index }),
                })
            ));

            // Update tiers sort order
            await Promise.all(tiers.map((tier, index) =>
                fetch("/api/fujiadmin/config/tiers", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...tier, sortOrder: index }),
                })
            ));

            // Update discounts
            for (const discount of discounts) {
                if (discount.id < 0) {
                    await fetch("/api/fujiadmin/config/discounts", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            printSizeId: discount.printSizeId,
                            tierId: discount.tierId,
                            minQuantity: discount.minQuantity,
                            price: discount.price,
                        }),
                    });
                } else {
                    await fetch("/api/fujiadmin/config/discounts", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(discount),
                    });
                }
            }

            setHasChanges(false);
            fetchData();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    // Drag handlers for sizes
    const handleSizeDragStart = (index: number) => setDraggedSizeIndex(index);
    const handleSizeDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedSizeIndex === null || draggedSizeIndex === index) return;
        const newSizes = [...sizes];
        const draggedItem = newSizes[draggedSizeIndex];
        newSizes.splice(draggedSizeIndex, 1);
        newSizes.splice(index, 0, draggedItem);
        setSizes(newSizes);
        setDraggedSizeIndex(index);
        setHasChanges(true);
    };
    const handleSizeDragEnd = () => setDraggedSizeIndex(null);

    // Drag handlers for tiers
    const handleTierDragStart = (index: number) => setDraggedTierIndex(index);
    const handleTierDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedTierIndex === null || draggedTierIndex === index) return;
        const newTiers = [...tiers];
        const draggedItem = newTiers[draggedTierIndex];
        newTiers.splice(draggedTierIndex, 1);
        newTiers.splice(index, 0, draggedItem);
        setTiers(newTiers);
        setDraggedTierIndex(index);
        setHasChanges(true);
    };
    const handleTierDragEnd = () => setDraggedTierIndex(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-2xl font-bold">{t("config.pricing_table")}</h1>
                {hasChanges && (
                    <Button onClick={handleSaveAll} disabled={saving} className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {t("admin.save_all")}
                    </Button>
                )}
            </div>

            {/* Add Size & Tier Row */}
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">{t("config.add_size")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2 items-end pt-0">
                        <Input
                            placeholder="e.g. 10x15"
                            value={newSizeName}
                            onChange={(e) => setNewSizeName(e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={newSizePrice}
                            onChange={(e) => setNewSizePrice(e.target.value)}
                            className="w-24"
                        />
                        <Button onClick={handleAddSize} disabled={!newSizeName.trim()} size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">{t("config.add_tier")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2 items-end pt-0">
                        <Input
                            placeholder={t("config.tier_label")}
                            value={newTierLabel}
                            onChange={(e) => setNewTierLabel(e.target.value)}
                            className="flex-1"
                        />
                        <Input
                            type="number"
                            placeholder={t("config.min_qty")}
                            value={newTierMinQty}
                            onChange={(e) => setNewTierMinQty(e.target.value)}
                            className="w-24"
                        />
                        <Button onClick={handleAddTier} disabled={!newTierLabel.trim() || !newTierMinQty} size="sm">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Pricing Table */}
            <Card>
                <CardContent className="pt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-slate-200">
                                <th className="w-8"></th>
                                <th className="text-left py-3 px-2 font-bold text-slate-600">{t("pricing.format")}</th>
                                {tiers.map((tier, index) => (
                                    <th
                                        key={tier.id}
                                        className={`text-center py-3 px-1 font-bold text-slate-600 min-w-[90px] cursor-grab ${draggedTierIndex === index ? 'bg-blue-50' : ''}`}
                                        draggable
                                        onDragStart={() => handleTierDragStart(index)}
                                        onDragOver={(e) => handleTierDragOver(e, index)}
                                        onDragEnd={handleTierDragEnd}
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            <GripVertical className="w-3 h-3 text-slate-400" />
                                            <span className="text-xs">{tier.label}</span>
                                            <button
                                                onClick={() => handleDeleteTier(tier.id)}
                                                className="text-red-400 hover:text-red-600 ml-1"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </th>
                                ))}
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizes.map((size, index) => (
                                <tr
                                    key={size.id}
                                    className={`border-b border-slate-100 ${draggedSizeIndex === index ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                                    draggable
                                    onDragStart={() => handleSizeDragStart(index)}
                                    onDragOver={(e) => handleSizeDragOver(e, index)}
                                    onDragEnd={handleSizeDragEnd}
                                >
                                    <td className="py-2 px-1 cursor-grab">
                                        <GripVertical className="w-4 h-4 text-slate-400" />
                                    </td>
                                    <td className="py-2 px-2 font-medium text-slate-900">
                                        {size.name}
                                    </td>
                                    {tiers.map((tier) => (
                                        <td key={tier.id} className="py-2 px-1 text-center">
                                            <Input
                                                type="number"
                                                step="0.01"
                                                className="w-20 text-center text-sm h-8"
                                                value={getPrice(size.id, tier.minQuantity)}
                                                onChange={(e) => updatePrice(size.id, tier.minQuantity, e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </td>
                                    ))}
                                    <td className="py-2 px-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteSize(size.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {sizes.length === 0 && (
                                <tr>
                                    <td colSpan={tiers.length + 3} className="py-8 text-center text-slate-500">
                                        {t("config.no_sizes")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <p className="text-xs text-slate-500 mt-4">
                        {t("config.drag_to_sort")}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
