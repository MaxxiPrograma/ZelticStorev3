// app/carrito/page.tsx
"use client"

import { useState, useEffect } from "react" // Importa useEffect
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getTotalItems } = useCartStore()
  const [showCheckout, setShowCheckout] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false); // Nuevo estado para controlar la hidratación

  // Ejecutar solo en el cliente después de la hidratación
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const totalItems = getTotalItems()
  const total = getTotal()

  const handleQuantityChange = (id: number, size: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id, size)
    } else {
      updateQuantity(id, size, newQuantity)
    }
  }

  // Función helper para formatear precio
  const formatPrice = (price: string | number) => {
    if (typeof price === "string") {
      return price.startsWith("$") ? price : `$${price}`
    }
    return `$${Number(price).toFixed(2)}`
  }

  // Función helper para calcular precio total del item
  const getItemTotal = (price: string | number, quantity: number) => {
    let numPrice: number
    if (typeof price === "string") {
      numPrice = Number.parseFloat(price.replace("$", ""))
    } else {
      numPrice = Number(price)
    }
    return `$${(numPrice * quantity).toFixed(2)}`
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setShowCheckout(false)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Carrito
            </Button>
            <h1 className="text-3xl font-bold">Finalizar Compra</h1>
          </div>
          <CheckoutForm />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Seguir Comprando
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          <p className="text-zinc-400 mt-2">
            {/* Lógica de hidratación aplicada aquí */}
            {isHydrated ? (
              totalItems > 0
                ? `${totalItems} ${totalItems === 1 ? "producto" : "productos"} en tu carrito`
                : "Tu carrito está vacío"
            ) : (
              // Contenido a mostrar en el servidor o antes de la hidratación en el cliente
              // Puedes poner aquí "Cargando carrito..." o una cadena vacía ""
              "Cargando carrito..." // Esto asegura que el HTML sea consistente
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-zinc-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
            <p className="text-zinc-400 mb-6">¡Descubre nuestros increíbles jeans y encuentra tu estilo perfecto!</p>
            <Link href="/productos">
              <Button className="bg-blue-600 hover:bg-blue-700">Explorar Productos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.size}`} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                        <p className="text-zinc-400 text-sm">Talle: {item.size}</p>
                        <p className="text-blue-400 font-semibold mt-1">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="text-sm font-medium">{getItemTotal(item.price, item.quantity)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={clearCart} className="text-red-400 border-red-400 hover:bg-red-950">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vaciar Carrito
                </Button>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>
                      {/* También aplicar la lógica de hidratación aquí para consistencia */}
                      {isHydrated ? (
                        `Subtotal (${totalItems} ${totalItems === 1 ? "producto" : "productos"})`
                      ) : (
                        `Subtotal (Cargando...)` // O un valor por defecto como "Subtotal (0 productos)"
                      )}
                    </span>
                    <span>${total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span className="text-green-400">Coordinar por WhatsApp</span>
                  </div>

                  <Separator className="bg-zinc-700" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-400">${total}</span>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                    onClick={() => setShowCheckout(true)}
                  >
                    Coordinar pago y envio                  </Button>

                  <div className="text-xs text-zinc-400 text-center">
                    <Link href="/devoluciones">
                      <button className="flex items-center justify-center w-full">
                        <p>• Información sobre envios</p>
                      </button>
                    </Link>
                    <p>• Garantía de 1 mese</p>
                    <Link href="/envios-entregas">
                      <button className="flex items-center justify-center w-full">
                        <p>• Información sobre envios</p>
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}