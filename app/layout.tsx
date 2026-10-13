import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'

const syne = Syne({
  subsets: ['latin'],
  display: 'block',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Sharukh Khan | Frontend Engineer & Tech Entrepreneur',
  description:
    'Co-founder at Innovaft, specializing in scalable web applications and high-performance digital solutions. Based in Hisar, Haryana.',
  generator: 'Next.js',
  applicationName: 'Sharukh Khan Portfolio',
  keywords: [
    'frontend engineer',
    'tech entrepreneur',
    'web developer',
    'React developer',
    'Next.js expert',
    'UI/UX specialist',
    'software architect',
    'Indian tech entrepreneur',
    'web application developer',
    'startup founder',
    'TypeScript developer',
    'performance optimization',
    'Haryana tech',
    'digital solutions',
    'Innovaft co-founder',
  ],
  colorScheme: 'dark',
  openGraph: {
    title: 'Sharukh Khan | Frontend Engineer & Tech Entrepreneur',
    description:
      'Co-founder at Innovaft, delivering scalable web solutions and digital experiences. Based in Hisar, Haryana.',
    url: 'https://www.iamsharukh.com',
    siteName: 'Sharukh Khan Portfolio',
    images: [
      {
        url: 'https://www.iamsharukh.com/sharukh-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sharukh Khan - Frontend Engineer & Tech Entrepreneur',
      },
    ],
    locale: 'en-IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharukh Khan | Frontend Engineer & Tech Entrepreneur',
    description:
      'Building exceptional digital experiences and leading tech innovation at Innovaft.',
    creator: '@sharukhk08',
    images: ['https://www.iamsharukh.com/sharukh-image.jpeg'],
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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
