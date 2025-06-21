"use client"

import { useState } from "react"
import { supabase } from "../supabase/client"
import type { Product } from "../supabase/types"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar todos los productos
  const loadProducts = async (category?: string, tag?: string) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase.from("products").select(`
          *,
          inventory (*)
        `)

      if (category) {
        query = query.eq("category", category)
      }

      if (tag) {
        query = query.eq("tag", tag)
      }

      const { data, error: queryError } = await query

      if (queryError) throw queryError

      setProducts(data || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar productos")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Obtener un producto por ID
  const getProductById = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: queryError } = await supabase
        .from("products")
        .select(`
          *,
          inventory (*)
        `)
        .eq("id", id)
        .single()

      if (queryError) throw queryError

      return data
    } catch (err: any) {
      setError(err.message || "Error al cargar el producto")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Crear un nuevo producto (solo admin)
  const createProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at">) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: insertError } = await supabase
        .from("products")
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.images,
          category: product.category,
          tag: product.tag,
        })
        .select()

      if (insertError) throw insertError

      return data?.[0]
    } catch (err: any) {
      setError(err.message || "Error al crear el producto")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Actualizar un producto (solo admin)
  const updateProduct = async (id: number, updates: Partial<Product>) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: updateError } = await supabase.from("products").update(updates).eq("id", id).select()

      if (updateError) throw updateError

      return data?.[0]
    } catch (err: any) {
      setError(err.message || "Error al actualizar el producto")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Eliminar un producto (solo admin)
  const deleteProduct = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase.from("products").delete().eq("id", id)

      if (deleteError) throw deleteError

      return true
    } catch (err: any) {
      setError(err.message || "Error al eliminar el producto")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
