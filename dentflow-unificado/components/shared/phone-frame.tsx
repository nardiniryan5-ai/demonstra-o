"use client"

import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"

export function PhoneFrame({ onExit, children }: { onExit: () => void; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-6">
        <button
          onClick={onExit}
          className="mb-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Trocar de perfil
        </button>

        <div className="w-full overflow-hidden rounded-[2.5rem] border-[10px] border-foreground bg-background shadow-2xl">
          <div className="relative flex items-center justify-between bg-background px-6 pb-1 pt-3 text-xs font-medium text-foreground">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-foreground" aria-hidden />
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-4 rounded-[2px] border border-foreground" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
