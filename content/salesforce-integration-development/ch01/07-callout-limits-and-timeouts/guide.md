# Lesson 7 — Callout Limits and Timeouts

**Chapter 1 · Outbound Integration · Lesson 7 of 23**

## What you'll learn

- The exact per-transaction callout count and cumulative timeout limits
- How per-callout timeout is configured, and its minimum and maximum
- The long-running request limit, and why callout time isn't counted against it
- The full transaction-ordering rule about callouts and pending operations, precisely
- How to check your own limit usage from Apex before you hit a wall in production

## The core governor limits for callouts

Per the Apex Developer Guide's execution governors and limits reference, a single Apex transaction is bound by:

- **Maximum of 100 callouts** to an HTTP request or API call, per transaction.
- **120 seconds maximum cumulative timeout** for callouts in a single transaction — this time is additive across every callout made in that transaction, not a per-callout figure.
- **Per-callout timeout**: configurable with `request.setTimeout(milliseconds)`. The default is 10 seconds. The minimum is 1 millisecond and the maximum is 120,000 milliseconds (120 seconds).

A transaction making ten callouts that each take 15 seconds would already exceed the 120-second cumulative cap even though each individual callout is well under its own 120-second maximum — the cumulative limit applies across the whole transaction, independent of any single callout's own timeout setting.

## The long-running request limit, and why it doesn't double-count callouts

Separately, every org enforces a limit on "long-running requests" — synchronous requests that run for more than 5 seconds of total execution time. This exists to stop a single slow transaction from monopolizing server resources. Specifically relevant to this course: HTTP callout processing time is *not* included when calculating this long-running-request limit, since a callout spends most of that time waiting on a remote system rather than consuming Salesforce's own compute.

## The transaction-ordering rule, stated precisely

This is the rule introduced informally in Lesson 2, stated exactly as the documentation describes it: **you can't make a callout when there are pending uncommitted operations in the same transaction.** The documented examples of "pending operations" are DML, asynchronous Apex, scheduled Apex, or sending email. The required ordering is: callouts must happen *before* any of those operations in the transaction, not after. This is why integration code so often looks like "callout first, then DML" within one transaction, or splits into two transactions via `@future(callout=true)` or Queueable Apex when the DML genuinely has to happen first (as in Lesson 21's Order Sync project).

## Checking your own limit usage

Apex exposes the `Limits` class so code can check how close it is to a limit before hitting it — useful in a loop that might make many callouts, or in code shared across multiple callers where you can't be sure how many callouts already happened earlier in the transaction:

```apex
Integer calloutsUsed = Limits.getCallouts();
Integer calloutsMax = Limits.getLimitCallouts();
if (calloutsUsed >= calloutsMax - 1) {
    // leave room for at least one more callout, or branch to async work instead
}
```

Checking limits proactively like this, rather than only reacting to a `LimitException` after the fact, is a hallmark of production-grade integration code — especially in bulk contexts like a trigger processing 200 records at once, where it's easy to accidentally multiply one callout per record into far more callouts than the transaction allows.

## Key terms

| Term | Meaning |
|---|---|
| 100 callouts per transaction | The maximum number of HTTP/API callouts a single Apex transaction may make |
| 120-second cumulative timeout | The maximum total time, additive across all callouts, a transaction may spend on callouts |
| Default/min/max per-callout timeout | 10 seconds default; 1 millisecond minimum; 120,000 milliseconds (120 seconds) maximum |
| Long-running request limit | A 5-second execution-time limit on synchronous requests, which does not count callout wait time |
| Limits class | Apex class for checking current usage against governor limits at runtime |

## Lab

Write an anonymous Apex script that calls `Limits.getLimitCallouts()` and `Limits.getLimitDMLStatements()` and debugs both values, so you've seen the actual numbers for yourself in a real org rather than just read them. Then, as a scenario-analysis exercise: a trigger fires on an update to 150 Account records in one batch, and the original design calls out to validate each Account's address one record at a time inside the trigger. Explain, in writing, exactly which governor limit this design would violate, and redesign it — in words, not code — so it doesn't.

## Check yourself

State the exact per-transaction callout count limit and the cumulative timeout limit from memory. Then explain, precisely, what kinds of pending operations block a callout from being made in the same transaction, and in which order they must be sequenced.
