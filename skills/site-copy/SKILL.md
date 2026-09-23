---
name: site-copy
description: Write, change, translate, or sync visible text on a web-kit site. That covers the spec in docs/site.md, its implementation in src/content/site.js (one field per language in LANGS, read with t()), and the brand rules in README.md. Use it whenever a task touches headings, taglines, CTAs, meta titles/descriptions, FAQ answers, or any string a visitor reads, in any language, even if the user only says "update the hero", "fix the English", or "implement section 4 of the spec". Also use it before adding a page or component that shows text.
---

# Site copy

The copy lives in two places that must agree:

- `docs/site.md` **defines** it: tables with columns `Clave | <LANG> | …`, one per page section.
- `src/content/site.js` **implements** it. Each visible string is a set of fields `<key>_<lang>`, one for each language in `LANGS`, read in components with `t(obj, key, lang)`.

`README.md` overrides both when they conflict. Read its sections 2 (audience), 4 (conversion), 5 (tone), and 7 (content rules) before writing any new wording.

## Workflow

1. **Locate.** Find the section in `docs/site.md` and the matching object in `site.js`. Table keys are local to their section. `title` under "Inicio → Hero" becomes `site.home.hero.title_<lang>`. Keys written with a dot (`nav.cta`) are global.
2. **Implement verbatim.** Carry spec text over exactly as written. Don't polish it on the way in, or the two files drift apart.
3. **New or changed copy:** write every language together. Each one must read naturally in its own language. It's not a literal translation. Then update `docs/site.md` so the spec still describes the site.
4. **No strings in components.** Components get text only through `t()`. A brand wordmark that never changes is the only allowed exception: `site.brand`.
5. **Check.** The edit hook runs the copy check automatically. You can also run it by hand: `node <kit>/scripts/check.mjs copy`, where `<kit>` is `<base>/../..`. It reports missing or empty language fields, generic AI wording, and the brand's banned terms from `docs/copy-flags.json`. Fix every finding, or tell the user why it stays.

## Writing rules

- **Name the pain first, then the offer.** "5 minutes on the train count" beats "Learn anywhere".
- **Be viscerally specific.** Use numbers, objects, and situations from the user's world. Leave out adjectives that any competitor could also use.
- **One screen, one idea, one ask.** Each section makes one point. There's one CTA per view, and it's always the README's §4 call to action.
- **Easy to read:** short sentences, common words, one clause per line where possible. No exclamation marks, no rhetorical questions in headings.
- **Fit the layout.** Headings stay short enough to fit on 2 lines on mobile in the longest language. Check it in the design loop.
- **Rewrite what sounds generated.** If a sentence could appear on 1,000 sites, rewrite it until only this brand could say it.

## Content rules that block a change

If a requested change breaks a README §7 rule (for example an unbacked claim, a price, a client name, or anything from `privado/`), don't make it. Tell the user which rule it breaks and suggest wording that complies.
