import type { MetadataRoute } from 'next'
import { getPosts } from './lib/blog'
import { learnPages } from './lib/learnPages'
import { locations } from './lib/locations'
import { getProjects, hasFullDetails } from './lib/projects'
import { services } from './lib/services'
import { SITE_URL } from './lib/site'

// Google ignores priority and changeFrequency, so they are left out. lastModified
// is only set where a real date exists (blog posts), because a made-up date is
// worse than none. Pages marked noindex (case studies without full details) are
// not listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified?: string) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified } : {}),
  })

  return [
    page('/'),
    page('/services'),
    ...services.map((service) => page(`/services/${service.slug}`)),
    page('/work'),
    ...getProjects().filter(hasFullDetails).map((project) => page(`/work/${project.slug}`)),
    page('/learn'),
    ...learnPages.map((item) => page(`/learn/${item.slug}`)),
    page('/locations'),
    ...locations.map((location) => page(`/locations/${location.slug}`)),
    page('/blog'),
    ...getPosts().map((post) => page(`/blog/${post.slug}`, post.date)),
    page('/about'),
    page('/contact'),
    page('/links'),
    page('/privacy'),
  ]
}
