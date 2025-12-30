// Order status constants and utilities
// Single source of truth for order statuses across the application

export const ORDER_STATUSES = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;

export const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
    DRAFT: { bg: "bg-slate-100", text: "text-slate-600", label: "admin.status.draft" },
    PENDING: { bg: "bg-red-100", text: "text-red-700", label: "admin.status.pending" },
    PROCESSING: { bg: "bg-orange-100", text: "text-orange-700", label: "admin.status.processing" },
    COMPLETED: { bg: "bg-green-100", text: "text-green-700", label: "admin.status.completed" },
    CANCELLED: { bg: "bg-gray-200", text: "text-gray-600", label: "admin.status.cancelled" },
};

export function getStatusConfig(status: string) {
    return STATUS_COLORS[status] || STATUS_COLORS.PENDING;
}

// Delivery method utilities
export const DELIVERY_METHODS = {
    PICKUP: 'pickup',
    LOCAL: 'local',
    NOVAPOSHTA: 'novaposhta',
} as const;

export type DeliveryMethod = typeof DELIVERY_METHODS[keyof typeof DELIVERY_METHODS];
