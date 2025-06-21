"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { RotateCcw, MessageCircle, CheckCircle, AlertCircle, Clock, Package } from "lucide-react"
import Link from "next/link"

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">DEVOLUCIONES</span> Y CAMBIOS
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Política completa de devoluciones y cambios para productos Zeltic. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        {/* Proceso de devolución */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Proceso de Devolución</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">1. Contacta por WhatsApp</h3>
              <p className="text-zinc-400 text-sm">
                Envía un mensaje explicando el motivo de la devolución y adjunta fotos del producto.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">2. Autorización</h3>
              <p className="text-zinc-400 text-sm">
                Revisamos tu solicitud y te proporcionamos las instrucciones para el envío de devolución.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">3. Procesamiento</h3>
              <p className="text-zinc-400 text-sm">
                Una vez recibido el producto, procesamos tu reembolso o cambio en 3-5 días hábiles.
              </p>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Coordinación por WhatsApp</h3>
            <p className="text-zinc-300 mb-4">
              Al igual que con los envíos, las devoluciones se coordinan a través de WhatsApp para brindarte:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Atención personalizada para resolver tu situación específica</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Evaluación rápida de tu solicitud con fotos del producto</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Instrucciones claras para el proceso de devolución</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Seguimiento en tiempo real del estado de tu devolución</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Condiciones */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <h3 className="text-xl font-bold">Condiciones Aceptadas</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Producto en condiciones originales (sin uso, con etiquetas)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Solicitud dentro de los 15 días posteriores a la compra</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Defectos de fabricación o producto incorrecto</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Talla incorrecta (cambio por otra disponible)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Producto dañado durante el envío</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-xl font-bold">Condiciones NO Aceptadas</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Productos usados o con signos de desgaste</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Productos sin etiquetas originales</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Solicitudes después de 15 días de la compra</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Daños causados por mal uso del producto</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>Cambio de opinión sin justificación válida</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tiempos y costos */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Tiempos y Costos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Tiempo de Procesamiento</h3>
              <p className="text-zinc-400 text-sm">3-5 días hábiles una vez recibido el producto</p>
            </div>

            <div className="text-center">
              <Package className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Costo de Envío</h3>
              <p className="text-zinc-400 text-sm">
                <span className="text-green-400">GRATIS</span> si es defecto de fabricación
                <br />
                <span className="text-yellow-400">$5000-$8000</span> si es cambio por talla
              </p>
            </div>

            <div className="text-center">
              <RotateCcw className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Reembolso</h3>
              <p className="text-zinc-400 text-sm">Mismo método de pago original en 5-10 días hábiles</p>
            </div>
          </div>
        </div>

        {/* Garantía */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-8 rounded-lg border border-blue-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Garantía de Calidad Zeltic</h2>
          <p className="text-zinc-300 mb-4">
            Todos nuestros jeans cuentan con garantía de 1 mese contra defectos de fabricación, incluyendo:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Costuras defectuosas o que se abran</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Problemas con cierres o botones</span>
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Decoloración prematura del denim</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Defectos en la tela o acabados</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas hacer una devolución?</h2>
          <p className="text-blue-100 mb-6">
            Contáctanos por WhatsApp y te ayudaremos a resolver tu situación de manera rápida y eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                const mensaje =
                  "*SOLICITUD DE DEVOLUCIÓN - ZELTIC JEANS*%0A%0AHola, necesito hacer una devolución/cambio de un producto.%0A%0APor favor proporciona:%0A- Número de pedido%0A- Motivo de la devolución%0A- Fotos del producto"
                window.open(`https://wa.me/5215512345678?text=${mensaje}`, "_blank")
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contactar por WhatsApp
            </Button>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Otras Consultas
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
