'use client'
import { useEffect, useRef } from 'react'

// A grid of dots that swell and brighten near the pointer and ripple gently on
// their own, so it also moves on touch screens. Decorative only: pauses
// off-screen and in hidden tabs, and is a still frame for reduced motion.
export default function DotGrid({
  className = '',
  gap = 28,
}: {
  className?: string
  gap?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const radius = 150
    let frame = 0
    let visible = true
    let width = 0
    let height = 0
    let pointer = { x: -9999, y: -9999 }
    const started = performance.now()

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#e4ded7'
      const cols = Math.ceil(width / gap) + 1
      const rows = Math.ceil(height / gap) + 1
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const x = gx * gap
          const y = gy * gap
          const ripple = Math.sin(gx * 0.45 + gy * 0.35 - seconds * 1.4) * 0.5 + 0.5
          const dist = Math.hypot(x - pointer.x, y - pointer.y)
          const near = dist < radius ? 1 - dist / radius : 0
          ctx.globalAlpha = 0.1 + ripple * 0.14 + near * 0.75
          ctx.beginPath()
          ctx.arc(x, y, 1.1 + ripple * 0.7 + near * 3.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw((performance.now() - started) / 1000)
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
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
    window.addEventListener('pointermove', onMove)
    if (!reduced) frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibility.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [gap])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block ${className}`}
    />
  )
}
