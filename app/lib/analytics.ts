// Thin wrapper over Google Analytics 4 (gtag). Safe to call anywhere: it does
// nothing when analytics has not loaded (ad blockers, or before the late script).
type Params = Record<string, string | number | boolean | undefined>

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  gtag('event', event, params)
}
