'use client'
import { useEffect } from 'react'
import { track } from '../lib/analytics'

const OUTBOUND = ['github.com', 'linkedin.com', 'contra.com', 'instagram.com', 'x.com', 'innovaft.com']

// Sends a few GA4 events for the actions that lead to business: clicking a
// contact or booking button, and following a profile link. Form events are sent
// from the form itself. No personal data is sent, only the page and the link.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const page = window.location.pathname
      if (href.includes('cal.com')) track('book_call_click', { page })
      else if (href.startsWith('/contact')) track('contact_cta_click', { page, to: href })
      else if (/^https?:/.test(href)) {
        const host = new URL(href).hostname.replace(/^www\./, '')
        const match = OUTBOUND.find((domain) => host === domain || host.endsWith(`.${domain}`))
        if (match) track('outbound_click', { page, domain: match })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
