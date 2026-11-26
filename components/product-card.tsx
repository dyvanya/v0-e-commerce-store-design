"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { formatBRL } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <Link href={`/produto/${product.id}`} className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3">
            <Badge
              variant={product.paymentType === "cod" ? "default" : "secondary"}
              className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm"
            >
              {product.paymentType === "cod"
                ? "Na Entrega"
                : product.paymentType === "delivery"
                  ? "Entrega Pessoal"
                  : "Pagamento Antecipado"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="mb-2 line-clamp-2 font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
          {product.rating && (
            <div className="mt-auto flex items-center gap-1.5 pt-1">
              <div className="flex items-center" aria-label={`Avaliação ${product.rating} de 5 estrelas`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={`size-4 ${i < Math.floor(product.rating!) ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-primary/10 px-4 py-4 sm:px-5">
        <span className="text-lg font-bold tracking-tight text-foreground">{formatBRL(product.price)}</span>
        <Button
          type="button"
          size="icon"
          className={`size-10 rounded-full shadow-sm transition-colors ${added ? "bg-emerald-700 hover:bg-emerald-700" : "bg-primary hover:bg-primary/90"}`}
          onClick={handleAddToCart}
          aria-label={added ? `${product.name} adicionado ao carrinho` : `Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </article>
  )
}
