export type Service = {
  slug: string
  title: string
  tagline: string
  // meta description, keep under ~160 characters
  metaDescription: string
  summary: string
  // Optional hero illustration from the designer, e.g. '/services/figma-to-nextjs.webp'.
  // Leave undefined until the file exists in /public: the page then shows no image.
  image?: string
  forWho: string[]
  deliverables: string[]
  process: { title: string; text: string }[]
  stack: string[]
  faqs: { q: string; a: string }[]
}

const commonProcess = (
  discover: string,
  build: string,
): Service['process'] => [
  { title: 'Discover', text: discover },
  { title: 'Plan', text: 'We agree scope, milestones and a delivery plan before any code is written, so there are no surprises on timeline or cost.' },
  { title: 'Build', text: build },
  { title: 'Launch & support', text: 'I deploy the project, hand over the code and documentation, and stay available for fixes and improvements after launch.' },
]

export const services: Service[] = [
  {
    slug: 'figma-to-nextjs',
    title: 'Figma to Next.js Website',
    tagline: 'Pixel-accurate, fast and SEO-ready websites built from your Figma design.',
    metaDescription:
      'Turn your Figma design into a fast, responsive, SEO-ready Next.js website. React, TypeScript and Tailwind CSS by a full-stack developer with 7 years of experience.',
    summary:
      'I convert Figma designs into clean, production-ready Next.js websites. The result matches your design on every screen size, loads fast and is structured so search engines and your own team can work with it.',
    forWho: [
      'Founders and agencies with a finished Figma design that needs a developer',
      'Designers who want their work built exactly as designed',
      'Businesses replacing a slow or outdated website',
    ],
    deliverables: [
      'Responsive pages that match the design on mobile, tablet and desktop',
      'Reusable React components and a consistent Tailwind CSS design system',
      'Animations and interactions from the design, built with Framer Motion or GSAP',
      'SEO basics: metadata, sitemap, structured data and optimised images',
      'Deployment to Vercel or your own hosting',
    ],
    process: commonProcess(
      'I review the Figma file, the pages, the components and any animation notes, and flag anything that needs a decision before building.',
      'I build page by page in Next.js and TypeScript, sharing progress on a preview link so you can review as we go.',
    ),
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma'],
    faqs: [
      {
        q: 'What do you need from me to start?',
        a: 'A Figma file with the designs for each page, ideally with mobile and desktop versions, plus any copy and images. If something is missing, I will list it up front.',
      },
      {
        q: 'Can you add a CMS or a contact form?',
        a: 'Yes. I can connect a form to email, or add a CMS if you need to edit content yourself. We decide this during planning.',
      },
    ],
  },
  {
    slug: 'figma-ui-ux-design',
    title: 'Figma UI/UX Design',
    tagline: 'Clear, usable interface design for websites, web apps and mobile apps.',
    metaDescription:
      'UI/UX design in Figma for websites, SaaS dashboards and mobile apps, designed by a developer so everything can actually be built. Based in Hisar, Haryana.',
    summary:
      'I design interfaces in Figma with development in mind. Because I also build what I design, the screens are practical to implement and do not fall apart when real content and edge cases arrive.',
    forWho: [
      'Startups defining the first version of a product',
      'Businesses that need a redesign of an existing website or app',
      'Teams that want design and development handled together',
    ],
    deliverables: [
      'User flows and wireframes',
      'High-fidelity screens for mobile and desktop',
      'A component library and style guide in Figma',
      'Clickable prototypes to test the experience early',
      'Developer-ready files, with optional build-out in Next.js or React Native',
    ],
    process: commonProcess(
      'We talk through your goals, users and constraints, and look at similar products to decide what the experience should feel like.',
      'I move from wireframes to high-fidelity screens and prototypes, with review rounds at each stage.',
    ),
    stack: ['Figma', 'Prototyping', 'Design systems', 'Next.js', 'React Native'],
    faqs: [
      {
        q: 'Can you design and develop it as well?',
        a: 'Yes. Doing both avoids hand-off problems. You can also hire me for design only and give the files to your own developers.',
      },
      {
        q: 'Do you design mobile apps?',
        a: 'Yes, for both iOS and Android, and I can build them in React Native.',
      },
    ],
  },
  {
    slug: 'saas-dashboard-development',
    title: 'Custom SaaS Dashboard Development',
    tagline: 'Admin panels, analytics dashboards and multi-user SaaS products built to your needs.',
    metaDescription:
      'Custom SaaS dashboard development with Next.js, React and Node.js: authentication, roles, data tables, charts and billing-ready architecture.',
    summary:
      'I build custom dashboards and SaaS products, from internal admin panels to customer-facing platforms. The focus is a clean data model, secure access and an interface people can use without training.',
    forWho: [
      'Founders building a SaaS product or MVP',
      'Companies that need an internal admin or reporting tool',
      'Teams outgrowing spreadsheets and no-code tools',
    ],
    deliverables: [
      'Authentication and role-based access',
      'Data tables, filters, forms and charts',
      'REST APIs and a database designed for your data',
      'Integrations with third-party services and payments where needed',
      'Deployment, environment setup and documentation',
    ],
    process: commonProcess(
      'We map the users, roles and the key actions each person needs to perform, and decide what belongs in the first release.',
      'I build in short iterations, starting with the core workflow so you can test real usage early.',
    ),
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind CSS'],
    faqs: [
      {
        q: 'Can you start with an MVP?',
        a: 'Yes. I recommend launching a focused first version and extending it based on real usage.',
      },
      {
        q: 'Can you work with our existing backend?',
        a: 'Yes. I can build the dashboard on top of existing APIs, or extend the backend if needed.',
      },
    ],
  },
  {
    slug: 'full-stack-web-app-development',
    title: 'Full-Stack Web App Development',
    tagline: 'End-to-end web applications, from database and API to polished interface.',
    metaDescription:
      'Full-stack web app development with Next.js, React and Node.js. One developer for the frontend, backend, database and deployment.',
    summary:
      'I build complete web applications: the interface, the API, the database and the deployment. Having one developer own the whole stack keeps communication simple and the architecture consistent.',
    forWho: [
      'Businesses that need a custom web application',
      'Startups that need an MVP built end to end',
      'Teams that need a senior full-stack developer for a project',
    ],
    deliverables: [
      'Frontend in Next.js and React with TypeScript',
      'Backend APIs in Node.js with authentication',
      'Database design and implementation',
      'Third-party integrations such as email, payments and analytics',
      'CI/CD, hosting setup and handover documentation',
    ],
    process: commonProcess(
      'We define the problem, the users and the must-have features, and I propose a technical approach with trade-offs explained in plain language.',
      'I build the app in stages, deploying early so you can test it in a real environment.',
    ),
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind CSS'],
    faqs: [
      {
        q: 'Who owns the code?',
        a: 'You do. The code, repository and documentation are handed over at the end of the project.',
      },
      {
        q: 'Can you take over an existing project?',
        a: 'Yes. I start with a review of the code and give you an honest assessment before proposing changes.',
      },
    ],
  },
  {
    slug: 'ai-automation-n8n',
    title: 'AI Automation & n8n Workflows',
    tagline: 'Automate repetitive work with n8n and AI, so your team can spend its time on the work that matters.',
    metaDescription:
      'AI automation and n8n workflow development: connect your apps, automate leads, support and reports, and add AI agents with OpenAI or Claude. Hisar and worldwide.',
    summary:
      'I design and build automations that connect the tools your business already uses and add AI where it genuinely helps: sorting enquiries, drafting replies, pulling data out of documents, producing reports. Workflows are built with n8n, Make or custom code, and include error handling and a human check wherever a mistake would matter.',
    forWho: [
      'Small businesses and teams doing the same manual tasks every day',
      'Founders and agencies who want leads, follow-ups and reports to run on their own',
      'Teams that want an AI assistant that answers from their own documents',
    ],
    deliverables: [
      'Workflows in n8n (self-hosted or cloud), or in Make or Zapier if they fit better',
      'Connections to your CRM, email, forms, spreadsheets, databases and other tools through their APIs and webhooks',
      'AI steps with OpenAI or Claude: sorting, summaries, drafting replies, data extraction',
      'AI assistants and agents that answer from your documents (retrieval, often called RAG)',
      'Error alerts, retries and logs, plus documentation so your team can edit the workflows',
    ],
    process: commonProcess(
      'We list the tasks that eat the most time, who does them today and what "done" looks like, then pick the one with the biggest payoff to automate first.',
      'I build the workflow in small steps, test it with real examples and add error handling before it touches live data.',
    ),
    stack: ['n8n', 'Make', 'Zapier', 'OpenAI API', 'Claude API', 'MCP', 'Webhooks and REST APIs', 'RAG', 'Node.js'],
    faqs: [
      {
        q: 'n8n, Make or Zapier: which should I use?',
        a: 'n8n can be self-hosted, which can lower running costs at high volume and keeps data on your own server. Make and Zapier are quicker to start with. I recommend the one that fits your volume, budget and privacy needs.',
      },
      {
        q: 'Is it safe to send my business data to an AI model?',
        a: 'We decide together which data is sent, remove or mask sensitive fields, and I explain the privacy options of each provider before anything is built.',
      },
      {
        q: 'What if the AI makes a mistake?',
        a: 'Important steps get a human approval before they act, and every workflow logs what it did, so mistakes can be caught and fixed.',
      },
    ],
  },
  {
    slug: 'crm-custom-software-development',
    title: 'CRM & Custom Software Development',
    tagline: 'Software shaped around how your business actually works.',
    metaDescription:
      'Custom CRM and business software development: leads, customers, tasks, reports and automation, built with Next.js and Node.js.',
    summary:
      'Off-the-shelf tools rarely match a real business process. I build CRMs and custom business software that fit your workflow, so your team stops working around the tool.',
    forWho: [
      'Sales and service teams managing leads and customers',
      'Businesses running on spreadsheets and manual follow-ups',
      'Companies that need a tool built around their own process',
    ],
    deliverables: [
      'Lead, customer and pipeline management',
      'Tasks, reminders and activity history',
      'Reports and dashboards for your team',
      'User roles and permissions',
      'Email and messaging integrations, import and export of existing data',
    ],
    process: commonProcess(
      'I learn how your team works today, where time is lost, and what the new system must do on day one.',
      'I build the core workflow first and add features in stages, with your team testing along the way.',
    ),
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase'],
    faqs: [
      {
        q: 'Why not use an existing CRM?',
        a: 'Often you should. If an existing tool fits your process, I will tell you. Custom software makes sense when your process is specific or when you are paying for many features you do not use.',
      },
      {
        q: 'Can you migrate our current data?',
        a: 'Yes. I can import data from spreadsheets or other systems as part of the project.',
      },
    ],
  },
  {
    slug: 'ecommerce-app-development',
    title: 'E-commerce App Development',
    tagline: 'Online stores and shopping apps that are fast, easy to manage and ready to grow.',
    metaDescription:
      'E-commerce website and app development with Next.js and React: product catalogues, cart, checkout, payments and an admin panel.',
    summary:
      'I build online stores with a fast storefront, a straightforward checkout and an admin panel your team can manage without a developer.',
    forWho: [
      'Brands launching or rebuilding an online store',
      'Local businesses moving to online sales',
      'Stores that have outgrown their current platform',
    ],
    deliverables: [
      'Product catalogue, search and filters',
      'Cart, checkout and payment gateway integration',
      'Order management and an admin panel',
      'SEO-ready product pages',
      'Mobile-friendly design, with an optional React Native shopping app',
    ],
    process: commonProcess(
      'We review your products, catalogue size, payment and delivery requirements, and decide what to build custom and what to integrate.',
      'I build the storefront, checkout and admin panel, testing the full order flow before launch.',
    ),
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'React Native'],
    faqs: [
      {
        q: 'Which payment methods can you integrate?',
        a: 'That depends on your country and payment provider. We confirm this during planning and I integrate the gateway that fits your business.',
      },
      {
        q: 'Do you build mobile shopping apps too?',
        a: 'Yes, with React Native, sharing the same backend as the website.',
      },
    ],
  },
  {
    slug: 'react-native-app-development',
    title: 'React Native Mobile App Development',
    tagline: 'iOS and Android apps from a single React Native codebase.',
    metaDescription:
      'React Native mobile app development for iOS and Android. One codebase, shared logic with your Next.js web app, delivered by a full-stack developer.',
    summary:
      'I build iOS and Android apps with React Native. One codebase for both platforms reduces cost, and the app can share an API and logic with your Next.js website or dashboard.',
    forWho: [
      'Startups building a mobile MVP',
      'Businesses adding a mobile app to an existing website or platform',
      'Teams that want web and mobile handled by the same developer',
    ],
    deliverables: [
      'iOS and Android app from one codebase',
      'Backend API and authentication, or integration with your existing API',
      'Push notifications and device features where needed',
      'App store submission support',
      'Maintenance and updates after release',
    ],
    process: commonProcess(
      'We define the core user journey, the platforms you need and how the app connects to your backend.',
      'I build and share test builds regularly so you can try the app on your own phone as it develops.',
    ),
    stack: ['React Native', 'TypeScript', 'Node.js', 'Firebase', 'Figma'],
    faqs: [
      {
        q: 'React Native or native apps?',
        a: 'For most business apps React Native is faster and more affordable. If your app depends on heavy native features, I will tell you honestly.',
      },
      {
        q: 'Can the app share code with my website?',
        a: 'Often yes, especially business logic, types and API clients when both are written in TypeScript.',
      },
    ],
  },
  {
    slug: 'claude-code-export-cleanup',
    title: 'Claude Code Export Cleanup',
    tagline: 'Turn code generated with Claude Code into a maintainable, production-ready project.',
    metaDescription:
      'Cleanup and hardening of projects built with Claude Code: structure, bugs, security, performance and deployment, reviewed by an experienced developer.',
    summary:
      'AI tools can produce a working prototype quickly, but the code often needs a human review before it is safe to ship. I clean up, restructure and harden Claude Code projects so they are ready for real users.',
    forWho: [
      'Founders who built a prototype with Claude Code and need it production-ready',
      'Teams inheriting AI-generated code they do not fully trust',
      'Anyone whose AI-built project works in demos but breaks in real use',
    ],
    deliverables: [
      'Code review with a written list of problems found',
      'Project restructure: folders, naming, duplicated code and dead files',
      'Bug fixes and error handling',
      'Security check: secrets, authentication, input validation and dependencies',
      'Performance work, tests for critical flows and deployment setup',
    ],
    process: commonProcess(
      'I review the repository, run the project and send you an honest assessment: what is fine, what is risky and what I would fix first.',
      'I fix issues in priority order, in small reviewable commits, so you can see exactly what changed and why.',
    ),
    stack: ['Claude Code', 'Next.js', 'React', 'TypeScript', 'Node.js'],
    faqs: [
      {
        q: 'Will you rewrite my whole project?',
        a: 'Only if it is the cheaper option. In most cases I keep what works and fix what does not.',
      },
      {
        q: 'Can you keep working with Claude Code after cleanup?',
        a: 'Yes. I can leave the project in a structure that works well with AI tools, with clear conventions so future changes stay clean.',
      },
    ],
  },
  {
    slug: 'ai-built-app-cleanup',
    title: 'Lovable, Bolt & AI-Built App Cleanup',
    tagline: 'Take an app built with Lovable, Bolt or another AI tool from prototype to production.',
    metaDescription:
      'Fix and finish apps built with Lovable, Bolt, v0 or other AI tools: bugs, security, backend, performance and deployment by a full-stack developer.',
    summary:
      'Tools like Lovable and Bolt are great for getting an idea on screen. When it is time for real users, payments or data, the app usually needs engineering work. I take it the rest of the way.',
    forWho: [
      'Non-technical founders who built a prototype with an AI tool',
      'Teams stuck on bugs the AI tool cannot fix',
      'Projects that need a proper backend, security or scaling',
    ],
    deliverables: [
      'Audit of the codebase, database and authentication setup',
      'Fixes for bugs and broken flows',
      'A proper backend, database and API where needed',
      'Security hardening and secrets handling',
      'Migration to your own hosting and repository, with documentation',
    ],
    process: commonProcess(
      'You show me the app and tell me what is not working. I check the code and setup and tell you what it will take to get it production-ready.',
      'I fix and rebuild the parts that need it and keep what already works, so you do not pay twice.',
    ),
    stack: ['Lovable', 'Bolt', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Firebase'],
    faqs: [
      {
        q: 'Can you work with a Lovable or Bolt project directly?',
        a: 'Yes. Most of these tools export or sync to a repository, which I can work in.',
      },
      {
        q: 'Do I need to understand the code?',
        a: 'No. I explain what I find and what I change in plain language.',
      },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management & Technical Leadership',
    tagline: 'A technical lead who can plan, coordinate and deliver your software project.',
    metaDescription:
      'Project management and technical leadership for software projects: scoping, planning, team coordination and delivery by a CTO and full-stack developer.',
    summary:
      'Software projects go wrong when scope, communication or technical decisions drift. I act as project manager and technical lead, keeping the work on track and the decisions sound.',
    forWho: [
      'Founders managing an outsourced or in-house development team',
      'Businesses starting a large software project',
      'Teams that need someone to bridge business and engineering',
    ],
    deliverables: [
      'Scoping, estimates and a phased roadmap',
      'Technical architecture decisions explained in plain language',
      'Sprint planning, progress tracking and regular updates',
      'Code review and quality checks for your team',
      'Vendor and team coordination through delivery',
    ],
    process: commonProcess(
      'We clarify the goals, the team, the budget and what success means for the project.',
      'I coordinate the work with regular check-ins and reviews, and raise risks early.',
    ),
    stack: ['Roadmapping', 'Code review', 'Architecture', 'Next.js', 'React Native', 'Node.js'],
    faqs: [
      {
        q: 'Can you manage and build?',
        a: 'Yes, or I can manage only and let your developers build. It depends on what you need.',
      },
      {
        q: 'Do you work with existing teams?',
        a: 'Yes. I can join an existing team as technical lead or reviewer.',
      },
    ],
  },
]

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug)
