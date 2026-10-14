import { GraduationCap, Building2, Code2, MapPin, type LucideIcon } from 'lucide-react'

export type JourneyStep = {
  label: string
  title: string
  text: string
  icon: LucideIcon
}

// The story on the About page, in order. Only confirmed facts go here.
// Missing chapters (add each one only when the owner gives the real details):
//   - College: what he studied, where, when
//   - Student years: first projects, first client, what he learned the hard way
//   - The move: why Hisar, why starting a company
// Insert them at the right place in this list; the page renders whatever is here.
export const journey: JourneyStep[] = [
  {
    label: '7 years',
    title: 'Building for real clients',
    text: 'Seven years of working as a developer: websites, web apps, mobile apps and automations for businesses in Haryana and around the world.',
    icon: Code2,
  },
  {
    label: 'Hisar',
    title: 'Rooted in Hisar, Haryana',
    text: 'I live and work in Hisar. Most projects run online, and anyone in Hisar can meet me in person.',
    icon: MapPin,
  },
  {
    label: 'Innovaft',
    title: 'Co-founding a company',
    text: 'I co-founded Innovaft and lead the technical side as CTO, from the first conversation with a client to the last bug.',
    icon: Building2,
  },
  {
    label: 'Teaching',
    title: 'Helping students grow',
    text: 'I mentor and teach at Innovaft. 50+ students trained and 10 placed in jobs, learning by building real projects.',
    icon: GraduationCap,
  },
]
