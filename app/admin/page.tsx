"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { supabase, type ProdutoDb } from "@/lib/supabase"
import { formatBRL } from "@/lib/utils"

type FormState = {
  id?: number
  nome: string
  descricao: string
  preco: string
  disponibilidade: string
  imagemFile?: File | null
  imagem_url?: string
  imagensFiles?: File[]
  imagensUrls?: string[]
  video_url?: string
  checkout_url?: string
  payment_type?: "cod" | "delivery" | "prepaid"
}

export default function AdminPage() {
  const router = useRouter()
  const [items, setItems] = useState<ProdutoDb[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<FormState>({ nome: "", descricao: "", preco: "", disponibilidade: "", imagensFiles: [], imagensUrls: [], video_url: "", checkout_url: "", payment_type: "cod" })
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "produtos"

  useEffect(() => {
    const ok = typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true"
    if (!ok) {
      router.replace("/admin/login")
      return
    }
    ;(async () => {
      if (!supabase) {
        console.warn("Supabase não configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.")
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from<ProdutoDb>("produtos")
        .select("*")
        .order("criado_em", { ascending: false })
      setItems(data || [])
      setLoading(false)
    })()
  }, [router])

  const resetForm = () => setForm({ nome: "", descricao: "", preco: "", disponibilidade: "", imagemFile: null, imagensFiles: [], imagensUrls: [], video_url: "", checkout_url: "", payment_type: "cod" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (!supabase) {
        alert("Supabase não configurado. Ajuste seu .env e recarregue.")
        return
      }
      let imageUrl = form.imagem_url || ""
      if (form.imagemFile) {
        const path = `${Date.now()}-${form.imagemFile.name}`
        const { error: upErr } = await supabase.storage.from(bucket).upload(path, form.imagemFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: form.imagemFile.type || "application/octet-stream",
        })
        if (upErr) {
          console.error("Erro de upload Storage:", upErr)
          throw new Error(
            `Falha no upload: ${upErr.message}. Verifique se o bucket "${bucket}" existe e está público, e se há políticas para anon.`
          )
        }
        const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)
        imageUrl = publicUrl.publicUrl
      }

      // Upload múltiplas imagens adicionais
      let extraImages: string[] = []
      if (form.imagensFiles && form.imagensFiles.length > 0) {
        for (const file of form.imagensFiles) {
          const path = `${Date.now()}-${file.name}`
          const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
            cacheControl: "3600",
            upsert: true,
            contentType: file.type || "application/octet-stream",
          })
          if (upErr) throw upErr
          const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)
          extraImages.push(publicUrl.publicUrl)
        }
      }

      if (!form.id) {
        const { error } = await supabase.from("produtos").insert({
          nome: form.nome,
          descricao: form.descricao,
          preco: Number(form.preco),
          imagem_url: imageUrl,
          imagens: extraImages.length ? extraImages : null,
          video_url: form.video_url || null,
          checkout_url: form.checkout_url || null,
          destaque: !!form.destaque,
          disponibilidade: form.disponibilidade,
          payment_type: form.payment_type || "cod",
        })
        if (error) throw error
        alert("Produto adicionado com sucesso!")
      } else {
        const { error } = await supabase
          .from("produtos")
          .update({
            nome: form.nome,
            descricao: form.descricao,
            preco: Number(form.preco),
            imagem_url: imageUrl,
            imagens: extraImages.length ? extraImages : form.imagensUrls || null,
            video_url: form.video_url || null,
            checkout_url: form.checkout_url || null,
            destaque: !!form.destaque,
            disponibilidade: form.disponibilidade,
            payment_type: form.payment_type || "cod",
          })
          .eq("id", form.id)
        if (error) throw error
        alert("Produto atualizado com sucesso!")
      }

      const { data } = await supabase.from<ProdutoDb>("produtos").select("*").order("criado_em", { ascending: false })
      setItems(data || [])
      resetForm()
    } catch (err: any) {
      alert(`Erro: ${err.message || err}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return
    if (!supabase) {
      alert("Supabase não configurado. Ajuste seu .env e recarregue.")
      return
    }
    const { error } = await supabase.from("produtos").delete().eq("id", id)
    if (error) {
      alert("Erro ao excluir")
      return
    }
    setItems((prev) => prev.filter((i) => i.id !== id))
    alert("Produto excluído!")
  }

  const startEdit = (item: ProdutoDb) => {
    setForm({
      id: item.id,
      nome: item.nome,
      descricao: item.descricao,
      preco: String(item.preco),
      disponibilidade: item.disponibilidade || "",
      imagem_url: item.imagem_url,
      imagemFile: null,
      imagensFiles: [],
      imagensUrls: item.imagens || [],
      video_url: item.video_url || "",
      checkout_url: item.checkout_url || "",
      destaque: Boolean(item.destaque),
      payment_type: item.payment_type || "cod",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie produtos, imagens e disponibilidade</p>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-3">
            {/* Formulário */}
            <div className="bg-white border border-border rounded-lg p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">{form.id ? "Editar Produto" : "Novo Produto"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm">Nome</label>
                  <input
                    className="w-full mt-1 px-3 py-2 border border-border rounded"
                    value={form.nome}
                    onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm">Descrição</label>
                  <textarea
                    className="w-full mt-1 px-3 py-2 border border-border rounded"
                    value={form.descricao}
                    onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full mt-1 px-3 py-2 border border-border rounded"
                      value={form.preco}
                      onChange={(e) => setForm((f) => ({ ...f, preco: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm">Disponibilidade</label>
                    <input
                      placeholder="ex: 25 unidades"
                      className="w-full mt-1 px-3 py-2 border border-border rounded"
                      value={form.disponibilidade}
                      onChange={(e) => setForm((f) => ({ ...f, disponibilidade: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Pagamento/Entrega</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-border rounded text-sm"
                    value={form.payment_type || "cod"}
                    onChange={(e) => setForm((f) => ({ ...f, payment_type: e.target.value as any }))}
                  >
                    <option value="cod">Pagamento na Entrega</option>
                    <option value="delivery">Entrega Pessoal</option>
                    <option value="prepaid">Pagamento Antecipado</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm">Imagem principal</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full mt-1"
                    onChange={(e) => setForm((f) => ({ ...f, imagemFile: e.target.files?.[0] || null }))}
                  />
                  {form.imagem_url && (
                    <img src={form.imagem_url} alt="Atual" className="mt-2 h-24 rounded border" />
                  )}
                </div>
                <div>
                  <label className="text-sm">Imagens adicionais</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full mt-1"
                    onChange={(e) => setForm((f) => ({ ...f, imagensFiles: Array.from(e.target.files || []) }))}
                  />
                  {form.imagensUrls && form.imagensUrls.length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {form.imagensUrls.map((u, i) => (
                        <img key={i} src={u} alt="" className="h-16 w-16 object-cover rounded border" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Link do vídeo (YouTube)</label>
                    <input
                      placeholder="https://youtube.com/..."
                      className="w-full mt-1 px-3 py-2 border border-border rounded"
                      value={form.video_url || ""}
                      onChange={(e) => setForm((f) => ({ ...f, video_url: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Link do Checkout</label>
                    <input
                      placeholder="https://..."
                      className="w-full mt-1 px-3 py-2 border border-border rounded"
                      value={form.checkout_url || ""}
                      onChange={(e) => setForm((f) => ({ ...f, checkout_url: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="destaque"
                    type="checkbox"
                    checked={!!form.destaque}
                    onChange={(e) => setForm((f) => ({ ...f, destaque: e.target.checked }))}
                  />
                  <label htmlFor="destaque" className="text-sm">Marcar como produto em destaque</label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90">
                    {form.id ? "Salvar" : "Adicionar"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Limpar
                  </Button>
                </div>
              </form>
            </div>

            {/* Lista */}
            <div className="lg:col-span-2 bg-white border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Produtos</h2>
              {loading ? (
                <p className="text-muted-foreground">Carregando...</p>
              ) : items.length === 0 ? (
                <p className="text-muted-foreground">Nenhum produto cadastrado.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-2">Imagem</th>
                        <th className="p-2">Nome</th>
                        <th className="p-2">Preço</th>
                        <th className="p-2">Disponibilidade</th>
                        <th className="p-2">Imgs</th>
                        <th className="p-2">Vídeo</th>
                        <th className="p-2">Checkout</th>
                        <th className="p-2">Pagamento/Entrega</th>
                        <th className="p-2">Destaque</th>
                        <th className="p-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-2">
                            <img src={item.imagem_url} alt="" className="h-12 w-12 object-cover rounded" />
                          </td>
                          <td className="p-2">{item.nome}</td>
                          <td className="p-2">{formatBRL(Number(item.preco))}</td>
                          <td className="p-2">{item.disponibilidade}</td>
                          <td className="p-2">{item.imagens?.length || 0}</td>
                          <td className="p-2 truncate max-w-[180px]">{item.video_url || "-"}</td>
                          <td className="p-2 truncate max-w-[180px]">{item.checkout_url || "-"}</td>
                          <td className="p-2">
                            {(item.payment_type === "cod"
                              ? "Pagamento na Entrega"
                              : item.payment_type === "delivery"
                              ? "Entrega Pessoal"
                              : "Pagamento Antecipado")}
                          </td>
                          <td className="p-2">{item.destaque ? "Sim" : "Não"}</td>
                          <td className="p-2 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                              Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                              Excluir
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
