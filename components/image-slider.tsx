"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type SlideEffect = "slide" | "fade" | "zoom"

export interface ImageItem {
  src: string
  alt?: string
}

export interface ImageSliderProps {
  images: ImageItem[]
  speedMs?: number
  effect?: SlideEffect
  autoplay?: boolean
  autoplayIntervalMs?: number
  className?: string
}

export function ImageSlider({ images, speedMs = 300, effect = "slide", autoplay = false, autoplayIntervalMs = 4000, className }: ImageSliderProps) {
  const clean = useMemo(() => images.filter((i) => !!i && !!i.src), [images])
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const regionRef = useRef<HTMLDivElement | null>(null)
  const startXRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const autoplayRef = useRef<number | null>(null)
  const transitioningRef = useRef(false)

  useEffect(() => {
    if (!autoplay) return
    stopAutoplay()
    autoplayRef.current = window.setInterval(() => {
      next()
    }, Math.max(autoplayIntervalMs, speedMs + 100))
    return stopAutoplay
  }, [autoplay, autoplayIntervalMs, speedMs, clean.length])

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const prev = () => {
    if (transitioningRef.current) return
    setIndex((i) => (i - 1 + clean.length) % clean.length)
  }
  const next = () => {
    if (transitioningRef.current) return
    setIndex((i) => (i + 1) % clean.length)
  }

  const onPointerDown = (e: React.PointerEvent) => {
    stopAutoplay()
    startXRef.current = e.clientX
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    lastTimeRef.current = performance.now()
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || startXRef.current === null) return
    const dx = e.clientX - startXRef.current
    setDragX(dx)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragging(false)
    const threshold = 50
    if (dragX > threshold) prev()
    else if (dragX < -threshold) next()
    setDragX(0)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev()
    if (e.key === "ArrowRight") next()
    if (e.key === "Escape" && zoomOpen) setZoomOpen(false)
  }

  const goTo = (i: number) => {
    if (transitioningRef.current) return
    setIndex(i)
  }

  const current = clean[index]

  const effectCls = useMemo(() => {
    if (effect === "fade") return "transition-opacity"
    if (effect === "zoom") return "transition-transform"
    return "transition-transform"
  }, [effect])

  const effectStyle = useMemo(() => {
    const duration = `${speedMs}ms`
    if (effect === "fade") return { transitionDuration: duration, opacity: dragging ? 0.95 : 1 }
    if (effect === "zoom") return { transitionDuration: duration, transform: dragging ? `scale(0.98)` : "scale(1)" }
    const base = dragging ? dragX : 0
    transitioningRef.current = dragging
    return { transitionDuration: duration, transform: `translateX(${base}px)` }
  }, [effect, speedMs, dragX, dragging])

  const onImageClick = () => {
    setZoomOpen(true)
  }

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Galeria de imagens"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`relative select-none ${className || ""}`}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="w-full h-full overflow-hidden rounded-lg bg-muted"
      >
        <img
          src={current?.src || "/placeholder.svg"}
          alt={current?.alt || "Imagem do produto"}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain ${effectCls}`}
          style={effectStyle as any}
          onClick={onImageClick}
        />
      </div>

      <button
        aria-label="Imagem anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 border border-border"
        onClick={prev}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Próxima imagem"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full p-2 border border-border"
        onClick={next}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {clean.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para imagem ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-primary" : "bg-white/70 border border-border"}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <img
            src={current?.src || "/placeholder.svg"}
            alt={current?.alt || "Imagem do produto"}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  )
}

