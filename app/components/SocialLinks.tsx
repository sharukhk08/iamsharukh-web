import { SITE } from '../lib/site'

const links = [
  { label: 'GitHub', href: SITE.sameAs[0] },
  { label: 'LinkedIn', href: SITE.sameAs[1] },
  { label: 'Contra', href: SITE.sameAs[2] },
  { label: 'Instagram', href: SITE.sameAs[3] },
  { label: 'X', href: SITE.sameAs[4] },
  { label: 'Innovaft', href: SITE.company.url },
]

// rel="me" tells search engines these profiles belong to the same person, which
// supports the sameAs data in the page's structured data.
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-block rounded-md border-2 border-[#e4ded7]/30 px-3 py-1.5 text-[12px] font-semibold uppercase text-[#e4ded7] transition-colors hover:border-[#e4ded7] hover:bg-[#e4ded7] hover:text-[#0E1016]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
