"use client"

import Link from "next/link"
import { Mail, Phone, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Sobre Nós</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Somos a sua loja de confiança com entrega rápida em até 24 horas. Oferecemos produtos selecionados com
              pagamento seguro na entrega. Qualidade, preço justo e atendimento personalizado são nosso compromisso.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Políticas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Atendimento</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+5571991108625" className="hover:text-primary transition-colors">
                  (71) 99110-8625
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:sac.aquitemtudoo@gmail.com" className="hover:text-primary transition-colors">
                  SAC.AQUITEMTUDOO@GMAIL.COM
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Siga-nos</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://instagram.com/paguenaentregaoficial__"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                @paguenaentregaoficial__
              </a>
              <p className="text-muted-foreground text-xs">Frete Grátis | Entrega em até 24h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AQUI TEM TUDO. Todos os direitos reservados. | Pagamento na entrega com nossos entregadores</p>
        </div>
      </div>
    </footer>
  )
}
