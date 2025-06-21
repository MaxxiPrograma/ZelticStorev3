"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "./image-upload"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import type { ProductWithInventory, Inventory } from "@/lib/supabase/types"

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  product?: ProductWithInventory | null
}

interface InventoryItem {
  size: string
  stock: number
}

const AVAILABLE_SIZES = ["28", "30", "32", "34", "36", "38", "40", "42"]
const CATEGORIES = ["Slim Fit", "Relaxed", "Skinny", "Straight", "Bootcut", "Wide Leg", "Baggy", "Nuevo", "Oferta"]
const TAGS = ["hombre", "mujer", "UNISEX", "jeans", "baggy", "relaxed"]

export function ProductFormModal({ isOpen, onClose, onSave, product }: ProductFormModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Form data
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (isOpen) {
      if (product) {
        // Editing existing product
        setName(product.name || "")
        setDescription(product.description || "")
        setPrice(product.price?.toString() || "")
        setCategory(product.category || "")
        setTag(product.tag || "")
        setImages(product.images || [])
        setInventory(
          product.inventory?.map((item: Inventory) => ({
            size: item.size,
            stock: item.stock,
          })) || [],
        )
      } else {
        // Creating new product
        setName("")
        setDescription("")
        setPrice("")
        setCategory("")
        setTag("")
        setImages([])
        setInventory([])
      }
    }
  }, [isOpen, product])

  const handleAddSize = (size: string) => {
    if (!inventory.find((item) => item.size === size)) {
      setInventory([...inventory, { size, stock: 0 }])
    }
  }

  const handleRemoveSize = (size: string) => {
    setInventory(inventory.filter((item) => item.size !== size))
  }

  const handleUpdateStock = (size: string, stock: number) => {
    setInventory(inventory.map((item) => (item.size === size ? { ...item, stock: Math.max(0, stock) } : item)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !price.trim()) {
      toast({
        title: "Campos requeridos",
        description: "El nombre y precio son obligatorios.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const productData = {
        name: name.trim(),
        description: description.trim() || null,
        price: Number.parseFloat(price),
        category: category || null,
        tag: tag || null,
        images: images.length > 0 ? images : ["/placeholder.svg?height=400&width=300"],
      }

      let productId: number

      if (product) {
        // Update existing product
        const { error: productError } = await supabase.from("products").update(productData).eq("id", product.id)

        if (productError) throw productError
        productId = product.id

        // Delete existing inventory
        await supabase.from("inventory").delete().eq("product_id", product.id)
      } else {
        // Create new product
        const { data: newProduct, error: productError } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single()

        if (productError) throw productError
        productId = newProduct.id
      }

      // Insert inventory
      if (inventory.length > 0) {
        const inventoryData = inventory.map((item) => ({
          product_id: productId,
          size: item.size,
          stock: item.stock,
        }))

        const { error: inventoryError } = await supabase.from("inventory").insert(inventoryData)

        if (inventoryError) throw inventoryError
      }

      toast({
        title: product ? "Producto actualizado" : "Producto creado",
        description: `${name} ha sido ${product ? "actualizado" : "creado"} exitosamente.`,
      })

      onSave()
    } catch (error: any) {
      console.error("Error saving product:", error)
      toast({
        title: "Error",
        description: error.message || "Error al guardar el producto.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>{product ? "Editar Producto" : "Añadir Nuevo Producto"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre del Producto *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Jean Slim Fit Negro"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="89.99"
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tag">Etiqueta</Label>
                <Select value={tag} onValueChange={setTag}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Seleccionar etiqueta" />
                  </SelectTrigger>
                  <SelectContent>
                    {TAGS.map((tagOption) => (
                      <SelectItem key={tagOption} value={tagOption}>
                        {tagOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción del producto..."
                  className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                />
              </div>
            </div>

            {/* Imágenes */}
            <div>
              <ImageUpload images={images} onImagesChange={setImages} maxImages={5} />
            </div>
          </div>

          {/* Gestión de inventario */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Inventario por Talle</Label>
              <Select onValueChange={handleAddSize}>
                <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Añadir talle" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_SIZES.filter((size) => !inventory.find((item) => item.size === size)).map((size) => (
                    <SelectItem key={size} value={size}>
                      Talle {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory.map((item) => (
                <div key={item.size} className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="outline">Talle {item.size}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSize(item.size)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`stock-${item.size}`}>Stock</Label>
                    <Input
                      id={`stock-${item.size}`}
                      type="number"
                      min="0"
                      value={item.stock}
                      onChange={(e) => handleUpdateStock(item.size, Number.parseInt(e.target.value) || 0)}
                      className="bg-zinc-700 border-zinc-600"
                    />
                  </div>
                </div>
              ))}
            </div>

            {inventory.length === 0 && (
              <div className="text-center py-8 text-zinc-400">
                <p>No hay talles añadidos. Selecciona un talle para comenzar.</p>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-zinc-800">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? "Guardando..." : product ? "Actualizar" : "Crear"} Producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Exportación por defecto para dynamic import
export default { ProductFormModal }
