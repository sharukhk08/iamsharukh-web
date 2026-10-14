import Link from 'next/link'
import Marquee from '../components/effects/Marquee'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import ServiceCtaCard from '../components/ServiceCtaCard'
import { services } from '../lib/services'
import { STACK } from '../lib/stack'

const ServicesSection = () => {
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center bg-primary py-16 text-[#e4ded7] md:py-20"
      id="services"
    >
      <div className="mx-auto w-[90%] lg:max-w-[1440px]">
        <SectionHeading
          title="What I can build for you"
          intro="Websites, web apps and mobile apps with Next.js, React and React Native. Choose a service to see what is included."
        />

        <div className="mt-10">
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
          <li>
            <Reveal delay={(services.length % 3) * 80} className="h-full">
              <ServiceCtaCard variant="all" />
            </Reveal>
          </li>
        </ul>

        <p className="mt-8 text-center text-[14px] font-semibold uppercase text-[#c9c4bd]">
          <Link href="/services" className="underline underline-offset-2 hover:no-underline">
            See all services
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ServicesSection
