import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProductConfig = {
    sizes: {
        id: number;
        name: string;
        basePrice: number;
        discounts: { minQuantity: number; price: number }[];
    }[];
    papers: { id: number; name: string; slug: string }[];
    options: { id: number; name: string; slug: string; price: number }[];
    gifts: { id: number; minAmount: number; giftName: string }[];
};

export type PrintOptions = {
    size: string;
    paper: string;
    quantity: number;
    options: Record<string, boolean>; // e.g., { border: true, magnetic: false }
}

export type CartItem = {
    id: string; // Unique ID (file.name + timestamp)
    file?: File; // Not persisted
    preview: string; // Blob URL
    options: PrintOptions;
}

interface CartState {
    items: CartItem[];
    config: ProductConfig | null;
    setConfig: (config: ProductConfig) => void;
    addItem: (file: File, defaultOptions: PrintOptions) => void;
    updateItem: (id: string, options: Partial<PrintOptions>) => void;
    removeItem: (id: string) => void;
    cloneItem: (id: string) => string;
    bulkCloneItems: (ids: string[]) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            config: null,
            setConfig: (config) => set({ config }),
            addItem: (file, options) => {
                const id = `${file.name}-${Date.now()}`;
                const newItem: CartItem = {
                    id,
                    file,
                    preview: URL.createObjectURL(file),
                    options: options,
                };
                set((state) => ({ items: [...state.items, newItem] }));
            },
            updateItem: (id, newOptions) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, options: { ...item.options, ...newOptions } } : item
                    ),
                })),
            cloneItem: (id) => {
                let newId = "";
                set((state) => {
                    const itemToClone = state.items.find((item) => item.id === id);
                    if (!itemToClone) return state;
                    newId = `${itemToClone.id}-copy-${Math.random().toString(36).substring(7)}`;
                    const clonedItem = {
                        ...itemToClone,
                        id: newId,
                        file: itemToClone.file,
                        preview: itemToClone.preview,
                    };
                    return { items: [...state.items, clonedItem] };
                });
                return newId;
            },
            bulkCloneItems: (ids) =>
                set((state) => {
                    const itemsToClone = state.items.filter((item) => ids.includes(item.id));
                    const clonedItems = itemsToClone.map((item) => ({
                        ...item,
                        id: `${item.id}-copy-${Math.random().toString(36).substring(7)}`,
                        file: item.file,
                        preview: item.preview,
                    }));
                    return { items: [...state.items, ...clonedItems] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                // Don't persist File objects or Previews (they expire)
                // In a real app, upload to server immediately or use IndexedDB
                config: state.config,
                items: state.items.map(item => ({
                    ...item,
                    file: undefined, // Ensure file is not persisted
                    // preview: undefined // If previews are blob URLs, they should not be persisted either
                }))
            }),
        }
    )
);

export const calculateItemPrice = (options: PrintOptions, config: ProductConfig) => {
    const sizeObj = config.sizes.find(s => s.name === options.size);
    if (!sizeObj) return { unitPrice: 0, total: 0, savings: 0 };

    let baseUnitPrice = sizeObj.basePrice;
    let finalUnitPrice = sizeObj.basePrice;

    // Apply volume discount
    if (sizeObj.discounts && sizeObj.discounts.length > 0) {
        const applicableDiscount = [...sizeObj.discounts]
            .sort((a, b) => b.minQuantity - a.minQuantity)
            .find(d => options.quantity >= d.minQuantity);

        if (applicableDiscount) {
            finalUnitPrice = applicableDiscount.price;
        }
    }

    // Add option prices
    let optionsPrice = 0;
    Object.entries(options.options || {}).forEach(([slug, isActive]) => {
        if (isActive) {
            const opt = config.options.find(o => o.slug === slug);
            if (opt) optionsPrice += opt.price;
        }
    });

    baseUnitPrice += optionsPrice;
    finalUnitPrice += optionsPrice;

    const total = finalUnitPrice * options.quantity;
    const totalWithoutDiscount = baseUnitPrice * options.quantity;
    const savings = totalWithoutDiscount - total;

    return { unitPrice: finalUnitPrice, total, savings };
};
