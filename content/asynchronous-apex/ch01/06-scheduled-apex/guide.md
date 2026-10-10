# Lesson 6 — Scheduled Apex

**Chapter 1 · Asynchronous Processing · Lesson 6 of 16**

## What you'll learn

- How to implement `Schedulable` and schedule it with `System.schedule`
- The structure of a Salesforce CRON expression, field by field
- Why one of the day-of-month / day-of-week fields must always be `?`
- The cap on concurrently scheduled jobs, and how to cancel a scheduled job

## Implementing `Schedulable`

A scheduled Apex class implements `Schedulable`, which requires one method: `execute`, taking a `SchedulableContext` parameter.

```apex
public class NightlyLeadCleanupJob implements Schedulable {
    public void execute(SchedulableContext sc) {
        // Typically, a scheduled job's execute method kicks off a Batch
        // Apex job rather than doing heavy processing itself.
        Database.executeBatch(new StaleLeadCleanupBatch());
    }
}
```

Scheduled Apex is commonly used as the trigger for a Batch Apex job (exactly as above) — the schedule decides *when*, and the batch class decides *how* the actual record processing happens.

## Scheduling it with `System.schedule`

```apex
String cronExpression = '0 0 2 * * ?';
Id scheduledJobId = System.schedule('Nightly Lead Cleanup', cronExpression, new NightlyLeadCleanupJob());
```

`System.schedule` takes three arguments: a job name (shown in Setup), a CRON expression describing when to run, and an instance of the `Schedulable` class. It returns the `Id` of the `CronTrigger` record representing the scheduled job.

## CRON expression format

A Salesforce CRON expression has **seven fields**, separated by spaces, with the last one optional:

```
Seconds  Minutes  Hours  Day_of_month  Month  Day_of_week  Year(optional)
```

| Field | Allowed values |
|---|---|
| Seconds | 0–59 |
| Minutes | 0–59 |
| Hours | 0–23 |
| Day of month | 1–31 |
| Month | 1–12 or JAN–DEC |
| Day of week | 1–7 or SUN–SAT |
| Year | 1970–2099 (optional) |

`'0 0 2 * * ?'` reads as: second 0, minute 0, hour 2 (2 AM), any day of month, any month, with day-of-week left unspecified — i.e., every day at 2:00:00 AM.

## The `?` rule

Exactly one of the **day-of-month** and **day-of-week** fields must be `?`, because the two can conflict (e.g., "the 15th of the month" and "every Tuesday" don't necessarily agree on which days to fire). Salesforce's CRON syntax requires you to explicitly leave one of them unspecified with `?`, rather than guessing which one should win. A job that should run only on weekdays, for example, specifies `?` for day-of-month and a day-of-week range for the other field: `'0 0 2 ? * MON-FRI'`.

`System.schedule` runs the job based on the **scheduling user's time zone**, and the job itself executes in system mode — meaning it runs with full object and field access regardless of the running user's own permissions, similar to other asynchronous Apex contexts.

## Concurrency limit: 100 scheduled jobs at a time

An org can have a **maximum of 100 scheduled Apex jobs active at any one time**. This is a standing concurrency cap, not a daily execution count — it's about how many distinct scheduled jobs can be sitting on the clock simultaneously. Because Scheduled Apex is itself asynchronous, but its `execute` method runs under the same governor limits as a synchronous transaction, a scheduled job that needs to touch a large number of records should kick off Batch Apex from inside `execute`, exactly like `NightlyLeadCleanupJob` does above, rather than trying to process everything directly.

## Canceling a scheduled job

```apex
System.abortJob(scheduledJobId);
```

`System.abortJob` takes the `Id` returned by `System.schedule` (or found by querying `CronTrigger`) and cancels that scheduled job going forward.

## Key terms

| Term | Meaning |
|---|---|
| `Schedulable` | The interface a class implements to run on a schedule, requiring `execute(SchedulableContext)` |
| `System.schedule` | Schedules a `Schedulable` instance to run per a CRON expression, returning the job's `CronTrigger` Id |
| CRON expression | The seven-field (last optional) string describing when a scheduled job fires |
| `System.abortJob` | Cancels a previously scheduled job by its Id |

## Lab

Write a `Schedulable` class named `WeeklyReportJob` whose `execute` method kicks off a Batch Apex job (reuse `CloseStaleOpportunitiesBatch` from Lesson 5, or invent a new batch class name). Then write a CRON expression that runs it every Monday at 6:00:00 AM, and the `System.schedule` call that registers it under the job name `"Weekly Report"`. Finally, write the line of code you'd use to cancel that job given its returned Id.

## Check yourself

Can you write a CRON expression from memory for "every day at 2 AM," and explain which field must be `?` and why? Can you name the concurrency cap on scheduled Apex jobs, and explain why a scheduled job that touches many records should delegate to Batch Apex instead of processing records directly in `execute`?
