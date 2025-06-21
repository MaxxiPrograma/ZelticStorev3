// components/auto-slider.tsx

"use client"



import { useState, useEffect } from "react"

import Image from "next/image"

import { cn } from "@/lib/utils" // Asegúrate de que esta ruta sea correcta para tu función 'cn'



interface AutoSliderProps {

  interval?: number

  className?: string // Esta prop es crucial para darle altura desde el componente padre

  showIndicators?: boolean

}



const sliderImages = [

  "/slider1/jean1.png",

  "/slider1/jean2.png",

  "/slider1/jean3.png",

  "/slider1/jean4.png",

  "/slider1/jean5.png",

]



export function AutoSlider({ interval = 4000, className, showIndicators = true }: AutoSliderProps) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const [mounted, setMounted] = useState(false)



  // Evitar problemas de hidratación ja (se ejecuta solo una vez en el cliente)

  useEffect(() => {

    setMounted(true)

  }, [])



  // Lógica del slider automático

  useEffect(() => {

    // Si no está montado en el cliente, no iniciamos el temporizador

    if (!mounted) return



    const timer = setInterval(() => {

      // Avanza al siguiente índice, o vuelve al principio si llega al final

      setCurrentIndex((prevIndex) => (prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1))

    }, interval)



    // Función de limpieza: detiene el temporizador cuando el componente se desmonta o las dependencias cambian

    return () => clearInterval(timer)

  }, [interval, mounted]) // El temporizador se reinicia si 'interval' o 'mounted' cambian



  // Renderiza un estado de carga mientras el componente no está montado en el cliente

  // Recibe 'className' para que el placeholder tenga las mismas dimensiones iniciales que el slider

  if (!mounted) {

    return (

      <div className={cn("relative overflow-hidden bg-zinc-800 flex items-center justify-center", className)}>

        <div className="w-full h-full animate-pulse bg-zinc-700 flex items-center justify-center text-white text-lg">

          Cargando imágenes del slider...

        </div>

      </div>

    )

  }



  // Contenido principal del slider una vez que el componente está montado

  return (

    // Aplica la 'className' pasada desde el componente padre.

    // Esta 'className' es la que debe definir la altura del slider (e.g., 'h-[500px]').

    <div className={cn("relative overflow-hidden group", className)}>

      {/* Contenedor para todas las imágenes del slider */}

      <div className="relative h-full w-full">

        {sliderImages.map((image, index) => (

          <div

            key={index}

            // Clases para controlar la visibilidad y animación de cada imagen

            className={cn(

              "absolute inset-0 transition-all duration-1000 ease-in-out",

              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105",

            )}

          >

            <Image

              src={image} // Fuente de la imagen

              alt={`Slide ${index + 1}`} // Texto alternativo para accesibilidad

              fill // Hace que la imagen llene el espacio del div padre posicionado

              className="object-cover" // Ajusta la imagen para cubrir el área sin distorsión

              priority={index === 0} // Carga la primera imagen con alta prioridad para mejorar LCP

              // 'sizes' es crucial para que Next.js Image optimice y cargue la imagen de tamaño adecuado

              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            />

          </div>

        ))}

      </div>



      {/* Indicadores de navegación (los puntos en la parte inferior) */}

      {showIndicators && (

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">

          {sliderImages.map((_, index) => (

            <button

              key={index}

              className={cn(

                "w-3 h-3 rounded-full transition-all duration-300",

                index === currentIndex ? "bg-blue-500 scale-125" : "bg-white/50 hover:bg-white/70",

              )}

              onClick={() => setCurrentIndex(index)} // Al hacer clic, navega a esa imagen

              type="button"

              aria-label={`Ir a slide ${index + 1}`}

            />

          ))}

        </div>

      )}



      {/* Botones de navegación (flechas izquierda/derecha) */}

      {/* Ocultos por defecto y aparecen al pasar el ratón ('group-hover:opacity-100') */}

      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto">

        <button

          className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-lg"

          onClick={() => setCurrentIndex(currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1)}

          type="button"

          aria-label="Imagen anterior"

        >

          &larr; {/* Entidad HTML para flecha izquierda */}

        </button>

        <button

          className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-lg"

          onClick={() => setCurrentIndex(currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1)}

          type="button"

          aria-label="Siguiente imagen"

        >

          &rarr; {/* Entidad HTML para flecha derecha */}

        </button>

      </div>



      {/* Contador de imágenes (ej. "1 / 5") */}

      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm z-10">

        {currentIndex + 1} / {sliderImages.length}

      </div>

    </div>

  )

}