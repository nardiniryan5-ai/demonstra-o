"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Navigation, Building2, Warehouse, Home, Check, X, Sparkles, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenHeader } from "@/components/funileiro/screen-header"
import { newOrders, formatBRL, type ServiceOrder } from "@/lib/mock-data-funileiro"

const locationIcon = {
  Pátio: Warehouse,
  Concessionária: Building2,
  "Casa do Cliente": Home,
} as const

export function DispatchScreen({ onGoToInspection }: { onGoToInspection: () => void }) {
  const [orders, setOrders] = useState<ServiceOrder[]>(newOrders)
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "declined">>({})

  function decide(id: string, decision: "accepted" | "declined") {
    setDecisions((prev) => ({ ...prev, [id]: decision }))
  }

  const pending = orders.filter((o) => !decisions[o.id])

  return (
    <div className="mx-auto max-w-md pb-6">
      <ScreenHeader title="Central de Despacho" subtitle="Terça, 14 de setembro" notifications={pending.length} />

      <div className="space-y-5 px-5 pt-4">
        {/* Mini map */}
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm">
          <Image
            src="/map-mock.png"
            alt="Mapa com a localização dos serviços do dia"
            width={480}
            height={240}
            className="h-40 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
          {/* Pins */}
          <MapPinDot className="left-[22%] top-[38%]" label="1" />
          <MapPinDot className="left-[54%] top-[26%]" label="2" />
          <MapPinDot className="left-[70%] top-[62%]" label="3" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
            <Navigation className="size-3.5 text-primary" aria-hidden="true" />
            {pending.length} serviços · 24,2 km hoje
          </div>
        </div>

        {/* New service alert */}
        {pending.some((o) => o.isNew) ? (
          <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-accent px-4 py-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            <p className="text-sm font-medium text-accent-foreground">Novo serviço disponível na sua região</p>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Novas Ordens de Serviço</h2>
          <span className="text-xs text-muted-foreground">{pending.length} pendentes</span>
        </div>

        <ul className="space-y-3">
          {orders.map((order) => {
            const decision = decisions[order.id]
            const LocIcon = locationIcon[order.locationType]
            return (
              <li
                key={order.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition data-[done=true]:opacity-60"
                data-done={Boolean(decision)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-foreground px-2 py-0.5 font-mono text-xs font-bold tracking-widest text-background">
                          {order.plate}
                        </span>
                        {order.isNew ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            <Sparkles className="size-3" aria-hidden="true" /> Novo
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-foreground">{order.model}</p>
                      <p className="text-xs text-muted-foreground">{order.color}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">Orçamento prévio</p>
                      <p className="text-base font-bold text-foreground">{formatBRL(order.estimatedValue)}</p>
                      <p className="text-[11px] text-muted-foreground">{order.dentsBudget} amassados</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <LocIcon className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="text-foreground">{order.location}</span>
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                        {order.distanceKm.toString().replace(".", ",")} km
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
                        {order.insurer}
                      </span>
                    </div>
                  </div>
                </div>

                {decision ? (
                  <div
                    className={`flex items-center justify-between px-4 py-2.5 text-xs font-semibold ${
                      decision === "accepted"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {decision === "accepted" ? (
                        <>
                          <Check className="size-4" aria-hidden="true" /> Serviço aceito
                        </>
                      ) : (
                        <>
                          <X className="size-4" aria-hidden="true" /> Serviço recusado
                        </>
                      )}
                    </span>
                    {decision === "accepted" ? (
                      <button onClick={onGoToInspection} className="underline">
                        Iniciar vistoria
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex gap-2 border-t border-border p-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-border text-muted-foreground hover:text-foreground"
                      onClick={() => decide(order.id, "declined")}
                    >
                      <X className="size-4" aria-hidden="true" />
                      Recusar
                    </Button>
                    <Button className="flex-1" onClick={() => decide(order.id, "accepted")}>
                      <Check className="size-4" aria-hidden="true" />
                      Aceitar
                    </Button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function MapPinDot({ className, label }: { className: string; label: string }) {
  return (
    <span className={`absolute ${className} -translate-x-1/2 -translate-y-full`}>
      <span className="flex size-6 items-center justify-center rounded-full border-2 border-card bg-primary text-[10px] font-bold text-primary-foreground shadow-md">
        {label}
      </span>
      <span className="mx-auto block size-1.5 -translate-y-0.5 rotate-45 bg-primary" />
    </span>
  )
}
