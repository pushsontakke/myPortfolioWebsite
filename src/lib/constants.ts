// Single source of truth for ALL site data. Structure it with these sections, using `as const` for type safety:

// - `SITE`: name, tagline, email, social links, and resume path
// - `NAV_ITEMS`: id, label, and number for each section
// - `HERO_ROLES`: the rotating role title
// - `HERO_HEADLINE_WORDS`: the staggered headline words
// - `HERO_METRICS`: the headline metrics
// - `ABOUT_SIGNALS`: the three signal chips
// - `ABOUT_PARAGRAPHS`: the editorial paragraphs
// - `SKILL_GROUPS`: grouped skills with icons and learning flags
// - `EXPERIENCES`: role history and evidence
// - `PROJECTS`: project cards and their evidence
// - `SERVICES`: service offerings
// - `EDUCATION`: degree and certification
// - `CONTACT_STATS`, `FOOTER_LINKS`



/* ─────────────────────────────────────────────
   Site-wide constants, single source of truth
   ─────────────────────────────────────────────
   All text, URLs, metrics, and structured data live here.
   Components import what they need, with no hardcoded data in JSX.
   ───────────────────────────────────────────── */

// ── Personal Info ──

export const SITE = {
  name: "Piyush Sontakke",
  tagline: "Full-Stack Developer building products and sites.",
  role: "Full-Stack Developer",
  location: "India",
  email: "piyushsontakke28@gmail.com",
  phone: "+91 7507284768",
  socials: {
    github: "https://github.com/pushsontakke",
    linkedin: "https://linkedin.com/in/piyush-sontakke",
    twitter: "https://x.com/PiyushSontakke4",
  },
  business: {
    name: "ElixirFlow",
    url: "https://elixirflow.in",
    heroEyebrow: "Founder-led business",
    heroDescription:
      "See the business website behind my product engineering and delivery work.",
    heroCta: "Visit ElixirFlow",
    servicesDescription:
      "ElixirFlow is the business layer behind this founder-style product engineering offer.",
    servicesCta: "Explore business website",
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
  // { id: "testimonials", label: "Testimonials", num: "07" },
  { id: "education", label: "Education", num: "07" },
  { id: "contact", label: "Contact", num: "08" },
] as const;

// ── Hero Section ──

export const HERO_ROLES = [
  "Full-Stack Developer",
] as const;

export const HERO_HEADLINE_WORDS = [
  "Full-Stack", "Developer", "who", "ships,", "not", "just", "codes",
] as const;

export const HERO_HEADLINE = "Full-Stack Developer who ships, not just codes.";

export const HERO_SUBTITLE =
  "Full-Stack Developer · Django · React · GenAI";

export const HERO_METRICS = [
  { value: "5", label: "Products Built" },
  { value: "2", label: "Workplaces" },
  { value: "Django", label: "Backend" },
  { value: "React", label: "Frontend" },
] as const;

// ── About Section ──

export const ABOUT_SIGNALS = [
  { icon: "Zap", label: "Client Scoping", desc: "From scope to post-launch iteration" },
  { icon: "Code", label: "Full Ownership", desc: "Design, build, and deployment" },
  { icon: "Layers", label: "Product Studio", desc: "Django, React, AWS, and Nginx" },
] as const;

export const ABOUT_PARAGRAPHS = [
  "I work across the product lifecycle: scoping with clients, design, build, deployment, and post-launch iteration.",
  // "At Hushbox Gifting Solution Pvt. Ltd., I worked as Lead Product Engineer from Nov 2025 to Apr 2026. That role ended in Apr 2026.",
  "At ElixirFlow, an independent product studio, I am the Founder and Full-Stack Engineer. I work as the sole engineer and build with Django and React, then deploy with AWS and Nginx.",
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
    role: "Founder & Full-Stack Engineer",
    company: "ElixirFlow (independent product studio)",
    period: "Apr 2026 - Present",
    location: "Pune",
    tags: ["Current Role", "Independent Product Studio"],
    summary:
      "Work as the sole engineer: scope with clients, design and build with Django and React, deploy with AWS and Nginx, and iterate post-launch.",
    achievements: [
      "Sole engineer: scoping with clients, design, build with Django and React, deployment with AWS and Nginx, and post-launch iteration",
      "DocChase: WhatsApp-first document-collection tool for chartered-accountancy firms; automates request, track, and escalate workflows against GST and ITR filing deadlines",
      "DocChase stack: Django, Celery, Redis, PostgreSQL. Status: [live / beta / in development]. URL: no public URL",
      "AgentAudit: 30-point production-readiness audit for LLM and agent systems; landing page and paid audits",
      "AgentAudit status: [live / beta / in development]. URL: no public URL",
      "Shipped marketing, demo, and client sites in Next.js and React",
    ],
  },
  {
    role: "Lead Product Engineer",
    company: "Hushbox Gifting Solution Pvt. Ltd.",
    period: "Nov 2025 - Apr 2026",
    location: undefined,
    tags: ["Role Ended"],
    summary:
      "Worked as Lead Product Engineer from Nov 2025 to Apr 2026. This role ended in Apr 2026.",
    achievements: ["Role ended in Apr 2026"],
  },
] as const;

// ── Projects Section ──

export const PROJECTS = [
  {
    title: "Gyfton",
    subtitle: "Product Gifting Platform - backend architecture and API development",
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
      { key: "CAP Theorem", value: "CP - Consistency over Availability" },
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
  {
    title: "DocChase",
    subtitle:
      "WhatsApp-first document-collection tool for chartered-accountancy firms",
    status: "[live / beta / in development]" as const,
    statusColor: "warning" as const,
    access: { label: "ElixirFlow product", icon: null as string | null },
    stack: ["Django", "Celery", "Redis", "PostgreSQL"],
    metrics: [] as { value: string; label: string }[],
    highlights: [
      "Automates request, track, and escalate workflows against GST and ITR filing deadlines",
    ],
    cta: { label: "Open DocChase", href: null as string | null },
    github: null as string | null,
  },
  {
    title: "AgentAudit",
    subtitle: "30-point production-readiness audit for LLM and agent systems",
    status: "[live / beta / in development]" as const,
    statusColor: "warning" as const,
    access: { label: "ElixirFlow product", icon: null as string | null },
    stack: ["LLM systems", "Agent systems"],
    metrics: [] as { value: string; label: string }[],
    highlights: ["Landing page and paid audits"],
    cta: { label: "Open AgentAudit", href: null as string | null },
    github: null as string | null,
  },
];

// ── Services Section ──

export const SERVICES = [
  {
    icon: "Rocket",
    title: "MVP Development (0→1)",
    desc: "Django and React product builds from design to deployment.",
    active: true,
  },
  {
    icon: "Brain",
    title: "AI Feature Integration",
    desc: "LLM and agent system work informed by current certification study.",
    active: true,
  },
  {
    icon: "Globe",
    title: "Next.js Web Applications",
    desc: "Marketing, demo, and client sites in Next.js and React.",
    active: true,
  },
  {
    icon: "LayoutDashboard",
    title: "SaaS Dashboards & Internal Tools",
    desc: "Django and React product workflows.",
    active: true,
  },
  {
    icon: "Gauge",
    title: "Performance & Architecture Consulting",
    desc: "Production-readiness audits for LLM and agent systems.",
    active: true,
  },
] as const;

// ── Education Section ──

export const EDUCATION = {
  degree: {
    title: "B.Tech - Electronics & Communication Engineering",
    institution: "Rajiv Gandhi College of Engineering, Chandrapur",
    year: "2023",
    location: "India",
  },
  certification: {
    title: "PG Certification in Generative AI & Multi-Agent Systems",
    institution: "CodingNinjas × IIT Mandi-TIH",
    badge: "NSDC Approved · Govt. Recognized · Skill India",
    status: "In Progress",
    currentModule: "Module [N] of 4",
    progress: "[X]",
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

export const CONTACT_ROLES = "Full-Stack Developer";

export const CONTACT_SERVICES =
  "Django and React builds · AWS and Nginx deployment · LLM and agent system audits";

export const CONTACT_STATS = [
  { value: "5", label: "Products Built" },
  { value: "1", label: "Current Role" },
  { value: "1", label: "Product Studio" },
] as const;

// ── Footer ──

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#Skills" },
  // { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;