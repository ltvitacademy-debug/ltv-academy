# Lesson 14 — Async Practice Lab: Nightly Sync

**Chapter 3 · Choosing and Practicing · Lesson 14 of 16**

## What you'll learn

- How to combine Scheduled Apex and Queueable Apex into a real nightly-sync design
- Why this requirement calls for Queueable Apex rather than Batch Apex, given its shape
- How to register the nightly schedule with a real CRON expression
- How to verify both the schedule and the sync's outcome using Setup-equivalent SOQL

## The requirement

A client wants every `Account` flagged `Needs_External_Sync__c = true` to be pushed, once a night, to an external partner system over HTTP. There usually aren't more than a few hundred such Accounts on any given night — nowhere near batch-scale volume — but the job does need to make callouts, needs a trackable job outcome, and needs to run unattended, every night, without anyone manually kicking it off.

## Why Queueable, not Batch Apex, for the per-night work

This is a deliberate contrast with Lesson 13's `StaleLeadCleanupBatch`. That job needed Batch Apex because it touched a large, unbounded volume of Leads. This job's nightly volume is small and bounded, but it needs an HTTP callout and benefits from job tracking — exactly the profile Lesson 12's decision framework points toward Queueable Apex for. Scheduled Apex still decides *when* it runs; Queueable Apex is *what* runs.

## The Queueable sync job

```apex
public class AccountNightlySyncJob implements Queueable, Database.AllowsCallouts {

    public void execute(QueueableContext context) {
        List<Account> toSync = [
            SELECT Id, Name, BillingState, AnnualRevenue
            FROM Account
            WHERE Needs_External_Sync__c = true
        ];

        Integer successCount = 0;
        Integer failureCount = 0;

        for (Account acc : toSync) {
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:Partner_System/accounts/' + acc.Id);
            req.setMethod('POST');
            req.setBody(JSON.serialize(acc));

            try {
                HttpResponse res = new Http().send(req);
                if (res.getStatusCode() == 200) {
                    acc.Needs_External_Sync__c = false;
                    successCount++;
                } else {
                    failureCount++;
                }
            } catch (Exception e) {
                failureCount++;
            }
        }

        update toSync;
        System.debug('Nightly sync: ' + successCount + ' succeeded, ' + failureCount + ' failed.');
    }
}
```

`Database.AllowsCallouts` is required here (Lesson 4) because `execute` makes a real HTTP callout. Clearing `Needs_External_Sync__c` only on a confirmed `200` response means a failed callout leaves the record flagged, so it's naturally picked up again on the next nightly run — a simple, built-in retry behavior.

## The Scheduled Apex wrapper

```apex
public class NightlyAccountSyncSchedule implements Schedulable {
    public void execute(SchedulableContext sc) {
        System.enqueueJob(new AccountNightlySyncJob());
    }
}
```

```apex
String cronExpression = '0 0 1 * * ?'; // every day at 1:00:00 AM
Id scheduledJobId = System.schedule(
    'Nightly Account Sync',
    cronExpression,
    new NightlyAccountSyncSchedule()
);
```

The CRON expression `'0 0 1 * * ?'` breaks down as: second 0, minute 0, hour 1, any day of month, any month, with day-of-week left as `?` since this job runs every day — the same structure Lesson 6 covered.

## Verifying it

Confirm the schedule registered correctly:

```apex
SELECT CronJobDetail.Name, CronExpression, NextFireTime, State
FROM CronTrigger
WHERE CronJobDetail.Name = 'Nightly Account Sync';
```

The morning after it runs, confirm the sync actually worked:

```apex
SELECT COUNT(Id) FROM Account WHERE Needs_External_Sync__c = true;
```

A shrinking (ideally zero) count night over night confirms Accounts are being successfully synced and cleared, rather than silently accumulating.

## Key terms

| Term | Meaning |
|---|---|
| Schedule-then-enqueue pattern | Scheduled Apex's `execute` method calling `System.enqueueJob` to hand real work to a Queueable job |
| Built-in retry via flag | Leaving a sync flag `true` on failure so the next scheduled run naturally retries it |

## Lab

Add a chaining step (Lesson 7) to `AccountNightlySyncJob`: after processing the current batch of Accounts, have `execute` check `Test.isRunningTest()` and, if `failureCount > 0` and not running in a test, enqueue a second job (`AccountSyncRetryJob`, which you can leave as a stub class signature) specifically to retry only the Accounts that failed. Write out the modified `execute` method.

## Check yourself

Can you explain why this requirement uses Queueable Apex instead of Batch Apex, referencing the decision framework from Lesson 12? Can you explain how leaving `Needs_External_Sync__c` set to `true` on a failed callout creates a simple retry mechanism without any extra code?
