'use client'
import { useEffect, useRef } from 'react'

// Counts from 0 to `to` when scrolled into view. The final number is in the
// HTML from the start, so it is correct without JavaScript and for crawlers.
export default function CountUp({
  to,
  suffix = '',
  duration = 1400,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = `${Math.round(to * eased)}${suffix}`
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [to, suffix, duration])

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  )
}
