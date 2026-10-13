export type Location = {
  slug: string
  kind: 'city' | 'state'
  name: string
  // Used in the footer and link lists
  shortTitle: string
  h1: string
  metaDescription: string
  intro: string
  // Short paragraphs shown under "Working with clients in <place>"
  working: string[]
  // Service slugs worth highlighting for this place, in order
  featuredServices: string[]
  faqs: { q: string; a: string }[]
  // Other location slugs to link to
  related: string[]
}

// Facts used here and nowhere else are limited to what is confirmed:
// based in Hisar, Haryana; Innovaft office in Hisar; courses run in person in
// Hisar with online support; distances are approximate road distances.
// Do not add client names, results or local claims unless the owner confirms them.
export const HISAR_OFFICE = {
  name: 'Innovaft',
  address: '2nd Floor, SCF-2, Red Square Market, Railway Road, Hisar 125001',
  hours: 'Monday to Saturday, 9:00 AM to 6:00 PM',
}

export const locations: Location[] = [
  {
    slug: 'haryana',
    kind: 'state',
    name: 'Haryana',
    shortTitle: 'Web developer in Haryana',
    h1: 'Web & App Developer for Businesses Across Haryana',
    metaDescription:
      'Full-stack developer in Hisar working with businesses across Haryana: websites, web apps, React Native apps and software. Next.js, React and Node.js, 7 years of experience.',
    intro:
      'I am a full-stack developer based in Hisar, and I work with businesses, startups and organisations across Haryana. I build websites, web applications, mobile apps and custom software, and most projects run smoothly online, so you do not need to be in the same city.',
    working: [
      'Most of the work happens over video calls, shared design files and a preview link you can open on your own phone. That works the same whether you are in Gurugram, Rohtak or a smaller town.',
      'If you prefer to meet in person, I am available at the Innovaft office in Hisar. For larger projects, we can discuss meeting elsewhere.',
      'I also work with clients outside India, so you get the same process and standards as an international project.',
    ],
    featuredServices: [
      'figma-to-nextjs',
      'full-stack-web-app-development',
      'ecommerce-app-development',
      'react-native-app-development',
    ],
    faqs: [
      {
        q: 'Which parts of Haryana do you work with?',
        a: 'All of Haryana. The work is done online, with in-person meetings available in Hisar.',
      },
      {
        q: 'Do you only work on small business websites?',
        a: 'No. I build everything from business websites to custom web apps, dashboards, CRMs and mobile apps. We start with a call to decide what fits.',
      },
      {
        q: 'Do you also teach?',
        a: 'Yes. I mentor students and handle classes at Innovaft in Hisar, which runs in-person courses with online support.',
      },
    ],
    related: ['hisar', 'hansi', 'bhiwani', 'rohtak'],
  },
  {
    slug: 'hisar',
    kind: 'city',
    name: 'Hisar',
    shortTitle: 'Web developer in Hisar',
    h1: 'Web & App Developer in Hisar, Haryana',
    metaDescription:
      'Full-stack web and mobile app developer in Hisar, Haryana. Websites, web apps, e-commerce and React Native apps. Co-founder and CTO of Innovaft, 7 years of experience.',
    intro:
      'I live and work in Hisar. As a full-stack developer with 7 years of experience and co-founder and CTO of Innovaft, I build websites, web apps and mobile apps for businesses in Hisar and for clients around the world.',
    working: [
      'You can meet me in person in Hisar. Innovaft is at 2nd Floor, SCF-2, Red Square Market, Railway Road, open Monday to Saturday, 9:00 AM to 6:00 PM. If you would rather talk online, I can do a video call or a free 30-minute intro call.',
      'If you run a shop, clinic, school, coaching centre or any local business, I can start with a simple, fast website that people can find on Google, and add online booking, payments or a dashboard later as you grow.',
      'Because I am based here, we can sit together, go through your business and decide what you really need before any money is spent.',
    ],
    featuredServices: [
      'figma-to-nextjs',
      'ecommerce-app-development',
      'crm-custom-software-development',
      'react-native-app-development',
    ],
    faqs: [
      {
        q: 'Can we meet in person in Hisar?',
        a: 'Yes. We can meet at the Innovaft office on Railway Road, or talk online if that is easier.',
      },
      {
        q: 'I only need a simple website for my business. Is that fine?',
        a: 'Yes. A clear, fast website is often the best first step. We can add more later.',
      },
      {
        q: 'Do you teach in Hisar?',
        a: 'Yes. Innovaft runs in-person courses in Hisar, and I handle the classes and mentoring. See the learning page for details.',
      },
    ],
    related: ['hansi', 'bhiwani', 'rohtak', 'haryana'],
  },
  {
    slug: 'hansi',
    kind: 'city',
    name: 'Hansi',
    shortTitle: 'Web developer in Hansi',
    h1: 'Web & App Developer for Businesses in Hansi',
    metaDescription:
      'Web developer serving Hansi, Haryana from nearby Hisar: websites, online stores, web apps and mobile apps built with Next.js and React Native.',
    intro:
      'Hansi is only about 25 km from Hisar, where I am based. If you run a business, school, clinic or startup in Hansi, you can work with a full-stack developer who is practically next door.',
    working: [
      'Most of the project runs online, so you do not lose time travelling. When it helps, we can meet in person at the Innovaft office in Hisar.',
      'A good starting point for many Hansi businesses is a website that shows up when people search for you, with a contact form that sends enquiries straight to your email.',
      'If you already have a website that is slow, outdated or hard to update, I can rebuild it rather than start from nothing.',
    ],
    featuredServices: [
      'figma-to-nextjs',
      'ecommerce-app-development',
      'full-stack-web-app-development',
    ],
    faqs: [
      {
        q: 'Do I have to travel to Hisar?',
        a: 'No. Most work is done online. If you want to meet, Hisar is about 25 km away.',
      },
      {
        q: 'Can you improve my existing website?',
        a: 'Yes. I can review it, tell you what is worth keeping and fix or rebuild the rest.',
      },
    ],
    related: ['hisar', 'bhiwani', 'haryana'],
  },
  {
    slug: 'bhiwani',
    kind: 'city',
    name: 'Bhiwani',
    shortTitle: 'Web developer in Bhiwani',
    h1: 'Web & App Developer for Businesses in Bhiwani',
    metaDescription:
      'Web and app developer serving Bhiwani, Haryana: business websites, e-commerce, web apps and React Native mobile apps, delivered online from Hisar.',
    intro:
      'I work with businesses and individuals in Bhiwani from my base in Hisar, about 55 km away. Whether you are selling products online, building a service business or turning an idea into an app, I handle the design, development and launch.',
    working: [
      'Projects run online with regular video calls and preview links, so you see progress without leaving Bhiwani. In-person meetings are possible at the Innovaft office in Hisar.',
      'If you sell products, an online store can open your business to customers far beyond Bhiwani. I build fast storefronts with a simple admin panel you can manage yourself.',
      'If you have an idea for an app, we can start with a small first version that tests the idea before you invest in everything.',
    ],
    featuredServices: [
      'ecommerce-app-development',
      'react-native-app-development',
      'saas-dashboard-development',
    ],
    faqs: [
      {
        q: 'Can students from Bhiwani join Innovaft courses?',
        a: 'Classes are in person at the Innovaft centre in Hisar, with online support. Get in touch and we can talk through the options.',
      },
      {
        q: 'Can you build an app from just an idea?',
        a: 'Yes. We start by defining the smallest useful version, then design and build it in stages.',
      },
    ],
    related: ['hisar', 'hansi', 'rohtak', 'haryana'],
  },
  {
    slug: 'rohtak',
    kind: 'city',
    name: 'Rohtak',
    shortTitle: 'Web developer in Rohtak',
    h1: 'Web & App Developer for Businesses in Rohtak',
    metaDescription:
      'Full-stack developer working with Rohtak businesses and startups: Figma to Next.js, SaaS dashboards, CRM, e-commerce and React Native apps, delivered online.',
    intro:
      'I work with businesses, startups and agencies in Rohtak as a remote full-stack developer. I am based in Hisar, and the way I work is built for distance: clear plans, regular previews and one person responsible for the whole build.',
    working: [
      'You get a written plan and milestones up front, a preview link that updates as I build, and regular check-ins by call or message. You always know what is done and what is next.',
      'If you run an agency or a team that needs extra development capacity, I can take on a defined piece of work, such as turning Figma designs into a Next.js site, or join as a technical lead.',
      'For startups in Rohtak, I can help scope a first version, build it and set up hosting, so you can launch and learn from real users.',
    ],
    featuredServices: [
      'saas-dashboard-development',
      'figma-to-nextjs',
      'crm-custom-software-development',
      'project-management',
    ],
    faqs: [
      {
        q: 'Is it a problem that you are not in Rohtak?',
        a: 'No. Most of my clients are remote, and the process is designed for it. We can also meet in person in Hisar if needed.',
      },
      {
        q: 'Can you work with our existing team?',
        a: 'Yes. I can take a defined piece of work or join as a technical lead or reviewer.',
      },
    ],
    related: ['hisar', 'bhiwani', 'haryana'],
  },
]

export const getLocation = (slug: string) =>
  locations.find((location) => location.slug === slug)
