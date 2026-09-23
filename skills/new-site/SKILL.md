---
name: new-site
description: Build a complete marketing website from zero, or resume one in progress, with the web-kit pipeline. The steps are brief, scaffold, DESIGN.md, spec and copy, pilot section with design loop, the rest of the pages, generated assets, and launch checks. Use it when the user wants to start a new site ("nuevo sitio", "otra web", "landing para X", "arranquemos el sitio de…"), asks "what's next" in a web-kit site, or runs /web-kit:new-site. This skill is the plan for building the site, so don't run a separate brainstorming or plan skill for it.
---

# New site pipeline

The goal is a site that looks designed by a studio, not by AI, and that takes days rather than weeks to build. The pipeline gets its speed from three human checkpoints (brief, spec, pilot). Between them you work autonomously. It gets its quality from deciding the system first (README, DESIGN.md, spec) and building second, with deterministic checks on every edit.

## Resume or start

Run the state check first. Every phase ends in a file, so the files on disk tell you where you are:

| Phase | Done when |
|---|---|
| 1 Brief + scaffold | `src/content/site.js` exists and `README.md` has no `web-kit:placeholder` |
| 2 Design system | `DESIGN.md` exists and `src/index.css` has no placeholder |
| 3 Spec + copy | `docs/site.md` covers every page with copy in every language, and the user approved it |
| 4 Pilot | Home hero, nav and footer pass `web-kit:design-loop`, and the user approved them |
| 5 Pages | Every route in `docs/site.md` is in `src/router.js` and implemented |
| 6 Assets | Every asset slot in `docs/site.md` is filled and logged in `docs/assets.md` |
| 7 Launch | `node <kit>/scripts/check.mjs launch` and `npm run check` pass |

`<kit>` is the web-kit root, two levels above this skill's base directory (`<base>/../..`). Tell the user in one line which phase you're in, then continue from there. Commit at the end of each phase.

## Phase 1: Brief and scaffold (checkpoint 1)

Ask everything in one message, as a numbered list the user can answer in one go. Accept pasted documents, links, or "you decide".

1. Brand name and folder (default: sibling of the current directory, slug of the name).
2. What it is, in one sentence. Who buys, and what their pain is, in their own words.
3. The one action the site asks for (the call to action) and what happens after it.
4. Languages (the first one is the main language) and the pages they picture.
5. 2–3 visual references. These can be getdesign.md slugs (`npx getdesign list`), URLs of sites they admire, or `DESIGN.md` files. Also ask what each one contributes.
6. Anything that must never appear, such as prices, client names, or claims without evidence. Ask whether they have private material. It goes in `privado/`, and nothing from it ever reaches the site.

Then scaffold:

```bash
node <kit>/scripts/new-site.mjs <dir> --name "<Brand>" --langs es,en
```

Work inside `<dir>` from here on. Fill in `README.md` from the answers: replace every placeholder. Turn tone into 3–5 concrete rules, each with a do/don't example. Put brand-specific banned terms in `docs/copy-flags.json` as `[["regex","reason"]]`. If the languages aren't `es,en`, the copy check lists every field in `site.js` to add or drop.

Show the user the README sections for positioning, the call to action, and tone. Proceed once they approve.

## Phase 2: Design system

Run `web-kit:design-system`. No checkpoint here. The pilot is where the user judges the design, on a real page instead of on tokens.

## Phase 3: Spec and copy (checkpoint 2)

Write `docs/site.md` with the site map (one idea per page), the global elements, and each page split into sections. Every section gets a table with columns `Clave | <LANG> | …` holding the final copy in every language, plus the page `title`/`description`. Mark each visual slot as `asset: <what it shows>`. Follow `web-kit:site-copy` for wording. Structure pages the classic way: pain, then offer, then proof, then how it works, then the call to action.

Keep the site small. Five focused pages beat ten thin ones. Leave out pages that have no real content yet, like case studies without cases. List them under "Futuro".

Present a condensed view to the user: the site map, plus each page's hero copy in the main language. Proceed once they approve. Edits after this point go into the spec first, then into `site.js`.

## Phase 4: Pilot (checkpoint 3)

Build only the Layout (nav, footer, and any global call-to-action block) and the Home hero. Add their copy to `site.js` with `web-kit:site-copy`. Run `web-kit:design-loop` on them until they pass. Then show the user desktop and mobile screenshots of the hero, next to the reference.

Everything else inherits the pilot's decisions, so iterate here, not later. Proceed once they approve.

## Phase 5: Pages

For each page in the spec:

1. Add the route to `src/router.js` and `App.jsx`, and to `NAV` in `Layout.jsx` if the spec puts it in the navigation.
2. Add the page's copy to `site.js`.
3. Build it section by section. Reuse the pilot's components and patterns before you create new ones.
4. Run one pass of `web-kit:design-loop` per page.

Pages don't depend on each other. With 4 or more pages, you may build them in parallel with subagents, one page per agent. Give each agent this skill's Phase 5, `DESIGN.md`, and the pilot components as the pattern to follow.

## Phase 6: Assets

Run `web-kit:assets` for every `asset:` slot in the spec. Until an asset exists, the layout keeps a sized placeholder, so the page doesn't shift when the asset arrives.

## Phase 7: Launch

1. `node <kit>/scripts/check.mjs launch` checks for placeholders, copy parity, slop terms, design rules, and meta for every route. Fix everything it reports.
2. `npm run check` runs lint, tests, and the build.
3. Run a final `web-kit:design-loop` over every page, at desktop and mobile width, in every language.
4. Deployment: static hosting on Vercel, Netlify, or Cloudflare Pages. Build command `npm run build`, output folder `dist`. Add the SPA fallback so direct links work: `public/_redirects` with `/* /index.html 200` for Netlify or Cloudflare, or `vercel.json` rewrites for Vercel.

Finish by running `web-kit:retro`, so this site makes the next one better.
