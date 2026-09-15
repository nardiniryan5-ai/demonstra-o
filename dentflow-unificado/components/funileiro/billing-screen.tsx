"use client"

import { Clock, ShieldAlert, CircleCheckBig, Download, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenHeader } from "@/components/funileiro/screen-header"
import { receivables, formatBRL, type Receivable } from "@/lib/mock-data-funileiro"

const statusStyles: Record<Receivable["status"], string> = {
  Aguardando: "bg-warning/15 text-warning",
  Glosado: "bg-destructive/10 text-destructive",
  Liberado: "bg-success/15 text-success",
}

function sumBy(status: Receivable["status"]) {
  const items = receivables.filter((r) => r.status === status)
  return { total: items.reduce((acc, r) => acc + r.value, 0), count: items.length }
}

export function BillingScreen() {
  const waiting = sumBy("Aguardando")
  const rejected = sumBy("Glosado")
  const released = sumBy("Liberado")

  return (
    <div className="mx-auto max-w-md pb-6">
      <ScreenHeader title="Painel de Recebíveis" subtitle="Setembro / 2026" />

      <div className="space-y-5 px-5 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Resumo do mês</h2>
          <Button variant="outline" size="sm" className="text-xs">
            <Download className="size-3.5" aria-hidden="true" />
            Exportar Lote
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <SummaryCard
            icon={Clock}
            label="Aguardando"
            value={waiting.total}
            count={waiting.count}
            tone="warning"
          />
          <SummaryCard
            icon={ShieldAlert}
            label="Glosados"
            value={rejected.total}
            count={rejected.count}
            tone="destructive"
          />
          <SummaryCard
            icon={CircleCheckBig}
            label="Liberados"
            value={released.total}
            count={released.count}
            tone="success"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[1fr_auto] items-center border-b border-border bg-secondary px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Ordem de serviço</span>
            <span>Status</span>
          </div>
          <ul className="divide-y divide-border">
            {receivables.map((r) => (
              <li key={r.id} className="grid grid-cols-[1fr_auto] items-center gap-2 px-4 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-foreground px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-background">
                      {r.plate}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{formatBRL(r.value)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {r.insurer} · {r.id} · {r.date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[r.status]}`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <FileSpreadsheet className="size-4" aria-hidden="true" />
            Excel
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="size-4" aria-hidden="true" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  count,
  tone,
}: {
  icon: typeof Clock
  label: string
  value: number
  count: number
  tone: "warning" | "destructive" | "success"
}) {
  const toneStyles = {
    warning: "text-warning bg-warning/15",
    destructive: "text-destructive bg-destructive/10",
    success: "text-success bg-success/15",
  }[tone]

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
      <span className={`inline-flex size-7 items-center justify-center rounded-lg ${toneStyles}`}>
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <p className="mt-2 text-sm font-bold leading-tight text-foreground">
        {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
      </p>
      <p className="text-[11px] text-muted-foreground">
        {label} · {count}
      </p>
    </div>
  )
}
