"use client"

import { Trash2, MessageCircle } from "lucide-react"
import { useState } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  delivery: "cod" | "personal"
}

interface CartProps {
  items: CartItem[]
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

export default function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const codItems = items.filter((item) => item.delivery === "cod")
  const personalItems = items.filter((item) => item.delivery === "personal")

  const handleWhatsAppClick = (type: "cod" | "personal") => {
    const itemsText = (type === "cod" ? codItems : personalItems)
      .map((item) => `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `Olá! Gostaria de fazer um pedido:\n\n${itemsText}\n\nNome: ${customerInfo.name}\nTelefone: ${customerInfo.phone}\nEndereço: ${customerInfo.address}`

    const whatsappUrl = `https://wa.me/5571991108625?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">Seu Carrinho</h2>

        {items.length === 0 ? (
          <div className="bg-card rounded-lg p-12 text-center">
            <p className="text-muted-foreground text-lg">Seu carrinho está vazio</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-card rounded-lg p-4 flex gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.delivery === "cod" ? "✓ Pague na Entrega" : "✓ Entrega Pessoal"}
                      </p>
                      <p className="text-primary font-bold">R$ {item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-secondary rounded hover:bg-primary/20"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-secondary rounded hover:bg-primary/20"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-4 p-2 text-destructive hover:bg-destructive/10 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Sidebar */}
            <div className="bg-card rounded-lg p-6 h-fit">
              {/* Customer Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-4">Seus Dados</h3>
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded mb-3 bg-background text-foreground"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (com DDD)"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded mb-3 bg-background text-foreground"
                />
                <textarea
                  placeholder="Seu Endereço"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded bg-background text-foreground"
                />
              </div>

              {/* Summary */}
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between mb-2 text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-3">
                {codItems.length > 0 && (
                  <button
                    onClick={() => handleWhatsAppClick("cod")}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Finalizar COD
                  </button>
                )}

                {personalItems.length > 0 && (
                  <button
                    onClick={() => handleWhatsAppClick("personal")}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Entrega Pessoal
                  </button>
                )}

                {items.length > 0 && codItems.length === 0 && personalItems.length === 0 && (
                  <button
                    onClick={() => handleWhatsAppClick("personal")}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Conversar no WhatsApp
                  </button>
                )}
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Você será redirecionado para conversar conosco no WhatsApp
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
