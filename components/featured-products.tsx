"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/supabase/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">PRODUCTOS DESTACADOS</h2>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">No hay productos destacados disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/productos">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
