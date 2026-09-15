import { cn } from "@/lib/utils"
import { statusLabels, type ServiceStatus } from "@/lib/mock-data"

const styles: Record<ServiceStatus, string> = {
  aguardando_avaliador: "bg-warning/10 text-warning-foreground ring-1 ring-warning/30",
  aprovado: "bg-success/10 text-success ring-1 ring-success/20",
  a_caminho: "bg-primary/10 text-primary ring-1 ring-primary/20",
  em_execucao: "bg-primary/10 text-primary ring-1 ring-primary/20",
  concluido: "bg-success/10 text-success ring-1 ring-success/20",
  glosado: "bg-destructive/10 text-destructive ring-1 ring-destructive/20",
  recusado: "bg-muted text-muted-foreground ring-1 ring-border",
}

export function StatusBadge({ status, className }: { status: ServiceStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
      {statusLabels[status]}
    </span>
  )
}
