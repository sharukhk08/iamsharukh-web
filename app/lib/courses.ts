export type Course = {
  slug: string
  name: string
  // Topics come from the Innovaft course pages and demo deck. Add only confirmed items.
  summary: string
  topics: string[]
}

export const courses: Course[] = [
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    summary: 'Learn to design clear, usable interfaces for websites and apps.',
    topics: ['Figma', 'User flows and wireframes', 'Prototyping', 'Design portfolio'],
  },
  {
    slug: 'frontend-development',
    name: 'Frontend Development',
    summary: 'Build responsive websites and web interfaces from scratch.',
    topics: ['HTML and CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    slug: 'backend-development',
    name: 'Backend Development',
    summary: 'Build the server side: APIs, databases and authentication.',
    topics: ['Node.js', 'MongoDB', 'APIs'],
  },
  {
    slug: 'full-stack-development',
    name: 'Full Stack Development',
    summary: 'Learn frontend and backend together and build complete applications.',
    topics: ['React and Next.js', 'Node.js', 'Databases', 'Deployment'],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    summary: 'Learn to build mobile apps for phones.',
    topics: ['App development basics', 'Real projects'],
  },
  {
    slug: 'cms-wordpress-development',
    name: 'CMS & WordPress',
    summary: 'Build and manage websites with a content management system.',
    topics: ['WordPress', 'Themes and plugins', 'Client websites'],
  },
]

export const WHATSAPP_URL = 'https://wa.me/919114244000'
