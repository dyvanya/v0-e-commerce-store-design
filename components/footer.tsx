import { Heart, Mail, Phone, Instagram, ShieldCheck, Lock } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Sobre Nós</h3>
            <p className="text-muted-foreground text-sm">
              Oferecemos produtos de qualidade com entrega segura e atendimento excepcional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#top" className="text-muted-foreground hover:text-primary">
                  Início
                </a>
              </li>
              <li>
                <a href="#products" className="text-muted-foreground hover:text-primary">
                  Produtos
                </a>
              </li>
              <li>
                <a href="/politica" className="text-muted-foreground hover:text-primary">
                  Política de Trocas e Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2 items-center text-muted-foreground hover:text-primary cursor-pointer">
                <Mail size={16} />
                <a href="mailto:sac.aquitemtudoo@gmail.com">sac.aquitemtudoo@gmail.com</a>
              </li>
              <li className="flex gap-2 items-center text-muted-foreground hover:text-primary cursor-pointer">
                <Phone size={16} />
                <a href="tel:+5571991108625">(71) 99110-8625</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Redes Sociais</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://instagram.com/paguenaentregaoficial__?igsh=MW9jdDMxNWwzdTl3aA%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:text-primary transition"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5571991108625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:text-primary transition"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-border pt-8 pb-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={18} className="text-primary" />
            Compra 100% Segura
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock size={18} className="text-primary" />
            Dados Protegidos
          </span>
          <span className="text-sm font-medium text-muted-foreground">Pix · Cartão · Na Entrega</span>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-muted-foreground text-sm flex items-center justify-center gap-1">
            Feito com <Heart size={16} className="fill-accent text-accent" /> por ÁGAPE © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
