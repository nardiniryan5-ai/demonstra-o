"use client"

import { Bell } from "lucide-react"

export function ScreenHeader({
  title,
  subtitle,
  notifications = 0,
}: {
  title: string
  subtitle?: string
  notifications?: number
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 px-5 py-4 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        <button
          type="button"
          className="relative rounded-full border border-border bg-background p-2 text-muted-foreground transition hover:text-foreground"
          aria-label="Notificações"
        >
          <Bell className="size-5" aria-hidden="true" />
          {notifications > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {notifications}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  )
}
