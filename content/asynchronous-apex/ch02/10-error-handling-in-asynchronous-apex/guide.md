# Lesson 10 — Error Handling in Asynchronous Apex

**Chapter 2 · Working With Async Jobs · Lesson 10 of 16**

## What you'll learn

- Why there's no user sitting at a screen to show an error message to in an asynchronous job
- The try/catch pattern for catching errors inside `execute`, instead of letting them propagate
- Logging failures to a custom object so they're queryable after the fact
- Using `finish` to send a summary notification, including with `Messaging.SingleEmailMessage`

## Nobody is watching when an async job fails

In a synchronous transaction, an unhandled exception has somewhere to go — it surfaces as a page error, a toast message, or a failed save the user sees immediately. An asynchronous job has no such audience. By the time a future method, Queueable job, or batch chunk runs, the user who originally triggered it may be long gone, looking at an entirely different page, or not even logged in anymore. An unhandled exception in asynchronous Apex doesn't vanish — it's recorded in `AsyncApexJob` (as covered in Lesson 9) — but nobody is watching that record in real time. If error handling isn't built deliberately into the job itself, failures can go unnoticed for a long time.

## Catching errors inside `execute`

The first line of defense is an explicit try/catch inside the method doing the work, rather than letting an exception propagate and simply hoping someone checks `AsyncApexJob.NumberOfErrors` later:

```apex
public void execute(Database.BatchableContext bc, List<Account> scope) {
    List<Account> succeeded = new List<Account>();

    for (Account acc : scope) {
        try {
            acc.Last_Synced_At__c = System.now();
            succeeded.add(acc);
        } catch (Exception e) {
            logError(acc.Id, e.getMessage());
        }
    }

    update succeeded;
}
```

Catching the exception per-record (rather than wrapping the whole chunk in one try/catch) means one bad record doesn't block the rest of the chunk from being processed — the loop keeps going, and only the record that actually failed gets logged and skipped.

## Logging failures to a custom object

A debug log line disappears the moment nobody's looking at logs. A more durable pattern is writing failures to a custom object, so they're queryable after the fact, filterable, and can even drive their own follow-up automation:

```apex
private void logError(Id recordId, String message) {
    Async_Job_Error__c err = new Async_Job_Error__c(
        Record_Id__c = recordId,
        Error_Message__c = message,
        Occurred_At__c = System.now()
    );
    insert err;
}
```

This turns "something failed somewhere in that batch job last night" into "here are the 12 specific records that failed, and why," queryable with ordinary SOQL whenever someone needs to investigate.

## Summarizing in `finish`

For Batch Apex specifically, `finish` is the natural place to report on the whole job after every chunk has completed — including sending an email if there's a human who needs to know:

```apex
public void finish(Database.BatchableContext bc) {
    AsyncApexJob job = [
        SELECT Id, Status, NumberOfErrors, TotalJobItems
        FROM AsyncApexJob
        WHERE Id = :bc.getJobId()
    ];

    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    mail.setToAddresses(new String[] { 'admin@example.com' });
    mail.setSubject('Account Sync Batch Job: ' + job.Status);
    mail.setPlainTextBody(
        'Processed ' + job.TotalJobItems + ' batches with ' +
        job.NumberOfErrors + ' errors.'
    );
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
}
```

Notice `finish` queries `AsyncApexJob` using `bc.getJobId()` — the `BatchableContext` passed into every `Batchable` method exposes the current job's own ID, letting `finish` pull the authoritative error count rather than relying only on whatever a stateful counter (Lesson 8) happened to track.

## Error handling needs to be designed, not assumed

The pattern across all four asynchronous tools is the same: catch what you can inside the job itself, log failures somewhere durable and queryable, and — when there's a human who needs to know — notify them explicitly, typically from `finish` for Batch Apex or at the natural end of a Queueable chain. None of this happens automatically just because the code is wrapped in `@future`, `Queueable`, `Database.Batchable`, or `Schedulable` — it has to be written in.

## Key terms

| Term | Meaning |
|---|---|
| Per-record try/catch | Wrapping each record's processing individually so one failure doesn't block the rest of the chunk |
| Error logging object | A custom object (e.g. `Async_Job_Error__c`) that records failures durably and queryably |
| `finish` summary notification | Using `finish` to report job-wide results, often by email, once all chunks are done |
| `bc.getJobId()` | Returns the current job's `AsyncApexJob` Id from within any `Batchable` method |

## Lab

Take the `ArchiveOldCasesBatch` class from Lesson 5 and add: a per-record try/catch inside `execute` that logs any failure to an imagined `Async_Job_Error__c` object (sketch the field names you'd need), and a `finish` method that queries `AsyncApexJob` for the final error count and sends a summary email to an admin address. Write out the full class.

## Check yourself

Can you explain why per-record try/catch is usually better than one try/catch around the whole chunk? Can you explain why logging failures to a custom object is more durable than a debug log line, and how `finish` can get the authoritative error count for the whole job?
