import type { Metadata } from 'next'
import Link from 'next/link'
import { contactHref } from '../lib/contact'
import { WHATSAPP_URL, courses } from '../lib/courses'
import { JsonLd } from '../lib/jsonLd'
import { HISAR_OFFICE } from '../lib/locations'
import { SITE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Learn: Mentoring & Innovaft Courses in Hisar',
  description:
    'Learn web and app development in Hisar with Innovaft: UI/UX, frontend, backend, full stack, mobile and WordPress courses, with mentoring from a developer with 7 years of experience.',
  alternates: { canonical: '/learn' },
}

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
      provider: {
        '@type': 'Organization',
        name: SITE.company.name,
        url: SITE.company.url,
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
    <main className="mx-auto w-[90%] max-w-[1200px] pt-10 md:pt-16">
      <JsonLd data={jsonLd} />

      <h1 className="max-w-[900px] text-[36px] leading-tight md:text-[56px]">
        Learn web and app development with real mentoring
      </h1>
      <p className="mt-6 max-w-[780px] text-[16px] leading-relaxed text-[#c9c4bd] md:text-[18px]">
        I am a full-stack developer with 7 years of experience, and I handle
        the classes and mentoring at Innovaft in Hisar. I have trained 50+
        students, and 10 of them have been placed in jobs. Whether you are
        starting from zero or changing direction, the goal is a clear path and
        real projects you can show.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={contactHref('learning')}
          className="rounded-full bg-[#e4ded7] px-6 py-3 font-semibold text-primary"
        >
          Ask about a course
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#e4ded7]/40 px-6 py-3 font-semibold"
        >
          Message on WhatsApp
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-[26px] md:text-[32px]">Courses</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <li key={course.slug} className="rounded-3xl bg-secondary p-6">
              <h3 className="text-[20px]">{course.name}</h3>
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
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[14px] text-[#95979D]">
          Ask for the current syllabus, schedule and fees for each course.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-secondary p-6 md:p-8">
          <h2 className="text-[22px]">How learning works</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-[#c9c4bd]">
            <li>In-person classes in Hisar, with online support</li>
            <li>Hands-on projects, not just theory</li>
            <li>Mentor support when you get stuck</li>
            <li>
              Job assistance: resume building, LinkedIn, mock interviews and a
              portfolio
            </li>
            <li>A completion certificate</li>
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

      <section className="mt-16 rounded-3xl bg-secondary p-8 md:p-12">
        <h2 className="text-[26px] md:text-[32px]">Visit or get in touch</h2>
        <p className="mt-3 text-[16px] text-[#c9c4bd]">
          {HISAR_OFFICE.name}, {HISAR_OFFICE.address}
        </p>
        <p className="mt-1 text-[16px] text-[#c9c4bd]">{HISAR_OFFICE.hours}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={contactHref('learning')}
            className="rounded-full bg-[#e4ded7] px-6 py-3 font-semibold text-primary"
          >
            Send an enquiry
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#e4ded7]/40 px-6 py-3 font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
