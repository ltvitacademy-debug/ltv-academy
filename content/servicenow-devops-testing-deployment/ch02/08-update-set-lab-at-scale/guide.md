# Lesson 8 — Update Set Lab at Scale

**Chapter 2 · Update Sets at Scale · Lesson 8 of 26**

## What you'll learn

- How to apply Lessons 5-7 together on a single, realistic release
- How to reorder a promotion sequence to resolve a dependency problem
- How to review a collision and decide which version to keep
- How to investigate skipped records before deciding whether to proceed
- How these three problems interact when they show up in the same release

## The scenario

A team is promoting six Update Sets from Dev to Test, all part of one feature release: a redesigned incident escalation process. The sets are numbered #1 through #6, each batched by feature piece per Lesson 5's convention — one for a new Script Include, one for a new form layout, one for an escalation business rule, and so on. The team starts promoting them in numeric order and runs into three separate problems along the way.

## Problem 1: Update Set #3 has a missing dependency

When the team previews Update Set #3 (the escalation business rule), preview throws an error: the business rule calls a Script Include that doesn't exist on Test. Investigating further, that Script Include was built as part of Update Set #1 — which the team hasn't promoted yet, because they were working through the sets out of order based on who finished testing first in Dev.

**Walking through the fix:** per Lesson 7, the correct move is not to force #3 through. The team pauses, identifies that Update Set #1 contains the missing Script Include, and promotes #1 first. Preview on #1 is clean — no dependency of its own is missing — so it commits successfully. The team then re-runs preview on #3. This time the Script Include is present on Test, the dependency resolves, and #3 previews clean. The real lesson here: numeric or completion order is not the same as dependency order. The team should have mapped out which sets depended on which before starting, instead of discovering the dependency the hard way mid-promotion.

## Problem 2: Update Set #4 collides with a direct Test change

Update Set #4 touches the incident form layout. During preview, ServiceNow flags a collision: someone on the Test support team made a direct change to that same form directly on the Test instance last week — adding a field that a different, unrelated project needed for a short-term workaround.

**Walking through the fix:** per Lesson 6, the team does not blindly accept either version. They open the remote update (Update Set #4's new escalation-related layout) and the local update (the Test instance's current layout, which includes that unrelated workaround field) side by side. The two changes touch different parts of the same form — the remote update rearranges escalation-related fields, and the local update adds one unrelated field. Neither should fully overwrite the other. The team reconciles manually: they apply Update Set #4's escalation layout changes, and separately add back the workaround field from the local version, producing one corrected layout containing both. Only then do they mark the collision resolved and let the commit proceed.

## Problem 3: Update Set #5 shows 2 skipped records

Update Set #5, which carries notification-template changes, previews with 2 records marked as skipped rather than applied. Nothing in the preview is flagged as an outright error, so it would be easy to just proceed.

**Walking through the fix:** per Lesson 7, the team reviews each skipped record instead of waving it through. The first skipped record turns out to be genuinely identical on both Dev and Test — a safe, correct skip with nothing lost. The second is more concerning: it was skipped because a notification template on Test had already been edited directly, and the skip logic assumed that meant no change was needed. On closer inspection, the Test version is actually missing a new escalation-specific message block that the Update Set was supposed to add. The team does not accept this skip. They manually apply just that missing message block to the Test template before proceeding, rather than letting an incomplete notification template slip into the release.

## Deciding whether to proceed

Only after all three issues are actually resolved — the dependency fixed by reordering, the collision fixed by reconciliation, and the skipped records fixed by direct review and a manual correction — does the team move on to committing Update Sets #2 and #6, which preview clean with no issues. The release proceeds, but only because each problem was investigated on its own terms instead of being clicked past.

## Key terms

| Term | Meaning |
|---|---|
| Promotion sequence | The actual order Update Sets are promoted in, which must follow dependency order, not completion order |
| Side-by-side comparison | Reviewing the remote and local versions of a colliding record together before deciding |
| Safe skip | A skipped record that is genuinely identical between source and target, with nothing lost |
| Release readiness | The point at which every flagged issue across all Update Sets in a release has been investigated and resolved, not just acknowledged |

## Check yourself

If this team had promoted Update Set #3 before #1 without noticing the dependency, and force-pushed past the preview error, describe what state the Test instance would likely end up in, and why that's worse than the delay caused by pausing to reorder.
