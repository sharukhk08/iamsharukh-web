'use client'
import { PointerEvent, ReactNode } from 'react'

// Tilts toward the pointer in 3D. Only for mouse and pen, not touch.
export default function TiltCard({
  children,
  className = '',
  max = 6,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || reduced()) return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale(1.01)`
  }
  const reset = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = ''
  }

  return (
    <div className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </div>
  )
}
