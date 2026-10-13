import type { MetadataRoute } from 'next'
import { locations } from './lib/locations'
import { services } from './lib/services'
import { SITE_URL } from './lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/locations`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/learn`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...locations.map((location) => ({
      url: `${SITE_URL}/locations/${location.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
