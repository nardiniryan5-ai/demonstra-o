"use client"

import { useState } from "react"
import Image from "next/image"
import {
  FileText,
  LayoutList,
  BarChart3,
  Download,
  FileCheck2,
  TrendingDown,
  Clock,
  CheckCircle2,
  Car,
  MapPin,
} from "lucide-react"
import { DesktopShell, type NavItem } from "@/components/shared/desktop-shell"
import { StatusBadge } from "@/components/shared/status-badge"
import { PlateBadge } from "@/components/shared/plate-badge"
import { servicos, eur, statusLabels, type Servico } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const nav: NavItem[] = [
  { id: "chamados", label: "Chamados", icon: LayoutList },
  { id: "laudos", label: "Laudos", icon: FileText },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
]

const SEGURADORA = "AXA Seguros"
const meus = servicos.filter((s) => s.seguradora === SEGURADORA || s.origem === "seguradora")

const stats = [
  { label: "Chamados no mês", value: "128", icon: FileCheck2, hint: "+12% vs. mês anterior" },
  { label: "Custo médio", value: eur(486), icon: BarChart3, hint: "abaixo da tabela FIPE" },
  { label: "Economia estimada", value: eur(31400), icon: TrendingDown, hint: "vs. reparo tradicional", accent: true },
  { label: "Tempo médio", value: "1,4 dia", icon: Clock, hint: "do pedido à conclusão" },
]

const timeline = [
  { label: "Chamado aberto pelo segurado", time: "08:05", done: true },
  { label: "Orçamento gerado pela IA", time: "08:06", done: true },
  { label: "Avaliador aprovou o valor", time: "08:22", done: true },
  { label: "Funileiro a caminho", time: "09:10", done: true },
  { label: "Reparo concluído", time: "10:45", done: false },
]

export function SeguradoraApp({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState("chamados")
  const [selected, setSelected] = useState<Servico | null>(null)

  return (
    <DesktopShell
      brand="DentFlow"
      persona="AXA Seguros"
      personaIcon={FileText}
      nav={nav}
      active={active}
      onNavigate={setActive}
      onExit={onExit}
      title="Painel da seguradora"
      subtitle="Acompanhe os chamados de martelinho de ouro dos seus segurados"
      notifications={2}
      headerActions={
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Download className="size-4" />
          Exportar relatório
        </button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className={cn(
                  "rounded-2xl border p-5",
                  s.accent ? "border-transparent bg-primary text-primary-foreground" : "border-border bg-card",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", s.accent ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {s.label}
                  </span>
                  <Icon className={cn("size-4", s.accent ? "text-primary-foreground/80" : "text-primary")} />
                </div>
                <p className="mt-2 text-2xl font-bold">{s.value}</p>
                <p className={cn("mt-0.5 text-xs", s.accent ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {s.hint}
                </p>
              </div>
            )
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Chamados recentes</h2>
            <span className="text-xs text-muted-foreground">{meus.length} registros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Chamado</th>
                  <th className="px-5 py-3 font-medium">Veículo</th>
                  <th className="px-5 py-3 font-medium">Segurado</th>
                  <th className="px-5 py-3 font-medium">Valor</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {meus.map((s) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <PlateBadge plate={s.placa} />
                        <span className="text-xs text-muted-foreground">{s.id}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-foreground">{s.veiculo}</td>
                    <td className="px-5 py-3 text-muted-foreground">{s.cliente}</td>
                    <td className="px-5 py-3 font-medium text-foreground">
                      {eur(s.valorFinal ?? s.valorSeguradora ?? s.valorIA)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setSelected(s)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-accent"
                      >
                        Ver laudo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && <LaudoDrawer servico={selected} onClose={() => setSelected(null)} />}
    </DesktopShell>
  )
}

function LaudoDrawer({ servico, onClose }: { servico: Servico; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <button className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} aria-label="Fechar" />
      <div className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <PlateBadge plate={servico.placa} />
              <span className="text-sm text-muted-foreground">{servico.id}</span>
            </div>
            <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Car className="size-5 text-muted-foreground" />
              {servico.veiculo}
            </h2>
          </div>
          <StatusBadge status={servico.status} />
        </div>

        <div className="flex-1 space-y-6 px-6 py-5">
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Antes e depois</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: "/car-dent-before.png", label: "Antes" },
                { src: "/car-dent-after.png", label: "Depois" },
              ].map((img) => (
                <div key={img.label} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                  <Image src={img.src || "/placeholder.svg"} alt={img.label} fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Segurado</p>
              <p className="text-sm font-medium text-foreground">{servico.cliente}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" /> {servico.cidade}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Valor aprovado</p>
              <p className="text-sm font-medium text-foreground">
                {eur(servico.valorFinal ?? servico.valorSeguradora ?? servico.valorIA)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">IA estimou {eur(servico.valorIA)}</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-foreground">Linha do tempo</p>
            <ol className="relative space-y-4 border-l border-border pl-5">
              {timeline.map((t) => (
                <li key={t.label} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[27px] flex size-5 items-center justify-center rounded-full ring-4 ring-background",
                      t.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {t.done && <CheckCircle2 className="size-3.5" />}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm", t.done ? "text-foreground" : "text-muted-foreground")}>
                      {t.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{t.time}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Download className="size-4" />
            Baixar laudo PDF — {statusLabels[servico.status]}
          </button>
        </div>
      </div>
    </div>
  )
}
