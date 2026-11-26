"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import { ButterflyIcon } from "@/components/icons"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[520px] rounded-3xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20">
                <ButterflyIcon size={20} className="text-white" />
              </span>
              <div>
                <p className="font-semibold text-sm leading-tight">Ági, assistente ÁGAPE</p>
                <p className="text-xs opacity-85 leading-tight">Tire suas dúvidas rapidinho</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className="p-1.5 rounded-full hover:bg-white/20 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                Olá! Sou a Ági, assistente da ÁGAPE 🦋 Posso te ajudar com dúvidas sobre pagamento, entrega, trocas ou
                produtos. Como posso ajudar?
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}
                >
                  {message.parts.map((part, index) =>
                    part.type === "text" ? <span key={index}>{part.text}</span> : null,
                  )}
                </div>
              </div>
            ))}
            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-3 text-sm">
                  Digitando...
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="flex justify-start">
                <div className="bg-destructive/10 text-destructive rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%]">
                  Desculpe, não consegui responder agora. Fale com a gente pelo WhatsApp que te ajudamos na hora!
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-border bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta..."
              disabled={status !== "ready"}
              className="flex-1 rounded-full bg-background border border-border px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={status !== "ready" || !input.trim()}
              aria-label="Enviar mensagem"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition hover:brightness-110"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Fechar assistente" : "Abrir assistente virtual"}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={26} /> : <ButterflyIcon size={32} />}
      </button>
    </>
  )
}
