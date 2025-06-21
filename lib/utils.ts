import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryTitle(category: string): string {
  switch (category) {
    case "hombre":
      return "HOMBRE";
    case "mujer":
      return "MUJER";
    case "ninos":
      return "NIÑOS";
    default:
      return "PRODUCTOS";
  }
}

export function getCategoryDescription(category: string): string {
  switch (category) {
    case "hombre":
      return "Descubre nuestra colección de jeans para hombre, diseñados para el estilo y la comodidad.";
    case "mujer":
      return "Explora nuestra variedad de jeans para mujer, desde cortes clásicos hasta las últimas tendencias.";
    case "ninos":
      return "Encuentra jeans duraderos y cómodos para los más pequeños de la casa.";
    default:
      return "Explora nuestra amplia selección de jeans para todos los estilos y ocasiones.";
  }
}
