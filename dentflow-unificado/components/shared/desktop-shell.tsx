"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Bell, ChevronLeft, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

interface DesktopShellProps {
  brand: string
  persona: string
  personaIcon: LucideIcon
  nav: NavItem[]
  active: string
  onNavigate: (id: string) => void
  onExit: () => void
  title: string
  subtitle: string
  notifications?: number
  headerActions?: ReactNode
  children: ReactNode
}

export function DesktopShell({
  brand,
  persona,
  personaIcon: PersonaIcon,
  nav,
  active,
  onNavigate,
  onExit,
  title,
  subtitle,
  notifications = 0,
  headerActions,
  children,
}: DesktopShellProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-sidebar">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">{brand}</p>
            <p className="text-xs text-muted-foreground">{persona}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {nav.map((item) => {
            const Icon = item.icon
            const isActive = item.id === active
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-accent/60 px-3 py-2">
            <PersonaIcon className="size-4 text-primary" />
            <span className="text-xs font-medium text-foreground">{persona}</span>
          </div>
          <button
            onClick={onExit}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Trocar de perfil
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-8 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {headerActions}
            <button className="relative flex size-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
              <Bell className="size-4" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  )
}
