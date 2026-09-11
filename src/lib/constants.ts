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
  tagline:
    "Full-Stack Engineer building Python/Django, React/Next.js, and agentic AI applications.",
  role: "Full-Stack Engineer",
  location: "Pune, India",
  email: "piyushsontakke28@gmail.com",
  phone: "+91 7507284768",
  socials: {
    github: "https://github.com/pushsontakke",
    linkedin: "https://linkedin.com/in/piyush-sontakke",
    twitter: "https://x.com/PiyushSontakke4",
  },
  studio: {
    name: "ElixirFlow",
    url: "https://elixirflow.in",
    eyebrow: "Studio / Parent Brand",
    description:
      "ElixirFlow is my product engineering studio and the parent brand for the products I develop.",
    cta: "Visit ElixirFlow",
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
  // { id: "testimonials", label: "Testimonials", num: "06" },
  { id: "education", label: "Education", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
] as const;

// ── Hero Section ──

export const HERO_ROLES = [
  "Full-Stack Engineer",
  "Python / Django Engineer",
  "Backend Engineer",
  "React / Next.js Engineer",
  "AI / LLM Application Engineer",
  "Product Engineer",
] as const;

export const HERO_HEADLINE_WORDS = [
  "Full-Stack", "Engineer", "who", "builds,", "ships,", "and", "supports",
  "web", "applications",
] as const;

export const HERO_HEADLINE =
  "Full-Stack Engineer who builds, ships, and supports web applications.";

export const HERO_SUBTITLE =
  "Python · Django · React/Next.js · Agentic AI / LLM Applications";

export const HERO_METRICS = [
  { value: "2+", label: "Years in Production" },
  { value: "1", label: "Product Studio" },
  { value: "Django", label: "Backend" },
  { value: "React", label: "Frontend" },
] as const;

// ── About Section ──

export const ABOUT_SIGNALS = [
  { icon: "Zap", label: "Backend Systems", desc: "APIs, webhooks, and background jobs" },
  { icon: "Code", label: "Product Delivery", desc: "Schema, frontend, testing, and deployment" },
  { icon: "Layers", label: "ElixirFlow", desc: "Product engineering studio and parent brand" },
] as const;

export const ABOUT_PARAGRAPHS = [
  "I build production web applications with Python, Django, React, and Next.js. My work covers PostgreSQL schema design, REST APIs, frontend integration, testing, and AWS deployment.",
  "At ElixirFlow, I work as founder and product engineer. I develop products from initial design through implementation, deployment, and client delivery.",
  "My earlier contract work focused on payment gateway integrations, webhooks, reconciliation, background jobs, and production support for startup applications.",
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
      "Python", "Django", "Django REST Framework", "FastAPI",
      "RESTful APIs", "Webhook Architecture", "JWT Auth", "RBAC", "Pydantic",
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
    skills: ["PostgreSQL", "Django ORM", "Complex Joins", "Pagination", "Query Optimization"],
  },
  {
    title: "Infrastructure",
    icon: "Cloud",
    skills: ["AWS EC2", "Docker", "Docker Compose", "Nginx", "Linux", "Monitoring", "Incident Debugging"],
  },
  {
    title: "Frontend",
    icon: "Monitor",
    span: "lg:col-span-2",
    skills: [
      "JavaScript", "React", "Next.js", "SSR/SSG", "Tailwind CSS",
      "shadcn/ui", "Responsive UI", "REST API Integration",
    ],
  },
  {
    title: "Payments & Integrations",
    icon: "Sparkles",
    skills: ["SabPaisa", "PhonePe", "Pine Labs", "AES Encryption", "WhatsApp Business API"],
  },
  {
    title: "Testing",
    icon: "TestTube",
    skills: [
      "pytest", "Unit Tests", "Integration Tests", "Webhook Simulation",
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Postman", "HTML", "CSS", "SQL"],
  },
  {
    title: "AI / GenAI",
    icon: "Brain",
    span: "lg:col-span-3",
    skills: [
      "OpenAI API",
      "RAG Pipelines",
      "Prompt Engineering",
      "LangChain",
      "Vector Databases",
      "Multi-Agent Systems",
      "Agentic Workflows",
      "LLM Evals",
      "Observability & Tracing",
      "Guardrails",
      "Structured Outputs",
    ],
  },
];

// ── Experience Section ──

export const EXPERIENCES = [
  {
    role: "Founder & Product Engineer",
    company: "ElixirFlow · Self-employed",
    period: "Apr 2026 - Present",
    location: "Remote",
    tags: ["Current Role", "Solo AI Product Studio"],
    summary:
      "Run a solo AI product engineering studio and develop products from design through Django and React implementation, AWS deployment, and client delivery.",
    achievements: [
      "Built DocChase, a WhatsApp-first document-collection tool for CA firms, with automated request, tracking, and escalation workflows for GST and ITR deadlines",
      "Built DocChase with Django, Celery, Redis, PostgreSQL, and the WhatsApp Business API",
      "Created AgentAudit, a production-readiness audit kit for LLM and agent systems with a 30-point checklist covering evals, tracing, guardrails, cost controls, and fallback paths",
      "Productised AgentAudit with a landing page and paid audits",
      "Designed and shipped marketing, demo, and client business websites with Next.js and React",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Independent Contract & Freelance Engagements",
    period: "May 2024 - Apr 2026",
    location: "Pune · Remote",
    tags: ["Independent Contractor", "Startup Delivery"],
    summary:
      "Delivered web applications for startups through independent, invoice-based engagements. Work covered scoping, implementation, deployment, and production support.",
    achievements: [
      "Built Python and Django systems with PostgreSQL schema design, REST APIs, React interfaces, and third-party integrations",
      "Integrated SabPaisa, PhonePe, and Pine Labs payment gateways using AES encryption, webhooks, and reconciliation workflows",
      "Designed Celery and Redis background jobs for payment, order, and data-processing workflows",
      "Optimised Django ORM queries, complex joins, and pagination for production workloads",
      "Deployed and supported applications on AWS EC2 with Docker, Docker Compose, Nginx, and Linux",
      "Tested with pytest and webhook simulations, and handled production monitoring and incident debugging",
    ],
  },
] as const;

// ── Projects Section ──

type Project = {
  title: string;
  subtitle: string;
  status: string;
  statusColor: "accent" | "warning";
  access: { label: string; icon: "Lock" | null };
  stack: readonly string[];
  metrics: readonly { value: string; label: string }[];
  highlights: readonly string[];
  architecture?: readonly { key: string; value: string }[];
  tags?: readonly string[];
  cta: { label: string; href: string | null };
  github: string | null;
};

export const PROJECTS: readonly Project[] = [
  {
    title: "Gyfton",
    subtitle: "Product gifting platform: backend architecture and API development",
    status: "Production",
    statusColor: "accent",
    access: { label: "Private · Contract Project", icon: "Lock" },
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
    metrics: [],
    highlights: [
      "Architected backend APIs for products, orders, categories, and user management with clean service separation",
      "Implemented secure JWT authentication and role-based access control (RBAC)",
      "Built webhook-driven integrations for async data fetching from external catalogue and logistics providers",
      "Background task processing using Celery/Redis for order lifecycle management and audit logging",
      "Automated tests (pytest) covering API endpoints, webhook simulations, and integration edge cases",
      "Deployed on AWS EC2 with Docker Compose and Nginx, optimized for high concurrency",
    ],
    cta: { label: "View Case Study", href: null },
    github: null,
  },
  {
    title: "DocChase",
    subtitle:
      "WhatsApp-first document-collection tool for chartered-accountancy firms",
    status: "ElixirFlow Product",
    statusColor: "accent",
    access: { label: "ElixirFlow product", icon: null },
    stack: ["Django", "Celery", "Redis", "PostgreSQL", "WhatsApp Business API"],
    metrics: [],
    highlights: [
      "Automates document requests, tracking, and escalation against GST and ITR filing deadlines",
    ],
    cta: { label: "Open DocChase", href: null },
    github: null,
  },
  {
    title: "AgentAudit",
    subtitle: "30-point production-readiness audit for LLM and agent systems",
    status: "Audit Offering",
    statusColor: "accent",
    access: { label: "ElixirFlow product", icon: null },
    stack: ["LLM Evals", "Tracing", "Guardrails", "Cost Controls", "Fallback Paths"],
    metrics: [],
    highlights: ["Landing page and paid audits"],
    cta: { label: "Open AgentAudit", href: null },
    github: null,
  },
];

// ── Education Section ──

export const EDUCATION = {
  degree: {
    title: "B.Tech - Electronics & Communication Engineering",
    institution: "Rajiv Gandhi College of Engineering, Chandrapur",
    year: "2023",
    location: "India",
  },
  certification: {
    title: "PG Certification - Generative AI & Multi-Agent Systems",
    institution: "Coding Ninjas × IIT Mandi-TIH",
    badge: "Generative AI · Multi-Agent Systems",
    status: "Professional Certification",
    currentModule: "",
    progress: null as number | null,
    totalModules: 0,
    completedModules: 0,
    curriculum: [
      "Prompt Engineering",
      "RAG Pipelines",
      "OpenAI API",
      "Agentic Workflows",
      "Multi-Agent Systems",
      "LangChain",
      "Vector Databases",
      "LLM Evaluation",
      "Observability & Tracing",
      "Guardrails",
    ],
  },
} as const;

// ── Contact Section ──

export const CONTACT_ROLES =
  "Full-Stack Engineer · Python/Django · React/Next.js · Agentic AI";

export const CONTACT_AVAILABILITY =
  "Based in Pune, India. Open to relocation to Bengaluru, Mumbai, or NCR, as well as remote opportunities. UTC+5:30 with comfortable UK/EU overlap.";

export const CONTACT_STATS = [
  { value: "2+", label: "Years in Production" },
  { value: "1", label: "Solo AI Studio" },
  { value: "UTC+5:30", label: "Remote Time Zone" },
] as const;

// ── Footer ──

export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#Skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
