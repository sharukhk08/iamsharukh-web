'use client'
import { useEffect, useRef } from 'react'
import { readColor, THEME_EVENT } from '../../lib/theme'

// A field of triangles, circles and squares that brighten and grow along
// rolling waves. Which shape appears where drifts slowly, so the field breaks
// into moving regions. Decorative only: it pauses off-screen and when the tab is
// hidden, and draws a single still frame for visitors who prefer reduced motion.
export default function ShapeWaves({
  className = '',
  cell = 18,
  speed = 1,
}: {
  className?: string
  cell?: number
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let visible = true
    let width = 0
    let height = 0
    let dpr = 1
    let started = performance.now()
    let ink = readColor('--c-ink')

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw((performance.now() - started) / 1000)
    }

    const draw = (seconds: number) => {
      const t = seconds * speed
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = ink
      const cols = Math.ceil(width / cell)
      const rows = Math.ceil(height / cell)

      for (let gy = 0; gy < rows; gy++) {
        const ny = gy / rows
        for (let gx = 0; gx < cols; gx++) {
          const nx = gx / cols
          // Three crossing waves give the brightness and size.
          const v =
            (Math.sin(nx * 6 + t * 0.9) +
              Math.sin(ny * 5 - t * 0.7 + nx * 2) +
              Math.sin((nx + ny) * 4 + t * 0.5)) /
              6 +
            0.5
          // A slower field decides which shape sits where.
          const u = (Math.sin(nx * 3 + t * 0.15) + Math.cos(ny * 2.2 - t * 0.1)) / 4 + 0.5

          const size = cell * (0.22 + 0.62 * v)
          const cx = gx * cell + cell / 2
          const cy = gy * cell + cell / 2
          ctx.globalAlpha = 0.12 + 0.7 * v

          ctx.beginPath()
          if (u < 0.36) {
            ctx.moveTo(cx, cy - size / 2)
            ctx.lineTo(cx + size / 2, cy + size / 2)
            ctx.lineTo(cx - size / 2, cy + size / 2)
            ctx.closePath()
          } else if (u < 0.66) {
            ctx.arc(cx, cy, size / 2, 0, Math.PI * 2)
          } else {
            ctx.rect(cx - size / 2, cy - size / 2, size, size)
          }
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      if (visible && !document.hidden) draw((performance.now() - started) / 1000)
      frame = requestAnimationFrame(loop)
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibility.observe(canvas)
    const onTheme = () => {
      ink = readColor('--c-ink')
      draw((performance.now() - started) / 1000)
    }
    window.addEventListener(THEME_EVENT, onTheme)
    if (!reduced) frame = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener(THEME_EVENT, onTheme)
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibility.disconnect()
    }
  }, [cell, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block ${className}`}
    />
  )
}
