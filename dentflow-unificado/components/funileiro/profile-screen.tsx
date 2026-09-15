"use client"

import {
  Star,
  Wrench,
  TrendingUp,
  ChevronRight,
  Bell,
  ShieldCheck,
  CircleHelp,
  LogOut,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScreenHeader } from "@/components/funileiro/screen-header"

const stats = [
  { icon: Wrench, label: "Serviços", value: "312" },
  { icon: Star, label: "Avaliação", value: "4,9" },
  { icon: TrendingUp, label: "Aprovação", value: "97%" },
]

const menu = [
  { icon: ShieldCheck, label: "Seguradoras credenciadas", hint: "4 ativas" },
  { icon: Bell, label: "Notificações", hint: "" },
  { icon: BadgeCheck, label: "Certificações PDR", hint: "Verificado" },
  { icon: CircleHelp, label: "Ajuda e suporte", hint: "" },
]

export function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="mx-auto max-w-md pb-6">
      <ScreenHeader title="Perfil" />

      <div className="space-y-5 px-5 pt-4">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            MR
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-foreground">Marcos Ribeiro</h2>
              <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
            </div>
            <p className="text-xs text-muted-foreground">Técnico PDR · São Paulo, SP</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">ID DentFlow #TC-0192</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
              <Icon className="mx-auto size-4 text-primary" aria-hidden="true" />
              <p className="mt-1.5 text-lg font-bold text-foreground">{value}</p>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <ul className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {menu.map(({ icon: Icon, label, hint }) => (
            <li key={label}>
              <button
                type="button"
                className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left last:border-b-0 hover:bg-secondary"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="lg"
          className="w-full text-destructive hover:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sair da conta
        </Button>

        <p className="text-center text-[11px] text-muted-foreground">DentFlow · versão demo 1.0</p>
      </div>
    </div>
  )
}
