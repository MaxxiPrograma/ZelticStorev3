"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Menu, ShoppingBag, User, LogOut } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { supabase } from "@/lib/supabase/client"

// Exportación nombrada para el componente Navbar
export function Navbar() {
  const pathname = usePathname()
  const { items, getTotalItems } = useCartStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false) // Estado para controlar el montaje

  // Evitar problemas de hidratación para el carrito y otros elementos dependientes del cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Verificar si el usuario está autenticado
  useEffect(() => {
    async function checkUser() {
      try {
        setLoading(true)
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Suscribirse a cambios de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // Manejar logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsMobileMenuOpen(false)
  }

  // Detectar scroll para cambiar estilo de navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calcular cantidad total de items en el carrito solo después del montaje del cliente
  const cartItemsCount = mounted ? getTotalItems() : 0

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-md" : "bg-black",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">ZELTIC</span>
          </Link>

          {/* Navegación Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/productos" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                      pathname === "/productos" ? "text-white" : "text-zinc-400",
                    )}
                  >
                    Productos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-zinc-400 hover:text-white",
                    pathname?.includes("/productos/") ? "text-white" : "",
                  )}
                >
                  Categorías
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-900 p-6 no-underline outline-none focus:shadow-md"
                          href="/productos"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Todos los Productos</div>
                          <p className="text-sm leading-tight text-white/90">
                            Explora nuestra colección completa de jeans premium.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800"
                          href="/productos?category=hombre"
                        >
                          <div className="text-sm font-medium leading-none">Hombre</div>
                          <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                            Jeans y pantalones para hombre.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800"
                          href="/productos?category=mujer"
                        >
                          <div className="text-sm font-medium leading-none">Mujer</div>
                          <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                            Jeans y pantalones para mujer.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 focus:bg-zinc-800"
                          href="/productos?category=unisex"
                        >
                          <div className="text-sm font-medium leading-none">Unisex</div>
                          <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                            Diseños para todos los géneros.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/guia-tallas" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                      pathname === "/guia-tallas" ? "text-white" : "text-zinc-400",
                    )}
                  >
                    Guía de Tallas
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contacto" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-white",
                      pathname === "/contacto" ? "text-white" : "text-zinc-400",
                    )}
                  >
                    Contacto
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {/* Carrito */}
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {mounted && cartItemsCount > 0 && ( // Muestra la insignia solo si está montado y hay items
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-600">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Usuario/Login */}
            {loading ? (
              <Button variant="ghost" size="icon" disabled>
                <User className="h-5 w-5" />
              </Button>
            ) : user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="#">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" className="hidden md:flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Button>
              </Link>
            )}

            {/* Menú móvil */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-zinc-900 border-zinc-800">
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <h2 className="text-lg font-bold mb-6">Menú</h2>
                    <nav className="space-y-4">
                      <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800",
                            pathname === "/" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Inicio
                        </div>
                      </Link>
                      <Link href="/productos" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800",
                            pathname === "/productos" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Productos
                        </div>
                      </Link>
                      <Link href="/productos/hombre" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800 pl-4",
                            pathname === "/productos/hombre" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Hombre
                        </div>
                      </Link>
                      <Link href="/productos/mujer" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800 pl-4",
                            pathname === "/productos/mujer" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Mujer
                        </div>
                      </Link>
                      <Link href="/productos/unisex" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800 pl-4",
                            pathname === "/productos/unisex" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Unisex
                        </div>
                      </Link>
                      <Link href="/guia-tallas" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800",
                            pathname === "/guia-tallas" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Guía de Tallas
                        </div>
                      </Link>
                      <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>
                        <div
                          className={cn(
                            "block py-2 border-b border-zinc-800",
                            pathname === "/contacto" ? "text-white" : "text-zinc-400",
                          )}
                        >
                          Contacto
                        </div>
                      </Link>
                    </nav>
                  </div>

                  <div className="mt-auto">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="text-sm truncate max-w-[200px]">{user.email}</span>
                          </div>
                        </div>
                        {user.email === "admin@zeltic.com" && (
                          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full">
                              Panel de Administración
                            </Button>
                          </Link>
                        )}
                        <Button variant="default" className="w-full" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Iniciar Sesión
                          </Button>
                        </Link>
                        <Link href="/registro" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="default" className="w-full">
                            Registrarse
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}