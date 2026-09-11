# Frontend Developer Handover

[Repository overview](../README.md) · [Vercel deployment guide](VERCEL_DEPLOYMENT.md)

**Audience:** a junior developer taking over day-to-day frontend maintenance.  
**Reviewed:** 8 September 2026.  
**Scope:** the existing portfolio application, from installation to safe changes and release readiness. This is a description of the current code, not a claim that every feature is complete or production-audited.

## Contents

- [Your first day](#your-first-day)
- [Setup and installation](#setup-and-installation)
- [Command reference](#command-reference)
- [Architecture and rendering](#architecture-and-rendering)
- [Repository map](#repository-map)
- [Component responsibilities](#component-responsibilities)
- [Content and TypeScript conventions](#content-and-typescript-conventions)
- [Styling, themes, and animation](#styling-themes-and-animation)
- [Maintenance recipes](#maintenance-recipes)
- [Validation and definition of done](#validation-and-definition-of-done)
- [Known limitations and owner decisions](#known-limitations-and-owner-decisions)
- [Troubleshooting](#troubleshooting)
- [Handover checklist](#handover-checklist)
- [Technical references](#technical-references)

## Your first day

Work through this sequence before taking on feature work:

1. Ask the owner for repository access, the approved working copy/branch, and the scope of your first change. Vercel and DNS access are only needed when deployment becomes your responsibility.
2. Read `CLAUDE.md` and `AGENTS.md`. The owner handles Git operations; assistants must not stage, commit, merge, or push. Complete one approved phase, summarize changed files, and stop.
3. Install and run the existing app using the steps below. Do not scaffold a replacement app.
4. Read `src/app/page.tsx`, `src/app/layout.tsx`, `src/lib/constants.ts`, and one section component together. Follow one piece of data from its export to the screen.
5. Switch themes, open the mobile menu, expand an experience card, and try the résumé and email links. Notice which interactions are actually implemented.
6. Run lint, type checking, and a production build before editing. This separates existing problems from new regressions.
7. Start with a small, owner-approved content change. Check desktop/mobile and both themes before handing it back.

**Mental model:** this is a single-page portfolio with static content and client-side interactions—not a CMS, a database-backed application, or a functioning lead-capture service.

## Setup and installation

### Prerequisites

| Requirement | Guidance |
| --- | --- |
| Node.js | Use **24.x LTS** consistently locally and on Vercel. The installed Next.js package requires **20.9.0 or newer**, but that historical minimum is not the recommended runtime. |
| npm | Use npm because `package-lock.json` is the existing lockfile. The reviewed environment used npm **12.0.2**; the repository does not enforce this exact version. |
| Editor | A TypeScript-aware editor such as VS Code. Prefer the workspace TypeScript version when the editor offers it. |
| Browser | A current browser with developer tools. Include a second browser and a real mobile device in release checks when available. |
| Network | Required for dependency downloads and build-time Google Font downloads. |

Windows with WSL, Linux, and macOS are supported by Next.js. In WSL, keeping the working copy in the Linux filesystem, as this project currently is, generally avoids cross-filesystem development overhead. Keep Node, npm, and the project in the same environment.

There is currently no `engines` field, `packageManager` field, `.nvmrc`, or `.node-version`. Agree on runtime versions with the owner rather than assuming the repository pins them. Pinning them would be a separate configuration change.

### Install the existing project

Obtain/open the repository through the owner's normal workflow. In a terminal at the folder containing `package.json`:

```bash
node --version
npm --version
npm ci
npm run dev
```

Open <http://localhost:3000>. The terminal reports the actual address if another port is used. Stop the server with `Ctrl+C`.

If you need a specific alternate port:

```bash
npm run dev -- --port 3001
```

**Why `npm ci`?** It uses the committed lockfile, removes an existing `node_modules` directory, and installs that dependency set without updating the lockfile. It fails when `package.json` and `package-lock.json` disagree—useful protection against unreviewed dependency drift.

Use `npm install <package>` only for an approved dependency change, not as a workaround for every installation failure. Such a change normally updates both the manifest and lockfile. Do not mix npm, Yarn, and pnpm lockfiles or run forceful audit fixes as part of onboarding.

### Environment variables and external services

**None are required by the current app.** There are no environment-variable reads in `src`, no API routes, no database, no authentication, and no email provider integration. Do not invent an `.env.local` file or request credentials just to start it.

If an approved future feature needs configuration:

- Put local values in a root-level `.env.local`, beside `package.json`, not inside `src`.
- The current `.gitignore` excludes `.env*`. Adding a safe `.env.example` later will also require an explicit ignore exception if the owner wants it tracked.
- Never put secrets in `public/`, client components, or `src/lib/constants.ts`.
- `NEXT_PUBLIC_*` values are deliberately public and embedded into browser code at build time. They are not secrets, and changing them requires a new build.
- Set deployment values in the appropriate Vercel environment and redeploy; a local file does not automatically configure the hosted project.

### What installation/build creates

| Path | Meaning |
| --- | --- |
| `node_modules/` | Installed dependencies; do not edit their source to fix the application |
| `.next/dev/` | Next.js development output |
| `.next/` | Production output and framework-generated types/cache |
| `next-env.d.ts` | Generated Next.js TypeScript declarations; do not hand-edit |
| `tsconfig.tsbuildinfo` | Incremental TypeScript cache when incremental checking is used |

These generated/dependency paths are ignored by the existing `.gitignore`. They are not source code to hand over or upload manually as the deployment.

## Command reference

| Command | What it actually runs / when to use it |
| --- | --- |
| `npm run dev` | `next dev`; hot-reloading local development |
| `npm run build` | `next build`; compile, type-check, and generate production output |
| `npm start` | `next start`; serve a **previously successful** production build |
| `npm run lint` | `eslint src`; lint application source, not all root configuration files |
| `npx next typegen && npx tsc --noEmit --incremental false` | Generate Next.js route types, then check TypeScript without emitting code or updating the incremental cache |

The `npx` commands above use packages already installed by `npm ci`; installing a global Next.js or TypeScript copy is unnecessary.

**Next.js 16 differences that matter here:**

- Turbopack is already the default in both development and production builds.
- `next lint` has been removed. Use the existing ESLint script.
- `next build` no longer runs lint. A green Vercel build is not proof of a clean lint run.
- TypeScript errors still fail the production build by default; this repository does not disable that protection.
- Route types may not exist on a clean checkout until `next dev`, `next build`, or `next typegen` runs. Generate them before a standalone type check.

There is no configured test runner, formatter command, `typecheck` npm script, deployment script, or repository CI workflow. Do not report those checks as available or passing.

## Architecture and rendering

### How a request becomes a page

1. **`src/app/layout.tsx`** provides the root document, global styles, fonts, title/description metadata, and early theme initialization.
2. **`src/app/page.tsx`** is the `/` route. It assembles shared navigation/effects and the ordered content sections.
3. **`src/lib/constants.ts`** supplies static arrays/objects to the sections. Components map those values into cards, lists, links, and text.
4. **Client components** add local state and browser behavior: menu state, theme switching, scroll tracking, expanding achievements, and animation.
5. **Vercel/Next.js build output** serves the application. Updating hardcoded data requires a new build/deployment; editing a dashboard or a database cannot change this content because no such integration exists.

The reviewed production build prerendered `/` and the framework-generated `/_not-found` page. This does **not** mean the project is configured with `output: "export"`, nor that it should be deployed as a bare `public/` directory.

### Server and Client Components

`layout.tsx`, `page.tsx`, and `Footer.tsx` do not declare `"use client"`. All mounted section components and interactive layout components do. Shared helpers imported beneath a client boundary participate in that client tree.

Keep this distinction when making changes:

- Use a Client Component for React state/effects, event handlers, browser storage, observers, or browser-only animation APIs.
- Keep static composition and metadata on the server where possible. Do not add `"use client"` to the root layout just to solve a child interaction.
- A Client Component can still be prerendered initially. Do not read `window`, `document`, or `localStorage` unguarded during render.
- For future data passed from server to client, use serializable props and keep secrets on the server.

### Navigation model

There are no separate `/about` or `/projects` pages. Navigation targets element IDs on `/`:

`hero`, `about`, `skills`, `experience`, `projects`, `education`, `contact`.

`NAV_ITEMS` must match those IDs and the rendered section order. The Sidebar uses scroll-aware state, updates the fragment through `history.replaceState`, and handles recognized incoming fragments after mount. IDs are case-sensitive: `#Skills` and `#skills` are not interchangeable.

Desktop navigation starts at Tailwind's `lg` breakpoint, **1024px**. The fixed sidebar is **220px** wide; `page.tsx` reserves that same width with `lg:ml-[220px]`. Change both together if the desktop layout changes.

## Repository map

```text
myPortfolioWebsite/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 Root document, fonts, metadata, theme boot
│   │   ├── page.tsx                   Single-page composition
│   │   └── globals.css                Tailwind tokens, themes, global effects
│   ├── components/
│   │   ├── layout/                    Sidebar, Footer, ScrollToTop
│   │   ├── sections/                  Portfolio sections
│   │   ├── ui/                        Shared presentation/interaction helpers
│   │   └── providers/
│   │       └── ThemeProvider.tsx        Unused next-themes wrapper
│   └── lib/
│       ├── constants.ts               Structured content and skill types
│       ├── theme.ts                   Active custom theme implementation
│       ├── utils.ts                   cn() class-name helper
│       └── hooks/useInView.ts         One-shot visibility observer
├── public/                            Publicly served assets, including résumé
├── docs/
│   ├── DEVELOPER_GUIDE.md             This handover
│   ├── VERCEL_DEPLOYMENT.md           Release and recovery runbook
│   └── Guide/                        Existing historical Word documents
├── package.json                       App version, scripts, dependency ranges
├── package-lock.json                  Resolved dependency versions
├── next.config.ts                     React Compiler enabled
├── tsconfig.json                      Strict typing and @/* alias
├── eslint.config.mjs                  Next.js + TypeScript flat config
├── postcss.config.mjs                 Tailwind v4 PostCSS plugin
├── .gitignore                         Generated output and local secrets excluded
├── AGENTS.md / CLAUDE.md              Project-specific assistant rules
└── README.md                          Entry point and quick start
```

The TypeScript alias `@/*` resolves to `src/*`. Prefer existing imports such as `@/lib/constants` over long relative paths. There is no `tailwind.config.ts`, `vercel.json`, or custom server in the current repository.

## Component responsibilities

### Layout and sections

| Component | Responsibility and maintenance notes |
| --- | --- |
| `layout/Sidebar.tsx` | Desktop sidebar, mobile menu, navigation state, social links, theme controls. Keep section IDs and desktop width synchronized with the page. |
| `layout/Footer.tsx` | Identity, tagline, links, social icons, current-year copyright. Footer links have their own data array. |
| `layout/ScrollToTop.tsx` | Shows after scrolling more than 600px and scrolls back to the top. |
| `sections/Hero.tsx` | Identity, rotating role text, headline, résumé/contact CTAs, social links, static metrics, studio link, and decorative motion. Some identity text is hardcoded. |
| `sections/About.tsx` | Signal cards and editorial paragraphs; maps icon names to Lucide components. |
| `sections/Skills.tsx` | Responsive skill-group grid, learning styles, optional badges; owns another icon map. |
| `sections/Experience.tsx` | Timeline with one achievements panel expanded at a time. |
| `sections/Projects.tsx` | Three resume-backed project cards, statuses, access labels, metrics, highlights, optional tags/architecture and CTA. |
| `sections/Education.tsx` | Degree and certification; progress UI is conditional on a numeric progress value. |
| `sections/Contact.tsx` | Professional availability, location, email and résumé links, and static statistics. Form markup is commented out. |
| `sections/Testimonials.tsx` | Unmounted skeleton placeholder, not published testimonials. Its page import/render and nav entry are disabled. |

### Shared helpers

| File | What to reuse / what not to assume |
| --- | --- |
| `ui/SectionHeader.tsx` | Section label, `h2`, optional decorative watermark. Empty title/tag suppress foreground heading output. |
| `ui/StatusBadge.tsx` | `success`, `warning`, or `accent` badge with optional animated dot. |
| `ui/SkillTag.tsx` | Skill pill and optional learning appearance. |
| `ui/TiltCard.tsx` | Pointer-driven 3D tilt and glow. Do not require hover to expose essential content. |
| `ui/CursorGlow.tsx` | Desktop pointer effect using refs and `requestAnimationFrame`. |
| `ui/ThemeToggle.tsx` | Light/dark toggle connected to `lib/theme.ts`; includes a compact mobile presentation. |
| `ui/AnimatedCounter.tsx` | Exports the **unused** `useAnimatedCounter` hook; current metrics are static text. |
| `providers/ThemeProvider.tsx` | **Unused** `next-themes` wrapper; changing its default will not change the active app. |
| `lib/hooks/useInView.ts` | Returns `{ ref, inView }`, observes visibility, and reveals once. |
| `lib/utils.ts` | `cn()` combines `clsx` and `tailwind-merge` for conditional/conflicting utility classes. |

## Content and TypeScript conventions

`src/lib/constants.ts` is the first place to look for structured content, **not** the only place to edit all text.

| Export / area | Content it controls |
| --- | --- |
| `SITE` | Shared identity fields, email, résumé path, social/business URLs |
| `NAV_ITEMS` | Sidebar/mobile section navigation |
| `HERO_ROLES`, `HERO_HEADLINE_WORDS`, `HERO_HEADLINE`, `HERO_SUBTITLE`, `HERO_METRICS` | Hero copy and manually maintained metrics |
| `ABOUT_*` exports | About paragraphs and signal data |
| `SKILL_GROUPS` | Skill groups, icon keys, skills, layout span classes, badges |
| `EXPERIENCES` | Roles, locations, achievements |
| `PROJECTS` | Project card data |
| `EDUCATION` | Degree and certification data |
| `CONTACT_ROLES`, `CONTACT_AVAILABILITY`, `CONTACT_STATS` | Contact-section availability and metrics |
| `FOOTER_LINKS` | Footer anchor links |

Important exceptions:

- The hero name, sidebar initials, some availability/CTA text, and section headings live in their components.
- Page title and description live in `src/app/layout.tsx`.
- Some exported fields are not rendered: `SITE.role`, `SITE.location`, `SITE.phone`, and each project's `github` field currently have no visible consumer.
- Metrics are manually entered; they are not calculated from the number of projects or years in the experience array.

TypeScript strict mode is enabled. `Skill` and `SkillGroup` are explicit types in `constants.ts`; other data shapes are inferred, and component props are generally typed near their components. Copy an existing entry's structure when making small content additions. Do not silence a mismatch with `any`, a blanket assertion, or a build-error bypass.

Use stable keys for mapped UI, literal Tailwind class names for variants, and the existing named-export/import style. Hooks belong at the top level of components or custom hooks, not conditionally inside loops or callbacks. Register event listeners/observers with appropriate cleanup.

## Styling, themes, and animation

### Tailwind v4 and semantic tokens

`globals.css` imports Tailwind and maps CSS variables to utilities through `@theme inline`. The base `:root` palette is light; `html[data-theme="dark"]` overrides it.

| Token | Light | Dark |
| --- | --- | --- |
| `--surface` | `#fff9ee` | `#0a0a0f` |
| `--surface-alt` | `#fff4e1` | `#111116` |
| `--surface-card` | `#ffffff` | `#16161e` |
| `--content` | `#1f2937` | `#f8f8ff` |
| `--accent-foreground` | `#8a5a00` | `#eab308` |
| `--accent-fill` | `#eab308` | `#eab308` |

Prefer semantic utilities such as `bg-surface`, `text-content`, `text-accent`, and `border-border-subtle`. The foreground accent and filled-control accent intentionally differ in light mode to preserve readable contrast. Do not replace every one with the same yellow value.

Fonts are loaded in `layout.tsx`: **Syne** for display headings, **Inter** for body text, and **JetBrains Mono** for labels/code. Their variables are mapped in `globals.css`. Reusable effects include `.glass`, `.noise-overlay`, `.dot-grid`, and `.section-divider`.

Typical sections use `max-w-6xl`, `px-6 lg:px-12`, and `py-24 lg:py-36`. Preserve the shared content alignment rather than adding independent widths and margins to each section.

### The active theme implementation

The current path is:

**inline initializer in layout → `lib/theme.ts` → `data-theme` on `<html>` → CSS tokens**, with `ThemeToggle` subscribing to theme changes.

- Storage key: `portfolio-theme`.
- Accepted values: `light` and `dark`.
- No valid saved value: JavaScript applies **dark**.
- Server markup initially includes `data-theme="light"`; the early script applies the saved theme or dark fallback.
- Storage failures are caught; persistence is best-effort.
- There is no active `system` setting. Do not describe OS-theme following or full cross-tab DOM synchronization as implemented.

A default-theme change must consider the fallback constant, boot script behavior, root markup, and CSS—not the unused `ThemeProvider`. Test a fresh browser profile as well as a browser with a saved preference.

### Motion and performance

Motion imports use `motion/react`. Most section entrances are driven by `useInView`, while menus and expandable panels use local state/`AnimatePresence`.

- The hero rotates through the resume-backed `HERO_ROLES` on all viewport sizes unless the visitor prefers reduced motion.
- Cursor glow requires a desktop-sized viewport, a fine pointer, and no reduced-motion preference.
- Below 1024px, CSS removes glass blur, disables aurora animation, and hides extra aurora/noise layers.
- Reduced-motion support is **partial**. Tilt, other entrance effects, some CSS animations, and smooth scrolling still need review.
- Content can begin hidden by animation props until JavaScript/visibility observation runs; do not assume full no-JavaScript usability.

`reactCompiler: true` is configured in `next.config.ts`. Follow the existing implementation rather than adding speculative memoization everywhere. Measure before claiming a bundle/performance improvement. `@vercel/speed-insights` is installed but no `SpeedInsights` component is mounted; no analytics integration is currently active in source.

## Maintenance recipes

Each recipe assumes an approved change. Keep unrelated refactors out of the same handover.

### Update identity, contact details, or a headline

1. Edit the relevant `SITE`/hero/contact export in `constants.ts`.
2. Search the relevant components for the old visible text. Check the hero name, desktop/mobile sidebar initials, availability labels, and CTA copy.
3. Update the title/description in `layout.tsx` if the site's identity or positioning changed.
4. Keep `HERO_HEADLINE_WORDS` and the accessible full `HERO_HEADLINE` consistent.
5. Review all rendered occurrences, email destinations, and both themes. Editing an unused field alone will not update the screen.

### Add a project

1. Duplicate a comparable object in `PROJECTS` and replace it with owner-approved facts.
2. Preserve the renderer's core fields: `title`, `subtitle`, `status`, `statusColor`, `access`, `stack`, `metrics`, `highlights`, and `cta`.
3. Optional `architecture` and `tags` are detected by property existence. Follow existing object shapes and run TypeScript afterward.
4. The current card renderer maps `statusColor` to `accent` or `warning`; adding another status treatment requires a component change.
5. The access-icon handling currently recognizes `Lock` or no icon. Register any new presentation deliberately.
6. Set `cta.href` to `null` when there is no approved public destination. The card then omits the CTA. Do not use `#` as a fake project URL.
7. Update `cta.href`, not just `github`: the `github` field is not currently rendered.
8. Review the metrics grid: exactly four metrics use two columns; other nonempty counts use three.
9. Check mobile wrapping, pointer tilt, external links, and whether hero/contact metrics also need an approved update.

Do not add fabricated client names, testimonials, performance figures, or completion claims to make a card look finished.

### Add skills or signals

- Add skills to `SKILL_GROUPS`. A skill may be a string or `{ name, learning?: boolean }`.
- A group's `span` contains literal Tailwind classes; do not construct utility names from arbitrary runtime fragments.
- Icon keys must match the relevant component's `iconMap`: Skills and About each maintain their own map. Import/register a new Lucide icon there before using its key.
- Unknown icons can break rendering in About/Skills because those lookups are rendered without an undefined guard.

### Update experience or education

1. Edit `EXPERIENCES` or `EDUCATION`; retain existing field shapes.
2. Confirm dates, achievements, current status, and any numbers with the owner.
3. An experience `location` of `undefined` hides that line. Review expand/collapse behavior after changing achievement length.
4. Certification `progress` is currently `null`, so progress graphics are not shown. A verified number enables them; keep percentage/module data factual and consistent.
5. Some progress/module text is commented out in the component. Changing data alone will not enable that text.

### Replace the résumé or add an image

1. Review the replacement with the owner before publishing personal information. Everything in `public/` can be requested by URL, even if not linked from the page.
2. The current résumé is `public/Piyush_Sontakke_Resume.pdf`; its public URL is `/Piyush_Sontakke_Resume.pdf`, **without `/public`**.
3. Replacing that same file retains its URL. For a filename change, update `SITE.resume` and the hardcoded `download` filenames in Hero and Contact.
4. Check case sensitivity, direct URL access, downloaded filename, and whether the PDF opens correctly.
5. Images such as `ps-circle.png`, `loan.gif`, and the remaining SVG assets are currently unreferenced. Replacing an unused file does not change a component.
6. No current component renders `next/image` or an HTML image. If adding an image, read the installed Next.js image guide, supply appropriate alternative text and sizing, and review any remote-source configuration as a separate change.

Never upload `.env` files, private contracts, or draft confidential documents to `public/`.

### Change the theme, fonts, or section layout

1. Change semantic tokens in **both** light and dark blocks of `globals.css`.
2. For a full rebrand, also review inline warning/glow RGBA values in Projects/TiltCard; tokens do not currently cover every color.
3. Change font loading in `layout.tsx` and matching CSS variable mappings together.
4. Preserve desktop/mobile spacing conventions. If changing sidebar width, change the page's desktop left margin too.
5. Check long text, keyboard focus, controls, muted labels, and filled-button contrast in both themes—not just the hero.

### Add, remove, or reorder a section

1. Follow an existing section's named export and use a unique lowercase `id`.
2. Supply a real accessible heading; decorative `aria-hidden` watermark text is not a substitute for a heading.
3. Add `"use client"` only if the component needs client functionality.
4. Import/mount it in `src/app/page.tsx` in the intended order.
5. Update `NAV_ITEMS` and its numbering/order to match. Update `FOOTER_LINKS` separately if the footer should link to it.
6. Test sidebar selection, mobile navigation, and a fresh load with `/#your-section`.
7. Testimonials needs real, permission-approved content before enabling its currently commented-out page/nav entries.

For a **new route** rather than an in-page section, read the installed App Router layout/page guide first. Do not treat a new URL as merely another `NAV_ITEMS` anchor.

### Implement contact submission later—not by uncommenting markup

The current contact method is email. The commented form references handlers/state/icons that are not defined or imported. Simply uncommenting it is not a complete feature and may fail compilation.

A future implementation needs an explicitly scoped decision: hosted form provider or a Next.js server-side endpoint/action. It should include server-side validation, accessible labels and field errors, loading/success/failure states based on real delivery, abuse protection, server-only credentials, privacy/retention decisions, and a verified test message. Coordinate recipients and preview-versus-production behavior with the owner. No such integration is installed or configured by this guide.

### Update SEO metadata

The current metadata only defines a title and description in `src/app/layout.tsx`. There is no configured Open Graph/Twitter image, canonical/`metadataBase`, sitemap, robots file/route, icon metadata file, or structured data.

For an approved SEO task, use Next.js metadata conventions rather than manually adding duplicate head tags. Confirm the production domain with the owner before adding canonical URLs. Validate the output after deployment; outbound social-profile links are not social-card metadata.

## Validation and definition of done

### Automated checks

Run from the repository root:

```bash
npm run lint
npx next typegen && npx tsc --noEmit --incremental false
npm run build
```

Do not continue to a production release when a required check fails. Read the first actionable error, fix it or report the existing blocker, then rerun the relevant check. Do not add `ignoreBuildErrors`, disable lint rules broadly, or switch bundlers just to get a green result.

For local production behavior, after a successful build:

```bash
npm start
```

Open the reported URL and run the manual checks. Stop with `Ctrl+C`; `npm start` is not a deployment command. If port 3000 is occupied, stop the process you own or use `npm start -- --port 3001`.

### Manual smoke checklist

Record pass/fail/not-tested, browser, viewport, and any blocker. Known baseline failures below are not automatically waived for a release; the owner decides whether to fix or explicitly accept them.

- [ ] Home page and a fresh `/#projects` load show the expected section/content.
- [ ] Mobile, tablet, and desktop layouts have no horizontal overflow; pay particular attention around 1024px.
- [ ] Sidebar links, active-section indicator, mobile menu links, and footer anchors reach their targets. Record the existing `#Skills` mismatch until fixed.
- [ ] Mobile menu opens/closes; keyboard navigation and focus remain understandable.
- [ ] Both theme controls work; the preference survives refresh; a fresh profile's default is understood.
- [ ] Headings, badges, muted text, CTA controls, and focus indicators are readable in both themes.
- [ ] Experience panels expand/collapse without clipping long text.
- [ ] Résumé opens/downloads, email links use the correct address, and approved external links go to the intended destinations.
- [ ] Contact is described as email-based; no one claims form submission or calendar booking is implemented.
- [ ] Section content reveals while scrolling; essential content is not dependent on hover.
- [ ] Reduced-motion mode is checked and outstanding behavior is documented.
- [ ] Browser console and network panel show no new application errors or missing assets.
- [ ] Owner-approved copy replaces any placeholders relevant to the release; project/hero/contact metrics are consistent or intentionally different.

There are no automated unit, integration, or end-to-end tests configured. Lint/type checking/building do not substitute for this interaction review. A future test suite should first cover navigation, theme persistence, résumé/contact links, expandable content, and responsive rendering.

### Baseline recorded during this handover

| Check | Result |
| --- | --- |
| Environment | Node v24.15.0, npm 12.0.2 |
| `npm run lint` | Passed, exit code 0 |
| Route type generation + `tsc --noEmit --incremental false` | Passed, exit code 0 |
| `npm run build` | Passed with Next.js 16.2.1/Turbopack; `/` and framework not-found output were static |
| Fresh `npm ci` | Not run; existing installed dependencies were used |
| Production server/browser/device smoke tests | Not run |
| Live external URLs, mail delivery, domain/DNS, Vercel deployment | Not verified |

### What to include in your handover

- The requested change and the files changed.
- Checks run, their actual results, and checks not run.
- Screenshots for UI changes in both themes and relevant viewport sizes.
- Known regressions or owner decisions; never call placeholder behavior complete.
- Preview URL and tested deployment identifier if an authorized preview was created.

The owner handles Git operations. Stop after the approved phase and hand over the summary rather than silently starting the next feature or production release.

## Known limitations and owner decisions

These are source-review observations, **not fixes made by this documentation task**.

| Area | Current behavior / required decision |
| --- | --- |
| Contact form | Commented-out unfinished markup; no submission handler, email service, or backend. |
| Booking CTA | “Book a Call” opens an email link, not a scheduling service. |
| Footer Skills link | `FOOTER_LINKS` uses `#Skills`, but the section ID is `skills`. |
| Project destinations | The three project cards do not currently expose public project URLs. |
| Certification | The resume does not provide numeric progress, so the progress UI is not currently displayed. |
| Testimonials | Unmounted skeletons, not real endorsements. |
| Theme scaffolding | Custom theme store is active; `next-themes` provider is unused. No system mode and no guaranteed cross-tab DOM update. |
| Counters | Counter hook is unused; displayed metrics are static. |
| Monitoring | Speed Insights dependency is installed but not mounted; no analytics integration in source. |
| Accessibility | Sidebar/Footer icon-only social links and scroll-to-top need accessible names; experience toggles lack expanded/control relationships; Skills lacks a foreground section heading. |
| Mobile menu | No focus trap, Escape-to-close handling, or body-scroll lock. |
| Motion | Reduced-motion support is incomplete; content reveal depends on JavaScript. |
| SEO | Basic title/description only; no dedicated social-card/canonical/sitemap/robots/icon configuration. |
| Tooling | No runtime pin, automated test suite, or repository CI workflow. |

Do not silently remove inactive scaffolding or dependencies while making content changes. Cleanup, accessibility remediation, contact integration, SEO, and CI are separate tasks with their own review and acceptance criteria.

## Troubleshooting

| Symptom | Check / next action |
| --- | --- |
| `node` or `npm` not found | Install/activate the agreed Node runtime, reopen the terminal, and check versions in the same environment as the repository. |
| Node version unsupported | Use Node 24.x LTS; Node 18 is not supported by this installed Next.js version. |
| `npm ci` reports lockfile mismatch | Confirm you have a consistent owner-provided manifest/lockfile pair. Reconcile an intentional dependency change with the owner; do not delete the lockfile. |
| Install denied or native package fails | Read the exact npm output, check network/runtime compatibility, and preserve the existing `allowScripts` configuration. Do not broadly approve unknown lifecycle scripts or bypass permissions without review. |
| Port 3000 already in use | Use `npm run dev -- --port 3001`, or stop a process you recognize and own. |
| Font download/build error | Check network access to Google Fonts and proxy/certificate configuration. The app downloads fonts during build. Do not disable TLS verification. An approved switch to local fonts is a code change, not an onboarding requirement. |
| Missing generated Next.js types | Run `npx next typegen`, then the TypeScript check. Do not hand-edit `next-env.d.ts`. |
| `npm start` reports no production build | Run `npm run build` successfully first; development output is not the production build. |
| Development looks right, production fails | Read the production build error, check import filename case, TypeScript, server/client boundaries, and required build network access. |
| New icon crashes a section | Verify the data's icon key exists in that section's `iconMap` and its component was imported. |
| New Tailwind variant has no effect | Use literal class names visible to Tailwind and existing semantic tokens; check whether `cn()` resolves a conflicting utility. |
| Theme default appears unchanged | Check `portfolio-theme` in this browser and the active `lib/theme.ts` path, not the unused provider. Use a fresh profile when checking the fallback. |
| Changed exported value is not visible | Confirm the component actually consumes it; some copy is hardcoded and some exported fields are unused. |
| New asset returns 404 | Use a root-relative URL without `/public`, match filename case exactly, and include the asset in the owner-approved deployment. |
| Section link does not scroll | Match the fragment and element ID exactly; review navigation/footer arrays separately. |
| Sending the contact form does nothing | There is no active form. Use email for current behavior; scope a real submission implementation separately. |
| Stale generated output suspected | Stop only the app processes you own. Inspect `.next` first and remove/regenerate only that disposable build directory if necessary. Never delete source, `public`, or the lockfile as a generic reset. |

For cloud-specific build, DNS, or rollback issues, use the [deployment troubleshooting table](VERCEL_DEPLOYMENT.md#deployment-troubleshooting).

## Handover checklist

Before responsibility transfers, the owner and incoming developer should agree on:

- [ ] Repository access and who performs Git operations/reviews.
- [ ] The local Node/npm versions and a successful installation on the incoming machine.
- [ ] A first successful lint/type/build run and recorded manual smoke results.
- [ ] Which content, statuses, public links, metrics, and résumé are approved.
- [ ] The known limitations to fix first versus consciously defer.
- [ ] Vercel team/project access and the actual Production Branch.
- [ ] The domain/DNS owner and the approved rollback decision-maker.
- [ ] Where release summaries and follow-up tasks are kept.

Do not share passwords or API tokens in this document. Use service invitations and the team's approved secret-sharing process.

## Technical references

Read the installed documentation for the version you are actually editing:

- Installation: `node_modules/next/dist/docs/01-app/01-getting-started/01-installation.md`
- Deployment: `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`
- Next.js 16 changes: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
- Environment variables: `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`
- CLI/type generation: `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md`

Official online references:

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Fonts](https://nextjs.org/docs/app/getting-started/fonts)
- [Images](https://nextjs.org/docs/app/getting-started/images)
- [Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Tailwind theme variables](https://tailwindcss.com/docs/theme)
- [Motion for React](https://motion.dev/docs/react)
- [npm ci](https://docs.npmjs.com/cli/commands/npm-ci)

Historical Word guides under `docs/Guide/` were not rewritten or validated by this handover. Prefer this guide plus the current source when old notes disagree.
