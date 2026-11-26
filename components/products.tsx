"use client"
import { useState } from "react"
import ProductCard from "./product-card"

const PRODUCTS = [
  {
    id: "1",
    name: "Dispensador de Sabonete Emoji",
    category: "Acessórios",
    price: 34.9,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11134201-824jf-meka1rtdvdom3c-OOmXAXVa43TSRUbhsXtvKiX0H5NfAw.webp",
    additionalImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11134201-824ho-meka1wsuqnlw7d-ndrW2HOLUmaOQL6lPNLPn3sXxyhXA3.webp",
      {
        type: "video",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110105-6kfkp-m3y9ft2dpa9k6d.16000081734570052-ReitZS8TaBWTzkX2nq18Fh5xDhZsuG.mp4",
      },
      {
        type: "video",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11110105-6kfkp-makann1hu7indc.16000081748979293-kMCBmW8mIMPwN3FqA4tw7exv9hxpfE.mp4",
      },
    ],
    description: "Dispensador de sabonete fofinho com design emoji em cores pastel",
    delivery: "personal",
  },
  {
    id: "2",
    name: "Desodorante Hi Cool Crystal Natural",
    category: "Higiene",
    price: 45.9,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11134201-7renv-m8vp7b0u2fyxd3-k9seRjvJKNxhvM2Yssum51Wm6244ts.webp",
    additionalImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11134201-7reph-m8vp7e7zch4w6b-Ug1dn4OdkCEYa4OGy4aBrXOS5n2v6P.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11134201-7repx-m8vp7cmtscgl1c-ynfQ0DaXgLVD4I7EGVoTaEZWUIsfLd.webp",
      {
        type: "video",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11110106-6v8go-mfwb80zzdfrd18.16000081760602863-RUZ9u1BFN6OjsymagRIVGm9vnJI0At.mp4",
      },
    ],
    description: "Desodorante cristal 100% natural e hipoalergênico, proteção 24h",
    delivery: "personal",
  },
  {
    id: "3",
    name: "Selfie Stick R1-White com Tripé",
    category: "Tecnologia",
    price: 89.9,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11134207-7r98o-macpq7by0xancf-lecRo2lib0Bncu4ETsTXvUI0fXXkQk.webp",
    additionalImages: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/br-11134207-7r98o-macpq7by2bv340-n0l16EniXtql3uBhc2GTXiG0xR4x4Y.webp",
      {
        type: "video",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sg-11110106-6v8io-meka2bswyrk629.16000081757695258-FPHrBmzgNbRaab2XTePmYbIHNTS6NE.mp4",
      },
    ],
    description: "Selfie stick com tripé de suporte, rotação 360° e controle Bluetooth",
    delivery: "personal",
  },
  {
    id: "4",
    name: "Creme para olhos com retinol hidratante e firmador Celimax",
    category: "Higiene",
    price: 125.91,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1785533074776-MASCARA%20FACIAL%20ELETRICA.webp",
    additionalImages: [],
    description: "Creme para a área dos olhos com foco em hidratação e firmeza, com textura leve e eficaz",
    delivery: "delivery",
  },
  {
    id: "5",
    name: "Kit Saúde em Casa: Oxímetro Digital de Dedo + Monitor Digital de Pressão Arterial de Braço",
    category: "Tecnologia",
    price: 161.24,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1785372477339-Gemini_Generated_Image_edzfl1edzfl1edzf.png",
    additionalImages: [],
    description: "Kit saúde completo com oxímetro digital de dedo e monitor de pressão arterial de braço",
    delivery: "delivery",
  },
  {
    id: "6",
    name: "Oxímetro Digital Portátil de Pulso para Dedo | AJ-F09",
    category: "Tecnologia",
    price: 69.84,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1785371060352-0111%20F-kit-saude-medidor-pressao-braco-digital-e-oximetro.webp",
    additionalImages: [],
    description: "Oxímetro digital portátil para monitoramento de oxigênio e frequência cardíaca",
    delivery: "personal",
  },
  {
    id: "7",
    name: "Escova De Dentes De Viagem, Dispensador De Pasta De Dente Dobrável 2 Em 1",
    category: "Higiene",
    price: 20.97,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1769015607344-ESCOVA%20DENTE%20-%20-.webp",
    additionalImages: [],
    description: "Escova de dente portátil compacta, moderna e funcional com dispensador de pasta integrado",
    delivery: "personal",
  },
  {
    id: "8",
    name: "Conjunto de Brinco e Colar Coração de Dorama, De Aço Inoxidável",
    category: "Acessórios",
    price: 40.97,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1768951097578-CONJUNTO%20COREAANO.webp",
    additionalImages: [],
    description: "Conjunto inspirado nos doramas coreanos com o gesto de amor mais famoso, em aço inoxidável",
    delivery: "personal",
  },
  {
    id: "9",
    name: "CORAÇÃO DORAMA",
    category: "Acessórios",
    price: 40.97,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1768950310843-WhatsApp_Image_2026-01-20_at_18.03.41.jpg",
    additionalImages: [],
    description: "Colar que representa o gesto de coração coreano, famoso nos doramas",
    delivery: "delivery",
  },
  {
    id: "10",
    name: "COLAR DORAMA BELEZA VERDADEIRA",
    category: "Acessórios",
    price: 40.97,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1768948623727-WhatsApp_Image_2026-01-20_at_18.03.41%20-.jpg",
    additionalImages: [],
    description: "Inspirado na famosa novela coreana, este colar traz elegância e charme ao visual",
    delivery: "delivery",
  },
  {
    id: "11",
    name: "Mini Escova Modeladora e Alisadora Portátil 2 em 1 Bivolt",
    category: "Acessórios",
    price: 50.97,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1768946261296-chapinha%20escova%202.jpg",
    additionalImages: [],
    description: "Mini escova modeladora portátil que alisa, modela ou cacheteia seus cabelos com facilidade",
    delivery: "personal",
  },
  {
    id: "12",
    name: "Progressiva Havana Pro",
    category: "Higiene",
    price: 150.0,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1765219788086-Gemini_Generated_Image_5gmn1g5gmn1g5gmn.png",
    additionalImages: [],
    description: "O segredo do liso perfeito e espelhado sem formol. Cansada de cabelo armado?",
    delivery: "delivery",
  },
  {
    id: "13",
    name: "Chapinha Prancha De Cabelo Portátil, Com Case Transporte Bivolt",
    category: "Acessórios",
    price: 30.0,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762605287579-prancha%201.webp",
    additionalImages: [],
    description: "Chapinha prancha portátil bivolt com case de transporte para usar em qualquer lugar",
    delivery: "personal",
  },
  {
    id: "14",
    name: "Capa de silicone para carregador com enrolamento de cabos iPhone",
    category: "Tecnologia",
    price: 33.9,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762561727930-Protetor%20de%20carregador%201%20azul.webp",
    additionalImages: [],
    description: "Capa de silicone protetora para carregador com enrolador de cabos para iPhone",
    delivery: "delivery",
  },
  {
    id: "15",
    name: "Hashi Coreano e Japonês, Aço Inox",
    category: "Acessórios",
    price: 25.0,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762559484323-Hashi%20colorido%20metalico.webp",
    additionalImages: [],
    description: "Hashis coreano e japonês em aço inoxidável, elegantes e duráveis",
    delivery: "delivery",
  },
  {
    id: "16",
    name: "Escova Alisadora 3 em 1",
    category: "Acessórios",
    price: 119.0,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762558054760-anion-hair-escova-alisadora-3-em-1-alisa-seca-e-hidrata-com-luzes-de-ions-bivolt-4.jpg",
    additionalImages: [],
    description: "Escova alisadora 3 em 1: liso perfeito, rápido e sem esforço para sua rotina de beleza",
    delivery: "delivery",
  },
  {
    id: "17",
    name: "Body Shaper",
    category: "Acessórios",
    price: 119.99,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762557390703-body-shaper-canelado-50-off-843008.webp",
    additionalImages: [],
    description: "Body Shaper Premium: escultura completa da sua confiança com modelagem e conforto",
    delivery: "delivery",
  },
  {
    id: "18",
    name: "Cinta Colete Modeladora",
    category: "Acessórios",
    price: 129.9,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762555860014-cinta%20colete.jpg",
    additionalImages: [],
    description: "Cinta colete modeladora premium para silhueta perfeita e postura correta",
    delivery: "delivery",
  },
  {
    id: "19",
    name: "Desodorante Cristal Natural Pedra",
    category: "Higiene",
    price: 52.9,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762554422489-sg-11134201-7renv-m8vp7b0u2fyxd3.webp",
    additionalImages: [],
    description: "Desodorante Pedra Cristal 100% natural, sem alumínio, 60g — proteção natural eficaz",
    delivery: "delivery",
  },
  {
    id: "20",
    name: "Óculos De Sol Retro, Mulher Olho De Gato Vintage Moderno",
    category: "Acessórios",
    price: 49.9,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762521726249-Oculos%20transparente%20Cristal%20azul.webp",
    additionalImages: [],
    description: "Óculos de sol vintage moderno estilo olho de gato, tendência para mulheres",
    delivery: "delivery",
  },
  {
    id: "21",
    name: "Hashi, colher, garfo e estojo para viagem",
    category: "Acessórios",
    price: 34.9,
    image: "https://bzdfsqovujatnydeecpy.supabase.co/storage/v1/object/public/produtos/1762482792742-Conjunto%20talher%20Hashi%20%2B%20Estojo.webp",
    additionalImages: [],
    description: "Belíssimo jogo de 3 peças de talheres + estojo de viagem. Talheres reutilizáveis e elegantes",
    delivery: "delivery",
  },
]

export default function Products({ onAddToCart }: { onAddToCart: (product: any) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [favorites, setFavorites] = useState<string[]>([])

  const categories = ["Todos", ...new Set(PRODUCTS.map((p) => p.category))]

  const filteredProducts =
    selectedCategory === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nossos Produtos</h2>
          <p className="text-muted-foreground">Seleção cuidada de itens de qualidade para você</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Em breve mais produtos!</p>
          </div>
        )}
      </div>
    </section>
  )
}
