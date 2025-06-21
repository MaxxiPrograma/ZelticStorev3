// checkout-form.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, ShoppingBag, Send } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore, useProductStore, useOrderStore } from "@/lib/store"

export function CheckoutForm() {
  const { items, removeItem, clearCart, getTotal, getTotalItems } = useCartStore()
  const { products, updateStock, fetchProducts } = useProductStore() // Add fetchProducts here
  const { addOrder } = useOrderStore()
  const { toast } = useToast()

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [fetchProducts, products.length])

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    codigoPostal: "",
    notas: "",
    // email: "", // ¡ELIMINADO! Email es opcional en OrderCustomer y no se recoge en este formulario.
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.direccion || !formData.codigoPostal) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Por favor añade productos a tu carrito antes de continuar.",
        variant: "destructive",
      })
      return
    }

    // Verificar stock antes de procesar la orden
    // const stockError = items.find((item) => {
    //   const product = products.find((p) => p.id === item.id)
    
    //   if (!product || !product.inventory) {
    //     toast({
    //       title: "Error de stock",
    //       description: `No se pudo verificar el stock para ${item.name}. Por favor, inténtalo de nuevo.`,
    //       variant: "destructive",
    //     });
    //     return true;
    //   }
    
    //   const inventoryItem = product.inventory.find((inv) => inv.size === item.size)
    //   if (!inventoryItem || inventoryItem.stock < item.quantity) return true
    
    //   return false
    // })
    
    // if (stockError) {
    //   toast({
    //     title: "Problema de stock",
    //     description: "Algunos productos no tienen suficiente stock disponible.",
    //     variant: "destructive",
    //   })
    //   return
    // }
    
    // Actualizar stock
    // items.forEach((item) => {
    //   const product = products.find((p) => p.id === item.id)
    //   if (product) {
    //     const inventoryItem = product.inventory.find((inv) => inv.size === item.size)
    //     if (inventoryItem) {
    //       updateStock(product.id, item.size, inventoryItem.stock - item.quantity)
    //     }
    //   }
    // })
    
    // Guardar la orden
    // addOrder({
    //   customer: {
    //     name: formData.nombre,
    //     lastName: formData.apellido,
    //     phone: formData.telefono,
    //     address: formData.direccion,
    //     postalCode: formData.codigoPostal,
    //     notes: formData.notas,
    //   },
    //   items: [...items],
    //   total: getTotal(),
    // })

    // Crear mensaje para WhatsApp
    let mensaje = `*NUEVO PEDIDO - ZELTIC JEANS*%0A%0A`
    mensaje += `*Datos del cliente:*%0A`
    mensaje += `Nombre: ${formData.nombre} ${formData.apellido}%0A`
    mensaje += `Teléfono: ${formData.telefono}%0A`
    mensaje += `Dirección: ${formData.direccion}%0A`
    mensaje += `Código Postal: ${formData.codigoPostal}%0A`

    if (formData.notas) {
      mensaje += `Notas: ${formData.notas}%0A`
    }

    mensaje += `%0A*Productos:*%0A`

    items.forEach((item) => {
      mensaje += `- ${item.name} (Talle ${item.size}) x ${item.quantity} = $${item.price} c/u%0A`
    })

    mensaje += `%0A*Total: $${getTotal()}*`

    // Número de WhatsApp de la tienda (reemplazar con el número real)
    const whatsappNumber = "+5491140461805"

    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank")

    // Limpiar formulario y carrito
    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      codigoPostal: "",
      notas: "",
    })

    clearCart()

    toast({
      title: "¡Pedido enviado!",
      description: "Tu pedido ha sido enviado a WhatsApp. Pronto nos pondremos en contacto contigo.",
    })
  }

  return (
    <section className="py-20 bg-black" id="checkout">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">FINALIZAR COMPRA</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Completa tus datos para enviar tu pedido por WhatsApp y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario de datos */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-6">Datos de Contacto</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    placeholder="Tu apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              {/* El campo de email se eliminó de aquí si se optó por la Opción B (opcional en OrderCustomer) */}

              <div className="space-y-2 mb-4">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  placeholder="Tu dirección completa"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="codigoPostal">Código Postal *</Label>
                <Input
                  id="codigoPostal"
                  name="codigoPostal"
                  placeholder="Tu código postal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                  required
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="notas">Notas adicionales (opcional)</Label>
                <Textarea
                  id="notas"
                  name="notas"
                  placeholder="Instrucciones especiales para tu pedido"
                  value={formData.notas}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={items.length === 0}
              >
                <Send className="mr-2 h-5 w-5" /> Enviar Pedido por WhatsApp
              </Button>

              {items.length === 0 && (
                <p className="text-center text-sm text-zinc-400 mt-2">Añade productos al carrito para continuar</p>
              )}
            </form>
          </div>

          {/* Resumen del carrito */}
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Tu Carrito</h3>
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <span>{items.length} productos</span>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-zinc-600" />
                <p className="text-zinc-400">Tu carrito está vacío</p>
                <p className="text-zinc-500 text-sm mt-2">Añade productos para continuar</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {items.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex items-center gap-4 bg-zinc-800 p-3 rounded-lg"
                    >
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <div>
                            <p className="text-blue-400">
                              ${item.price} x {item.quantity}
                            </p>
                            <p className="text-xs text-zinc-400">Talle: {item.size}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-800 mt-6 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Subtotal</span>
                    <span>${getTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Envío</span>
                    <span>A calcular</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${getTotal()}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
