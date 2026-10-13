'use client'
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { getOption } from './formConfig'

// Service pages link to /?service=<slug>#contact. This opens the contact form
// with that service selected, then removes the parameter from the address bar.
// Kept in its own component so the Suspense boundary needed by useSearchParams
// does not wrap (and client-render) the whole home page.
export default function ServiceDeepLink({
  onService,
}: {
  onService: (service: string) => void
}) {
  const service = useSearchParams().get('service')
  const handled = useRef(false)

  useEffect(() => {
    if (handled.current || !service || !getOption(service)) return
    handled.current = true
    onService(service)
    window.history.replaceState(null, '', window.location.pathname)
  }, [service, onService])

  return null
}
