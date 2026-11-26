"use client"

import { WhatsAppIcon } from "@/components/icons"

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5571991108625"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <WhatsAppIcon size={28} className="relative" />
    </a>
  )
}
