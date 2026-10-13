import DotGrid from './effects/DotGrid'

// A glowing dot grid at the top of a page, fading out so text stays readable.
// Positioned against the page shell (SiteShell is `relative`).
export default function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60 [mask-image:linear-gradient(to_bottom,#000_20%,transparent_95%)]"
    >
      <DotGrid className="h-full w-full" />
    </div>
  )
}
