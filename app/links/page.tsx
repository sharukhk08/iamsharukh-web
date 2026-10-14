import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Link from 'next/link'
import PageBackdrop from '../components/PageBackdrop'
import RevealWords from '../components/effects/RevealWords'
import { BOOKING_URL } from '../lib/contact'
import { SITE } from '../lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Links',
  description:
    'All official links for Sharukh Khan: website sections, GitHub, LinkedIn, Contra, Instagram, X, and Innovaft.',
  path: '/links',
})

const groups = [
  {
    title: 'This website',
    links: [
      { label: 'Services', text: 'What I build and fix', href: '/services' },
      { label: 'Work', text: 'Selected projects', href: '/work' },
      { label: 'Learn', text: 'Mentoring and courses in Hisar', href: '/learn' },
      { label: 'International clients', text: 'How I work across time zones', href: '/international' },
      { label: 'Blog', text: 'Practical notes', href: '/blog' },
      { label: 'Contact', text: 'Start a project or ask a question', href: '/contact' },
      { label: 'Book a free call', text: '30 minutes on Cal.com', href: BOOKING_URL },
    ],
  },
  {
    title: 'Profiles',
    links: [
      { label: 'GitHub', text: 'Code', href: SITE.sameAs[0] },
      { label: 'LinkedIn', text: 'Experience and posts', href: SITE.sameAs[1] },
      { label: 'Contra', text: 'Freelance profile', href: SITE.sameAs[2] },
      { label: 'Instagram', text: 'Behind the scenes', href: SITE.sameAs[3] },
      { label: 'X', text: 'Updates', href: SITE.sameAs[4] },
    ],
  },
  {
    title: 'Innovaft',
    links: [
      { label: 'Innovaft', text: 'Web development company in Hisar', href: 'https://innovaft.com/' },
      { label: 'Innovaft portfolio', text: 'Team projects', href: 'https://innovaft.com/portfolio' },
      { label: 'Innovaft courses', text: 'In-person training', href: 'https://learn.innovaft.com/our-courses' },
      { label: 'Free demo class', text: 'Book a first class', href: 'https://innovaft.com/book-a-free-demo' },
    ],
  },
]

// A single page to put in profile bios (Instagram, LinkedIn, X, GitHub) so every
// profile points to the same address, and visitors can reach everything in one tap.
export default function LinksPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[760px] pt-10 md:pt-16">
      <PageBackdrop />
      <h1 className="text-[40px] leading-tight md:text-[64px]">
        <RevealWords text="Sharukh Khan" />
      </h1>
      <p className="mt-3 text-[16px] text-[#c9c4bd]">
        Full-stack developer and software engineer in Hisar, Haryana. Co-founder and CTO of Innovaft.
      </p>

      {groups.map((group) => (
        <section key={group.title} className="mt-10">
          <h2 className="text-[20px] uppercase tracking-wide text-[#95979D]">{group.title}</h2>
          <ul className="mt-3 space-y-3">
            {group.links.map((link) => {
              const external = /^https?:/.test(link.href)
              const classes =
                'block rounded-2xl bg-secondary px-5 py-4 transition-colors hover:bg-[#23262e]'
              const body = (
                <>
                  <span className="block text-[18px] font-semibold">{link.label}</span>
                  <span className="block text-[14px] text-[#95979D]">{link.text}</span>
                </>
              )
              return (
                <li key={link.href}>
                  {external ? (
                    <a href={link.href} target="_blank" rel="me noopener noreferrer" className={classes}>
                      {body}
                    </a>
                  ) : (
                    <Link href={link.href} className={classes}>
                      {body}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}
