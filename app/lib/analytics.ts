// Thin wrapper over Google Analytics 4 (gtag). Safe to call anywhere: it does
// nothing when analytics has not loaded (ad blockers, or before the late script).
type Params = Record<string, string | number | boolean | undefined>

type Gtag = (...args: unknown[]) => void
const getGtag = (): Gtag | undefined => {
  if (typeof window === 'undefined') return undefined
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  return typeof gtag === 'function' ? gtag : undefined
}

// Analytics loads late (after the page is idle), so events sent before that are kept
// in order and sent as soon as it is ready. After about 20 seconds the queue is dropped
// (an ad blocker, for example, means gtag never appears).
const queue: unknown[][] = []
let timer: ReturnType<typeof setInterval> | undefined
const send = (...args: unknown[]) => {
  const gtag = getGtag()
  if (gtag) {
    while (queue.length) gtag(...(queue.shift() as unknown[]))
    gtag(...args)
    return
  }
  if (typeof window === 'undefined') return
  queue.push(args)
  if (queue.length > 50) queue.shift()
  if (timer) return
  let tries = 0
  timer = setInterval(() => {
    tries += 1
    const ready = getGtag()
    if (ready) {
      while (queue.length) ready(...(queue.shift() as unknown[]))
    }
    if (ready || tries > 40) {
      clearInterval(timer)
      timer = undefined
      queue.length = 0
    }
  }, 500)
}

export function track(event: string, params: Params = {}) {
  send('event', event, params)
}

// A short name for the kind of page, so Analytics can group pages (all service pages,
// all blog posts...). Sent as GA4's built-in "content_group" parameter.
export function contentGroup(pathname: string) {
  if (pathname === '/') return 'Home'
  const first = pathname.split('/')[1]
  const detail = pathname.split('/').length > 2
  const groups: Record<string, string> = {
    services: detail ? 'Service' : 'Services list',
    work: detail ? 'Case study' : 'Work list',
    learn: detail ? 'Learn page' : 'Learn',
    locations: detail ? 'Location' : 'Locations list',
    blog: detail ? 'Blog post' : 'Blog',
    contact: 'Contact',
    about: 'About',
    international: 'International',
    links: 'Links',
    privacy: 'Privacy',
  }
  return groups[first] ?? 'Other'
}

export function setContentGroup(pathname: string) {
  send('set', { content_group: contentGroup(pathname) })
}
