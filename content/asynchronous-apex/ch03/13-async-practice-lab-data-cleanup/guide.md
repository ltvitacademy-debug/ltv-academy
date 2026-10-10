# Lesson 13 — Async Practice Lab: Data Cleanup

**Chapter 3 · Choosing and Practicing · Lesson 13 of 16**

## What you'll learn

- How to build a complete, real Batch Apex class for a data-cleanup requirement end to end
- How to combine `Database.Stateful`, per-record error handling, and a `finish` summary in one class
- How to decide a sensible chunk size for a cleanup job based on the work each record requires
- How to kick the job off and verify it worked using the monitoring techniques from Lesson 9

## The requirement

A client has accumulated years of stale `Lead` records: Leads that were never converted, have no activity, and are older than 18 months. They want a one-time (and eventually recurring) job that marks these Leads with a `Status` of `"Unqualified"` and a custom checkbox `Archived__c` set to `true`, rather than deleting them outright — the sales team wants the history kept, just clearly marked as dead.

## Building the batch class

This pulls together Lesson 5 (the `Database.Batchable` structure), Lesson 8 (`Database.Stateful` for a running count), and Lesson 10 (per-record error handling and a `finish` summary) into one real class:

```apex
public class StaleLeadCleanupBatch implements Database.Batchable<sObject>, Database.Stateful {

    public Integer leadsArchived = 0;
    public Integer leadsFailed = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, Status, Archived__c ' +
            'FROM Lead ' +
            'WHERE IsConverted = false ' +
            'AND CreatedDate < :Date.today().addMonths(-18) ' +
            'AND (LastActivityDate = null OR LastActivityDate < :Date.today().addMonths(-18))'
        );
    }

    public void execute(Database.BatchableContext bc, List<Lead> scope) {
        List<Lead> toUpdate = new List<Lead>();

        for (Lead ld : scope) {
            try {
                ld.Status = 'Unqualified';
                ld.Archived__c = true;
                toUpdate.add(ld);
            } catch (Exception e) {
                leadsFailed++;
            }
        }

        Database.SaveResult[] results = Database.update(toUpdate, false);
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                leadsArchived++;
            } else {
                leadsFailed++;
            }
        }
    }

    public void finish(Database.BatchableContext bc) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { 'admin@example.com' });
        mail.setSubject('Stale Lead Cleanup Complete');
        mail.setPlainTextBody(
            'Archived ' + leadsArchived + ' Leads. ' + leadsFailed + ' failed to update.'
        );
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}
```

A few deliberate choices worth noticing:

- **`Database.Stateful`** carries `leadsArchived` and `leadsFailed` across every chunk, so `finish` can report an accurate org-wide total — not just the last chunk's numbers.
- **`Database.update(toUpdate, false)`** (the "all or nothing" argument set to `false`) lets some records in the chunk succeed even if others fail, rather than the whole chunk's DML rolling back over one bad record — the batch equivalent of the per-record try/catch pattern from Lesson 10.
- **The query filters in `start`** do the real filtering work up front, so `execute` only ever sees Leads that actually qualify — keeping the per-chunk logic simple.

## Running and verifying it

```apex
Id jobId = Database.executeBatch(new StaleLeadCleanupBatch(), 200);
```

After kicking it off, verify it using Lesson 9's monitoring approach:

```apex
SELECT Status, NumberOfErrors, TotalJobItems, JobItemsProcessed
FROM AsyncApexJob
WHERE Id = :jobId;
```

And a quick spot-check that the actual data changed as expected:

```apex
SELECT COUNT(Id) FROM Lead WHERE Archived__c = true;
```

## Why chunk size 200 is the right call here

The default chunk size of 200 is a reasonable choice for this specific job because each record's `execute` work is lightweight — setting two fields and one DML update, no callouts, no nested queries per record. A job with heavier per-record work (multiple callouts, nested SOQL per record) would be a candidate for a smaller `scope`, as covered in Lesson 5 — but there's no reason to shrink it here.

## Key terms

| Term | Meaning |
|---|---|
| `Database.update(list, false)` | Performs DML allowing partial success — some records succeed even if others in the same list fail |
| Query-driven filtering | Doing the real record-selection logic in `start`'s SOQL rather than filtering inside `execute` |

## Lab

Modify `StaleLeadCleanupBatch` above so that instead of emailing a summary, `finish` inserts a single `Async_Job_Error__c`-style summary record (sketch its fields) capturing `leadsArchived`, `leadsFailed`, and the job's `AsyncApexJob` Id (via `bc.getJobId()`). Then write the `Database.executeBatch` call you'd use to run this with a chunk size of 100 instead of 200, and justify in one sentence when you'd actually want to make that change.

## Check yourself

Can you explain why `Database.update(toUpdate, false)` is used here instead of a plain `update toUpdate;` statement? Can you explain what `Database.Stateful` is doing for this specific class, and what would break in `finish`'s email if it were removed?
