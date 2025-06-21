"use client"

import { cn } from "@/lib/utils"

interface SizeSelectorProps {
  inventory: Array<{ size: string; stock: number }>
  selectedSize?: string
  onSelectSize: (size: string) => void
}

export function SizeSelector({ inventory, selectedSize, onSelectSize }: SizeSelectorProps) {
  // Ordenar los tamaños numéricamente
  const sortedInventory = [...inventory].sort((a, b) => {
    const sizeA = Number.parseInt(a.size)
    const sizeB = Number.parseInt(b.size)
    return sizeA - sizeB
  })

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Seleccionar Talle</label>
        <a href="/guia-tallas" className="text-xs text-blue-400 hover:underline">
          Guía de Talles
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortedInventory.map((item) => (
          <button
            key={item.size}
            onClick={() => onSelectSize(item.size)}
            disabled={item.stock <= 0}
            className={cn(
              "h-10 min-w-10 px-3 rounded border font-medium transition-colors",
              selectedSize === item.size
                ? "bg-blue-600 border-blue-600 text-white"
                : item.stock > 0
                  ? "border-zinc-600 hover:border-zinc-400 text-white"
                  : "border-zinc-800 text-zinc-600 cursor-not-allowed line-through",
            )}
          >
            {item.size}
            {item.stock <= 0 && <span className="ml-1 text-xs">(Sin stock)</span>}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="text-xs text-zinc-400">
          Talle {selectedSize} seleccionado - Stock disponible:{" "}
          {inventory.find((i) => i.size === selectedSize)?.stock || 0} unidades
        </p>
      )}
    </div>
  )
}
