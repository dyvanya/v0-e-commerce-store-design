"use client"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(135deg, #fdf0f5 0%, #f9e8f2 30%, #f0eafa 65%, #fce8f0 100%)" }}>

      {/* Elementos decorativos florais — canto superior esquerdo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Pétalas espalhadas */}
        <svg className="absolute -top-4 -left-6 w-64 h-64 opacity-30" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="40" r="18" fill="#f4b8d1" />
          <circle cx="55" cy="20" r="12" fill="#e8a5c5" />
          <circle cx="70" cy="50" r="15" fill="#f7c5dc" />
          <circle cx="40" cy="70" r="10" fill="#dba8d4" />
          <ellipse cx="85" cy="30" rx="22" ry="14" fill="#f0b5d5" opacity="0.7" />
          <circle cx="110" cy="15" r="8" fill="#e9b3d8" opacity="0.5" />
          <circle cx="20" cy="100" r="7" fill="#d9a5cc" opacity="0.4" />
        </svg>

        {/* Flores canto superior direito */}
        <svg className="absolute -top-2 right-0 w-72 h-72 opacity-25" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="170" cy="35" r="20" fill="#c5a8e0" />
          <circle cx="145" cy="15" r="14" fill="#d4b6e8" />
          <circle cx="185" cy="65" r="12" fill="#b99dd6" />
          <circle cx="155" cy="60" r="18" fill="#cbb3e5" opacity="0.7" />
          <circle cx="130" cy="40" r="9" fill="#e0c8f0" opacity="0.5" />
        </svg>

        {/* Pétalas flutuando — centro direita */}
        <svg className="absolute top-1/2 -right-8 w-48 h-48 opacity-20" viewBox="0 0 150 150" fill="none">
          <circle cx="120" cy="50" r="22" fill="#f4b8d1" />
          <circle cx="100" cy="30" r="14" fill="#e8c5d8" />
          <circle cx="135" cy="80" r="10" fill="#d4a8cf" />
        </svg>

        {/* Florzinhas dispersas */}
        <div className="absolute top-8 left-1/3 w-3 h-3 rounded-full bg-pink-200 opacity-60" />
        <div className="absolute top-16 left-1/4 w-2 h-2 rounded-full bg-purple-200 opacity-50" />
        <div className="absolute top-6 right-1/3 w-4 h-4 rounded-full bg-pink-100 opacity-70" />
        <div className="absolute bottom-12 left-1/5 w-3 h-3 rounded-full bg-rose-200 opacity-50" />
        <div className="absolute bottom-8 right-1/4 w-2 h-2 rounded-full bg-purple-100 opacity-60" />

        {/* Linha decorativa suave */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #f0c0d8 30%, #c8a8e0 70%, transparent)" }} />
      </div>

      {/* Tag "Beleza Verdadeira" — canto superior esquerdo */}
      <div className="absolute top-6 left-6 md:top-8 md:left-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "#b87faa" }}>
            ✿ Beleza Verdadeira ✿
          </span>
        </div>
      </div>

      {/* Conteúdo central */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          {/* Subtítulo coreano decorativo */}
          <p className="text-xs md:text-sm tracking-widest uppercase mb-3 font-light" style={{ color: "#c490b8", letterSpacing: "0.3em" }}>
            진정한 아름다움
          </p>

          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-balance leading-tight" style={{ color: "#7a4f6d" }}>
            Descubra sua
          </h1>
          <h2
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            style={{
              color: "#c26fa0",
              fontStyle: "italic",
              textShadow: "0 2px 20px rgba(194,111,160,0.2)",
            }}
          >
            Beleza Verdadeira
          </h2>

          {/* Divisor floral */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(90deg, transparent, #e0aac8)" }} />
            <span className="text-lg" style={{ color: "#d4a0c0" }}>✿</span>
            <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(90deg, #c4a0d8, transparent)" }} />
          </div>

          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light" style={{ color: "#9a6d8a" }}>
            Produtos selecionados com amor para realçar o que há de mais especial em você. Cuide-se com carinho.
          </p>

          {/* Botões */}
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#products"
              className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all hover:opacity-90 hover:scale-105 shadow-md"
              style={{ background: "linear-gradient(135deg, #e084b0, #c26fa0)", color: "#fff", boxShadow: "0 4px 20px rgba(194,111,160,0.35)" }}
            >
              Explorar Produtos
            </a>
            <a
              href="#about"
              className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all hover:scale-105"
              style={{ border: "1.5px solid #d4a0c0", color: "#b07090", background: "rgba(255,255,255,0.6)" }}
            >
              Nossa História
            </a>
          </div>

          {/* Badges decorativos */}
          <div className="flex justify-center gap-6 mt-10 flex-wrap">
            {["Qualidade Premium", "Entrega Segura", "Atendimento Especial"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs font-medium" style={{ color: "#b87faa" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#e0aac8" }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
