# Lesson 8 — Scalability

**Chapter 2 · Quality Attributes · Lesson 8 of 25**

## What you'll learn

- Why scalability is a design property, not something fixed after the fact with performance tuning
- The difference between data-volume scalability and user/concurrency scalability
- How the multi-tenant platform's governor-limit model shapes what "scalable" means on Salesforce specifically
- Concrete design habits that keep a solution scalable as record counts and user counts grow

## Scalability is designed in, not bolted on

**Scalability** is a solution's ability to keep working correctly and acceptably fast as the volume of data and the number of concurrent users grow — not just at launch, with a few hundred test records, but years later with millions. On most platforms, scalability is primarily an infrastructure question (add servers, add database replicas). On Salesforce's multi-tenant platform, the infrastructure scaling is largely Salesforce's own problem to manage — but the *design* of a given application still has to be built to scale within the governor limits and sharing/query performance characteristics the platform actually provides. A data model, automation design, or query pattern that works fine with 5,000 records can fail outright, or silently become unacceptably slow, at 5 million.

## Two different kinds of scale

- **Data-volume scalability** is about record counts: how a data model, its relationships, and the automation that touches it behave as a custom object grows from thousands to millions of records. This is where concepts like skinny tables, selective SOQL filters using indexed fields, and avoiding non-selective queries on large objects matter — a query pattern that's "fine" on a small object can become a performance or governor-limit problem purely because of row count, with no code change at all.
- **Concurrency scalability** is about simultaneous users and transactions: how the solution behaves when 500 reps are all saving records in the same few minutes, rather than one admin testing alone. This is where record-locking behavior, avoiding unnecessary shared mutable state (like a running total field updated by every transaction touching the same parent record), and careful automation design on high-traffic objects matter.

A solution can be fine on one axis and fail on the other — a reporting dashboard might handle millions of rows well in aggregate but choke if too many users try to run it at the exact same moment; a rarely-used internal tool might have no concurrency problem at all but silently accumulate years of data until a single unselective query grinds to a halt.

## Design habits that protect scalability

- **Bulkify everything that touches more than one record.** Apex that queries or performs DML inside a loop works in a demo with five records and breaks — or burns through governor limits — the first time someone processes a real batch.
- **Design automation to behave the same at 1 record and at 1,000.** A Flow or trigger that was only ever tested with a single record saved through the UI can fail silently or hit limits the first time a data load updates thousands of records in one transaction.
- **Be deliberate about rollup patterns on high-volume parent/child relationships.** A naive "recalculate every child every time any one child changes" pattern that's invisible at low volume becomes a real performance and limits problem as the child object grows large.
- **Revisit scalability assumptions as actual usage data comes in.** A design that assumed low volume at launch should be re-examined once real adoption numbers exist, not left unexamined just because it was "fine" in testing.

## Why this belongs in requirements, not just in build

Scalability failures are rarely caused by bad code in isolation — they're usually caused by a scalability requirement that was never captured during requirements analysis (Lesson 2) in the first place. "How many records will this object realistically hold in three years, and how many of them get touched by automation in a single transaction" is exactly the kind of question that belongs in intake, because the answer directly shapes whether a design choice that's perfectly fine today will still be fine at the volume the business is actually planning to reach.

## Key terms

| Term | Meaning |
|---|---|
| Scalability | A solution's ability to keep working correctly and acceptably fast as data volume and concurrent users grow |
| Data-volume scalability | Scalability measured against record count growth over time |
| Concurrency scalability | Scalability measured against simultaneous users and transactions |
| Bulkification | Designing automation to process collections of records efficiently, rather than one at a time in a loop |
| Non-selective query | A SOQL query that can't use an index effectively, becoming slower as the underlying object's row count grows |

## Lab

A custom object called `Shipment__c` currently holds 8,000 records and has a Flow that recalculates a rollup total on its parent `Order__c` record every time a Shipment is updated, by querying and summing every sibling Shipment record. The business expects Shipment volume to reach 10 million records within two years as the company scales internationally. Explain, specifically, what will likely break or degrade as that volume grows, on both the data-volume and concurrency axes, and propose one concrete design change that would hold up better at 10 million records.

## Check yourself

Can you explain the difference between data-volume scalability and concurrency scalability, with an original example of a solution that could pass one and fail the other? Can you explain why "it performed fine in testing with 500 records" is not sufficient evidence that a design is scalable?
