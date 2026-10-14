'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// A sticky call to action on phones, so the way to enquire is always one tap away.
// Hidden on the contact page itself.
export default function MobileCta() {
  const pathname = usePathname()
  if (pathname === '/contact') return null
  return (
    <aside aria-label="Quick contact" className="pointer-events-none fixed inset-x-4 bottom-4 z-40 lg:hidden">
      <Link
        href="/contact"
        className="pointer-events-auto block rounded-md border-2 border-ink bg-ink px-6 py-3 text-center text-[14px] font-semibold uppercase text-paper shadow-lg"
      >
        Get a free quote
      </Link>
    </aside>
  )
}
