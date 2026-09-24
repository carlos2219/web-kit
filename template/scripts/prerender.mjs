// Build step (after vite build): one HTML file per route with its own <title>, description and social-preview tags,
// because WhatsApp, Facebook, LinkedIn and many crawlers read the HTML without running JS. Uses the main language.
// With site.url set, also writes canonical URLs, sitemap.xml and robots.txt.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { ROUTES } from '../src/router.js'
import { LANGS, site, t } from '../src/content/site.js'

const lang = LANGS[0]
const shell = readFileSync('dist/index.html', 'utf8')
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
const abs = (p) => (site.url ? new URL(p, site.url).href : p)

for (const [path, key] of Object.entries(ROUTES)) {
  const title = esc(t(site.pages[key], 'title', lang))
  const desc = esc(t(site.pages[key], 'description', lang))
  const tags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.brand)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    site.ogImage && `<meta property="og:image" content="${abs(site.ogImage)}" />`,
    site.url && `<meta property="og:url" content="${abs(path)}" />`,
    site.url && `<link rel="canonical" href="${abs(path)}" />`,
  ].filter(Boolean)
  const html = shell
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${desc}" />`)
    .replace('</head>', `  ${tags.join('\n    ')}\n  </head>`)
  // /about → dist/about.html: Cloudflare Pages and Netlify serve it at /about without a redirect.
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

if (site.url) {
  const urls = Object.keys(ROUTES).map((p) => `  <url><loc>${abs(p)}</loc></url>`).join('\n')
  writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${abs('/sitemap.xml')}\n`)
}
console.log(`prerender: ${Object.keys(ROUTES).length} route(s)${site.url ? ' + sitemap.xml + robots.txt' : ' (set site.url for canonical + sitemap)'}`)
