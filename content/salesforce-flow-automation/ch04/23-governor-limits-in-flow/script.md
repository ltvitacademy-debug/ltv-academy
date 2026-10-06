# Script — Governor Limits in Flow

## Segment 1 (title)

Flow doesn't get its own separate set of limits — it runs inside the exact same governor limits as Apex, in the same transaction. This lesson is about which specific ceilings an unbulkified flow actually hits.

## Segment 2 (steps: shared transaction, shared pool)

Salesforce enforces hard per-transaction limits so one org's automation can't degrade performance for every other org on the same infrastructure. A flow interview runs in the same transaction as any Apex trigger or validation rule firing on that same record — and all of it draws from one shared pool. A flow that looks fine in isolation can still fail if an Apex trigger in the same transaction already used most of the available queries.

## Segment 3 (code: the limits that matter)

The ones that catch unbulkified flows first: 100 total SOQL queries per transaction, tripped by a Get Records inside a loop. 150 total DML statements, tripped by Create, Update, or Delete Records inside a loop. 10,000 DML rows, tripped by looping DML on a very large collection. These are the same numbers Apex developers have always worked under — Flow isn't exempt, and it isn't special.

## Segment 4 (steps: reading the error honestly)

When you see "Too many SOQL queries: 101" or "Apex CPU time limit exceeded," that's reporting on the whole transaction — but a query or DML element sitting inside a loop in your flow is the most likely contributor. It's not a bug in Flow. It's the platform protecting every tenant sharing that infrastructure.

## Segment 5 (code: what bulkification doesn't fix)

Not every limit is about loop placement, though. An Action element calling an external system in a tight loop can hit the 100-callouts-per-transaction limit no matter how your DML is structured — that's a different kind of reach-outside-the-flow. The underlying principle holds regardless: minimize how many times the flow touches the database or an external system, per transaction.

## Segment 6 (outro)

Bulkification from the last lesson isn't a nice-to-have — it's the direct fix for the two limits unbulkified flows hit first: too many SOQL queries, too many DML statements. Build with collections outside loops, and you simply never get close to either ceiling. Next up: Flow Versioning and Deployment, for moving a flow from "it works in my sandbox" to production safely.
