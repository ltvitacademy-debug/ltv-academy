# Lesson 5 — Update Set Batching Strategies

**Chapter 2 · Update Sets at Scale · Lesson 5 of 26**

## What you'll learn

- A one-line recap of the Update Set create/complete workflow from course 3
- Why real teams batch Update Sets by feature or user story, not by day or by developer
- The real cost of Update Sets that are too granular
- The real cost of Update Sets that are too broad
- How to judge whether a given Update Set is sized correctly before you complete it

## A quick recap, then deeper

Course 3, Chapter 7 covered the mechanics: an Update Set captures configuration changes made on an instance, you create one, make your changes, mark it complete, and move it to the next instance in the pipeline. That part doesn't change here. What this lesson covers is the part course 3 didn't: how experienced teams decide what goes *in* an Update Set in the first place, and why that decision matters far more once you're running six, ten, or twenty Update Sets through a release instead of one.

## Batch by feature, not by calendar or by person

The instinct many new admins have is to batch Update Sets by day ("Tuesday's changes") or by developer ("Maria's Update Set"). Both feel organized, but neither survives contact with a real release. A day-based Update Set might contain three unrelated fixes that have nothing to do with each other and no reason to be promoted together. A developer-based Update Set mixes whatever that person happened to touch that sprint, regardless of whether those changes belong to the same feature.

The real convention is to batch by **feature or user story**: everything needed to deliver one coherent piece of functionality — a new approval workflow, a redesigned incident form, a new integration — goes in one Update Set, and nothing else does. This means a single developer might work across several open Update Sets in a day, switching the "current" Update Set as they move between stories. That's expected and correct; it's a small amount of friction in exchange for Update Sets that actually map to units of business value.

## The cost of going too granular

Splitting every small change into its own tiny Update Set sounds safe — smaller blast radius, right? In practice it backfires. If a single login-page tweak is one Update Set, a related ACL fix is another, and a dependent business rule is a third, you now have three Update Sets with implicit dependencies between them that ServiceNow does not track or enforce automatically. Promote them in the wrong order and you get preview errors or silently broken functionality. Multiply that across a release with forty tiny Update Sets, and the promotion process becomes a manual dependency-ordering puzzle that someone has to solve correctly every single time, with no safety net if they get it wrong.

## The cost of going too broad

The opposite failure is just as common: one Update Set covering several unrelated features because it was convenient to keep everything open at once. The problem shows up later, during testing or right after a production promotion, when ONE of those features turns out to have a bug. Because the fix and the three other unrelated features are welded together in a single Update Set, you cannot back out just the broken piece. Rolling back means rolling back everything in that set — including features that worked fine — or leaving the bug in production while someone tries to hot-fix it under pressure. A properly scoped, feature-sized Update Set would have let you back out exactly the one thing that broke.

## Sizing the batch correctly

Before marking an Update Set complete, ask: does everything in here serve one coherent piece of functionality, and could I safely promote this set alone without needing anything from another open Update Set? If the answer to either question is no, the batching is wrong — either split out the unrelated pieces, or finish the missing dependency in the same set before closing it.

## Key terms

| Term | Meaning |
|---|---|
| Batching | Deciding what set of changes belongs together in a single Update Set |
| Feature-sized Update Set | An Update Set scoped to one coherent piece of functionality, not a time period or a person |
| Blast radius | How much of the system is affected if a given Update Set has to be rolled back |
| Dependency ordering | The requirement that Update Sets referencing each other's changes be promoted in the correct sequence |

## Check yourself

A teammate wants to create one Update Set per day to "keep things simple." Explain, in your own words, why that convention creates more risk during promotion than batching by feature — even though it feels more organized on paper.
