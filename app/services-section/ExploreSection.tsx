import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  LayoutTemplate,
  Mail,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'
import IconBadge from '../components/IconBadge'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/effects/SpotlightCard'
import { monaSans } from '../fonts/monaSans'

// A map of the whole site, so every page is reachable from the home page.
const destinations = [
  { href: '/services', title: 'Services', text: 'Figma to Next.js, dashboards, full-stack and mobile apps, AI-built app cleanup.', icon: LayoutTemplate },
  { href: '/work', title: 'Work', text: 'Selected projects and case studies.', icon: Briefcase },
  { href: '/learn', title: 'Learn', text: 'Mentoring and Innovaft courses.', icon: GraduationCap },
  { href: '/locations', title: 'Locations', text: 'Hisar, Hansi, Bhiwani, Rohtak, Haryana and clients worldwide.', icon: MapPin },
  { href: '/blog', title: 'Blog', text: 'Notes on Next.js, Figma and AI-built apps.', icon: BookOpen },
  { href: '/contact', title: 'Contact', text: 'Start a project or ask about a course.', icon: Mail },
]

const ExploreSection = () => (
  <section
    className="relative z-10 flex w-full flex-col items-center bg-[#0E1016] py-16 text-[#e4ded7] md:py-24"
    id="explore"
  >
    <div className="mx-auto w-[90%] lg:max-w-[1440px]">
      <SectionHeading
        title="Explore"
        intro="Everything on this site, in one place."
      />
      <p className="mt-6 text-center text-[14px] font-semibold uppercase text-[#c9c4bd]">
        Looking for a web developer in{' '}
        <Link href="/locations/hisar" className="underline underline-offset-2 hover:no-underline">
          Hisar
        </Link>
        ,{' '}
        <Link href="/locations/haryana" className="underline underline-offset-2 hover:no-underline">
          Haryana
        </Link>
        ,{' '}
        <Link href="/locations/hansi" className="underline underline-offset-2 hover:no-underline">
          Hansi
        </Link>
        ,{' '}
        <Link href="/locations/bhiwani" className="underline underline-offset-2 hover:no-underline">
          Bhiwani
        </Link>{' '}
        or{' '}
        <Link href="/locations/rohtak" className="underline underline-offset-2 hover:no-underline">
          Rohtak
        </Link>
        ?
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map(({ href, title, text, icon }, index) => (
          <li key={href}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <SpotlightCard className="h-full rounded-3xl bg-secondary transition-colors hover:bg-[#23262e]">
                <Link href={href} className="group flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <IconBadge icon={icon} />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-[#95979D] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <h3
                    className={`${monaSans.className} mt-6 text-[40px] font-extrabold uppercase leading-[0.95em] md:text-[52px]`}
                  >
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] text-[#95979D]">{text}</p>
                </Link>
              </SpotlightCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default ExploreSection
