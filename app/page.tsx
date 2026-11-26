"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import About from "@/components/about"
import Testimonials from "@/components/testimonials"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import ChatWidget from "@/components/chat-widget"

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (product: any) => {
    const existingItem = cartItems.find((item) => item.id === product.id)

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(!isCartOpen)} />

      {isCartOpen ? (
        <Cart items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
      ) : (
        <>
          <Hero />
          <Products onAddToCart={addToCart} />
          <Testimonials />
          <About />
        </>
      )}

      <Footer />
      <FloatingWhatsApp />
      <ChatWidget />
    </div>
  )
}
