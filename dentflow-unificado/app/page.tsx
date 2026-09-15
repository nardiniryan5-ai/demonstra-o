"use client"

import { useState } from "react"
import {
  Smartphone,
  ClipboardCheck,
  Building2,
  LayoutDashboard,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { ClienteApp } from "@/components/cliente/cliente-app"
import { AvaliadorApp } from "@/components/avaliador/avaliador-app"
import { SeguradoraApp } from "@/components/seguradora/seguradora-app"
import { OverviewApp } from "@/components/overview/overview-app"
import { FunileiroApp } from "@/components/funileiro/funileiro-app"
import { LoginScreen } from "@/components/shared/login-screen"

type PersonaId = "funileiro" | "cliente" | "avaliador" | "seguradora" | "overview"
type Stage = "picker" | "login" | "app"

const personas = [
  {
    id: "funileiro" as const,
    label: "Funileiro",
    device: "Mobile",
    icon: Wrench,
    demoEmail: "tecnico@dentflow.com",
    desc: "Recebe a OS, aceita o chamado, faz a vistoria com IA, executa o reparo e registra o laudo antes/depois.",
  },
  {
    id: "cliente" as const,
    label: "Cliente",
    device: "Mobile",
    icon: Smartphone,
    demoEmail: "cliente@dentflow.com",
    desc: "Solicita reparo, tira foto do amassado, recebe orçamento da IA e acompanha o funileiro em tempo real.",
  },
  {
    id: "avaliador" as const,
    label: "Avaliador",
    device: "Desktop",
    icon: ClipboardCheck,
    demoEmail: "avaliador@dentflow.com",
    desc: "Fila de aprovações, análise das fotos com anotações da IA e decisão de aprovar, recusar ou ajustar o valor.",
  },
  {
    id: "seguradora" as const,
    label: "Seguradora",
    device: "Desktop",
    icon: Building2,
    demoEmail: "seguradora@dentflow.com",
    desc: "Acompanha os chamados enviados, linha do tempo do atendimento, laudos antes/depois e exportação de relatórios.",
  },
  {
    id: "overview" as const,
    label: "Visão Geral",
    device: "Desktop",
    icon: LayoutDashboard,
    demoEmail: "admin@dentflow.com",
    desc: "Dashboard master com KPIs da operação, gráfico de serviços, tabela geral e gestão de equipe.",
  },
]

export default function Page() {
  const [stage, setStage] = useState<Stage>("picker")
  const [personaId, setPersonaId] = useState<PersonaId | null>(null)

  const persona = personas.find((p) => p.id === personaId) ?? null

  function choosePersona(id: PersonaId) {
    setPersonaId(id)
    setStage("login")
  }

  function backToPicker() {
    setStage("picker")
    setPersonaId(null)
  }

  if (stage === "login" && persona) {
    return (
      <LoginScreen
        persona={persona.label}
        personaIcon={persona.icon}
        demoEmail={persona.demoEmail}
        onLogin={() => setStage("app")}
        onBack={backToPicker}
      />
    )
  }

  if (stage === "app" && personaId === "funileiro") return <FunileiroApp onExit={backToPicker} />
  if (stage === "app" && personaId === "cliente") return <ClienteApp onExit={backToPicker} />
  if (stage === "app" && personaId === "avaliador") return <AvaliadorApp onExit={backToPicker} />
  if (stage === "app" && personaId === "seguradora") return <SeguradoraApp onExit={backToPicker} />
  if (stage === "app" && personaId === "overview") return <OverviewApp onExit={backToPicker} />

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Demo visual · dados fictícios
          </span>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Wrench className="size-6" />
            </div>
            <span className="text-3xl font-bold tracking-tight text-foreground">DentFlow</span>
          </div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Plataforma de Martelinho de Ouro estilo Uber
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
            Atende seguradoras e clientes diretos. Selecione um perfil para explorar a interface.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {personas.map((p) => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                onClick={() => choosePersona(p.id)}
                className="group flex flex-col items-start rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="mb-4 flex w-full items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {p.device}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground">{p.label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Abrir tela
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
