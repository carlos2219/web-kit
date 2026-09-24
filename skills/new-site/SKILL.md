---
name: new-site
description: Take the user from a website idea to a published site, or resume one in progress, with the web-kit pipeline. The pipeline asks for information and feedback progressively and adapts to the budget, from completely free to low-cost upgrades like a custom domain or generated animations. Use it when the user wants to start a new site ("nuevo sitio", "tengo una idea para una web", "landing para X", "arranquemos el sitio de…"), asks "what's next" or "¿qué sigue?" in a web-kit site, or runs /web-kit:new-site. This skill is the plan for building the site, so don't run a separate brainstorming or plan skill for it.
---

# New site pipeline

The goal is a site that looks designed by a studio, not by AI, and that works properly on any budget. The user may not be a web developer, so you guide them: you propose, they choose or correct. You ask for more as each decision becomes relevant, never all up front.

## How to talk with the user

- **Propose, don't interrogate.** Draft from what you know, then ask "¿es así o lo cambio?". Correcting a draft is easier than answering a blank question.
- **Use AskUserQuestion** with 2–4 options, and put your recommendation first, marked "(Recomendado)". Ask 1–3 questions per turn, and only the ones the next step needs. The user can always pick "Other" to write their own answer.
- **Keep it simple.** No jargon. When a term is unavoidable, explain it in half a sentence: "dominio (la dirección tipo tunegocio.com)".
- **Show, don't describe.** When asking for design feedback, show screenshots (and the reference next to them). Turn vague feedback ("no me convence") into concrete options: more sober or bolder, the colors, the typography, the spacing, the image.
- **Money:** read [options.md](options.md). Never sign up, buy, or spend credits without an explicit yes.

## Resume or start

Every phase ends in a file, so check which ones exist to know where you are. Tell the user in one line which phase you're in and what comes next.

| Phase | Done when |
|---|---|
| 1 Idea + scaffold | `src/content/site.js` exists and `README.md` has no `web-kit:placeholder` |
| 2 Design direction | `DESIGN.md` exists and `src/index.css` has no placeholder |
| 3 Content | `docs/site.md` covers every page with copy in every language, and the user approved it |
| 4 Pilot | Home hero, nav and footer pass `web-kit:design-loop`, and the user approved them |
| 5 Pages | Every route in `docs/site.md` is implemented, and the user saw each page |
| 6 Visuals | Every `asset:` slot in `docs/site.md` is filled and logged in `docs/assets.md` |
| 7 Publish | `node <kit>/scripts/check.mjs launch` passes and the site is live |

`<kit>` is the web-kit root, two levels above this skill's base directory (`<base>/../..`). Commit at the end of each phase.

## Phase 1: From idea to brief

1. If the user hasn't described the idea, ask for it in 1–2 sentences. That's all you need to begin.
2. **Round 1** (AskUserQuestion, with options inferred from the idea):
   - Main goal: get contacts or quotes, sell or book, show a portfolio, inform (event, local business).
   - The one action the site asks for: WhatsApp, form, schedule a call, buy, or visit/call.
   - Languages.
   - Budget: "Gratis total" / "Bajo: dominio propio (~10–15 USD/año)" / "Medio: dominio + imágenes y animaciones generadas" / "Decido después". Recommend "Gratis total" to start, since upgrading later is easy.
3. **Draft the brief** in plain Spanish (not the README yet). Cover who it's for, their problem, why this offer and not the alternative, what the site asks them to do, and a proposed tone. Also propose a name if they don't have one. Ask "¿qué corregirías?". Iterate until they say it's right.
4. **Round 2, only what's still missing:** real facts you must not invent (services, experience, location, contact details), and anything that must never appear (prices, client names, claims without evidence). Private material goes in `privado/`, and nothing from it ever reaches the site.
5. **Scaffold:** `node <kit>/scripts/new-site.mjs <dir> --name "<Brand>" --langs es,en` (default `<dir>`: a sibling of the current directory, named after the brand slug). Work inside `<dir>` from here on.
6. Fill in `README.md` from the approved brief: every placeholder, including §9 with the chosen options from options.md. Turn tone into 3–5 rules, each with a do/don't example. Put brand-specific banned terms in `docs/copy-flags.json`. If the languages aren't `es,en`, the copy check lists what to add or drop in `site.js`.

## Phase 2: Design direction

Run `web-kit:design-system`. It shows the user 3 visual directions to choose from, then builds the system from the one they pick.

## Phase 3: Content

Write `docs/site.md`:

- **Site map:** one idea per page. Keep it small. A one-page site is a valid answer for a basic site. Five focused pages beat ten thin ones. Pages without real content yet go under "Futuro".
- **Structure:** global elements, then each page split into sections, in the order pain, offer, proof, how it works, call to action.
- **Copy:** every section gets a `Clave | <LANG> | …` table with the final copy in every language, plus `title`/`description` per page. Follow `web-kit:site-copy`.
- **Visual slots:** mark each one `asset: <what it shows>`. With a free budget, plan the visuals in CSS/SVG or around the user's own photos.

Show the user the site map and each page's headline, in their language. Ask for corrections. Proceed once they approve. From here on, edits go into the spec first, then into `site.js`.

## Phase 4: Pilot

Build only the Layout (nav, footer, and a global call-to-action block if the spec has one) and the Home hero. Run `web-kit:design-loop` until they pass. Show the user desktop and mobile screenshots next to the reference. Ask for feedback with concrete options.

Everything else inherits the pilot's decisions. Iterate here until they like it.

## Phase 5: Pages

For each page: add the route in `src/router.js` and `App.jsx` (and in `NAV` in `Layout.jsx` if it belongs in the navigation), add its copy to `site.js`, build it section by section by reusing the pilot's components, and run one `web-kit:design-loop` pass.

After each page, show the user a screenshot and ask one question: "¿Algo que cambiar en esta página?" (options: "Está bien, sigue" (Recomendado) / "Cambiar textos" / "Cambiar diseño"). With 4 or more pages, you may build them in parallel with subagents, one page per agent. Give each agent this Phase 5, `DESIGN.md`, and the pilot components. Then show all the pages together.

## Phase 6: Visuals

Run `web-kit:assets` for each `asset:` slot. It follows the budget in README §9.

## Phase 7: Publish

1. `node <kit>/scripts/check.mjs launch`, then `npm run check`. Fix everything they report.
2. Run a final `web-kit:design-loop` over every page, at desktop and mobile width, in every language.
3. Run `web-kit:publish`.

Finish with `web-kit:retro`, so this site makes the next one better. Later, when the user wants to improve the site (a domain, a form, animations, a new page), re-enter the phase that matches the request.
