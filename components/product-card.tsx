"use client"

import { useState, type MouseEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingBag, Eye, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageSlider } from "@/components/image-slider"
import { useCartStore } from "@/lib/store"
import type { ProductWithInventory, Inventory } from "@/lib/supabase/types"

interface ProductCardProps {
  product: ProductWithInventory
  isAdmin?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function ProductCard({ product, isAdmin = false, onEdit, onDelete }: ProductCardProps) {
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)

  const handleQuickAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)

    try {
      const availableInventory = product.inventory?.find((item: Inventory) => item.stock > 0)

      if (!availableInventory) {
        toast({
          title: "Sin stock",
          description: "Este producto no tiene stock disponible.",
          variant: "destructive",
        })
        return
      }

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images?.[0] || "",
        size: availableInventory.size,
      })

      toast({
        title: "Producto añadido",
        description: `${product.name} (Talle ${availableInventory.size}) ha sido añadido al carrito.`,
      duration: 3000,
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit?.()
  }

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.()
  }

  const hasStock = product.inventory?.some((item: Inventory) => item.stock > 0) || false

  return (
    <Card className="bg-zinc-800 border-zinc-700 overflow-hidden group hover:border-zinc-600 transition-colors">
        <div className="relative">
          {product.tag && (
            <div className="absolute top-2 left-2 z-10 bg-blue-600 text-xs font-bold py-1 px-2 rounded">
              {product.tag}
            </div>
          )}
          {isAdmin && (
            <div className="absolute top-2 right-2 z-10 flex gap-1">
              <Button size="sm" variant="secondary" onClick={handleEdit} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete} className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
          <ImageSlider
            images={product.images || []}
            alt={product.name}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <Link href={`/producto/${product.id}`}>
          <CardContent className="pt-4">
          <h3 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <p className="text-blue-400 font-semibold">${product.price}</p>
          {product.description && (
            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{product.description.substring(0, 100)}...</p>
          )}
          <div className="mt-2 text-xs text-zinc-500">
            Talles disponibles:{" "}
            {product.inventory
              ?.filter((item: Inventory) => item.stock > 0)
              .map((item: Inventory) => item.size)
              .join(", ") || "Sin stock"}
          </div>
        </CardContent>
        </Link>
      <CardFooter className="flex gap-2">
        <Link href={`/producto/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Eye className="mr-2 h-4 w-4" /> Ver Detalles
          </Button>
        </Link>
        {!isAdmin && (
          <Button
            className="flex-1 bg-zinc-700 hover:bg-zinc-600"
            onClick={handleQuickAdd}
            disabled={!hasStock || isAdding}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isAdding ? "Añadiendo..." : hasStock ? "Añadir" : "Sin Stock"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
