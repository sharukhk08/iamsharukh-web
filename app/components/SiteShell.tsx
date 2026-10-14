import Link from 'next/link'
import { monaSans } from '../fonts/monaSans'
import Aurora from './effects/Aurora'
import SocialLinks from './SocialLinks'
import { ReactNode } from 'react'
import { locations } from '../lib/locations'
import { services } from '../lib/services'

export default function SiteShell({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div
      className={`scroll-page site-page ${monaSans.variable} relative isolate min-h-screen overflow-x-clip bg-primary text-[#e4ded7]`}
    >
      <div className="page-hero" aria-hidden="true" />
      <Aurora />
      <header className="mx-auto flex w-[90%] max-w-[1440px] items-center justify-between py-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-mona)] text-[22px] font-extrabold uppercase leading-none md:text-[28px]"
        >
          Sharukh Khan
        </Link>
        <nav className="flex items-center gap-4 text-[13px] font-semibold uppercase tracking-wide md:gap-6 md:text-[14px]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/work" className="hidden hover:underline sm:inline">
            Work
          </Link>
          <Link href="/locations" className="hidden hover:underline sm:inline">
            Locations
          </Link>
          <Link href="/learn" className="hidden hover:underline sm:inline">
            Learn
          </Link>
          <Link href="/blog" className="hidden hover:underline md:inline">
            Blog
          </Link>
          <Link
            href="/contact"
            className="rounded-md border-2 border-[#e4ded7] px-4 py-2 text-[13px] font-semibold uppercase text-[#e4ded7] transition-colors hover:bg-[#e4ded7] hover:text-[#0E1016] md:text-[14px]"
          >
            Contact
          </Link>
        </nav>
      </header>

      {children}

      <footer className="mt-24 border-t-[3px] border-[#e4ded7]/30 py-10">
        <div className="mx-auto grid w-[90%] max-w-[1440px] gap-8 md:grid-cols-2">
          <div>
            <p className="font-[family-name:var(--font-mona)] text-[28px] font-extrabold uppercase leading-none">
              Sharukh Khan
            </p>
            <p className="mt-3 max-w-[420px] text-[12px] font-semibold uppercase leading-relaxed text-[#95979D] md:text-[14px]">
              Full-stack developer and software engineer in Hisar, Haryana.
              Co-founder & CTO at Innovaft. Working with clients worldwide.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <ul className="space-y-2 text-[12px] font-semibold uppercase md:text-[13px]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-[12px] font-semibold uppercase md:text-[13px]">
              <li>
                <Link
                  href="/contact"
                  className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                >
                  Selected work
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                >
                  Learn: mentoring and courses
                </Link>
              </li>
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-[#95979D] hover:text-[#e4ded7] hover:underline"
                  >
                    {location.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 w-[90%] max-w-[1440px]">
          <SocialLinks />
        </div>
        <p className="mx-auto mt-8 w-[90%] max-w-[1440px] text-[12px] uppercase text-[#95979D]">
          Copyright {year}
        </p>
      </footer>
    </div>
  )
}
