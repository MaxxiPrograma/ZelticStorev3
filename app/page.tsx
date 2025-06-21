// app/page.tsx
// REMOVE THE LINE BELOW: "use client"

// REMOVE THE LINE BELOW: "use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandShowcase } from "@/components/brand-showcase"
import { Features } from "@/components/features"
import { AboutBrand } from "@/components/about-brand"
// IMPORTANTE: Asegúrate de que esta importación apunte a tu componente AutoSlider
// Si tu archivo se llama 'auto-slider.tsx' y la función exportada es 'AutoSlider',
// esta es la importación correcta:
import { AutoSlider } from "@/components/auto-slider"
// Si por alguna razón tu componente se llama 'LifestyleSlider' en el archivo 'lifestyle-slider.tsx',
// entonces usarías: import { LifestyleSlider } from "@/components/lifestyle-slider"
// Pero basándome en tu petición de no cambiar nombres, asumo 'AutoSlider' de 'auto-slider.tsx'.
import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/supabase/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default async function Home() {
  let featuredProducts: Product[] = []
  let loading = true
  let error: string | null = null

  try {
    const supabase = createServerSupabaseClient()

    console.log("🏠 Cargando productos destacados...")

    const { data: testData, error: testError } = await supabase
      .from("products")
      .select("count", { count: "exact", head: true })

    if (testError) {
      console.error("❌ Error de conexión en home:", testError)
      throw new Error(`Error de conexión: ${testError.message}`)
    }

    console.log("✅ Conexión OK. Total productos:", testData)

    const { data, error: queryError } = await supabase
      .from("products")
      .select(
        `
            *,
            inventory (*)
          `
      )
      .limit(4)

    if (queryError) {
      console.error("❌ Error al cargar productos destacados:", queryError)
      throw new Error(`Error en query: ${queryError.message}`)
    }

    console.log("🌟 Productos destacados cargados:", data)
    featuredProducts = data || []
  } catch (err: any) {
    console.error("💥 Error completo en home:", err)
    error = err.message || "Error desconocido"
  } finally {
    loading = false
  }

  const handleRetry = () => {
    // This function will now only trigger a client-side reload
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />

        {/* Sección de Productos Destacados */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-white"></h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-4 space-y-3">
                    <Skeleton className="h-64 w-full bg-zinc-700" />
                    <Skeleton className="h-6 w-3/4 bg-zinc-700" />
                    <Skeleton className="h-4 w-1/2 bg-zinc-700" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 text-center">
                <h3 className="text-red-400 font-bold mb-4">Error al cargar productos</h3>
                <p className="text-red-300 mb-4">{error}</p>
                <p className="text-zinc-400 text-sm mb-4">Revisa la consola del navegador para más detalles</p>
                <Button onClick={handleRetry} className="bg-red-600 hover:bg-red-700">
                  Reintentar
                </Button>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-8 text-center">
                <h3 className="text-yellow-400 font-bold mb-4">No hay productos disponibles</h3>
                <p className="text-yellow-300 mb-4">Parece que no hay productos en la base de datos.</p>
                <p className="text-zinc-400 text-sm mb-4">Un administrador debe añadir productos primero.</p>
                <Button onClick={handleRetry} className="bg-yellow-600 hover:bg-yellow-700">
                  Recargar
                </Button>
              </div>
            ) : (
              <FeaturedProducts products={featuredProducts} />
            )}
          </div>
        </section>

        <BrandShowcase />
        <Features />
        <AboutBrand />

        {/* ¡ESTA ES LA SECCIÓN CON LA SOLUCIÓN PARA TU SLIDER! */}
        {/* Aquí es donde tu componente AutoSlider debe recibir una altura. */}
       

      </main>
      <Footer />
    </div>
  )
}