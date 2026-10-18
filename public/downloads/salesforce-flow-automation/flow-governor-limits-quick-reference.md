# Flow Governor Limits Quick Reference

> Flow does not get its own limits — it shares the same per-transaction governor limits as Apex,
> because a flow interview runs inside the same transaction as any other automation firing on the
> same record (Lesson 23). Keep this card next to Flow Builder whenever you're building anything
> with a loop.

## The limits most likely to catch an unbulkified flow

| Limit | Ceiling per transaction | What trips it in Flow |
|---|---|---|
| Total SOQL queries | 100 | A Get Records element placed INSIDE a loop, firing once per record |
| Total DML statements | 150 | A Create/Update/Delete Records element placed INSIDE a loop |
| Total DML rows | 10,000 | Looping DML against a very large collection without checking its size first |
| Apex CPU time (synchronous) | 10 seconds | Heavy formula evaluation or long element chains run per record, inside a loop |
| Callouts | 100 per transaction | An Action element calling an external system inside a tight loop |

## The fix is almost always the same shape

```
WRONG (unbulkified):
  Loop over Collection
    -> Get Records  (1 query PER record in the collection)
    -> Update Records (1 DML statement PER record)

RIGHT (bulkified):
  Get Records ONCE, before the loop, for the whole collection
  Loop over Collection
    -> Assignment only (build up an in-memory collection)
  Update Records ONCE, after the loop, on the whole collection
```

A flow issuing exactly 1 query and 1 DML statement per transaction, regardless of how many
records are in the batch, never gets anywhere near 100 or 150 — that's the entire point of moving
Get/Create/Update/Delete Records elements OUTSIDE the loop.

## Reading a governor-limit error honestly

An error like *"Too many SOQL queries: 101"* or *"Apex CPU time limit exceeded"* is reporting on
the WHOLE transaction — every trigger, flow, and validation rule that ran on that record in that
one save. It isn't necessarily blaming your flow specifically, but if your flow has a query or DML
element sitting inside a loop, that's the first place to check.

## What bulkification can't fix

Callout limits (100 per transaction) aren't a loop-placement problem the same way SOQL/DML are --
an Action element calling an external system still costs one callout per call, no matter how the
rest of the flow is structured. The only fix is minimizing how many times the flow reaches outside
itself (database or external system) per transaction, however that's achieved.

## Quick self-check before activating any flow with a loop

```
[ ] Does any Get Records element sit INSIDE a loop?          -> move it out
[ ] Does any Create/Update/Delete Records element sit
    INSIDE a loop?                                             -> move it out
[ ] Does any Action element (callout) sit inside a tight loop? -> minimize call count
[ ] Have you tested against a REALISTIC batch size, not just
    a 5-record sample? (Lesson 23's own example: fine at 5
    records, fails at 200)
```
