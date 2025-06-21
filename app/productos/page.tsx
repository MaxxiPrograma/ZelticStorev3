"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Grid, List, RefreshCw, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import type { ProductWithInventory } from "@/lib/supabase/types"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"

// Importación dinámica para evitar problemas de SSR
const ProductFormModal = dynamic(
  () => import("@/components/admin/product-form-modal").then((mod) => ({ default: mod.ProductFormModal })),
  { ssr: false },
)

export default function ProductosPage() {
  const [products, setProducts] = useState<ProductWithInventory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const searchParams = useSearchParams()
  const [filterByTag, setFilterByTag] = useState("all")

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setFilterByTag(categoryParam)
    }
  }, [searchParams])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [allTags, setAllTags] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductWithInventory | null>(null)
  const [user, setUser] = useState<any>(null)

  // Verificar si el usuario es admin
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        setUser({ ...user, profile })
      }
    }
    checkUser()
  }, [])

  const isAdmin = user?.profile?.role === "admin"

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Cargando productos...")

      const { data, error: queryError } = await supabase
        .from("products")
        .select(`
          *,
          inventory (*)
        `)
        .order("created_at", { ascending: false })

      if (queryError) {
        console.error("❌ Error en query:", queryError)
        throw new Error(`Error al consultar productos: ${queryError.message}`)
      }

      console.log("📦 Productos cargados:", data?.length || 0)
      setProducts(data || [])

      const tags = Array.from(new Set(data?.map((p) => p.tag).filter(Boolean) || []))
      setAllTags(tags)
    } catch (error: any) {
      console.error("💥 Error completo:", error)
      setError(error.message || "Error desconocido al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleProductSaved = () => {
    loadProducts()
    setShowProductModal(false)
    setEditingProduct(null)
  }

  const handleEditProduct = (product: ProductWithInventory) => {
    setEditingProduct(product)
    setShowProductModal(true)
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      loadProducts()
    } catch (error: any) {
      console.error("Error eliminando producto:", error)
    }
  }

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = filterByTag === "all" || product.tag?.toLowerCase() === filterByTag.toLowerCase()
      return matchesSearch && matchesTag
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return Number.parseFloat(a.price.toString()) - Number.parseFloat(b.price.toString())
        case "price-high":
          return Number.parseFloat(b.price.toString()) - Number.parseFloat(a.price.toString())
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* INICIO DE LA MODIFICACIÓN */}
          <div className="flex items-center mb-4">
            {/* Este div ocupará el espacio a la izquierda para centrar el h1 */}
            <div className="flex-grow"></div>
            <h1 className="text-4xl md:text-5xl font-bold">
              TODOS LOS <span className="text-blue-500">PRODUCTOS</span>
            </h1>
            {isAdmin ? (
              <Button onClick={() => setShowProductModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Añadir Producto
              </Button>
            ) : (
              // Este div ocupará el espacio a la derecha para centrar el h1 cuando no hay botón de admin
              <div className="flex-grow"></div>
            )}
          </div>
          {/* FIN DE LA MODIFICACIÓN */}
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Descubre nuestra colección completa de jeans premium con estilo drip. Calidad superior y diseños únicos para
            cada ocasión.
          </p>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8">
            <h3 className="text-red-400 font-bold mb-2">Error al cargar productos:</h3>
            <p className="text-red-300 mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={loadProducts} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="mr-2 h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        )}

        {/* Filtros y búsqueda */}
        <div className="bg-zinc-900 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Búsqueda */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar productos</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>

            {/* Filtro por etiqueta */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por categoría</label>
              <Select value={filterByTag} onValueChange={setFilterByTag}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ordenar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ordenar por</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vista y Recargar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Vista</label>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="bg-zinc-800 border-zinc-700"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="bg-zinc-800 border-zinc-700"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={loadProducts}
                  className="bg-zinc-800 border-zinc-700"
                  disabled={loading}
                >
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-zinc-400">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-zinc-800 rounded-lg p-4 space-y-3">
                <Skeleton className="h-64 w-full bg-zinc-700" />
                <Skeleton className="h-6 w-3/4 bg-zinc-700" />
                <Skeleton className="h-4 w-1/2 bg-zinc-700" />
                <div className="flex gap-2 pt-3">
                  <Skeleton className="h-10 w-full bg-zinc-700" />
                  <Skeleton className="h-10 w-full bg-zinc-700" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-zinc-900 rounded-lg">
            <Filter className="h-16 w-16 mx-auto mb-4 text-red-600" />
            <h3 className="text-xl font-bold mb-2 text-red-400">Error al cargar productos</h3>
            <p className="text-zinc-400 mb-4">Verifica la consola para más detalles.</p>
            <Button onClick={loadProducts} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reintentar
            </Button>
          </div>
        ) : filteredProducts.length === 0 && products.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900 rounded-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">No hay productos disponibles</h3>
            <p className="text-zinc-400 mb-4">Un administrador debe añadir productos primero.</p>
            <Button onClick={loadProducts} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Recargar
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900 rounded-lg">
            <Filter className="h-16 w-16 mx-auto mb-4 text-zinc-600" />
            <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
            <p className="text-zinc-400 mb-4">Intenta ajustar los filtros o términos de búsqueda.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilterByTag("all")
                setSortBy("name")
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "gap-6",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col space-y-6",
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            ))}
          </div>
        )}

        {/* Call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-blue-100 mb-6">Contáctanos y te ayudaremos a encontrar el jean perfecto para tu estilo.</p>
          <Link href="/contacto">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contactar Ahora
            </Button>
          </Link>
        </div>
      </main>

      {/* Modal de producto */}
      {showProductModal && (
        <ProductFormModal
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false)
            setEditingProduct(null)
          }}
          onSave={handleProductSaved}
          product={editingProduct}
        />
      )}

      <Footer />
    </div>
  )
}