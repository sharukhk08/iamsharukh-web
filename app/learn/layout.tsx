import { ReactNode } from 'react'
import SiteShell from '../components/SiteShell'

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
