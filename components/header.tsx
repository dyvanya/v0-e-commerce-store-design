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
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">AQUI TEM TUDO</div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/produtos" className="text-foreground hover:text-primary transition-colors">
              Produtos
            </Link>
            <Link href="/#sobre" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="/#contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Link href="/carrinho">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              <Link href="/produtos" className="text-foreground hover:text-primary transition-colors">
                Produtos
              </Link>
              <Link href="/#sobre" className="text-foreground hover:text-primary transition-colors">
                Sobre
              </Link>
              <Link href="/#contato" className="text-foreground hover:text-primary transition-colors">
                Contato
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
                <Link href="/carrinho" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Carrinho {items.length > 0 && `(${items.length})`}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
