import { OG_SIZE, OG_TYPE, renderOg } from './lib/og'

export const size = OG_SIZE
export const contentType = OG_TYPE
export const alt = 'Sharukh Khan, full-stack developer and software engineer in Hisar, Haryana'

export default function Image() {
  return renderOg({
    title: 'Sharukh Khan',
    subtitle: 'Full-stack developer and software engineer. Next.js, React, React Native and AI automation.',
    tag: 'Portfolio',
  })
}
