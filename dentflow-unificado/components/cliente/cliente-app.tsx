"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Camera,
  Sparkles,
  ShieldCheck,
  User,
  ChevronLeft,
  Check,
  MapPin,
  Star,
  Clock,
  Car,
  ArrowRight,
  Loader2,
  Phone,
  MessageCircle,
} from "lucide-react"
import { PhoneFrame } from "@/components/shared/phone-frame"
import { PlateBadge } from "@/components/shared/plate-badge"
import { eur } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Step = "home" | "origem" | "camera" | "analisando" | "orcamento" | "acompanhar" | "concluido"

const trackSteps = [
  { label: "Pedido confirmado", done: true },
  { label: "Funileiro a caminho", done: true },
  { label: "Reparo em execução", done: false },
  { label: "Concluído", done: false },
]

export function ClienteApp({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<Step>("home")
  const [origem, setOrigem] = useState<"seguradora" | "direto" | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (step !== "analisando") return
    setProgress(0)
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t)
          setStep("orcamento")
          return 100
        }
        return p + 4
      })
    }, 70)
    return () => clearInterval(t)
  }, [step])

  return (
    <PhoneFrame onExit={onExit}>
      <div className="flex min-h-[720px] flex-col bg-background">
        {step === "home" && <Home onNew={() => setStep("origem")} onTrack={() => setStep("acompanhar")} />}

        {step === "origem" && (
          <Origem
            onBack={() => setStep("home")}
            onSelect={(o) => {
              setOrigem(o)
              setStep("camera")
            }}
          />
        )}

        {step === "camera" && <Camera_ onBack={() => setStep("origem")} onCapture={() => setStep("analisando")} />}

        {step === "analisando" && <Analisando progress={progress} />}

        {step === "orcamento" && (
          <Orcamento origem={origem} onBack={() => setStep("camera")} onConfirm={() => setStep("acompanhar")} />
        )}

        {step === "acompanhar" && <Acompanhar onFinish={() => setStep("concluido")} onHome={() => setStep("home")} />}

        {step === "concluido" && <Concluido onHome={() => setStep("home")} />}
      </div>
    </PhoneFrame>
  )
}

function ScreenHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
      {onBack && (
        <button onClick={onBack} className="-ml-1 rounded-lg p-1 text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-5" />
        </button>
      )}
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  )
}

function Home({ onNew, onTrack }: { onNew: () => void; onTrack: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-primary px-5 pb-6 pt-5 text-primary-foreground">
        <p className="text-sm opacity-80">Olá, boa tarde</p>
        <p className="text-xl font-semibold">Sophie Laurent</p>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
          <Car className="size-4" />
          <span className="text-sm">Renault Clio 2021</span>
          <PlateBadge plate="AB-529-KT" className="ml-auto bg-white/20 text-white" />
        </div>
      </div>

      <div className="flex-1 space-y-4 px-5 py-5">
        <button
          onClick={onNew}
          className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border transition-colors hover:ring-primary/40"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Camera className="size-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Solicitar reparo</p>
            <p className="text-sm text-muted-foreground">Tire uma foto do amassado</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground" />
        </button>

        <button
          onClick={onTrack}
          className="flex w-full items-center gap-4 rounded-2xl border border-border bg-accent/40 p-4 text-left transition-colors hover:bg-accent/70"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MapPin className="size-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Acompanhar em andamento</p>
            <p className="text-sm text-muted-foreground">SRV-2037 · funileiro a caminho</p>
          </div>
          <ArrowRight className="size-5 text-muted-foreground" />
        </button>

        <div>
          <p className="mb-2 mt-2 text-sm font-medium text-muted-foreground">Histórico</p>
          <div className="space-y-2">
            {[
              { id: "SRV-2031", veiculo: "Mercedes CLA", valor: 1180, data: "12 mai" },
              { id: "SRV-2022", veiculo: "Toyota Corolla", valor: 560, data: "28 abr" },
            ].map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{h.veiculo}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.id} · {h.data}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{eur(h.valor)}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-success">
                    <Check className="size-3" /> Concluído
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Origem({
  onBack,
  onSelect,
}: {
  onBack: () => void
  onSelect: (o: "seguradora" | "direto") => void
}) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title="Como deseja pagar?" onBack={onBack} />
      <div className="flex-1 space-y-3 px-5 py-5">
        <p className="text-sm text-muted-foreground">Selecione a forma de atendimento para este reparo.</p>
        <button
          onClick={() => onSelect("seguradora")}
          className="flex w-full items-start gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border transition-colors hover:ring-primary/40"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Pela seguradora</p>
            <p className="text-sm text-muted-foreground">AXA Seguros · Apólice 8841-PT. Sujeito a aprovação.</p>
          </div>
        </button>
        <button
          onClick={() => onSelect("direto")}
          className="flex w-full items-start gap-4 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border transition-colors hover:ring-primary/40"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Cliente direto</p>
            <p className="text-sm text-muted-foreground">Você paga o valor do orçamento. Sem franquia.</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function Camera_({ onBack, onCapture }: { onBack: () => void; onCapture: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title="Foto do amassado" onBack={onBack} />
      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="relative flex-1 overflow-hidden rounded-2xl bg-foreground">
          <Image src="/car-dent-before.png" alt="Amassado no veículo" fill className="object-cover" />
          <div className="pointer-events-none absolute inset-6 rounded-xl border-2 border-dashed border-white/70" />
          <span className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            Enquadre o dano dentro da moldura
          </span>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Nossa IA vai medir profundidade e área do amassado.
        </p>
        <button
          onClick={onCapture}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Camera className="size-5" />
          Capturar e analisar
        </button>
      </div>
    </div>
  )
}

function Analisando({ progress }: { progress: number }) {
  const msgs = ["Detectando bordas do amassado…", "Medindo profundidade…", "Calculando complexidade…", "Gerando orçamento…"]
  const idx = Math.min(msgs.length - 1, Math.floor(progress / 25))
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="relative flex size-24 items-center justify-center rounded-full bg-primary/10">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
      <p className="mt-6 flex items-center gap-1.5 text-lg font-semibold text-foreground">
        <Sparkles className="size-5 text-primary" />
        Analisando com IA
      </p>
      <p className="mt-1 h-5 text-sm text-muted-foreground">{msgs[idx]}</p>
      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-sm font-medium text-primary">{progress}%</p>
    </div>
  )
}

function Orcamento({
  origem,
  onBack,
  onConfirm,
}: {
  origem: "seguradora" | "direto" | null
  onBack: () => void
  onConfirm: () => void
}) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title="Orçamento da IA" onBack={onBack} />
      <div className="flex-1 space-y-4 px-5 py-5">
        <div className="relative h-40 overflow-hidden rounded-2xl">
          <Image src="/car-dent-before.png" alt="Dano analisado" fill className="object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            3 amassados detectados
          </span>
        </div>

        <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-80">Valor estimado</p>
          <p className="text-3xl font-bold">{eur(420)}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs opacity-80">
            <Sparkles className="size-3.5" />
            Confiança da análise: 94%
          </p>
        </div>

        <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
          {[
            { l: "Porta dianteira esquerda", v: 180 },
            { l: "Paralama traseiro", v: 150 },
            { l: "Deslocamento técnico", v: 90 },
          ].map((r) => (
            <div key={r.l} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{r.l}</span>
              <span className="font-medium text-foreground">{eur(r.v)}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-accent/50 p-3 text-sm">
          {origem === "seguradora" ? (
            <p className="flex items-start gap-2 text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Enviado para <span className="font-medium text-foreground">AXA Seguros</span> aprovar. Você é notificado ao
              ser autorizado.
            </p>
          ) : (
            <p className="flex items-start gap-2 text-muted-foreground">
              <User className="mt-0.5 size-4 shrink-0 text-primary" />
              Pagamento direto. Um avaliador confirma o valor antes de iniciar.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-border p-4">
        <button
          onClick={onConfirm}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Confirmar solicitação
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  )
}

function Acompanhar({ onFinish, onHome }: { onFinish: () => void; onHome: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title="Acompanhar reparo" onBack={onHome} />
      <div className="relative h-56 overflow-hidden">
        <Image src="/tracking-map.png" alt="Mapa de acompanhamento" fill className="object-cover" />
        <div className="absolute left-1/3 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20">
          <Car className="size-5" />
        </div>
        <div className="absolute bottom-6 right-8 flex size-8 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg">
          <MapPin className="size-4" />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow">
          Chega em ~8 min
        </span>
      </div>

      <div className="flex-1 space-y-4 px-5 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            MS
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Marco Silva</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-warning text-warning" /> 4.9 · Funileiro certificado
            </p>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
            <Phone className="size-4" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-accent text-primary">
            <MessageCircle className="size-4" />
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Status do atendimento</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> SRV-2037
            </span>
          </div>
          <ol className="space-y-3">
            {trackSteps.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-xs",
                    s.done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground",
                    !s.done && i === 2 && "bg-primary/15 text-primary ring-2 ring-primary/30",
                  )}
                >
                  {s.done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={cn("text-sm", s.done ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <button
          onClick={onFinish}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Simular conclusão do reparo
        </button>
      </div>
    </div>
  )
}

function Concluido({ onHome }: { onHome: () => void }) {
  const [rating, setRating] = useState(0)
  return (
    <div className="flex flex-1 flex-col">
      <ScreenHeader title="Reparo concluído" />
      <div className="flex-1 space-y-4 px-5 py-5">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="size-7" />
          </div>
          <p className="mt-3 text-lg font-semibold text-foreground">Tudo pronto!</p>
          <p className="text-sm text-muted-foreground">Seu veículo está como novo.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { src: "/car-dent-before.png", label: "Antes" },
            { src: "/car-dent-after.png", label: "Depois" },
          ].map((img) => (
            <div key={img.label} className="relative h-32 overflow-hidden rounded-xl">
              <Image src={img.src || "/placeholder.svg"} alt={img.label} fill className="object-cover" />
              <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {img.label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-center text-sm font-medium text-foreground">Avalie o atendimento de Marco</p>
          <div className="mt-3 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)}>
                <Star
                  className={cn(
                    "size-8 transition-colors",
                    n <= rating ? "fill-warning text-warning" : "text-muted-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border p-4">
        <button
          onClick={onHome}
          className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  )
}
