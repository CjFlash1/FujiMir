"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
    orders: any[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelectAll = () => {
        if (selectedOrders.size === orders.length) {
            setSelectedOrders(new Set());
        } else {
            setSelectedOrders(new Set(orders.map(o => o.id)));
        }
    };

    const toggleSelect = (id: number) => {
        const newSelected = new Set(selectedOrders);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedOrders(newSelected);
    };

    const handleBulkDelete = async () => {
        if (!confirm(t('Are you sure you want to delete selected orders?'))) return;
        setIsDeleting(true);
        try {
            const results = await Promise.all(
                Array.from(selectedOrders).map(async id => {
                    const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
                    return res.ok;
                })
            );

            const failedCount = results.filter(r => !r).length;
            if (failedCount > 0) {
                alert(`Failed to delete ${failedCount} orders. Check console for details.`);
            }
            router.refresh();
            setSelectedOrders(new Set());
        } catch (error) {
            console.error("Bulk delete failed", error);
            alert("Some orders failed to delete");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t('admin.orders')}</h1>
                {selectedOrders.size > 0 && (
                    <Button variant="destructive" onClick={handleBulkDelete} disabled={isDeleting} className="gap-2">
                        <Trash2 className="w-4 h-4" />
                        {t('bulk.delete')} ({selectedOrders.size})
                    </Button>
                )}
            </div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        checked={orders.length > 0 && selectedOrders.size === orders.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3">{t('admin.order_number')}</th>
                                <th className="px-6 py-3">{t('admin.date')}</th>
                                <th className="px-6 py-3">{t('admin.customer')}</th>
                                <th className="px-6 py-3">{t('admin.method')}</th>
                                <th className="px-6 py-3">{t('admin.items')}</th>
                                <th className="px-6 py-3">{t('admin.total')}</th>
                                <th className="px-6 py-3">{t('admin.status')}</th>
                                <th className="px-6 py-3">{t('admin.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-slate-500">
                                        {t('No orders found')}
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300"
                                                checked={selectedOrders.has(order.id)}
                                                onChange={() => toggleSelect(order.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{order.orderNumber}</td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{order.customerName}</div>
                                            <div className="text-xs text-slate-500">{order.customerPhone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.deliveryMethod === 'PICKUP' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {order.deliveryMethod}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{order._count.items}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{order.totalAmount.toFixed(2)} ₴</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/fujiadmin/orders/${order.id}`} className="text-primary-600 hover:text-primary-900 font-medium hover:underline">
                                                {t('admin.view')}
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
