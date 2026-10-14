export type LearnPage = {
  slug: string
  // Used in the <title>, so keep it short and put the main phrase first.
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: { heading: string; paragraphs: string[] }[]
  faqs: { q: string; a: string }[]
}

// Only confirmed facts: Innovaft runs in-person courses at its centre in Hisar, with
// online support; free first class and demo; completion certificate; job assistance
// covers resume, LinkedIn, mock interviews and portfolio. Fees, schedules and course
// lengths are NOT stated because Innovaft's own pages disagree. Add them only when the
// owner confirms them. Do not add a page for a city or state unless it has something
// real and different to say (Google treats near-identical location pages as spam).
export const learnPages: LearnPage[] = [
  {
    slug: 'hisar',
    metaTitle: 'Web Development Course in Hisar',
    metaDescription:
      'In-person web development, UI/UX, frontend, backend, full stack, mobile app and WordPress courses in Hisar, taught by a developer with 7 years of experience.',
    h1: 'Web development and coding courses in Hisar',
    intro:
      'Innovaft trains beginners and career changers in web and app development at its centre on Railway Road, Hisar. I teach and mentor the classes myself: I have 7 years of experience as a developer and have trained 50+ students, 10 of whom have been placed in jobs. You learn by building real projects, with mentor support when you get stuck.',
    sections: [
      {
        heading: 'Courses you can join in Hisar',
        paragraphs: [
          'There are six courses: UI/UX Design, Frontend Development, Backend Development, Full Stack Development, Mobile App Development, and CMS and WordPress. If you are not sure which fits you, the free first class is the easiest way to find out.',
          'Choose UI/UX Design if you like designing how websites and apps look and feel. Choose Frontend Development if you want to build websites people see and use. Choose Backend Development if you prefer servers, databases and APIs. Choose Full Stack Development if you want both sides. Choose Mobile App Development for phone apps, and CMS and WordPress to build and manage websites for small businesses.',
        ],
      },
      {
        heading: 'How classes work',
        paragraphs: [
          'Classes are held in person at the Innovaft centre in Hisar, with online support when you need it. The focus is on practice: you build projects, review them with a mentor and end with a portfolio you can show to employers or clients.',
          'Job assistance covers resume building, LinkedIn, mock interviews and portfolio development. It helps you prepare; it is not a promise of a job.',
        ],
      },
      {
        heading: 'Where and when',
        paragraphs: [
          'Innovaft, 2nd Floor, SCF-2, Red Square Market, Railway Road, Hisar 125001. Open Monday to Saturday, 9:00 AM to 6:00 PM. You can visit for a free first class and a demo before you decide.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do I need any experience to join a coding course in Hisar?',
        a: 'No. The courses start from the basics and are designed for beginners, and they also work if you want to build on skills you already have.',
      },
      {
        q: 'Which web development course should I choose?',
        a: 'Pick by what you enjoy: design (UI/UX), the part people see (Frontend), the part behind the scenes (Backend), both (Full Stack), phone apps (Mobile) or business websites (WordPress). Come to the free first class and the mentors will help you choose.',
      },
      {
        q: 'Are the classes online or in person?',
        a: 'In person at the Hisar centre, with online support when you need it.',
      },
      {
        q: 'I live outside Haryana, in Delhi, Rajasthan or Punjab. Can I join?',
        a: 'Yes, if you can attend in person in Hisar. The classes are held at the centre, so check that the travel works for you, and visit for the free first class before you commit.',
      },
      {
        q: 'Do I get a certificate and help finding a job?',
        a: 'You receive a completion certificate. Job assistance covers resume building, LinkedIn, mock interviews and portfolio development.',
      },
      {
        q: 'What are the fees and how long is each course?',
        a: 'Fees, batch timings and course length depend on the course. Ask for the current details when you enquire or at the free first class.',
      },
    ],
  },
  {
    slug: 'haryana',
    metaTitle: 'Learn Web Development in Haryana',
    metaDescription:
      'Students from Hansi, Bhiwani, Rohtak and across Haryana join Innovaft courses in Hisar: UI/UX, frontend, backend, full stack, mobile and WordPress, with free first class.',
    h1: 'Learn web development from anywhere in Haryana',
    intro:
      'You do not need to live in Hisar to learn there. Students from Hansi, Bhiwani, Rohtak and other Haryana towns can join the in-person Innovaft courses at the Hisar centre. This page explains how it works if you are coming from outside the city.',
    sections: [
      {
        heading: 'Coming from another Haryana town',
        paragraphs: [
          'The courses run in person in Hisar, with online support in between. If you live in Hansi, you are close to the centre; from Bhiwani or Rohtak you will need to plan the travel, so it is worth visiting once for the free first class and seeing whether the schedule suits you.',
          'Tell us where you are coming from when you enquire, and we will explain which batch timings are possible.',
        ],
      },
      {
        heading: 'What you can study',
        paragraphs: [
          'UI/UX Design, Frontend Development, Backend Development, Full Stack Development, Mobile App Development, and CMS and WordPress. Every course is built around real projects, mentor support, a completion certificate and job assistance covering resume, LinkedIn, mock interviews and a portfolio.',
        ],
      },
      {
        heading: 'Not sure where to start?',
        paragraphs: [
          'Many students come after school or college without a clear path. You do not have to decide first. Come to a free first class, talk to the mentors and ask every question. If you have started somewhere else and are finding it hard, we can help you work out whether to change the pace or the direction.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can students from Hansi, Bhiwani or Rohtak join the Hisar courses?',
        a: 'Yes. Classes are in person at the Hisar centre. Visit for the free first class to check the travel and timings suit you.',
      },
      {
        q: 'Is there an online option for students in Haryana?',
        a: 'The courses are taught in person. Online support is available alongside, but it does not replace attending the classes.',
      },
      {
        q: 'Do I need a laptop or any experience?',
        a: 'No experience is needed. Ask at the free first class about what to bring.',
      },
      {
        q: 'What is the first step?',
        a: 'Send an enquiry from the learn page, or visit the Innovaft centre in Hisar for a free first class.',
      },
    ],
  },
]

export const getLearnPage = (slug: string) => learnPages.find((page) => page.slug === slug)
