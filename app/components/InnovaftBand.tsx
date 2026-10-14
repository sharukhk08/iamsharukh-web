import Link from 'next/link'

// Connects this site to the owner's company site. Only addresses that were
// checked and respond are linked. blog.innovaft.com is left out on purpose while
// it returns an error.
const links = [
  { label: 'Visit Innovaft', href: 'https://innovaft.com/' },
  { label: 'Innovaft portfolio', href: 'https://innovaft.com/portfolio' },
  { label: 'Innovaft courses', href: 'https://learn.innovaft.com/our-courses' },
  { label: 'Book a free demo class', href: 'https://innovaft.com/book-a-free-demo' },
]

export default function InnovaftBand({ className = '' }: { className?: string }) {
  return (
    <section className={`rounded-3xl bg-secondary p-8 md:p-12 ${className}`} aria-labelledby="innovaft-title">
      <h2 id="innovaft-title" className="text-[26px] md:text-[32px]">
        My company: Innovaft
      </h2>
      <p className="mt-3 max-w-[720px] text-[16px] text-ink-soft">
        I am co-founder and CTO of Innovaft, a web development company and training institute in Hisar.
        Come to Innovaft for team projects, hosting and maintenance, or to learn web and app development
        in person. For direct work with me, use this site.
      </p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md border-2 border-ink/40 px-5 py-3 text-[13px] font-semibold uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link
            href="/learn"
            className="inline-block rounded-md border-2 border-ink/40 px-5 py-3 text-[13px] font-semibold uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Learn with me
          </Link>
        </li>
      </ul>
    </section>
  )
}
