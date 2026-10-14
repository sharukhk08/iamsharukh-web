// Headline text that fades and un-blurs in word by word. Pure CSS, so it works
// in server components and shows the full text without JavaScript.
export default function RevealWords({
  text,
  stagger = 60,
}: {
  text: string
  stagger?: number
}) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word-in"
          style={{ animationDelay: `${index * stagger}ms` }}
        >
          {word}
          {' '}
        </span>
      ))}
    </>
  )
}
