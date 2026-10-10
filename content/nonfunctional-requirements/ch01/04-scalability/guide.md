# Lesson 4 — Scalability

**Chapter 1 · Nonfunctional Requirements · Lesson 4 of 18**

## What you'll learn

- The difference between performance and scalability as distinct NFRs
- Data-volume, user-volume, and transaction-volume scalability, and why they're separate problems
- Salesforce-specific scaling tools: Big Objects, archiving, skinny tables, and indexing strategy
- Why scalability requirements must be stated as a growth curve, not a single number

## Scalability is not the same NFR as performance

Performance asks "is it fast enough right now, under current load." **Scalability** asks "does it stay fast enough as data, users, and transaction volume grow, without needing a redesign." A system can have excellent performance today and terrible scalability — a report that runs in two seconds against 50,000 records might take two minutes against 50 million, with no change to the report itself. Performance and scalability get confused constantly in requirements documents, but they call for different design decisions: performance tuning optimizes what exists today; scalability design anticipates what will exist later and avoids architectural choices that only work at today's volume.

## Three kinds of growth, three different risks

A scalability NFR should separate three distinct dimensions of growth, because each one stresses a different part of the architecture:

- **Data-volume scalability** — can the object model, indexing, and query patterns hold up as record counts grow from thousands to tens of millions? A custom object with no selective filters on its list views works fine at 10,000 rows and becomes unusable at 10 million.
- **User-volume scalability** — can the org support growth in concurrent and total licensed users without the role hierarchy, sharing rule recalculation, or group membership maintenance becoming a bottleneck? A deeply nested role hierarchy that was fine for 200 users can make sharing recalculation jobs slow and fragile at 20,000 users.
- **Transaction-volume scalability** — can automation (Flows, triggers, integrations) and API consumption hold up as the rate of record creation, updates, and inbound integration calls grows? A trigger that makes a synchronous callout per record is fine during a pilot with ten records a day and becomes a serious bottleneck during a Black Friday spike of a hundred thousand.

These three can grow independently. A B2C org might see explosive data-volume growth with a flat number of internal users; an acquisition might double user count overnight with no change in data volume. A scalability NFR that just says "the system must scale" without specifying which dimension, and by how much, gives the architect nothing to design against.

## A growth curve, not a single number

A scalability NFR should be expressed as a trajectory, because the design that's right for year one may be wrong for year three: "the Case object must support 2 million records in year one, growing to 15 million by year three, with list-view and report performance remaining within the performance NFR's targets throughout." This framing forces the architect to decide, up front, whether the chosen design holds at the end state or only at the starting point — and it gives a future architect a documented basis for revisiting the decision once the actual growth curve plays out differently than planned.

## Salesforce-specific scaling levers

Several platform-specific tools exist precisely because standard custom objects have practical ceilings on very large data volumes:

- **Big Objects** store massive volumes of data (hundreds of millions to billions of records) outside the standard object storage and query infrastructure, intended for scenarios like long-term archival or audit history where the data needs to be retained and occasionally queried but doesn't need the full standard-object feature set (triggers, most declarative automation, standard reporting).
- **Data archiving strategies** (moving aged records out of frequently-queried objects into Big Objects, external storage, or a data lake) keep the "hot" working set of data small even as the organization's total historical data grows indefinitely.
- **Selective, indexed query design** — ensuring list views, reports, and SOQL queries filter on indexed fields — is the most common large-data-volume fix, because an unselective query against a large object forces a full table scan regardless of how much other scaling work has been done.
- **Skinny tables** (a Salesforce-managed, denormalized copy of frequently-queried fields, requested through Salesforce support for specific large-object performance problems) speed up read-heavy queries on very large objects without requiring an index.

## Key terms

| Term | Meaning |
|---|---|
| Scalability | The system's ability to handle growth in data, users, or transactions without requiring a redesign |
| Data-volume scalability | Whether the object model and queries hold up as record counts grow |
| User-volume scalability | Whether the org's sharing and role architecture holds up as licensed/concurrent users grow |
| Transaction-volume scalability | Whether automation and integrations hold up as the rate of record operations grows |
| Big Objects | A Salesforce feature for storing very large volumes of data outside standard object infrastructure |
| Selective query | A query that filters on indexed fields, avoiding a full table scan on a large object |

## Lab

A client's Case object currently holds 300,000 records and grows by roughly 40,000 a month. Project the record count at the one-year and three-year marks. Write a scalability NFR for this object covering data-volume growth, including a note on whether an archiving strategy (Big Objects or otherwise) should be part of the design, and justify your answer using the growth numbers you calculated.

## Check yourself

Can you explain why performance and scalability are different NFRs, with an example where a system has one but not the other? Can you name the three growth dimensions a scalability NFR should separate, and explain why they can grow independently of each other?
