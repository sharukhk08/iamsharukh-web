import type { Metadata } from 'next'
import Link from 'next/link'
import Aurora from './components/effects/Aurora'
import FuzzyText from './components/effects/FuzzyText'
import Magnet from './components/effects/Magnet'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const links = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <div className="scroll-page relative isolate flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-primary px-6 py-12 text-center text-[#e4ded7]">
      <Aurora />
      <h1 className="sr-only">404 - Page not found</h1>

      <div className="flex flex-col items-center gap-2">
        <FuzzyText text="404" scale={0.22} max={220} />
        <FuzzyText text="not found" scale={0.09} max={90} min={32} fuzzRange={20} />
      </div>

      <p className="max-w-[460px] text-[16px] text-[#95979D] md:text-[18px]">
        This page does not exist, or it has moved. Try one of these instead.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Magnet>
          <Link
            href="/"
            className="inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
          >
            Back to home
          </Link>
        </Magnet>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-[#e4ded7]/30 px-5 py-3 text-[15px] hover:bg-secondary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
