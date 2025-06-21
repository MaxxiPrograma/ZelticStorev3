import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">TÉRMINOS</span> Y CONDICIONES
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Términos y condiciones de uso para la tienda en línea Zeltic Jeans. Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
        </div>

        {/* Información general */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Información General</h2>
          </div>

          <div className="space-y-4 text-zinc-300">
            <p>
              Bienvenido a Zeltic Jeans. Estos términos y condiciones describen las reglas y regulaciones para el uso
              del sitio web de Zeltic, ubicado en www.zeltic.com.
            </p>
            <p>
              Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Zeltic
              si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
            </p>
          </div>
        </div>

        {/* Uso del sitio web */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Uso del Sitio Web</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <h3 className="text-xl font-bold">Usos Permitidos</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Navegar y comprar productos de nuestra tienda</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Crear una cuenta de usuario para realizar compras</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Contactar nuestro servicio al cliente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Suscribirse a nuestro newsletter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Compartir productos en redes sociales</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h3 className="text-xl font-bold">Usos Prohibidos</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Usar el sitio para actividades ilegales o no autorizadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Intentar acceder a áreas restringidas del sitio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Copiar, reproducir o distribuir contenido sin autorización</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Realizar ingeniería inversa o intentar extraer código fuente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Interferir con la seguridad del sitio web</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Productos y precios */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Productos y Precios</h2>

          <div className="space-y-6 text-zinc-300">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Disponibilidad de Productos</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Todos los productos están sujetos a disponibilidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Nos reservamos el derecho de descontinuar productos sin previo aviso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Las imágenes de productos son representativas y pueden variar ligeramente</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Precios y Pagos</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Todos los precios están en pesos Argentinos (ARS) e incluyen IVA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Los precios pueden cambiar sin previo aviso</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>El pago se coordina a través de WhatsApp según el método acordado, incluso el tipo de cambio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Aceptamos transferencias bancarias, tarjetas de crédito/débito (a traves de billeteras virtuales), efectivo y criptomonedas </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Envíos y devoluciones */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Envíos y Devoluciones</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Política de Envíos</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Los envíos se coordinan a través de WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Tiempos de entrega: 1-7 días hábiles según la ubicación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Envío gratuito en compras mayores a $120.000 ARS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Cobertura nacional a través de paqueterías certificadas</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Política de Devoluciones</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>15 días para solicitar devoluciones o cambios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Productos deben estar en condiciones originales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Devoluciones se coordinan por WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Garantía de 6 meses contra defectos de fabricación</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Propiedad intelectual */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Propiedad Intelectual</h2>
          </div>

          <div className="space-y-4 text-zinc-300">
            <p>
              Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, iconos,
              imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de Zeltic o sus
              proveedores de contenido y está protegido por las leyes de derechos de autor Argentinas e internacionales.
            </p>
            <p>
              La marca "Zeltic", el logotipo y todos los diseños relacionados son marcas registradas de Zeltic. No está
              permitido el uso de estas marcas sin el consentimiento previo por escrito de Zeltic.
            </p>
          </div>
        </div>

        {/* Limitación de responsabilidad */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Limitación de Responsabilidad</h2>

          <div className="space-y-4 text-zinc-300 text-sm">
            <p>
              En ningún caso Zeltic, sus directores, empleados, socios, agentes, proveedores o afiliados serán
              responsables de cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin
              limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
            </p>
            <p>
              Nuestra responsabilidad total hacia usted por cualquier causa y sin importar la forma de acción, estará
              limitada en todo momento al monto pagado, si lo hubiera, por usted a Zeltic por el producto específico que
              dio lugar al reclamo.
            </p>
          </div>
        </div>

        {/* Modificaciones */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Modificaciones a los Términos</h2>

          <div className="space-y-4 text-zinc-300">
            <p>
              Zeltic se reserva el derecho de revisar estos términos de servicio en cualquier momento sin previo aviso.
              Al usar este sitio web, aceptas estar sujeto a la versión actual de estos términos de servicio.
            </p>
            <p>
              Te recomendamos revisar periódicamente estos términos para estar al tanto de cualquier cambio. Los cambios
              entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-8 rounded-lg border border-blue-500/30 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Información de Contacto</h2>
          <p className="text-zinc-300 mb-4">
            Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos:
          </p>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Por WhatsApp: +54 9 11 4046-1805</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Por email: zelticstore@gmail.com</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>A través de nuestro formulario de contacto</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>Dirección: Av. Las Flores 1600</span>
            </li>
          </ul>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿Tienes dudas sobre nuestros términos?</h2>
          <p className="text-blue-100 mb-6">
            Nuestro equipo legal está disponible para aclarar cualquier duda sobre estos términos y condiciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Contactar Soporte Legal
              </Button>
            </Link>
            <Link href="/productos">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
