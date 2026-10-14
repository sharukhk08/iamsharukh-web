import type { Metadata } from 'next'
import { SITE } from './site'

// Every page needs its own link preview. A page that sets only title and description
// would otherwise inherit the HOME page's Open Graph and Twitter title and description,
// so a shared link to /services would be previewed as the home page. Use this helper in
// every page's metadata. The preview image comes from that page's opengraph-image file
// (or the site-wide one), which Next adds automatically.
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  ownImage = false,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  // Set true on pages that have their own opengraph-image file (the [slug] pages).
  // Other pages use the site-wide preview image.
  ownImage?: boolean
}): Metadata {
  const previewTitle = `${title} | ${SITE.name}`
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: previewTitle,
      description,
      url: `${SITE.url}${path}`,
      siteName: SITE.siteName,
      locale: SITE.locale,
      type,
      // A page that sets its own openGraph does not inherit the site-wide image, so
      // it is named here. Without it, shared links to these pages have no picture.
      ...(ownImage ? {} : { images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: SITE.ogImage.alt }] }),
      ...(type === 'article' && publishedTime
        ? { publishedTime, authors: [SITE.name] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: previewTitle,
      description,
      creator: SITE.twitterHandle,
      ...(ownImage ? {} : { images: ['/twitter-image'] }),
    },
  }
}
