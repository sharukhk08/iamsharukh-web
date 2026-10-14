import { journey } from '../lib/journey'
import CountUp from './effects/CountUp'
import IconBadge from './IconBadge'
import Reveal from './Reveal'

const STATS = [
  { to: 7, suffix: '', label: 'years as a developer' },
  { to: 50, suffix: '+', label: 'students trained' },
  { to: 10, suffix: '', label: 'students placed' },
]

// A vertical timeline with a line that connects the steps. Content comes from
// app/lib/journey.ts so a new chapter is one entry in that list.
export default function Journey() {
  return (
    <section className="mt-16" aria-labelledby="journey-title">
      <h2 id="journey-title" className="text-[28px] md:text-[40px]">
        My journey
      </h2>
      <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-[#c9c4bd]">
        From learning to code to building software for clients, starting a company in Hisar and
        teaching the next group of developers.
      </p>

      <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col rounded-3xl bg-secondary p-3 text-center sm:p-6">
            <dt className="order-2 mt-1 text-[11px] uppercase tracking-wide text-[#c9c4bd] sm:text-[13px]">
              {stat.label}
            </dt>
            <dd className="order-1 text-[32px] font-semibold md:text-[56px]">
              <CountUp to={stat.to} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <ol className="relative mt-10 space-y-6 border-l border-[#e4ded7]/20 pl-8 md:pl-12">
        {journey.map((step, index) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-6 h-3 w-3 rounded-full border-2 border-[#e4ded7] bg-[#0E1016] md:-left-[57px]"
            />
            <Reveal delay={(index % 3) * 80}>
              <div className="flex gap-4 rounded-3xl bg-secondary p-6 md:p-8">
                <IconBadge icon={step.icon} className="self-start" />
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[#c9c4bd]">
                    {step.label}
                  </p>
                  <h3 className="mt-1 text-[20px] md:text-[24px]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#c9c4bd]">{step.text}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
