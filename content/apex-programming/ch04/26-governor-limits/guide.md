# Lesson 26 — Governor Limits

**Chapter 4 · Governor Limits and Design · Lesson 26 of 43**

## What you'll learn

- Why governor limits exist on a multi-tenant platform, revisited in concrete terms
- The main categories of per-transaction limits: SOQL queries, SOQL rows, DML statements, DML rows
- Why synchronous and asynchronous Apex get different limits for some of these
- How to check your current limit consumption at runtime with the `Limits` class
- Why a thrown `LimitException` cannot be caught like an ordinary exception

## Why limits exist, revisited

Lesson 1 introduced the idea that Salesforce is multi-tenant — many organizations share the same physical infrastructure — and that governor limits exist to stop one org's Apex from degrading performance for every other org on that infrastructure. Now that you've written SOQL and DML in Chapter 2 and triggers in Chapter 3, the limits that matter most are concrete: how many queries you can run, how many rows those queries can return, and how many DML statements and rows you can touch, all within a single transaction.

## The main limit categories

Per Salesforce's official Apex Developer Guide, the limits that come up constantly in real code include:

- **Total SOQL queries issued**: 100 per synchronous transaction, 200 per asynchronous transaction.
- **Total SOQL query rows retrieved**: 50,000, for both synchronous and asynchronous transactions.
- **Total DML statements issued**: 150, for both synchronous and asynchronous transactions. (This counts *statements* — one `insert accts;` on a list of 500 records is one statement, not 500.)
- **Total records processed by DML statements**: 10,000 per transaction.

A few related details worth knowing: parent-child relationship subqueries inside a single SOQL query each count as an additional query against a separate, higher sub-limit, and custom metadata type records are exempt from the SOQL query limit entirely — you can query `__mdt` records without it counting against your 100 or 200 queries.

Beyond these, Salesforce also enforces CPU time and heap size limits per transaction, with a higher ceiling for asynchronous Apex than synchronous Apex in both cases — the platform's own documentation is the authoritative, current source for those exact figures, since they can shift between releases.

## Why synchronous and asynchronous limits differ

Asynchronous Apex — `@future` methods, Queueable, Batch Apex, and Scheduled Apex — runs outside the request/response cycle a user is actively waiting on, so Salesforce can afford to grant it more headroom for some limits (like the SOQL query count, 200 vs. 100) without making a user stare at a spinner. Scheduled Apex is a partial exception: even though it runs asynchronously, Salesforce documentation notes it is still governed by the synchronous limits for some categories, since its triggering job itself behaves more like a regular transaction at execution time.

## Checking consumption with the Limits class

The built-in `Limits` class lets you check, inside your own running code, how much of a given limit you've already used and what the ceiling is:

```apex
System.debug('SOQL queries used: ' + Limits.getQueries() + ' / ' + Limits.getLimitQueries());
System.debug('DML statements used: ' + Limits.getDmlStatements() + ' / ' + Limits.getLimitDmlStatements());
System.debug('DML rows used: ' + Limits.getDmlRows() + ' / ' + Limits.getLimitDmlRows());
```

This is genuinely useful in defensive code — for example, a method that processes records in chunks might check `Limits.getDmlStatements()` against `Limits.getLimitDmlStatements()` before deciding whether it's safe to issue one more DML statement in this transaction.

## LimitException is not a normal exception

If your code actually exceeds a governor limit, Apex throws a `System.LimitException`. This is deliberately different from an ordinary exception: it typically cannot be caught by a generic `catch (Exception e)` block the way a `DmlException` or `NullPointerException` can — once a hard governor limit is breached, Salesforce ends the transaction and rolls it back, because letting code keep running past the ceiling would defeat the entire purpose of the limit. The practical lesson is that you write code to avoid hitting limits in the first place (the subject of the next several lessons), rather than planning to catch and recover from a `LimitException` after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Governor limit | A platform-enforced ceiling on a resource (queries, DML, CPU time, heap) per transaction |
| Synchronous limit | The limit that applies to Apex running in the same request/response cycle as the user action that triggered it |
| Asynchronous limit | The (often higher) limit that applies to `@future`, Queueable, Batch, and Scheduled Apex |
| `Limits` class | The built-in Apex class exposing current and maximum consumption for each limit category |
| `LimitException` | Thrown when a governor limit is actually exceeded; not reliably catchable, and ends the transaction |

## Lab

In the Developer Console's Execute Anonymous window, run a loop that issues several SOQL queries and DML statements (e.g., query Accounts five separate times in a loop, then insert five separate Contact records one at a time), printing `Limits.getQueries()` and `Limits.getDmlStatements()` after each iteration. Watch the numbers climb, and compare them against `Limits.getLimitQueries()` and `Limits.getLimitDmlStatements()` to see how much headroom was actually used.

## Check yourself

Can you name the four main per-transaction limit categories covered in this lesson? Can you explain why a `LimitException` behaves differently from a normal exception you could catch and recover from?
