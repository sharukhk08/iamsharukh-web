// Light and dark theme helpers. Dark is the default; the choice is kept in
// localStorage under "theme" and applied to <html data-theme="..."> before first paint
// by the inline script in app/layout.tsx. Colours themselves are CSS variables in
// app/globals.css, so components only need these helpers when they draw on a canvas.
export type Theme = 'dark' | 'light'

export const THEME_EVENT = 'themechange'
export const THEME_KEY = 'theme'

export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#f6f3ee':'#08090d')}catch(e){document.documentElement.setAttribute('data-theme','dark')}`

export const getTheme = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Storage can be blocked (private windows); the theme still applies for this visit.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f6f3ee' : '#08090d')
  window.dispatchEvent(new Event(THEME_EVENT))
}

// Reads a theme colour (for example "--c-ink") as an rgb() string for canvas drawing.
export const readColor = (variable: string, fallback = 'rgb(228 222 215)') => {
  if (typeof document === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value ? `rgb(${value})` : fallback
}
