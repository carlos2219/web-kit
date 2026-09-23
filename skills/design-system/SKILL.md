---
name: design-system
description: Create or update a site's DESIGN.md from reference brands, and implement it as tokens, fonts, and a favicon. References can be getdesign.md slugs, DESIGN.md files, or live URLs. Use it when the user wants to import a brand's style ("que se vea como Linear", "usa el DESIGN.md de Stripe"), change palette or typography, define motion or art direction, or when web-kit:new-site reaches phase 2.
---

# Design system

`DESIGN.md` is the contract every component, animation, and generated asset answers to. A site without one drifts toward AI defaults: indigo gradients, three generic cards, system fonts. The job is to **synthesize** an identity from references. Cloning one brand is not the job.

## 1. Collect references into `docs/references/`

- **getdesign.md slug:** run `npx getdesign@latest add <slug>`. It writes `./DESIGN.md`. Immediately move it to `docs/references/<slug>.md`.
- **File the user gives you:** copy it to `docs/references/<name>.md`.
- **Live URL:** open it with the claude-in-chrome tools. Take desktop and mobile screenshots. Read the computed styles of the body, the headings, a primary button, and a card: `getComputedStyle` via `javascript_tool`. Write down what you measured in `docs/references/<domain>.md`, using the same section structure as below.

Write down what each reference contributes. The brief in `README.md` §6 says, for example "structure and type from A, warmth and color from B".

## 2. Write `DESIGN.md`

Use this structure. Every value must be concrete (hex, px, ms, font name). A section that stays vague will be filled in by the model with defaults.

1. **Concept:** one sentence of visual metaphor, plus the theme (light or dark). For example: "payment rails in a drafting studio".
2. **Colors:** a table with Name, Value, Token (`--color-<name>`), and Role. 6–10 colors. Name them by role or material (`ink`, `paper`, `signal`), never by hue. Mark exactly one accent color for conversion, and say where it's allowed.
3. **Typography:** display, body, and mono fonts from Google Fonts (verify the license is OFL, i.e. usable commercially), with weights. Add a type scale with size, line-height, and tracking per role (page title, section title, body, label).
4. **Spacing, radius, shadows:** a scale for each.
5. **Components:** exact recipes (classes/tokens) for buttons (primary, secondary), nav, cards, inputs, and section headers.
6. **Motion:** easing curves, durations, what animates (entrances, hover, scroll) and what never does. Everything respects `prefers-reduced-motion`.
7. **Art direction** (read by `web-kit:assets`): subject or signature element (a distinctive one, not a cliché), lighting, palette as hex, abstraction level, composition, and forbidden clichés.
8. **Do / Don't:** 5 of each, specific to this site.
9. **Sources:** which reference contributed what.

Don't copy logos, brand names, illustrations, or signature copy from the references. Palettes, type scales, and layout patterns are fair to learn from. Their identity isn't.

## 3. Implement

- Put the tokens in `@theme` in `src/index.css`: `--color-*`, `--font-*`, plus radius and shadow tokens if they're non-standard. Update the `section-title` and `page-title` utilities to match the type scale, and the `body` base style. Remove the placeholder comment.
- Put the fonts in `index.html`: add the Google Fonts `preconnect` + stylesheet link in place of the placeholder comment. Set `theme-color`.
- Write `public/favicon.svg`: a simple mark in the brand colors. Don't use a letter inside a circle.
- Replace any template token names used in components (`muted`, `line`, `accent`) with the new ones. Then check that nothing still references a removed token: `grep -rn "text-muted\|border-line\|accent" src`.
- Run `npm run build` to verify.

When updating an existing system, change `DESIGN.md` first, then the tokens, then the components. A new color used by one component starts as a token.
