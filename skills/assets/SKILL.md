---
name: assets
description: Art-direct, generate, optimize, and log a web-kit site's images and animations with Higgsfield. Prompts are built from DESIGN.md's art direction, so every asset shares one look. Use it for any hero image, illustration, mascot, background, product visual, video, or animation, when a spec slot says "asset:", when a section looks empty or generic, or when the user mentions Higgsfield, images, video, or animation for the site.
---

# Assets

Generic icons and stock visuals are the fastest tell of an AI-made site. Every asset is generated for this brand, from one art direction, so they look like a set.

## Budget first

Read `README.md` §9.

- **Free budget:** use only medium 1 below (CSS/SVG), the user's own photos (ask for them, and say what kind of photo works best), and SVG illustrations drawn in code. This is a complete, professional result, not a lesser version.
- **Paid budget:** before generating anything, tell the user which assets you plan to generate and roughly how many credits they'll use. Wait for a yes.

## Setup (once per machine, only with a paid budget)

```bash
npm i -g @higgsfield/cli
higgsfield auth login
npx skills add higgsfield-ai/skills
```

Higgsfield's own skills teach the exact CLI commands and models. This skill decides **what** to generate and how it fits the site. If the CLI isn't installed or the user has no credits, write the prompts to `docs/assets.md` and give them to the user to run in the Higgsfield web app. The rest of the workflow is the same.

## Choose the medium (cheapest that works)

1. **CSS/SVG.** Use it for micro-motion, hover, reveals, diagrams, and patterns. It's free, sharp, and themeable with tokens. Follow the Motion section of `DESIGN.md`.
2. **Generated image.** Use it for the hero, illustrations, the mascot or signature element, and textures.
3. **Generated video.** Use it only where motion carries the message: a hero loop or a product in action. Keep it short (5–10 s), seamlessly loopable, and silent.

## Prompt recipe

Build every prompt from `DESIGN.md` → Art direction, in this order, so the whole set stays consistent:

`<subject + action> · <composition: framing, negative space for copy on the left or right> · <style: abstraction level, material, rendering> · <lighting> · <palette: 3–5 hex from the tokens> · <mood> · avoid: <forbidden clichés from DESIGN.md>, text, logos, watermarks`

- Reuse the same style, lighting, and palette block word for word across all prompts. Only the subject and composition change.
- Leave empty space where the copy will sit. Match the aspect ratio to the slot: 16:9 or 21:9 for a hero, 4:5 for cards, 1:1 for avatars and marks.
- Generate 3–4 variants. Pick the one that best fits the section in the running page, not the prettiest in isolation. Screenshot it in place.

## Deliver

- Put files in `public/assets/<page>-<slot>.<ext>` with descriptive names.
- **Images:** request the final size from the model (hero 2560 px wide at most). If `ffmpeg` is available (`winget install Gyan.FFmpeg`), convert to WebP: `ffmpeg -i in.png -c:v libwebp -quality 82 out.webp`. Aim for under 300 KB for a hero. Use `<img>` with `width` and `height` (no layout shift), `alt` text from `site.js` in every language (decorative images get `alt=""`), and `loading="lazy"` for anything below the fold.
- **Video:** export mp4 (H.264) plus a poster frame: `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -an -movflags +faststart out.mp4` and `ffmpeg -i in.mp4 -frames:v 1 poster.webp`. Aim for under 2 MB. Use `<video autoplay muted loop playsinline poster=…>`. Under `prefers-reduced-motion`, show only the poster.
- **Log it.** Append a row to `docs/assets.md` (create it with this header if missing): `| File | Slot | Model | Prompt | Date |`. With the prompt logged, any asset can be regenerated or restyled later.

Then run `web-kit:design-loop` on the section, so the asset is judged in place.
