"use client"

import { useState } from "react"
import { Camera, Loader2, ScanSearch, TriangleAlert, ShieldCheck, ArrowRight, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenHeader } from "@/components/funileiro/screen-header"
import { activeOrder, formatBRL } from "@/lib/mock-data-funileiro"

type Phase = "idle" | "capturing" | "analyzing" | "done"

const IDENTIFIED_DENTS = 25
const VALUE_PER_DENT = 185

export function InspectionScreen({ onGoToReport }: { onGoToReport: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle")

  function startCapture() {
    setPhase("capturing")
    setTimeout(() => setPhase("analyzing"), 1100)
    setTimeout(() => setPhase("done"), 3200)
  }

  const paidValue = activeOrder.estimatedValue
  const identifiedValue = IDENTIFIED_DENTS * VALUE_PER_DENT
  const complement = identifiedValue - paidValue

  return (
    <div className="mx-auto max-w-md pb-6">
      <ScreenHeader title="Vistoria de Constatação" subtitle={`OS ${activeOrder.id} · aberta`} />

      <div className="space-y-5 px-5 pt-4">
        {/* Vehicle + budget */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="rounded-md bg-foreground px-2 py-0.5 font-mono text-xs font-bold tracking-widest text-background">
                {activeOrder.plate}
              </span>
              <p className="mt-1.5 text-sm font-semibold text-foreground">{activeOrder.model}</p>
              <p className="text-xs text-muted-foreground">{activeOrder.color}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {activeOrder.insurer}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
            <div>
              <p className="text-[11px] text-muted-foreground">Orçamento da seguradora</p>
              <p className="text-sm font-semibold text-foreground">{activeOrder.dentsBudget} amassados</p>
            </div>
            <p className="text-lg font-bold text-foreground">{formatBRL(paidValue)}</p>
          </div>
        </div>

        {/* Camera / capture area */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="relative flex h-56 items-center justify-center bg-neutral-900">
            {/* PDR light board lines */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(255,255,255,0.5) 22px, rgba(255,255,255,0.5) 26px)",
              }}
              aria-hidden="true"
            />
            {phase === "idle" ? (
              <div className="relative z-10 text-center text-neutral-400">
                <Camera className="mx-auto size-10" aria-hidden="true" />
                <p className="mt-2 text-xs">Posicione a luminária sobre o painel</p>
              </div>
            ) : null}

            {phase === "capturing" ? (
              <div className="relative z-10 text-center text-neutral-200">
                <div className="mx-auto size-12 animate-pulse rounded-full border-4 border-white/70" />
                <p className="mt-2 text-xs">Capturando imagem...</p>
              </div>
            ) : null}

            {phase === "analyzing" ? (
              <div className="relative z-10 text-center text-white">
                <ScanSearch className="mx-auto size-10 animate-pulse text-primary" aria-hidden="true" />
                <p className="mt-2 flex items-center justify-center gap-2 text-sm font-medium">
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Analisando imagem...
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">IA detectando deformações na lataria</p>
              </div>
            ) : null}

            {phase === "done" ? (
              <div className="relative z-10 grid w-full grid-cols-5 gap-2 p-4">
                {Array.from({ length: 25 }).map((_, i) => (
                  <span
                    key={i}
                    className="mx-auto flex size-6 items-center justify-center rounded-full border border-destructive/70 bg-destructive/20 text-[9px] font-bold text-destructive"
                    style={{ animation: `fadeIn 0.3s ease ${i * 0.03}s both` }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="p-4">
            {phase !== "done" ? (
              <Button
                size="lg"
                className="w-full"
                onClick={startCapture}
                disabled={phase === "capturing" || phase === "analyzing"}
              >
                {phase === "idle" ? (
                  <>
                    <Camera className="size-4" aria-hidden="true" />
                    Tirar Foto com Luminária PDR
                  </>
                ) : (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Processando...
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-destructive">
                <TriangleAlert className="size-5 shrink-0" aria-hidden="true" />
                <p className="text-sm font-semibold">
                  IA identificou {IDENTIFIED_DENTS} amassados
                  <span className="ml-1 font-normal text-destructive/80">
                    ({IDENTIFIED_DENTS - activeOrder.dentsBudget} acima do orçamento)
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Complement card */}
        {phase === "done" ? (
          <div
            className="rounded-2xl border border-warning/40 bg-warning/5 p-4 shadow-sm"
            style={{ animation: "fadeIn 0.4s ease 0.4s both" }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-warning/20 text-warning">
                <TriangleAlert className="size-4" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-foreground">Complemento Necessário</h2>
                <p className="text-[11px] text-muted-foreground">Divergência entre pago e identificado</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-card p-3">
                <p className="text-[11px] text-muted-foreground">Valor pago</p>
                <p className="text-base font-bold text-foreground">{formatBRL(paidValue)}</p>
                <p className="text-[11px] text-muted-foreground">{activeOrder.dentsBudget} amassados</p>
              </div>
              <div className="rounded-xl bg-card p-3 ring-1 ring-warning/40">
                <p className="text-[11px] text-muted-foreground">Valor identificado</p>
                <p className="text-base font-bold text-foreground">{formatBRL(identifiedValue)}</p>
                <p className="text-[11px] text-muted-foreground">{IDENTIFIED_DENTS} amassados</p>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-warning/15 px-4 py-3">
              <span className="text-sm font-medium text-foreground">Complemento</span>
              <span className="text-lg font-bold text-foreground">+ {formatBRL(complement)}</span>
            </div>

            <Button className="mt-4 w-full" size="lg" onClick={onGoToReport}>
              <FileText className="size-4" aria-hidden="true" />
              Gerar Laudo de Complemento
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
