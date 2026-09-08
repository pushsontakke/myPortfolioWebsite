# Piyush Sontakke | Portfolio Website

A personal portfolio for presenting engineering experience, projects, skills, and services to recruiters and prospective clients. Built with Next.js App Router, React, TypeScript, Tailwind CSS, and Motion.

## Start here

| You want to… | Read |
| --- | --- |
| Install the project and understand the frontend | [Developer handover](docs/DEVELOPER_GUIDE.md) |
| Update content, components, styles, or assets | [Maintenance recipes](docs/DEVELOPER_GUIDE.md#maintenance-recipes) |
| Check a change before handing it over | [Validation and definition of done](docs/DEVELOPER_GUIDE.md#validation-and-definition-of-done) |
| Deploy, configure a domain, or recover a release | [Vercel deployment guide](docs/VERCEL_DEPLOYMENT.md) |
| Understand incomplete features and existing issues | [Known limitations](docs/DEVELOPER_GUIDE.md#known-limitations-and-owner-decisions) |

**Documentation reviewed:** 8 September 2026. The guides describe the current implementation, not a proposed rebuild. They distinguish repository facts from Vercel settings that must be confirmed by the project owner.

## Quick start

Obtain the repository from the owner and open its root directory—the folder containing `package.json`. Do not generate a new Next.js app over this project.

**Recommended runtime:** Node.js **24.x LTS**, with npm. Next.js 16.2.1 requires at least Node **20.9.0**, but that minimum is not a recommendation to use an older, unsupported runtime. This repository does not currently pin Node or npm versions.

```bash
node --version
npm --version
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the server with `Ctrl+C`.

- Use **npm**: this repository includes `package-lock.json`.
- `npm ci` installs the locked dependency versions and replaces an existing `node_modules` directory; it does not upgrade the lockfile.
- No environment variables, database, API keys, or backend services are required by the current application.
- Installation and the first build need network access. `next/font/google` downloads fonts during the build and serves them with the app afterward.

## Commands

Run these from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with hot updates |
| `npm run dev -- --port 3001` | Use another development port |
| `npm run lint` | Run ESLint against `src` |
| `npx next typegen && npx tsc --noEmit --incremental false` | Generate route types and run a standalone TypeScript check |
| `npm run build` | Create the production build |
| `npm start` | Serve a successful production build locally |

Next.js 16 uses Turbopack by default. **`next build` does not run ESLint**; lint must be a separate check. There is no `npm test`, `npm run typecheck`, or deployment script configured.

## Technology snapshot

Versions below are the locked versions reviewed for this handover, not instructions to upgrade packages.

| Technology | Version / implementation |
| --- | --- |
| Next.js | 16.2.1, App Router |
| React / React DOM | 19.2.4 |
| TypeScript | 5.9.3, strict mode |
| Tailwind CSS | 4.3.3, CSS-based theme configuration |
| Motion | 12.43.0, imports from `motion/react` |
| Lucide React | 0.577.0 |
| ESLint | 9.39.5, Next.js Core Web Vitals and TypeScript presets |
| React Compiler | Enabled in `next.config.ts` |
| Fonts | Syne, Inter, JetBrains Mono through `next/font/google` |
| Package manager | npm, lockfile version 3 |
| Deployment target | Native Next.js support on Vercel |

`next-themes` and `@vercel/speed-insights` are installed, but neither powers a mounted integration in the current app. The active theme system is custom code in `src/lib/theme.ts`.

## Frontend at a glance

- **One application page:** `src/app/page.tsx` assembles the `/` route.
- **Sections:** Hero → About → Skills → Experience → Projects → Services → Education → Contact, followed by Footer.
- **Shared layout:** desktop sidebar, mobile navigation, cursor glow, and scroll-to-top control.
- **Content:** most structured data lives in `src/lib/constants.ts`; some visible copy and metadata are still hardcoded in components.
- **Styling:** `src/app/globals.css` contains Tailwind v4 tokens, light/dark palettes, and reusable effects.
- **Theme:** saved light/dark preference; JavaScript defaults to **dark** when no valid preference exists. There is no active system-theme mode.
- **Contact:** email links and résumé download. The form is commented-out scaffolding; it does not send messages.
- **Not active:** testimonials, the `next-themes` provider, and the animated-counter hook.

## Before deployment

```bash
npm run lint
npx next typegen && npx tsc --noEmit --incremental false
npm run build
```

Then follow the manual checks in the [developer guide](docs/DEVELOPER_GUIDE.md#validation-and-definition-of-done) and the [Vercel runbook](docs/VERCEL_DEPLOYMENT.md).

Use Vercel's **Next.js** preset, the **repository root**, `npm ci`, and `npm run build`; leave the output directory on its framework default. Do not upload `public/` as the whole application or configure `npm start` as a build command.

The repository context identifies `master` as the main branch and `development` as the working branch. **Confirm the actual Production Branch in Vercel** rather than assuming `main`, `master`, or the checked-out branch is already configured there.

## Verification recorded for this handover

On Node **v24.15.0** and npm **12.0.2**:

- ESLint: **passed**.
- Route-type generation and TypeScript: **passed**.
- Production build: **passed**; `/` and the framework-generated not-found page were prerendered.
- Clean dependency installation, browser/device testing, live links, DNS, and a real Vercel deployment: **not performed**.

A successful build does not validate placeholder content, external destinations, accessibility, or message delivery. See the documented [known limitations](docs/DEVELOPER_GUIDE.md#known-limitations-and-owner-decisions).

## Working agreement and historical material

- `CLAUDE.md` and `AGENTS.md` contain project-specific instructions. Read them before using an assistant on this repository.
- The project owner handles Git operations. This documentation task does not stage, commit, merge, or push anything.
- Before implementing Next.js changes, consult the relevant installed guide under `node_modules/next/dist/docs/`; this project uses Next.js 16 conventions.
- Existing Word documents under `docs/Guide/`, plus `PLAN.md` and `REPORT.md`, remain untouched. Treat historical implementation notes as context, not as a substitute for the current code and these onboarding guides.
