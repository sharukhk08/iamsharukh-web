import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Image from 'next/image'
import Link from 'next/link'
import InnovaftBand from '../components/InnovaftBand'
import Journey from '../components/Journey'
import PageBackdrop from '../components/PageBackdrop'
import RevealWords from '../components/effects/RevealWords'
import SocialLinks from '../components/SocialLinks'
import { contactHref } from '../lib/contact'
import { JsonLd, PERSON_ID } from '../lib/jsonLd'
import { services } from '../lib/services'
import { SITE } from '../lib/site'
import { STACK } from '../lib/stack'
import profile from '../../public/sharukh-image.jpeg'

export const metadata: Metadata = pageMeta({
  title: 'About Sharukh Khan',
  description:
    'Sharukh Khan is a full-stack developer in Hisar, Haryana with 7 years of experience, co-founder and CTO of Innovaft, and a mentor who has trained 50+ students.',
  path: '/about',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE.url}/about#profile`,
      url: `${SITE.url}/about`,
      name: 'About Sharukh Khan',
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE.url}/about` },
      ],
    },
  ],
}

// Who, how and why: Google's people-first guidance asks sites to say who is behind
// the content and why they can speak on it. Every claim here is one the owner confirmed.
export default function AboutPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />
      <PageBackdrop />

      <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-[36px] leading-tight md:text-[56px]">
            <RevealWords text="About Sharukh Khan" />
          </h1>
          <p className="mt-6 max-w-[760px] text-[18px] leading-relaxed text-ink-soft">
            I am a full-stack developer and software engineer based in Hisar, Haryana. I have 7 years of
            experience building websites, web apps, mobile apps and automations for businesses in Haryana
            and around the world, and I am co-founder and CTO of Innovaft.
          </p>
        </div>
        <Image
          src={profile}
          alt="Sharukh Khan"
          priority
          sizes="(min-width: 1024px) 380px, 80vw"
          className="mx-auto w-[70%] max-w-[380px] rounded-3xl object-cover grayscale lg:w-full"
        />
      </div>

      <Journey />

      <section className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[24px]">What I do</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            I design, build and fix web and mobile products, from Figma to a launched app. I work across
            the whole stack, so one person is responsible from the first conversation to the last bug.
          </p>
          <ul className="mt-4 space-y-2 text-[15px]">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="underline underline-offset-2">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[24px]">How I work</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-ink-soft">
            <li>We talk through your goal, your users and your limits.</li>
            <li>I send a plan with scope and milestones before any code is written.</li>
            <li>I build in short steps and share a preview link so you can see progress.</li>
            <li>I launch, hand over the code and documentation, and stay available for fixes.</li>
          </ol>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            I tell you honestly when something is not worth building, and I only quote results I can
            show.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[24px]">Experience and teaching</h2>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-soft">
            <li>7 years working as a developer.</li>
            <li>Co-founder and CTO of Innovaft in Hisar, leading the technical side of client projects.</li>
            <li>
              Mentor and teacher at Innovaft: 50+ students trained, 10 placed in jobs.{' '}
              <Link href="/learn" className="underline underline-offset-2">
                See the courses
              </Link>
              .
            </li>
          </ul>
        </div>
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[24px]">Tools I use</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <li key={tech} className="rounded-full border border-ink/30 px-3 py-1 text-[13px]">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InnovaftBand className="mt-8" />

      <section className="mt-8 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">Let&apos;s talk</h2>
        <p className="mt-3 max-w-[600px] text-[16px] text-ink-soft">
          Tell me about your project or your learning goals and I will reply with next steps.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={contactHref()}
            className="rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Send an enquiry
          </Link>
        </div>
        <SocialLinks className="mt-6" />
      </section>
    </main>
  )
}
