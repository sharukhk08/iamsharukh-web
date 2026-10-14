'use client'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../lib/nav'

// Phones had no way to reach Work, Learn, Locations, Blog or About from content
// pages. This opens a full-screen list of every page.
export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = openRef.current
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
      opener?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={openRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="rounded-md border-2 border-ink/40 p-2 lg:hidden"
      >
        <Menu size={22} aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-primary/95 px-6 py-6 backdrop-blur-md lg:hidden"
        >
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-md border-2 border-ink/40 p-2"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Site" className="mt-6 flex flex-1 flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 font-[family-name:var(--font-mona)] text-[44px] font-extrabold uppercase leading-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mb-2 rounded-md border-2 border-ink bg-ink px-6 py-4 text-center text-[14px] font-semibold uppercase text-paper"
          >
            Start a project
          </Link>
        </div>
      )}
    </>
  )
}
