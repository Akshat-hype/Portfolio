export type Project = {
  number: string
  title: string
  category: string
  description: string
  stack: string[]
  status: string
  accent: 'violet' | 'blue' | 'cyan'
  href: string
  details: string[]
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Dynamic Configuration Server',
    category: 'INFRASTRUCTURE / DEVELOPER TOOLING',
    description: 'A central control plane for application configuration—designed around versioned values, environment separation, validation, and safe delivery.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    status: 'FLAGSHIP CONCEPT',
    accent: 'violet',
    href: 'https://github.com/',
    details: ['Versioned configuration with rollback paths', 'Environment-scoped access and validation', 'Caching strategy and invalidation design'],
  },
  {
    number: '02',
    title: 'TaxFlow',
    category: 'AI WORKFLOWS / FINTECH',
    description: 'An AI-assisted tax and financial workflow concept connecting document intake, structured extraction, and guided business processes.',
    stack: ['Node.js', 'PostgreSQL', 'AI workflows', 'APIs'],
    status: 'PRODUCT CONCEPT',
    accent: 'blue',
    href: 'https://github.com/',
    details: ['Document-processing workflow design', 'Structured data and validation boundaries', 'Secure workflow orchestration'],
  },
  {
    number: '03',
    title: 'Waypoint',
    category: 'TRAVEL PLATFORM / API DESIGN',
    description: 'A trip-planning application backed by API-driven trip management, authentication, and persistent data workflows.',
    stack: ['Node.js', 'Express.js', 'Supabase', 'REST APIs'],
    status: 'IN DEVELOPMENT',
    accent: 'cyan',
    href: 'https://github.com/',
    details: ['Trip creation and retrieval endpoints', 'Authentication and database integration', 'Mobile-to-backend API workflows'],
  },
]
