"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageSliderProps {
  images?: string[]
  alt: string
  className?: string
  showThumbnails?: boolean
}

export function ImageSlider({ images, alt, className, showThumbnails = false }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si no se pasan imágenes, usar las de la carpeta images por defecto
  const defaultImages = [
    "/slider1/jean1.png",
    "/slider1/jean2.png",
    "/slider1/jean3.png",
    "/slider1/jean4.png"
  ]

  const finalImages = images && images.length > 0 ? images : defaultImages

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? finalImages.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === finalImages.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (finalImages.length === 0) {
    return (
      <div className={cn("relative aspect-[3/4] bg-zinc-800 rounded-lg", className)}>
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400">Sin imágenes</div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {/* Imagen principal */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-800">
        <Image
          src={finalImages[currentIndex] || "/images/placeholder.jpg"}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority={currentIndex === 0}
          onError={(e) => {
            // Fallback si la imagen no se encuentra
            e.currentTarget.src = "/placeholder.svg?height=400&width=300&text=Imagen+No+Encontrada"
          }}
        />

        {/* Botones de navegación */}
        {finalImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Indicadores */}
        {finalImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {finalImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-white" : "bg-white/50",
                )}
                onClick={() => goToSlide(index)}
                type="button"
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de imágenes */}
        {finalImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {finalImages.length}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {showThumbnails && finalImages.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto">
          {finalImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors",
                index === currentIndex ? "border-blue-500" : "border-transparent hover:border-blue-300",
              )}
              onClick={() => goToSlide(index)}
              type="button"
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={image || "/images/placeholder.jpg"}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=64&width=64&text=Error"
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}