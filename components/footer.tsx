"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Ícono de TikTok personalizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu email para suscribirte.",
        variant: "destructive",
      })
      return
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive",
      })
      return
    }

    // Crear mensaje para WhatsApp
    const mensaje =
      `*SUSCRIPCIÓN NEWSLETTER - ZELTIC JEANS*%0A%0A` +
      `Email: ${email}%0A` +
      `Solicitud: Suscripción al newsletter para recibir novedades y ofertas exclusivas.`

    // Número de WhatsApp de la tienda
    const whatsappNumber = "5491140461805"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank")

    // Limpiar formulario
    setEmail("")

    toast({
      title: "¡Suscripción enviada!",
      description: "Tu solicitud de suscripción ha sido enviada. Pronto recibirás nuestras novedades.",
    })
  }

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Información de la marca */}
          <div>
            <h3 className="text-xl font-bold mb-4">ZELTIC</h3>
            <p className="text-zinc-400 mb-6">
              La marca de jeans premium con estilo drip para quienes marcan tendencia en las calles.
            </p>
            <div className="flex space-x-4">
              
              <Link
                href="https://facebook.com/zelticjeans"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="Seguir en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <a
                href="https://instagram.com/zeltic.drp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="Seguir en Instagram">
               <Instagram className="h-5 w-5" />
              </a>
              <Link
                href="https://x.com/ZelticStore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="Seguir en Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://tiktok.com/@zeltStore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="Seguir en TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@ZelticStore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="Suscribirse en YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Productos
                </Link>
              </li>
              
            
              <li>
                <Link href="/contacto" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/envios-entregas" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Envíos y Entregas
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/guia-tallas" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Guía de Tallas
                </Link>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidad" className="text-zinc-400 hover:text-blue-400 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-zinc-400 mb-4">Suscríbete para recibir las últimas novedades y ofertas exclusivas.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Tu email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Zeltic. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
