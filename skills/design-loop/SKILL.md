---
name: design-loop
description: Visually judge a page or section of a web-kit site against its DESIGN.md and gold-standard reference, then fix it. Captures screenshots at desktop and mobile widths in every language, scores them with a strict rubric, and fixes the biggest gaps. Repeats until the page passes. Use it after building or changing any visible section, when the user says something "looks generic", "looks AI-made", "no me convence", "pulir el diseño", or "compare with the reference", and in the pilot and launch phases of web-kit:new-site.
---

# Design loop

The first version is never the final one. This loop replaces "looks fine to me" with a comparison against a real reference. The reference is the site named in `DESIGN.md` → Sources, or a screenshot in `docs/references/`.

## Setup

1. Start the dev server in the background (`npm run dev`) and note the URL.
2. Load the browser tools in one call: `ToolSearch` with `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__resize_window,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__read_console_messages`. If the extension doesn't respond, ask the user to connect it. Don't judge design from code alone.
3. Open a new tab with the page, and another with the reference.

## Each iteration

1. **Capture.** Screenshot the section at 1440×900 and at 390×844, in every language (click the language toggle). Also screenshot the reference at the same widths, once per loop. Check the console for errors.
2. **Deterministic checks.** Run `node <kit>/scripts/check.mjs design <files you touched>`, where `<kit>` is `<base>/../..`. Any finding counts as a failure.
3. **Score** every rubric item in [rubric.md](rubric.md) from 1 to 5. Write one line of evidence for each score, based on what you see in the screenshots. Score the way a studio art director would when your work is next to the reference: a 5 means indistinguishable in craft from the reference, not "acceptable".
4. **Pass** when every item scores ≥ 4, the deterministic checks are clean, and there are no console errors.
5. **Otherwise** pick the **3 biggest gaps** (lowest score, then most visible) and fix them in code. Fix root causes: a token, a component recipe, spacing on a shared utility. Don't add per-element patches. If the fix is a design decision that `DESIGN.md` doesn't cover, record the decision there first.

Stop after 5 iterations even if the page hasn't passed. Report the remaining gaps and what each one needs. Often the gap is an asset (`web-kit:assets`) or a decision the user must make.

## Report

Output a short table (rubric item, score, evidence) plus the fixes you made. In the pilot, also show the final screenshots to the user.
