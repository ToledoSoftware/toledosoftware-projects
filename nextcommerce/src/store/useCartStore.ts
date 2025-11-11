import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  
  addItem: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product, quantity, color, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.product.id === product.id && i.selectedColor === color && i.selectedSize === size
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems, isCartOpen: true };
          } else {
            return {
              items: [...state.items, { product, quantity, selectedColor: color, selectedSize: size }],
              isCartOpen: true
            };
          }
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.product.id === productId && i.selectedColor === color && i.selectedSize === size)),
        }));
      },

      updateQuantity: (productId, quantity, color, size) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.product.id === productId && i.selectedColor === color && i.selectedSize === size) {
              return { ...i, quantity: Math.max(1, quantity) };
            }
            return i;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
    }),
    {
      name: 'nextcommerce-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }), 
    }
  )
);