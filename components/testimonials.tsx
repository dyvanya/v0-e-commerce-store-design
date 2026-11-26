import { Star } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Camila S.",
    text: "Chegou super rápido e bem embalado! O colar Beleza Verdadeira é ainda mais lindo pessoalmente. Já virei cliente fiel da ÁGAPE.",
    rating: 5,
  },
  {
    name: "Rafaela M.",
    text: "Comprei o kit de saúde e o atendimento pelo WhatsApp foi rapidíssimo, tiraram todas as minhas dúvidas antes da compra.",
    rating: 5,
  },
  {
    name: "Juliana P.",
    text: "Produtos de qualidade e preço justo. A entrega pessoal facilitou muito, recomendo a loja de olhos fechados.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary tracking-wide">Quem compra, confia</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            O que nossas clientes dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center gap-1 text-accent" aria-label={`${t.rating} de 5 estrelas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{"\u201C"}{t.text}{"\u201D"}</p>
              <div className="flex items-center gap-3 mt-auto pt-2">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 text-primary font-semibold text-sm">
                  {t.name.charAt(0)}
                </span>
                <span className="text-sm font-medium text-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
