"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0faf5 0%, #fdf0f5 40%, #f5eefa 80%, #fef0f8 100%)" }}
    >
      {/* Fundo decorativo — bolinhas pastel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #a8e6c8, transparent)" }} />
        <div className="absolute top-20 right-1/3 w-20 h-20 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #f4b8d1, transparent)" }} />
        <div className="absolute bottom-16 left-1/4 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #c8b4e8, transparent)" }} />
        <div className="absolute bottom-8 right-10 w-16 h-16 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #a8d8ea, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #f7c5dc, transparent)" }} />

        {/* Pétalas SVG flutuando */}
        <svg className="absolute top-6 left-1/3 opacity-30 w-8 h-8" viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#f4b8d1" transform="rotate(0 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#e8a5c5" transform="rotate(72 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#f7c5dc" transform="rotate(144 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#f4b8d1" transform="rotate(216 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#e8a5c5" transform="rotate(288 20 20)" />
        </svg>
        <svg className="absolute bottom-14 right-1/4 opacity-25 w-6 h-6" viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#b4e4c8" transform="rotate(0 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#a8d8be" transform="rotate(72 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#c4ead0" transform="rotate(144 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#b4e4c8" transform="rotate(216 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#a8d8be" transform="rotate(288 20 20)" />
        </svg>
        <svg className="absolute top-1/3 right-8 opacity-20 w-5 h-5" viewBox="0 0 40 40" fill="none">
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#c8b4e8" transform="rotate(0 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#d4c0f0" transform="rotate(90 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#c0a8e0" transform="rotate(180 20 20)" />
          <ellipse cx="20" cy="10" rx="7" ry="12" fill="#c8b4e8" transform="rotate(270 20 20)" />
        </svg>

        {/* Linha de baixo */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #b4e4c8 25%, #f4b8d1 50%, #c8b4e8 75%, transparent)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 py-12 md:py-16">

          {/* Coluna esquerda — texto */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">

            {/* Tag "Beleza Verdadeira" */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(244,184,209,0.25)", border: "1px solid #f4b8d1" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e08ab0" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#c06890" }}>
                Beleza Verdadeira
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e08ab0" }} />
            </div>

            {/* Subtítulo coreano */}
            <p className="text-xs tracking-[0.35em] mb-3 font-light" style={{ color: "#9abfa8", letterSpacing: "0.3em" }}>
              진정한 아름다움
            </p>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-balance leading-tight" style={{ color: "#5a6e5f" }}>
              Cuide-se com
            </h1>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #e08ab0, #a87ccc, #7abea8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              carinho e amor
            </h2>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #b4e4c8)" }} />
              <span className="text-base" style={{ color: "#a8c8b4" }}>✿</span>
              <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #f4b8d1, transparent)" }} />
            </div>

            <p className="text-sm md:text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed font-light" style={{ color: "#7a8a80" }}>
              Produtos selecionados com amor, inspirados na beleza suave e autêntica do universo coreano. Você merece o melhor.
            </p>

            {/* Botões */}
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <a
                href="#products"
                className="px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all hover:opacity-90 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #e08ab0, #c270a0)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(224,138,176,0.4)",
                }}
              >
                Ver Produtos
              </a>
              <a
                href="#about"
                className="px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all hover:scale-105"
                style={{
                  border: "1.5px solid #a8d8be",
                  color: "#5a8a6a",
                  background: "rgba(168,216,190,0.15)",
                }}
              >
                Sobre nós
              </a>
            </div>

            {/* Badges */}
            <div className="flex gap-5 mt-8 flex-wrap justify-center md:justify-start">
              {[
                { label: "K-Beauty", color: "#f4b8d1", text: "#b06080" },
                { label: "Produtos Selecionados", color: "#b4e4c8", text: "#4a7a5a" },
                { label: "Entrega Segura", color: "#c8b4e8", text: "#7a5aaa" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: `${item.color}33`, color: item.text }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Coluna direita — imagens */}
          <div className="flex-1 relative order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-72 h-80 md:w-96 md:h-[26rem]">

              {/* Imagem principal */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl"
                style={{ border: "3px solid rgba(244,184,209,0.4)" }}
              >
                <Image
                  src="/banner-kdrama-main.png"
                  alt="K-drama True Beauty inspirado — modelo com estética coreana pastel"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay suave */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(240,250,245,0) 60%, rgba(253,240,245,0.3) 100%)" }}
                />
              </div>

              {/* Card flutante — imagem flat lay */}
              <div
                className="absolute -bottom-4 -left-8 w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-lg"
                style={{ border: "2px solid rgba(168,216,190,0.5)", background: "#f5fbf7" }}
              >
                <Image
                  src="/banner-kdrama-deco.png"
                  alt="Produtos de beleza K-beauty em flat lay pastel"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Badge flutuante */}
              <div
                className="absolute -top-3 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md"
                style={{ background: "rgba(200,180,232,0.9)", color: "#5a3a8a", border: "1px solid #d4c0f0" }}
              >
                ✿ K-Beauty
              </div>

              {/* Ponto decorativo */}
              <div
                className="absolute top-1/3 -left-5 w-10 h-10 rounded-full shadow-sm"
                style={{ background: "linear-gradient(135deg, #f4b8d1, #fce4ee)", border: "2px solid #fce8f0" }}
              />
              <div
                className="absolute bottom-1/3 -right-3 w-6 h-6 rounded-full"
                style={{ background: "linear-gradient(135deg, #b4e4c8, #d4f4e0)", border: "2px solid #c8f0d8" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
