# Lesson 9 — Monitoring Jobs in Setup

**Chapter 2 · Working With Async Jobs · Lesson 9 of 16**

## What you'll learn

- What the Apex Jobs and Scheduled Jobs pages in Setup show, and how they relate to `AsyncApexJob`
- How to query `AsyncApexJob` directly with SOQL to check status, errors, and progress
- What `CronTrigger` and `CronJobDetail` represent for scheduled jobs specifically
- Why monitoring matters even for jobs that appear to be working fine

## Two Setup pages, one underlying object

Salesforce's Setup menu has two admin-facing pages relevant to everything this course covers:

- **Apex Jobs** (Setup → Apex Jobs) lists every future method invocation, Queueable job, and Batch Apex run, along with its status, submitted time, number of errors, and (for Batch Apex) how many of the total records have been processed so far.
- **Scheduled Jobs** (Setup → Scheduled Jobs) lists every CRON job registered through `System.schedule`, showing its next scheduled run time and letting an admin delete (cancel) it from the UI.

Both pages are just a user interface over the same system objects you can query directly with SOQL — `AsyncApexJob` for the Apex Jobs page, and `CronTrigger` / `CronJobDetail` for the Scheduled Jobs page. This course teaches both the Setup-page concepts and the equivalent SOQL, since a developer troubleshooting a production issue usually needs the query, not just the UI.

## Querying `AsyncApexJob`

```apex
SELECT Id, ApexClass.Name, Status, JobType, NumberOfErrors,
       TotalJobItems, JobItemsProcessed, CreatedDate, CompletedDate
FROM AsyncApexJob
WHERE JobType = 'BatchApex'
ORDER BY CreatedDate DESC
LIMIT 10;
```

Key fields worth knowing:

- **`Status`** — `Holding`, `Queued`, `Preparing`, `Processing`, `Completed`, `Failed`, or `Aborted`.
- **`JobType`** — distinguishes `Future`, `Queueable`, `BatchApex`, and `ScheduledApex` jobs.
- **`NumberOfErrors`** — how many of the job's chunks (for Batch Apex) hit an unhandled exception.
- **`TotalJobItems`** and **`JobItemsProcessed`** — for Batch Apex, the total number of chunks and how many have completed, letting you calculate rough progress.

## Querying scheduled jobs: `CronTrigger` and `CronJobDetail`

A scheduled job registered with `System.schedule` shows up as a `CronTrigger` record, which links to a `CronJobDetail` record holding the job's name and type:

```apex
SELECT Id, CronJobDetail.Name, CronExpression, NextFireTime, State
FROM CronTrigger
WHERE CronJobDetail.Name = 'Nightly Lead Cleanup';
```

`NextFireTime` tells you exactly when the job will run next, and `State` reflects whether it's active (`WAITING`, `ACQUIRED`, `EXECUTING`) or has been paused/completed. This is the query-based equivalent of looking at the Scheduled Jobs page in Setup.

## Why monitor jobs that "seem fine"

A job that hasn't thrown a visible error isn't automatically a job that's actually doing what it's supposed to. A few real failure modes that only show up through monitoring, not through the absence of an obvious error:

- A Batch Apex job where some chunks fail (`NumberOfErrors > 0`) while others succeed — the job as a whole shows `Completed`, masking that part of the data wasn't actually processed.
- A scheduled job that silently stopped firing because it was deleted or paused, and nobody noticed until a report that depends on it went stale.
- A Queueable chain (Lesson 7) that's quietly consuming a large share of the daily async execution limit, starving other jobs in the org.

Checking `AsyncApexJob.NumberOfErrors` and `CronTrigger.NextFireTime` as a regular habit — not just when something visibly breaks — is what catches these before they turn into a support ticket.

## Key terms

| Term | Meaning |
|---|---|
| Apex Jobs (Setup) | Setup page listing future, Queueable, and Batch Apex job status and progress |
| Scheduled Jobs (Setup) | Setup page listing registered CRON jobs and their next run time |
| `AsyncApexJob` | The queryable object underlying the Apex Jobs page |
| `CronTrigger` / `CronJobDetail` | The queryable objects underlying the Scheduled Jobs page |

## Lab

Write a SOQL query against `AsyncApexJob` that finds every Batch Apex job (`JobType = 'BatchApex'`) that completed with at least one error in the last 7 days, selecting `ApexClass.Name`, `NumberOfErrors`, `TotalJobItems`, and `CompletedDate`. Then write a second query against `CronTrigger` that lists every currently scheduled job's name and next fire time, ordered by `NextFireTime` ascending.

## Check yourself

Can you name the Setup page and the underlying queryable object for monitoring Batch Apex jobs, and the equivalent pair for Scheduled Apex jobs? Can you explain a concrete scenario where a job shows `Completed` in `AsyncApexJob` but still didn't fully succeed?
