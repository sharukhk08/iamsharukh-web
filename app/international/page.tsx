import type { Metadata } from 'next'
import Link from 'next/link'
import InnovaftBand from '../components/InnovaftBand'
import PageBackdrop from '../components/PageBackdrop'
import RevealWords from '../components/effects/RevealWords'
import Magnet from '../components/effects/Magnet'
import { BOOKING_URL, contactHref } from '../lib/contact'
import { JsonLd, PERSON_ID } from '../lib/jsonLd'
import { pageMeta } from '../lib/seo'
import { services } from '../lib/services'
import { SITE } from '../lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Hire a Developer in India: International Clients',
  description:
    'How I work with clients outside India: time zones from London to Sydney, how a project runs, what to send me first, and how to book a free 30-minute call. Full-stack developer in Hisar, 7 years of experience.',
  path: '/international',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/international#page`,
      url: `${SITE.url}/international`,
      name: 'Working with international clients',
      about: { '@id': PERSON_ID },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'International clients', item: `${SITE.url}/international` },
      ],
    },
  ],
}

// Hisar is on India Standard Time (UTC+5:30), which has no daylight saving. The
// differences below are standard offsets; they shift by one hour when the other
// city changes its clocks. Only facts that can be calculated go here: no claims about
// availability hours, payment methods or contract terms, which the owner has not given.
const zones = [
  { city: 'Dubai', note: 'Hisar is 1.5 hours ahead all year' },
  { city: 'London', note: 'Hisar is 5.5 hours ahead in winter, 4.5 in summer' },
  { city: 'Berlin and most of Europe', note: 'Hisar is 4.5 hours ahead in winter, 3.5 in summer' },
  { city: 'New York', note: 'Hisar is 10.5 hours ahead in winter, 9.5 in summer' },
  { city: 'San Francisco', note: 'Hisar is 13.5 hours ahead in winter, 12.5 in summer' },
  { city: 'Sydney', note: 'Hisar is 5.5 hours behind from October to April, 4.5 behind from April to October' },
]

const steps = [
  { title: 'A short call', text: 'We talk through your goal, your users and your limits. You can book a free 30-minute call at a time that suits you.' },
  { title: 'A written plan', text: 'I send a plan with scope and milestones before any code is written, so you know what you are getting.' },
  { title: 'Build with previews', text: 'I build in short steps and share a preview link, so you can see progress on your own phone or laptop without waiting for the end.' },
  { title: 'Launch and handover', text: 'I launch, hand over the code and documentation, and stay available for fixes.' },
]

const faqs = [
  {
    q: 'Do you work in my time zone?',
    a: 'I am in India Standard Time. Most of the project happens through written updates and preview links, and we meet on calls at times that suit both of us. The table above shows the gap for common cities.',
  },
  {
    q: 'Is it a problem that you are in India?',
    a: 'The process is built for distance: a written plan, regular previews and one person responsible for the whole build. I also work with clients across Haryana, so the same process applies wherever you are.',
  },
  {
    q: 'Can I see your work and who is behind it?',
    a: 'Yes. See my selected work, my GitHub, LinkedIn and Contra profiles, and the About page. I only quote results I can show.',
  },
  {
    q: 'What about contracts, NDAs, invoices and payment?',
    a: 'Scope and price are agreed in writing in the plan before work starts. If you need an NDA or a specific payment method, tell me on the first call and we will agree how to handle it.',
  },
  {
    q: 'What should I send first?',
    a: 'Your goal, who it is for, any Figma file or reference sites, and your deadline. A short message is enough; I will ask for the rest.',
  },
]

export default function InternationalPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1100px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />
      <PageBackdrop />

      <p className="text-[14px] text-[#c9c4bd]">
        <Link href="/" className="hover:underline">
          Home
        </Link>{' '}
        / International clients
      </p>
      <h1 className="mt-4 max-w-[900px] text-[36px] leading-tight md:text-[56px]">
        <RevealWords text="Working with international clients" />
      </h1>
      <p className="mt-6 max-w-[780px] text-[18px] leading-relaxed text-[#c9c4bd]">
        I am a full-stack developer based in Hisar, Haryana, India, with 7 years of experience building
        websites, web apps, mobile apps and automations. I work with clients outside India, and this
        page explains how a project runs when we are in different countries.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Magnet>
          <Link
            href={contactHref()}
            className="inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
          >
            Tell me about your project
          </Link>
        </Magnet>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border-2 border-[#e4ded7]/40 px-6 py-3 text-[14px] font-semibold uppercase text-[#e4ded7] transition-colors hover:border-[#e4ded7] hover:bg-[#e4ded7] hover:text-[#0E1016]"
        >
          Book a free 30-minute call
        </a>
      </div>

      <section className="mt-16" aria-labelledby="how-title">
        <h2 id="how-title" className="text-[28px] md:text-[40px]">
          How a project runs
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-secondary p-6 md:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-[#c9c4bd]">
                Step {index + 1}
              </p>
              <h3 className="mt-1 text-[20px] md:text-[24px]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#c9c4bd]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="zones-title">
        <h2 id="zones-title" className="text-[28px] md:text-[40px]">
          Time zones
        </h2>
        <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-[#c9c4bd]">
          Hisar uses India Standard Time (UTC+5:30), which does not change with the seasons. The gap to
          your city changes by an hour when your clocks change.
        </p>
        <ul className="mt-6 divide-y divide-[#e4ded7]/15 rounded-3xl bg-secondary px-6 md:px-8">
          {zones.map((zone) => (
            <li key={zone.city} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
              <span className="font-semibold">{zone.city}</span>
              <span className="text-[15px] text-[#c9c4bd]">{zone.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="build-title">
        <h2 id="build-title" className="text-[28px] md:text-[40px]">
          What I build
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block rounded-2xl bg-secondary px-5 py-4 text-[16px] transition-colors hover:bg-[#23262e]"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-[28px] md:text-[40px]">
          Questions clients ask
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl bg-secondary px-5 py-4">
              <summary className="cursor-pointer text-[17px] font-semibold">{faq.q}</summary>
              <p className="mt-3 text-[15px] leading-relaxed text-[#c9c4bd]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <InnovaftBand className="mt-16" />

      <section className="mt-8 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">Ready when you are</h2>
        <p className="mt-3 max-w-[600px] text-[16px] text-[#c9c4bd]">
          Send a short message or book a call, and I will reply with next steps.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={contactHref()}
            className="rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
          >
            Send an enquiry
          </Link>
          <Link href="/about" className="px-2 py-3 text-[14px] font-semibold uppercase underline underline-offset-4">
            About me
          </Link>
        </div>
      </section>
    </main>
  )
}
