import { ReactNode } from 'react'
import SiteShell from '../components/SiteShell'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
