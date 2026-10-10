# Lesson 2 — Governor Limits Recap

**Chapter 1 · Performance Foundations · Lesson 2 of 16**

## What you'll learn

- The exact per-transaction numbers for the governor limits that drive most real performance bugs
- The difference between synchronous and asynchronous Apex limits, and why async gets more headroom
- Why these are per-transaction limits, not per-line or per-method limits
- How to check remaining headroom at runtime instead of guessing

## The limits that matter most

Salesforce publishes a full "Execution Governors and Limits" reference, and an Architect doesn't need to memorize the entire table — but a short list comes up constantly in real performance work, and the numbers below are current, verified figures from Salesforce's own Apex Developer Guide, not estimates:

| Limit | Synchronous | Asynchronous |
|---|---|---|
| Total SOQL queries issued | 100 | 200 |
| Total DML statements issued | 150 | 150 |
| Total records processed by DML statements (combined with `Approval.process` and `Database.emptyRecycleBin`) | 10,000 | 10,000 |
| Total records retrieved by SOQL queries | 50,000 | 50,000 |
| Total records retrieved by `Database.getQueryLocator` | 10,000 | 10,000 |
| Maximum CPU time on Salesforce servers | 10,000 ms | 60,000 ms |
| Maximum heap size | 6 MB | 12 MB |
| Total callouts (HTTP requests or web service calls) | 100 | 100 |
| Maximum cumulative timeout for all callouts in a transaction | 120 seconds | 120 seconds |

A separate, much larger allowance exists for Batch Apex's `start()` method specifically: its query locator can return up to 50 million records, because batch jobs are designed from the ground up to process large data volumes in controlled chunks (a later course on asynchronous Apex covers Batch Apex's mechanics in full).

## These are per-transaction, not per-line

The single most important thing to understand about this table: every number is a **cumulative total for the entire transaction**, not a limit on any one line of code. If a trigger calls a handler class, which calls a utility method, which issues a SOQL query, that query counts against the same 100-query ceiling as every other query anywhere else in that same transaction — including queries fired by a different trigger on a different object, if a single DML operation cascades into both. This is why a method that looks perfectly efficient in isolation can still blow a limit: the problem isn't that one method, it's everything else running in the same transaction alongside it.

CPU time is a particularly good example of this cumulative nature. Time spent waiting on the database for DML, SOQL, or SOSL to execute does **not** count against the CPU time limit — only actual Apex execution time does. A transaction can run for several real-world seconds and still be well under its CPU time limit if most of that time was the database doing work, not the Apex engine.

## Checking limits at runtime instead of guessing

Hard-coding assumptions about how close you are to a limit is a losing strategy, because the same code can run in different contexts (a single record save vs. a 200-record bulk API load) that consume wildly different amounts of headroom. Apex exposes the `Limits` class specifically so code can check its own remaining headroom:

```apex
System.debug('Queries used: ' + Limits.getQueries() + ' / ' + Limits.getLimitQueries());
System.debug('DML statements used: ' + Limits.getDmlStatements() + ' / ' + Limits.getLimitDmlStatements());
System.debug('CPU time used: ' + Limits.getCpuTime() + ' / ' + Limits.getLimitCpuTime());
```

This is especially useful in code that might run in unpredictable contexts — a trigger handler that could be invoked by a single Lightning record save or by a 200-record Data Loader batch — where you want to branch behavior (for example, deferring work to a Queueable) if you're running low on a specific resource, rather than assuming a fixed number of records every time.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous Apex | Code that runs within the same transaction the user is waiting on, with tighter limits |
| Asynchronous Apex | Code deferred to run separately (Future, Queueable, Batch, Scheduled), with higher CPU time and SOQL ceilings |
| `Limits` class | The built-in Apex class that reports how much of each governor limit the current transaction has already consumed |
| Cumulative limit | A governor limit that totals usage across the entire transaction, not per method or per class |

## Lab

In a Developer Edition org's Developer Console, open Debug > Open Execute Anonymous Window and run a short script that issues three SOQL queries in a loop, then prints `Limits.getQueries()` and `Limits.getLimitQueries()` to the debug log afterward. Confirm the printed "used" number matches how many queries you actually issued, and confirm the limit number matches the synchronous figure of 100 from the table above.

## Check yourself

Can you state, from memory, the synchronous vs. asynchronous numbers for SOQL queries, DML statements, and CPU time? Can you explain why a transaction spending several real seconds in the database might still be far under its CPU time limit, and why checking `Limits.getCpuTime()` at runtime is more reliable than assuming a fixed budget?
