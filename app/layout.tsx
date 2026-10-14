import type { Metadata, Viewport } from 'next'
import { Syne } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'
import { JsonLd, personJsonLd, websiteJsonLd } from './lib/jsonLd'
import { SITE } from './lib/site'

const syne = Syne({
  subsets: ['latin'],
  display: 'block',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  generator: 'Next.js',
  manifest: '/site.webmanifest',
  applicationName: SITE.siteName,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    'full-stack developer',
    'software engineer',
    'Next.js developer',
    'React developer',
    'React Native developer',
    'Figma to Next.js',
    'AI automation',
    'n8n developer',
    'SaaS dashboard development',
    'TypeScript developer',
    'web developer in Hisar',
    'web developer in Haryana',
    'Innovaft co-founder',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.siteName,
    images: [SITE.ogImage],
    locale: SITE.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitterHandle,
    images: [SITE.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`${syne.className} scroll-smooth scrollbar-thin scrollbar-track-primary scrollbar-thumb-secondary`}
      >
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
