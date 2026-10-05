# Lesson 21 — Maintaining Lineage

**Chapter 4 · Documenting Lineage · Lesson 21 of 25**

## What you'll learn

- Why lineage documentation decays even after it's built correctly once
- The specific practices that keep it accurate over time
- Why automation (Lesson 19) reduces, but doesn't eliminate, the maintenance burden
- How this chapter's documentation work connects to Chapter 5's applied, end-to-end cases

## Lineage decays. That's the default, not the exception.

Every lesson so far in this chapter has assumed documentation exists and is accurate. In practice, lineage documentation starts decaying the moment it's finished, for three ordinary reasons:

- **Schema changes** — a column gets added, renamed, or dropped, and the documentation isn't updated to match.
- **New pipelines** — a new source, transformation, or report gets built, and nobody adds it to the existing graph.
- **Decommissioned systems** — an old source or report gets retired, but stays in the documentation as a dead node, making the graph look more connected (and more trustworthy) than it actually is.

None of these are failures of the original documentation effort — they're the ordinary result of systems continuing to change after the documentation was written. The question isn't whether lineage will drift, it's whether anything catches the drift.

## Practices that keep it accurate

- **Re-scan automated lineage regularly** — if a tool (Lesson 20) generates the graph from code, running that scan on a schedule (not just once at setup) is what makes "stays current" actually true in practice, rather than just true in theory.
- **Review lineage on every change ticket** — tying a lineage-documentation check into the same change process that already exists for Lesson 15's change impact assessments means it happens as a normal step, not a separate thing someone has to remember.
- **Assign ownership of the documentation itself** — not just ownership of each node (Lesson 17), but someone responsible for the overall graph staying trustworthy, the same way a code repository has a maintainer.
- **Periodically audit for dead nodes** — a scheduled check for datasets and reports that no longer exist, removing them so the graph reflects systems as they actually are today, not as they were two years ago.

## Automation helps. It doesn't solve the whole problem.

Lesson 19 covered automated lineage's real blind spot: anything outside parseable code — a manual export, a one-off script, an undocumented manual hop — doesn't update itself no matter how good the automated tooling is. Maintenance has to cover both halves: trusting automation to keep the scannable part current, and treating the manual part as something that genuinely needs a human to revisit, on a schedule, not just once.

## Where this leads next

Chapter 4 covered what to document, how to diagram it, how it gets built, which tools exist, and how to keep it accurate. Chapter 5 — Applied Lineage — puts all of it together: two full case studies tracing real lineage scenarios end to end, a practice lab, and a review checklist that closes out the course.

## Key terms

| Term | Meaning |
|---|---|
| Lineage drift | The gradual inaccuracy that accumulates in documentation as the underlying systems change |
| Dead node | A documented dataset or report that no longer actually exists |
| Documentation ownership | Responsibility for the overall lineage graph staying trustworthy, not just individual nodes |

## Lab

For the lineage documentation you built in Lesson 17's lab, write a short maintenance plan: how often would you re-check it, what would trigger an update outside that schedule, and who (a role, not necessarily a name) should own keeping it accurate.

## Check yourself

Can you name the three ordinary reasons lineage documentation decays, even when it started out accurate? Can you explain why automated lineage reduces the maintenance burden without eliminating it entirely?
