"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import { Trash2, ShoppingCart, ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)

  const total = getTotal()
  const frete = total > 100 ? 0 : 15
  const totalComFrete = total + frete

  if (items.length === 0 && !showCheckoutForm) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-8">Adicione produtos para continuar a compra</p>
            <Link href="/produtos">
              <Button className="bg-primary hover:bg-primary/90">Continuar Comprando</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-secondary/30 py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-foreground">
              {showCheckoutForm ? "Finalizar Compra" : "Seu Carrinho"}
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!showCheckoutForm ? (
              // Carrinho
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Items */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border border-border overflow-hidden">
                    {items.map((item, index) => (
                      <div
                        key={item.product.id}
                        className={`flex gap-6 p-6 ${index !== items.length - 1 ? "border-b border-border" : ""}`}
                      >
                        {/* Imagem */}
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Informações */}
                        <div className="flex-1">
                          <Link
                            href={`/produto/${item.product.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">{item.product.description}</p>
                          <p className="text-sm font-medium text-primary mt-2">R$ {item.product.price.toFixed(2)}</p>
                        </div>

                        {/* Quantidade e Remover */}
                        <div className="flex flex-col items-end gap-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 font-semibold text-foreground">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 text-foreground hover:bg-muted transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-foreground">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/produtos">
                    <Button variant="outline" className="mt-6 bg-transparent">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>

                {/* Resumo */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-border p-6 sticky top-24 h-fit">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Resumo</h2>

                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold text-foreground">R$ {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete {total > 100 ? "(Grátis!)" : ""}</span>
                        <span className={`font-semibold ${total > 100 ? "text-primary" : "text-foreground"}`}>
                          R$ {frete.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                      <span>Total</span>
                      <span className="text-primary">R$ {totalComFrete.toFixed(2)}</span>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => setShowCheckoutForm(true)}
                    >
                      Finalizar Compra
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                      <p className="text-xs text-muted-foreground text-center">
                        Frete grátis em compras acima de R$ 100!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Checkout Form
              <CheckoutForm
                total={totalComFrete}
                items={items}
                onBack={() => setShowCheckoutForm(false)}
                onClearCart={clearCart}
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface CheckoutFormProps {
  total: number
  items: Array<{ product: any; quantity: number }>
  onBack: () => void
  onClearCart: () => void
}

function CheckoutForm({ total, items, onBack, onClearCart }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentType: "cod",
    notes: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format items list with proper formatting
    const itemsList = items
      .map(
        (item: any) =>
          `• ${item.product.name} (${item.quantity}x R$ ${item.product.price.toFixed(2)}) = R$ ${(item.product.price * item.quantity).toFixed(2)}`,
      )
      .join("%0A")

    const paymentTypeLabel = formData.paymentType === "cod" ? "Pagamento na Entrega" : "Entrega Pessoal"
    const subtotal = total - (total > 100 ? 0 : 15)

    const message = `🛍️ *NOVO PEDIDO RECEBIDO* 🛍️%0A%0A✨ *DADOS DO CLIENTE*%0A👤 Nome: ${formData.name}%0A📧 Email: ${formData.email}%0A📱 WhatsApp: ${formData.phone}%0A📍 Endereço: ${formData.address}%0A%0A📦 *PRODUTOS SOLICITADOS*%0A${itemsList}%0A%0A💰 *RESUMO FINANCEIRO*%0A📊 Subtotal: R$ ${subtotal.toFixed(2)}%0A🚚 Frete: R$ ${total > 100 ? "0,00" : "15,00"} ${total > 100 ? "(GRÁTIS!)" : ""}%0A*💵 TOTAL: R$ ${total.toFixed(2)}*%0A%0A💳 *FORMA DE PAGAMENTO*%0A${paymentTypeLabel}%0A%0A📝 *OBSERVAÇÕES DO CLIENTE*%0A${formData.notes || "Nenhuma observação"}%0A%0A✅ Aguardando confirmação. Responder com disponibilidade e data de entrega.`

    window.open(`https://wa.me/5571991108625?text=${message}`, "_blank")

    setSubmitted(true)
    onClearCart()
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-lg border border-border p-8">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Pedido Enviado com Sucesso!</h2>
          <p className="text-muted-foreground mb-6">
            Seu pedido foi enviado via WhatsApp. Você será contatado em breve para confirmar os detalhes.
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">Voltar à Loja</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Formulário */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informações Pessoais</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Endereço para Entrega *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Rua, número, complemento, cidade, estado"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Tipo de Pagamento *</label>
                <select
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="cod">Pagamento na Entrega (Dinheiro)</option>
                  <option value="delivery">Entrega Pessoal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Observações (Opcional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Alguma informação adicional sobre o pedido?"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Confirmar Pedido via WhatsApp
            </Button>
          </div>
        </form>
      </div>

      {/* Resumo */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-border p-6 sticky top-24 h-fit">
          <h3 className="text-lg font-semibold text-foreground mb-4">Resumo do Pedido</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto mb-6 pb-6 border-b border-border">
            {items.map((item: any) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <div className="flex-1">
                  <p className="text-foreground font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x R$ {item.product.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-foreground ml-2">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span className="text-primary">R$ {total.toFixed(2)}</span>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-foreground font-medium mb-2">Como funciona:</p>
            <p className="text-xs text-muted-foreground">
              Você será redirecionado para o WhatsApp. Enviaremos o pedido e responderemos com confirma a
              disponibilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
