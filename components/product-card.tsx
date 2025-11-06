"use client"
import Link from "next/link"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
        {/* Imagem do Produto */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {/* Badge de Tipo de Pagamento */}
          <div className="absolute top-3 right-3">
            <Badge variant={product.paymentType === "cod" ? "default" : "secondary"} className="text-xs">
              {product.paymentType === "cod" ? "Na Entrega" : "Entrega Pessoal"}
            </Badge>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary">{product.name}</h3>

          {/* Descrição */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) ? "fill-primary text-primary" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          )}

          {/* Preço e Botão */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <span className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</span>
            <Button
              size="sm"
              className={`transition-colors ${added ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90"}`}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
