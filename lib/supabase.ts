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
  preco: number
  imagem_url: string
  disponibilidade?: string | null
  criado_em?: string | null
}

// Mapeia o registro do banco para o tipo Product usado no app
export function mapDbToProduct(row: ProdutoDb) {
  const estoque = parseInt(String(row.disponibilidade || "0").replace(/\D/g, "")) || 0
  return {
    id: String(row.id),
    name: row.nome,
    description: row.descricao,
    price: Number(row.preco),
    image: row.imagem_url,
    category: "geral",
    paymentType: "cod" as const,
    stock: estoque,
    rating: 4.7,
    reviews: 18,
  }
}