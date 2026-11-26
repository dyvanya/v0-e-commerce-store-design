"use client"

import type React from "react"

import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    additionalImages?: (string | { type: "image" | "video"; url: string })[]
    delivery: "cod" | "personal"
    description: string
  }
  isFavorite: boolean
  onToggleFavorite: () => void
  onAddToCart: () => void
}

export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const allMedia = [
    { type: "image" as const, url: product.image },
    ...(product.additionalImages || []).map((item) =>
      typeof item === "string" ? { type: "image" as const, url: item } : item,
    ),
  ]
  const hasMultipleMedia = allMedia.length > 1

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
  }

  const currentMedia = allMedia[currentImageIndex]

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
      {/* Media Container */}
      <div className="relative bg-secondary/50 aspect-square overflow-hidden">
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <video
            src={currentMedia.url}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            controls
            playsInline
          />
        )}

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 bg-background/80 backdrop-blur p-2 rounded-full hover:bg-background transition"
        >
          <Heart size={20} className={isFavorite ? "fill-accent text-accent" : "text-foreground"} />
        </button>

        {hasMultipleMedia && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-1 rounded-full hover:bg-background transition"
            >
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur p-1 rounded-full hover:bg-background transition"
            >
              <ChevronRight size={18} className="text-foreground" />
            </button>

            {/* Media Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {allMedia.map((media, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition flex items-center justify-center ${
                    idx === currentImageIndex ? "bg-primary w-3" : "bg-background/60 w-1.5"
                  }`}
                >
                  {media.type === "video" && idx === currentImageIndex && (
                    <Play size={8} className="text-primary-foreground" fill="currentColor" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Delivery Badge */}
        <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold">
          {product.delivery === "cod" ? "Pague na Entrega" : "Entrega Pessoal"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2)}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Adicionar
        </button>
      </div>
    </div>
  )
}
