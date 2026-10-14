import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Reveal from '../../components/Reveal'
import { BOOKING_URL, contactHref } from '../../lib/contact'
import { getProject, getProjects, hasFullDetails } from '../../lib/projects'
import { JsonLd } from '../../lib/jsonLd'
import { SITE } from '../../lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getProjects().map((study) => ({ slug: study.slug }))
}

// Keep meta descriptions short enough for Google to show in full.
const metaDescription = (text: string, max = 155) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max).replace(/\s+\S*$/, '')
  return `${cut}...`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getProject(slug)
  if (!study) return {}

  return {
    title: `${study.name} case study`,
    description: metaDescription(study.summary),
    alternates: { canonical: `/work/${study.slug}` },
    // Pages without a confirmed challenge, solution and outcome stay out of Google.
    robots: hasFullDetails(study) ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${study.name} | ${SITE.name}`,
      description: metaDescription(study.summary),
      url: `${SITE.url}/work/${study.slug}`,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const study = getProject(slug)
  if (!study) notFound()

  const url = `${SITE.url}/work/${study.slug}`
  const work = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.name,
    description: study.summary,
    url,
    creator: { '@id': `${SITE.url}/#person` },
    keywords: study.technologies.join(', '),
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE.url}/work` },
      { '@type': 'ListItem', position: 3, name: study.name, item: url },
    ],
  }

  const sections = [
    ['The challenge', study.challenge],
    ['What I built', study.solution],
    ['The outcome', study.outcome],
  ] as const

  return (
    <main className="mx-auto w-[90%] max-w-[1000px] pt-10 md:pt-16">
      <JsonLd data={work} />
      <JsonLd data={breadcrumb} />

      <p className="text-[14px] text-[#c9c4bd]">
        <Link href="/work" className="hover:underline">
          Work
        </Link>{' '}
        / {study.name}
      </p>
      <h1 className="mt-4 text-[36px] leading-tight md:text-[56px]">{study.name}</h1>
      <p className="mt-4 max-w-[760px] text-[18px] text-[#c9c4bd]">{study.summary}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {study.technologies.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-[#e4ded7]/30 px-4 py-2 text-[14px]"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(study.liveUrl || study.repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
            >
              View live site
            </a>
          )}
          {study.repoUrl && (
            <a
              href={study.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-[#e4ded7]/40 px-6 py-3 text-[14px] font-semibold uppercase text-[#e4ded7] transition-colors hover:border-[#e4ded7] hover:bg-[#e4ded7] hover:text-[#0E1016]"
            >
              View code
            </a>
          )}
        </div>
      )}

      <Reveal className="mt-10">
        <Image
          src={study.cover}
          alt={`${study.name} screenshot`}
          className="w-full rounded-3xl"
          sizes="(max-width: 1000px) 90vw, 1000px"
          priority
        />
      </Reveal>

      {study.shots.length > 0 && (
        <Reveal className="mt-10">
          <ul className="grid gap-4 md:grid-cols-2">
            {study.shots.map((shot, index) => (
              <li key={shot.src}>
                <Image
                  src={shot}
                  alt={`${study.name} screenshot ${index + 2}`}
                  className="w-full rounded-3xl"
                  sizes="(max-width: 768px) 90vw, 500px"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {sections.map(
        ([heading, text]) =>
          text && (
            <Reveal key={heading} className="mt-12">
              <h2 className="text-[26px] md:text-[32px]">{heading}</h2>
              <p className="mt-3 max-w-[760px] text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
                {text}
              </p>
            </Reveal>
          ),
      )}

      <Reveal className="mt-16">
        <section className="rounded-3xl bg-secondary p-8 md:p-12">
          <h2 className="text-[26px] md:text-[32px]">Want something like this?</h2>
          <p className="mt-3 max-w-[600px] text-[16px] text-[#c9c4bd]">
            Tell me about your project and I will reply with next steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={contactHref()}
              className="rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
            >
              Send an enquiry
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-[#e4ded7]/40 px-6 py-3 text-[14px] font-semibold uppercase text-[#e4ded7] transition-colors hover:border-[#e4ded7] hover:bg-[#e4ded7] hover:text-[#0E1016]"
            >
              Book a free 30-minute call
            </a>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
