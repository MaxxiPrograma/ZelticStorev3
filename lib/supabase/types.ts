export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          category: string | null
          tag: string | null
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          category?: string | null
          tag?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          category?: string | null
          tag?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: number
          product_id: number
          size: string
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          product_id: number
          size: string
          stock: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          size?: string
          stock?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          total: number
          status: string
          shipping_address: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          total: number
          status?: string
          shipping_address: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          total?: number
          status?: string
          shipping_address?: any
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          size: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          size: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          size?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Tipos base de las tablas
export type Product = Database["public"]["Tables"]["products"]["Row"]
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"]
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"]

export type Inventory = Database["public"]["Tables"]["inventory"]["Row"]
export type InventoryInsert = Database["public"]["Tables"]["inventory"]["Insert"]
export type InventoryUpdate = Database["public"]["Tables"]["inventory"]["Update"]

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"]
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"]

export type Order = Database["public"]["Tables"]["orders"]["Row"]
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"]
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"]

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"]
export type OrderItemInsert = Database["public"]["Tables"]["order_items"]["Insert"]
export type OrderItemUpdate = Database["public"]["Tables"]["order_items"]["Update"]

// Tipos extendidos con relaciones
export interface ProductWithInventory extends Product {
  inventory?: Inventory[]
}

// Alias para mantener compatibilidad
export type { ProductWithInventory as Product }

// Tipos para categorías de productos
export type ProductCategory = "jeans" | "camisas" | "remeras" | "accesorios"

// Tipos para el estado de órdenes
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

// Tipos para roles de usuario
export type UserRole = "user" | "admin"
