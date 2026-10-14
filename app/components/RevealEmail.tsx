'use client'
import { useState } from 'react'
import { CONTACT_EMAIL } from '../lib/contact'

// Keeps the address out of the page HTML, where spam bots collect it. It is only
// shown, and linked, after a person clicks. The contact form is the main route.
export default function RevealEmail({ className = '' }: { className?: string }) {
  const [shown, setShown] = useState(false)

  if (shown) {
    return (
      <a href={`mailto:${CONTACT_EMAIL}`} className={`break-all underline underline-offset-2 ${className}`}>
        {CONTACT_EMAIL}
      </a>
    )
  }
  return (
    <button type="button" onClick={() => setShown(true)} className={`underline underline-offset-2 ${className}`}>
      Click to show my email address
    </button>
  )
}
