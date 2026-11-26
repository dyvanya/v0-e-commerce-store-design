"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, Package, Truck, Heart, ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase, mapDbToProduct } from "@/lib/supabase"
import { ImageSlider } from "@/components/image-slider"
import { productsData } from "@/lib/products-data"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState(productsData.slice(0, 6))
  const [bannerConfig, setBannerConfig] = useState<any | null>(null)
  const [bannerImages, setBannerImages] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      if (!supabase) return
      const { data } = await supabase
        .from("produtos")
        .select("*")
        .eq("destaque", true)
        .order("criado_em", { ascending: false })
        .limit(6)
      if (data) setFeaturedProducts(data.map(mapDbToProduct))

      const { data: sets } = await supabase
        .from("banner_sets")
        .select("*")
        .order("active", { ascending: false })
        .order("active_at", { ascending: false })
        .limit(1)
      const activeSet = sets?.[0]
      if (activeSet) {
        setBannerConfig(activeSet)
        const { data: imgs } = await supabase
          .from("banner_images")
          .select("*")
          .eq("set_id", activeSet.id)
          .order("position")
        setBannerImages(imgs || [])
      }
    }
    load()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-secondary/35 via-background to-accent/10 py-12 md:py-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-secondary/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
            <div className="max-w-xl text-center lg:text-left">
              <div aria-hidden="true" className="mb-4 flex justify-center text-primary/70 lg:justify-start">
                <Heart className="size-6 fill-primary/15" />
              </div>
              <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[2.625rem] xl:text-5xl">
                <span className="block">Produtos Exclusivos com</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Qualidade e Elegância
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
                Descobra nossa seleção de produtos cuidadosamente escolhidos. Pagamento na entrega ou entrega pessoal.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Button asChild size="lg" className="rounded-full px-7 shadow-lg shadow-primary/20">
                  <Link href="/produtos">
                    Ver Todos os Produtos
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 bg-white/70 px-7 text-foreground hover:bg-white">
                  <Link href="/#sobre">Sobre nós</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px] pb-7 pl-4 sm:pl-8">
              <div aria-hidden="true" className="absolute -left-1 top-12 size-14 rounded-full border-4 border-white bg-primary/20 shadow-sm" />
              <div className="relative aspect-[1.12/1] overflow-hidden rounded-[2rem] border-[6px] border-white/90 bg-white shadow-2xl shadow-foreground/10">
                {bannerConfig && bannerConfig.slider_enabled && bannerImages.length > 1 ? (
                  <ImageSlider
                    images={bannerImages.map((banner: any) => ({ src: banner.url, alt: bannerConfig.name }))}
                    effect={bannerConfig.effect || "slide"}
                    speedMs={Math.max(200, bannerConfig.transition_ms || 4000)}
                    autoplay
                    autoplayIntervalMs={Math.max(500, bannerConfig.transition_ms || 4000)}
                    className="size-full"
                  />
                ) : (
                  <img
                    src={bannerImages[0]?.url || "/loja-elegante-produtos-feminino-masculino.jpg"}
                    alt="Produtos Aqui Tem Tudo"
                    className="size-full object-cover"
                  />
                )}
              </div>
              {featuredProducts[0]?.image && (
                <div className="absolute -bottom-1 left-0 aspect-square w-28 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl sm:w-36">
                  <img src={featuredProducts[0].image} alt={featuredProducts[0].name} className="size-full object-cover" />
                </div>
              )}
              <div aria-hidden="true" className="absolute bottom-12 right-0 size-5 rounded-full bg-secondary shadow-sm" />
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-2 px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-3 rounded-3xl border border-primary/10 bg-white/90 p-4 shadow-xl shadow-foreground/5 backdrop-blur-sm md:grid-cols-3 md:p-5">
            <div className="flex items-center gap-4 rounded-2xl px-3 py-3 md:justify-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Package className="size-5" /></span>
              <div>
                <h3 className="font-semibold text-foreground">Produtos Selecionados</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">Cada item é escolhido com cuidado para garantir qualidade e satisfação.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl px-3 py-3 md:justify-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/60 text-foreground"><Truck className="size-5" /></span>
              <div>
                <h3 className="font-semibold text-foreground">Entrega Flexível</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">Pagamento na entrega ou receba pessoalmente. Escolha a forma que mais combina com você.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl px-3 py-3 md:justify-center">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-primary"><Heart className="size-5" /></span>
              <div>
                <h3 className="font-semibold text-foreground">Atendimento Pessoal</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">Suporte completo via WhatsApp para dúvidas e informações sobre seus pedidos.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-background to-primary/[0.035] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 text-center md:mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Produtos em Destaque</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">Confira nossas seleções especiais para você</p>
              <div aria-hidden="true" className="mx-auto mt-1 h-1 w-16 rounded-full bg-gradient-to-r from-primary/40 via-accent to-secondary" />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-11 text-center">
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/25 bg-white px-7 hover:bg-primary/5">
                <Link href="/produtos">
                  Ver Catálogo Completo
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="sobre" className="overflow-hidden bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Sobre</p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Sobre AQUI TEM TUDO</h2>
              <p className="mb-4 text-base leading-7 text-muted-foreground md:text-lg">
                Bem-vindo à AQUI TEM TUDO! Somos mais que uma loja - somos seu parceiro de confiança em compras inteligentes e entregas rápidas.
              </p>
              <p className="mb-4 text-base leading-7 text-muted-foreground md:text-lg">
                Com mais de diversas categorias de produtos cuidadosamente selecionados, oferecemos qualidade, variedade e preços justos. Nosso compromisso é levar o que você precisa até você de forma rápida, segura e conveniente.
              </p>
              <p className="mb-6 text-base leading-7 text-muted-foreground md:text-lg">
                Entrega em até 24 horas, pagamento seguro na entrega com nossos entregadores, e atendimento personalizado via WhatsApp. Sua satisfação é nossa prioridade!
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Frete Grátis para todas as compras",
                  "Entrega em até 24 horas",
                  "Pagamento seguro na entrega",
                  "Agendamento de data e hora de entrega",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 rounded-xl bg-secondary/35 px-3 py-3 text-sm text-foreground">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm">✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary/50 via-primary/10 to-accent/15 p-8 text-center md:min-h-[440px]">
              <div aria-hidden="true" className="absolute -right-10 -top-10 size-48 rounded-full border-[24px] border-white/30" />
              <div className="relative flex size-24 items-center justify-center rounded-full border border-white/80 bg-white/70 text-primary shadow-lg backdrop-blur-sm">
                <ShoppingBag className="size-10" />
              </div>
              <h3 className="relative mb-2 mt-6 text-2xl font-bold text-foreground">Seus Produtos Favoritos</h3>
              <p className="relative max-w-sm text-muted-foreground">Em um só lugar, com qualidade garantida</p>
            </div>
          </div>
        </section>

        <section id="contato" className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-secondary/60 via-primary/15 to-accent/20 px-6 py-12 text-center sm:px-10 md:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Tem Dúvidas?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Fale conosco via WhatsApp! Responderemos rapidamente todas as suas perguntas.
            </p>
            <Button asChild size="lg" className="mt-7 rounded-full bg-primary px-8 shadow-lg shadow-primary/20">
              <a
                href="https://wa.me/5571991108625?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20seus%20produtos."
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar Mensagem no WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
