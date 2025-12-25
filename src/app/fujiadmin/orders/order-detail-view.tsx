"use client";

import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeft, Download, FileImage, CreditCard, Truck, User, Trash2, Archive, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function OrderDetailView({ order }: { order: any }) {
    const { t } = useTranslation();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!confirm(t('Are you sure you want to delete this order? This action cannot be undone.'))) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/orders/${order.id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                router.push('/fujiadmin/orders');
                router.refresh();
            } else {
                alert('Failed to delete order');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting order');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDownloadZip = () => {
        window.location.href = `/api/admin/orders/${order.id}/download`;
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto relative">
            {/* Image Preview Modal */}
            {previewImage && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
                    <button
                        onClick={() => setPreviewImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-slate-300"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <Link href="/fujiadmin/orders">
                        <Button variant="outline" size="sm" className="gap-2">
                            <ArrowLeft className="w-4 h-4" /> {t('admin.back_to_orders')}
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{t('admin.order_number')} #{order.orderNumber}</h1>
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                                {t(order.status)}
                            </span>
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                            {new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button onClick={handleDownloadZip} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Archive className="w-4 h-4" />
                        {t('Download Archive')}
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
                        {isDeleting ? t('admin.deleting') : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                {t('Delete Order')}
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-slate-900">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <User className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg">{t('admin.customer_info')}</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 text-sm">
                            <span className="text-slate-500">{t('admin.customer')}:</span>
                            <span className="col-span-2 font-medium">{order.customerName}</span>
                        </div>
                        <div className="grid grid-cols-3 text-sm">
                            <span className="text-slate-500">{t('admin.phone')}:</span>
                            <span className="col-span-2 font-medium">{order.customerPhone}</span>
                        </div>
                        <div className="grid grid-cols-3 text-sm">
                            <span className="text-slate-500">{t('admin.email')}:</span>
                            <span className="col-span-2 font-medium">{order.customerEmail || "-"}</span>
                        </div>
                    </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-slate-900">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Truck className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg">{t('admin.shipping_details')}</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 text-sm">
                            <span className="text-slate-500">{t('admin.method')}:</span>
                            <span className="col-span-2 font-medium">
                                {order.deliveryMethod === 'PICKUP' ? t('checkout.pickup') : t('checkout.novaposhta')}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 text-sm">
                            <span className="text-slate-500">{t('admin.address_branch')}:</span>
                            <span className="col-span-2 font-medium">{order.deliveryAddress || "-"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg text-slate-900">{t('admin.items')} ({order.items.length})</h3>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                        {t('admin.total')}: {order.totalAmount.toFixed(2)} ₴
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-3 w-20">{t('admin.preview')}</th>
                                <th className="px-6 py-3">{t('admin.file_info')}</th>
                                <th className="px-6 py-3">{t('admin.print_options')}</th>
                                <th className="px-6 py-3 text-right">{t('admin.action')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {order.items.map((item: any) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        {item.serverFileName ? (
                                            <div
                                                className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative cursor-pointer group"
                                                onClick={() => setPreviewImage(`/uploads/${item.serverFileName}`)}
                                            >
                                                <img
                                                    src={`/uploads/${item.serverFileName}`}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                <FileImage className="w-8 h-8 text-slate-300" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 truncate max-w-[200px]" title={item.fileName || "Unknown"}>
                                            {item.fileName || "photo.jpg"}
                                        </div>
                                        {item.serverFileName && (
                                            <div className="text-xs text-slate-400 font-mono mt-1 truncate max-w-[200px]">
                                                {item.serverFileName}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-slate-700">
                                                {item.options.size} • {t(item.options.paper)}
                                            </span>
                                            <span className="text-slate-500">
                                                {t('Quantity')}: <span className="font-medium text-slate-900">{item.options.quantity}</span>
                                            </span>
                                            <div className="flex gap-2 mt-1">
                                                {item.options.options?.magnetic && (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 uppercase tracking-wide">
                                                        {t('badge.mag')}
                                                    </span>
                                                )}
                                                {item.options.options?.border && (
                                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">
                                                        {t('badge.border')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.serverFileName && (
                                            <a
                                                href={`/uploads/${item.serverFileName}`}
                                                download={item.fileName ? item.fileName.replace(/\.[^.]+$/, '') + '.jpg' : 'photo.jpg'}
                                                target="_blank"
                                                className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                {t('admin.download')}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
