#!/usr/bin/env node
// Scaffold a site from web-kit/template:  node new-site.mjs <dir> --name "Brand" [--langs es,en] [--no-install]
// Copies the template, fills __NAME__/__SLUG__/__LANG__, sets LANGS, installs deps, and makes the first commit.
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { basename, join, resolve } from 'node:path'
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { name: { type: 'string' }, langs: { type: 'string', default: 'es,en' }, 'no-install': { type: 'boolean' } },
})
const dir = positionals[0] && resolve(positionals[0])
if (!dir || !values.name) {
  console.error('usage: new-site.mjs <dir> --name "Brand" [--langs es,en] [--no-install]')
  process.exit(2)
}
if (existsSync(dir) && readdirSync(dir).length) {
  console.error(`${dir} exists and is not empty`)
  process.exit(1)
}

const langs = values.langs.split(',').map((l) => l.trim().toLowerCase())
const slug = basename(dir).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
cpSync(join(import.meta.dirname, '..', 'template'), dir, { recursive: true })

const fill = (s) => s.replaceAll('__NAME__', values.name).replaceAll('__SLUG__', slug).replaceAll('__LANG__', langs[0])
const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]))
for (const f of walk(dir)) if (/\.(jsx?|json|md|html|css)$/.test(f)) writeFileSync(f, fill(readFileSync(f, 'utf8')))

// Only LANGS is set here; the copy check then lists every field to add or drop in site.js.
const siteJs = join(dir, 'src/content/site.js')
writeFileSync(siteJs, readFileSync(siteJs, 'utf8').replace(/LANGS = \[.*\]/, `LANGS = ${JSON.stringify(langs).replaceAll('"', "'")}`))

const run = (cmd) => execSync(cmd, { cwd: dir, stdio: 'inherit' })
if (!values['no-install']) run('npm install')
run('git init -q -b main')
run('git add -A')
run('git commit -q -m "Scaffold site from web-kit template"')
console.log(`\nSite ready: ${dir}\nNext: open Claude Code there and run /web-kit:new-site to continue the pipeline.`)
