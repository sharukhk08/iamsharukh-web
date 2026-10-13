import type { Metadata } from 'next'
import { CalendarDays, Mail, MapPin, MessageCircle } from 'lucide-react'
import EnquiryForm from '../contact-section/EnquiryForm'
import { BOOKING_URL, CONTACT_EMAIL } from '../lib/contact'
import { WHATSAPP_URL } from '../lib/courses'
import { JsonLd } from '../lib/jsonLd'
import { HISAR_OFFICE } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Sharukh Khan about a web or app project, or about learning with Innovaft. Send an enquiry, book a free call or message on WhatsApp.',
  alternates: { canonical: '/contact' },
}

type PageProps = { searchParams: Promise<{ service?: string | string[] }> }

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contact Sharukh Khan',
      url: `${SITE.url}/contact`,
      about: { '@id': `${SITE.url}/#person` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${SITE.url}/contact`,
        },
      ],
    },
  ],
}

const ways = [
  {
    icon: CalendarDays,
    title: 'Book a free call',
    text: '30 minutes to talk through your project.',
    href: BOOKING_URL,
    label: 'Open calendar',
    external: true,
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    text: 'Message the Innovaft number.',
    href: WHATSAPP_URL,
    label: 'Open WhatsApp',
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    text: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    label: 'Send an email',
    external: false,
  },
]

export default async function ContactPage({ searchParams }: PageProps) {
  const { service } = await searchParams
  const initialService = Array.isArray(service) ? service[0] : service

  return (
    <main className="mx-auto w-[90%] max-w-[1200px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />

      <h1 className="text-[36px] leading-tight md:text-[56px]">Contact</h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#95979D] md:text-[18px]">
        Have a project, or want to learn? Answer a few quick questions and I
        will reply with next steps. You can also use any of the options on the
        right.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <section
          aria-labelledby="enquiry-title"
          className="rounded-3xl bg-secondary p-6 md:p-8"
        >
          <h2 id="enquiry-title" className="mb-4 text-[24px]">
            Send an enquiry
          </h2>
          <EnquiryForm initialService={initialService} />
        </section>

        <aside className="space-y-4">
          {ways.map(({ icon: Icon, title, text, href, label, external }) => (
            <a
              key={title}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-start gap-4 rounded-3xl bg-secondary p-5 transition hover:bg-[#23262e]"
            >
              <span className="rounded-2xl bg-[#8b8fff]/15 p-3 text-[#8b8fff]">
                <Icon size={22} />
              </span>
              <span>
                <span className="block text-[18px] font-semibold">{title}</span>
                <span className="mt-1 block break-all text-[14px] text-[#95979D]">
                  {text}
                </span>
                <span className="mt-2 block text-[13px] underline underline-offset-2">
                  {label}
                </span>
              </span>
            </a>
          ))}

          <div className="flex items-start gap-4 rounded-3xl bg-secondary p-5">
            <span className="rounded-2xl bg-[#8b8fff]/15 p-3 text-[#8b8fff]">
              <MapPin size={22} />
            </span>
            <span>
              <span className="block text-[18px] font-semibold">Visit in Hisar</span>
              <span className="mt-1 block text-[14px] text-[#95979D]">
                {HISAR_OFFICE.name}, {HISAR_OFFICE.address}
              </span>
              <span className="mt-1 block text-[14px] text-[#95979D]">
                {HISAR_OFFICE.hours}
              </span>
            </span>
          </div>
        </aside>
      </div>
    </main>
  )
}
