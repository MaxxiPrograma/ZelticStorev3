"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Trash2, Edit, Plus, Save, Loader2 } from "lucide-react"
import { ImageSlider } from "@/components/image-slider"
import { ImageUpload } from "./image-upload"
import { supabase } from "@/lib/supabase/client"

interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  category: string
  tag: string
  inventory: { size: string; stock: number }[]
}

export function ProductsManager() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    images: ["/placeholder.svg?height=400&width=300"],
    tag: "",
    description: "",
    category: "jeans",
    inventory: [
      { size: "XS", stock: 0 },
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
  })

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      console.log("🔄 Cargando productos...")

      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (productsError) {
        console.error("❌ Error cargando productos:", productsError)
        throw productsError
      }

      console.log("📦 Productos obtenidos:", productsData?.length || 0)

      // Cargar inventario para cada producto
      const productsWithInventory = await Promise.all(
        (productsData || []).map(async (product) => {
          const { data: inventoryData, error: inventoryError } = await supabase
            .from("inventory")
            .select("size, stock")
            .eq("product_id", product.id)

          if (inventoryError) {
            console.error("❌ Error cargando inventario:", inventoryError)
            return { ...product, inventory: [] }
          }

          return {
            ...product,
            inventory: inventoryData || [],
          }
        }),
      )

      setProducts(productsWithInventory)
      console.log("✅ Productos cargados exitosamente:", productsWithInventory.length)
    } catch (error) {
      console.error("❌ Error general:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInventoryChange = (size: string, stock: number) => {
    setFormData((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) => (item.size === size ? { ...item, stock } : item)),
    }))
  }

  const handleAddInventorySize = (size: string) => {
    if (!formData.inventory.some((item) => item.size === size)) {
      setFormData((prev) => ({
        ...prev,
        inventory: [...prev.inventory, { size, stock: 0 }],
      }))
    }
  }

  const handleRemoveInventorySize = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      inventory: prev.inventory.filter((item) => item.size !== size),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Validación básica
      if (!formData.name || !formData.price) {
        toast({
          title: "Error en el formulario",
          description: "Por favor completa los campos obligatorios.",
          variant: "destructive",
        })
        return
      }

      const priceNumber = Number.parseFloat(formData.price.toString().replace(/[^0-9.]/g, ""))
      if (isNaN(priceNumber) || priceNumber <= 0) {
        toast({
          title: "Error en el precio",
          description: "Por favor ingresa un precio válido.",
          variant: "destructive",
        })
        return
      }

      if (editingProduct) {
        // Actualizar producto existente
        const { error: updateError } = await supabase
          .from("products")
          .update({
            name: formData.name,
            description: formData.description,
            price: priceNumber,
            images: formData.images,
            category: formData.category,
            tag: formData.tag,
          })
          .eq("id", editingProduct.id)

        if (updateError) throw updateError

        // Actualizar inventario
        for (const item of formData.inventory) {
          await supabase.from("inventory").upsert({
            product_id: editingProduct.id,
            size: item.size,
            stock: item.stock,
          })
        }

        toast({
          title: "Producto actualizado",
          description: `${formData.name} ha sido actualizado correctamente.`,
        })
      } else {
        // Crear nuevo producto
        const { data: newProduct, error: insertError } = await supabase
          .from("products")
          .insert({
            name: formData.name,
            description: formData.description,
            price: priceNumber,
            images: formData.images,
            category: formData.category,
            tag: formData.tag,
          })
          .select()
          .single()

        if (insertError) throw insertError

        // Crear inventario para el nuevo producto
        const inventoryInserts = formData.inventory.map((item) => ({
          product_id: newProduct.id,
          size: item.size,
          stock: item.stock,
        }))

        const { error: inventoryError } = await supabase.from("inventory").insert(inventoryInserts)

        if (inventoryError) throw inventoryError

        toast({
          title: "Producto creado",
          description: `${formData.name} ha sido creado correctamente.`,
        })
      }

      // Resetear formulario y recargar productos
      resetForm()
      await loadProducts()
    } catch (error: any) {
      console.error("❌ Error al guardar producto:", error)
      toast({
        title: "Error",
        description: error.message || "Error al guardar el producto",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      images: ["/placeholder.svg?height=400&width=300"],
      tag: "",
      description: "",
      category: "jeans",
      inventory: [
        { size: "XS", stock: 0 },
        { size: "S", stock: 0 },
        { size: "M", stock: 0 },
        { size: "L", stock: 0 },
        { size: "XL", stock: 0 },
      ],
    })
    setEditingProduct(null)
    setIsAdding(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      images: Array.isArray(product.images) ? [...product.images] : [],
      tag: product.tag || "",
      description: product.description || "",
      category: product.category || "jeans",
      inventory: [...product.inventory],
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return
    }

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado correctamente.",
      })

      await loadProducts()
    } catch (error: any) {
      console.error("❌ Error al eliminar producto:", error)
      toast({
        title: "Error",
        description: "Error al eliminar el producto",
        variant: "destructive",
      })
    }
  }

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "40", "42"]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando productos...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Productos</h2>
        {!isAdding ? (
          <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Añadir Producto
          </Button>
        ) : (
          <Button variant="outline" onClick={resetForm}>
            Cancelar
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="bg-zinc-800 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">{editingProduct ? "Editar Producto" : "Añadir Nuevo Producto"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-zinc-700 border-zinc-600"
                  placeholder="Ej: Jean Slim Fit Negro"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="89.99"
                  className="bg-zinc-700 border-zinc-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">Etiqueta (opcional)</Label>
              <Input
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                placeholder="Nuevo, Destacado, Oferta, etc."
                className="bg-zinc-700 border-zinc-600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              >
                <option value="jeans">Jeans</option>
                <option value="camisas">Camisas</option>
                <option value="remeras">Remeras</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-zinc-700 border-zinc-600"
                rows={3}
                placeholder="Describe las características del producto..."
              />
            </div>

            <ImageUpload
              images={formData.images}
              onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
              maxImages={5}
            />

            <div className="space-y-2">
              <Label>Inventario por Talle</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.inventory.map((item) => (
                  <div key={item.size} className="flex items-center space-x-2 bg-zinc-700 p-3 rounded-md">
                    <span className="font-medium w-8">{item.size}</span>
                    <Input
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) => handleInventoryChange(item.size, Number.parseInt(e.target.value) || 0)}
                      className="bg-zinc-600 border-zinc-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemoveInventorySize(item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Añadir Talle</Label>
              <div className="flex flex-wrap gap-2">
                {availableSizes
                  .filter((size) => !formData.inventory.some((item) => item.size === size))
                  .map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant="outline"
                      onClick={() => handleAddInventorySize(size)}
                      className="bg-zinc-700 border-zinc-600"
                    >
                      {size}
                    </Button>
                  ))}
              </div>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {editingProduct ? "Actualizar Producto" : "Guardar Producto"}
                </>
              )}
            </Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {products.length === 0 ? (
          <div className="text-center py-12 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400 mb-4">No hay productos disponibles.</p>
            <Button onClick={() => setIsAdding(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Añadir Primer Producto
            </Button>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-zinc-800 p-4 rounded-lg flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-32 h-32 relative flex-shrink-0">
                <ImageSlider images={product.images} alt={product.name} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-blue-400">${product.price}</p>
                    {product.tag && <span className="text-xs bg-blue-600 px-2 py-1 rounded">{product.tag}</span>}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {product.description && <p className="text-zinc-400 text-sm mt-2">{product.description}</p>}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Inventario:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.inventory.map((item) => (
                      <div
                        key={item.size}
                        className={`text-xs px-2 py-1 rounded ${
                          item.stock > 0 ? "bg-green-900/50 text-green-200" : "bg-red-900/50 text-red-200"
                        }`}
                      >
                        {item.size}: {item.stock} unidades
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
