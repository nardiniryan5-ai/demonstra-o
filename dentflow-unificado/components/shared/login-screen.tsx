"use client"

import type React from "react"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Mail, Lock, Loader2, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoginScreenProps {
  persona: string
  personaIcon: LucideIcon
  demoEmail: string
  onLogin: () => void
  onBack: () => void
}

export function LoginScreen({ persona, personaIcon: PersonaIcon, demoEmail, onLogin, onBack }: LoginScreenProps) {
  const [email, setEmail] = useState(demoEmail)
  const [password, setPassword] = useState("demo1234")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(onLogin, 900)
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-gradient-to-b from-secondary to-background px-6 py-12">
      <div className="mx-auto w-full max-w-sm">
        <button
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Trocar de perfil
        </button>

        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <PersonaIcon className="size-8 text-primary-foreground" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dent<span className="text-primary">Flow</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Login — {persona}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              E-mail
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="voce@empresa.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-medium text-primary hover:underline">
              Esqueci minha senha
            </button>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Ao continuar você concorda com os termos de uso do DentFlow.
        </p>
      </div>
    </div>
  )
}
