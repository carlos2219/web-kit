# web-kit

**From an idea to a published, studio-quality website, by talking to Claude Code.**
No coding experience needed. It can cost nothing.

[Español](README.md) · [Step-by-step guide (Spanish)](docs/guia.md)

web-kit is a [Claude Code](https://claude.com/claude-code) plugin that turns "make me a website" into a guided process:

- **Claude asks as it goes.** It proposes drafts and multiple-choice options, and you correct them. There are no long forms and no jargon.
- **You see what gets built.** It shows you screenshots at every step and asks for your feedback.
- **The design doesn't look AI-made.** It starts from real references, writes down a visual system (`DESIGN.md`), and compares the result against the reference until it measures up.
- **Free by default.** Sites are published on Cloudflare Pages at no cost. A custom domain, generated animations, and other paid upgrades can be added later without rebuilding, and never without asking you.
- **Every site improves the next.** Your corrections become rules.

## Quick start

```bash
claude plugin marketplace add carlos2219/web-kit   # install (once)
claude plugin install web-kit@web-kit
mkdir my-site && cd my-site && claude --chrome      # open in the site folder
```

Inside Claude Code, type `/web-kit:new-site` and describe your idea. Claude guides you through the rest.

| Command | Use it to |
|---|---|
| `/web-kit:new-site` | Start a site, resume it, or ask what's next |
| `/web-kit:design-loop` | Polish something that doesn't look right |
| `/web-kit:design-system` | Change colors, typography, or style |
| `/web-kit:site-copy` | Change or translate text |
| `/web-kit:assets` | Prepare your photos and video, or generate images and animations |
| `/web-kit:publish` | Publish, update, connect a domain, get found on Google |
| `/web-kit:retro` | When done: turn your corrections into kit improvements |

No need to memorize them. Plain requests work too: *"it looks dull"*, *"change the home title"*, *"publish the changes"*.

## Requirements

Claude Code, Node.js 22+, and Git. Recommended: the Claude in Chrome extension (run `claude --chrome`), so Claude can see and judge the site. Optional: the [Higgsfield CLI](https://higgsfield.ai/cli) for generated images and video.

## Use

Open Claude Code in the folder where the site should live, run `/web-kit:new-site`, and describe your idea in a sentence or two. The pipeline has seven phases:

1. **Idea:** choose goal, main action, languages, and budget; then correct a draft brief.
2. **Visual direction:** pick one of 3 directions, shown with reference screenshots. The result is `DESIGN.md`.
3. **Content:** approve the site map and the headlines, in every language.
4. **Pilot:** give feedback on the home hero at desktop and mobile widths.
5. **Pages:** review a screenshot of each page.
6. **Visuals:** your own photos and footage (compressed, GPS stripped), CSS/SVG motion, or Higgsfield assets if you approve the cost.
7. **Publish:** free on Cloudflare Pages, plus getting found on Google (Search Console, Business Profile for local businesses), with optional domain, email, form, and analytics.

Run `/web-kit:new-site` again at any time to resume, or just ask for changes ("publish the changes", "I bought a domain").

## What's inside

Seven skills (the commands above), plus an edit-time hook. The hook (active only in web-kit sites) blocks typical AI-slop: Tailwind's default palette, off-system colors, emoji used as icons, hardcoded text, incomplete translations, and filler phrases.

Every route is prerendered to its own HTML file with title, description, and social-preview tags, plus `sitemap.xml` and `robots.txt`. The site template uses Vite, React 19, Tailwind v4, and Oxlint, with multi-language copy kept separate from components.

## Contributing

Issues and pull requests are welcome, especially new checks in `scripts/check.mjs` or rubric items that catch real problems. To customize web-kit for yourself: fork it, clone it, run `claude plugin marketplace add <clone path>`, and let the `retro` skill evolve your copy.

## License

[MIT](LICENSE)
