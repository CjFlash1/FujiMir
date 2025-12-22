import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PhotoOptions } from '@/components/image-options';

export interface CartItem {
    id: string;
    file?: File; // File objects cannot be persisted easily in localStorage
    preview: string; // Blob URL - also needs care, but for session it's ok-ish or we use base64
    options: PhotoOptions;
    // For persistence, we might need to rely on re-upload or accept that refresh loses files
    // For this demo, we'll try to keep it in memory mostly, or assume session persistence
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateItemOptions: (id: string, options: PhotoOptions) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    // We won't use persist middleware for Files because they aren't serializable
    // If we wanted to persist, we'd need to store base64 strings (heavy) or just metadata.
    // For this flow, memory state is acceptable as long as we don't refresh the page.
    (set) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
        updateItemOptions: (id, options) =>
            set((state) => ({
                items: state.items.map((i) => (i.id === id ? { ...i, options } : i)),
            })),
        clearCart: () => set({ items: [] }),
    })
);
