# Piyush Sontakke | Portfolio Website



> **Started:** 02-01-2023 — Designing started.

---


Personal portfolio website built to showcase my work as a Product Engineer, targeting both technical recruiters and freelance clients.

**Live:** [portfolio.elixirflow.in](https://portfolio.elixirflow.in)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16 |
| Language | TypeScript (strict) | 5 |
| Styling | Tailwind CSS | 4 |
| Animation | Motion (framer-motion rebrand) | 12 |
| Icons | lucide-react | latest |
| Utilities | clsx + tailwind-merge | latest |
| Fonts | Syne, Inter, JetBrains Mono (via next/font) | — |
| Deployment | Vercel | — |
| DNS | Cloudflare | — |
| React Compiler | Enabled | — |

**Production dependencies:** 7 total (next, react, react-dom, motion, lucide-react, clsx, tailwind-merge)

---

## Project Architecture

```bash
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata
│   ├── page.tsx                # Home page — assembles all sections
│   └── globals.css             # Tailwind v4 design tokens + reusable CSS
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Fixed left nav (desktop) + mobile pill nav
│   │   ├── Footer.tsx          # Site footer (server component)
│   │   └── ScrollToTop.tsx     # Floating scroll-to-top button
│   ├── sections/
│   │   ├── Hero.tsx            # Aurora background, role rotation, CTAs
│   │   ├── About.tsx           # Editorial layout, signal chips
│   │   ├── Skills.tsx          # Bento grid, terminal aesthetic
│   │   ├── Experience.tsx      # Timeline, 2 roles, expandable achievements
│   │   ├── Projects.tsx        # Tilt cards, Gyfton + Ticketing Platform
│   │   ├── Services.tsx        # 5 service offerings, active/inactive states
│   │   ├── Testimonials.tsx    # Skeleton placeholder with shimmer
│   │   ├── Education.tsx       # Degree + certification with progress bar
│   │   └── Contact.tsx         # Dual-path: recruiters + freelance form
│   └── ui/
│       ├── CursorGlow.tsx      # Mouse-follow glow effect (desktop)
│       ├── SectionHeader.tsx   # Reusable section tag + heading + watermark
│       ├── StatusBadge.tsx     # Colored dot + label (Available, In Progress)
│       ├── SkillTag.tsx        # Tech/skill pill with learning state
│       ├── AnimatedCounter.tsx # Count-up animation hook
│       └── TiltCard.tsx        # 3D tilt with mouse-follow glow
└── lib/
├── constants.ts            # ALL site data — single source of truth
├── utils.ts                # cn() class merge helper
└── hooks/
└── useInView.ts        # Intersection observer (fires once)
```

---

## Design System

### Colors (defined in globals.css via @theme inline)

| Token | Value | Usage |
|---|---|---|
| `surface` | `#0A0A0F` | Primary background |
| `surface-alt` | `#111116` | Alternating section background |
| `surface-card` | `#16161E` | Card backgrounds |
| `content` | `#F8F8FF` | Primary text |
| `content-secondary` | `#94A3B8` | Body text |
| `content-muted` | `#64748B` | Subtle text |
| `accent` | `#EAB308` | Primary accent (yellow) |
| `status-success` | `#10B981` | Available, completed |
| `status-warning` | `#F97316` | In progress, caution |
| `status-error` | `#EF4444` | Error states |

### Fonts

| Font | Usage | CSS Variable |
|---|---|---|
| Syne | Display headings | `--font-syne` |
| Inter | Body text | `--font-inter` |
| JetBrains Mono | Code, labels, tags | `--font-jetbrains` |

### Reusable CSS Classes

| Class | Usage |
|---|---|
| `.noise-overlay` | Subtle noise texture via ::after pseudo-element |
| `.dot-grid` | Dot pattern background via ::before |
| `.section-divider` | Gradient line at section top via ::before |
| `.glass` | Glass morphism (blur + border + translucent bg) |

---

## Key Design Decisions

1. **Single source of truth** — All text, URLs, and data live in `constants.ts`. Components import what they need. Change data in one place.

2. **Server components by default** — Only components that need interactivity (hooks, event listeners) use `"use client"`. Footer is a server component. This minimizes client-side JavaScript.

3. **Tailwind v4 CSS-based tokens** — No `tailwind.config.ts`. All design tokens defined in `globals.css` via `@theme inline`. Colors, fonts, shadows, and animations are all registered as Tailwind utilities.

4. **DRY reusable components** — `SectionHeader`, `StatusBadge`, `SkillTag`, `TiltCard` are used across 3-9 sections each, eliminating duplicated code.

5. **`next/font` for font loading** — Fonts are downloaded at build time, self-hosted, and applied via CSS variables. No runtime Google Fonts requests, no CLS.

6. **Motion v12 over framer-motion** — Same API, ~30% lighter bundle, actively maintained. Import path: `motion/react`.

7. **Yellow accent (`#EAB308`)** — Chosen over the original purple for brand differentiation. Warning color shifted to orange (`#F97316`) to avoid clashing.

8. **Progressive enhancement** — CursorGlow is desktop-only (`hidden lg:block`). Mobile gets the same content without the glow. Animations are scroll-triggered and fire once.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup
```bash
git clone <your-repo-url>
cd my_portfolio_website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build
```bash
npm run build
npm start
```

---

## Deployment

- **Platform:** Vercel
- **Domain:** `portfolio.elixirflow.in` (subdomain via Cloudflare CNAME → `cname.vercel-dns.com`, proxy OFF)
- **Auto-deploy:** Push to `main` branch triggers Vercel deployment

---

## Data Updates

All site content is in `src/lib/constants.ts`. To update:

- **Personal info** → `SITE` object
- **Skills** → `SKILL_GROUPS` array
- **Experience** → `EXPERIENCES` array
- **Projects** → `PROJECTS` array
- **Education** → `EDUCATION` object
- **Services** → `SERVICES` array

No component changes needed for content updates.

---

## Bundle Optimization

- 7 production dependencies (vs. 50+ in the original Figma Make export)
- Server components where possible (Footer)
- Tree-shakeable icon imports (lucide-react)
- `next/font` eliminates external font requests
- React Compiler enabled for automatic memoization
- `will-change-transform` only on GPU-intensive elements (CursorGlow)

---

## Future Improvements

- [ ] Form backend integration (Formspree or Next.js Server Action)
- [ ] Real testimonials replacing skeleton placeholders
- [ ] Case study pages for projects (dynamic routes)
- [ ] Blog section at `blog.elixirflow.in`
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Open Graph images for social sharing
- [ ] Lighthouse performance audit and optimization