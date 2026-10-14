'use client'
import { useEffect, useRef } from 'react'

// Text that vibrates like a bad signal: each pixel row is shifted sideways by a
// random amount every frame. The shake gets stronger while the pointer is over it.
// Drawn on a canvas, so the real text for screen readers and crawlers must be
// provided separately (see the sr-only heading on the 404 page).
export default function FuzzyText({
  text,
  scale = 0.2,
  max = 200,
  min = 56,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
}: {
  text: string
  // Font size as a fraction of the window width, clamped between min and max px.
  scale?: number
  max?: number
  min?: number
  baseIntensity?: number
  hoverIntensity?: number
  fuzzRange?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const family = getComputedStyle(canvas).fontFamily || 'sans-serif'
    let frame = 0
    let hovering = false
    let width = 0
    let height = 0
    let source: HTMLCanvasElement | null = null

    const build = () => {
      const size = Math.min(max, Math.max(min, window.innerWidth * scale))
      const font = `900 ${size}px ${family}`
      const probe = document.createElement('canvas').getContext('2d')
      if (!probe) return
      probe.font = font
      const textWidth = Math.ceil(probe.measureText(text).width)
      const pad = fuzzRange + 10
      width = textWidth + pad * 2
      height = Math.ceil(size * 1.25)

      source = document.createElement('canvas')
      source.width = width
      source.height = height
      const sctx = source.getContext('2d')
      if (!sctx) return
      sctx.font = font
      sctx.fillStyle = '#e4ded7'
      sctx.textBaseline = 'middle'
      sctx.fillText(text, pad, height / 2)

      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.maxWidth = '100%'
      canvas.style.height = 'auto'
    }

    const draw = (intensity: number) => {
      if (!source) return
      ctx.clearRect(0, 0, width, height)
      for (let y = 0; y < height; y++) {
        const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange)
        ctx.drawImage(source, 0, y, width, 1, dx, y, width, 1)
      }
    }

    const loop = () => {
      draw(hovering ? hoverIntensity : baseIntensity)
      frame = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      hovering =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    }
    const onLeave = () => {
      hovering = false
    }
    const onResize = () => {
      build()
      if (reduced) draw(0)
    }

    build()
    if (reduced) {
      draw(0)
    } else {
      loop()
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [text, scale, max, min, baseIntensity, hoverIntensity, fuzzRange])

  return <canvas ref={canvasRef} aria-hidden="true" className="block" />
}
