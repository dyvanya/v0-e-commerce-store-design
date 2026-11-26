"use client"

import { ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ÁGAPE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#top" className="text-foreground hover:text-primary transition">
              Início
            </a>
            <a href="#products" className="text-foreground hover:text-primary transition">
              Produtos
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition">
              Sobre
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button onClick={onCartClick} className="relative p-2 text-foreground hover:text-primary transition">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <a
              href="#top"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition"
            >
              Início
            </a>
            <a
              href="#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition"
            >
              Produtos
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-foreground hover:text-primary transition"
            >
              Sobre
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
