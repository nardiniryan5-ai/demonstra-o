"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users,
  ListChecks,
  TrendingUp,
  Euro,
  CheckCircle2,
  Timer,
  Star,
  Circle,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { DesktopShell, type NavItem } from "@/components/shared/desktop-shell"
import { StatusBadge } from "@/components/shared/status-badge"
import { PlateBadge } from "@/components/shared/plate-badge"
import { servicos, equipe, kpis, serviePorDia, eur } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const nav: NavItem[] = [
  { id: "visao", label: "Visão geral", icon: LayoutDashboard },
  { id: "servicos", label: "Serviços", icon: ListChecks },
  { id: "equipe", label: "Equipe", icon: Users },
]

const kpiCards = [
  { label: "Serviços no mês", value: String(kpis.totalMes), icon: ListChecks, delta: "+18%" },
  { label: "Ticket médio", value: eur(kpis.ticketMedio), icon: Euro, delta: "+4%" },
  { label: "Taxa de aprovação", value: `${kpis.taxaAprovacao}%`, icon: CheckCircle2, delta: "+2pp" },
  { label: "Tempo médio", value: `${kpis.tempoMedioMin} min`, icon: Timer, delta: "-6 min" },
]

export function OverviewApp({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState("visao")

  return (
    <DesktopShell
      brand="DentFlow"
      persona="Visão Geral"
      personaIcon={LayoutDashboard}
      nav={nav}
      active={active}
      onNavigate={setActive}
      onExit={onExit}
      title="Visão geral da operação"
      subtitle="Desempenho consolidado de seguradoras e clientes diretos"
      notifications={3}
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((k) => {
            const Icon = k.icon
            const positive = !k.delta.startsWith("-")
            return (
              <div key={k.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      positive ? "bg-success/10 text-success" : "bg-primary/10 text-primary",
                    )}
                  >
                    <TrendingUp className="size-3" />
                    {k.delta}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-foreground">{k.value}</p>
                <p className="text-sm text-muted-foreground">{k.label}</p>
              </div>
            )
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Serviços e receita por dia</h2>
                <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
              </div>
              <span className="text-lg font-bold text-primary">{eur(kpis.receitaComissao)}</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={serviePorDia} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="fillReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="dia" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                  formatter={(v: any, name: any) =>
                    name === "receita" ? [eur(Number(v)), "Receita"] : [Number(v), "Serviços"]
                  }
                />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#fillReceita)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Volume de serviços</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={serviePorDia} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="dia" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--accent)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                  formatter={(v: any) => [Number(v), "Serviços"]}
                />
                <Bar dataKey="servicos" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-card lg:col-span-2">
            <div className="border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold text-foreground">Serviços recentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Placa</th>
                    <th className="px-5 py-3 font-medium">Origem</th>
                    <th className="px-5 py-3 font-medium">Funileiro</th>
                    <th className="px-5 py-3 font-medium">Valor</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.slice(0, 6).map((s) => (
                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="px-5 py-3">
                        <PlateBadge plate={s.placa} />
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {s.origem === "seguradora" ? s.seguradora : "Cliente direto"}
                      </td>
                      <td className="px-5 py-3 text-foreground">{s.tecnico ?? "—"}</td>
                      <td className="px-5 py-3 font-medium text-foreground">
                        {eur(s.valorFinal ?? s.valorSeguradora ?? s.valorIA)}
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={s.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Equipe</h2>
            <div className="space-y-3">
              {equipe.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="relative flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
                    {t.nome
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-card",
                        t.online ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      <Circle className={cn("size-3", t.online ? "fill-success" : "fill-muted-foreground")} />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{t.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.funcao} · {t.cidade}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center gap-1 text-xs font-medium text-foreground">
                      <Star className="size-3 fill-warning text-warning" />
                      {t.avaliacao.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.servicosHoje} hoje</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DesktopShell>
  )
}
