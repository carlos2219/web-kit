#!/usr/bin/env node
// web-kit checks for a site built from the template. Run from the site's root.
//   node check.mjs copy            → src/content/site.js: every string in every LANGS, no slop, no project-flagged terms
//   node check.mjs design <files>  → components use tokens only, no emoji icons, no hardcoded visible text
//   node check.mjs launch          → copy + design on all of src/ + placeholders left + every route has meta
// Prints findings and exits 1 if any.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const PLACEHOLDER = 'web-kit:placeholder'

// Generic AI-slop wording, both languages. Project-specific terms go in docs/copy-flags.json.
const SLOP = [
  /revolucion(a|ari)/i, /de vanguardia/i, /soluciones integrales/i, /\bpotencia(r|mos|)\b/i, /sinergia/i,
  /a otro nivel/i, /lleva tu \w+ al siguiente/i, /transforma(mos)? tu/i, /\binnovador(a|es|as)?\b/i,
  /cutting[- ]edge/i, /\bseamless(ly)?\b/i, /\bunlock\b/i, /\bleverag(e|ing)\b/i, /\bempower/i, /\belevate\b/i,
  /revolutioni[sz]e/i, /game[- ]chang/i, /next[- ]level/i, /world[- ]class/i, /best[- ]in[- ]class/i,
  /supercharge/i, /\bdelve\b/i, /lorem ipsum/i, /\b(TODO|TBD|FIXME)\b/,
].map((re) => [re, 'generic AI wording: say the concrete thing'])

const TW_PALETTE =
  /\b(?:bg|text|border|from|via|to|ring|fill|stroke|outline|decoration|shadow|divide|accent|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g
const DESIGN_RULES = [
  [/\[#[0-9a-f]{3,8}\]|['"`]#[0-9a-f]{3,8}['"`]/i, 'raw color: add a token in src/index.css and use it'],
  [/font-\[(?!\d)|fontFamily/, 'font outside the tokens: use font-sans / font-display / font-mono'],
  [/\p{Emoji_Presentation}/u, 'emoji as UI: use a drawn icon or a generated asset'],
  // Two or more words between JSX tags = visible text that bypassed site.js.
  [/>\s*[^<>{}\n]*\p{L}{2,}\s+\p{L}{2,}[^<>{}\n]*</u, 'hardcoded visible text: move it to src/content/site.js and read it with t()'],
]

const problems = []
const report = (where, why) => problems.push(`${where}: ${why}`)

async function checkCopy({ placeholders }) {
  const file = resolve('src/content/site.js')
  if (!existsSync(file)) return report('src/content/site.js', 'missing')
  // Cache-bust so repeated runs in one process see edits.
  const mod = await import(`${pathToFileURL(file)}?${Date.now()}`)
  const langs = mod.LANGS ?? ['es', 'en']
  const flagsFile = resolve('docs/copy-flags.json')
  const flags = existsSync(flagsFile)
    ? JSON.parse(readFileSync(flagsFile, 'utf8')).map(([re, why]) => [new RegExp(re, 'i'), why])
    : []
  const suffix = new RegExp(`^(.*)_(${langs.join('|')})$`)

  ;(function walk(node, path) {
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${v?.id ?? i}]`))
    if (!node || typeof node !== 'object') return
    for (const [key, value] of Object.entries(node)) {
      const here = path ? `${path}.${key}` : key
      if (typeof value === 'object') walk(value, here)
      const m = key.match(suffix)
      if (m) {
        for (const l of langs) if (!(`${m[1]}_${l}` in node)) report(here, `missing ${m[1]}_${l}`)
        if (typeof value === 'string' && !value.trim()) report(here, 'empty')
      }
      if (typeof value !== 'string') continue
      if (placeholders && value.includes(PLACEHOLDER)) report(here, 'placeholder copy')
      for (const [re, why] of [...SLOP, ...flags]) if (re.test(value)) report(here, `"${value.match(re)[0]}" — ${why}`)
    }
  })(mod.site, '')
}

function tokens() {
  const css = existsSync('src/index.css') ? readFileSync('src/index.css', 'utf8') : ''
  return new Set([...css.matchAll(/--color-([\w-]+)\s*:/g)].map((m) => m[1]))
}

function checkDesign(files) {
  const defined = tokens()
  for (const f of files) {
    const rel = relative('.', f).replaceAll('\\', '/')
    if (!/\.jsx?$/.test(rel) || /content\/site\.js$|\.test\.js$/.test(rel)) continue
    readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return
      for (const [re, why] of DESIGN_RULES) if (re.test(line)) report(`${rel}:${i + 1}`, why)
      for (const m of line.matchAll(TW_PALETTE))
        if (!defined.has(`${m[1]}-${m[0].split('-').pop()}`)) report(`${rel}:${i + 1}`, `"${m[0]}" is Tailwind's default palette: use a token`)
    })
  }
}

const walkFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walkFiles(join(dir, e.name)) : [join(dir, e.name)],
      )
    : []

async function checkLaunch() {
  await checkCopy({ placeholders: true })
  checkDesign(walkFiles('src'))
  if (!existsSync('DESIGN.md')) report('DESIGN.md', 'missing: run the design-system skill')
  for (const f of ['README.md', 'DESIGN.md', 'index.html', 'src/index.css', ...walkFiles('public')])
    if (existsSync(f) && /\.(md|html|css|svg|txt|json|webmanifest)$/.test(f) && readFileSync(f, 'utf8').includes(PLACEHOLDER))
      report(f.replaceAll('\\', '/'), 'placeholder left')
  if (existsSync('src/router.js')) {
    const { ROUTES } = await import(pathToFileURL(resolve('src/router.js')))
    const { site, LANGS = ['es', 'en'] } = await import(pathToFileURL(resolve('src/content/site.js')))
    if (!site.ogImage || !existsSync(join('public', site.ogImage)))
      report('site.ogImage', `social preview image missing (public${site.ogImage ?? '/og.jpg'}, 1200×630): see the assets skill`)
    const seen = new Map()
    for (const [path, key] of Object.entries(ROUTES))
      for (const l of LANGS)
        for (const field of ['title', 'description']) {
          const v = site.pages?.[key]?.[`${field}_${l}`]
          if (!v) report(`route ${path}`, `site.pages.${key}.${field}_${l} missing`)
          else if (field === 'title' && seen.has(l + v)) report(`route ${path}`, `title "${v}" duplicates ${seen.get(l + v)}`)
          else if (field === 'title') seen.set(l + v, path)
        }
  }
}

const [mode, ...files] = process.argv.slice(2)
if (mode === 'copy') await checkCopy({ placeholders: false })
else if (mode === 'design') checkDesign(files)
else if (mode === 'launch') await checkLaunch()
else {
  console.error('usage: check.mjs copy | design <files…> | launch')
  process.exit(2)
}

console.log(problems.length ? problems.join('\n') : `${mode} OK`)
process.exit(problems.length ? 1 : 0)
