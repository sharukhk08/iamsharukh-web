'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { contentGroup, setContentGroup, track } from '../lib/analytics'

const OUTBOUND = ['github.com', 'linkedin.com', 'contra.com', 'instagram.com', 'x.com', 'innovaft.com']
const SCROLL_STEPS = [25, 50, 75, 100]

// GA4 events for what leads to business. No personal data is sent: only the page,
// the link target and a page group. Page views come from GA4 itself. Form events are
// sent from the form, share events from the share buttons.
//   page_context       once per page, with the page group (Service, Blog post...)
//   book_call_click    a Cal.com booking link
//   contact_cta_click  a button to the contact page (to = target, with the service)
//   service_click      a link to a service page (service, from page)
//   learn_click        a link to a learn page
//   internal_click     any other link inside the site (from, to, area: header/footer/page)
//   outbound_click     profile and Innovaft links
//   scroll_depth       25, 50, 75, 100 percent, once each per page
export default function AnalyticsEvents() {
  const pathname = usePathname()

  // Page group and scroll depth reset on every page.
  useEffect(() => {
    setContentGroup(pathname)
    track('page_context', { page: pathname, content_group: contentGroup(pathname) })

    const sent = new Set<number>()
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = (window.scrollY / scrollable) * 100
      for (const step of SCROLL_STEPS) {
        if (percent >= step - 1 && !sent.has(step)) {
          sent.add(step)
          track('scroll_depth', { page: pathname, percent: step, content_group: contentGroup(pathname) })
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      const page = window.location.pathname
      const group = contentGroup(page)
      if (href.includes('cal.com')) track('book_call_click', { page, content_group: group })
      else if (href.startsWith('/contact')) track('contact_cta_click', { page, to: href, content_group: group })
      else if (href.startsWith('/services/')) {
        track('service_click', { page, service: href.split('/')[2]?.split(/[?#]/)[0], content_group: group })
      } else if (href.startsWith('/learn/')) track('learn_click', { page, to: href, content_group: group })
      else if (href.startsWith('/')) {
        const area = link.closest('footer') ? 'footer' : link.closest('header, nav') ? 'header' : 'page'
        track('internal_click', { from: page, to: href.split(/[?#]/)[0], area })
      } else if (/^https?:/.test(href)) {
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
