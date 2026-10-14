// app/components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-61QN0HQ38D'

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

// Types for window object
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, any>,
    ) => void
    dataLayer: any[]
  }
}
