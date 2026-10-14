import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { contactHref } from '../lib/contact'
import SpotlightCard from './effects/SpotlightCard'

// The last card in the services grid. It looks "hovered" by default (lighter surface,
// outlined, pulsing plus) so it reads as the next step, and links to the enquiry form.
export default function ServiceCtaCard({ as: Heading = 'h3' }: { as?: 'h2' | 'h3' }) {
  return (
    <SpotlightCard className="h-full rounded-3xl border border-[#e4ded7]/40 bg-[#23262e]">
      <Link href={contactHref()} className="group flex h-full flex-col p-6">
        <span className="relative inline-flex self-start">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-[#e4ded7]/30 motion-safe:animate-ping"
          />
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
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform motion-safe:animate-pulse group-hover:translate-x-1"
          />
        </span>
      </Link>
    </SpotlightCard>
  )
}
