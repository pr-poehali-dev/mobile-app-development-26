import { create } from "zustand";
import type { Product } from "./api";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  open: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  total: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  open: false,
  addItem: (product) => {
    const items = get().items;
    const existing = items.find((i) => i.product.id === product.id);
    if (existing) {
      set({ items: items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
  },
  removeItem: (productId) => set({ items: get().items.filter((i) => i.product.id !== productId) }),
  updateQty: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({ items: get().items.map((i) => i.product.id === productId ? { ...i, quantity } : i) });
  },
  clearCart: () => set({ items: [] }),
  setOpen: (open) => set({ open }),
  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}));
