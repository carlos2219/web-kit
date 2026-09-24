---
name: retro
description: Turn what went wrong or needed manual correction in a web-kit session into permanent improvements to the web-kit plugin (checks, skills, template) or to the current site's rules. Use it at the end of a site phase, when a web-kit site launches, when the user says "retro", "aprende de esto", "que no vuelva a pasar", or "mejora el kit", or after the user has corrected the same kind of thing twice.
---

# Retro

Each site should make the next one faster and better. The method improves only if every correction becomes a rule the next session can't miss.

## 1. Harvest

From this conversation (and `git log` of the site since the last retro), list every moment where:

- the user corrected the output (design, copy, structure, process),
- a check or the design loop caught something only late,
- you or the user did the same manual step twice,
- a phase took much longer than it should have.

## 2. Classify and place each one

Is it **generic** (it would happen on any site) or **specific** (it's this brand's taste or rules)?

| Kind | Where it goes, strongest first |
|---|---|
| Generic, machine-checkable | A rule in `<kit>/scripts/check.mjs` (runs on every edit, so it can't be forgotten) |
| Generic, judgment | A line in the right skill: a rubric item, a prompt recipe, a phase step |
| Generic, starting point | `<kit>/template/` (a component, token, or doc section every site needs) |
| Specific, checkable | The site's `docs/copy-flags.json` |
| Specific, judgment | The site's `README.md` or `DESIGN.md` |

`<kit>` is the web-kit source repo, two levels above this skill's base directory (`<base>/../..`). If that path is inside the plugin cache (`.claude/plugins/cache`), edits there would be lost on the next update, so edit the user's clone of the web-kit repo instead. Ask for its path once and save it to memory. If they have no clone, offer `gh repo fork carlos2219/web-kit --clone`, then register it as their marketplace with `claude plugin marketplace add <clone path>`. Generic lessons are also worth proposing upstream as a pull request.

Prefer a check over a sentence, and one sharp sentence over a paragraph. Don't add a rule for a one-off.

## 3. Apply

Show the user the list, one line per item (the lesson, then where it goes), and apply the approved ones. For kit changes:

1. Edit, then test any `check.mjs` change against the current site and against a file that should fail.
2. Bump `version` in `<kit>/.claude-plugin/plugin.json` (patch for fixes, minor for new rules or skills).
3. Run `claude plugin validate <kit>`, then commit in the kit repo.
4. Tell the user to run `claude plugin marketplace update web-kit` and `claude plugin update web-kit@web-kit`, then restart Claude Code, to load the new version.
