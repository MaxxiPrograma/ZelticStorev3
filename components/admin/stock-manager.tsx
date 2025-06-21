"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useProductStore } from "@/lib/store"
import type { Size } from "@/lib/types"
import { Search, Save } from "lucide-react"
import Image from "next/image"

export function StockManager() {
  const { products, updateStock } = useProductStore()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [stockUpdates, setStockUpdates] = useState<Record<string, number>>({})

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toString().includes(searchTerm),
  )

  const handleStockChange = (productId: number, size: Size, value: number) => {
    const key = `${productId}-${size}`
    setStockUpdates((prev) => ({ ...prev, [key]: value }))
  }

  const getCurrentStock = (productId: number, size: Size) => {
    const key = `${productId}-${size}`
    if (key in stockUpdates) {
      return stockUpdates[key]
    }

    const product = products.find((p) => p.id === productId)
    const inventoryItem = product?.inventory.find((item) => item.size === size)
    return inventoryItem?.stock || 0
  }

  const handleSaveStock = (productId: number, size: Size) => {
    const key = `${productId}-${size}`
    if (key in stockUpdates) {
      updateStock(productId, size, stockUpdates[key])

      // Eliminar la entrada del objeto de actualizaciones
      const newStockUpdates = { ...stockUpdates }
      delete newStockUpdates[key]
      setStockUpdates(newStockUpdates)

      toast({
        title: "Stock actualizado",
        description: "El inventario ha sido actualizado correctamente.",
      })
    }
  }

  const handleSaveAllStock = () => {
    Object.entries(stockUpdates).forEach(([key, value]) => {
      const [productId, size] = key.split("-")
      updateStock(Number.parseInt(productId), size as Size, value)
    })

    setStockUpdates({})

    toast({
      title: "Stock actualizado",
      description: "Todo el inventario ha sido actualizado correctamente.",
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Inventario</h2>
        {Object.keys(stockUpdates).length > 0 && (
          <Button onClick={handleSaveAllStock} className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" /> Guardar Todos los Cambios
          </Button>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Buscar productos por nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-800 border-zinc-700"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-zinc-800 rounded-lg">
            <p className="text-zinc-400">No se encontraron productos.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-zinc-800 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-32 relative flex-shrink-0">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-grow">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-blue-400">{product.price}</p>
                    <p className="text-zinc-400 text-sm">ID: {product.id}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.inventory.map((item) => {
                      const key = `${product.id}-${item.size}`
                      const hasChanges = key in stockUpdates

                      return (
                        <div key={item.size} className="space-y-2">
                          <Label className="text-sm font-medium">Talle {item.size}</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              value={getCurrentStock(product.id, item.size)}
                              onChange={(e) =>
                                handleStockChange(product.id, item.size, Number.parseInt(e.target.value) || 0)
                              }
                              className={`bg-zinc-700 border-zinc-600 ${hasChanges ? "border-yellow-500" : ""}`}
                            />
                            {hasChanges && (
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleSaveStock(product.id, item.size)}
                                className="h-8 w-8"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-zinc-400">Stock actual: {item.stock} unidades</div>
                        </div>
                      )
                    })}
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
