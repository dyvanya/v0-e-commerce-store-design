import { ShieldCheck, Lock, Truck, Heart } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Selo de segurança - visível no topo da seção */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 bg-card border border-primary/20 rounded-full px-6 py-3 shadow-sm">
            <ShieldCheck className="text-primary" size={28} strokeWidth={2} />
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground leading-tight">Compra 100% Segura</p>
              <p className="text-xs text-muted-foreground leading-tight">Seus dados e pagamentos protegidos</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <span className="text-sm font-medium text-primary tracking-wide">Nossa História</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">Sobre a ÁGAPE</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto text-pretty">
            Ágape é uma palavra grega que significa amor incondicional — e é exatamente esse cuidado que colocamos em
            cada detalhe da nossa loja.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
            <p>
              Nascemos do desejo de trazer para o seu dia a dia produtos que unem beleza, conforto e qualidade, com o
              carinho de quem escolhe cada item pensando em você. Inspirados pela delicadeza e pela atenção aos
              pequenos detalhes que encontramos nas culturas que mais amamos, buscamos oferecer uma experiência de
              compra tão acolhedora quanto os produtos que vendemos.
            </p>
            <p>
              Da pele à casa, dos acessórios à tecnologia, cada peça do nosso catálogo é selecionada com cuidado para
              que você se sinta cuidado em cada compra. Acreditamos que pequenos gestos de amor-próprio fazem toda a
              diferença — e queremos fazer parte da sua rotina de bem-estar.
            </p>
            <p className="font-medium text-foreground">
              Aqui, você não é só mais um cliente. É alguém que merece ser tratado com atenção verdadeira, do início
              da compra até a entrega na sua porta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 bg-card border border-border rounded-2xl p-5">
              <ShieldCheck className="text-primary" size={24} />
              <p className="font-semibold text-foreground text-sm">Compra Segura</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ambiente protegido e criptografado do início ao fim
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-card border border-border rounded-2xl p-5">
              <Lock className="text-accent" size={24} />
              <p className="font-semibold text-foreground text-sm">Dados Protegidos</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Suas informações nunca são compartilhadas
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-card border border-border rounded-2xl p-5">
              <Truck className="text-primary" size={24} />
              <p className="font-semibold text-foreground text-sm">Entrega Cuidadosa</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Embalagem com carinho e acompanhamento total
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-card border border-border rounded-2xl p-5">
              <Heart className="text-accent fill-accent/20" size={24} />
              <p className="font-semibold text-foreground text-sm">Feito com Amor</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cada detalhe pensado para o seu bem-estar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
