"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const lifestyleImages = [
  {
    src: "/placeholder.svg?height=400&width=600&text=Street+Style+1",
    title: "Urban Lifestyle",
    description: "Vive la ciudad con estilo",
  },
  {
    src: "/placeholder2.svg?height=400&width=600&text=Street+Style+2",
    title: "Drip Culture",
    description: "Marca tendencia en cada paso",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Street+Style+3",
    title: "Premium Quality",
    description: "Calidad que se siente y se ve",
  },
  {
    src: "/placeholder2.svg?height=400&width=600&text=Street+Style+4",
    title: "Authentic Style",
    description: "Auténtico desde el primer día",
  },
  {
    src: "/placeholder.svg?height=400&width=600&text=Street+Style+5",
    title: "Street Fashion",
    description: "La moda urbana redefinida",
  },
]

export function LifestyleSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === lifestyleImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">VIVE EL ESTILO ZELTIC</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Más que jeans, es un estilo de vida. Descubre cómo Zeltic se adapta a tu día a día urbano.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {lifestyleImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 ease-in-out",
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105",
                )}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Contenido superpuesto */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{image.title}</h3>
                  <p className="text-lg text-zinc-200">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-3">
            {lifestyleImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex ? "bg-blue-500 scale-125" : "bg-zinc-600 hover:bg-zinc-500",
                )}
                onClick={() => setCurrentIndex(index)}
                type="button"
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Navegación lateral */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none">
            <button
              className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors pointer-events-auto"
              onClick={() => setCurrentIndex(currentIndex === 0 ? lifestyleImages.length - 1 : currentIndex - 1)}
              type="button"
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors pointer-events-auto"
              onClick={() => setCurrentIndex(currentIndex === lifestyleImages.length - 1 ? 0 : currentIndex + 1)}
              type="button"
              aria-label="Siguiente imagen"
            >
              →
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">10K+</div>
            <div className="text-zinc-400">Clientes Satisfechos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">50+</div>
            <div className="text-zinc-400">Modelos Únicos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">5★</div>
            <div className="text-zinc-400">Calificación Promedio</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-zinc-400">Soporte al Cliente</div>
          </div>
        </div>
      </div>
    </section>
  )
}
