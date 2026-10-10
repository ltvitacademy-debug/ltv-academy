# Lesson 14 — Environment Strategy Case Study: Enterprise

**Chapter 3 · Practice · Lesson 14 of 14**

## What you'll learn

- Why a large org's environment strategy needs more than one pipeline, not just more sandboxes
- How independent teams working on unrelated projects can collide even with a well-run single pipeline
- How to design a multiple-pipeline strategy, and how pipelines eventually re-merge before production
- How this course's full toolkit — sandbox types, refresh cadence, masking, access, diagrams — comes together at scale
- Why enterprise environment strategy trades simplicity for the ability to run work in parallel safely

## The scenario

Atlas Financial Group runs a single, large Salesforce org across 400 users spanning retail banking, commercial lending, and a newly formed digital-channels team. All three groups currently share one testing pipeline: one Partial Copy testing sandbox and one Full staging sandbox, following the same promotion path this course has used throughout. Lately, releases have started slipping: the digital-channels team's fast-moving, frequent changes keep landing in the same shared testing sandbox as commercial lending's slower, carefully-reviewed quarterly release, and the two are increasingly stepping on each other — a digital-channels change gets tested against data another team's in-flight work has already altered, and a release that's actually ready gets held up waiting for an unrelated team's testing to finish.

## Why "just add another sandbox" doesn't fix this

The small-team case study in Lesson 13 solved problems by right-sizing a single pipeline. Atlas's problem is different in kind, not just in degree: it's not that one pipeline is the wrong size, it's that **three teams with genuinely different release cadences and risk profiles are being forced through one shared pipeline**, which creates exactly the collision pattern Lesson 2 described for individual developers, just at the team level instead of the individual level. Adding one more sandbox to the existing single pipeline wouldn't solve this — it would just move the collision point, because the underlying problem is that unrelated streams of work are sharing a single serialized path to production.

## Designing multiple pipelines

A **multiple-pipeline strategy** gives each team (or each release cadence) its own full promotion path — its own development tier, its own testing tier, and often its own staging tier — that only comes back together at the very end, immediately before production:

```
Retail Banking pipeline:     Dev --> Testing --> Staging  --\
Commercial Lending pipeline: Dev --> Testing --> Staging  ---+--> Production
Digital Channels pipeline:   Dev --> Testing --> Staging  --/
```

Each pipeline runs on its own cadence: commercial lending's slower, quarterly releases don't block digital channels' frequent ones, and a bug in one pipeline's testing doesn't stall a different pipeline's unrelated, ready-to-ship work. This directly solves Atlas's actual problem — it doesn't eliminate collisions by adding capacity to one shared pipeline, it eliminates them by giving each team a lane that isn't shared in the first place.

## What re-merging at production actually requires

Multiple pipelines converging on one production org is where this strategy gets genuinely harder than anything in Chapters 1–2: two pipelines can each pass all their own testing independently and still conflict with each other the moment both land in production together — commercial lending's change to an Opportunity validation rule and digital channels' change to the same object's page layout might each be fine alone and still interact badly combined. This is why large orgs with multiple pipelines need an explicit **release train** or coordinated deployment calendar: a defined point where pipelines' changes are reconciled and sequenced before they all reach production together, rather than each pipeline assuming it's the only one changing anything.

## Bringing the whole course together

A real design for Atlas has to apply everything in this course, not just this lesson's new concept: each pipeline still needs its own sandbox types sized to its purpose (Lesson 3), its own refresh cadence (Lesson 8), masking applied consistently across every pipeline that touches real data (Lesson 10), access scoped per pipeline so digital channels' faster-moving contractors aren't automatically granted access to commercial lending's environments (Lesson 11), and — critically at this scale — an environment diagram (Lesson 12) that actually shows all three pipelines and where they converge, since "which pipeline does this sandbox belong to" is exactly the kind of fact that gets lost without one.

## Key terms

| Term | Meaning |
|---|---|
| Multiple-pipeline strategy | Giving independent teams or release cadences their own full promotion path, converging only near production |
| Release train | A coordinated schedule where multiple pipelines' changes are reconciled and sequenced before reaching production together |

## Lab

Atlas adopts the three-pipeline design above. Three weeks before a planned production release, commercial lending's pipeline and digital channels' pipeline have each independently passed staging — but commercial lending changed a required field on Opportunity, and digital channels built a new Flow that creates Opportunities without populating that field. Explain why each pipeline's own staging sign-off, done independently, couldn't have caught this, and describe what Atlas's release-train step needs to check for before letting both reach production in the same release.

## Check yourself

Can you explain why Atlas's problem couldn't be fixed just by adding another sandbox to its existing single pipeline? Can you describe, in your own words, what a release train is for, and why even two pipelines that each pass their own testing independently can still conflict once they reach production together?
