import Link from 'next/link'
import Marquee from '../components/effects/Marquee'
import Reveal from '../components/Reveal'
import ServiceCard from '../components/ServiceCard'
import { locations } from '../lib/locations'
import { services } from '../lib/services'
import { STACK } from '../lib/stack'

const ServicesSection = () => {
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center bg-primary py-16 text-[#e4ded7] md:py-20"
      id="services"
    >
      <div className="mx-auto w-[90%] lg:max-w-[1440px]">
        <h2 className="text-[36px] leading-tight md:text-[48px] lg:text-[64px]">
          What I can build for you
        </h2>
        <p className="mt-4 max-w-[680px] text-[16px] text-[#c9c4bd] md:text-[18px]">
          Websites, web apps and mobile apps with Next.js, React and React
          Native. Choose a service to see what is included.
        </p>

        <div className="mt-8">
          <Marquee
            items={STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#e4ded7]/25 px-4 py-2 text-[14px] text-[#c9c4bd]"
              >
                {tech}
              </span>
            ))}
          />
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Reveal delay={(index % 3) * 80} className="h-full">
                <ServiceCard
                  slug={service.slug}
                  title={service.title}
                  tagline={service.tagline}
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[14px] text-[#95979D]">
          Want to learn instead?{' '}
          <Link
            href="/learn"
            className="underline underline-offset-2 hover:no-underline"
          >
            See mentoring and Innovaft courses
          </Link>
          .
        </p>

        <p className="mt-3 text-[14px] text-[#95979D]">
          Based in Hisar, Haryana, working with clients worldwide:{' '}
          {locations.map((location, index) => (
            <span key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="underline underline-offset-2 hover:no-underline"
              >
                {location.name}
              </Link>
              {index < locations.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default ServicesSection
