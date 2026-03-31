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

// Reference the Figma Make exported components for the exact data — I've already audited and corrected the wrong fields (GitHub URL, email, payment gateways, degree).



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
  email: "piyushsontakke2001@gmail.com",
  phone: "+91 7666601248",
  socials: {
    github: "https://github.com/pushsontakke",
    linkedin: "https://linkedin.com/in/piyush-sontakke",
    twitter: "https://x.com/piyushsontakke",
  },
  resume: "/resume.pdf",
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
  "AI Builder",
] as const;

export const HERO_HEADLINE_WORDS = [
  "Product",
  "Engineer",
  "who",
  "ships",
  "—",
  "not",
  "just",
  "codes",
] as const;

export const HERO_SUBTITLE =
  "Full-Stack Product Engineer · Pune · React · Django · GenAI";

export const HERO_METRICS = [
  {
    target: 995,
    display: (n: number) => `${(n / 10).toFixed(1)}%`,
    label: "Uptime",
    icon: "⬆",
  },
  {
    target: 1000,
    display: (n: number) => `${n.toLocaleString()}+`,
    label: "Concurrent Users",
    icon: "👥",
  },
  {
    target: 10000,
    display: (n: number) => `${(n / 1000).toFixed(0)}k+`,
    label: "Orders/Day",
    icon: "📦",
  },
  {
    target: 500,
    display: (n: number) => `<${n}ms`,
    label: "API Response",
    icon: "⚡",
  },
] as const;

// ── About Section ──

export const ABOUT_SIGNALS = [
  { icon: "Zap", label: "Ships Fast", desc: "0→1 product delivery" },
  { icon: "Code", label: "Full Ownership", desc: "Architecture to deployment" },
  {
    icon: "Layers",
    label: "Systems Thinker",
    desc: "CAP theorem, hybrid locking",
  },
] as const;

export const ABOUT_PARAGRAPHS = [
  'I think in systems, not just features. From database schema to deployment pipeline, I make architecture decisions — not just implement tasks handed to me. I\'m the engineer who asks "why are we building this?" before asking "how?"',
  "For 2 years, I've been the Lead Product Engineer at Hushbox Gifting Solution Pvt Ltd, an early-stage startup in Pune. I built Gyfton — a B2C gift card e-commerce platform — alone, end-to-end. Architecture, backend, frontend, DevOps, payment integrations. Every technical decision. Every production deployment.",
  "Now I'm engineering a High Concurrency Event Ticketing Platform (hybrid locking, CAP theorem, distributed queues) and completing a PG Certification in Generative AI & Multi-Agent Systems from IIT Mandi. Evolving from full-stack to AI-capable founding engineer.",
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
    title: "Frontend",
    icon: "Monitor",
    span: "lg:col-span-2",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "CSS Modules",
      "Styled Components",
      "Redux",
      "Context API",
      "Zustand",
      "TanStack Query",
    ],
  },
  {
    title: "Animation",
    icon: "Sparkles",
    skills: [{ name: "Motion", learning: true }],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Django", "DRF"],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Infra / DevOps",
    icon: "Cloud",
    span: "lg:col-span-2",
    skills: [
      "Docker",
      "AWS EC2",
      "Nginx",
      "Gunicorn",
      "Redis",
      "Celery",
      "Celery Beat",
      "GitHub Actions",
    ],
  },
  {
    title: "Observability",
    icon: "Activity",
    skills: ["Prometheus", "Grafana", "Sentry", "Structlog"],
  },
  {
    title: "Testing",
    icon: "TestTube",
    skills: [
      { name: "Jest", learning: true },
      { name: "Cypress", learning: true },
      { name: "Playwright", learning: true },
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: ["Git", "Figma", "Postman"],
  },
  {
    title: "AI / GenAI",
    icon: "Brain",
    span: "lg:col-span-3",
    badge: "In Progress",
    skills: [
      "Prompt Engineering",
      "RAG",
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

export const EXPERIENCE = {
  role: "Lead Product Engineer",
  company: "Hushbox Gifting Solution Pvt Ltd",
  period: "May 2023 – Present",
  location: "Pune, India",
  tags: ["Early-stage Startup", "Full Product Ownership", "Solo Engineer"],
  summary:
    "Owned Gyfton from tech stack selection to production deployment — architecture, backend, frontend, DevOps, integrations. Every decision. Alone.",
  achievements: [
    "Built complete B2C gift card e-commerce platform serving 10k+ orders/day",
    "Integrated 3 payment gateways: Razorpay, PhonePe, Cashfree",
    "Designed async Celery pipeline for voucher delivery + email notifications",
    "Implemented OTP auth, JWT tokens, GST engine, QR code delivery system",
    "Built real-time balance monitoring with auto-recharge alerts",
    "Achieved 99.5% uptime with <500ms average API response time",
  ],
} as const;

// ── Projects Section ──

export const PROJECTS = [
  {
    title: "Gyfton",
    subtitle: "B2C gift card e-commerce — owned end-to-end",
    status: "Production" as const,
    statusColor: "accent" as const,
    access: { label: "Private · Company Product", icon: "Lock" },
    stack: [
      "Next.js",
      "Django",
      "PostgreSQL",
      "Redis",
      "Celery",
      "AWS EC2",
      "Nginx",
      "Gunicorn",
      "AWS S3",
    ],
    metrics: [
      { value: "99.5%", label: "Uptime" },
      { value: "1000+", label: "Users" },
      { value: "10k+", label: "Orders/Day" },
    ],
    highlights: [
      "3 payment gateways: Razorpay, PhonePe, Cashfree",
      "Async Celery pipeline for voucher + email delivery",
      "OTP auth + JWT + GST engine + QR code delivery",
      "Real-time balance monitoring + auto-recharge",
      "Redis caching with PostgreSQL fallback for resilience",
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
      "Next.js",
      "Django",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Celery",
      "Docker",
      "Prometheus",
      "Grafana",
      "Sentry",
    ],
    architecture: [
      {
        key: "Hybrid Locking",
        value: "Redis SETNX + PostgreSQL SELECT FOR UPDATE",
      },
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
    cta: { label: "View on GitHub", href: "https://github.com/piyushsontakke" },
    github: "https://github.com/piyushsontakke",
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
    title: "B.E. — Computer Science",
    institution: "Savitribai Phule Pune University",
    year: "2023",
    location: "India",
  },
  certification: {
    title: "PG Certification in Generative AI & Multi-Agent Systems",
    institution: "IIT Mandi-TIH × Coding Ninjas",
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
  "Founding Engineer · Product Engineer · Sr. UI Engineer";

export const CONTACT_SERVICES = "MVPs · AI Features · Full-Stack SaaS";

export const CONTACT_STATS = [
  { value: "2+", label: "Years" },
  { value: "1", label: "Product Built" },
  { value: "10k+", label: "Daily Orders" },
] as const;

// ── Footer ──

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
