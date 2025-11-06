# Loja Online - E-commerce Elegante

Um e-commerce moderno e acessível para vender produtos com cash on delivery e entrega pessoal.

## Recursos

- **Design Elegante**: Cores suaves (tons de rosa, bege e neutros) acessíveis para todas as idades
- **Catálogo de Produtos**: Com imagens, vídeos, avaliações e filtros
- **Carrinho de Compras**: Gerenciamento completo com estado global (Zustand)
- **Checkout**: Formulário integrado com WhatsApp
- **Dois Modelos de Pagamento**:
  - Cash on Delivery (Pagamento na Entrega)
  - Entrega Pessoal
- **Integração WhatsApp**: Confirmação de pedidos via WhatsApp
- **Responsivo**: Totalmente funcional em mobile, tablet e desktop

## Estrutura

\`\`\`
app/
  ├── page.tsx                    # Página inicial
  ├── produtos/page.tsx           # Catálogo com filtros
  ├── produto/[id]/page.tsx       # Detalhes do produto
  ├── carrinho/page.tsx           # Carrinho de compras
  ├── layout.tsx                  # Layout global
  └── globals.css                 # Styles e design system

components/
  ├── header.tsx                  # Navegação
  ├── footer.tsx                  # Rodapé
  └── product-card.tsx            # Card do produto

lib/
  ├── types.ts                    # Tipos TypeScript
  └── products-data.ts            # Dados dos produtos

hooks/
  └── use-cart.ts                 # Hook para gerenciar carrinho
\`\`\`

## Como Adicionar Seus Produtos

1. Abra `lib/products-data.ts`
2. Adicione/edite os produtos com:
   - `name`: Nome do produto
   - `description`: Descrição
   - `price`: Preço
   - `image`: URL da imagem (você pode fazer upload para `/public`)
   - `video`: URL do vídeo (opcional)
   - `category`: 'feminino' ou 'masculino' (ou adicione novas categorias)
   - `paymentType`: 'cod' (entrega) ou 'delivery' (entrega pessoal)
   - `stock`: Quantidade em estoque
   - `rating`: Nota (0-5)
   - `reviews`: Número de avaliações

## Como Adicionar Seus Dados

1. **Número de WhatsApp**: 
   - Procure por `5511999999999` em todo o código
   - Substitua pelo seu número no formato internacional (ex: `554733123456`)

2. **Informações da Loja**:
   - Edite `components/footer.tsx` para adicionar telefone, email e redes sociais
   - Edite `components/header.tsx` para personalizar o logo

3. **Imagens e Vídeos**:
   - Coloque arquivos em `/public`
   - Adicione URLs em `lib/products-data.ts`

## Rodando Localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Deploy

1. **Vercel** (recomendado):
   \`\`\`bash
   npm run build
   vercel deploy
   \`\`\`

2. **GitHub**:
   - Faça push do código para GitHub
   - Conecte com Vercel para deploy automático

## Personalizações

### Cores
Edite `app/globals.css` para mudar a paleta de cores do tema.

### Fontes
Edite `app/layout.tsx` para mudar as fontes Google.

### Estrutura
Todos os componentes usam Tailwind CSS e shadcn/ui para fácil customização.

## Notas Importantes

- O carrinho usa Zustand para estado global (client-side)
- Os pedidos são enviados via WhatsApp
- Não há integração de pagamento online (apenas COD)
- Você recebe notificação via WhatsApp de cada pedido

## Suporte

Para dúvidas sobre customização, consulte a documentação:
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
