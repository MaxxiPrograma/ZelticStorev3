"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const showcaseImages = [
  {
    src: "/images/brand-showcase/imagen1.png",
    title: "Zeltic Style",
    subtitle: "Concepto ",
  },
  {
    src: "/images/brand-showcase/imagen2.jpg",
    title: "Zeltic ",
    subtitle: "Objetivo",
  },
  {
    src: "/images/brand-showcase/imagen3.jpg",
    title: "Ediciones limitadas",
    subtitle: "Eclusividad y Comfort",
  },
  {
    src: "/images/brand-showcase/imagen4.png",
    title: "Marcamos tendencias ",
    subtitle: "Carácter auténtico",
  },
]

export function BrandShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            COLECCIONES <span className="text-blue-500">ZELTIC</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Cada colección cuenta una historia única de estilo urbano y calidad premium.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slider de imágenes */}
          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              {showcaseImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-in-out",
                    index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-110",
                  )}
                >
                  <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
                </div>
              ))}
            </div>

            {/* Controles del slider */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-xl font-bold">{showcaseImages[activeIndex].title}</h3>
                  <p className="text-zinc-300">{showcaseImages[activeIndex].subtitle}</p>
                </div>
                <div className="flex space-x-2">
                  {showcaseImages.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        index === activeIndex ? "bg-blue-500 scale-125" : "bg-white/50 hover:bg-white/75",
                      )}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información de las colecciones */}
          <div className="space-y-8">
            {showcaseImages.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border transition-all duration-500 cursor-pointer",
                  index === activeIndex
                    ? "bg-blue-600/10 border-blue-500 scale-105"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700",
                )}
                onClick={() => setActiveIndex(index)}
              >
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-400 mb-4">{item.subtitle}</p>
                <div className="text-sm text-zinc-500">
                  {index === 0 && "Zeltic representa actitud, estilo y fuerza en movimiento. Una marca que no se detiene."}
                  {index === 1 && "Zeltic busca devolver algo a esa comunidad apoyando talentos locales."}
                  {index === 2 && "En Zeltic trabajamos con ediciones limitadas para que cada prenda sea única."}
                  {index === 3 && "Comodidad streetwear con estilo baggy y máxima libertad."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
