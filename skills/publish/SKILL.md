---
name: publish
description: Put a web-kit site online for free on Cloudflare Pages, and publish later changes with one command. Also adds low-cost upgrades when the user is ready — a custom domain, domain email forwarding, a contact form, and analytics. Use it when the user wants to publish, deploy, "subir", "poner en línea", update the live site, "ya compré un dominio", connect a domain, add a contact form, or see visits, and in phase 7 of web-kit:new-site.
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
5. Open the resulting `https://<slug>.pages.dev` and check every page, a direct link to an inner page (for example `/contacto`), and the mobile view. Direct links work without extra configuration, because Pages serves the app for any path when there's no `404.html`.
6. Write the live URL in `README.md` §9 and commit.

Tell the user how to publish future changes: ask Claude "publica los cambios", or run `npx wrangler pages deploy` after `npm run check`.

## Publishing changes

Run `npm run check`, then `npx wrangler pages deploy`. Give the user the URL.

## Upgrades (each one only after the user says yes)

- **Custom domain.** In the Cloudflare dashboard, go to Domain Registration → Register Domains. Search for the name. The price is shown at cost, so confirm it with the user before they pay. Then go to Workers & Pages → `<slug>` → Custom domains → add `domain.com` and `www.domain.com`. For a domain bought elsewhere (for example `.ec`), add it as a site in Cloudflare and change its nameservers at the registrar. Explain that this can take hours. After connecting, update any absolute URLs in the site and in `README.md` §9.
- **Domain email.** Email → Email Routing → forward `hola@domain.com` to the user's personal email. It's free. Replying *from* the domain needs a paid service (see options.md).
- **Contact form.** The user gets a free access key at web3forms.com, which is sent to their email. The key is public by design. Store it in `src/content/site.js` or a constant. The form `POST`s JSON to `https://api.web3forms.com/submit` with `access_key` plus the fields. The form needs labeled fields, a honeypot field (`botcheck`), clear success and error states taken from `site.js` in every language, and a privacy note if it collects personal data. Test it by submitting once from the live site.
- **Analytics.** Workers & Pages → `<slug>` → Metrics → enable Web Analytics. It's free, uses no cookies, and needs no banner.

Record every change in `README.md` §9 and commit.
