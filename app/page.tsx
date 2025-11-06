import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { productsData } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, Package, Truck, Heart } from "lucide-react"

export default function Home() {
  const featuredProducts = productsData.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-primary/5 to-secondary/10 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                Produtos Exclusivos com <span className="text-primary">Qualidade e Elegância</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
                Descobra nossa seleção de produtos cuidadosamente escolhidos. Pagamento na entrega ou entrega pessoal.
              </p>
              <Link href="/produtos">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Ver Todos os Produtos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Imagem destaque */}
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <img
                src="/hero-produtos-pasteis.png"
                alt="Produtos Aqui Tem Tudo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Produtos Selecionados</h3>
                <p className="text-muted-foreground">
                  Cada item é escolhido com cuidado para garantir qualidade e satisfação.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Entrega Flexível</h3>
                <p className="text-muted-foreground">
                  Pagamento na entrega ou receba pessoalmente. Escolha a forma que mais combina com você.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Atendimento Pessoal</h3>
                <p className="text-muted-foreground">
                  Suporte completo via WhatsApp para dúvidas e informações sobre seus pedidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos em Destaque */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Produtos em Destaque</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Confira nossas seleções especiais para você</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/produtos">
                <Button variant="outline" size="lg">
                  Ver Catálogo Completo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="sobre" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">Sobre AQUI TEM TUDO</h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Bem-vindo à AQUI TEM TUDO! Somos mais que uma loja - somos seu parceiro de confiança em compras
                  inteligentes e entregas rápidas.
                </p>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Com mais de diversas categorias de produtos cuidadosamente selecionados, oferecemos qualidade,
                  variedade e preços justos. Nosso compromisso é levar o que você precisa até você de forma rápida,
                  segura e conveniente.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Entrega em até 24 horas, pagamento seguro na entrega com nossos entregadores, e atendimento
                  personalizado via WhatsApp. Sua satisfação é nossa prioridade!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span className="text-foreground">Frete Grátis para todas as compras</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span className="text-foreground">Entrega em até 24 horas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span className="text-foreground">Pagamento seguro na entrega</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <span className="text-foreground">Agendamento de data e hora de entrega</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 flex flex-col items-center justify-center min-h-80">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-bold text-foreground text-center mb-2">Seus Produtos Favoritos</h3>
                <p className="text-muted-foreground text-center">Em um só lugar, com qualidade garantida</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contato */}
        <section id="contato" className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tem Dúvidas?</h2>
            <p className="text-lg mb-8 text-white/90">
              Fale conosco via WhatsApp! Responderemos rapidamente todas as suas perguntas.
            </p>
            <a
              href="https://wa.me/5571991108625?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20seus%20produtos."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Enviar Mensagem no WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
