# Keeping CRM & Warehouse Data in Sync

Getting Salesforce data into a warehouse is a one-time project. Keeping it correct is a permanent job. Every copy of CRM data starts drifting the moment it's made: records change, get deleted, and get merged, and pipelines fail overnight without anyone noticing. This lesson covers the practical habits that keep a warehouse copy trustworthy.

## What you'll learn

- What freshness means and how to set expectations for it
- Full refresh versus incremental sync, and the deletion problem
- How to chain syncs, transformations, and dashboards in the right order
- How to reconcile the warehouse against Salesforce

## Decide what "fresh" means

Not every dataset needs to be current to the minute. A daily executive pipeline dashboard may be fine with a nightly refresh, while a live lead-routing view may not be. Agree a freshness target with the business for each dataset, write it down, and design the schedule around it. Tighter freshness costs more in API usage, compute, and complexity, so don't promise more than the decision needs.

## Full refresh versus incremental

A **full refresh** reloads a table completely. It's simple and self-correcting, but expensive for big objects. An **incremental sync** moves only records that changed since the last run, typically using a timestamp such as `SystemModstamp`. It's efficient, but it has a well-known weakness: **deletes**. A deleted record doesn't show up as a changed row, so a purely timestamp-based incremental pull never learns about it, and the warehouse keeps a ghost record.

Ways teams handle this include syncing the `IsDeleted` flag where the tool supports it, running a periodic full refresh to clean up, or comparing the set of Ids in the source and target. Which of these your ingestion tool supports varies, so test it: delete a test record in a sandbox and see whether it disappears downstream.

Merges deserve the same suspicion. When Salesforce merges duplicate accounts, the losing record is removed and its children are reassigned. Check that your model handles the reassigned relationships.

## Order the chain

A modern pipeline has several stages: source sync, warehouse transformation (dbt), CRM Analytics dataset sync and recipes, and finally dashboards. Each depends on the one before it. If a downstream job runs before its upstream job finishes, it processes stale data and nobody sees an error. Use an orchestrator or dependency-aware scheduling so that each stage starts when the previous one succeeds, and configure alerts for failures rather than relying on someone to notice a blank chart.

## Watch the refresh history

Most tools keep a log of each run: when it ran, how long it took, and how many records it processed. The screenshot in this lesson's video shows one from a Data 360 data stream, with refresh mode, status, and record counts for each run. That kind of log is your first stop when a number looks wrong. A run that processed zero records for several days is a warning sign even if it reports success.

## Reconcile regularly

Trust, but verify. Pick a handful of checks and run them on a schedule:

```sql
-- Warehouse side
SELECT COUNT(*), SUM(amount)
FROM mart_opportunities
WHERE stage_name = 'Closed Won';
```

Run the equivalent SOQL aggregate in Salesforce and compare. Small differences are expected right after a change, since the warehouse lags by design, but a persistent gap means something is broken. Check row counts, key sums, and the most recent `SystemModstamp` in each table.

## Recap

Define freshness per dataset, remember that incremental syncs miss deletes, order your pipeline stages with dependencies and alerts, read refresh history, and reconcile against Salesforce on a schedule.

## Check yourself

An incremental sync runs successfully every night, yet the warehouse shows opportunities that were deleted in Salesforce last week. Why, and what are two ways to fix it?
