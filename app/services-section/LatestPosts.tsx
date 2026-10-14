import Link from 'next/link'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

type Post = { slug: string; title: string; description: string; date: string }

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

const LatestPosts = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) return null
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center bg-primary py-16 text-[#e4ded7] md:py-24"
      id="writing"
    >
      <div className="mx-auto w-[90%] lg:max-w-[1440px]">
        <SectionHeading
          title="Latest writing"
          intro="Practical notes on Next.js, Figma to code and getting AI-built apps ready to launch."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={index * 80} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-full flex-col rounded-3xl bg-secondary p-6 transition-colors hover:bg-[#23262e] md:p-8"
                >
                  <p className="text-[13px] uppercase text-[#95979D]">{formatDate(post.date)}</p>
                  <h3 className="mt-2 text-[22px] md:text-[26px]">{post.title}</h3>
                  <p className="mt-3 text-[15px] text-[#95979D]">{post.description}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-[14px] font-semibold uppercase">
          <Link href="/blog" className="underline underline-offset-2 hover:no-underline">
            Read all posts
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LatestPosts
