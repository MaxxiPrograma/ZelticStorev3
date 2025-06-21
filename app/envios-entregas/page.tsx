import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Truck, MessageCircle, ShoppingCart, Clock, MapPin, Package } from "lucide-react"
import Link from "next/link"

export default function EnviosEntregasPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">ENVÍOS</span> Y ENTREGAS
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Información completa sobre nuestro proceso de envío y entrega de productos Zeltic.
          </p>
        </div>

        {/* Proceso de envío */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Proceso de Envío</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">1. Selecciona tu Carrito</h3>
              <p className="text-zinc-400 text-sm">
                Añade los productos que deseas al carrito y completa el formulario de compra.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">2. Coordinación por WhatsApp</h3>
              <p className="text-zinc-400 text-sm">
                Una vez completado el carrito, serás redirigido a WhatsApp para coordinar el envío.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-bold mb-2">3. Envío Confirmado</h3>
              <p className="text-zinc-400 text-sm">
                Confirmamos detalles de entrega, método de pago y procedemos con el envío.
              </p>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-400">¿Por qué coordinamos por WhatsApp?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Comunicación directa y personalizada para cada pedido</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Confirmación inmediata de disponibilidad y stock</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Flexibilidad en métodos de pago y opciones de entrega</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Seguimiento en tiempo real de tu pedido</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Información de envío */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-bold">Tiempos de Entrega</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-zinc-400">CABA:</span>
                <span className="font-medium">1-3 días hábiles</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">AMBA:</span>
                <span className="font-medium">1-7 días hábiles</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Interior de la República:</span>
                <span className="font-medium">7-15 días hábiles</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Zonas remotas:</span>
                <span className="font-medium">7-15 días hábiles</span>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="text-xl font-bold">Costos de Envío</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-zinc-400">Compras mayores a $120.000:</span>
                <span className="font-medium text-green-400">GRATIS</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">CABA Y AMBA:</span>
                <span className="font-medium">se gestiona por WhatsApp</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Interior de la República:</span>
                <span className="font-medium">se gestiona por WhatsApp</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Envío Express (24hrs):</span>
                <span className="font-medium">se gestiona por WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cobertura */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Cobertura Nacional</h2>
          </div>
          <p className="text-zinc-400 mb-4">
            Realizamos envíos a toda la República Argentina a través de nuestras paqueterías aliadas:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h4 className="font-bold">Andreani</h4>
              <p className="text-xs text-zinc-400">Express y estándar</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h4 className="font-bold">Uber Envios</h4>
              <p className="text-xs text-zinc-400">Nacional e internacional</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h4 className="font-bold">Correo Argentino</h4>
              <p className="text-xs text-zinc-400">Cobertura nacional</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h4 className="font-bold">Coordinación por whatsApp</h4>
              <p className="text-xs text-zinc-400">Económico y confiable</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿Listo para hacer tu pedido?</h2>
          <p className="text-blue-100 mb-6">
            Explora nuestra colección y comienza el proceso de compra. Te guiaremos paso a paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Ver Productos
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Contactar Soporte
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
