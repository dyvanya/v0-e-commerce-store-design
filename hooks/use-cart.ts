import { create } from "zustand"
import type { CartItem, Product } from "@/lib/types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        }
      }

      return { items: [...state.items, { product, quantity }] }
    })
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }))
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    }))
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  },
}))
