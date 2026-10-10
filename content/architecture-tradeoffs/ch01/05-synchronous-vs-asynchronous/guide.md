# Lesson 5 — Synchronous vs. Asynchronous

**Chapter 1 · Architecture Tradeoffs · Lesson 5 of 20**

## What you'll learn

- The real governor-limit differences between synchronous and asynchronous Apex
- What you gain and give up by moving work off the main execution thread
- Concrete decision criteria: user-facing feedback vs. throughput vs. ordering guarantees
- Why "just make it async" is not automatically the safer choice

## Higher limits, less certainty

Synchronous Apex runs in the same transaction as whatever triggered it — a button click, a REST callout, a trigger firing on a DML statement — and the user (or calling system) waits for it to finish before getting a result. Asynchronous Apex (`@future` methods, Queueable Apex, Batch Apex, Scheduled Apex) hands the work off to run later, on Salesforce's own schedule, freeing the original transaction to finish immediately. The asynchronous side gets materially higher governor limits specifically because it isn't blocking a real-time interaction: synchronous Apex is capped at 100 SOQL queries per transaction, while asynchronous Apex gets 200; synchronous CPU time is capped at 10,000 milliseconds, while asynchronous gets 60,000. That headroom is exactly why heavy, bulk, or long-running logic — a batch job touching a million records, a complex calculation chained across multiple objects — gets pushed to async in the first place: the synchronous limits would never survive it.

What you give up for that headroom is certainty about *when* the work actually happens and what the user sees in the meantime. A synchronous operation either succeeds and the user sees the result immediately, or it fails and the user sees an error immediately — the feedback loop is tight and obvious. An asynchronous job is queued, and depending on org load, it might run in seconds or it might sit queued for longer; if it fails, nothing tells the original transaction, because that transaction already finished and returned control to the user. The user who clicked "Submit" has already moved on to the next screen by the time an async job three steps later might fail silently unless someone built explicit error-handling and notification logic to catch that case. This isn't a flaw in async Apex — it's the direct consequence of decoupling the work from the triggering transaction, and it means an architect choosing async has to deliberately design for "how will anyone find out if this failed," because the platform won't surface it the way a synchronous exception would.

## Where the decision actually gets made

- **Does the user need to see the result before moving on?** A screen that displays a calculated total, a validation that blocks a save, or any interaction where the next UI state depends on this operation's outcome needs synchronous execution — async would mean showing the user a result that isn't ready yet, or nothing at all.
- **Would this operation, run synchronously, realistically hit a governor limit?** A bulk update touching tens of thousands of records, or logic that needs many SOQL queries or a long CPU-bound calculation, is a strong candidate to move off the synchronous path regardless of user-facing concerns — it may simply not fit inside synchronous limits at all.
- **Does ordering or immediacy actually matter to the business process?** Some work genuinely doesn't need to happen "right now" — a nightly rollup, a report email, a non-urgent integration sync. Pushing that to async (or further, to Batch or Scheduled Apex) costs nothing the business actually needs, and frees up the synchronous transaction for the parts that do need to be immediate.
- **Who notices and handles an async failure?** If moving something to async, the architect has to explicitly answer this before deploying — a retry mechanism, an error log reviewed by an admin, an email alert on job failure — because the default platform behavior is that nobody automatically finds out.

A common junior mistake is treating "move it to async" as a universal fix for governor-limit pressure, without weighing the loss of the immediate feedback loop or designing the failure-notification path. The senior version of this decision asks what the user or process actually needs from the *timing* of the result, not just whether the current limits are tight.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous Apex | Code that runs in the same transaction as its trigger, with the caller waiting for the result |
| Asynchronous Apex | Code (`@future`, Queueable, Batch, Scheduled) that runs separately from the triggering transaction, on Salesforce's own scheduling |
| Governor limit | A per-transaction resource cap (SOQL queries, CPU time, heap size, and more) that differs between synchronous and asynchronous execution contexts |
| Silent async failure | An asynchronous job failing with no automatic notification back to the user or process that originally triggered it, unless explicit handling is built |

## Lab

A sales team wants a "Submit for Approval" button on Opportunity that: (1) validates the opportunity meets approval criteria and shows an immediate error if not, and (2) recalculates rollups across up to 50,000 related records touched by related accounts, which is too slow and limit-heavy to run inline. Design the split: which part runs synchronously and which runs asynchronously, and specifically how would you make sure the sales rep — and an admin — finds out if the asynchronous part fails?

## Check yourself

Can you state the real governor-limit differences between synchronous and asynchronous Apex (SOQL queries and CPU time) from this lesson? Can you explain why "just make it async" isn't a free fix, and name the specific design problem an architect has to solve whenever they move work off the synchronous path?
