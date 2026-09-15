import { cn } from "@/lib/utils"

export function PlateBadge({ plate, className }: { plate: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-foreground px-2 py-0.5 font-mono text-xs font-semibold tracking-widest text-background",
        className,
      )}
    >
      {plate}
    </span>
  )
}
