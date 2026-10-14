'use client'
import { useEffect, useState } from 'react'

// Cycles through words in place. All words sit in the same grid cell, so the
// width never jumps. Screen readers get the full list once, not the animation.
export default function RotatingWords({
  words,
  interval = 2200,
  className = '',
  wordClassName = '',
}: {
  words: string[]
  interval?: number
  className?: string
  // Applied to each word. Use this, not a wrapper, for effects such as background-clip text.
  wordClassName?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % words.length),
      interval,
    )
    return () => window.clearInterval(id)
  }, [words.length, interval])

  return (
    <span className={`inline-grid align-bottom ${className}`}>
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className={`col-start-1 row-start-1 transition-all duration-500 ${wordClassName} ${
            i === index
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-2 opacity-0 blur-sm'
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  )
}
