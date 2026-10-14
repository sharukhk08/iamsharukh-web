import HomeClient from './HomeClient'
import { getPosts } from './lib/blog'
import { getProjects } from './lib/projects'

// A server component: it reads content/ at build time and hands plain data to the
// client-side home page. The page is generated once at build, not on each request.
export default function Home() {
  const posts = getPosts()
    .slice(0, 2)
    .map(({ slug, title, description, date }) => ({ slug, title, description, date }))
  return <HomeClient projects={getProjects()} posts={posts} />
}
