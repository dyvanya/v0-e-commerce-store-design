import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>
        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90">Voltar ao Início</Button>
        </Link>
      </div>
    </div>
  )
}
