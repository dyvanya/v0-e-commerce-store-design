"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { productsData } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import { Star, ShoppingCart, Heart, Share2, MessageCircle, Check } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productsData.find((p) => String(p.id).trim() === String(params.id).trim())

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-6">O produto que você está procurando não existe.</p>
            <Link href="/produtos">
              <Button className="bg-primary hover:bg-primary/90">Voltar ao Catálogo</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const relatedProducts = productsData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    setQuantity(1)
  }

  const handleWhatsAppContact = () => {
    const whatsappUrl = `https://wa.me/5571991108625?text=Olá!%20Tenho%20interesse%20no%20produto:%20${encodeURIComponent(product.name)}%20(%20R$%20${product.price.toFixed(2)})`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Navegação */}
        <div className="bg-secondary/30 py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Início
              </Link>
              <span>/</span>
              <Link href="/produtos" className="hover:text-primary">
                Produtos
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Produto */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              {/* Imagem */}
              <div>
                <div className="bg-muted rounded-lg overflow-hidden mb-4 relative aspect-square">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Vídeo */}
                {product.video && (
                  <div
                    className="bg-muted rounded-lg overflow-hidden cursor-pointer relative aspect-video group"
                    onClick={() => setShowVideoModal(true)}
                  >
                    <img
                      src={product.video || "/placeholder.svg"}
                      alt="Vídeo do produto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-primary border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant={product.paymentType === "cod" ? "default" : "secondary"}>
                      {product.paymentType === "cod" ? "Pagamento na Entrega" : "Entrega Pessoal"}
                    </Badge>
                    {product.stock < 5 && product.stock > 0 && <Badge variant="destructive">Últimas unidades</Badge>}
                    {product.stock === 0 && <Badge variant="destructive">Fora de Estoque</Badge>}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-3 mb-4">
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
                      <span className="text-sm text-muted-foreground">
                        {product.rating.toFixed(1)} ({product.reviews} avaliações)
                      </span>
                    </div>
                  )}
                </div>

                {/* Descrição */}
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

                {/* Preço */}
                <div className="mb-8">
                  <div className="text-4xl font-bold text-primary mb-2">R$ {product.price.toFixed(2)}</div>
                  <p className="text-muted-foreground">
                    Preço em:
                    {product.paymentType === "cod" ? " Pagamento na Entrega" : " Entrega Pessoal"}
                  </p>
                </div>

                {/* Disponibilidade */}
                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    Disponibilidade: <span className="font-semibold text-foreground">{product.stock} unidades</span>
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${Math.min(product.stock * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Quantidade */}
                <div className="mb-8">
                  <label className="text-sm font-medium text-foreground mb-3 block">Quantidade</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Button
                    size="lg"
                    className={`transition-all ${
                      addedToCart ? "bg-green-600 hover:bg-green-600" : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 w-5 h-5" />
                        Adicionado!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 w-5 h-5" />
                        Adicionar ao Carrinho
                      </>
                    )}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setIsWishlisted(!isWishlisted)}>
                    <Heart className={`mr-2 w-5 h-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
                    {isWishlisted ? "Adicionado" : "Favoritar"}
                  </Button>
                </div>

                {/* Contato WhatsApp */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Enviar Mensagem via WhatsApp
                </Button>

                {/* Compartilhar */}
                <button className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Produtos Relacionados */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Produtos Relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Vídeo */}
      {showVideoModal && product.video && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div className="max-w-4xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
            <video src={product.video} controls autoPlay className="w-full h-full rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}
