export type Size = "28" | "30" | "32" | "34" | "36" | "38" | "40" | "42" | "44" | "46"

export type SizeInventory = {
  size: Size
  stock: number
}

export type ProductCategory = "hombre" | "mujer" | "Unisex" | "jeans" | "baggy" | "relaxed"

export type Product = {
  id: number
  name: string
  price: string
  images: string[]
  tag?: string
  description?: string
  inventory: SizeInventory[]
  category: ProductCategory
}

export type CartItem = {
  id: number
  name: string
  price: string
  quantity: number
  image: string
  size: Size
}

export type User = {
  id: string
  email: string
  name: string
  role: "admin" | "customer"
}

export type Order = {
  id: string
  customer: {
    name: string
    lastName: string
    phone: string
    address: string
    postalCode: string
    notes?: string
  }
  items: CartItem[]
  total: string
  date: string
  status: "pending" | "completed" | "cancelled"
}

export type ContactFormData = {
  name: string
  email: string
  phone: string
  company?: string
  saleType: "minorista" | "mayorista"
  message: string
}
