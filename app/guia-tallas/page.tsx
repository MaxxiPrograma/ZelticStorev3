import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Ruler, Info, Search } from "lucide-react"
import Link from "next/link"

export default function GuiaTallasPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-500">GUÍA</span> DE TALLAS
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Encuentra la talla perfecta para tus jeans Zeltic. Consulta nuestra guía completa de medidas.
          </p>
        </div>

        {/* Información principal */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <div className="flex items-center mb-6">
            <Info className="h-8 w-8 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold">¿Dónde encontrar la guía de tallas?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-zinc-300 mb-4">
                En cada página de producto individual, encontrarás una guía de tallas específica al final de la
                descripción del producto.
              </p>
              <p className="text-zinc-300 mb-6">
                Esta guía incluye medidas detalladas en centímetros para cada talla disponible, asegurando que
                encuentres el ajuste perfecto.
              </p>
              <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-2">💡 Consejo Zeltic</h3>
                <p className="text-sm text-zinc-300">
                  Cada modelo de jean puede tener ligeras variaciones en el ajuste. Siempre consulta la guía específica
                  del producto que te interesa.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-zinc-800 p-6 rounded-lg border-2 border-dashed border-zinc-600">
                <div className="text-center">
                  <Ruler className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-bold mb-2">Imagen de Guía de Tallas</h3>
                  <p className="text-zinc-400 text-sm">Disponible en cada producto individual</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de tallas general */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Tabla de Tallas General</h2>
          <p className="text-zinc-400 mb-6">
            Esta es una referencia general. Para medidas exactas, consulta la guía específica de cada producto.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 font-bold">Talla</th>
                  <th className="text-left py-3 px-4 font-bold">Cintura (cm)</th>
                  <th className="text-left py-3 px-4 font-bold">Cadera (cm)</th>
                  <th className="text-left py-3 px-4 font-bold">Largo (cm)</th>
                  <th className="text-left py-3 px-4 font-bold">Equivalencia</th>
                </tr>
              </thead>
               <tbody>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 font-medium">36</td>
                  <td className="py-3 px-4 text-zinc-400">35</td>
                  <td className="py-3 px-4 text-zinc-400">106</td>
                  <td className="py-3 px-4 text-zinc-400">25</td>
                  <td className="py-3 px-4 text-zinc-400">31</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 font-medium">38</td>
                  <td className="py-3 px-4 text-zinc-400">38</td>
                  <td className="py-3 px-4 text-zinc-400">110</td>
                  <td className="py-3 px-4 text-zinc-400">25</td>
                  <td className="py-3 px-4 text-zinc-400">35</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 font-medium">40</td>
                  <td className="py-3 px-4 text-zinc-400">42</td>
                  <td className="py-3 px-4 text-zinc-400">110</td>
                  <td className="py-3 px-4 text-zinc-400">25</td>
                  <td className="py-3 px-4 text-zinc-400">35</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 font-medium">42</td>
                  <td className="py-3 px-4 text-zinc-400">44</td>
                  <td className="py-3 px-4 text-zinc-400">115</td>
                  <td className="py-3 px-4 text-zinc-400">25</td>
                  <td className="py-3 px-4 text-zinc-400">36</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>

        {/* Cómo medir */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">¿Cómo tomar tus medidas?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-bold mb-2">Cintura</h3>
              <p className="text-zinc-400 text-sm">
                Mide alrededor de la parte más estrecha de tu cintura, generalmente por encima del ombligo.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="font-bold mb-2">Cadera</h3>
              <p className="text-zinc-400 text-sm">
                Mide alrededor de la parte más ancha de tus caderas, manteniendo la cinta métrica paralela al suelo.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="font-bold mb-2">Largo</h3>
              <p className="text-zinc-400 text-sm">
                Mide desde la entrepierna hasta el largo deseado del pantalón (tobillo o donde prefieras).
              </p>
            </div>
          </div>
        </div>

        {/* Tipos de corte */}
        <div className="bg-zinc-900 p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Tipos de Corte Zeltic</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-blue-400">Slim Fit</h3>
              <p className="text-zinc-300 text-sm mb-3">
                Corte ajustado que sigue la línea natural del cuerpo. Ideal para un look moderno y elegante.
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>• Ajuste ceñido en muslo y pantorrilla</li>
                <li>• Cintura media</li>
                <li>• Perfecto para ocasiones semi-formales</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-blue-400">Regular Fit</h3>
              <p className="text-zinc-300 text-sm mb-3">
                Corte clásico con ajuste cómodo. Versátil para uso diario y diferentes ocasiones.
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>• Ajuste relajado y cómodo</li>
                <li>• Cintura media a alta</li>
                <li>• Ideal para uso cotidiano</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-blue-400">Baggy Fit</h3>
              <p className="text-zinc-300 text-sm mb-3">
                Corte holgado inspirado en el streetwear. Máxima comodidad y estilo urbano.
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>• Ajuste amplio y relajado</li>
                <li>• Cintura media</li>
                <li>• Perfecto para el estilo street</li>
              </ul>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-blue-400">Cargo Fit</h3>
              <p className="text-zinc-300 text-sm mb-3">
                Corte funcional con bolsillos adicionales. Combina utilidad con estilo urbano.
              </p>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>• Múltiples bolsillos funcionales</li>
                <li>• Ajuste cómodo</li>
                <li>• Ideal para el día a día</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">¿Listo para encontrar tu talla perfecta?</h2>
          <p className="text-blue-100 mb-6">
            Explora nuestros productos y consulta la guía de tallas específica de cada jean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Search className="mr-2 h-5 w-5" />
                Ver Productos
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Asesoría Personalizada
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
