import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Link from 'next/link'
import { Check } from 'lucide-react'
import CountUp from '../components/effects/CountUp'
import InnovaftBand from '../components/InnovaftBand'
import Magnet from '../components/effects/Magnet'
import ShapeWaves from '../components/effects/ShapeWaves'
import RevealWords from '../components/effects/RevealWords'
import SpotlightCard from '../components/effects/SpotlightCard'
import IconBadge from '../components/IconBadge'
import Reveal from '../components/Reveal'
import { COURSE_ICONS } from '../lib/icons'
import { LearnIllustration } from '../components/Illustrations'
import { contactHref } from '../lib/contact'
import { courses } from '../lib/courses'
import { JsonLd } from '../lib/jsonLd'
import { HISAR_OFFICE } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Learn: Mentoring & Innovaft Courses in Hisar',
  description:
    'Learn web and app development in Hisar with Innovaft: UI/UX, frontend, backend, full stack, mobile and AI automation, with mentoring from a 7-year developer.',
  path: '/learn',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Learn',
          item: `${SITE.url}/learn`,
        },
      ],
    },
    ...courses.map((course) => ({
      '@type': 'Course',
      name: course.name,
      description: course.summary,
      provider: { '@type': 'Organization', '@id': `${SITE.url}/#innovaft`, name: SITE.company.name, url: SITE.company.url },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        location: {
          '@type': 'Place',
          name: 'Innovaft, Hisar',
          address: { '@type': 'PostalAddress', addressLocality: 'Hisar', addressRegion: 'Haryana', addressCountry: 'IN' },
        },
      },
    })),
  ],
}

const faqs = [
  {
    q: 'Do I need any experience?',
    a: 'No. The courses are designed for beginners and also work if you want to build on skills you already have.',
  },
  {
    q: 'Are classes online or in person?',
    a: 'Classes are in person at the Innovaft centre in Hisar, with online support when you need it.',
  },
  {
    q: 'Can I try a class first?',
    a: 'Yes. Innovaft offers a free first class and a free demo, so you can meet the mentors and see how it works before deciding.',
  },
  {
    q: 'What if I find it hard to keep up?',
    a: 'Tell us early. We look at where you are stuck and adjust, and if the path is not right for you, we help you work out a better direction.',
  },
]

export default function LearnPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[1440px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />
      {/* Positioned against the page shell; fades out so text stays readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] opacity-25 [mask-image:linear-gradient(to_bottom,#000_25%,transparent_95%)]"
      >
        <ShapeWaves className="h-full w-full" />
      </div>

      <div className="mt-4 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="max-w-[900px] text-[36px] leading-tight md:text-[56px]">
            <RevealWords text="Learn web and app development with real mentoring" />
          </h1>
          <p className="mt-6 max-w-[780px] text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
            I am a full-stack developer with 7 years of experience, and I handle
            the classes and mentoring at Innovaft in Hisar. I have trained 50+
            students, and 10 of them have been placed in jobs. Whether you are
            starting from zero or changing direction, the goal is a clear path and
            real projects you can show.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnet>
              <Link
                href={contactHref('learning')}
                className="inline-block rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
              >
                Ask about a course
              </Link>
            </Magnet>
          </div>
        </div>
        <div>
          <LearnIllustration />
        </div>
      </div>

      <Reveal>
        <dl className="mt-14 grid grid-cols-3 gap-4 text-center">
          {[
            { to: 7, suffix: '', label: 'years of experience' },
            { to: 50, suffix: '+', label: 'students trained' },
            { to: 10, suffix: '', label: 'placed in jobs' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col rounded-3xl bg-secondary p-4 md:p-6">
              <dt className="order-2 mt-1 text-[12px] text-[#95979D] md:text-[14px]">
                {stat.label}
              </dt>
              <dd className="text-[34px] font-bold text-[#e4ded7] md:text-[52px]">
                <CountUp to={stat.to} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
      <section className="mt-16">
        <h2 className="text-[26px] md:text-[32px]">Courses</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug}>
              <SpotlightCard className="h-full rounded-3xl bg-secondary p-6">
                {(() => {
                  const Icon = COURSE_ICONS[course.slug]
                  return Icon ? <IconBadge icon={Icon} /> : null
                })()}
                <h3 className="mt-4 text-[20px]">{course.name}</h3>
                <p className="mt-2 text-[15px] text-[#c9c4bd]">
                  {course.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-[#e4ded7]/30 px-3 py-1 text-[13px]"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-[#95979D]">
          Ask for the current syllabus, schedule and fees for each course.
        </p>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">How learning works</h2>
          <ul className="mt-4 space-y-3 text-[15px] text-[#c9c4bd]">
            {[
              'In-person classes in Hisar, with online support',
              'Hands-on projects, not just theory',
              'Mentor support when you get stuck',
              'Job assistance: resume building, LinkedIn, mock interviews and a portfolio',
              'A completion certificate',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#c9c4bd]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">Not sure what to do next?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#c9c4bd]">
            Many people come after school or college without a clear path. You
            do not need to decide before you talk to us. Come to a free first
            class, sit with the mentors and ask every question. And if you have
            started something and are finding it hard, we will help you work
            out whether to change the pace or the direction. No pressure.
          </p>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16">
        <h2 className="text-[26px] md:text-[32px]">Questions</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="text-[18px] font-semibold">{faq.q}</dt>
              <dd className="mt-2 max-w-[760px] text-[15px] text-[#c9c4bd]">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      </Reveal>

      <Reveal>
      <section className="mt-16 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">Visit or get in touch</h2>
        <p className="mt-3 text-[16px] text-[#c9c4bd]">
          {HISAR_OFFICE.name}, {HISAR_OFFICE.address}
        </p>
        <p className="mt-1 text-[16px] text-[#c9c4bd]">{HISAR_OFFICE.hours}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={contactHref('learning')}
            className="rounded-md border-2 border-[#e4ded7] bg-[#e4ded7] px-6 py-3 text-[14px] font-semibold uppercase text-[#0E1016] transition-colors hover:bg-transparent hover:text-[#e4ded7]"
          >
            Send an enquiry
          </Link>
        </div>
      </section>
      </Reveal>
      <section className="mt-12 rounded-3xl bg-secondary p-6 md:p-8">
        <h2 className="text-[22px]">Find a course near you</h2>
        <ul className="mt-4 space-y-2 text-[15px]">
          <li>
            <Link href="/learn/hisar" className="underline underline-offset-2">
              Web development and coding courses in Hisar
            </Link>
          </li>
          <li>
            <Link href="/learn/haryana" className="underline underline-offset-2">
              Learn web development from Hansi, Bhiwani, Rohtak and across Haryana
            </Link>
          </li>
        </ul>
      </section>

      <InnovaftBand className="mt-8" />
    </main>
  )
}
