'use client'
import { Check, ChevronUp, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

// A step-by-step trace that ticks through its steps one at a time and then
// starts over. No clock and no timings: it shows the order of things, not a
// promise about speed. With reduced motion every step is shown as done.
export default function ProcessTrace({
  title,
  steps,
  stepMs = 1300,
}: {
  title: string
  steps: string[]
  stepMs?: number
}) {
  // -1 means "reduced motion: all done"; otherwise the index of the active step.
  const [active, setActive] = useState(0)
  const [reducedChecked, setReducedChecked] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = window.setTimeout(() => {
        setActive(steps.length)
        setReducedChecked(true)
      }, 0)
      return () => window.clearTimeout(id)
    }
    const id = window.setInterval(() => {
      setActive((current) => (current >= steps.length + 1 ? 0 : current + 1))
    }, stepMs)
    return () => window.clearInterval(id)
  }, [steps.length, stepMs])

  const allDone = active >= steps.length

  return (
    <div className="rounded-3xl bg-secondary p-5">
      <div className="flex items-center gap-2 text-[#c9c4bd]">
        <Sparkles
          size={20}
          aria-hidden="true"
          className={allDone ? 'text-[#c9c4bd]' : 'anim-blink text-[#e4ded7]'}
        />
        <p className="text-[16px] font-semibold">{title}</p>
        <ChevronUp size={16} aria-hidden="true" className="ml-auto opacity-60" />
      </div>

      <ol className="mt-4 space-y-2">
        {steps.map((step, index) => {
          const done = index < active
          const current = index === active && !reducedChecked
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-[15px] transition-colors duration-500 ${
                done ? 'text-[#95979D]' : current ? 'text-[#e4ded7]' : 'text-[#95979D]/50'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {done ? (
                  <Check size={16} aria-hidden="true" className="text-[#c9c4bd]" />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full bg-current ${current ? 'anim-blink' : ''}`}
                  />
                )}
              </span>
              {step}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
