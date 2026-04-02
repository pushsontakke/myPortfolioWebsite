// Single source of truth for ALL site data. Structure it with these sections, using `as const` for type safety:

// - `SITE` — name, tagline, email (`piyushsontakke2001@gmail.com`), GitHub (`piyushsontakke`), LinkedIn, resume path
// - `NAV_ITEMS` — id, label, num for each section
// - `HERO_ROLES` — the 4 rotating role titles
// - `HERO_HEADLINE_WORDS` — the staggered word animation words
// - `HERO_METRICS` — uptime, concurrent users, orders/day, API response
// - `ABOUT_SIGNALS` — the 3 signal chips (Ships Fast, Full Ownership, Systems Thinker)
// - `ABOUT_PARAGRAPHS` — the 3 editorial paragraphs
// - `SKILL_GROUPS` — grouped skills with icon names, spans, learning flags, badges
// - `EXPERIENCE` — role, company, period, achievements, tags (payment gateways: Razorpay, PhonePe, Cashfree)
// - `PROJECTS` — Gyfton + Ticketing Platform with all metrics, stack, highlights, architecture
// - `SERVICES` — 5 service offerings
// - `EDUCATION` — degree (B.E. Computer Science, SPPU, 2023) + certification (IIT Mandi GenAI)
// - `CONTACT_STATS`, `FOOTER_LINKS`



/* ─────────────────────────────────────────────
   Site-wide constants — single source of truth
   ─────────────────────────────────────────────
   All text, URLs, metrics, and structured data live here.
   Components import what they need — zero hardcoded strings in JSX.
   ───────────────────────────────────────────── */

// ── Personal Info ──

export const SITE = {
  name: "Piyush Sontakke",
  tagline: "Product Engineer who ships — not just codes.",
  role: "Lead Product Engineer",
  location: "Pune, India",
  email: "piyushsontakke28@gmail.com",
  phone: "+91 7507284768",
  socials: {
    github: "https://github.com/pushsontakke",
    linkedin: "https://linkedin.com/in/piyush-sontakke",
    twitter: "https://x.com/PiyushSontakke4",
  },
  resume: "/Piyush_Sontakke_Resume.pdf",
} as const;

// ── Navigation ──

export const NAV_ITEMS = [
  { id: "hero", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "experience", label: "Experience", num: "04" },
  { id: "projects", label: "Projects", num: "05" },
  { id: "services", label: "Services", num: "06" },
  { id: "testimonials", label: "Testimonials", num: "07" },
  { id: "education", label: "Education", num: "08" },
  { id: "contact", label: "Contact", num: "09" },
] as const;

// ── Hero Section ──

export const HERO_ROLES = [
  "Full-Stack Engineer",
  "Product Thinker",
  "Founding Engineer",
  "Backend Specialist",
] as const;

export const HERO_HEADLINE_WORDS = [
  "Product", "Engineer", "who", "ships", "—", "not", "just", "codes",
] as const;

export const HERO_SUBTITLE =
  "Full-Stack Product Engineer · Pune · Python · Django · React · GenAI";

export const HERO_METRICS = [
  { value: "2.5+", label: "Years Shipping" },
  { value: "2", label: "Companies" },
  { value: "3", label: "Payment Integrations" },
  { value: "E2E", label: "Ownership" },
] as const;

// ── About Section ──

export const ABOUT_SIGNALS = [
  { icon: "Zap", label: "Ships Fast", desc: "0→1 product delivery" },
  { icon: "Code", label: "Full Ownership", desc: "Schema design to production deployment" },
  { icon: "Layers", label: "Systems Thinker", desc: "Backend architecture, async pipelines" },
] as const;

export const ABOUT_PARAGRAPHS = [
  'I think in systems, not just features. From database schema to deployment pipeline, I make architecture decisions - not just implement tasks handed to me. I\'m the engineer who asks "why are we building this?" before asking "how?"',
  "For 2.5 years, I've built production backend systems across two companies. At Hushbox Gifting Solution, I own the full backend as Lead Product Engineer - APIs, payment integrations, async pipelines, deployment. At Techdenovo before that, I built fintech integration workflows connecting multiple payment gateways with 100% reconciliation accuracy.",
  "Now I'm expanding into AI - completing a PG Certification in Generative AI & Multi-Agent Systems from IIT Mandi, and building with OpenAI APIs, LangChain, and RAG pipelines. Evolving from backend engineer to AI-capable product engineer.",
] as const;

// ── Skills Section ──

export type Skill = { name: string; learning?: boolean };

export type SkillGroup = {
  title: string;
  icon: string;
  span?: string;
  badge?: string;
  skills: (string | Skill)[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Backend & APIs",
    icon: "Server",
    span: "lg:col-span-2",
    skills: [
      "Python", "Django", "Django REST Framework", "REST APIs",
      "Webhook Architecture", "JWT Auth", "RBAC",
    ],
  },
  {
    title: "Async & Queues",
    icon: "Zap",
    skills: ["Celery", "Redis", "Background Jobs", "Cron Scheduling"],
  },
  {
    title: "Databases",
    icon: "Database",
    span: "lg:col-span-1",
    skills: ["PostgreSQL", "Django ORM", "Query Optimization"],
  },
  {
    title: "Infrastructure",
    icon: "Cloud",
    skills: ["AWS EC2", "Docker", "Nginx", "Linux"],
  },
  {
    title: "Frontend",
    icon: "Monitor",
    span: "lg:col-span-2",
    skills: [
      "React", "Next.js", "TypeScript", "Tailwind CSS",
      "Redux", "Zustand", "TanStack Query",
    ],
  },
  {
    title: "Animation",
    icon: "Sparkles",
    skills: [{ name: "Motion", learning: true }],
  },
  {
    title: "Testing",
    icon: "TestTube",
    skills: [
      "pytest",
      { name: "Jest", learning: true },
      { name: "Cypress", learning: true },
      { name: "Playwright", learning: true },
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: ["Git", "Postman", "Figma", "Docker Compose"],
  },
  {
    title: "AI / GenAI",
    icon: "Brain",
    span: "lg:col-span-3",
    badge: "In Progress",
    skills: [
      "OpenAI API", 
      "RAG Pipelines",
      "Prompt Engineering",
      "LangChain",
      "LlamaIndex",
      "Vector Databases",
      "AI Agents",
      "Multi-Agent Systems",
      "LLMOps",
    ],
  },
];

// ── Experience Section ──

export const EXPERIENCES = [
  {
    role: "Lead Product Engineer",
    company: "Hushbox Gifting Solution Pvt. Ltd.",
    period: "Nov 2025 – Present",
    location: "Remote",
    tags: ["Startup", "Full Backend Ownership", "Remote"],
    summary:
      "Own the full backend lifecycle — schema design, API development, payment integrations, Docker/Nginx deployment on AWS EC2, and production stability monitoring.",
    achievements: [
      "Integrated third-party payment gateways (SabPaisa, Pinelabs) with custom AES encryption and webhook-based callback handling",
      "Built async task pipelines using Celery and Redis for order processing and real-time balance updates",
      "Designed scalable backend services using Django and PostgreSQL with optimized ORM queries and pagination",
      "Implemented webhook receivers for async data fetching from payment and logistics providers with retry and error handling",
      "Scheduled cron-based background processes to sync real-time account balances and inventory state",
      "Owned full backend lifecycle: schema design, API development, Docker/Nginx deployment on AWS EC2",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Techdenovo",
    period: "May 2024 – Nov 2025",
    location: "India",
    tags: ["Fintech", "API Integrations", "Backend"],
    summary:
      "Built fintech integration workflows connecting SabPaisa, PhonePe, and Pinelabs APIs with 100% reconciliation accuracy.",
    achievements: [
      "Developed Python-based fintech integration workflows connecting SabPaisa, PhonePe, and Pinelabs APIs",
      "Built webhook handlers and callback processing for payment status updates with retry logic",
      "Refactored legacy APIs using Django REST Framework — improved data consistency by 50% and response time by 15%",
      "Built backend automation for order, transaction, and operational workflows with async job scheduling",
      "Debugged production issues across services, improving uptime and reliability under peak traffic",
    ],
  },
] as const;

// ── Projects Section ──

export const PROJECTS = [
  {
    title: "Gyfton",
    subtitle: "Product Gifting Platform — backend architecture & API development",
    status: "Production" as const,
    statusColor: "accent" as const,
    access: { label: "Private · Company Product", icon: "Lock" },
    stack: [
      "Next.js",
      "Python",
      "Django Rest Framework",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AWS EC2",
      "Nginx",
      "Gunicorn",
      "Docker",
      "AWS S3",
    ],
    metrics: [] as { value: string; label: string }[],
    highlights: [
      "Architected backend APIs for products, orders, categories, and user management with clean service separation",
      "Implemented secure JWT authentication and role-based access control (RBAC)",
      "Built webhook-driven integrations for async data fetching from external catalogue and logistics providers",
      "Background task processing using Celery/Redis for order lifecycle management and audit logging",
      "Automated tests (pytest) covering API endpoints, webhook simulations, and integration edge cases",
      "Deployed on AWS EC2 with Docker Compose and Nginx, optimized for high concurrency",
    ],
    cta: { label: "View Case Study", href: null as string | null },
    github: null as string | null,
  },
  {
    title: "High Concurrency Ticketing",
    subtitle:
      "Flash-sale ticketing: 10,000 users, 100 seats, zero double-bookings",
    status: "In Progress" as const,
    statusColor: "warning" as const,
    access: { label: "In active development", icon: null as string | null },
    stack: [
      "Django", 
      "DRF", 
      "PostgreSQL", 
      "Redis",      
      "Celery", 
      "Docker", 
      "Prometheus", 
      "Grafana", 
      "Sentry",
    ],
    architecture: [
      { key: "Hybrid Locking", value: "Redis SETNX + PostgreSQL SELECT FOR UPDATE" },
      { key: "Idempotency Keys", value: "UUID on all payment ops" },
      { key: "CAP Theorem", value: "CP — Consistency over Availability" },
      { key: "Architecture", value: "SOA Monorepo" },
      { key: "Failure Handling", value: "Redis fallback → DB locks" },
      { key: "Reconciliation", value: "Celery Beat cron for orphaned locks" },
    ],
    metrics: [
      { value: "<200ms", label: "Seat Check" },
      { value: "<2s", label: "Booking" },
      { value: "99.9%", label: "Uptime Target" },
      { value: "10x", label: "Traffic Spike" },
    ],
    tags: [
      "Roles: Attendee · Organizer · Admin",
      "Tickets: VIP · Early Bird · Standard",
    ],
    highlights: [],
    cta: { label: "View on GitHub", href: "https://github.com/pushsontakke" },
    github: "https://github.com/pushsontakke",
  },
];

// ── Services Section ──

export const SERVICES = [
  {
    icon: "Rocket",
    title: "MVP Development (0→1)",
    desc: "Full-stack. DB design to deployed product. 4–6 weeks.",
    active: true,
  },
  {
    icon: "Brain",
    title: "AI Feature Integration",
    desc: "LLM chatbots, RAG search, AI summarizers. GenAI-certified.",
    active: true,
  },
  {
    icon: "Globe",
    title: "Next.js Web Applications",
    desc: "Fast, SEO-optimized, production-grade. Scales with your growth.",
    active: true,
  },
  {
    icon: "LayoutDashboard",
    title: "SaaS Dashboards & Internal Tools",
    desc: "Django + React. Built for teams. Retainer-ready.",
    active: true,
  },
  {
    icon: "Gauge",
    title: "Performance & Architecture Consulting",
    desc: "High-concurrency audits. Real production experience.",
    active: false,
    badge: "Coming Soon",
  },
] as const;

// ── Education Section ──

export const EDUCATION = {
  degree: {
    title: "B.Tech — Electronics & Communication Engineering",
    institution: "Rajiv Gandhi College of Engineering, Chandrapur",
    year: "2023",
    location: "India",
  },
  certification: {
    title: "PG Certification in Generative AI & Multi-Agent Systems",
    institution: "CodingNinjas × IIT Mandi-TIH",
    badge: "NSDC Approved · Govt. Recognized · Skill India",
    status: "In Progress",
    currentModule: "Module 2 of 4",
    progress: 50,
    totalModules: 4,
    completedModules: 2,
    curriculum: [
      "Prompt Engineering",
      "RAG Pipelines",
      "LLM APIs",
      "AI Agents",
      "Multi-Agent Systems",
      "LangChain",
      "LlamaIndex",
      "Vector DBs",
      "LLMOps",
    ],
  },
} as const;

// ── Contact Section ──

export const CONTACT_ROLES =
  "Founding Engineer · Product Engineer · Backend Engineer";

export const CONTACT_SERVICES = "MVPs · AI Features · Full-Stack SaaS";

export const CONTACT_STATS = [
  { value: "2.5+", label: "Years" },
  { value: "2", label: "Companies" },
  { value: "1", label: "Product Built" },
] as const;

// ── Footer ──

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
