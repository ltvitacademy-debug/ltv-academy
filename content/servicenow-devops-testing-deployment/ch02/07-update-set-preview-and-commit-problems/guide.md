# Lesson 7 — Update Set Preview & Commit Problems

**Chapter 2 · Update Sets at Scale · Lesson 7 of 26**

## What you'll learn

- A one-line recap of preview/commit from course 3
- Why missing dependencies happen at scale, and the real fix
- Why skipped records need deliberate review, not a shrug
- What a partial commit is and why it leaves the target instance in a messy state
- How these three problems compound when you're promoting several Update Sets at once

## A quick recap, then the real problems

Course 3 covered the basic mechanics: preview checks an Update Set against the target instance before anything is applied, and commit actually applies the changes. That's the baseline. At scale — six, ten, twenty Update Sets moving through a release together — preview and commit surface three real problems that a single, simple Update Set almost never shows you.

## Missing dependencies

A missing dependency happens when the Update Set you're previewing references something — a Script Include, a table, a field — that doesn't exist yet on the target instance, because that something actually lives in a DIFFERENT Update Set that hasn't been promoted yet. Preview will flag this, often as an error referencing a component it can't find. The instinct to "just force it through" is wrong: the real fix is figuring out which earlier Update Set contains the missing piece and promoting that one first, then re-running preview on the set that depends on it. This is exactly why Lesson 5's feature-based batching matters — if dependencies are scattered across unrelated Update Sets with no clear promotion order, finding the right sequence becomes guesswork.

## Skipped records

During preview, ServiceNow (or an admin reviewing the preview results) can flag a specific change to be skipped rather than applied. This might happen because a customization appears identical to what's already there, or because the system judges the change low-risk to omit. The mistake many teams make is treating a skipped record as a non-event — something to click past because it wasn't flagged as an error. In reality, a skipped record deserves the same deliberate review as a collision: what exactly was skipped, and was it actually safe to skip? Skipping something that mattered — a workflow activity, a client script that was genuinely different from what the skip logic assumed — can leave the target instance in a subtly broken state that won't surface until someone hits that specific path later.

## Partial commits

A commit applies an Update Set's changes as a sequence of operations. If that sequence is interrupted partway through — a network drop, a session timeout, an unrelated system issue — the target instance can end up with SOME of the Update Set's changes applied and others not. This is a genuinely messy state: the Update Set's own status may not clearly reflect what did or didn't make it through, and re-running the commit blindly risks reapplying changes that already landed. Resolving a partial commit requires carefully checking what's actually present on the target against what the Update Set intended, record by record, before deciding whether to re-run, manually finish the remainder, or roll back what did apply.

## Why these compound at scale

A single Update Set promoted in isolation rarely hits all three problems. A release moving six or more Update Sets through a pipeline is a different story: a missing dependency in one set can mask what would otherwise be a clean promotion, a skipped record in another set can go unnoticed amid everything else being reviewed, and any one of several commits can be the one a network blip interrupts. Treating preview and commit as a single rubber-stamp step, rather than reviewing each one deliberately, is how a multi-Update-Set release ends up in production with problems nobody caught until later.

## Key terms

| Term | Meaning |
|---|---|
| Missing dependency | A referenced customization that doesn't exist yet on the target because it's in a different, not-yet-promoted Update Set |
| Skipped record | A change that preview flags to omit rather than apply, requiring deliberate review before accepting |
| Partial commit | A commit interrupted partway through, leaving the target instance with some changes applied and others not |
| Promotion order | The sequence Update Sets must be promoted in so dependencies resolve correctly |

## Check yourself

Walk through, out loud, why force-pushing an Update Set through preview despite a missing-dependency error is the wrong move, and what the correct sequence of actions should be instead.
