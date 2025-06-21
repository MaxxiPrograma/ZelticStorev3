"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploading(true)

    try {
      const newImages: string[] = []

      for (const file of files) {
        // Validar tipo de archivo
        if (!file.type.startsWith("image/")) {
          continue
        }

        // Validar tamaño (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          continue
        }

        // Convertir a base64 para almacenamiento local
        const base64 = await fileToBase64(file)
        newImages.push(base64)
      }

      // Agregar las nuevas imágenes sin exceder el límite
      const updatedImages = [...images, ...newImages].slice(0, maxImages)
      onImagesChange(updatedImages)
    } catch (error) {
      console.error("Error al procesar las imágenes:", error)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleUrlAdd = (url: string) => {
    if (url.trim() && images.length < maxImages) {
      onImagesChange([...images, url.trim()])
    }
  }

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const handleImageChange = (index: number, newUrl: string) => {
    onImagesChange(images.map((img, i) => (i === index ? newUrl : img)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Imágenes del Producto</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
            className="bg-zinc-700 border-zinc-600"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Subiendo..." : "Subir Archivo"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const url = prompt("Ingresa la URL de la imagen:")
              if (url) handleUrlAdd(url)
            }}
            disabled={images.length >= maxImages}
            className="bg-zinc-700 border-zinc-600"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Añadir URL
          </Button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />

      <div className="text-sm text-zinc-400">
        {images.length}/{maxImages} imágenes • Máximo 5MB por imagen
      </div>

      {/* Lista de imágenes */}
      <div className="space-y-3">
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-3 bg-zinc-700 p-3 rounded-md">
            <div className="w-16 h-16 relative flex-shrink-0 bg-zinc-600 rounded overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=64&width=64"
                }}
              />
            </div>
            <Input
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="URL de la imagen"
              className="bg-zinc-600 border-zinc-500 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveImage(index)}
              className="text-red-400 hover:text-red-300 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Agregar imagen por defecto si no hay ninguna */}
      {images.length === 0 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => onImagesChange(["/placeholder.svg?height=400&width=300"])}
          className="w-full bg-zinc-700 border-zinc-600"
        >
          <ImageIcon className="mr-2 h-4 w-4" />
          Añadir Imagen Placeholder
        </Button>
      )}
    </div>
  )
}
