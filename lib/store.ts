// lib/store.ts
"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "./supabase/client"
import type { Product } from "./types" // Asegúrate de que tu tipo Product esté bien definido aquí.

// Tipos para el carrito
export interface CartItem {
  id: number
  name: string
  price: string | number // Permitir tanto string como number
  size: string
  quantity: number
  image: string
}

// Store para el carrito
interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number, size: string) => void
  updateQuantity: (id: number, size: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => string
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((i) => i.id === item.id && i.size === item.size)
          if (existingItemIndex >= 0) {
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += item.quantity
            return { items: updatedItems }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size)),
        })),
      updateQuantity: (id, size, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id && item.size === size ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const total = get().items.reduce((sum, item) => {
          // Manejar tanto string como number para el precio
          let price: number
          if (typeof item.price === "string") {
            price = Number.parseFloat(item.price.replace("$", ""))
          } else {
            price = Number(item.price)
          }
          return sum + price * item.quantity
        }, 0)
        return total.toFixed(2)
      },
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "zeltic-cart",
    },
  ),
)

// Store para productos
interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  fetchProducts: () => Promise<void>
  getProductsByCategory: (category: string) => Product[]
  getProductById: (id: number) => Product | undefined
  // ¡CAMBIO IMPORTANTE AQUÍ!
  updateStock: (productId: number, size: string, newStock: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

      if (error) throw error
      console.log("Productos obtenidos de Supabase:", data) // Agregado para depuración
      set({ products: data || [], loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  getProductsByCategory: (category: string) => {
    const products = get().products
    console.log("Categoría solicitada:", category) // Agregado para depuración
    // Si es "jeans" o cualquier categoría no específica, mostrar todos
    if (category === "jeans" || !category) {
      console.log("Mostrando todos los productos o jeans.") // Agregado para depuración
      return products
    }
    // Filtrar por categoría específica
    const filtered = products.filter((product) => {
      console.log(`Comparando ${product.category} con ${category}`) // Agregado para depuración
      return product.category === category
    })
    console.log(`Productos filtrados para ${category}:`, filtered.length) // Agregado para depuración
    return filtered
  },

  getProductById: (id: number) => {
    return get().products.find((product) => product.id === id)
  },

  // ¡NUEVA FUNCIÓN IMPLEMENTADA AQUÍ!
  updateStock: (productId, size, newStock) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? {
              ...product,
              inventory: product.inventory.map((item) =>
                item.size === size
                  ? { ...item, stock: newStock }
                  : item
              ),
            }
          : product
      ),
    }));
  },
}));

// Store para autenticación (simplificado)
interface User {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
}

interface AuthStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
      isAdmin: () => get().user?.role === "admin",
    }),
    {
      name: "auth-storage",
    },
  ),
)

// NUEVO: Tipos para pedidos
export interface OrderItem {
  id: number
  name: string
  price: string | number
  quantity: number
  size?: string
  image?: string
}

export interface OrderCustomer {
  name: string
  lastName: string
  // ¡CAMBIO IMPORTANTE AQUÍ! Email ahora es opcional
  email?: string
  phone: string
  address: string
  city?: string
  state?: string
  postalCode?: string
  notes?: string
}

export interface Order {
  id: string
  date: string
  status: 'pending' | 'completed' | 'cancelled'
  customer: OrderCustomer
  items: OrderItem[]
  total: string | number
}

// NUEVO: Store para pedidos
interface OrderStore {
  orders: Order[]
  loading: boolean
  error: string | null
  // ¡CAMBIO IMPORTANTE AQUÍ! addOrder ahora recibe el tipo de datos que envía el checkout-form
  addOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getOrderById: (orderId: string) => Order | undefined
  fetchOrders: () => Promise<void>
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      error: null,
      
      addOrder: (orderData) => { // Recibe solo los datos que vienen del formulario
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Genera un ID único
          date: new Date().toISOString(), // Fecha actual
          status: 'pending', // Estado inicial
        };
        set((state) => ({
          orders: [...state.orders, newOrder]
        }));
      },
      
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => 
            order.id === orderId 
              ? { ...order, status } 
              : order
          )
        }))
      },
      
      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId)
      },
      
      fetchOrders: async () => {
        set({ loading: true, error: null })
        try {
          // Si tienes una tabla de pedidos en Supabase, puedes descomentar esto:
          /*
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false })
          
          if (error) throw error
          set({ orders: data || [], loading: false })
          */
          
          // Por ahora, solo usamos los pedidos almacenados localmente
          set({ loading: false })
        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      }
    }),
    {
      name: "zeltic-orders",
    }
  )
)
