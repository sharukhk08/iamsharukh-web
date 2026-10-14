import { ReactNode } from 'react'

// Endless horizontal ticker. The list is repeated so the loop has no gap.
export default function Marquee({ items }: { items: ReactNode[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      {[0, 1].map((copy) => (
        <div key={copy} className="marquee-track">
          {items.map((item, index) => (
            <span key={`${copy}-${index}`}>{item}</span>
          ))}
        </div>
      ))}
    </div>
  )
}
