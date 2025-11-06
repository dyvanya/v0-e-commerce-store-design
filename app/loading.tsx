export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-border border-t-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}
