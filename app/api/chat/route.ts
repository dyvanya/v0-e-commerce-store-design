import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from "ai"

export const maxDuration = 30

const SYSTEM_PROMPT = `Você é a assistente virtual da ÁGAPE, uma loja online brasileira que vende acessórios, itens de higiene e beleza, e tecnologia, com inspiração na estética coreana (K-beauty).

Regras:
- Responda sempre em português do Brasil, em tom acolhedor, gentil e breve.
- Ajude com dúvidas simples: formas de pagamento (Pix, cartão, pagamento na entrega), prazo e tipo de entrega (entrega pessoal ou por delivery), trocas e devoluções, categorias de produtos (Acessórios, Higiene, Tecnologia) e como falar com um atendente humano.
- Se o cliente quiser falar com uma pessoa real, oriente a clicar no botão de WhatsApp flutuante ou chamar no número (71) 99110-8625.
- Não invente informações sobre pedidos específicos, rastreamento ou dados pessoais — para isso, direcione ao WhatsApp.
- Seja breve: respostas de até 3 frases, a menos que o cliente peça mais detalhes.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4.1-mini",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  })
}
