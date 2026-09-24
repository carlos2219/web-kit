---
name: publish
description: Put a web-kit site online for free on Cloudflare Pages, publish later changes with one command, and get it found on Google (Search Console, Google Business Profile, local business data). Also adds low-cost upgrades when the user is ready — a custom domain, domain email forwarding, a contact form, and analytics. Use it when the user wants to publish, deploy, "subir", "poner en línea", update the live site, "ya compré un dominio", connect a domain, add a contact form, see visits, "aparecer en Google", or "que me encuentren", and in phase 7 of web-kit:new-site.
---

# Publish

The user may have never deployed a site. Do everything you can from the terminal. For steps that need their browser (logins, payments, the Cloudflare dashboard), give them numbered clicks in plain Spanish, one step at a time, and wait for confirmation. The prices and free options are in `../new-site/options.md`.

## First publication (free)

1. Run `npm run check`. Don't publish a build that fails it.
2. `npx wrangler login` opens the browser. The user creates a free Cloudflare account, or logs in, and authorizes. Tell them this before running it.
3. Create `wrangler.toml` at the root:

   ```toml
   name = "<slug>"
   pages_build_output_dir = "dist"
   ```

   Add `"deploy": "npm run check && wrangler pages deploy"` to the `scripts` in `package.json`.
4. Run `npx wrangler pages project create <slug> --production-branch main`, then `npx wrangler pages deploy`. If the name is taken, try `<slug>-web`.
5. Set `url: 'https://<slug>.pages.dev'` in `src/content/site.js`, then run `npm run check` and `npx wrangler pages deploy` again. The build now writes canonical URLs, `sitemap.xml`, and `robots.txt`.
6. Open the live URL and check every page, a direct link to an inner page (for example `/contacto`), and the mobile view. Each route is served from its own prerendered HTML file. Unknown paths fall back to the app, which shows its 404 page.
7. Check the social preview: paste the URL into a WhatsApp chat with yourself (or use https://www.opengraph.xyz). The page's title, description, and `og.jpg` should appear.
8. Write the live URL in `README.md` §9 and commit.

Tell the user how to publish future changes: ask Claude "publica los cambios", or run `npx wrangler pages deploy` after `npm run check`.

## Publishing changes

Run `npm run check`, then `npx wrangler pages deploy`. Give the user the URL.

## Upgrades (each one only after the user says yes)

- **Custom domain.** In the Cloudflare dashboard, go to Domain Registration → Register Domains. Search for the name. The price is shown at cost, so confirm it with the user before they pay. Then go to Workers & Pages → `<slug>` → Custom domains → add `domain.com` and `www.domain.com`. For a domain bought elsewhere (for example `.ec`), add it as a site in Cloudflare and change its nameservers at the registrar. Explain that this can take hours. After connecting, set `site.url` to the new domain, then rebuild and redeploy. Update `README.md` §9, and resubmit the sitemap in Search Console if it's set up.
- **Domain email.** Email → Email Routing → forward `hola@domain.com` to the user's personal email. It's free. Replying *from* the domain needs a paid service (see options.md).
- **Contact form.** The user gets a free access key at web3forms.com, which is sent to their email. The key is public by design. Store it in `src/content/site.js` or a constant. The form `POST`s JSON to `https://api.web3forms.com/submit` with `access_key` plus the fields. The form needs labeled fields, a honeypot field (`botcheck`), clear success and error states taken from `site.js` in every language, and a privacy note if it collects personal data. Test it by submitting once from the live site.
- **Analytics.** Workers & Pages → `<slug>` → Metrics → enable Web Analytics. It's free, uses no cookies, and needs no banner.

## Being found (free, recommended for every site)

- **Google Search Console** (search.google.com/search-console): the user adds the site with their Google account. Verify it with the HTML-tag method (add the `<meta name="google-site-verification">` tag to `index.html`, then redeploy), and submit `sitemap.xml`. Google then indexes the pages and reports the searches that bring visitors.
- **For a local business** (it serves an area or has a place): create a **Google Business Profile** (business.google.com, free). For local services, it often brings more clients than the site itself. Guide the user: name, category, service area or address, phone or WhatsApp, hours, the site URL, and 5–10 of their best photos. The profile gets verified by Google (by phone, video, or post, and it can take days). Encourage asking the first clients for reviews.
- **Structured data for local businesses:** add one `<script type="application/ld+json">` to `index.html` with the schema.org `LocalBusiness` type (or a more specific one, like `ProfessionalService`). Include `name`, `url`, `telephone`, `areaServed` or `address`, `openingHours`, and `image`. Use exactly the same name, phone, and address as in the Business Profile and on the site: Google trusts consistent data.

Record every change in `README.md` §9 and commit.
