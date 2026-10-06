# Lesson 12 — Developer Interviews

**Chapter 3 · Interviews · Lesson 12 of 19**

## What you'll learn

- How a Developer interview differs from an Administrator interview
- The Apex fundamentals you need to explain fluently: governor limits, bulkification, recursion
- What a "find the bug in this trigger" exercise is actually testing
- How to talk about Lightning Web Components without over-claiming depth you don't have yet

## A different interview, a different skill set

Administrator interviews are mostly scenario and judgment questions. Developer interviews add a layer the Administrator track doesn't have: code. Expect some combination of a live coding exercise, a take-home assignment, or "read this code and tell me what's wrong with it" — on top of the same behavioral questions every role gets.

## Governor limits, in your own words

Salesforce is multi-tenant: one org's badly-written code can't be allowed to degrade the platform for every other org sharing the same infrastructure. That's the reason governor limits exist at all, and interviewers want to hear that reasoning, not just a memorized number. Know the shape of the limits that matter most day to day — synchronous SOQL query count, DML statement count, heap size, CPU time — well enough to explain *why* each one is capped, not just recite the ceiling.

## Bulkification and recursion — the two classic trigger bugs

- **Bulkification.** Salesforce can hand a trigger up to 200 records at once — a Data Loader batch, an API call, a mass update. A trigger that runs a SOQL query or a DML statement *per record inside a loop* works fine with one record in a sandbox test and then fails in production the first time someone updates 200 records at once. The fix is to move queries and DML outside the loop and operate on collections.
- **Recursion.** A trigger that performs a DML operation can cause that same trigger to fire again, which can spiral into repeated execution and governor-limit errors. The standard fix is a static boolean flag in a helper class, set on first entry and checked before the logic runs again in the same transaction.

## What a "find the bug" exercise is testing

It is rarely testing whether you can write perfect Apex from memory under pressure. It's testing whether you *read code carefully*, whether you reach for the two classic failure patterns above before anything exotic, and whether you can explain your reasoning as you go — because that's what debugging a real production issue looks like on the job.

## Talking about Lightning Web Components honestly

If your hands-on experience with LWC is limited to coursework, say so plainly and talk about what you *do* understand clearly: components as reusable, event-driven building blocks; wiring data in with `@wire`; the decorators that control a property's behavior (`@api`, `@track`, `@wire`). Overclaiming depth you don't have is far more damaging than a confident, accurate "here's what I've built, here's what I haven't yet."

## Async Apex, at a conceptual level

You don't need deep expertise to sound credible here — you need to know which tool fits which situation: `@future` for simple fire-and-forget callouts, Queueable for chainable jobs that need more control, Batch Apex for processing large record volumes in chunks, and Scheduled Apex for recurring jobs. Naming the right one for a scenario is usually worth more than reciting syntax.

## Key terms

| Term | Meaning |
|---|---|
| Bulkification | Writing logic that correctly handles a collection of records, not just one |
| Recursion (trigger) | A trigger re-triggering itself via its own DML, usually guarded with a static flag |
| Governor limit | A per-transaction runtime cap that protects the shared multi-tenant platform |
| `Test.startTest()` / `Test.stopTest()` | Gives the code between them a fresh governor-limit context in a test class |

## Check yourself

Why does a non-bulkified trigger often pass in a sandbox test with one record, and then fail only after it's deployed to production?
