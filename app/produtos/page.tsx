"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { supabase, mapDbToProduct, type ProdutoDb } from "@/lib/supabase"

export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null)
  const [productsData, setProductsData] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        console.warn("Supabase não configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.")
        return
      }
      const { data } = await supabase
        .from<ProdutoDb>("produtos")
        .select("*")
        .order("criado_em", { ascending: false })
      if (data) setProductsData(data.map(mapDbToProduct))
    }
    load()
  }, [])

  const categories = Array.from(new Set(productsData.map((p) => p.category)))
  const paymentTypes = [
    { value: "cod", label: "Pagamento na Entrega" },
    { value: "delivery", label: "Entrega Pessoal" },
    { value: "prepaid", label: "Pagamento Antecipado" },
  ]

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPayment = !selectedPaymentType || product.paymentType === selectedPaymentType

      return matchesSearch && matchesCategory && matchesPayment
    })
  }, [productsData, searchQuery, selectedCategory, selectedPaymentType])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Catálogo de Produtos</h1>
            <p className="text-muted-foreground">Encontre os produtos perfeitos para você</p>
          </div>
        </section>

        {/* Filtros e Produtos */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtros */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 border border-border sticky top-24">
                  <h3 className="font-semibold text-foreground mb-6">Filtros</h3>

                  {/* Busca */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">Pesquisar</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Digite aqui..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Categoria */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-3 block">Categoria</label>
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(null)}
                      >
                        Todas
                      </Button>
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start capitalize"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Pagamento/Entrega */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-foreground mb-3 block">Pagamento/Entrega</label>
                    <div className="space-y-2">
                      <Button
                        variant={selectedPaymentType === null ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start text-xs"
                        onClick={() => setSelectedPaymentType(null)}
                      >
                        Todos
                      </Button>
                      {paymentTypes.map((type) => (
                        <Button
                          key={type.value}
                          variant={selectedPaymentType === type.value ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-xs"
                          onClick={() => setSelectedPaymentType(type.value)}
                        >
                          {type.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Limpar Filtros */}
                  <Button
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory(null)
                      setSelectedPaymentType(null)
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>

              {/* Produtos */}
              <div className="lg:col-span-3">
                {filteredProducts.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground">
                        Mostrando <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
                        produtos
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-4">Nenhum produto encontrado com esses filtros.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedCategory(null)
                        setSelectedPaymentType(null)
                      }}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
