'use client'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { track } from '../lib/analytics'
import { getTheme, setTheme, THEME_EVENT, type Theme } from '../lib/theme'

// Switches between the dark (default) and light theme. The page is rendered dark and
// the saved choice is applied by a script before first paint, so the button reads the
// real theme after mount and shows a neutral state until then.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setCurrent] = useState<Theme | null>(null)

  useEffect(() => {
    const sync = () => setCurrent(getTheme())
    sync()
    window.addEventListener(THEME_EVENT, sync)
    return () => window.removeEventListener(THEME_EVENT, sync)
  }, [])

  const light = theme === 'light'
  const next: Theme = light ? 'dark' : 'light'
  return (
    <button
      type="button"
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Dark mode' : 'Light mode'}
      onClick={() => {
        setTheme(next)
        track('theme_change', { theme: next, page: window.location.pathname })
      }}
      data-blobity-magnetic="false"
      className={`inline-flex items-center justify-center rounded-md border-2 border-ink/40 p-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper ${className}`}
    >
      {light ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>
  )
}
