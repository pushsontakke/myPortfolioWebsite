# Portfolio consistency fix report

## Changed

- Removed the four previous portfolio-fix commits and reapplied the work on
  the clean base.
- Restored the existing light/dark theme implementation and theme-changing
  button in the desktop and mobile Sidebar.
- Kept Testimonials code intact while commenting out its import, render call,
  and navigation entry.
- Kept the original dark palette as the default while wiring the existing theme
  button to a light palette through shared CSS tokens.
- Added ElixirFlow above ended Hushbox experience and added DocChase and
  AgentAudit project cards.
- Updated titles, dates, counters, copy hygiene, brand spelling, and hero
  copied-text accessibility fallback.
- Kept the GenAI progress and product statuses as explicit founder-input
  placeholders where the supplied facts were unfilled.

## Verification completed

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Source checks for em/en dashes and `Pinelabs`
- Theme toggle and commented Testimonials reference checks

## Fresh commits

- `66daa80` reapply experience and shared facts
- `dd427b0` reapply project cards and link guard
- `ff311fe` reapply copy hygiene and keep toggles

## Founder input still required

- Replace `[live / beta / in development]` for DocChase and AgentAudit.
- Replace `no public URL` if either product has a public URL.
- Replace GenAI `Module [N] of 4 ([X]%)` with current values.
