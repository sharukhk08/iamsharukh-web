import Link from 'next/link'
import { ReactNode } from 'react'
import { BOOKING_URL } from '../lib/contact'
import { services } from '../lib/services'

export default function ServicesLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear()

  return (
    <div className="scroll-page min-h-screen bg-primary text-[#e4ded7]">
      <header className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between py-6">
        <Link href="/" className="text-[18px] font-bold md:text-[20px]">
          Sharukh Khan
        </Link>
        <nav className="flex items-center gap-4 text-[14px] md:gap-6 md:text-[16px]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#e4ded7] px-4 py-2 font-semibold text-primary"
          >
            Book a call
          </a>
        </nav>
      </header>

      {children}

      <footer className="mt-24 border-t-[3px] border-[#e4ded7]/30 py-10">
        <div className="mx-auto grid w-[90%] max-w-[1200px] gap-8 md:grid-cols-2">
          <div>
            <p className="text-[18px] font-bold">Sharukh Khan</p>
            <p className="mt-2 max-w-[420px] text-[14px] text-[#95979D]">
              Full-stack developer and software engineer in Hisar, Haryana.
              Co-founder & CTO at Innovaft. Working with clients worldwide.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2 text-[14px] sm:grid-cols-2">
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
        </div>
        <p className="mx-auto mt-8 w-[90%] max-w-[1200px] text-[12px] uppercase text-[#95979D]">
          Copyright {year}
        </p>
      </footer>
    </div>
  )
}
