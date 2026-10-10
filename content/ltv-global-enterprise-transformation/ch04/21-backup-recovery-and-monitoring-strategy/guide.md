# Lesson 21 — Backup, Recovery and Monitoring Strategy

**Chapter 4 · Delivery Strategy · Lesson 21 of 33**

## What you'll learn

- Why Salesforce's own data-protection features aren't automatically a complete backup/recovery strategy
- LTV Global's layered approach to backup and point-in-time recovery
- How monitoring is split between platform health and integration health, and why one isn't a substitute for the other
- Why the integration-health side of monitoring is the one this scenario depends on most

## Backup and recovery: more than one layer

Salesforce protects against platform-level failures as part of the service itself, but that is a different thing from protecting LTV Global against its own mistakes — an accidental mass update, a bad data-load job, or a bulk deletion run against the wrong filter criteria. LTV Global's backup and recovery strategy is built as a deliberate, layered design rather than relying on a single mechanism to cover every failure scenario: regularly scheduled exports and a dedicated backup solution providing **point-in-time recovery**, so that a bad bulk operation can be rolled back to a specific moment rather than losing everything since the last full export. This matters specifically because of the scale this capstone has established throughout: an accidental bulk operation against millions of Equipment Asset or Parts Order records is a realistic risk at LTV Global's volume, not a hypothetical one, and recovering from it needs more precision than "restore the last nightly export and hope the damage happened after it."

## Two different kinds of monitoring

LTV Global's monitoring strategy deliberately covers two different things, because platform health and integration health fail in different ways and need different visibility:

- **Platform health monitoring**, using Salesforce's own event-monitoring capabilities, tracks things like login patterns, API usage, and user activity within Salesforce itself — the kind of visibility a security or platform team needs to notice unusual behavior inside the org.
- **Integration health monitoring**, built into the integration hub from Lesson 13, tracks the health of every external connection specifically: did last night's Meridian Bulk API batch complete, did the LedgerPoint SFTP file transfer succeed and pass reconciliation (Lesson 14), is the Snowflake nightly extract current, are the external APIs (Lesson 15) responding within expected time. This is the monitoring layer LTV Global depends on most, precisely because this scenario's architecture spans so many systems whose individual failure wouldn't necessarily show up as a Salesforce platform problem at all.

## Why integration-health monitoring matters most here

A Salesforce platform-health dashboard, however good, cannot tell you that LedgerPoint's nightly batch silently failed last night, because that failure happened entirely outside Salesforce. Without dedicated integration-health monitoring, the first sign of that failure might be a finance user noticing stale AR data days later — exactly the kind of delayed discovery Lesson 14's reconciliation step and this lesson's monitoring strategy both exist to prevent, from two different angles: reconciliation catches data-level mismatches after a batch completes, and integration-health monitoring catches the batch not completing (or completing late) in the first place. Neither one substitutes for the other.

## Why this isn't a bolt-on afterthought

Backup/recovery and monitoring could be treated as operational details, decided after the "real" architecture is finished. This course treats them as part of the architecture itself, for a simple reason: a design that handles LTV Global's data architecture, security, and integration beautifully but has no plan for recovering from a mistake or detecting a silent failure isn't actually production-ready, no matter how well-reasoned its other eleven design areas are.

## Key terms

| Term | Meaning |
|---|---|
| Point-in-time recovery | The ability to restore data to a specific past moment, not just the most recent full backup |
| Platform health monitoring | Monitoring Salesforce's own internal activity (logins, API usage, user behavior) |
| Integration health monitoring | Monitoring whether external-system connections (batches, APIs) are completing successfully and on time |
| Reconciliation | Comparing two sides of a data transfer after the fact to catch mismatches (introduced in Lesson 14) |

## Lab

A stakeholder says, "we already have Salesforce's own platform monitoring, so we don't need separate integration monitoring." Using this lesson's reasoning, write three or four sentences explaining specifically what kind of failure platform monitoring would miss, using the LedgerPoint batch example, and why that gap specifically requires the separate integration-health layer.

## Check yourself

Can you explain, in your own words, why Salesforce's own data protection isn't automatically a complete backup/recovery strategy for LTV Global? Can you state the difference between platform health monitoring and integration health monitoring, and explain why neither one substitutes for Lesson 14's reconciliation step?
