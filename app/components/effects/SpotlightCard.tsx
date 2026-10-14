'use client'
import { PointerEvent, ReactNode } from 'react'

// A card with a soft glow that follows the pointer.
export default function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <div className={`spotlight ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  )
}
