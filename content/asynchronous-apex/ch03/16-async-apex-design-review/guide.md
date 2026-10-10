# Lesson 16 — Async Apex Design Review

**Chapter 3 · Choosing and Practicing · Lesson 16 of 16**

## What you'll learn

- How to run a structured design review against an asynchronous Apex design, using this course's full toolkit
- A checklist covering tool choice, limits budget, error handling, monitoring, and testing
- How to spot a design that technically works but will fail under real production load
- How this course's four tools and their rules come together as one coherent review practice, not sixteen separate facts

## Why a design review, not just "does it compile"

Every lesson in this course taught one piece — a tool's syntax, a limit, a testing pattern. A real production asynchronous Apex design needs all of those pieces to hold together at once, and "it compiles and passes a quick test" doesn't prove that. A design review is a structured walk through a design *before* it ships, checking it against the failure modes this course has covered one at a time. Architects run this kind of review constantly — not because they distrust the developer, but because asynchronous bugs tend to only show up under real production volume, months after a quick test passed.

## The review checklist

1. **Tool choice (Lesson 12).** Does the chosen tool actually match the data volume and complexity? A future method handling a growing list that could someday exceed its primitive-parameter and per-invocation limits is a design that will eventually break, not a hypothetical risk.
2. **Limits budget (Lesson 11).** Has anyone calculated the design's share of the shared daily asynchronous execution limit — especially for a recurring job, a chain, or anything triggered in bulk from a UI action? A design that works fine in a sandbox with 50 test records can still be an outage waiting to happen at full production volume.
3. **Error handling (Lesson 10).** Does the design catch and log failures somewhere durable and queryable, or does it assume everything will always succeed? Does `finish` (for Batch Apex) or the end of a chain (for Queueable) actually report results to a human who can act on them?
4. **Monitoring (Lesson 9).** Can someone verify this job worked, next week, without reading the code? Is there a query or a Setup page an admin can check routinely, not just when something's already visibly broken?
5. **State and chunking (Lessons 5, 8).** For Batch Apex: is `Database.Stateful` used where it's actually needed, and skipped where it isn't? Is the chunk size justified by the per-record workload, not just left at the default without thought?
6. **Chaining safety (Lesson 7).** For any chained Queueable design: is there an explicit stopping condition, checked before each chain call? Is `Test.isRunningTest()` guarding the chain call so the design is actually testable?
7. **Test coverage (Lesson 15).** Do the tests actually exercise the asynchronous path with `Test.startTest()`/`Test.stopTest()`, asserting on real outcomes — not just asserting that a method call didn't throw?

## A worked review

**Proposed design:** "Whenever a Contact is updated, future-method-call an external marketing platform to sync the change, passing the full `Contact` sObject as a parameter."

Running this through the checklist immediately surfaces a real problem: **future methods cannot accept an sObject parameter at all** (Lesson 3) — this design as described won't compile. The fix is either to pass the Contact's `Id` and re-query inside the future method, or — the better long-term choice per Lesson 12's framework — to switch to Queueable Apex, which can accept the sObject directly, gives a trackable job Id, and leaves room to add chaining later if the sync grows into a multi-step process. The checklist didn't just catch a bug; it pointed toward the better tool.

## This is the skill the course was building toward

Lessons 1–11 gave you the individual facts: the syntax, the limits, the error-handling and monitoring patterns. Lessons 12–15 showed those facts combined into real designs. This final lesson is the habit that makes all of it durable in practice: treating every new asynchronous Apex requirement as a design-review exercise against this checklist, before writing the implementation — catching the tool mismatch, the missing error handling, or the unbudgeted limit while it's still a cheap fix on paper.

## Key terms

| Term | Meaning |
|---|---|
| Design review | A structured, pre-implementation walkthrough of an asynchronous Apex design against known failure modes |
| Limits budget | An explicit calculation of how much of the shared daily async execution limit a design will consume |

## Lab

Run this design through the seven-point checklist above and write up your findings: "A nightly Scheduled Apex job's `execute` method directly loops over every Account in the org (assume 3 million Accounts) and updates a rollup field, with no Batch Apex involved, no try/catch, and no monitoring query written." Identify every checklist item this design fails, and rewrite the design in one paragraph so that it passes all seven.

## Check yourself

Can you walk through this lesson's seven-point checklist from memory, citing which earlier lesson each point comes from? Can you take a one-sentence asynchronous Apex requirement and immediately name at least one checklist item likely to be missed by a developer rushing to ship it?
