"use client"

import { useState } from "react"
import { supabase } from "../supabase/client"
import { useAuthStore, useCartStore } from "../store"

export function useOrders() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()
  const { items, clearCart } = useCartStore()

  // Obtener órdenes del usuario actual
  const getUserOrders = async () => {
    if (!user) return []

    setLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (queryError) throw queryError

      return data || []
    } catch (err: any) {
      setError(err.message || "Error al cargar órdenes")
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Crear una nueva orden
  const createOrder = async (shippingAddress: any) => {
    if (!user) {
      setError("Debes iniciar sesión para realizar un pedido")
      return null
    }

    if (items.length === 0) {
      setError("El carrito está vacío")
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // 1. Calcular total
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      // 2. Crear orden
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          shipping_address: shippingAddress,
          status: "pending",
        })
        .select()

      if (orderError) throw orderError

      const orderId = orderData[0].id

      // 3. Crear items de la orden
      const orderItems = items.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      // 4. Actualizar inventario
      for (const item of items) {
        const { error: inventoryError } = await supabase.rpc("decrease_stock", {
          p_product_id: item.id,
          p_size: item.size,
          p_quantity: item.quantity,
        })

        if (inventoryError) throw inventoryError
      }

      // 5. Limpiar carrito
      clearCart()

      return orderData[0]
    } catch (err: any) {
      setError(err.message || "Error al crear la orden")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Obtener todas las órdenes (solo admin)
  const getAllOrders = async () => {
    if (!user || user.role !== "admin") {
      setError("No tienes permisos para ver todas las órdenes")
      return []
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (*),
          profiles (email, first_name, last_name)
        `)
        .order("created_at", { ascending: false })

      if (queryError) throw queryError

      return data || []
    } catch (err: any) {
      setError(err.message || "Error al cargar órdenes")
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Actualizar estado de una orden (solo admin)
  const updateOrderStatus = async (orderId: string, status: string) => {
    if (!user || user.role !== "admin") {
      setError("No tienes permisos para actualizar órdenes")
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase.from("orders").update({ status }).eq("id", orderId)

      if (updateError) throw updateError

      return true
    } catch (err: any) {
      setError(err.message || "Error al actualizar la orden")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getUserOrders,
    createOrder,
    getAllOrders,
    updateOrderStatus,
  }
}
