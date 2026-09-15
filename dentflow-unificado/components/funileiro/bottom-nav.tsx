"use client"

import { LayoutGrid, ScanSearch, FileCheck2, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Screen } from "@/lib/screens-funileiro"

const items: { id: Screen; label: string; icon: typeof LayoutGrid }[] = [
  { id: "dispatch", label: "Despacho", icon: LayoutGrid },
  { id: "inspection", label: "Vistoria", icon: ScanSearch },
  { id: "report", label: "Laudo", icon: FileCheck2 },
  { id: "billing", label: "Faturamento", icon: Wallet },
  { id: "profile", label: "Perfil", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Screen
  onChange: (screen: Screen) => void
}) {
  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("size-5", isActive && "stroke-[2.4]")} aria-hidden="true" />
                <span>{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
