'use client'
import { PointerEvent, ReactNode } from 'react'

// Nudges its children toward the pointer. Wrap a button or link.
export default function Magnet({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === 'touch') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`
  }
  const reset = (event: PointerEvent<HTMLSpanElement>) => {
    event.currentTarget.style.transform = ''
  }
  return (
    <span
      className={`inline-block transition-transform duration-200 ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </span>
  )
}
