import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import InnovaftBand from '../../components/InnovaftBand'
import PageBackdrop from '../../components/PageBackdrop'
import ShareButtons from '../../components/ShareButtons'
import Reveal from '../../components/Reveal'
import RevealWords from '../../components/effects/RevealWords'
import { contactHref } from '../../lib/contact'
import { courses } from '../../lib/courses'
import { JsonLd } from '../../lib/jsonLd'
import { getLearnPage, learnPages } from '../../lib/learnPages'
import { HISAR_OFFICE } from '../../lib/locations'
import { pageMeta } from '../../lib/seo'
import { SITE } from '../../lib/site'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return learnPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = getLearnPage(slug)
  if (!page) return {}
  return pageMeta({
    ownImage: true,
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/learn/${page.slug}`,
  })
}

export default async function LearnLocationPage({ params }: PageProps) {
  const { slug } = await params
  const page = getLearnPage(slug)
  if (!page) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/learn/${page.slug}#page`,
        url: `${SITE.url}/learn/${page.slug}`,
        name: page.metaTitle,
        description: page.metaDescription,
        about: { '@id': `${SITE.url}/#innovaft` },
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Learn', item: `${SITE.url}/learn` },
          { '@type': 'ListItem', position: 3, name: page.metaTitle, item: `${SITE.url}/learn/${page.slug}` },
        ],
      },
    ],
  }
  const others = learnPages.filter((item) => item.slug !== page.slug)

  return (
    <main className="mx-auto w-[90%] max-w-[1100px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />
      <PageBackdrop />

      <p className="text-[14px] text-ink-soft">
        <Link href="/learn" className="hover:underline">
          Learn
        </Link>{' '}
        / {page.metaTitle}
      </p>
      <h1 className="h1-compact mt-4 text-[36px] leading-tight md:text-[56px]">
        <RevealWords text={page.h1} />
      </h1>
      <p className="mt-6 max-w-[800px] text-[18px] leading-relaxed text-ink-soft">{page.intro}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={contactHref('learning')}
          className="rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
        >
          Book a free first class
        </Link>
        <Link
          href="/learn"
          className="rounded-md border-2 border-ink/40 px-6 py-3 text-[14px] font-semibold uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          See all courses
        </Link>
      </div>

      {page.sections.map((section) => (
        <Reveal key={section.heading} className="mt-14">
          <section>
            <h2 className="text-[26px] md:text-[32px]">{section.heading}</h2>
            <div className="mt-4 max-w-[800px] space-y-4 text-[16px] leading-relaxed text-ink-soft">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </Reveal>
      ))}

      <Reveal className="mt-14">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug} className="rounded-3xl bg-secondary p-5">
              <h3 className="text-[18px]">{course.name}</h3>
              <p className="mt-2 text-[14px] text-ink-soft">{course.summary}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14">
        <section>
          <h2 className="text-[26px] md:text-[32px]">Questions</h2>
          <dl className="mt-6 space-y-6">
            {page.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="text-[18px] font-semibold">{faq.q}</dt>
                <dd className="mt-2 max-w-[760px] text-[15px] text-ink-soft">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal className="mt-14">
        <section className="rounded-3xl bg-secondary p-8 md:p-12">
          <h2 className="text-[26px] md:text-[32px]">Visit or get in touch</h2>
          <p className="mt-3 text-[16px] text-ink-soft">
            {HISAR_OFFICE.name}, {HISAR_OFFICE.address}. {HISAR_OFFICE.hours}.
          </p>
          <Link
            href={contactHref('learning')}
            className="mt-6 inline-block rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Send an enquiry
          </Link>
        </section>
      </Reveal>

      <ShareButtons url={`${SITE.url}/learn/${page.slug}`} title={page.metaTitle} text={page.metaDescription} />

      <InnovaftBand className="mt-8" />

      <section className="mt-10">
        <h2 className="text-[20px]">More</h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/learn/${item.slug}`}
                className="inline-block rounded-full border border-ink/30 px-4 py-2 text-[14px] hover:bg-secondary"
              >
                {item.metaTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
