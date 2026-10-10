# Lesson 3 — Case Study: Salesforce and a Data Warehouse

**Chapter 1 · Integration Case Studies · Lesson 3 of 14**

## What you'll learn

- How a one-way analytics integration differs architecturally from the two-way operational integrations in Lessons 1-2
- The difference between a full extract, a scheduled delta sync, and Change Data Capture
- Why eventual consistency is an acceptable, even preferable, tradeoff for analytics workloads
- How to reason about integration design when the consumer is a BI team, not a live user screen

## The scenario: Cascade Outfitters

Cascade Outfitters is a retailer running its sales and service operations in Salesforce. The analytics team wants Salesforce opportunity, account, and case data flowing into the company's cloud data warehouse, where it gets joined with point-of-sale and web-traffic data for executive dashboards and demand forecasting. Nobody on the analytics side needs sub-second data — a dashboard refreshed a few times a day is completely fine. What they do need is a feed that's complete, doesn't silently drop records, and doesn't put meaningful load on the production Salesforce org during business hours.

This case study is a useful contrast to Lessons 1 and 2: those were both operational integrations feeding a live user screen, where staleness had a direct user-facing or compliance cost. This one is an analytical integration feeding a batch-refreshed dashboard, where the acceptable staleness window is hours, not seconds — and the design should take advantage of that instead of over-building it.

## Three ways to move the data, and why only one of them scales

**Full extract.** The simplest possible approach: on a schedule, export every row of every relevant object and reload the warehouse from scratch. This works for a small org on day one, but it doesn't scale — re-extracting millions of Account and Case records nightly, most of which didn't change, wastes API capacity and warehouse load for no benefit, and the job gets slower every month as the org grows.

**Scheduled delta sync.** An improvement: query for records where a `LastModifiedDate` field is newer than the last successful run, and move only those. This is far cheaper than a full extract, but it has a real gap: a scheduled query only catches records that are still in their changed state at query time. A record that was created, updated, and deleted again between two sync runs can be missed entirely, because by the time the query runs, there's nothing left to find.

**Change Data Capture (CDC).** The pattern that actually fits this case study: Salesforce publishes a change event every time a tracked record is created, updated, deleted, or undeleted, and a subscriber on the warehouse side consumes that stream continuously. Unlike a scheduled delta query, CDC captures the create-then-delete case because it reacts to each individual change as it happens, not to a snapshot taken later. It also spreads load evenly over time instead of concentrating it into one heavy nightly batch window.

## Why eventual consistency is the right tradeoff here, not a compromise

In Lesson 2's financial case study, data lagging behind reality by even a few minutes was a real risk. Here, the opposite is true: forcing the warehouse to be synchronously up to date with Salesforce would add real engineering cost and operational risk for a consumer that explicitly doesn't need it. **Eventual consistency** — the guarantee that the warehouse will reflect a given Salesforce change soon, without specifying exactly when — is not a weaker version of the ERP or financial-system designs. It's the correct design for this specific consumer, chosen deliberately because the cost of waiting a short, bounded amount of time is genuinely zero for a dashboard that refreshes a few times a day.

## What still has to be designed, even for a "just analytics" feed

A CDC-based feed into a warehouse is not fire-and-forget. The design still needs: a way to detect that the subscriber has fallen behind or stopped consuming (a growing backlog is invisible to end users but very visible to a reviewer asking the right question); a periodic reconciliation count comparing warehouse row counts against Salesforce to catch silent drift; and an explicit answer for what happens to historical change events once Salesforce's retention window for them expires, so a long subscriber outage doesn't become permanent data loss.

## Key terms

| Term | Meaning |
|---|---|
| Full extract | Re-exporting an entire dataset on each run, regardless of what changed |
| Delta sync | Querying only for records modified since the last successful run |
| Change Data Capture (CDC) | A stream of events published for every create, update, delete, and undelete on tracked records |
| Eventual consistency | A guarantee that a dependent system will reflect a change soon, without a fixed upper bound stated per event |
| Reconciliation | A periodic check comparing two systems' data to catch drift that silent failures would otherwise hide |

## Lab

Cascade's analytics lead reports that a specific Opportunity, closed and later deleted the same afternoon, never appeared in the warehouse at all. Using what this lesson covers: (1) explain specifically why a scheduled delta-sync design (not CDC) would produce exactly this symptom, (2) explain why a CDC-based design would not have this gap, and (3) propose one reconciliation check that would have caught the missing record even without anyone reporting it.

## Check yourself

Can you explain why eventual consistency is the right choice for this case study rather than a limitation the team is settling for? Can you describe, specifically, the gap in a scheduled delta sync that Change Data Capture closes?
