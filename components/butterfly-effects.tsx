"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

type Butterfly = {
  id: number
  x: number
  y: number
  endX: number
  endY: number
  color: string
  scale: number
  duration: number
  delay: number
}

const COLORS = ["#f08ab5", "#a78bfa", "#72c7a1", "#f6ad75", "#72bde8", "#e879b5"]
const MAX_BUTTERFLIES = 14

function ButterflyShape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 40" className="butterfly-shape" aria-hidden="true">
      <path d="M23 19C17 4 5 3 4 11c-1 6 5 10 15 11C8 20 4 26 8 31c4 5 12 1 16-8" fill={color} />
      <path d="M25 19C31 4 43 3 44 11c1 6-5 10-15 11 11-2 15 4 11 9-4 5-12 1-16-8" fill={color} />
      <path d="M24 15v13" stroke="#72516b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m23 16-4-5m6 5 4-5" fill="none" stroke="#72516b" strokeWidth="1" strokeLinecap="round" />
      <circle cx="13" cy="14" r="1.4" fill="#fff" fillOpacity=".75" />
      <circle cx="35" cy="14" r="1.4" fill="#fff" fillOpacity=".75" />
    </svg>
  )
}

export default function ButterflyEffects() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([])
  const nextId = useRef(0)
  const colorIndex = useRef(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const addButterflies = (items: Butterfly[]) => {
      const ids = items.map((item) => item.id)
      setButterflies((current) => [...current, ...items].slice(-MAX_BUTTERFLIES))
      window.setTimeout(() => {
        setButterflies((current) => current.filter((item) => !ids.includes(item.id)))
      }, Math.max(...items.map((item) => item.duration + item.delay)) + 250)
    }

    const firstFlight = Array.from({ length: 7 }, (_, index): Butterfly => {
      const id = nextId.current++
      return {
        id,
        x: 8 + Math.random() * 84,
        y: 78 + Math.random() * 20,
        endX: (Math.random() - 0.5) * 48,
        endY: -(window.innerHeight * (0.6 + Math.random() * 0.4)),
        color: COLORS[index % COLORS.length],
        scale: 0.7 + Math.random() * 0.65,
        duration: 3600 + Math.random() * 1800,
        delay: Math.random() * 700,
      }
    })
    addButterflies(firstFlight)

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest("button, a, [role='button'], .product-card")) return
      if (target.closest("input, textarea, select, [contenteditable='true']")) return

      const id = nextId.current++
      const color = COLORS[colorIndex.current % COLORS.length]
      colorIndex.current += 1
      const butterfly: Butterfly = {
        id,
        x: event.clientX,
        y: event.clientY,
        endX: (Math.random() - 0.5) * 190,
        endY: -(100 + Math.random() * 150),
        color,
        scale: 0.72 + Math.random() * 0.5,
        duration: 1300 + Math.random() * 500,
        delay: 0,
      }
      addButterflies([butterfly])
    }

    document.addEventListener("pointerdown", onPointerDown, { passive: true })
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  return (
    <div className="butterfly-effects" aria-hidden="true">
      {butterflies.map((butterfly) => (
        <span
          key={butterfly.id}
          className="flying-butterfly"
          style={{
            left: `${butterfly.x}px`,
            top: `${butterfly.y}px`,
            "--flight-x": `${butterfly.endX}px`,
            "--flight-y": `${butterfly.endY}px`,
            "--butterfly-scale": butterfly.scale,
            "--flight-duration": `${butterfly.duration}ms`,
            animationDelay: `${butterfly.delay}ms`,
          } as CSSProperties}
        >
          <ButterflyShape color={butterfly.color} />
        </span>
      ))}
    </div>
  )
}
