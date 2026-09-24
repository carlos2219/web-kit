# Menu of options by budget

Every need has a **free** option that works well. Paid options are upgrades, never requirements. The prices here are reference values as of 2026-09. Before recommending a paid option, check the current price with WebSearch and show it to the user.

Record each decision in the site's `README.md` §9, "Presupuesto y servicios". The user can move up (or down) a level at any time.

| Need | Free (default) | Low cost | When it's worth paying |
|---|---|---|---|
| **Hosting** | Cloudflare Pages: unlimited bandwidth, SSL included. The address is `<name>.pages.dev`. | Not needed. | Almost never, for a static site. |
| **Custom domain** | `<name>.pages.dev` | Cloudflare Registrar at cost, about 10–15 USD/year for a `.com`. Country domains like `.ec` cost more, sold through local registrars. | When the site is shown to clients or printed on business cards. It builds trust and memorability. |
| **Domain email** | Forward `hola@domain` to Gmail with Cloudflare Email Routing (free, needs the domain). Without a domain, use Gmail. | Google Workspace / Zoho, about 1–7 USD per user per month, to *send* from the domain. | When the team writes to clients from the domain. |
| **Main contact** | WhatsApp link (`https://wa.me/<number>?text=…`) or `mailto:`. No backend. | Not needed. | — |
| **Contact form** | Web3Forms (250 submissions a month free, no backend). It's a `fetch` to their API with a public key. | Paid Web3Forms or Formspree plans, for more volume or file uploads. | Only if the free plan runs short. |
| **Scheduling calls** | Cal.com or Google Calendar booking pages (free), linked or embedded. | — | — |
| **Being found on Google** | Google Search Console (indexing + sitemap) and, for a local business, a Google Business Profile. Both are free. | — | — |
| **Photos and video** | The user's own photos and footage, compressed with ffmpeg. Long reels go on YouTube or Vimeo. | — | — |
| **Analytics** | Cloudflare Web Analytics: free, no cookies, no banner. | — | — |
| **Fonts** | Google Fonts (OFL license, free for commercial use). | Commercial fonts, 20–200 USD each. | Rarely. A well-chosen Google font is enough. |
| **Images** | The user's own photos, CSS/SVG compositions, illustrations drawn as SVG in code. | Higgsfield credits: plans from roughly 9–30 USD/month, or a single month to generate the whole site. | Hero, mascot, or signature visual, when the site competes on impact. |
| **Animations** | CSS transitions and SVG (free, lightweight, often the best option). | Generated video with Higgsfield (same credits as images). | A hero or product showcase where motion carries the message. |

## Rules

- **Never** create accounts, buy anything, or spend credits without asking the user first. Show them the cost and the free alternative.
- When the budget is free, the site must still look professional. Quality comes from design, typography, and copy, not from paid assets.
- Keep upgrades small: adding a domain, a form, or generated assets must not require rebuilding the site.
