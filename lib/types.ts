export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images?: string[]
  video?: string
  checkoutUrl?: string
  category: string
  paymentType: "cod" | "delivery" // cod = cash on delivery, delivery = entrega pessoal
  stock: number
  rating?: number
  reviews?: number
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  paymentType: "cod" | "delivery"
  customerName: string
  customerPhone: string
  customerAddress?: string
  notes?: string
  createdAt: Date
}
