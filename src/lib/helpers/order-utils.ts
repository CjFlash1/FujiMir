// Order-related utility functions
// Shared helpers for order processing across API routes and components

import { prisma } from "@/lib/prisma";

/**
 * Parse files JSON from OrderItem
 */
export function getFilesFromItem(item: any): { server: string; original: string }[] {
    if (!item.files) return [];
    try {
        const parsed = JSON.parse(item.files);
        if (Array.isArray(parsed)) {
            return parsed.filter((f: any) => f.server);
        }
    } catch (e) { }
    return [];
}

/**
 * Create OrderItem data from cart item
 */
export function createOrderItemData(item: any) {
    return {
        type: "PRINT",
        name: item.isGiftMagnet
            ? `🎁 FREE MAGNET: ${item.options.size}`
            : `${item.options.size} ${item.options.paper}`,
        quantity: item.options.quantity,
        price: item.priceSnapshot || item.options.priceSnapshot || 0,
        subtotal: (item.priceSnapshot || item.options.priceSnapshot || 0) * item.options.quantity,
        size: item.options.size,
        paper: item.options.paper,
        options: JSON.stringify({
            ...item.options.options || {},
            cropping: item.options.cropping || 'fill',
            isGiftMagnet: item.isGiftMagnet || false,
        }),
        files: JSON.stringify([{
            original: item.fileName || item.name,
            server: item.serverFileName
        }]),
    };
}

/**
 * Get delivery cost display string
 */
export async function getDeliveryCostDisplay(deliveryMethod: string): Promise<string> {
    try {
        const option = await prisma.deliveryOption.findUnique({
            where: { slug: deliveryMethod }
        });

        if (option) {
            if (option.price === 0) {
                return 'За тарифами перевізника';
            }
            return `${option.price.toFixed(2)} грн`;
        }

        // Fallback for legacy methods
        if (deliveryMethod === 'pickup' || deliveryMethod === 'PICKUP') return '0.00 грн';
        if (deliveryMethod === 'local') return '150.00 грн';
        if (deliveryMethod === 'novaposhta') return 'За тарифами перевізника';

        return '-';
    } catch (e) {
        console.error('Failed to get delivery cost:', e);
        return '-';
    }
}

/**
 * Get delivery cost synchronously (for client components)
 * Uses known values, should match DB
 */
export function getDeliveryCostSync(deliveryMethod: string, deliveryOptions?: any[]): string {
    // Check from provided options first
    if (deliveryOptions) {
        const option = deliveryOptions.find(o => o.slug === deliveryMethod);
        if (option) {
            if (option.price === 0) return 'За тарифами перевізника';
            return `${option.price.toFixed(2)} грн`;
        }
    }

    // Fallback
    if (deliveryMethod === 'pickup' || deliveryMethod === 'PICKUP') return '0.00 грн';
    if (deliveryMethod === 'local') return '150.00 грн';
    if (deliveryMethod === 'novaposhta') return 'За тарифами перевізника';

    return '-';
}
