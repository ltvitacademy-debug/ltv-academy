# Lesson 22 — Scalability Considerations

**Chapter 4 · Applying Data Architecture · Lesson 22 of 26**

## What you'll learn

- Why Salesforce's own documentation treats "large data volumes" as a real, named architectural concern, not a vague worry
- How governor limits turn a data-architecture choice into a hard failure if ignored
- The design-time levers that keep an org scalable as record counts grow into the millions
- Why scalability has to be designed in from the start, not patched in once performance degrades

## What "large" means on this platform

Salesforce's own Large Data Volumes guidance treats this as an imprecise but real threshold: it flags deployments with tens of thousands of users, tens of millions of records, or hundreds of gigabytes of total record storage as the point where the way data is structured and operated on can change operation times by orders of magnitude. The platform stores an org's data in a shared, multi-tenant database, which means generic database-tuning intuition doesn't automatically transfer — Salesforce's own architecture guidance has to be the reference, not general relational-database experience.

## Governor limits make this concrete, not theoretical

Apex code executes under governor limits that cap resource use per transaction, specifically so that one org's runaway process can't degrade the shared platform for everyone else. The limits that matter most for data architecture, per Salesforce's Execution Governors and Limits documentation: a synchronous Apex transaction can issue up to 100 SOQL queries (200 for asynchronous Apex) and retrieve up to 50,000 rows total across those queries; a transaction can issue up to 150 DML statements; synchronous Apex gets a 10,000-millisecond CPU time budget (60,000 ms for asynchronous) and a 10-minute maximum execution time. These aren't soft guidelines — exceeding one throws a runtime exception and the transaction fails. A data model that forces a trigger to query or update far more related records than these limits allow isn't a performance problem to tune later; it's a design defect that will eventually cause real transactions to fail outright as data volume grows, even if it works fine in a small test org.

## Design-time levers for scale

Several architectural choices determine whether an org stays inside these limits as it grows:

- **Selective, indexed queries.** SOQL that filters on indexed fields (standard indexed fields, or custom fields with an external ID or a custom index) returns results far faster and avoids forcing the query optimizer into an expensive full-table scan, which matters enormously once an object holds millions of rows.
- **Bulkification.** Automation (triggers, Flow) must be written to operate on batches of records at once rather than one record at a time, since a transaction that processes 200 records one-by-one multiplies every governor-limit cost by 200 instead of handling them in a single bulk-safe pass.
- **Avoiding record-skew patterns.** Concentrating too many child records under one parent, or too many records under one owner, creates lock contention that gets worse specifically as volume grows — this is covered in depth in Lesson 11, but it's a direct scalability lever, not just a storage concern.
- **Archiving.** Data that no longer needs to be actively queried but can't be deleted for compliance reasons should move to a Big Object or an external archive (Lesson 9) rather than sit in the primary object, where its sheer volume slows down every query and report that touches that object — even ones that never need the old records.

## Design for scale from day one

The Large Data Volumes guidance's core point is that the design phase is where this gets decided, not the tuning phase after launch. Retrofitting selective queries, bulkification, and an archiving strategy onto a schema and automation that were built without them is dramatically more expensive than building them in from the start — and in the interim, the org runs a real risk of transactions failing in production once real volume arrives, not just running slowly.

## Key terms

| Term | Meaning |
|---|---|
| Large data volumes (LDV) | Salesforce's own term for deployments at the scale (tens of millions of records, hundreds of GB) where data structure and operations materially affect performance |
| Governor limit | A hard per-transaction cap on resource use (SOQL queries, DML statements, CPU time, rows retrieved) that Apex code cannot exceed without failing |
| Selective query | A SOQL query that filters on an indexed field, letting the query optimizer avoid a full table scan |
| Bulkification | Writing automation to process records in batches rather than one at a time, so governor-limit cost doesn't multiply per record |

## Lab

An org's Opportunity object has grown to 40 million records over five years. A nightly batch job that updates Opportunity stage based on related Task completion has started failing intermittently with governor-limit exceptions it never hit in the first two years. Using this lesson's concepts, list three specific, plausible causes (in terms of selectivity, bulkification, or skew) and, for each, what a redesign would change.

## Check yourself

Can you state, from memory, the rough order of magnitude Salesforce calls out as "large data volumes" (users, records, or storage)? Can you explain why exceeding a governor limit is a hard failure rather than a performance degradation, and why that makes scalability a design-time concern rather than something to tune after the fact?
