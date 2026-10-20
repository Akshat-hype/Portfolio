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

// Keep status labels honest: concepts are clearly marked, while active builds
// and previously developed projects are described by their actual scope.
export const projects: Project[] = [
  {
    number: '01',
    title: 'USDB — Bitcoin-Backed Stablecoin',
    category: 'BLOCKCHAIN / PROTOCOL ENGINEERING',
    description: 'A Bitcoin-backed stablecoin protocol explored through programmable Runes and the Internet Computer ecosystem, with an emphasis on custody flows and cross-chain coordination.',
    stack: ['Rust', 'ICP Canisters', 'Bitcoin', 'Omnity', 'Chain-Key BTC'],
    status: 'PROTOCOL DEVELOPMENT',
    accent: 'violet',
    href: 'https://github.com/Akshat-hype',
    details: ['Protocol architecture for a BTC-backed asset', 'Exploration of custody and watcher workflows', 'ICP canister and Bitcoin integration concepts'],
  },
  {
    number: '02',
    title: 'Dynamic Configuration Server',
    category: 'INFRASTRUCTURE / DEVELOPER TOOLING',
    description: 'A backend control plane concept for managing application configuration across environments, with version history, validation, and safer configuration rollouts.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'REST APIs'],
    status: 'FLAGSHIP CONCEPT',
    accent: 'blue',
    href: 'https://github.com/Akshat-hype',
    details: ['Versioned configuration with rollback design', 'Environment-scoped access and schema validation', 'Caching, invalidation, and audit-trail considerations'],
  },
  {
    number: '03',
    title: 'Webhook Delivery & Retry Engine',
    category: 'BACKEND RELIABILITY / DISTRIBUTED SYSTEMS',
    description: 'A backend systems project designed around reliable webhook delivery, durable jobs, retry scheduling, idempotency, and dead-letter handling for failed deliveries.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Queues'],
    status: 'BUILD NEXT / SYSTEM DESIGN',
    accent: 'cyan',
    href: 'https://github.com/Akshat-hype',
    details: ['Durable delivery jobs and exponential-backoff retries', 'Idempotency keys and signed webhook payloads', 'Dead-letter queue, replay tooling, and delivery attempt logs'],
  },
  {
    number: '04',
    title: 'OracleX Prediction Market',
    category: 'WEB3 / API + SMART CONTRACTS',
    description: 'A prediction-market application combining a web interface and backend services with Solidity contracts for market-oriented on-chain workflows.',
    stack: ['Node.js', 'Express.js', 'Solidity', 'Hardhat', 'React'],
    status: 'PROJECT BUILD',
    accent: 'cyan',
    href: 'https://github.com/Akshat-hype',
    details: ['Backend API layer for application workflows', 'Smart-contract development and local testing with Hardhat', 'Integration between frontend, server, and contracts'],
  },
  {
    number: '05',
    title: 'GitHub Bounty Platform',
    category: 'DEVELOPER PLATFORM / WEB3',
    description: 'A blockchain-powered bounty workflow concept for connecting open-source issues, contributors, and transparent reward handling.',
    stack: ['React', 'Node.js', 'Solidity', 'REST APIs', 'EVM'],
    status: 'PROJECT BUILD',
    accent: 'violet',
    href: 'https://github.com/Akshat-hype',
    details: ['Issue-to-bounty workflow design', 'Backend coordination for users and bounty records', 'On-chain reward logic and transparent state'],
  },
  {
    number: '06',
    title: 'Waypoint',
    category: 'MOBILE PLATFORM / BACKEND APIs',
    description: 'A trip-planning application with a Flutter client and a backend for trip creation, retrieval, authentication, and persistent trip data.',
    stack: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'Supabase'],
    status: 'IN DEVELOPMENT',
    accent: 'blue',
    href: 'https://github.com/Akshat-hype',
    details: ['Trip creation and retrieval API workflows', 'Supabase-backed persistence and authentication', 'Mobile-to-backend integration and response handling'],
  },
  {
    number: '07',
    title: 'Kagzaat — Document Management',
    category: 'DOCUMENT SYSTEMS / BLOCKCHAIN',
    description: 'A document-management project exploring blockchain-backed verification and IPFS-based document storage for traceability and integrity.',
    stack: ['Blockchain', 'IPFS', 'Web APIs', 'JavaScript'],
    status: 'PROJECT BUILD',
    accent: 'cyan',
    href: 'https://github.com/Akshat-hype',
    details: ['Document storage and retrieval workflow', 'Content-addressed storage using IPFS', 'Verification-oriented blockchain integration'],
  },
  {
    number: '08',
    title: 'TaxFlow',
    category: 'FINTECH / AI WORKFLOW AUTOMATION',
    description: 'An AI-assisted tax workflow concept for secure document intake, structured extraction, validation, and guided financial processes.',
    stack: ['Node.js', 'PostgreSQL', 'AI workflows', 'REST APIs'],
    status: 'PRODUCT CONCEPT',
    accent: 'violet',
    href: 'https://github.com/Akshat-hype',
    details: ['Document-processing and extraction workflow design', 'Structured data validation and review boundaries', 'Secure orchestration for tax-related tasks'],
  },
  {
    number: '09',
    title: 'WoodIt',
    category: 'FREELANCE / E-COMMERCE WEB PLATFORM',
    description: 'A furniture website delivered with a customer-facing experience and an admin portal, backed by Supabase and styled with a modern responsive UI.',
    stack: ['Vite', 'React', 'Supabase', 'Tailwind CSS v4'],
    status: 'CLIENT PROJECT',
    accent: 'blue',
    href: 'https://github.com/Akshat-hype',
    details: ['Customer-facing furniture website and admin portal', 'Supabase integration for application data', 'Responsive UI implementation using Tailwind CSS v4'],
  },
  {
    number: '10',
    title: 'House of Balarwa',
    category: 'FREELANCE / CLIENT WEBSITE',
    description: 'A client web project focused on presenting the brand online through a polished, responsive website experience.',
    stack: ['React', 'Frontend Engineering', 'Responsive UI'],
    status: 'CLIENT PROJECT',
    accent: 'cyan',
    href: 'https://github.com/Akshat-hype',
    details: ['Client-focused website implementation', 'Responsive layouts across screen sizes', 'Attention to brand presentation and usability'],
  },
  {
    number: '11',
    title: 'Nawabi Laban',
    category: 'FREELANCE / CLIENT WEBSITE',
    description: 'A client website project built to establish a clear digital presence and make the brand experience accessible across devices.',
    stack: ['React', 'Frontend Engineering', 'Responsive UI'],
    status: 'CLIENT PROJECT',
    accent: 'violet',
    href: 'https://github.com/Akshat-hype',
    details: ['Brand-oriented website development', 'Mobile-friendly page layouts', 'Frontend implementation and visual consistency'],
  },
]
