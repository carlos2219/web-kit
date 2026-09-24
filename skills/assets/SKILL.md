---
name: assets
description: Produce a web-kit site's visuals. Covers the user's own photos and video (selecting, compressing, stripping GPS data, embedding), CSS/SVG motion, images and animations generated with Higgsfield from DESIGN.md's art direction, and the social preview image. Use it for any hero, gallery, portfolio, reel, illustration, background, video, or animation, when a spec slot says "asset:", when a section looks empty or generic, when the user has photos or footage to show, or when they mention Higgsfield or the image shown when a link is shared.
---

# Assets

Generic icons and stock visuals are the fastest tell of an AI-made site. The most convincing visual is usually the user's real work. Everything else comes from one art direction, so the set looks coherent.

## Choose the source (best first)

1. **The user's own photos and video** of their real work, team, place, or product. Ask for them early, and say exactly what works: wide shots with room for text, good light, no watermarks, and landscape for heroes. They're free and they build trust that no generated image can.
2. **CSS/SVG.** Use it for micro-motion, hover, reveals, diagrams, and patterns. It's free, sharp, and themeable with tokens. Follow the Motion section of `DESIGN.md`.
3. **Generated with Higgsfield.** Use it only with a paid budget (`README.md` §9), for what the user can't shoot: a hero concept, illustrations, a mascot, textures. Before generating anything, list the assets and roughly how many credits they'll use, and wait for a yes.

With a free budget, use options 1 and 2 only. That's a complete, professional result, not a lesser version.

## Tools

The user's media needs `ffmpeg`, installed once: Windows `winget install Gyan.FFmpeg`, macOS `brew install ffmpeg`, Linux `apt install ffmpeg`. The originals go in `media-originals/`, which is gitignored because it's too heavy for git. The web versions go in `public/assets/<page>-<slot>.<ext>`.

## Own photos

- **Select** 1 strong image per slot rather than many average ones. For a gallery or portfolio, pick 6–12 of the best, grouped by service.
- **Compress and strip metadata.** Drone and phone photos carry GPS coordinates in their EXIF data, so strip it before publishing:
  `ffmpeg -i media-originals/x.jpg -map_metadata -1 -vf "scale='min(2400,iw)':-2" -c:v libwebp -quality 80 public/assets/x.webp`
  Also make a 1200 px version for cards and mobile. Serve both with `srcset`.
- Keep a hero under 300 KB and a card under 120 KB.

## Own video

- **Hero or background loop:** 6–15 s of the best footage, silent, 1080p at most:
  `ffmpeg -i media-originals/x.mp4 -map_metadata -1 -an -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow -movflags +faststart public/assets/x.mp4`
  Make a poster frame too: `ffmpeg -ss 1 -i public/assets/x.mp4 -frames:v 1 -c:v libwebp public/assets/x-poster.webp`.
  Aim for under 5 MB. Use `<video autoplay muted loop playsinline preload="metadata" poster=…>`. Under `prefers-reduced-motion`, show only the poster.
- **Long reels, showreels, or anything with sound:** upload to YouTube or Vimeo (free). Embed as a poster image with a play button. Load the `<iframe>` only on click (`youtube-nocookie.com`), so the page stays fast and third-party cookies don't load until the visitor asks for the video.
- **Hard limit:** Cloudflare Pages rejects any file over 25 MiB. Anything larger goes to YouTube or Vimeo.

## Generated images and video (paid budget)

Setup, once per machine: `npm i -g @higgsfield/cli`, `higgsfield auth login`, `npx skills add higgsfield-ai/skills`. Higgsfield's own skills teach the exact commands and models. Without the CLI, write the prompts to `docs/assets.md` for the user to run in the Higgsfield web app.

Build every prompt from `DESIGN.md` → Art direction, in this order:

`<subject + action> · <composition: framing, negative space for copy on the left or right> · <style: abstraction level, material, rendering> · <lighting> · <palette: 3–5 hex from the tokens> · <mood> · avoid: <forbidden clichés from DESIGN.md>, text, logos, watermarks`

- Reuse the same style, lighting, and palette block word for word across all prompts. Only the subject and composition change.
- Match the aspect ratio to the slot: 16:9 or 21:9 for a hero, 4:5 for cards, 1:1 for marks.
- Generate 3–4 variants. Pick the one that best fits the section in the running page. Compress it the same way as own media.
- Video only where motion carries the message: 5–10 s, loopable, silent.

## Social preview image (every site)

`public/og.jpg` at 1200×630 is what WhatsApp, LinkedIn, and others show when a link is shared. Use the hero photo, or a strong own photo, cropped:
`ffmpeg -i media-originals/x.jpg -map_metadata -1 -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 3 public/og.jpg`

Keep the subject centered, because some apps crop it to a square. The launch check reports it if it's missing.

## Markup and log

- Use `<img>` with `width` and `height` (no layout shift). Take the `alt` text from `site.js` in every language, and give decorative images `alt=""`. Add `loading="lazy"` below the fold.
- Append a row to `docs/assets.md` (create it with this header if missing): `| File | Slot | Source (own / CSS / model) | Original or prompt | Date |`. That way any asset can be traced, regenerated, or replaced later.

Then run `web-kit:design-loop` on the section, so the asset is judged in place.
