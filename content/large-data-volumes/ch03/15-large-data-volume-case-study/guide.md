# Lesson 15 — Large Data Volume Case Study

**Chapter 3 · Managing Volume · Lesson 15 of 16**

## What you'll learn

- How to apply this course's full toolkit to one realistic, multi-symptom scenario
- How to sequence a fix when several LDV problems are present and interacting at once
- Why fixing symptoms in the wrong order can make a later fix harder or riskier
- How to communicate a phased remediation plan to a client, not just a list of fixes

## The scenario: Meridian Logistics

Meridian Logistics has run Salesforce for seven years. Their Account object has grown to 3.2 million records; their custom Shipment__c object (a child of Account, one shipment per delivery) has grown to 22 million records. Three problems surfaced roughly at the same time:

1. A dashboard showing "shipments by status for my accounts" has gone from instant to routinely timing out over the past year.
2. A monthly billing batch job that updates Shipment__c records in bulk has started failing on 4–6% of records every run, always on the same handful of large national accounts, with lock-related errors.
3. A planned reorganization of the sales role hierarchy, meant to take an afternoon, is now estimated by the admin team to take most of a weekend because of how long sharing takes to settle after each change.

Nobody on Meridian's team has ever run an archiving or deletion process — every Shipment__c record created in seven years is still live in the org, including shipments completed and closed out years ago.

## Diagnosing each symptom

**Symptom 1 (slow dashboard)** is a read-path problem. The dashboard's underlying query filters on Status__c and AccountId. Investigation should start exactly where Lesson 4 points: is the filter actually selective given current volume, and is it running against indexed fields? AccountId is a lookup field and already indexed by default (Lesson 3); Status__c, a custom picklist, is not. If Status__c values aren't evenly distributed and the filter alone isn't selective enough, the next question (Lesson 3/5) is whether a custom index on Status__c, or a skinny table combining the frequently-used dashboard fields, is warranted — but only after confirming the selectivity math, not as a first move.

**Symptom 2 (billing batch lock failures)** is a write-path problem, and the detail that "it's always the same handful of large national accounts" is the tell. This is parent (account) skew (Lesson 7): those national accounts have accumulated a disproportionate share of Shipment__c records over seven years, and bulk updates touching many of those records concurrently are colliding on the parent Account's lock (Lesson 8). The first fix to try is reorganizing the billing job's batches to group by AccountId (Lesson 9) before considering serial mode for just those skewed accounts.

**Symptom 3 (slow role reorganization)** is also a write-path problem, but a different mechanism: every role move is triggering a full sharing recalculation (Lesson 10) against millions of Shipment__c records, one role move at a time. This is exactly the scenario deferred sharing calculation exists for — the reorganization should be re-planned as a maintenance-window operation: defer calculation, make every role change in the batch, then resume calculation once.

## Why the underlying volume-management gap makes all three worse

All three symptoms are worsened by the fact that nothing has ever been archived or deleted. Years of closed-out Shipment__c records are still part of every query's scan, still contributing to the Status__c filter's unselective distribution, and still padding the records attached to the skewed national accounts. Fixing the three immediate symptoms without addressing this is treating the fever without treating the infection — the same three problems will resurface, worse, in another two or three years of continued growth.

## A sequenced remediation plan

The right order isn't "fix whichever complaint is loudest first." A defensible sequence is: (1) establish an archiving process (Lesson 11) for closed-out Shipment__c records older than an agreed retention period, moving them to a Big Object (Lesson 12) via proper extract/backup/relationship-check/removal (Lesson 13) — this shrinks the active working set that every other fix is fighting against; (2) apply the batch-reorganization fix to the billing job and confirm it against the now-smaller active data set; (3) confirm whether Status__c still needs a custom index or skinny table once the active record count has dropped; (4) re-plan the next role reorganization using deferred sharing calculation regardless of whether archiving fully resolves the recalculation cost, since that's a structural fix independent of volume.

## Lab

Meridian's admin team asks: "Can't we just fix the billing job's lock errors first, since that's breaking a real business process every month, and deal with archiving later?" Write a two-to-three sentence response, grounded in this lesson's reasoning, explaining what's lost by sequencing it that way and what you'd recommend instead.

## Check yourself

Can you diagnose each of Meridian's three symptoms to the correct chapter and mechanism, using only the details given? Can you explain, in your own words, why addressing the volume-management gap first changes how effective the other two fixes will be?
