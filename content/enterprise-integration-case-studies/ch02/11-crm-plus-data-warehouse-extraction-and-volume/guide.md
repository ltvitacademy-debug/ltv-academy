# Lesson 11 — CRM + Data Warehouse: Extraction and Volume

**Chapter 2 · Deep Dives · Lesson 11 of 20**

## What you'll learn

- What PK Chunking is and why it exists specifically for very large Bulk API extracts
- How CDC's event retention window creates a real recovery problem a subscriber has to plan for
- Why query selectivity matters even inside a Bulk API job, not just for synchronous SOQL
- How to design a recovery path for when a CDC subscriber falls behind or goes down

## Going deeper than Lesson 2's extract comparison

Lesson 2 established the choice between full extract, incremental extract, and CDC for getting Salesforce data into Doverfield's warehouse. This lesson assumes that choice has been made and goes into the mechanics that only show up once the data volume or the sync's uptime requirements get real — the kind of detail a review board actually probes once the headline pattern is agreed on.

## PK Chunking for very large extracts

A standard Bulk API query against a very large object can itself become slow or prone to timing out, because the underlying query still has to process the whole object even when run asynchronously. **PK Chunking** splits a large Bulk API query into multiple smaller batches automatically, each scoped to a range of the object's record IDs (its primary keys), so the extraction job processes the object in manageable pieces rather than as one enormous query. This matters for Doverfield once an object like Opportunity History grows into the millions of rows — at that scale, a single unchunked Bulk API query risks becoming the extraction job's own bottleneck, and PK Chunking is the documented mechanism for breaking it up without hand-rolling a custom batching scheme.

## Query selectivity still matters inside Bulk API

A common misconception is that the Bulk API, being designed for large volumes, is immune to the selectivity concerns that apply to ordinary SOQL. It isn't. A Bulk API job built around a non-selective filter (e.g., scanning for all records where a text field contains a substring, with no supporting index) still has to do the same expensive underlying work the database would do for a synchronous query — the Bulk API changes how the result is delivered and paginated, not how efficiently the underlying query can be evaluated. Doverfield's extraction job filters on indexed fields (`SystemModstamp`, or the External ID used for matching) specifically so the query itself stays efficient, not just because the job happens to run asynchronously.

## CDC's retention window and the recovery problem it creates

Change Data Capture doesn't retain its event stream forever — events are only available for subscribers to replay within a bounded retention window, after which an event that was never consumed is gone for good. This creates a real operational question Doverfield has to design for explicitly: what happens if the warehouse's CDC subscriber goes down for maintenance, or falls behind processing, for longer than that retention window covers? Without a plan, any changes that occurred during that gap are permanently lost to the CDC stream — not delayed, but unrecoverable through CDC alone.

Doverfield's answer is to treat the scheduled reconciliation job from Lesson 10 as CDC's own safety net too: a periodic full or incremental comparison between Salesforce and the warehouse catches exactly the gap a CDC outage leaves behind, the same way it catches ordinary sync drift. CDC is the fast path; reconciliation is the backstop for when the fast path misses something, whether that's an outage, a bug, or a subscriber falling behind the retention window.

## Key terms

| Term | Meaning |
|---|---|
| PK Chunking | Automatically splitting a large Bulk API query into smaller batches scoped by record ID ranges |
| Query selectivity | How efficiently a query's filter lets the database narrow down matching records, which still matters inside Bulk API jobs |
| CDC retention window | The bounded period during which a Change Data Capture event remains available for a subscriber to replay |
| Reconciliation as CDC backstop | Using a periodic comparison job to catch gaps left behind by a CDC outage that exceeded the retention window |

## Lab

Doverfield's warehouse CDC subscriber goes down for scheduled maintenance for a period longer than the CDC retention window. Walk through: (1) what happens to the Account and Opportunity changes that occurred during the outage once the subscriber comes back up, (2) why CDC alone cannot recover those specific changes after the retention window has passed, and (3) what mechanism from this lesson (and Lesson 10) closes that gap, and how you'd confirm it actually caught everything.

## Check yourself

Can you explain, in your own words, what PK Chunking actually does and why it becomes relevant specifically at large object volumes? Can you describe the CDC retention-window recovery problem and name the mechanism Doverfield relies on to close it?
