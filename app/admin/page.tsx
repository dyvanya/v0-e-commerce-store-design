"use client"

import { useEffect, useRef, useState } from "react"
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
  selectedColors?: number[]
  selectedSizes?: number[]
}

export default function AdminPage() {
  const router = useRouter()
  const [items, setItems] = useState<ProdutoDb[]>([])
  const [colors, setColors] = useState<any[]>([])
  const [sizes, setSizes] = useState<any[]>([])
  const [newColorName, setNewColorName] = useState("")
  const [newColorHex, setNewColorHex] = useState("#000000")
  const [newColorActive, setNewColorActive] = useState(true)
  const [newSizeDesc, setNewSizeDesc] = useState("")
  const [newSizeCode, setNewSizeCode] = useState("")
  const [newSizeActive, setNewSizeActive] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<FormState>({ nome: "", descricao: "", preco: "", disponibilidade: "", imagensFiles: [], imagensUrls: [], video_url: "", checkout_url: "", payment_type: "cod" })
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "produtos"
  const addInputRef = useRef<HTMLInputElement | null>(null)

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
      const { data: cores } = await supabase.from("cores").select("*").order("nome")
      setColors(cores || [])
      const { data: tamanhos } = await supabase.from("tamanhos").select("*").order("descricao")
      setSizes(tamanhos || [])
      setLoading(false)
    })()
  }, [router])

  const resetForm = () => setForm({ nome: "", descricao: "", preco: "", disponibilidade: "", imagemFile: null, imagensFiles: [], imagensUrls: [], video_url: "", checkout_url: "", payment_type: "cod", selectedColors: [], selectedSizes: [] })

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

      let extraImages: string[] = []
      if (form.imagensFiles && form.imagensFiles.length > 0) {
        const allowed = ["image/jpeg", "image/png"]
        const maxSize = 5 * 1024 * 1024
        for (const file of form.imagensFiles) {
          if (!allowed.includes(file.type) || file.size > maxSize) continue
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

      const nextImagesForInsert = (() => {
        const prev = form.imagensUrls || []
        const next = extraImages.length ? [...prev, ...extraImages] : prev
        return next.length ? next : null
      })()

      if (!form.id) {
        const { data: inserted, error } = await supabase.from("produtos").insert({
          nome: form.nome,
          descricao: form.descricao,
          preco: Number(form.preco),
          imagem_url: imageUrl,
          imagens: nextImagesForInsert,
          video_url: form.video_url || null,
          checkout_url: form.checkout_url || null,
          destaque: !!form.destaque,
          disponibilidade: form.disponibilidade,
          payment_type: form.payment_type || "cod",
        }).select("id").limit(1)
        if (error) throw error
        const newId = inserted?.[0]?.id
        if (newId) {
          const corRows = (form.selectedColors || []).map((cid) => ({ produto_id: newId, cor_id: cid }))
          if (corRows.length) await supabase.from("produto_cores").insert(corRows)
          const tamRows = (form.selectedSizes || []).map((sid) => ({ produto_id: newId, tamanho_id: sid }))
          if (tamRows.length) await supabase.from("produto_tamanhos").insert(tamRows)
        }
        alert("Produto adicionado com sucesso!")
      } else {
        const { error } = await supabase
          .from("produtos")
          .update({
            nome: form.nome,
            descricao: form.descricao,
            preco: Number(form.preco),
            imagem_url: imageUrl,
            imagens: (() => {
              const prev = form.imagensUrls || []
              const next = extraImages.length ? [...prev, ...extraImages] : prev
              return next.length ? next : null
            })(),
            video_url: form.video_url || null,
            checkout_url: form.checkout_url || null,
            destaque: !!form.destaque,
            disponibilidade: form.disponibilidade,
            payment_type: form.payment_type || "cod",
          })
          .eq("id", form.id)
        if (error) throw error
        await supabase.from("produto_cores").delete().eq("produto_id", form.id)
        const corRows = (form.selectedColors || []).map((cid) => ({ produto_id: form.id!, cor_id: cid }))
        if (corRows.length) await supabase.from("produto_cores").insert(corRows)
        await supabase.from("produto_tamanhos").delete().eq("produto_id", form.id)
        const tamRows = (form.selectedSizes || []).map((sid) => ({ produto_id: form.id!, tamanho_id: sid }))
        if (tamRows.length) await supabase.from("produto_tamanhos").insert(tamRows)
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
      selectedColors: [],
      selectedSizes: [],
    })
    ;(async () => {
      if (!supabase) return
      const { data: pc } = await supabase.from("produto_cores").select("cor_id").eq("produto_id", item.id)
      const { data: pt } = await supabase.from("produto_tamanhos").select("tamanho_id").eq("produto_id", item.id)
      setForm((f) => ({ ...f, selectedColors: (pc || []).map((r: any) => r.cor_id), selectedSizes: (pt || []).map((r: any) => r.tamanho_id) }))
    })()
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
                  <label className="text-sm">Cores disponíveis</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`px-2 py-1 border rounded text-xs flex items-center gap-2 ${form.selectedColors?.includes(c.id) ? "border-primary" : "border-border"}`}
                        onClick={() => setForm((f) => ({ ...f, selectedColors: (f.selectedColors || []).includes(c.id) ? (f.selectedColors || []).filter((x) => x !== c.id) : [ ...(f.selectedColors || []), c.id ] }))}
                        disabled={!c.ativo}
                        title={c.nome}
                      >
                        <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: c.hex }} />
                        {c.nome}
                        {!c.ativo && <span className="text-[10px] text-muted-foreground">(inativa)</span>}
                      </button>
                    ))}
                    {colors.length === 0 && (
                      <span className="text-xs text-muted-foreground">Nenhuma cor cadastrada</span>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input value={newColorName} onChange={(e)=>setNewColorName(e.target.value)} placeholder="Nome" className="px-3 py-2 border rounded text-sm" />
                    <input type="color" value={newColorHex} onChange={(e)=>setNewColorHex(e.target.value)} className="px-3 py-2 border rounded" />
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newColorActive} onChange={(e)=>setNewColorActive(e.target.checked)} /> Ativa</label>
                    <Button
                      type="button"
                      className="bg-primary"
                      onClick={async ()=>{
                        if (!supabase) return
                        const { data } = await supabase.from("cores").insert({ nome: newColorName || "Cor", hex: newColorHex || "#000000", ativo: newColorActive }).select("*")
                        const { data: cores } = await supabase.from("cores").select("*").order("nome")
                        setColors(cores || [])
                        setNewColorName("")
                      }}
                    >Adicionar Cor</Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm">Tamanhos disponíveis</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`px-2 py-1 border rounded text-xs ${form.selectedSizes?.includes(s.id) ? "border-primary" : "border-border"}`}
                        onClick={() => setForm((f) => ({ ...f, selectedSizes: (f.selectedSizes || []).includes(s.id) ? (f.selectedSizes || []).filter((x) => x !== s.id) : [ ...(f.selectedSizes || []), s.id ] }))}
                        disabled={!s.ativo}
                        title={s.descricao}
                      >
                        {s.codigo} - {s.descricao}
                        {!s.ativo && <span className="text-[10px] text-muted-foreground"> (inativo)</span>}
                      </button>
                    ))}
                    {sizes.length === 0 && (
                      <span className="text-xs text-muted-foreground">Nenhum tamanho cadastrado</span>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input value={newSizeDesc} onChange={(e)=>setNewSizeDesc(e.target.value)} placeholder="Descrição" className="px-3 py-2 border rounded text-sm" />
                    <input value={newSizeCode} onChange={(e)=>setNewSizeCode(e.target.value)} placeholder="Código" className="px-3 py-2 border rounded text-sm" />
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newSizeActive} onChange={(e)=>setNewSizeActive(e.target.checked)} /> Ativo</label>
                    <Button
                      type="button"
                      className="bg-primary"
                      onClick={async ()=>{
                        if (!supabase) return
                        const { data } = await supabase.from("tamanhos").insert({ descricao: newSizeDesc || "Tamanho", codigo: newSizeCode || "U", ativo: newSizeActive }).select("*")
                        const { data: tamanhos } = await supabase.from("tamanhos").select("*").order("descricao")
                        setSizes(tamanhos || [])
                        setNewSizeDesc("")
                        setNewSizeCode("")
                      }}
                    >Adicionar Tamanho</Button>
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
                    ref={addInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || [])
                      if (!files.length) return
                      const allowed = ["image/jpeg", "image/png"]
                      const maxSize = 5 * 1024 * 1024
                      const valid = files.filter((f) => allowed.includes(f.type) && f.size <= maxSize)
                      if (!supabase) {
                        setForm((f) => ({ ...f, imagensFiles: valid }))
                        return
                      }
                      const uploaded: string[] = []
                      for (const file of valid) {
                        const path = `${Date.now()}-${file.name}`
                        const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
                          cacheControl: "3600",
                          upsert: true,
                          contentType: file.type || "application/octet-stream",
                        })
                        if (upErr) continue
                        const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)
                        uploaded.push(publicUrl.publicUrl)
                      }
                      if (uploaded.length) {
                        const next = [ ...(form.imagensUrls || []), ...uploaded ]
                        setForm((f) => ({ ...f, imagensUrls: next }))
                        if (form.id) {
                          await supabase
                            .from("produtos")
                            .update({ imagens: next })
                            .eq("id", form.id)
                        }
                        alert("Imagens adicionadas")
                      }
                      if (addInputRef.current) addInputRef.current.value = ""
                    }}
                  />
                  {form.imagensUrls && form.imagensUrls.length > 0 && (
                    <div className="mt-2 grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {form.imagensUrls.map((u, i) => (
                        <div key={i} className="relative group">
                          <img loading="lazy" src={u} alt="imagem" className="h-16 w-16 object-cover rounded border" />
                          <button
                            aria-label="Excluir imagem"
                            className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 border border-border rounded-full p-1"
                            onClick={async () => {
                              if (!confirm("Deseja excluir esta imagem?")) return
                              if (!supabase) return
                              const pathPrefix = `/storage/v1/object/public/${bucket}/`
                              const idx = u.indexOf(pathPrefix)
                              let objPath = ""
                              if (idx >= 0) objPath = u.substring(idx + pathPrefix.length)
                              if (objPath) {
                                await supabase.storage.from(bucket).remove([objPath])
                              }
                              const next = (form.imagensUrls || []).filter((x) => x !== u)
                              setForm((f) => ({ ...f, imagensUrls: next }))
                              if (form.id) {
                                await supabase
                                  .from("produtos")
                                  .update({ imagens: next.length ? next : null })
                                  .eq("id", form.id)
                              }
                              alert("Imagem removida")
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-destructive"><path fill="currentColor" d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9z"/></svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="h-16 w-16 border border-dashed border-border rounded flex items-center justify-center hover:border-primary"
                        onClick={() => addInputRef.current?.click()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-muted-foreground"><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
                      </button>
                    </div>
                  )}
                  {!form.imagensUrls || form.imagensUrls.length === 0 ? (
                    <div className="mt-2">
                      <button
                        type="button"
                        className="px-3 py-2 border border-dashed border-border rounded text-sm hover:border-primary"
                        onClick={() => addInputRef.current?.click()}
                      >
                        Adicionar imagens
                      </button>
                    </div>
                  ) : null}
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
            {/* Gestão de atributos */}
            <div className="lg:col-span-3 grid gap-8">
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Cores</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const formEl = e.target as HTMLFormElement
                    const nome = (formEl.elements.namedItem("cor_nome") as HTMLInputElement).value
                    const hex = (formEl.elements.namedItem("cor_hex") as HTMLInputElement).value
                    const ativo = (formEl.elements.namedItem("cor_ativo") as HTMLInputElement).checked
                    if (!supabase) return
                    await supabase.from("cores").insert({ nome, hex, ativo })
                    const { data: cores } = await supabase.from("cores").select("*").order("nome")
                    setColors(cores || [])
                    formEl.reset()
                  }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
                >
                  <input name="cor_nome" placeholder="Nome" className="px-3 py-2 border rounded" required />
                  <input name="cor_hex" type="color" className="px-3 py-2 border rounded" defaultValue="#000000" />
                  <label className="flex items-center gap-2 text-sm"><input name="cor_ativo" type="checkbox" defaultChecked /> Ativa</label>
                  <Button type="submit" className="bg-primary">Adicionar Cor</Button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 border rounded px-2 py-1 text-xs">
                      <span className="inline-block h-3 w-3 rounded" style={{ backgroundColor: c.hex }} />
                      {c.nome}
                      <button
                        className="ml-2 text-muted-foreground underline"
                        onClick={async () => {
                          await supabase.from("cores").update({ ativo: !c.ativo }).eq("id", c.id)
                          const { data: cores } = await supabase.from("cores").select("*").order("nome")
                          setColors(cores || [])
                        }}
                      >
                        {c.ativo ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Tamanhos</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const formEl = e.target as HTMLFormElement
                    const codigo = (formEl.elements.namedItem("tam_codigo") as HTMLInputElement).value
                    const descricao = (formEl.elements.namedItem("tam_desc") as HTMLInputElement).value
                    const ativo = (formEl.elements.namedItem("tam_ativo") as HTMLInputElement).checked
                    if (!supabase) return
                    await supabase.from("tamanhos").insert({ codigo, descricao, ativo })
                    const { data: tamanhos } = await supabase.from("tamanhos").select("*").order("descricao")
                    setSizes(tamanhos || [])
                    formEl.reset()
                  }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
                >
                  <input name="tam_desc" placeholder="Descrição" className="px-3 py-2 border rounded" required />
                  <input name="tam_codigo" placeholder="Código" className="px-3 py-2 border rounded" required />
                  <label className="flex items-center gap-2 text-sm"><input name="tam_ativo" type="checkbox" defaultChecked /> Ativo</label>
                  <Button type="submit" className="bg-primary">Adicionar Tamanho</Button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <div key={s.id} className="flex items-center gap-2 border rounded px-2 py-1 text-xs">
                      {s.codigo} - {s.descricao}
                      <button
                        className="ml-2 text-muted-foreground underline"
                        onClick={async () => {
                          await supabase.from("tamanhos").update({ ativo: !s.ativo }).eq("id", s.id)
                          const { data: tamanhos } = await supabase.from("tamanhos").select("*").order("descricao")
                          setSizes(tamanhos || [])
                        }}
                      >
                        {s.ativo ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
