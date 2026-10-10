# Lesson 20 — Performance Review

**Chapter 4 · Analytics and Delivery · Lesson 20 of 25**

## What you'll learn

- How to performance-test this platform against a bulk data load, not just one record at a time
- The specific bulk-safety gaps a performance review looks for across the code built in Chapter 2
- Selective queries and indexed fields, revisited under real data volume
- Why the Case-to-Installation-Job Flow from Lesson 6 also needs a performance pass, not just the Apex

## Testing against bulk data, not the UI

Every piece of logic in this capstone was built and functionally tested against one or a handful of records at a time — that's enough to prove correctness, but not enough to prove the platform survives real usage: a data migration loading 5,000 historical Warranty Claims, or a batch import of a new product line's worth of Assets. A performance review's first step is deliberately bulk-loading realistic volume into a scratch org (Data Loader or `sf data import bulk` against a CSV of synthetic records) and watching what breaks or slows down, rather than reasoning about it in the abstract.

## Re-auditing Chapter 2 for bulk safety

Three specific things get checked against bulk load, pulling directly from earlier lessons' reasoning:

- **`WarrantyClaimTriggerHandler.beforeInsert`** (Lesson 9) calls `ServiceContractEvaluator.isClaimCovered`, which runs its own SOQL query — once per claim, inside the trigger's `for` loop. On a single record, or even Lesson 10's 50-record bulk test, that's invisible: 50 queries is still under the 100-query synchronous limit from Lesson 7. Load 200 claims in one transaction instead, and it breaks outright — 200 queries exceeds that same 100-query limit, throwing `LimitException` on a volume Lesson 10's test never exercised. The fix: refactor `isClaimCovered` to accept a `Set<Id>` and a pre-queried `Map<Id, Service_Contract__c>`, with the trigger handler running one query for the whole batch before the loop, then looking up each claim's contract from the map inside the loop instead of querying per record.
- **`StaleInstallationJobBatch`** (Lesson 11) is already structurally safe at any volume because Batch Apex's chunking exists specifically for this — but the review still checks that the `scope` size (200 by default) isn't set unnecessarily small, which would mean more chunks, more separate transactions, and a slower overall job for no benefit.
- **`TechnicianJobBoardController.getMyJobs`** (Lesson 13) filters on `Technician__c`, a lookup field and therefore indexed by default (Lesson 8) — confirmed safe, but worth stating explicitly in the review rather than assuming it.

## The Flow needs this pass too

Performance review isn't an Apex-only exercise. The Case to Installation Job Flow (Lesson 6) runs its Get Records element — the lookup against `Service_Contract__c` — once per Case that enters the Flow, which is the Flow equivalent of the same per-record query pattern just flagged in the trigger. Record-triggered Flows are bulkified by the platform across the records in one transaction, but a Get Records element still issues its query per flow interview unless it's written to batch-aware patterns, so a Flow with heavy per-record lookups deserves the same bulk-load check as a trigger, not a pass because "it's declarative."

## Why this review exists as its own lesson

Lesson 2 named performance as one of this platform's three non-functional requirements, specifically because correctness under one record and correctness under bulk load are different claims, and only one of them is usually tested by default. This lesson's finding — that the claim coverage check genuinely breaks the 100-query limit at 200 records — is the concrete proof of why that non-functional requirement was called out from the start rather than assumed.

## Key terms

| Term | Meaning |
|---|---|
| Bulk-safe | Code that behaves correctly and within governor limits regardless of how many records are processed in one transaction |
| Performance review | A deliberate test of the platform against realistic data volume, not just single-record correctness |
| Query-outside-the-loop refactor | Moving a per-record query to one batched query before a loop, using a Map for lookup inside it |
| Flow bulkification | The platform's handling of multiple records through one Flow transaction; doesn't eliminate per-interview element costs like Get Records |

## Lab

Refactor `ServiceContractEvaluator` and `WarrantyClaimTriggerHandler.beforeInsert` to query once for the whole batch (a `Set<Id>` of Asset Ids, one query, a `Map<Id, Service_Contract__c>` lookup inside the loop) instead of once per record. Re-run Lesson 10's 50-record bulk test and confirm it still passes — then write a new test inserting 200 claims in one transaction against the *unrefactored* version (keep a copy, or use source control to check out the prior commit) and confirm it throws `LimitException`. Re-run the same 200-record test against your refactored version and confirm it now passes.

## Check yourself

- Why did the 50-record bulk test in Lesson 10 pass even though the original `beforeInsert` logic wasn't actually bulk-safe at every volume?
- What's the specific refactor that makes the claim coverage check bulk-safe?
- Why does the Case to Installation Job Flow need a performance review too, not just the Apex code?
