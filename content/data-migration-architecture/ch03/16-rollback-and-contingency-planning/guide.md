# Lesson 16 — Rollback and Contingency Planning

**Chapter 3 · Proving and Cutting Over · Lesson 16 of 18**

## What you'll learn

- Why rollback triggers have to be decided before cutover, not improvised during it
- The two main rollback mechanics and when each one applies
- Why Hard Delete sometimes matters specifically for rollback
- What a "point of no return" is and why contingency planning has to account for it

## Decide the trigger before you need it

**Rollback** is the plan for undoing a migration if something goes badly enough wrong that proceeding isn't acceptable. The single most important design decision in this lesson isn't the rollback mechanism itself — it's deciding, in advance, exactly what condition triggers a rollback. "We'll know it if we see it" is not a rollback trigger; it's a recipe for an argument during the worst possible moment to have one. A real trigger is specific and measurable, decided calmly during planning and written into the cutover runbook from Lesson 15: for example, "if the Chapter 3 reconciliation shows more than X% of any critical object's records in an unresolved, unrecoverable failure state after the final load, that triggers rollback" — a bright line, not a judgment call made in the room on cutover day.

## Two rollback mechanics

Depending on how much has already happened since the load, a rollback uses one of two mechanics:

- **Restoring from a pre-cutover backup or export.** If the rollback decision happens quickly, before much else has changed in the target org, restoring the org (or the relevant data) back to its exact pre-migration state from a backup taken right before cutover is the cleanest option — it undoes everything in one action rather than trying to selectively undo just the migration's effects.
- **Deleting just the records loaded in this job.** If a full restore isn't practical or isn't necessary, a more surgical rollback deletes specifically the records this migration job created, using the record Ids the job itself tracked (exactly the kind of detail Bulk API 2.0's own job-level success results provide, per Lesson 13). Where a true, permanent removal is required — not just sending the records to the Recycle Bin, where they could theoretically be restored or still count toward storage — this is where **Hard Delete** matters specifically, since it requires its own "Bulk API Hard Delete" permission in addition to ordinary Delete access. That permission needs to already be granted to whoever would execute a rollback before cutover day, not requested for the first time in the middle of an emergency.

## The point of no return

Not every migration stays cleanly reversible forever. Once users have started creating genuinely new data in the target org — a new Opportunity, a new Case, anything that didn't come from the migration itself — a rollback that deletes "everything this migration loaded" risks also destroying real, new business data that has nothing to do with the migration's own correctness. This moment is the **point of no return**: the point past which a clean, complete rollback is no longer realistically possible without unacceptable collateral damage, and contingency planning has to name roughly where that point falls for a given project (often expressed as a time-boxed rollback window — "rollback is available for the first N hours after cutover, after which only forward-fixes are an option") rather than assuming rollback stays available indefinitely.

## Contingency planning is broader than rollback

Rollback is the most dramatic contingency, but it's not the only one. Contingency planning should also cover smaller, more survivable failure scenarios that don't require undoing the whole migration — a specific object's load running far longer than rehearsed, a subset of records failing validation in a way that's fixable without a full rollback, a key team member being unavailable during the cutover window. Naming these scenarios and their responses in advance, alongside the rollback trigger itself, is what turns cutover day from "hope nothing goes wrong" into "we've already decided what we do if specific things go wrong."

## Key terms

| Term | Meaning |
|---|---|
| Rollback | The plan and mechanism for undoing a migration if a predefined trigger condition is met |
| Rollback trigger | A specific, measurable, pre-agreed condition that initiates a rollback decision |
| Hard Delete | Permanently removing records, bypassing the Recycle Bin; requires the "Bulk API Hard Delete" permission, relevant when a rollback must be truly permanent |
| Point of no return | The point past which a clean, complete rollback is no longer realistically possible without destroying new, unrelated business data |

## Lab

A migration's go/no-go checklist didn't define a specific rollback trigger — the team agreed to "roll back if it looks really bad." Six hours after cutover, reconciliation shows 8% of Opportunity records in an unresolved failure state, and two different stakeholders disagree about whether that's bad enough to roll back. Meanwhile, sales reps have already logged 40 new Opportunities in the live org since cutover. Write the specific, measurable rollback trigger this project should have defined in advance, and explain how the already-created 40 new Opportunities affect which rollback mechanic is still realistically available.

## Check yourself

Can you explain why "we'll know it if we see it" fails as a rollback trigger, and what a better trigger looks like instead? Can you describe the point of no return in your own words, and explain why it means rollback can't be assumed to stay available indefinitely after cutover?
