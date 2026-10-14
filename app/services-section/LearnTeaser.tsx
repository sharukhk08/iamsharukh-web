import Link from 'next/link'
import CountUp from '../components/effects/CountUp'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { contactHref } from '../lib/contact'

const stats = [
  { to: 7, suffix: '', label: 'years of experience' },
  { to: 50, suffix: '+', label: 'students trained' },
  { to: 10, suffix: '', label: 'placed in jobs' },
]

const LearnTeaser = () => (
  <section
    className="relative z-10 flex w-full flex-col items-center bg-paper py-16 text-ink md:py-24"
    id="learn"
  >
    <div className="mx-auto w-[90%] lg:max-w-[1440px]">
      <SectionHeading
        title="Learn with me"
        intro="Mentoring and Innovaft courses in web and app development, taught in Hisar. Beginners welcome."
      />

      <Reveal>
        <dl className="mx-auto mt-12 grid max-w-[900px] grid-cols-3 gap-3 text-center md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col rounded-3xl bg-secondary p-4 md:p-6">
              <dt className="order-2 mt-1 text-[12px] uppercase text-ink-mute md:text-[14px]">
                {stat.label}
              </dt>
              <dd className="text-[34px] font-bold md:text-[56px]">
                <CountUp to={stat.to} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/learn"
          className="rounded-md border-2 border-ink bg-ink px-6 py-3 text-[14px] font-semibold uppercase text-paper transition-colors hover:bg-transparent hover:text-ink"
        >
          See the courses
        </Link>
        <Link
          href="/learn/hisar"
          className="rounded-md border-2 border-ink/40 px-6 py-3 text-[14px] font-semibold uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Courses in Hisar
        </Link>
        <Link
          href={contactHref('learning')}
          className="rounded-md border-2 border-ink/40 px-6 py-3 text-[14px] font-semibold uppercase transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Ask about a course
        </Link>
      </div>
    </div>
  </section>
)

export default LearnTeaser
