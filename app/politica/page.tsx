import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Trocas e Privacidade | ÁGAPE",
  description: "Conheça as políticas de trocas, devoluções e privacidade da loja ÁGAPE.",
}

export default function PoliticaPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8"
        >
          <ArrowLeft size={16} />
          Voltar para a loja
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck size={28} className="text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Política de Trocas e Privacidade</h1>
        </div>
        <p className="text-muted-foreground mb-10">Última atualização: 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Trocas e Devoluções</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Na ÁGAPE, sua satisfação é prioridade. Você tem até <strong className="text-foreground">7 dias corridos</strong>{" "}
              após o recebimento do produto para solicitar troca ou devolução, conforme o Código de Defesa do
              Consumidor.
            </p>
            <p>Para solicitar, entre em contato pelo WhatsApp ou e-mail informando o número do pedido e o motivo.</p>
            <p>O produto deve estar sem uso, com embalagem e etiquetas originais, quando aplicável.</p>
            <p>Em caso de defeito de fabricação, a troca é garantida sem custo para o cliente.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Formas de Pagamento e Entrega</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Aceitamos pagamento via Pix, cartão de crédito/débito e pagamento na entrega, conforme disponibilidade.</p>
            <p>
              Oferecemos entrega pessoal em Salvador e região, além de envio por delivery para outras localidades. O
              prazo é combinado diretamente com você no momento da compra.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-3">Privacidade e Proteção de Dados</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Seus dados pessoais (nome, telefone, endereço) são utilizados exclusivamente para processar seu pedido e
              manter contato sobre a compra. Não compartilhamos suas informações com terceiros para fins comerciais.
            </p>
            <p>
              Todas as transações são protegidas e seguem boas práticas de segurança para garantir que sua compra seja
              100% segura, do início ao fim.
            </p>
            <p>
              Você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato pelos nossos canais
              oficiais.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Fale com a Gente</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dúvidas sobre esta política? Fale conosco pelo WhatsApp{" "}
            <a href="https://wa.me/5571991108625" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              (71) 99110-8625
            </a>{" "}
            ou pelo e-mail{" "}
            <a href="mailto:sac.aquitemtudoo@gmail.com" className="text-primary hover:underline">
              sac.aquitemtudoo@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
