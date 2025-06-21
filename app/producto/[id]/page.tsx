"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingBag, Heart, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ImageSlider } from "@/components/image-slider"
import { SizeSelector } from "@/components/size-selector"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCartStore } from "@/lib/store"
import { supabase } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

// Tipos locales para esta página
interface InventoryItem {
  id: number
  product_id: number
  size: string
  stock: number
}

interface ProductWithInventory {
  id: number
  name: string
  description: string | null
  price: number
  images: string[] | null
  category: string | null
  tag: string | null
  inventory: InventoryItem[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCartStore()

  const [product, setProduct] = useState<ProductWithInventory | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const productId = params.id

        console.log("🔍 Cargando producto con ID:", productId)

        // Primero intentamos cargar el producto básico
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single()

        if (productError) {
          console.error("❌ Error cargando producto:", productError)
          throw productError
        }

        if (!productData) {
          console.error("❌ Producto no encontrado")
          toast({
            title: "Producto no encontrado",
            description: "El producto que buscas no existe.",
            variant: "destructive",
          })
          router.push("/productos")
          return
        }

        console.log("✅ Producto cargado:", productData)

        // Luego cargamos el inventario
        const { data: inventoryData, error: inventoryError } = await supabase
          .from("inventory")
          .select("*")
          .eq("product_id", productId)

        if (inventoryError) {
          console.error("⚠️ Error cargando inventario:", inventoryError)
        }

        console.log("📦 Inventario cargado:", inventoryData)

        // Combinamos los datos
        const productWithInventory: ProductWithInventory = {
          ...productData,
          inventory: inventoryData || [],
        }

        setProduct(productWithInventory)
        console.log("✅ Producto completo:", productWithInventory)
      } catch (error) {
        console.error("❌ Error general:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el producto.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadProduct()
    }
  }, [params.id, router, toast])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-10 w-24 bg-zinc-800" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full bg-zinc-800" />
            <div className="space-y-6">
              <div>
                <Skeleton className="h-8 w-24 mb-2 bg-zinc-800" />
                <Skeleton className="h-12 w-3/4 mb-2 bg-zinc-800" />
                <Skeleton className="h-8 w-32 bg-zinc-800" />
              </div>
              <Skeleton className="h-32 w-full bg-zinc-800" />
              <Skeleton className="h-16 w-full bg-zinc-800" />
              <Skeleton className="h-12 w-full bg-zinc-800" />
              <Skeleton className="h-14 w-full bg-zinc-800" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-full bg-zinc-800" />
                <Skeleton className="h-12 w-full bg-zinc-800" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-zinc-400 mb-6">El producto que buscas no existe o ha sido eliminado.</p>
          <Button onClick={() => router.push("/productos")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const selectedInventoryItem = selectedSize ? product.inventory.find((item) => item.size === selectedSize) : undefined
  const isOutOfStock = !selectedSize || !selectedInventoryItem || selectedInventoryItem.stock <= 0
  const maxQuantity = selectedInventoryItem?.stock || 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecciona un talle",
        description: "Por favor selecciona un talle antes de añadir al carrito.",
        variant: "destructive",
      })
      return
    }

    if (isOutOfStock) {
      toast({
        title: "Sin stock",
        description: `Lo sentimos, no hay stock disponible para el talle ${selectedSize}.`,
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      quantity,
      image: product.images?.[0] || "/placeholder.svg?height=400&width=300",
      size: selectedSize,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} (Talle ${selectedSize}) x${quantity} ha sido añadido al carrito.`,
      duration: 3000,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Mira este increíble jean de Zeltic: ${product.name}`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Enlace copiado",
        description: "El enlace del producto ha sido copiado al portapapeles.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <nav className="text-sm text-zinc-400">
            <span>Inicio</span> / <span>Productos</span> / <span className="text-white">{product.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div>
            <ImageSlider
              images={
                product.images && product.images.length > 0 ? product.images : ["/placeholder.svg?height=400&width=300"]
              }
              alt={product.name}
              showThumbnails
            />
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.tag && <Badge className="bg-blue-600">{product.tag}</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-blue-400">${product.price}</p>
            </div>

            {/* Descripción */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-zinc-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Selector de talle */}
            <div>
              <SizeSelector inventory={product.inventory} onSelectSize={setSelectedSize} selectedSize={selectedSize} />
            </div>

            {/* Selector de cantidad */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Cantidad</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                  disabled={quantity >= maxQuantity}
                >
                  +
                </Button>
                <span className="text-sm text-zinc-400 ml-4">{selectedSize && `Máximo: ${maxQuantity} unidades`}</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-4">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isOutOfStock ? "Sin Stock" : `Añadir al Carrito - $${product.price}`}
              </Button>

              <div className="flex gap-3">
                
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" /> Compartir
                </Button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="border-t border-zinc-800 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Material</h4>
                  <p className="text-zinc-400">100% Algodón Denim</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Cuidado</h4>
                  <p className="text-zinc-400">Lavar a máquina 30°C</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Origen</h4>
                  <p className="text-zinc-400">Hecho en Argentina</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Garantía</h4>
                  <p className="text-zinc-400">1 meses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Aquí podrías mostrar productos relacionados */}
            <div className="text-center text-zinc-400 col-span-full py-8">
              
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
