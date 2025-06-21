"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">POLÍTICA</span> DE PRIVACIDAD
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu
            información personal.
          </p>
          <p className="text-zinc-500 text-sm mt-4">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Compromiso de privacidad */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Nuestro Compromiso con tu Privacidad</h2>
          </div>

          <div className="space-y-4 text-zinc-300">
            <p>
              En Zeltic, respetamos y protegemos la privacidad de nuestros usuarios. Esta Política de Privacidad
              describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando visitas
              nuestro sitio web o realizas compras con nosotros.
            </p>
            <p>
              Nos comprometemos a ser transparentes sobre nuestras prácticas de datos y a darte control sobre tu
              información personal.
            </p>
          </div>
        </div>

        {/* Información que recopilamos */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Database className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Información que Recopilamos</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Información Personal</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Nombre completo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Dirección de correo electrónico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Número de teléfono</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Dirección de envío y facturación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Información de pago (procesada de forma segura)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Información Técnica</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Dirección IP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Tipo de navegador y versión</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Sistema operativo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Páginas visitadas y tiempo de navegación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Cookies y tecnologías similares</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cómo usamos tu información */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <UserCheck className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Cómo Usamos tu Información</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Propósitos Principales</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Procesar y gestionar tus pedidos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Coordinar envíos y entregas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Proporcionar atención al cliente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Procesar devoluciones y reembolsos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Mantener registros de transacciones</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Comunicaciones (Solo con tu Consentimiento)</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Envío de newsletter con novedades y ofertas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Notificaciones sobre nuevos productos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Promociones especiales y descuentos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Encuestas de satisfacción del cliente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Protección de datos */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Protección de tus Datos</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Medidas de Seguridad</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Encriptación SSL/TLS para todas las transmisiones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Servidores seguros con acceso restringido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Monitoreo continuo de seguridad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Copias de seguridad regulares</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔒</span>
                  <span>Acceso limitado solo a personal autorizado</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Almacenamiento de Datos</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Datos almacenados en servidores seguros en México</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Retención de datos solo por el tiempo necesario</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Eliminación segura de datos obsoletos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Cumplimiento con la Ley Federal de Protección de Datos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compartir información */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Eye className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Compartir tu Información</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">🚫 NO Vendemos tu Información</h3>
              <p className="text-sm text-zinc-300">
                Nunca vendemos, alquilamos o comercializamos tu información personal a terceros para fines de marketing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 text-blue-400">Compartimos Información Solo Cuando es Necesario</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Con empresas de paquetería para procesar envíos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Con procesadores de pago para transacciones seguras</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Con proveedores de servicios técnicos (hosting, analytics)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠️</span>
                  <span>Cuando sea requerido por ley o autoridades competentes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tus derechos */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Tus Derechos sobre tus Datos</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Derechos ARCO</h3>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">A</span>
                  <div>
                    <span className="font-medium">Acceso:</span> Conocer qué datos tenemos sobre ti
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">R</span>
                  <div>
                    <span className="font-medium">Rectificación:</span> Corregir datos incorrectos
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">C</span>
                  <div>
                    <span className="font-medium">Cancelación:</span> Eliminar tus datos
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 font-bold">O</span>
                  <div>
                    <span className="font-medium">Oposición:</span> Limitar el uso de tus datos
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-400">Cómo Ejercer tus Derechos</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📧</span>
                  <span>Email: privacidad@zeltic.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📱</span>
                  <span>WhatsApp: +52 55 1234 5678</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📝</span>
                  <span>Formulario de contacto en nuestro sitio web</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">⏱️</span>
                  <span>Respuesta en máximo 20 días hábiles</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Uso de Cookies</h2>

          <div className="space-y-4 text-zinc-300">
            <p>
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Las cookies
              son pequeños archivos de texto que se almacenan en tu dispositivo.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-400">Cookies Esenciales</h4>
                <p className="text-xs text-zinc-400">
                  Necesarias para el funcionamiento básico del sitio web (carrito de compras, sesión de usuario).
                </p>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-400">Cookies de Rendimiento</h4>
                <p className="text-xs text-zinc-400">
                  Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio web.
                </p>
              </div>

              <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-blue-400">Cookies de Marketing</h4>
                <p className="text-xs text-zinc-400">
                  Utilizadas para mostrar anuncios relevantes (solo con tu consentimiento).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cambios en la política */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">Cambios en esta Política</h2>
          </div>

          <div className="space-y-4 text-zinc-300">
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas
              o por razones legales. Te notificaremos sobre cambios importantes a través de:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Aviso prominente en nuestro sitio web</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Email a los usuarios registrados</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Notificación en nuestras redes sociales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿Tienes preguntas sobre tu privacidad?</h2>
          <p className="text-blue-100 mb-6">
            Nuestro equipo de privacidad está disponible para resolver cualquier duda sobre el manejo de tus datos
            personales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => {
                const mensaje =
                  "*CONSULTA SOBRE PRIVACIDAD - ZELTIC JEANS*%0A%0AHola, tengo una consulta sobre el manejo de mis datos personales.%0A%0APor favor especifica tu consulta:"
                window.open(`https://wa.me/5215512345678?text=${mensaje}`, "_blank")
              }}
            >
              Contactar por WhatsApp
            </Button>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Formulario de Contacto
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
