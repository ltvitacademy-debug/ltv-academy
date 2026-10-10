# Lesson 2 — Case Study: CRM + Data Warehouse

**Chapter 1 · Enterprise Integration Case Studies · Lesson 2 of 20**

## What you'll learn

- Why reporting and analytics needs usually argue for replicating Salesforce data into a warehouse, rather than reporting directly off the org
- The difference between a full extract, an incremental extract, and change-event capture, and when each is the right tool
- Why deletes are the detail that breaks naive incremental-sync designs
- How to avoid letting a reporting workload consume API capacity the business actually needs for day-to-day transactions

## The scenario: Doverfield wants a single view of revenue

Doverfield's finance team wants a combined view of Salesforce pipeline data alongside ERP shipment and invoice data, refreshed daily, feeding a BI tool. Native Salesforce reports can't join across both systems, and finance doesn't want its dashboards' query load competing with the live org that sales reps use all day. The answer is to replicate Salesforce data into a central data warehouse where it can be joined with ERP data already landing there.

## Full extract vs. incremental extract vs. change capture

Three distinct mechanisms solve "get Salesforce data into the warehouse," and they trade off freshness against cost differently:

- **Full extract.** Pull every row of every relevant object every time. Simple, and self-healing (there's nothing to get out of sync), but it doesn't scale — re-pulling millions of unchanged rows nightly wastes API capacity and warehouse load time for no benefit once the object is large.
- **Incremental extract by timestamp.** Query only rows where `SystemModstamp` is newer than the last successful run, typically via the **Bulk API** for volume. This scales far better, but it depends on a watermark being tracked correctly and recovered correctly after any failed run.
- **Change Data Capture (CDC).** Salesforce publishes a real-time event stream of create, update, delete, and undelete operations on enabled objects. A subscriber consumes that stream continuously rather than polling on a schedule.

## Why deletes are the trap

An incremental extract filtered on `SystemModstamp` finds every row that changed — but a deleted row doesn't show up in that query at all, because it's gone. A warehouse fed only by incremental `SystemModstamp` pulls will accumulate stale rows for every record a user ever deleted in Salesforce, silently drifting from the truth over time. This is exactly the gap Change Data Capture is built to close: CDC explicitly publishes delete (and undelete) events as part of its event stream, so a subscriber that handles all four operation types keeps the warehouse honest about what no longer exists, not just what changed.

Doverfield's design uses CDC for the handful of objects where deletes matter and real-time freshness is worth the added complexity (Opportunity, Account), and a scheduled incremental Bulk API pull for everything else, accepting that those objects' deletes get caught by a periodic full reconciliation pass instead of in real time.

## Protecting the org's API capacity

A data warehouse sync is, from Salesforce's perspective, just another API consumer — and a naive design that queries with the standard REST API in a tight loop competes for the same request capacity that the sales team's day-to-day usage, other integrations, and Lightning page loads all draw from. The Bulk API exists specifically for large-volume operations: it's built to move large data sets asynchronously and efficiently, rather than treating a million-row extract as a million small synchronous requests. Routing high-volume extraction work to the Bulk API, and reserving synchronous REST calls for genuinely small, latency-sensitive requests, is a deliberate capacity-isolation decision, not an incidental implementation detail.

## Key terms

| Term | Meaning |
|---|---|
| Full extract | Re-pulling every row of a dataset on each run; simple but doesn't scale |
| Incremental extract | Pulling only rows changed since the last run, typically filtered on SystemModstamp |
| Change Data Capture (CDC) | A real-time Salesforce event stream of create/update/delete/undelete operations on enabled objects |
| Watermark | The timestamp or marker an incremental job uses to know where the last successful run left off |
| Bulk API | Salesforce's API designed for large-volume asynchronous data operations, isolating heavy extraction load from standard API traffic |

## Lab

Doverfield's finance team reports that the warehouse's Opportunity count is slowly climbing above what Salesforce itself shows, and a sample check finds warehouse rows for Opportunities that were deleted in Salesforce weeks ago. Diagnose: (1) which sync mechanism was almost certainly used for this object, (2) why that mechanism produced exactly this symptom, and (3) what change to the design — without abandoning incremental sync entirely — would fix it going forward.

## Check yourself

Can you explain why an incremental extract filtered on SystemModstamp alone will never surface a deleted record? Can you state the specific reason Doverfield routes high-volume extraction through the Bulk API rather than the standard REST API?
