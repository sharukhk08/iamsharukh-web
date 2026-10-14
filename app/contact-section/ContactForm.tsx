'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import EnquiryForm from './EnquiryForm'

// Reads ?service=<slug> in the browser so /contact itself can be a plain static
// page. Reading search params on the server would make every visit run a
// serverless function.
function FormWithParams() {
  const service = useSearchParams().get('service') ?? undefined
  return <EnquiryForm key={service ?? 'none'} initialService={service} />
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="min-h-[360px]" aria-hidden="true" />}>
      <FormWithParams />
    </Suspense>
  )
}
