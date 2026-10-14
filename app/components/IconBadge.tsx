import type { LucideIcon } from 'lucide-react'

// A tinted rounded square holding an icon.
export default function IconBadge({
  icon: Icon,
  size = 22,
  className = '',
}: {
  icon: LucideIcon
  size?: number
  className?: string
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-ink/10 p-3 text-ink ${className}`}
    >
      <Icon size={size} aria-hidden="true" />
    </span>
  )
}
