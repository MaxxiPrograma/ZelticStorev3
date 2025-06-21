import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AutoSlider } from "@/components/auto-slider"

// La variable heroSliderImages ha sido eliminada ya que no se utiliza.

export function HeroSection() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/* Slider automático como fondo */}
      <div className="absolute inset-0 z-0">
        <AutoSlider interval={5000} className="h-full w-full" showIndicators={true} />
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Contenido superpuesto */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            ESTILO <span className="text-blue-500">DRIP</span> PARA LA CALLE
          </h1>
          <p className="text-l md:text-22l mb-8 text-zinc-300">
            Jeans premium diseñados para destacar. Calidad superior, estilo único y la mejor actitud.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/productos">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg">
                Comprar Ahora
              </Button>
            </Link>
            <Link href="#brand-showcase">
              
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  )
}
