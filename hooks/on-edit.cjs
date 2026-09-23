// PostToolUse hook: after Claude edits a file in a web-kit site (has src/content/site.js), lint and check it.
// Exit 2 feeds the findings back to Claude. Silent in any other project.
const { execFileSync } = require('node:child_process')
const { existsSync } = require('node:fs')
const { join, relative } = require('node:path')

const CHECK = join(__dirname, '..', 'scripts', 'check.mjs')

let input = ''
process.stdin.on('data', (c) => (input += c)).on('end', () => {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd()
  const file = JSON.parse(input).tool_input?.file_path ?? ''
  if (!file || !existsSync(join(root, 'src/content/site.js'))) return
  const rel = relative(root, file).replaceAll('\\', '/')

  const runs = []
  if (/^src\/.*\.jsx?$/.test(rel)) {
    const oxlint = join(root, 'node_modules/oxlint/bin/oxlint')
    if (existsSync(oxlint)) runs.push([oxlint, '--deny-warnings', file])
    runs.push([CHECK, 'design', file])
  }
  if (rel === 'src/content/site.js' || rel === 'docs/copy-flags.json') runs.push([CHECK, 'copy'])

  const out = []
  for (const args of runs) {
    try {
      execFileSync(process.execPath, args, { cwd: root, stdio: 'pipe' })
    } catch (e) {
      out.push(`${e.stdout}${e.stderr}`.trim())
    }
  }
  if (out.length) {
    process.stderr.write(out.join('\n'))
    process.exit(2)
  }
})
