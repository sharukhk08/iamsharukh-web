import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_TYPE = 'image/png'

// Share image used for link previews (Google Discover, LinkedIn, X, WhatsApp, AI
// tools). Generated at build time from the page title, so it costs nothing at run time.
export function renderOg({
  title,
  subtitle,
  tag,
}: {
  title: string
  subtitle?: string
  tag: string
}) {
  const size = title.length > 60 ? 54 : title.length > 36 ? 66 : 80
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(135deg, #08090d 0%, #1b1d23 100%)',
          color: '#e4ded7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#95979d' }}>
          {`Sharukh Khan  /  ${tag}`}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 800, lineHeight: 1.05, textTransform: 'uppercase' }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: 'flex', marginTop: 24, fontSize: 30, color: '#c9c4bd', lineHeight: 1.3 }}>
              {subtitle.length > 120 ? `${subtitle.slice(0, 117)}...` : subtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#95979d' }}>
          <div style={{ display: 'flex' }}>Full-stack developer, Hisar, Haryana</div>
          <div style={{ display: 'flex' }}>iamsharukh.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
