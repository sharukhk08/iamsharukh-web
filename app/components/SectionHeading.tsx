import { monaSans } from '../fonts/monaSans'

// The same heading style as the home page sections (Testimonials, Let's Talk):
// Mona Sans Narrow, heavy, uppercase, centred, with a small uppercase intro.
export default function SectionHeading({
  title,
  intro,
}: {
  title: string
  intro?: string
}) {
  return (
    <div className="flex flex-col items-center text-center text-ink">
      <h2
        className={`${monaSans.className} font-extrabold uppercase leading-[0.9em] text-[clamp(48px,9vw,120px)]`}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-6 w-[90%] max-w-[560px] text-[14px] font-semibold uppercase md:text-[16px]">
          {intro}
        </p>
      )}
    </div>
  )
}
