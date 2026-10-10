# Lesson 6 — Pipeline Design Principles

**Chapter 1 · Automating Delivery · Lesson 6 of 19**

## What you'll learn

- Five design principles that separate a pipeline that holds up under real use from one that just happens to work on day one
- Why "always have a manual fallback" is a principle specifically called out for Salesforce delta deployments
- How fail-fast ordering and idempotency show up concretely in a Salesforce pipeline
- How this chapter's six lessons fit together as one coherent design

## This chapter's throughline

Lessons 1–5 covered what CI/CD means for Salesforce, how testing and validation work, how pipeline stages are ordered, and what release automation adds. This lesson closes Chapter 1 by naming the design principles that run underneath all of it — the things that separate a pipeline a team actually trusts from one that technically runs.

## Fail fast

A pipeline should surface a failure at the earliest possible stage, not the latest. This is the same "shift left" idea from Lesson 4 — static analysis before tests, tests before deploy — but as a general principle it goes further: every stage should be designed to stop the pipeline immediately and clearly on failure, rather than limping forward with a partial result. A pipeline that continues past a failed test "just to see what else happens" produces confusing, misleading output and wastes CI minutes on work nobody will use.

## Idempotency

A pipeline stage is **idempotent** if running it twice with the same input produces the same result as running it once. A deploy step that errors out differently depending on whether it's the first or second time you've run it against a given state is fragile — you can't safely retry it. Salesforce deployments are naturally close to idempotent (deploying the same metadata twice generally leaves the org in the same state both times), but *delta* deployments (Lesson 10) can break this property if the delta is computed against the wrong base commit — which is exactly why a reliable fallback matters.

## Always have a fallback

This principle gets called out specifically for delta deployments, because they're the part of a Salesforce pipeline most likely to behave unexpectedly: if a delta deployment produces an incomplete or wrong manifest, the pipeline needs a way to fall back to a full deployment rather than silently shipping a partial change. In practice this means keeping a manual (or manually-triggered) full-deploy path available even after a delta-based pipeline is working, rather than removing it the moment the delta path seems to work reliably.

## Fast feedback loops

The whole point of a pipeline running in a few minutes instead of a human doing the same checks in an afternoon is that a developer gets to know whether their change is good *while they still remember what they changed*. A pipeline that takes 40 minutes to tell a developer their pull request has a typo defeats this purpose almost as thoroughly as not running at all — which is why ordering (Lesson 4), delta deployments (Lesson 10), and selective test runs (`RunSpecifiedTests`, Lesson 2) all exist partly in service of keeping feedback fast.

## Observable and debuggable

A pipeline should make its own failures easy to diagnose. That means real logs attached to each step (not just a pass/fail badge), clear error messages surfaced where a developer will see them (a pull request comment or check, not a log file nobody opens), and a consistent place to go look when something breaks — the subject of Chapter 2's monitoring lesson.

## Key terms

| Term | Meaning |
|---|---|
| Fail fast | Stopping a pipeline immediately and clearly at the first failure, rather than limping forward |
| Idempotent | A step that produces the same result whether run once or multiple times with the same input |
| Fallback path | A manual or alternate route (e.g., full deploy) kept available when an automated shortcut misbehaves |
| Fast feedback loop | Keeping the time between a change and its pipeline result short enough to still be useful |

## Lab

Take the six-stage pipeline you sketched in Lesson 4's lab. Go through each of the five principles in this lesson and identify, for your own design, one concrete place it could violate that principle (e.g., where might it fail slowly instead of fast, where might a step not be idempotent) and one specific change you'd make to fix it.

## Check yourself

Can you explain, using the delta-deployment example, why "always have a fallback" is a different concern from "fail fast" — and why a pipeline needs both? Can you give one concrete example of a non-idempotent pipeline step and explain what would go wrong if you retried it?
