'use client'
import { useEffect, useRef } from 'react'

// Plays a Lottie animation from /public/lottie. Uses lottie-web's "light" build (SVG
// only, no expression support, so a file cannot run script code). The player is loaded
// only when the animation scrolls into view. With reduced motion it shows one still frame.
export default function LottiePlayer({
  src,
  loop = true,
  staticFrame = 0,
  className = '',
}: {
  src: string
  loop?: boolean
  // The frame to show when the visitor prefers reduced motion
  staticFrame?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let animation: { destroy: () => void } | undefined
    let cancelled = false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const start = async () => {
      const lottie = (await import('lottie-web/build/player/lottie_light')).default
      if (cancelled) return
      const instance = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: loop && !reduced,
        autoplay: !reduced,
        path: src,
      })
      animation = instance
      if (reduced) instance.addEventListener('DOMLoaded', () => instance.goToAndStop(staticFrame, true))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          void start()
        }
      },
      { rootMargin: '100px' },
    )
    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
      animation?.destroy()
    }
  }, [src, loop, staticFrame])

  return <div ref={ref} aria-hidden="true" className={className} />
}
