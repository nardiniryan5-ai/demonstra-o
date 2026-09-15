"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ClipboardCheck,
  History,
  Settings,
  Check,
  X,
  Sparkles,
  Clock,
  MapPin,
  Car,
  Sliders,
  ShieldCheck,
  User,
} from "lucide-react"
import { DesktopShell, type NavItem } from "@/components/shared/desktop-shell"
import { StatusBadge } from "@/components/shared/status-badge"
import { PlateBadge } from "@/components/shared/plate-badge"
import { servicos, eur, type Servico } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const nav: NavItem[] = [
  { id: "fila", label: "Fila de avaliação", icon: ClipboardCheck },
  { id: "historico", label: "Histórico", icon: History },
  { id: "config", label: "Configurações", icon: Settings },
]

const pendentes = servicos.filter((s) => s.status === "aguardando_avaliador")

export function AvaliadorApp({ onExit }: { onExit: () => void }) {
  const [active, setActive] = useState("fila")
  const [selectedId, setSelectedId] = useState(pendentes[0]?.id ?? null)
  const [decided, setDecided] = useState<Record<string, "aprovado" | "recusado" | "ajustado">>({})

  const selected = servicos.find((s) => s.id === selectedId) ?? null

  return (
    <DesktopShell
      brand="DentFlow"
      persona="Avaliador"
      personaIcon={ClipboardCheck}
      nav={nav}
      active={active}
      onNavigate={setActive}
      onExit={onExit}
      title="Fila de avaliação"
      subtitle="Analise os danos e decida a aprovação de cada chamado"
      notifications={pendentes.length}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(320px,380px)_1fr]">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Aguardando você ({pendentes.length})</h2>
            <span className="text-xs text-muted-foreground">SLA 20 min</span>
          </div>
          {pendentes.map((s) => {
            const isSel = s.id === selectedId
            const late = s.esperaMin > s.slaMin
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "w-full rounded-2xl border bg-card p-4 text-left transition-all",
                  isSel ? "border-primary ring-1 ring-primary/30" : "border-border hover:border-primary/40",
                )}
              >
                <div className="flex items-center justify-between">
                  <PlateBadge plate={s.placa} />
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      late ? "text-destructive" : "text-muted-foreground",
                    )}
                  >
                    <Clock className="size-3" />
                    {s.esperaMin} min
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{s.veiculo}</p>
                <p className="text-xs text-muted-foreground">
                  {s.cliente} · {s.cidade}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    {s.origem === "seguradora" ? (
                      <>
                        <ShieldCheck className="size-3.5 text-primary" /> {s.seguradora}
                      </>
                    ) : (
                      <>
                        <User className="size-3.5 text-primary" /> Cliente direto
                      </>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{eur(s.valorIA)}</span>
                </div>
                {decided[s.id] && (
                  <span
                    className={cn(
                      "mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                      decided[s.id] === "recusado"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-success/10 text-success",
                    )}
                  >
                    {decided[s.id] === "aprovado" ? "Aprovado" : decided[s.id] === "ajustado" ? "Valor ajustado" : "Recusado"}
                  </span>
                )}
              </button>
            )
          })}
        </section>

        {selected ? (
          <DetailPanel
            key={selected.id}
            servico={selected}
            decision={decided[selected.id]}
            onDecide={(d) => setDecided((prev) => ({ ...prev, [selected.id]: d }))}
          />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
            Selecione um chamado
          </div>
        )}
      </div>
    </DesktopShell>
  )
}

const detections = [
  { label: "Amassado profundo", area: "Porta diant. esq.", conf: 96, top: "38%", left: "30%" },
  { label: "Risco de tinta", area: "Paralama tras.", conf: 88, top: "60%", left: "62%" },
  { label: "Amassado leve", area: "Coluna B", conf: 79, top: "28%", left: "70%" },
]

function DetailPanel({
  servico,
  decision,
  onDecide,
}: {
  servico: Servico
  decision?: "aprovado" | "recusado" | "ajustado"
  onDecide: (d: "aprovado" | "recusado" | "ajustado") => void
}) {
  const [valor, setValor] = useState(servico.valorIA)

  return (
    <section className="space-y-5 rounded-2xl border border-border bg-card p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <PlateBadge plate={servico.placa} />
            <span className="text-sm text-muted-foreground">{servico.id}</span>
          </div>
          <h2 className="mt-2 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Car className="size-5 text-muted-foreground" />
            {servico.veiculo}
          </h2>
          <p className="mt-0.5 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{servico.cliente}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {servico.cidade}
            </span>
          </p>
        </div>
        <StatusBadge status={servico.status} />
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Análise visual da IA</p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image src="/car-dent-before.png" alt="Dano do veículo" fill className="object-cover" />
            {detections.map((d, i) => (
              <div
                key={i}
                className="absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-primary/20 text-xs font-semibold text-primary backdrop-blur-sm"
                style={{ top: d.top, left: d.left }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {detections.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-foreground">{d.label}</span>
                <span className="text-muted-foreground">· {d.area}</span>
                <span className="ml-auto text-xs font-medium text-primary">{d.conf}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-accent/50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" /> Estimativa da IA
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">{eur(servico.valorIA)}</p>
            {servico.origem === "seguradora" && servico.valorSeguradora !== null && (
              <p className="mt-1 text-sm text-muted-foreground">
                Teto da seguradora:{" "}
                <span className="font-medium text-foreground">{eur(servico.valorSeguradora)}</span>
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border p-4">
            <label className="flex items-center justify-between text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <Sliders className="size-4 text-muted-foreground" />
                Ajustar valor aprovado
              </span>
              <span className="text-primary">{eur(valor)}</span>
            </label>
            <input
              type="range"
              min={Math.round(servico.valorIA * 0.5)}
              max={Math.round(servico.valorIA * 1.3)}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--primary)]"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>{eur(Math.round(servico.valorIA * 0.5))}</span>
              <span>{eur(Math.round(servico.valorIA * 1.3))}</span>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4 text-sm">
            <p className="mb-2 font-medium text-foreground">Detalhamento</p>
            <div className="space-y-1.5 text-muted-foreground">
              <div className="flex justify-between">
                <span>Mão de obra ({servico.amassados} amassados)</span>
                <span className="text-foreground">{eur(Math.round(servico.valorIA * 0.7))}</span>
              </div>
              <div className="flex justify-between">
                <span>Deslocamento · {servico.cidade}</span>
                <span className="text-foreground">{eur(90)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {decision ? (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium",
            decision === "recusado" ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
          )}
        >
          {decision === "recusado" ? <X className="size-4" /> : <Check className="size-4" />}
          {decision === "aprovado"
            ? `Aprovado por ${eur(servico.valorIA)}`
            : decision === "ajustado"
              ? `Aprovado com valor ajustado para ${eur(valor)}`
              : "Chamado recusado"}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onDecide("aprovado")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-success py-3 text-sm font-semibold text-success-foreground transition-opacity hover:opacity-90"
          >
            <Check className="size-4" />
            Aprovar {eur(servico.valorIA)}
          </button>
          <button
            onClick={() => onDecide("ajustado")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Sliders className="size-4" />
            Aprovar ajustado {eur(valor)}
          </button>
          <button
            onClick={() => onDecide("recusado")}
            className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            <X className="size-4" />
            Recusar
          </button>
        </div>
      )}
    </section>
  )
}
