import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import { CalendarDays, Mail, MapPin } from 'lucide-react'
import ContactForm from '../contact-section/ContactForm'
import RevealWords from '../components/effects/RevealWords'
import PageBackdrop from '../components/PageBackdrop'
import ProcessTrace from '../components/effects/ProcessTrace'
import RevealEmail from '../components/RevealEmail'
import SocialLinks from '../components/SocialLinks'
import { BOOKING_URL } from '../lib/contact'
import { JsonLd } from '../lib/jsonLd'
import { HISAR_OFFICE } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Sharukh Khan about a web or app project, or about learning with Innovaft. Send an enquiry, book a free call or send an email.',
  path: '/contact',
})

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
]

export default function ContactPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />
      <PageBackdrop />

      <h1 className="text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Contact" />
      </h1>
      <p className="mt-4 max-w-[680px] text-[16px] text-[#c9c4bd] md:text-[18px]">
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
          <ContactForm />
        </section>

        <aside className="space-y-4">
          <ProcessTrace
            title="What happens after you send this"
            steps={[
              'I read your message',
              'I reply with questions or next steps',
              'We agree the scope and a plan',
              'I build and keep you updated',
              'Launch, handover and support',
            ]}
          />
          {ways.map(({ icon: Icon, title, text, href, label, external }) => (
            <a
              key={title}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-start gap-4 rounded-3xl bg-secondary p-5 transition hover:bg-[#23262e]"
            >
              <span className="rounded-2xl bg-[#e4ded7]/10 p-3 text-[#e4ded7]">
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
            <span className="rounded-2xl bg-[#e4ded7]/10 p-3 text-[#e4ded7]">
              <Mail size={22} />
            </span>
            <span>
              <span className="block text-[18px] font-semibold">Email</span>
              <span className="mt-1 block text-[14px] text-[#95979D]">
                The form above is the fastest way to reach me.
              </span>
              <RevealEmail className="mt-2 block text-[13px]" />
            </span>
          </div>

          <div className="rounded-3xl bg-secondary p-5">
            <p className="text-[18px] font-semibold">Find me online</p>
            <SocialLinks className="mt-3" />
          </div>

          <div className="flex items-start gap-4 rounded-3xl bg-secondary p-5">
            <span className="rounded-2xl bg-[#e4ded7]/10 p-3 text-[#e4ded7]">
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
