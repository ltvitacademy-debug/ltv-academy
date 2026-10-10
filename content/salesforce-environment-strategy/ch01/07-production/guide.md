# Lesson 7 — Production

**Chapter 1 · Environments · Lesson 7 of 14**

## What you'll learn

- Why production is treated differently from every other environment in the hierarchy
- The core hygiene principle: nothing gets built directly in production
- What change control actually means in a production context
- Why production is also the master copy every other environment is refreshed from
- How a rollback plan fits into a healthy production deployment practice

## Production is not just "the last environment"

Every environment covered so far in this chapter exists to protect **production** — the org that real users, real customers, and real integrations actually depend on every day. Everything about production's role is shaped by that fact: a mistake in a Developer sandbox costs a few minutes to fix, while a mistake in production can mean broken reports a sales team relies on this afternoon, a failed integration that drops real orders, or data that's wrong in a way that takes weeks to fully untangle. Production is the only environment in the hierarchy where the cost of a mistake is measured in real business impact, not developer time.

## The core rule: nothing gets built directly in production

Every lesson in this chapter has been building toward one practical consequence: **changes are built and validated somewhere else, and only ever deployed into production — never built there directly.** This isn't a suggestion; it's the entire reason the development, testing, and staging tiers exist. An experienced admin or architect treats direct configuration changes in production (outside of narrowly scoped, genuinely low-risk exceptions, like fixing an obvious typo in a label) as a red flag, not a shortcut. The moment someone starts "just quickly" building a new Flow directly in production because a sandbox refresh would take too long, the entire promotion path's safety guarantee is gone for that change.

## Change control

**Change control** is the set of practices that keeps every production change traceable, reviewable, and reversible:

- Every deployment to production should be traceable to a specific, reviewed change — not an undocumented click someone made because it seemed fine at the time.
- Changes should go in through a deployment mechanism (change sets, a CI/CD pipeline, or packaged metadata) that leaves a record of exactly what was deployed and when — not manual, one-off clicks replicated by memory from a sandbox.
- Someone other than the person making the change should generally have reviewed and approved it before it reaches production, mirroring the independent-testing principle from Lesson 5.

Change control doesn't exist to slow teams down for its own sake — it exists so that when something does go wrong (and eventually something will), there's a clear record of what changed and when, which is often the fastest way to find the cause.

## Production as the master copy

There's a second, easily overlooked reason production discipline matters: every other environment in this chapter's hierarchy is, sooner or later, refreshed *from* production. A Full sandbox copies production's data. A Partial Copy sandbox's template samples from production. Even a scratch org's definition file is meant to reflect what's really deployed. If production accumulates undocumented, untested configuration because someone bypassed the promotion path even once, that mess propagates downstream into every sandbox refreshed from it afterward — meaning a production hygiene failure doesn't stay contained to production; it reappears in the very environments meant to protect production from exactly that kind of problem.

## Rollback: planning for when a release still goes wrong

Even a release that passed every stage in the promotion path can fail in production in ways staging didn't predict — a timing issue only visible at real production traffic, or an integration partner's system behaving differently than its test endpoint did. A mature production practice plans for this *before* deploying, not after: knowing in advance how a specific release would be rolled back (reverting a package version, disabling a Flow rather than deleting it, restoring from a backup for data-affecting changes) is part of what makes a release safe to attempt in the first place. "We'll figure out how to undo this if it breaks" is not a rollback plan.

## Key terms

| Term | Meaning |
|---|---|
| Production | The org real users, customers, and integrations depend on; the destination, never the workspace, for changes |
| Change control | Practices that make every production change traceable, reviewed, and reversible |
| Master copy (of data/metadata) | Production's role as the source every other environment is eventually refreshed from |
| Rollback plan | A pre-defined way to undo a specific release if it fails after deployment |

## Lab

An admin, under deadline pressure, builds a new validation rule directly in production instead of waiting for a sandbox refresh, reasoning "it's a small change, I'll be careful." Two weeks later, the next Partial Copy sandbox refresh pulls this undocumented rule into the testing environment, where a QA tester discovers it's silently blocking a legitimate business process no one has connected to the original change. Trace exactly how this single shortcut caused a second problem downstream, and explain which specific practice from this lesson — if it had been followed — would have prevented both.

## Check yourself

Can you state, in one sentence, the core hygiene rule this lesson teaches about where changes should be built versus where they're deployed? Can you explain why production's role as every other environment's "master copy" means a hygiene failure in production doesn't stay contained to production alone?
