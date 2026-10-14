import Image from 'next/image'
import Link from 'next/link'
import profile from '../../public/sharukh-image.jpeg'

// "Who wrote this and why they can": Google's people-first guidance asks pages to
// show their author. Used under blog posts.
export default function AuthorBox() {
  return (
    <aside className="mt-12 flex gap-4 rounded-3xl bg-secondary p-6">
      <Image
        src={profile}
        alt="Sharukh Khan"
        width={64}
        height={64}
        sizes="64px"
        className="h-16 w-16 shrink-0 rounded-full object-cover object-top grayscale"
      />
      <div>
        <p className="text-[16px] font-semibold">
          Written by{' '}
          <Link href="/about" className="underline underline-offset-2">
            Sharukh Khan
          </Link>
        </p>
        <p className="mt-1 text-[14px] text-[#c9c4bd]">
          Full-stack developer with 7 years of experience, based in Hisar, Haryana, and co-founder
          and CTO of Innovaft. I build web and mobile products with Next.js, React and React Native,
          and I mentor students.
        </p>
      </div>
    </aside>
  )
}
