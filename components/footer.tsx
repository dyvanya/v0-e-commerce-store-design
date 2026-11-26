"use client"

import Link from "next/link"
import { Mail, Phone, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-9 grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block text-lg font-extrabold tracking-tight text-primary">AQUI TEM TUDO</Link>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Somos a sua loja de confiança com entrega rápida em até 24 horas. Oferecemos produtos selecionados com pagamento seguro na entrega. Qualidade, preço justo e atendimento personalizado são nosso compromisso.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Links Úteis</h3>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">Início</Link></li>
              <li><Link href="/produtos" className="text-sm text-muted-foreground transition-colors hover:text-primary">Produtos</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">Políticas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Atendimento</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <a href="tel:+5571991108625" className="transition-colors hover:text-primary">(71) 99110-8625</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href="mailto:sac.aquitemtudoo@gmail.com" className="break-all transition-colors hover:text-primary">SAC.AQUITEMTUDOO@GMAIL.COM</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-foreground">Siga-nos</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://instagram.com/paguenaentregaoficial__"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="size-4 text-primary" />
                @paguenaentregaoficial__
              </a>
              <p className="text-xs text-muted-foreground">Frete Grátis | Entrega em até 24h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-7 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AQUI TEM TUDO. Todos os direitos reservados. | Pagamento na entrega com nossos entregadores</p>
        </div>
      </div>
    </footer>
  )
}
