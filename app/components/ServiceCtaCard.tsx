import Link from 'next/link'
import { ArrowRight, LayoutGrid, Plus } from 'lucide-react'
import { contactHref } from '../lib/contact'
import { SERVICE_ICONS } from '../lib/icons'
import SpotlightCard from './effects/SpotlightCard'

// The last card in a services grid. Two versions:
//  - "all":     light card on the home page, links to the full services list
//  - "contact": outlined dark card on /services, links to the enquiry form
// Both look "hovered" by default so they read as the next step.
const PREVIEW_ICONS = ['figma-to-nextjs', 'ai-automation-n8n', 'react-native-app-development', 'ecommerce-app-development']

export default function ServiceCtaCard({
  variant = 'contact',
  as: Heading = 'h3',
}: {
  variant?: 'all' | 'contact'
  as?: 'h2' | 'h3'
}) {
  if (variant === 'all') {
    return (
      <SpotlightCard className="h-full rounded-3xl bg-[#e4ded7] text-[#0E1016]">
        <Link href="/services" className="group flex h-full flex-col p-6">
          <span className="relative inline-flex self-start">
            <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[#0E1016]/25 motion-safe:animate-ping" />
            <span className="relative inline-flex rounded-2xl bg-[#0E1016] p-3 text-[#e4ded7]">
              <LayoutGrid size={22} aria-hidden="true" />
            </span>
          </span>
          <Heading className="mt-4 text-[20px] leading-snug">View all services</Heading>
          <p className="mt-2 text-[14px] text-[#0E1016]/70">
            See what is included in each service, how it works and what to send me first.
          </p>
          <span aria-hidden="true" className="mt-4 flex -space-x-2">
            {PREVIEW_ICONS.map((slug) => {
              const Icon = SERVICE_ICONS[slug]
              return Icon ? (
                <span
                  key={slug}
                  className="inline-flex rounded-full border-2 border-[#e4ded7] bg-[#0E1016]/10 p-2 transition-transform duration-300 group-hover:-translate-y-1"
                >
                  <Icon size={16} />
                </span>
              ) : null
            })}
          </span>
          <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold">
            View all services
            <ArrowRight size={16} aria-hidden="true" className="transition-transform motion-safe:animate-pulse group-hover:translate-x-1" />
          </span>
        </Link>
      </SpotlightCard>
    )
  }

  return (
    <SpotlightCard className="h-full rounded-3xl border border-[#e4ded7]/40 bg-[#23262e]">
      <Link href={contactHref()} className="group flex h-full flex-col p-6">
        <span className="relative inline-flex self-start">
          <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[#e4ded7]/30 motion-safe:animate-ping" />
          <span className="relative inline-flex rounded-2xl bg-[#e4ded7] p-3 text-[#0E1016]">
            <Plus size={22} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-90" />
          </span>
        </span>
        <Heading className="mt-4 text-[20px] leading-snug">Something else in mind?</Heading>
        <p className="mt-2 text-[14px] text-[#c9c4bd]">
          Not sure which service fits? Tell me what you want to build and I will suggest the right approach.
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold">
          Tell me your idea
          <ArrowRight size={16} aria-hidden="true" className="transition-transform motion-safe:animate-pulse group-hover:translate-x-1" />
        </span>
      </Link>
    </SpotlightCard>
  )
}
