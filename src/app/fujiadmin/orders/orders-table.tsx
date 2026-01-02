"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ChevronLeft, ChevronRight, RefreshCw, Eye, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { STATUS_COLORS, getStatusConfig } from "@/lib/constants/order-statuses";
import { toast } from "sonner";

interface OrdersTableProps {
    orders: any[];
}

const ORDERS_PER_PAGE = 20;

const STATUSES = ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

// Helper to format bytes
function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

interface StorageStats {
    total: { count: number; size: number; formatted: string };
    main: { count: number; size: number; formatted: string };
    thumb: { count: number; size: number; formatted: string };
    temp: { count: number; size: number; formatted: string };
}

export function OrdersTable({ orders }: OrdersTableProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Storage stats
    const [storageStats, setStorageStats] = useState<StorageStats | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [isRunningCleanup, setIsRunningCleanup] = useState(false);
    const [cleanupOpen, setCleanupOpen] = useState(false);

    // Load storage stats on mount
    const loadStorageStats = async () => {
        setIsLoadingStats(true);
        try {
            const res = await fetch('/api/fujiadmin/cleanup');
            if (res.ok) {
                const data = await res.json();
                setStorageStats(data);
            }
        } catch (e) {
            console.error('Failed to load storage stats', e);
        } finally {
            setIsLoadingStats(false);
        }
    };

    // Run on mount
    useEffect(() => { loadStorageStats(); }, []);

    const runCleanup = () => setCleanupOpen(true);

    const executeCleanup = async (mode: 'safe' | 'full') => {
        setCleanupOpen(false);
        if (mode === 'full') {
            if (!confirm(t('admin.cleanup_full_confirm', 'WARNING! This will delete all temporary files and PENDING orders. Active client uploads will be lost. Are you sure?'))) return;
        }

        setIsRunningCleanup(true);
        const toastId = toast.loading(t('admin.cleaning', 'Cleaning...'));
        try {
            const res = await fetch('/api/fujiadmin/cleanup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode })
            });
            const data = await res.json();

            if (data.success) {
                if (mode === 'full') {
                    toast.success(t('admin.full_cleaned', 'Storage fully cleaned!'), { id: toastId });
                    router.refresh();
                } else {
                    if (data.orphansRecovered > 0) {
                        toast.success(`Recovered ${data.orphansRecovered} files to Order #${data.recoveryOrderNumber}`, { id: toastId });
                        router.refresh();
                    } else {
                        toast.success(t('admin.no_orphans') || 'No orphans found.', { id: toastId });
                    }
                }
                loadStorageStats();
            } else {
                toast.error(data.error || 'Cleanup failed', { id: toastId });
            }
        } catch (e) {
            toast.error('Cleanup failed', { id: toastId });
        } finally {
            setIsRunningCleanup(false);
        }
    };

    // Pagination calculations
    const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    const paginatedOrders = orders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

    const toggleSelectAll = () => {
        if (selectedOrders.size === paginatedOrders.length) {
            setSelectedOrders(new Set());
        } else {
            setSelectedOrders(new Set(paginatedOrders.map(o => o.id)));
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

    const handleBulkStatusChange = async (newStatus: string) => {
        if (selectedOrders.size === 0) return;

        setIsUpdatingStatus(true);
        try {
            const res = await fetch("/api/fujiadmin/orders/bulk-status", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderIds: Array.from(selectedOrders),
                    status: newStatus
                })
            });

            if (res.ok) {
                router.refresh();
                setSelectedOrders(new Set());
                toast.success(t("admin.status_updated") || "Status updated");
            } else {
                toast.error(t("admin.status_update_failed") || "Failed to update status");
            }
        } catch (error) {
            console.error("Bulk status update failed", error);
            toast.error(t("admin.status_update_failed") || "Failed to update status");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDeleteOrder = async (id: number) => {
        if (!confirm(t('admin.confirm_delete_order', 'Видалити замовлення? Ця дія незворотна.'))) return;

        const toastId = toast.loading(t('Deleting', 'Видалення...'));
        try {
            const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success(t('admin.order_deleted', 'Замовлення видалено'), { id: toastId });
                router.refresh();
                if (selectedOrders.has(id)) {
                    toggleSelect(id);
                }
            } else {
                toast.error(t('admin.delete_failed', 'Помилка видалення'), { id: toastId });
            }
        } catch (e) {
            console.error(e);
            toast.error(t('admin.delete_failed', 'Помилка видалення'), { id: toastId });
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(t('Are you sure you want to delete selected orders?'))) return;
        setIsDeleting(true);
        const total = selectedOrders.size;
        let completed = 0;
        const toastId = toast.loading(`${t('Deleting', 'Видалення')} 0/${total}...`);

        try {
            const results = await Promise.all(
                Array.from(selectedOrders).map(async id => {
                    try {
                        const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
                        completed++;
                        // Update progress (throttling UI updates slightly is good practice but sonner handles it well)
                        toast.loading(`${t('Deleting', 'Видалення')} ${completed}/${total}...`, { id: toastId });
                        return res.ok;
                    } catch (e) {
                        completed++;
                        return false;
                    }
                })
            );

            const failedCount = results.filter(r => !r).length;
            if (failedCount > 0) {
                toast.error(`Failed to delete ${failedCount} orders.`, { id: toastId });
            } else {
                toast.success(t("admin.orders_deleted") || "Orders deleted", { id: toastId });
            }
            router.refresh();
            setSelectedOrders(new Set());
        } catch (error) {
            console.error("Bulk delete failed", error);
            toast.error("Some orders failed to delete", { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    const getStatusStyle = (status: string) => {
        return getStatusConfig(status);
    };

    return (
        <div className="space-y-6">
            {/* Header with title and storage controls */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t('admin.orders')}</h1>

                    {/* Storage Stats & Cleanup */}
                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-2 border border-slate-200">
                        <div className="text-sm">
                            <span className="text-slate-500">{t('admin.storage') || 'Сховище'}:</span>
                            <span className="font-semibold text-slate-700 ml-1">
                                {isLoadingStats ? '...' : (storageStats?.total.formatted || '0 B')}
                            </span>
                            {storageStats && storageStats.total.count > 0 && (
                                <span className="text-slate-400 ml-1">
                                    ({storageStats.total.count} {t('admin.files') || 'файлів'})
                                </span>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={runCleanup}
                            disabled={isRunningCleanup || isLoadingStats}
                            className="gap-1"
                        >
                            <RefreshCw className={`w-4 h-4 ${isRunningCleanup ? 'animate-spin' : ''}`} />
                            {t('admin.cleanup') || 'Очистка'}
                        </Button>
                    </div>
                </div>

                {selectedOrders.size > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-slate-600 mr-2">
                            {t('admin.selected')}: {selectedOrders.size}
                        </span>

                        {/* Status change buttons */}
                        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
                            {STATUSES.map(status => {
                                const style = getStatusStyle(status);
                                return (
                                    <button
                                        key={status}
                                        onClick={() => handleBulkStatusChange(status)}
                                        disabled={isUpdatingStatus}
                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${style.bg} ${style.text} hover:opacity-80 disabled:opacity-50`}
                                    >
                                        {t(style.label)}
                                    </button>
                                );
                            })}
                        </div>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleBulkDelete}
                            disabled={isDeleting}
                            className="gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            {t('bulk.delete')}
                        </Button>
                    </div>
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
                                        checked={paginatedOrders.length > 0 && selectedOrders.size === paginatedOrders.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3">{t('admin.order_number')}</th>
                                <th className="px-6 py-3">{t('admin.date')}</th>
                                <th className="px-6 py-3">{t('admin.customer')}</th>
                                <th className="px-6 py-3">{t('admin.method')}</th>
                                <th className="px-6 py-3">{t('admin.items')}</th>
                                <th className="px-6 py-3">{t('admin.size')}</th>
                                <th className="px-6 py-3">{t('admin.total')}</th>
                                <th className="px-6 py-3">{t('admin.status')}</th>
                                <th className="px-6 py-3">{t('admin.action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-8 text-center text-slate-500">
                                        {t('No orders found')}
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const statusStyle = getStatusStyle(order.status);
                                    return (
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
                                                <div className="font-medium text-slate-900">{order.customerName || "—"}</div>
                                                <div className="text-xs text-slate-500">{order.customerPhone || "—"}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.deliveryMethod === 'PICKUP' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {order.deliveryMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{order._count?.items || 0}</td>
                                            <td className="px-6 py-4 text-slate-500">{formatBytes(order.size || 0)}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{order.totalAmount?.toFixed(2) || "0.00"} {t('general.currency')}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                                    {t(statusStyle.label)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        href={`/fujiadmin/orders/${order.id}`}
                                                        className="group inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-all font-medium text-sm shadow-sm"
                                                    >
                                                        <Eye className="w-4 h-4 text-blue-500 group-hover:text-blue-700" />
                                                        {t('admin.view', 'Перегляд')}
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-100"
                                                        title={t('admin.delete', 'Видалити')}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            {t('admin.showing')} {startIndex + 1}–{Math.min(startIndex + ORDERS_PER_PAGE, orders.length)} {t('admin.of')} {orders.length}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {t('admin.prev')}
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-8 h-8 text-sm font-medium rounded ${currentPage === pageNum
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="gap-1"
                            >
                                {t('admin.next')}
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Dialog open={cleanupOpen} onOpenChange={setCleanupOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('admin.cleanup', 'Очистка')}</DialogTitle>
                        <DialogDescription>
                            {t('admin.cleanup_desc', 'Виберіть режим очистки.')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6 py-4">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                {t('admin.cleanup_safe', 'Soft Clean (Безпечна)')}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {t('admin.cleanup_safe_desc', 'Видаляє тимчасові файли старші 1г та загублені файли старші 24г. Безпечно для активних користувачів.')}
                            </p>
                            <Button onClick={() => executeCleanup('safe')} variant="outline" className="w-full justify-start">
                                {t('admin.run_safe_cleanup', 'Запустити Soft Clean')}
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                            <h3 className="font-medium text-red-700 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                {t('admin.cleanup_full', 'Full Clean (Повна очистка)')}
                            </h3>
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                                {t('admin.cleanup_full_warning', 'Увага: Видаляє ВСІ тимчасові файли та замовлення в статусі PENDING. Активні завантаження клієнтів будуть перервані і втрачені.')}
                            </div>
                            <Button onClick={() => executeCleanup('full')} variant="destructive" className="w-full justify-start mt-1">
                                {t('admin.run_full_cleanup', 'Запустити Full Clean')}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
