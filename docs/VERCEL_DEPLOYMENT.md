# Vercel Deployment Guide

[Repository overview](../README.md) · [Developer handover](DEVELOPER_GUIDE.md)

**Audience:** the developer preparing a release and the owner approving it.  
**Reviewed:** 8 September 2026, against the repository and official Vercel documentation. Dashboard labels, plan features, and supported runtimes can change; consult the linked sources when they differ.

**This guide does not deploy anything.** Importing a project, deploying a preview, promoting production, changing DNS, or rolling back affects an external service. Obtain the owner's approval before taking those actions. The owner handles all Git operations.

## Contents

- [Deployment model](#deployment-model)
- [Access and preflight](#access-and-preflight)
- [Project settings](#project-settings)
- [First deployment through the dashboard](#first-deployment-through-the-dashboard)
- [Preview to production workflow](#preview-to-production-workflow)
- [Environment variables](#environment-variables)
- [Custom domain and Cloudflare DNS](#custom-domain-and-cloudflare-dns)
- [Post-deployment verification](#post-deployment-verification)
- [Rollback and recovery](#rollback-and-recovery)
- [Deployment troubleshooting](#deployment-troubleshooting)
- [Release handover record](#release-handover-record)
- [Official references](#official-references)

## Deployment model

Use Vercel's native **Next.js** support. The current project has:

- Next.js **16.2.1**, React **19.2.4**, and an npm lockfile.
- One application page at `/`, with client-side navigation/animation/theme behavior.
- React Compiler enabled and no custom output mode.
- No required environment variables, backend, database, API routes, or message-delivery service.
- No `vercel.json`, custom server, or repository CI workflow.

A local production build successfully prerendered `/` and Next.js's generated not-found output during this handover. Vercel still needs to build and serve the **Next.js application**, including its JavaScript, styles, fonts, and assets.

Do **not** add `output: "export"` simply to deploy here. Do not select `public/`, `out/`, or `dist/` as the output directory. `npm start` is for local/self-hosted production serving, not the Vercel build command. Vercel CLI installation is not required for the recommended dashboard/Git workflow.

## Access and preflight

### Confirm ownership first

Ask the owner for:

- The approved Git repository and the revision intended for release.
- The correct Vercel account/team and **existing project**, if one exists. Do not create a duplicate project merely because it is absent from this local checkout.
- Permission to import/deploy, plus the expected Preview and Production behavior.
- Confirmation of the Production Branch. Repository context identifies `master` as main and `development` as the working branch; that does not prove what Vercel currently tracks.
- The intended production domain and who manages its DNS. Earlier repository documentation names `portfolio.elixirflow.in` and Cloudflare, but live ownership, records, and routing were not verified.
- The rollback decision-maker and a known-good deployment, if production already exists.

Use account/team invitations, not shared passwords. Repository and Vercel permissions are separate: access to one does not guarantee access to the other.

**Plan suitability:** confirm Vercel's current plan terms for the intended business/freelance use, team collaboration, and private-repository ownership. Do not assume Hobby is appropriate. Vercel currently restricts deploying private organization/group repositories to Hobby teams; author/team access can also block automatic deployments. Do not make a private repository public merely to get around a plan/access limitation.

### Validate the proposed release locally

From the repository root, with the agreed Node version:

```bash
npm ci
npm run lint
npx next typegen && npx tsc --noEmit --incremental false
npm run build
```

`npm ci` replaces existing installed dependencies with the lockfile's set. Ensure the owner has supplied a consistent manifest and lockfile before running it.

After a successful build, optionally test the production server locally:

```bash
npm start
```

Use the [manual smoke checklist](DEVELOPER_GUIDE.md#validation-and-definition-of-done), then stop the server with `Ctrl+C`.

**Release gates:** lint/type/build pass; manual regressions resolved; public content, résumé, statuses, and destinations approved; known issues fixed or explicitly accepted. In particular, the contact form is not implemented and the footer Skills fragment currently has the wrong case.

Vercel's default build does **not** run `npm run lint`. There is no CI workflow in this repository to enforce it automatically. Keep lint in the release checklist; automated enforcement is a separate improvement.

## Project settings

Use these settings for this repository—not generic static-site defaults:

| Setting | Value | Reason |
| --- | --- | --- |
| Framework Preset | **Next.js** | Enables native framework-aware build/deployment |
| Root Directory | **Repository root**; normally leave the field at its root default | `package.json`, `next.config.ts`, and the lockfile are here, not inside `src` |
| Install Command | **`npm ci`** | Reproducible installation from `package-lock.json` |
| Build Command | **`npm run build`** | Runs this project's `next build` script |
| Output Directory | **Framework default; leave override disabled** | Let the Next.js integration manage output; do not manually point at `public`, `out`, `dist`, or `.next` |
| Node.js Version | **24.x** | Matches the recommended local major and the successfully reviewed environment |
| Environment Variables | **None required by current source** | No environment-backed integration is implemented |
| Production Branch | **Owner-confirmed value**; expected workflow is usually `master` for production and `development` for previews | Dashboard configuration is authoritative |

Vercel's documented versions at review time are 24.x (default), 22.x, and 20.x. Select **24.x**, not an older minimum, for this handover. Vercel manages minor/patch updates, so it will not necessarily run exactly local Node v24.15.0 or npm 12.0.2.

The Node setting is under **Settings → Build and Deployment → Node.js Version**. A future `package.json` `engines.node` entry can override the dashboard setting; none exists now. If the owner later pins the runtime, keep local setup and Vercel aligned and retest.

If the import screen does not expose a setting, review it immediately after project creation and before associating a production domain. On an existing live project, review every setting change with the owner first; it can affect the next deployment.

## First deployment through the dashboard

### 1. Check whether this is actually a new project

Sign in to the correct Vercel team and search its project list. If the application already exists, open it and review its repository, root, build settings, environments, and domains. Continue with the existing project instead of reimporting it.

If no project exists and creation is approved, choose **Add New / New Project**, connect the approved Git provider, and grant access to the required repository. Import **this repository**, not a template.

### 2. Review the build configuration

Confirm the [settings table](#project-settings). Vercel should detect Next.js from `package.json`. Keep the root at the repository root and leave output handling to the framework preset.

No `.env` values need to be copied for the current app. Never copy personal access tokens or local credentials into frontend variables “just in case.”

### 3. Understand the first deployment's environment

A new Git-linked project's first deployment can be a **Production deployment** of Vercel's automatically selected Production Branch, even if it initially has only a `vercel.app` URL. It is not automatically a harmless private preview.

Vercel's documented initial branch selection prefers `main`, then `master`, then other provider/default-branch fallbacks. Review the selected revision before clicking **Deploy**, obtain approval, and do not attach an existing live domain until it has been verified.

### 4. Deploy and inspect the result

Select **Deploy** only after approval. Watch install/build logs until the deployment is **Ready** or reports a failure. A queued or building deployment is not complete.

If it fails:

1. Read the earliest actionable error, not just the final “build failed” line.
2. Compare Node version, install/build commands, root directory, and the source revision against your local check.
3. Fix or escalate the actual issue, then request an approved retry. Do not disable TypeScript or security protections to force deployment.

Once Ready, open the generated deployment URL and complete the [post-deployment checks](#post-deployment-verification). Record the deployment URL and revision; do not just say “it works on Vercel.”

### 5. Confirm branch tracking before routine releases

In **Project Settings → Environments → Production → Branch Tracking**, confirm the owner's approved production branch and save only if a change is authorized.

If the intended workflow is `master` → production and `development` → previews, verify that exact configuration. Do not switch production to `development` simply because you are working there. Dashboard wording can evolve; look for Production environment branch tracking rather than assuming an old Settings → Git location.

## Preview to production workflow

A **Preview** is a built deployment used for review. A **Production** deployment is the environment intended to serve visitors, usually through the production domain.

Recommended normal release sequence:

1. Make the approved file changes locally and run the checks.
2. Hand the changes and test results to the owner. The owner performs the Git/PR operations.
3. With Git integration enabled, an owner-published change on a non-production branch such as `development` normally creates a Preview deployment.
4. Open that specific deployment URL and test the actual build. Preview access depends on Deployment Protection settings; a generated URL is not a guarantee of privacy or universal access. Grant reviewers appropriate access rather than disabling protection casually.
5. Record feedback and resolve blockers. Ask the owner to approve the release.
6. The owner moves the approved revision into the configured Production Branch through their normal Git workflow. Vercel normally creates a **new Production build** from that branch.
7. Wait for Ready and verify the custom domain and production deployment again. Preview validation alone is not production verification.
8. Record the production deployment URL/identifier and retain the previous known-good target for recovery.

Automatic Git deployments depend on enabled integration, permissions, and project settings. If a deployment does not appear, inspect those conditions before assuming the code is broken.

**Promotion is a separate action:** Vercel also supports manually promoting deployments. Do not promote a random Preview build as a shortcut around production checks—its configuration can differ. Use the ordinary production-branch build for routine releases unless the owner explicitly chooses and validates a different release procedure.

## Environment variables

There are **no required variables today**. If an approved future feature introduces them, use Vercel's environment-specific settings:

| Scope | Intended use |
| --- | --- |
| Development | Local development values; configuring them in Vercel alone does not automatically inject them into a plain `npm run dev` session |
| Preview | Non-production deployments; branch-specific overrides can exist |
| Production | Production deployments only |

Rules:

- Set only values needed by an implemented feature and use separate test recipients/services for previews when appropriate.
- Never expose provider secrets as `NEXT_PUBLIC_*` or place them in `constants.ts`.
- A root `.env.local` is for local development; do not upload or publish it.
- Vercel environment-variable changes apply to **new deployments**, not previously built deployments. Redeploy the affected environment after a change.
- Public Next.js variables are built into browser bundles; server-only configuration must stay on the server.
- Changing a dashboard value is not proof that the current production build uses it. Verify a new deployment and its actual behavior.

## Custom domain and Cloudflare DNS

Do this only after the `vercel.app` deployment passes checks and the owner approves routing changes. If the intended domain already serves production, treat any record change as a live-site change.

Earlier repository notes mention `portfolio.elixirflow.in`. Confirm that this is still the intended domain and that Cloudflare is still the DNS provider; neither was checked live during this documentation task.

### Configure the domain

1. In the correct Vercel project, open **Settings → Domains → Add Domain**.
2. Enter the approved hostname and confirm it is assigned to the intended production environment.
3. Read the exact DNS instructions shown on that domain's card. A subdomain normally uses a **CNAME**; the target can be project-specific.
4. In the DNS provider, inspect the hostname's existing records and record their current values before editing. Do not overwrite unexpected records without the owner's confirmation.
5. Add or update only the approved record. For the portfolio subdomain, the record name would ordinarily be `portfolio` within its parent zone; use the DNS provider's naming convention.
6. Use the **exact target shown by Vercel**. Do not blindly copy the older generic `cname.vercel-dns.com` value from historical notes or guess an IP address.
7. Complete any ownership TXT verification Vercel requests. A domain associated with another account may need verification or coordination with its owner.
8. Wait for Vercel to report valid configuration and for HTTPS/certificate provisioning to complete. DNS caching may delay what individual devices see.
9. Open the HTTPS hostname in a fresh browser session and verify it serves the intended deployment.

### Cloudflare-specific care

For a straightforward DNS-only setup, keep the CNAME **DNS only** (grey cloud) unless the owner intentionally operates a Cloudflare proxy in front of Vercel. If an existing record is proxied, discuss the change first; do not silently disable an intentional security/caching layer. Follow current provider guidance for any deliberate proxied setup.

Do not change the entire domain's nameservers merely to add this subdomain. Do not delete unrelated MX, TXT, or other service records. Apex domains and wildcard domains use different setup requirements; follow their domain card and the official guide rather than reusing these subdomain steps.

If `vercel.app` works but the custom domain does not, investigate domain assignment/DNS/HTTPS before changing application code. Once a canonical production hostname is confirmed, SEO metadata can be improved in a separately approved task; it is not configured by DNS alone.

## Post-deployment verification

Run this on the **specific deployment** and, for a production release, on the **custom domain**:

- [ ] Deployment is Ready and its source revision/environment are correct.
- [ ] `/` renders; a fresh `/#projects` link lands correctly after initialization.
- [ ] JavaScript, CSS, and fonts load without browser-console or network errors.
- [ ] Desktop, tablet, and mobile layouts remain usable in both themes.
- [ ] Theme preference survives reload, including through the custom domain's separate browser storage.
- [ ] Navigation and experience expand/collapse work; known fragment/accessibility issues are not concealed.
- [ ] `/Piyush_Sontakke_Resume.pdf` loads and download links use the intended document.
- [ ] Email, social, and project CTAs point to owner-approved destinations.
- [ ] Contact remains correctly presented as email-based—not a working form or calendar service.
- [ ] Production HTTPS is valid and the hostname belongs to the correct project/environment.
- [ ] No private test data or newly added credentials/assets have been published.
- [ ] The owner has the final URL, validation results, unresolved issues, and rollback target.

The theme preference belongs to each browser origin. A preview URL and the production domain can legitimately have different saved themes.

The current repository does not mount Speed Insights or an analytics component. Use deployment/build logs and browser developer tools for the checks above; do not claim monitoring is active merely because its package is installed. A green build also does not prove accessibility, SEO quality, email delivery, or external-link correctness.

## Rollback and recovery

### Decide whether rollback is appropriate

If a release breaks production, tell the owner what failed, the affected URL/revision, and the last known-good deployment. Obtain approval for recovery. Do not change DNS as the first response to an application regression when the existing Vercel project can restore a healthy deployment.

### Instant Rollback

1. Open the project's overview and choose **Instant Rollback** on the Production Deployment tile, or the corresponding action for an eligible deployment.
2. Select the owner-approved known-good target. Review the affected domains and configuration warning.
3. Confirm only after approval, then verify the production hostname, assets, navigation, résumé, and email links.
4. Record the failed deployment, restored deployment, reason, and checks performed.

Current documented constraints:

- Hobby can roll back to the **immediately previous deployment**.
- Pro/Enterprise can select eligible deployments that were previously assigned to production, subject to permissions and availability.
- A Preview deployment that has never served production is not an Instant Rollback target.
- Rollback reuses the previous build. It does **not** rebuild with newly edited environment variables or repair external services/data.
- Check any custom aliases carefully; not every alias is guaranteed to follow a rollback.

### Important: restore the normal release flow afterward

Vercel currently **turns off automatic assignment of production domains after a rollback**. New production-branch deployments therefore do not automatically replace the restored site.

Once the fix is reviewed and built, use the documented **Undo Rollback** flow on the production tile to select/promote the approved deployment and restore normal auto-assignment. Confirm the chosen deployment before doing this—it is another production action. Verify subsequent routing and do not assume the next owner-published change will go live while the project remains rolled back.

Rollback changes live routing, **not Git history**. The owner must also reconcile the source fix/revert through their normal Git workflow so a later release does not reintroduce the problem.

### If no eligible rollback exists

Coordinate with the owner to build/deploy a known-good source revision through Vercel's approved deployment workflow. This is a **new build**, with current build/runtime/environment settings, not an instant restoration of an old artifact. Retest and explicitly verify that it is assigned to production. Preserve the failed deployment/logs for diagnosis rather than deleting evidence.

## Deployment troubleshooting

| Symptom | Likely check / response |
| --- | --- |
| Repository missing from import list | Correct Git account/team, Vercel Git integration installation, repository permissions, and plan compatibility. |
| Change produces no automatic deployment | Git integration status, tracked branch, commit-author/team access, project settings, and any paused/ignored deployment behavior. |
| Cannot find `package.json` | Root Directory should be the repository root, not `src` or `src/app`. |
| `npm ci` fails | Manifest/lockfile consistency, supported Node/npm, dependency download logs, and existing lifecycle-script policy. Do not discard the lockfile as a fix. |
| TypeScript or ESLint error | Reproduce with the documented local command. Note that lint is separate from Vercel's default build. |
| Next.js/font build fails | Read the concrete build error; check runtime, font download/network access, and root/build configuration. Never disable TLS verification. |
| Deployment blocked for a vulnerable dependency | Follow Vercel's advisory and scope an approved dependency update with testing. A successful local build is not a security clearance; do not bypass the block. |
| Ready deployment shows 404 everywhere | Verify framework preset, root, output override, source revision, and assigned domain. |
| One public asset returns 404 | Filename case, root-relative URL, and whether the file is present in the deployed revision. |
| Custom domain invalid while `vercel.app` works | Exact Vercel DNS target, conflicting records, domain ownership/assignment, proxy behavior, DNS caching, and HTTPS status. |
| Preview asks for authentication | Inspect Deployment Protection and reviewer access; this may be expected, not an application bug. |
| Preview works but production differs | Compare revisions, environment scopes, Node/build settings, and domain assignment; production normally rebuilds separately. |
| Changed environment value has no effect | Create a new deployment in the correct scope; existing deployments keep their configuration. |
| Production does not update after rollback | Review the rolled-back state and use the approved Undo Rollback/promotion flow to restore domain auto-assignment. |
| Old content still appears | Check which deployment the hostname serves, the source revision, and browser caching before changing application data again. |
| No contact emails received | The application has no active submission backend; current contact links only open the visitor's email client. |
| Speed Insights is empty | The package is installed but no component is mounted. Integrating and enabling it is separate work. |

## Release handover record

Copy this template into the team's normal release notes. Fill it with observed facts; do not put secrets in it.

```text
Release purpose:
Owner approval / reviewer:
Source branch and revision (provided by owner):
Vercel team / project:
Environment: Preview / Production
Deployment URL or identifier:
Production hostname (if applicable):
Node major / build settings:
Lint result:
Type-check result:
Production build result:
Manual checks and browsers/viewports:
Known issues accepted or remaining:
Previous known-good deployment:
Rollback / domain auto-assignment state:
Follow-up owner:
```

**Verification boundary for this handover:** local lint, route-type generation/TypeScript, and production build passed using existing installed dependencies. No fresh install, browser smoke test, Vercel account inspection, deployment, DNS lookup/change, or live-domain validation was performed. The recommended dashboard configuration is documented, not applied.

## Official references

The following official documentation informed the deployment instructions. Use the latest page when platform UI or behavior changes:

- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Deploying Git repositories and production branch tracking](https://vercel.com/docs/git)
- [Build configuration](https://vercel.com/docs/builds/configure-a-build)
- [Supported Node.js versions and overrides](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Environment variables and deployment scopes](https://vercel.com/docs/environment-variables)
- [Adding and configuring a custom domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Instant Rollback, eligibility, and Undo Rollback](https://vercel.com/docs/instant-rollback)

The installed Next.js deployment guide is at `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`. No production configuration or domain state should be inferred solely from old README text.
