"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductsManager } from "@/components/admin/products-manager"
import { OrdersManager } from "@/components/admin/orders-manager"
import { StockManager } from "@/components/admin/stock-manager"
import { supabase } from "@/lib/supabase/client"

export default function AdminPage() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Verificar si hay sesión activa
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/login")
          return
        }

        // Verificar el rol del usuario en la base de datos
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (error || !profile || profile.role !== "admin") {
          console.log("❌ Acceso denegado: Usuario no es administrador")
          router.push("/")
          return
        }

        console.log("✅ Acceso autorizado: Usuario es administrador")
        setIsAuthorized(true)
      } catch (error) {
        console.error("Error verificando acceso admin:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  // Mostrar loading mientras verifica permisos
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Verificando permisos de administrador...</p>
        </div>
      </div>
    )
  }

  // Si no está autorizado, no mostrar nada (ya se redirigió)
  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-zinc-400 mt-2">
            Bienvenido, {user?.email}. Solo los administradores pueden acceder a esta sección.
          </p>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="products">Gestión de Productos</TabsTrigger>
            <TabsTrigger value="stock">Control de Inventario</TabsTrigger>
            <TabsTrigger value="orders">Administrar Pedidos</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="bg-zinc-900 p-6 rounded-lg">
            <ProductsManager />
          </TabsContent>

          <TabsContent value="stock" className="bg-zinc-900 p-6 rounded-lg">
            <StockManager />
          </TabsContent>

          <TabsContent value="orders" className="bg-zinc-900 p-6 rounded-lg">
            <OrdersManager />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
