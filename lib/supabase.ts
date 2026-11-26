import { createClient } from "@supabase/supabase-js"

// Client para uso em componentes client/server.
// As variáveis devem estar definidas em .env com prefixo NEXT_PUBLIC_ para uso no cliente.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Evita erro de avaliação do módulo quando variáveis não estão definidas.
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface ProdutoDb {
  id: number
  nome: string
  descricao: string
  preco: number | string
  imagem_url: string
  imagens?: string[] | null
  video_url?: string | null
  checkout_url?: string | null
  disponibilidade?: string | null
  destaque?: boolean | null
  criado_em?: string | null
  payment_type?: "cod" | "delivery" | "prepaid"
}

// Mapeia o registro do banco para o tipo Product usado no app
function parsePrice(value: number | string) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0

  const normalized = value.trim().replace(/[^\d,.-]/g, "")
  const commaIndex = normalized.lastIndexOf(",")
  const dotIndex = normalized.lastIndexOf(".")
  const decimalNormalized = commaIndex > dotIndex
    ? normalized.replace(/\./g, "").replace(",", ".")
    : normalized.replace(/,/g, "")
  const parsed = Number(decimalNormalized)

  return Number.isFinite(parsed) ? parsed : 0
}

export function mapDbToProduct(row: ProdutoDb) {
  const estoque = parseInt(String(row.disponibilidade || "0").replace(/\D/g, "")) || 0
  return {
    id: String(row.id),
    name: row.nome,
    description: row.descricao,
    price: parsePrice(row.preco),
    image: row.imagem_url,
    images: row.imagens || undefined,
    video: row.video_url || undefined,
    checkoutUrl: row.checkout_url || undefined,
    category: "geral",
    paymentType: (row.payment_type || "cod") as "cod" | "delivery" | "prepaid",
    stock: estoque,
    rating: 4.7,
    reviews: 18,
    featured: !!row.destaque,
  }
}
