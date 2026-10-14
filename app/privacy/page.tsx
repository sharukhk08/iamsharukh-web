import type { Metadata } from 'next'
import { pageMeta } from '../lib/seo'
import Link from 'next/link'
import PageBackdrop from '../components/PageBackdrop'

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How iamsharukh.com handles the information you send through the contact form and the analytics it uses.',
  path: '/privacy',
})

// A plain-language policy for what this site actually does. It is not legal advice:
// have it checked if the business grows or handles more personal data.
export default function PrivacyPage() {
  return (
    <main className="mx-auto w-[90%] max-w-[800px] pt-10 md:pt-16">
      <PageBackdrop />
      <h1 className="text-[40px] leading-tight md:text-[64px]">Privacy Policy</h1>
      <p className="mt-3 text-[14px] text-ink-soft">Last updated: 14 October 2026</p>

      <div className="mt-8 space-y-8 text-[16px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="text-[22px] text-ink">What this site collects</h2>
          <p className="mt-2">
            If you use the contact form, I receive what you type: your name, email address, phone number,
            city or country, what you need, the project or learning details you add, and how you found me.
            The site also uses Google Analytics to count visits and clicks on buttons such as contact and
            booking links. It does not use your name or email for analytics.
          </p>
        </section>
        <section>
          <h2 className="text-[22px] text-ink">How it is used</h2>
          <p className="mt-2">
            I use your enquiry only to reply to you and to discuss your project or course. I do not sell
            your information or use it for unrelated marketing. You will get an automatic reply to the
            email address you entered.
          </p>
        </section>
        <section>
          <h2 className="text-[22px] text-ink">Who else handles it</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>EmailJS delivers the contact form messages to my inbox.</li>
            <li>Google Analytics measures visits to this site and may set cookies.</li>
            <li>The site is hosted on Vercel.</li>
            <li>Cal.com handles bookings if you book a call.</li>
          </ul>
          <p className="mt-2">Each of these services has its own privacy policy.</p>
        </section>
        <section>
          <h2 className="text-[22px] text-ink">How long it is kept</h2>
          <p className="mt-2">
            Enquiry emails are kept as long as needed to deal with your request and for my business
            records. You can ask me to delete them at any time.
          </p>
        </section>
        <section>
          <h2 className="text-[22px] text-ink">Your choices</h2>
          <p className="mt-2">
            You can ask to see, correct or delete what I hold about you, or ask me to stop contacting you.
            Use the{' '}
            <Link href="/contact" className="underline underline-offset-2">
              contact page
            </Link>{' '}
            to ask. You can also block analytics cookies in your browser settings.
          </p>
        </section>
      </div>
    </main>
  )
}
