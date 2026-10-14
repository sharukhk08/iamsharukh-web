'use client'
import { Check, Link2, Share2 } from 'lucide-react'
import { useState } from 'react'
import { track } from '../lib/analytics'

// Share this page. The link preview that appears (title, description, image) comes
// from the page's metadata, not from this component. On phones the Share button opens
// the system share sheet, which lists WhatsApp, Telegram, Messages and so on, so no
// app-specific button is needed. Where that is unavailable it copies the link.
export default function ShareButtons({
  url,
  title,
  text,
}: {
  // The full public address of the page, for example https://www.iamsharukh.com/blog/x
  url: string
  title: string
  text?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  const share = async () => {
    track('share', { method: 'native', page: window.location.pathname })
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text, url })
      } catch {
        // the visitor closed the share sheet; nothing to do
      }
    } else {
      await copy()
    }
  }

  const encoded = encodeURIComponent(url)
  const networks = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}` },
  ]
  const button =
    'inline-flex items-center gap-2 rounded-md border-2 border-ink/40 px-4 py-2 text-[13px] font-semibold uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper'

  return (
    <aside aria-label="Share this page" className="mt-12">
      <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-ink-soft">Share this page</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={share} className={button}>
          <Share2 size={16} aria-hidden="true" />
          Share
        </button>
        <button type="button" onClick={copy} className={button} aria-live="polite">
          {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
        {networks.map((network) => (
          <a
            key={network.name}
            href={network.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('share', { method: network.name.toLowerCase(), page: window.location.pathname })}
            className={button}
          >
            {network.name}
          </a>
        ))}
      </div>
    </aside>
  )
}
