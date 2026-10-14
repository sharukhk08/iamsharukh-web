import { ReactNode } from 'react'
import SiteShell from '../components/SiteShell'

export default function WorkLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>
}
