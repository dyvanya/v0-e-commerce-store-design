"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const router = useRouter()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ok = typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true"
    if (ok) router.replace("/admin")
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("admin_auth", "true")
      router.push("/admin")
    } else {
      setError("Usuário ou senha inválidos")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-12">
          <div className="max-w-md mx-auto bg-white border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-foreground mb-4">Login do Administrador</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-foreground">Usuário</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-border rounded"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="text-sm text-foreground">Senha</label>
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-border rounded"
                  placeholder="1234"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" className="bg-primary hover:bg-primary/90">Entrar</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}