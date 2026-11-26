"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">AQUI TEM TUDO</span>
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
            <Link href="/produtos" className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary">
              Produtos
            </Link>
            <Link href="/#sobre" className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary">
              Sobre
            </Link>
            <Link href="/#contato" className="text-sm font-medium text-foreground/85 transition-colors hover:text-primary">
              Contato
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="icon" className="rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary">
              <Link href="/produtos" aria-label="Buscar produtos">
                <Search className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full border-primary/15 bg-white shadow-sm hover:bg-primary/5">
              <Link href="/carrinho" aria-label={`Carrinho${items.length > 0 ? `, ${items.length} itens` : ""}`} className="relative">
                <ShoppingCart className="size-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {items.length}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-primary/10 pb-4 md:hidden">
            <nav aria-label="Navegação móvel" className="flex flex-col gap-3 pt-4">
              <Link href="/produtos" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-primary/5 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Produtos
              </Link>
              <Link href="/#sobre" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-primary/5 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </Link>
              <Link href="/#contato" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-primary/5 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1 rounded-full border-primary/15 bg-white" size="sm">
                  <Link href="/produtos">
                    <Search className="size-4" />
                    Buscar
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 rounded-full border-primary/15 bg-white" size="sm">
                  <Link href="/carrinho">
                    <ShoppingCart className="size-4" />
                    Carrinho {items.length > 0 && `(${items.length})`}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
