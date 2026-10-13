import { courses } from '../lib/courses'
import { services } from '../lib/services'

export type FieldType = 'text' | 'textarea' | 'select'

export type Field = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
}

export type Audience = 'client' | 'student'

export type EnquiryOption = {
  value: string
  label: string
  group: 'project' | 'mobile' | 'cleanup' | 'learning' | 'other'
}

const groupFor = (slug: string): EnquiryOption['group'] => {
  if (slug === 'react-native-app-development') return 'mobile'
  if (slug === 'claude-code-export-cleanup' || slug === 'ai-built-app-cleanup')
    return 'cleanup'
  return 'project'
}

// What a client can pick: one option per service page, plus "something else".
export const CLIENT_OPTIONS: EnquiryOption[] = [
  ...services.map((service) => ({
    value: service.slug,
    label: service.title,
    group: groupFor(service.slug),
  })),
  { value: 'other', label: 'Something else', group: 'other' as const },
]

// What a student can pick: one of the Innovaft courses, or not sure yet.
export const STUDENT_OPTIONS: EnquiryOption[] = [
  ...courses.map((course) => ({
    value: course.slug,
    label: course.name,
    group: 'learning' as const,
  })),
  { value: 'unsure', label: 'Not sure yet', group: 'learning' as const },
]

export const getOption = (value: string, audience?: Audience) => {
  const lists =
    audience === 'student'
      ? [STUDENT_OPTIONS]
      : audience === 'client'
        ? [CLIENT_OPTIONS]
        : [CLIENT_OPTIONS, STUDENT_OPTIONS]
  for (const list of lists) {
    const found = list.find((option) => option.value === value)
    if (found) return found
  }
  return undefined
}

// Deep links use ?service=<slug>. "learning" means the student path.
export const audienceFor = (value?: string): Audience | undefined => {
  if (!value) return undefined
  if (value === 'learning') return 'student'
  return CLIENT_OPTIONS.some((option) => option.value === value)
    ? 'client'
    : undefined
}

// The detail questions depend on what the person picked first.
export const DETAIL_FIELDS: Record<EnquiryOption['group'], Field[]> = {
  project: [
    {
      name: 'projectType',
      label: 'Is this a new project or changes to an existing one?',
      type: 'select',
      required: true,
      options: ['New project', 'Changes to an existing project', 'Not sure yet'],
    },
    {
      name: 'referenceLink',
      label: 'Link to your Figma file, website or repository (optional)',
      type: 'text',
      placeholder: 'https://',
    },
    {
      name: 'description',
      label: 'Tell me about the project and the features you need',
      type: 'textarea',
      required: true,
    },
  ],
  mobile: [
    {
      name: 'platform',
      label: 'Which platform?',
      type: 'select',
      required: true,
      options: ['iOS and Android', 'iOS only', 'Android only', 'Not sure yet'],
    },
    {
      name: 'backend',
      label: 'Do you already have a backend or API?',
      type: 'select',
      required: true,
      options: ['Yes', 'No', 'Not sure'],
    },
    {
      name: 'description',
      label: 'Tell me about the app and who it is for',
      type: 'textarea',
      required: true,
    },
  ],
  cleanup: [
    {
      name: 'tool',
      label: 'Which tool was it built with?',
      type: 'select',
      required: true,
      options: ['Claude Code', 'Lovable', 'Bolt', 'Another AI tool', 'Not sure'],
    },
    {
      name: 'referenceLink',
      label: 'Link to the repository or live app (optional)',
      type: 'text',
      placeholder: 'https://',
    },
    {
      name: 'description',
      label: 'What is not working or what do you need before launch?',
      type: 'textarea',
      required: true,
    },
  ],
  learning: [
    {
      name: 'level',
      label: 'Your current level',
      type: 'select',
      required: true,
      options: ['Complete beginner', 'Some experience', 'Working in tech'],
    },
    {
      name: 'goal',
      label: 'What is your goal?',
      type: 'select',
      required: true,
      options: ['Get a job', 'Freelancing', 'Start my own business', 'Not sure yet'],
    },
    {
      name: 'mode',
      label: 'How would you like to learn?',
      type: 'select',
      required: true,
      options: ['In person in Hisar', 'Online', 'Either'],
    },
    {
      name: 'description',
      label: 'Anything else I should know? (optional)',
      type: 'textarea',
    },
  ],
  other: [
    {
      name: 'description',
      label: 'How can I help?',
      type: 'textarea',
      required: true,
    },
  ],
}

export const TIMELINES = [
  'As soon as possible',
  'Within a month',
  '1 to 3 months',
  'Flexible',
]

export const SOURCES = [
  'Fiverr',
  'Upwork',
  'LinkedIn',
  'Contra',
  'Instagram',
  'Google search',
  'Referral',
  'Other',
]

export const CONTACT_METHODS = ['Email', 'WhatsApp', 'Phone call']
