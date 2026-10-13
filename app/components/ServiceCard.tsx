import Link from 'next/link'
import { ArrowRight, LayoutTemplate } from 'lucide-react'
import { SERVICE_ICONS } from '../lib/icons'
import IconBadge from './IconBadge'
import SpotlightCard from './effects/SpotlightCard'

export default function ServiceCard({
  slug,
  title,
  tagline,
  as: Heading = 'h3',
}: {
  slug: string
  title: string
  tagline: string
  as?: 'h2' | 'h3'
}) {
  const Icon = SERVICE_ICONS[slug] ?? LayoutTemplate
  return (
    <SpotlightCard className="h-full rounded-3xl bg-secondary transition-colors hover:bg-[#23262e]">
      <Link href={`/services/${slug}`} className="group flex h-full flex-col p-6">
        <IconBadge icon={Icon} className="self-start" />
        <Heading className="mt-4 text-[20px] leading-snug">{title}</Heading>
        <p className="mt-2 text-[14px] text-[#95979D]">{tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold">
          Learn more
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </Link>
    </SpotlightCard>
  )
}
