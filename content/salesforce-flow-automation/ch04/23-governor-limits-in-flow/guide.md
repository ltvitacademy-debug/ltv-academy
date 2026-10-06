# Lesson 23 — Governor Limits in Flow

**Chapter 4 · Reliable and Scalable Flows · Lesson 23 of 31**

## What you'll learn

- Why Flow runs inside the same shared governor limits as Apex, not a separate set
- The specific limits most likely to catch an unbulkified flow: SOQL queries, DML statements, and DML rows
- What "all automation in the same transaction shares one limit pool" actually means in practice
- Why a Flow error referencing "Apex CPU time" or "SOQL queries" isn't a bug in Flow itself

## Flow doesn't get its own limits — it shares Apex's

Salesforce's multi-tenant platform enforces **governor limits**: hard ceilings on resource use per transaction, so no single org's automation can degrade performance for every other org sharing the same infrastructure. Flow isn't exempt from this — a flow interview runs inside the same transaction as any Apex trigger, validation rule, or other automation firing on the same record, and all of it draws from **one shared pool of limits** for that transaction. A flow that behaves perfectly in isolation can still fail if it runs in the same transaction as an Apex trigger that's already used most of the available SOQL queries.

## The limits that unbulkified flows hit first

| Limit | Ceiling per transaction | What trips it in Flow |
|---|---|---|
| Total SOQL queries | 100 | A Get Records element inside a loop, firing once per record |
| Total DML statements | 150 | A Create/Update/Delete Records element inside a loop |
| Total DML rows | 10,000 | Looping DML on a very large collection without checking size first |
| Apex CPU time | 10 seconds (synchronous) | Heavy formula evaluation or complex element chains run per record, in a loop |

These aren't Flow-specific numbers invented for this lesson — they're the same limits documented for Apex, because Flow executes through the same underlying transaction. That's exactly why the fix from the previous lesson — bulkification — is the fix here too: a flow issuing 1 query and 1 DML statement per transaction, regardless of batch size, simply never gets close to 100 or 150.

## Reading a governor-limit error honestly

When a flow fails with something like *"Too many SOQL queries: 101"* or *"Apex CPU time limit exceeded"*, that message is reporting on the whole transaction, not necessarily blaming your flow outright — but if your flow has a query or DML element inside a loop, it's the most likely contributor, and the first place to check. The error is Salesforce protecting every tenant on the platform, not a quirk specific to Flow.

## Limits you can't bulkify your way out of

Not every limit is about loop placement. A flow that calls an external system via an **Action** element in a tight loop can hit **callout limits** (100 callouts per transaction) no matter how the DML is structured — callouts to external systems aren't something Get Records/Update Records patterns fix. The underlying principle stays the same regardless of which specific limit: minimize how many times the flow reaches outside itself — to the database or to an external system — per transaction.

## Key terms

| Term | Meaning |
|---|---|
| Governor limit | A hard, platform-enforced ceiling on resource use per transaction, shared across Apex and Flow |
| Transaction | Everything that runs from a single trigger event — all automation on a record shares one limit pool |
| SOQL query limit | 100 total queries per transaction (synchronous context) |
| DML statement limit | 150 total DML statements per transaction (synchronous context) |

## Check yourself

A flow runs fine on a 5-record test but throws "Too many SOQL queries: 101" against a 200-record batch. What's the most likely cause, and which earlier lesson's technique fixes it?
