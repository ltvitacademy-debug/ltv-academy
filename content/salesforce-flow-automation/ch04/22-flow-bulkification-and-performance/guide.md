# Lesson 22 — Flow Bulkification and Performance

**Chapter 4 · Reliable and Scalable Flows · Lesson 22 of 31**

## What you'll learn

- Why a flow that works perfectly on one record can fail on two hundred
- What "bulkification" means for Flow, specifically
- The single most common performance mistake: a DML or query element inside a loop
- How to restructure a loop-heavy flow to run once per batch instead of once per record

## One record is not the test that matters

It's easy to build a flow, test it by editing one record by hand, watch it work, and ship it. The problem: Salesforce almost never triggers a flow on exactly one record. A data import, a mass update tool, an API batch job, or even a report-driven mass action can all send a **record-triggered flow** 200 records at once — Salesforce's standard batch size for triggered automation. A flow that works great on one record can hit governor limits, slow down dramatically, or fail outright on the 200th.

## Bulkification means: don't put work-per-record inside a loop that touches the database

The core idea isn't complicated: **Get Records**, **Create Records**, **Update Records**, and **Delete Records** elements are each one database operation — but that operation can act on an entire *collection* of records at once. The mistake is putting one of those elements *inside* a Loop, so it re-runs once per item instead of once per batch.

## The pattern that gets flows into trouble

```
Loop over Opportunities in collection
  Get Records: find the related Account
  Update Records: update that one Account
End Loop
```

With 200 opportunities touching 200 different accounts, this pattern issues 200 separate Get Records calls and 200 separate Update Records calls — each one a real SOQL query or DML statement. That's not just slow; it's exactly the shape of flow that runs face-first into Apex governor limits inherited by Flow, like the 100-SOQL-queries-per-transaction ceiling.

## The bulkified version — move DML outside the loop

```
Loop over Opportunities in collection
  Add related Account Id to a collection variable
End Loop

Get Records: all Accounts where Id is in that collection  (1 query)
Loop over Opportunities again
  Update fields on the matching Account in a collection variable
End Loop
Update Records: the whole Account collection at once  (1 DML)
```

Same outcome, same 200 records — but now it's one query and one update, no matter whether the batch is 2 records or 200. The loop still runs per record, but only to do in-memory work (reading values, building a collection); the actual database calls happen exactly once, outside the loop, against the whole collection.

## Why this matters more as orgs grow

A flow built and tested against five records in a sandbox can look completely fine and still be a bulkification problem waiting to surface the first time it runs against a real data load, an integration, or a mass transfer. The fix isn't about making individual elements faster — it's about restructuring *when* the database gets touched: once per transaction, not once per record.

## Key terms

| Term | Meaning |
|---|---|
| Bulkification | Structuring a flow so DML/query elements run once per batch, not once per record |
| Batch size | The number of records a record-triggered flow can process together — up to 200 |
| DML element | Create Records, Update Records, or Delete Records — each one a database write operation |
| Governor limit | Platform-enforced ceiling (e.g., SOQL queries per transaction) that unbulkified flows hit first |

## Check yourself

A flow has a Get Records element inside a Loop, run once per record in a 200-record batch. What specific problem does this cause, and how would you restructure the flow to fix it?
