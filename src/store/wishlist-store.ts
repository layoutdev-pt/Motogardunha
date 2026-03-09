import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  title: string
  price: number
  image: string
  slug: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  toggleItem: (item: WishlistItem) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => ({
          items: state.items.some((i) => i.id === item.id)
            ? state.items
            : [...state.items, item],
        }))
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      toggleItem: (item) => {
        const inList = get().items.some((i) => i.id === item.id)
        if (inList) {
          get().removeItem(item.id)
        } else {
          get().addItem(item)
        }
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'motogardunha-wishlist',
    }
  )
)
