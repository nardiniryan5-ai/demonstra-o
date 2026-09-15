"use client"

import { useRef, useState, useEffect } from "react"
import { Eraser } from "lucide-react"

export function SignaturePad({ onChange }: { onChange?: (hasSignature: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ratio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * ratio
    canvas.height = rect.height * ratio
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(ratio, ratio)
    ctx.lineWidth = 2.2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = "#1f2937"
  }, [])

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const { x, y } = pos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    if (!hasContent) {
      setHasContent(true)
      onChange?.(true)
    }
  }

  function end() {
    drawing.current = false
  }

  function clear() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasContent(false)
    onChange?.(false)
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-input bg-card">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="h-36 w-full touch-none"
        />
        {!hasContent ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            Assine aqui com o dedo
          </span>
        ) : null}
        <span className="pointer-events-none absolute inset-x-4 bottom-4 border-b border-dashed border-muted-foreground/40" />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <Eraser className="size-3.5" aria-hidden="true" />
          Limpar
        </button>
      </div>
    </div>
  )
}
