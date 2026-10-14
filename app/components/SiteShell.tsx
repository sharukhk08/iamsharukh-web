import Link from 'next/link'
import { monaSans } from '../fonts/monaSans'
import Aurora from './effects/Aurora'
import MobileCta from './MobileCta'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'
import { NAV_LINKS } from '../lib/nav'
import SocialLinks from './SocialLinks'
import { ReactNode } from 'react'
import { locations } from '../lib/locations'
import { services } from '../lib/services'

export default function SiteShell({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div
      className={`scroll-page site-page ${monaSans.variable} relative isolate min-h-screen overflow-x-clip bg-primary pb-20 lg:pb-0 text-ink`}
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
        <div className="flex items-center gap-3">
          <nav
            aria-label="Main"
            className="hidden items-center gap-5 text-[13px] font-semibold uppercase tracking-wide lg:flex xl:gap-6 xl:text-[14px]"
          >
            {NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-md border-2 border-ink px-4 py-2 text-[13px] font-semibold uppercase text-ink transition-colors hover:bg-ink hover:text-paper md:text-[14px]"
          >
            Contact
          </Link>
          <MobileMenu />
        </div>
      </header>

      {children}
      <MobileCta />

      <footer className="mt-24 border-t-[3px] border-ink/30 py-10">
        <div className="mx-auto grid w-[90%] max-w-[1440px] gap-8 md:grid-cols-2">
          <div>
            <p className="font-[family-name:var(--font-mona)] text-[28px] font-extrabold uppercase leading-none">
              Sharukh Khan
            </p>
            <p className="mt-3 max-w-[420px] text-[12px] font-semibold uppercase leading-relaxed text-ink-mute md:text-[14px]">
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
                    className="text-ink-mute hover:text-ink hover:underline"
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
                  className="text-ink-mute hover:text-ink hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-ink-mute hover:text-ink hover:underline"
                >
                  Selected work
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-ink-mute hover:text-ink hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-ink-mute hover:text-ink hover:underline"
                >
                  Learn: mentoring and courses
                </Link>
              </li>
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/locations/${location.slug}`}
                    className="text-ink-mute hover:text-ink hover:underline"
                  >
                    {location.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/international"
                  className="text-ink-mute hover:text-ink hover:underline"
                >
                  International clients
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 w-[90%] max-w-[1440px]">
          <SocialLinks />
        </div>
        <p className="mx-auto mt-8 flex w-[90%] max-w-[1440px] flex-wrap gap-x-6 gap-y-2 text-[12px] uppercase text-ink-mute">
          <span>Copyright {year}</span>
          <Link href="/about" className="hover:text-ink hover:underline">About</Link>
          <Link href="/links" className="hover:text-ink hover:underline">Links</Link>
          <Link href="/privacy" className="hover:text-ink hover:underline">Privacy</Link>
        </p>
      </footer>
    </div>
  )
}
