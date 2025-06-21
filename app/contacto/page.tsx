"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Send, Phone, Mail, MapPin, Clock, Users, Store } from "lucide-react"
import type { ContactFormData } from "@/lib/types"

export default function ContactoPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    saleType: "minorista",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaleTypeChange = (value: "minorista" | "mayorista") => {
    setFormData((prev) => ({ ...prev, saleType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Crear mensaje para WhatsApp
    let mensaje = `*CONSULTA ${formData.saleType.toUpperCase()} - ZELTIC JEANS*%0A%0A`
    mensaje += `*Datos del contacto:*%0A`
    mensaje += `Nombre: ${formData.name}%0A`
    mensaje += `Email: ${formData.email}%0A`
    mensaje += `Teléfono: ${formData.phone}%0A`

    if (formData.company) {
      mensaje += `Empresa: ${formData.company}%0A`
    }

    mensaje += `Tipo de venta: ${formData.saleType === "minorista" ? "Venta Minorista" : "Venta Mayorista"}%0A%0A`
    mensaje += `*Mensaje:*%0A${formData.message}`

    // Número de WhatsApp de la tienda
    const whatsappNumber = "5491140461805"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank")

    // Limpiar formulario
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      saleType: "minorista",
      message: "",
    })

    toast({
      title: "¡Mensaje enviado!",
      description: "Tu consulta ha sido enviada por WhatsApp. Pronto nos pondremos en contacto contigo.",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">CONTACTO</span> ZELTIC
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            ¿Tienes preguntas sobre nuestros productos? ¿Interesado en ventas mayoristas? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-zinc-400">+54 9 11 4046-1805</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-zinc-400">zelticstore@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-zinc-400">Av. Las Flores 1600</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Horarios</p>
                    <p className="text-zinc-400">Lun - Lun: 24/7</p>
                    
                  </div>
                </div>
              </div>
            </div>

            {/* Tipos de venta */}
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Tipos de Venta</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Store className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Venta Minorista</h4>
                    <p className="text-zinc-400 text-sm">
                      Compras individuales, envíos a domicilio, atención personalizada.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Venta Mayorista</h4>
                    <p className="text-zinc-400 text-sm">
                      Pedidos al por mayor, precios especiales, distribución para tiendas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Beneficios mayorista */}
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-6 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Beneficios Mayoristas</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Descuentos por volumen hasta 25%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Envío gratuito en pedidos mayores a $120,000</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Soporte dedicado para distribuidores</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Catálogo exclusivo para mayoristas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa (opcional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tipo de Consulta *</Label>
                <RadioGroup value={formData.saleType} onValueChange={handleSaleTypeChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minorista" id="minorista" />
                    <Label htmlFor="minorista" className="cursor-pointer">
                      Venta Minorista - Compra individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mayorista" id="mayorista" />
                    <Label htmlFor="mayorista" className="cursor-pointer">
                      Venta Mayorista - Distribución/Reventa
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700 min-h-[120px]"
                  placeholder={
                    formData.saleType === "mayorista"
                      ? "Cuéntanos sobre tu negocio, volumen de compra estimado, ubicación, etc."
                      : "¿En qué podemos ayudarte? Preguntas sobre productos, tallas, envíos, etc."
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                <Send className="mr-2 h-5 w-5" />
                Enviar Consulta por WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
