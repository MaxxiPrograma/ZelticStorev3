import { CheckCircle, Award, Zap, Sparkles } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
    title: "Calidad Premium",
    description: "Tela denim de la más alta calidad, resistente y duradera para un uso diario intenso.",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-500" />,
    title: "Diseño Exclusivo",
    description: "Cortes y estilos únicos diseñados por expertos en moda urbana contemporánea.",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Confort Garantizado",
    description: "Elasticidad y ajuste perfecto que se adapta a tu cuerpo y movimientos.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    title: "Detalles Distintivos",
    description: "Acabados metálicos, costuras reforzadas y detalles que hacen único cada par de jeans.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿POR QUÉ ELEGIR ZELTIC?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Nuestros jeans no son solo una prenda más, son una declaración de estilo y calidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">ÚNETE AL MOVIMIENTO ZELTIC</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            No vendemos solo jeans, creamos un estilo de vida. Sé parte de la comunidad Zeltic y lleva tu estilo al
            siguiente nivel.
          </p>
          <Link href="https://chat.whatsapp.com/KYZz4rG6qsx5iHnK4opDAE">
            <div className="inline-flex items-center justify-center bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
            Comunidad Zeltic
            </div>
          </Link>
        </div>
      </div>
      
    </section>
  )
}
