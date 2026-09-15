"use client"

import { useState } from "react"
import { Camera, Plus, Check, Scan, CircleCheckBig } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenHeader } from "@/components/funileiro/screen-header"
import { SignaturePad } from "@/components/funileiro/signature-pad"
import { activeOrder } from "@/lib/mock-data-funileiro"

type PhotoState = { before: boolean; after: boolean }

export function ReportScreen({ onFinish }: { onFinish: () => void }) {
  const [photos, setPhotos] = useState<PhotoState>({ before: true, after: false })
  const [signed, setSigned] = useState(false)
  const [finished, setFinished] = useState(false)

  const canFinish = photos.before && photos.after && signed

  if (finished) {
    return (
      <div className="mx-auto max-w-md">
        <ScreenHeader title="Laudo Antes e Depois" subtitle={`OS ${activeOrder.id}`} />
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-success/15">
            <CircleCheckBig className="size-10 text-success" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-lg font-bold text-foreground">Serviço finalizado!</h2>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            O laudo foi enviado à {activeOrder.insurer} e a OS entrou no fluxo de faturamento.
          </p>
          <Button className="mt-6 w-full" size="lg" onClick={onFinish}>
            Ver Faturamento
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md pb-6">
      <ScreenHeader title="Laudo Antes e Depois" subtitle={`OS ${activeOrder.id} · ${activeOrder.plate}`} />

      <div className="space-y-5 px-5 pt-4">
        <p className="text-sm text-muted-foreground">
          Registre as fotos no <span className="font-medium text-foreground">mesmo ângulo</span> usando a moldura guia
          para comprovar a entrega.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <PhotoSlot
            label="Antes"
            filled={photos.before}
            onClick={() => setPhotos((p) => ({ ...p, before: !p.before }))}
          />
          <PhotoSlot
            label="Depois"
            filled={photos.after}
            onClick={() => setPhotos((p) => ({ ...p, after: !p.after }))}
          />
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground">
          <Scan className="size-4 shrink-0" aria-hidden="true" />
          Alinhe o veículo dentro da moldura para manter o mesmo enquadramento.
        </div>

        {/* Signature */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Assinatura do Cliente</h2>
          <p className="mb-3 mt-0.5 text-xs text-muted-foreground">
            O cliente confirma a entrega do veículo em perfeitas condições.
          </p>
          <SignatureArea onChange={setSigned} />
        </div>

        <Button size="lg" className="w-full" disabled={!canFinish} onClick={() => setFinished(true)}>
          <Check className="size-4" aria-hidden="true" />
          Finalizar Serviço
        </Button>
        {!canFinish ? (
          <p className="text-center text-xs text-muted-foreground">
            Adicione as duas fotos e a assinatura para finalizar.
          </p>
        ) : null}
      </div>
    </div>
  )
}

function PhotoSlot({ label, filled, onClick }: { label: string; filled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-neutral-900 text-neutral-300 transition"
    >
      <span className="absolute left-2 top-2 z-10 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-foreground">
        {label}
      </span>

      {filled ? (
        <>
          <span
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3f4552 0%, #23272f 60%), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(255,255,255,0.06) 14px, rgba(255,255,255,0.06) 16px)",
            }}
            aria-hidden="true"
          />
          <span className="absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-full bg-success text-white">
            <Check className="size-3.5" aria-hidden="true" />
          </span>
        </>
      ) : null}

      {/* Guide frame overlay */}
      <span
        className="pointer-events-none absolute inset-4 z-10 rounded-lg border-2 border-dashed border-white/50"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium text-white/50">
        {filled ? "" : "guia de ângulo"}
      </span>

      {!filled ? (
        <span className="relative z-10 flex h-full flex-col items-center justify-center gap-1.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10">
            <Plus className="size-5" aria-hidden="true" />
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Camera className="size-3.5" aria-hidden="true" /> Tocar para foto
          </span>
        </span>
      ) : null}
    </button>
  )
}

function SignatureArea({ onChange }: { onChange: (v: boolean) => void }) {
  return <SignaturePad onChange={onChange} />
}
