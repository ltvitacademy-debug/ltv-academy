# Lesson 1 — Asynchronous Processing Overview

**Chapter 1 · Asynchronous Processing · Lesson 1 of 16**

## What you'll learn

- The difference between synchronous and asynchronous execution in Apex
- The four asynchronous Apex tools this course covers, and the one-sentence job of each
- What `AsyncApexJob` is and why every async job becomes a trackable record
- Why "asynchronous" doesn't mean "immediate" or "guaranteed to run right now"

## Synchronous vs. asynchronous

Every Apex transaction you've likely written so far runs **synchronously**: the trigger fires, the controller method executes, the Lightning Web Component calls an Apex method — and whoever started that transaction waits for it to finish before getting control back. The code runs on the spot, in the same transaction, against the same governor limits, right now.

**Asynchronous** Apex is different. Instead of running immediately in the calling transaction, the work is handed off to the Salesforce platform, which queues it and runs it later — sometimes a few seconds later, sometimes longer if the org is busy — in its own separate transaction with its own fresh set of governor limits. The code that queued the work doesn't wait for it; it finishes its own transaction and moves on. Nobody is staring at a spinner while an asynchronous job runs.

This handoff is the whole point. It lets Apex do things a synchronous transaction either can't do at all (like a callout from a trigger) or shouldn't do (like processing a million records while a user waits for a page to load).

## The four tools, one sentence each

This course covers four ways to run Apex asynchronously, each suited to a different shape of problem:

- **Future methods** (`@future`) — fire-and-forget a simple, one-off piece of work, most often a callout, off of the main transaction.
- **Queueable Apex** (`implements Queueable`) — like a future method, but with job tracking, support for complex parameter types, and the ability to chain one job into the next.
- **Batch Apex** (`implements Database.Batchable`) — process a large number of records (thousands to millions) in manageable chunks, each chunk its own transaction.
- **Scheduled Apex** (`implements Schedulable`) — run a job on a recurring schedule you define with a CRON expression, like "every night at 2 AM."

Lessons 3 through 6 cover each of these in depth. For now, just notice the pattern: every one of them hands work off to the platform instead of running it in the current transaction.

## AsyncApexJob: every async job is a record

Whenever you queue a future method call, a Queueable job, a Batch Apex job, or a Scheduled Apex execution, Salesforce creates a row in a system object called `AsyncApexJob`. That row tracks things like the job's status (`Queued`, `Processing`, `Completed`, `Failed`, `Aborted`), the job type, how many records it has processed, and how many errors it hit. You can query it with SOQL:

```apex
SELECT Id, Status, JobType, NumberOfErrors, TotalJobItems, JobItemsProcessed
FROM AsyncApexJob
WHERE Id = :jobId;
```

This is the mechanism behind the Apex Jobs page in Setup, which Lesson 9 covers in detail. The important thing to internalize now is that asynchronous work isn't invisible — it's always a trackable, queryable job.

## "Asynchronous" is not "instant" or "guaranteed now"

A common misconception: calling an asynchronous method doesn't mean "run this immediately in the background." It means "put this work in a queue, and the platform will run it when it gets a chance, honoring org-wide capacity and the shared daily limits covered in Lesson 11." Most of the time that's within seconds. But nothing about asynchronous Apex promises it runs the instant you queue it, and if the org's async job queue is heavily loaded, your job can wait. Designs that depend on an asynchronous job finishing by a precise moment are built on a false assumption.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous execution | Code that runs immediately, in the calling transaction, with the caller waiting for it to finish |
| Asynchronous execution | Code handed off to the platform to run later, in its own transaction, without the caller waiting |
| `AsyncApexJob` | The system object that tracks the status of every future, Queueable, Batch, and Scheduled Apex job |
| Execution context | The transaction boundary a piece of code runs in, with its own fresh set of governor limits |

## Lab

Without writing any code yet, list four features or processes you might build in a Salesforce org, and for each one decide: should it run synchronously or asynchronously, and why? Use at least one example involving an external system callout and one example involving a very large number of records. Write one sentence per example justifying the choice — you'll use this same reasoning, with real syntax, by the end of Chapter 1.

## Check yourself

Can you explain, in your own words, the difference between a transaction waiting for code to finish versus handing that code off to run later? Can you name the four asynchronous Apex tools this course covers and what `AsyncApexJob` is used for?
