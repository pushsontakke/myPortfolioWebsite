# Portfolio consistency fix plan

## Scope

- Keep the existing light/dark theme implementation and Sidebar theme toggle.
- Keep Testimonials code intact, but comment out its page render, import, and
  navigation entry.
- Reapply the experience, project, copy, counter, certification, and hero
  fixes from the supplied founder facts.

## Files reviewed

- `src/lib/constants.ts` for shared content and counters.
- `src/components/sections/Experience.tsx` and `About.tsx` for timeline copy.
- `src/components/sections/Projects.tsx` for project-card links.
- `src/components/sections/Hero.tsx` for animated and copied headline text.
- `src/components/layout/Sidebar.tsx`, `src/components/ui/ThemeToggle.tsx`,
  and `src/lib/theme.ts` for theme behavior.
- `src/app/page.tsx` for section composition.

## Verification

1. Run lint, typecheck, and production build.
2. Check theme toggle references and commented Testimonials references.
3. Check source copy for em/en dashes and `Pinelabs`.
4. Confirm the working tree and commit history are clean after the redo.
