# Lesson 5 — Batch Apex

**Chapter 1 · Asynchronous Processing · Lesson 5 of 16**

## What you'll learn

- The three methods `Database.Batchable` requires, and what each one is responsible for
- The difference between returning a `Database.QueryLocator` and an `Iterable` from `start`
- Why each chunk of a batch job is its own transaction with fresh governor limits
- How to kick off a batch job with `Database.executeBatch` and control its chunk size

## The `Database.Batchable` interface

Batch Apex exists to process large numbers of records — thousands to millions — without hitting a single transaction's governor limits. A batch class implements `Database.Batchable<sObject>` and provides three methods:

```apex
public class CloseStaleOpportunitiesBatch implements Database.Batchable<sObject> {

    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT Id, StageName, CloseDate FROM Opportunity ' +
            'WHERE StageName NOT IN (\'Closed Won\', \'Closed Lost\') ' +
            'AND CloseDate < LAST_N_DAYS:365'
        );
    }

    public void execute(Database.BatchableContext bc, List<Opportunity> scope) {
        for (Opportunity opp : scope) {
            opp.StageName = 'Closed Lost';
        }
        update scope;
    }

    public void finish(Database.BatchableContext bc) {
        // Runs once, after every chunk has been processed.
        System.debug('Stale opportunity cleanup finished.');
    }
}
```

- **`start`** runs once, at the very beginning, and collects the records to process. It returns either a `Database.QueryLocator` (built from a SOQL query, as above) or an `Iterable<sObject>`, if you need to build the record set some other way than a single query.
- **`execute`** runs once per chunk of records, doing the actual work. Salesforce calls it repeatedly, passing a different `scope` (a `List<sObject>`) each time, until every record `start` collected has been processed.
- **`finish`** runs exactly once, after every chunk has completed, typically used for cleanup, sending a summary email, or kicking off a follow-up job.

## Kicking off the job

```apex
Id batchJobId = Database.executeBatch(new CloseStaleOpportunitiesBatch());
```

`Database.executeBatch` returns the `Id` of the `AsyncApexJob` record tracking this run, just like `System.enqueueJob` does for a Queueable job.

## Chunk size: the `scope` parameter

By default, Batch Apex processes records in chunks of **200** at a time. You can override that with a second argument to `Database.executeBatch`:

```apex
Id batchJobId = Database.executeBatch(new CloseStaleOpportunitiesBatch(), 100);
```

Smaller chunks mean more, smaller transactions — useful if `execute`'s per-record work is heavy enough that 200 records would risk hitting a limit like SOQL queries or callouts inside a single chunk. When `start` returns a `Database.QueryLocator`, the chunk size can go up to a maximum of 2,000. There's no fixed upper cap documented for an `Iterable`-based start method, but pushing the chunk size very high just shifts the risk of hitting other per-transaction limits back onto `execute`.

## Each chunk is its own transaction

This is the core idea Batch Apex is built around: **every call to `execute` is a separate, discrete transaction**, with its own fresh governor limits. A batch job processing 1,000 records at the default chunk size of 200 runs as five separate transactions. If something in the third chunk's `execute` call throws an unhandled exception, that one chunk's changes roll back — but the first two chunks' changes, already committed, stay committed, and the fourth and fifth chunks still run. (Lesson 8 covers `Database.Stateful`, which lets you carry information — like an error count — across those otherwise-independent chunks, and Lesson 10 covers handling errors inside `execute` deliberately rather than letting them propagate.)

One limit that is **not** reset per chunk: if `start` returns a `Database.QueryLocator`, the total number of records that `QueryLocator` can retrieve across the whole job is capped at 10,000 — a job-wide limit, not a per-chunk one.

## When to reach for Batch Apex

Batch Apex is the right tool when the record volume is large enough that no single synchronous (or even Queueable) transaction's governor limits could realistically cover it — classic examples include a one-time data cleanup, a nightly job that re-evaluates every record of a certain type, or recalculating a rollup across an entire object.

## Key terms

| Term | Meaning |
|---|---|
| `Database.Batchable<sObject>` | The interface a batch class implements, requiring `start`, `execute`, and `finish` |
| `start` | Runs once; returns a `Database.QueryLocator` or `Iterable` of records to process |
| `execute` | Runs once per chunk (default 200 records); does the per-chunk work in its own transaction |
| `finish` | Runs once, after all chunks complete; used for cleanup or summary notification |
| `Database.executeBatch` | Kicks off a batch job, with an optional chunk-size argument |

## Lab

Write a `Database.Batchable<sObject>` class named `ArchiveOldCasesBatch` whose `start` method queries every closed Case older than two years, whose `execute` method sets a custom field `Archived__c` to `true` on each record in `scope`, and whose `finish` method logs a debug statement. Then write the line that kicks it off with a chunk size of 50 instead of the default 200, and explain in one sentence why you might choose a smaller chunk size here.

## Check yourself

Can you name the three required methods of `Database.Batchable` and what each one is responsible for, from memory? Can you explain why a batch job over 1,000 records at the default chunk size results in five separate transactions, and what that means if one chunk fails?
