# Script — Flow Bulkification and Performance

## Segment 1 (title)

A flow that works perfectly when you test it on one record can fail completely on two hundred. This lesson is about why — and about bulkification, the one restructuring habit that fixes it.

## Segment 2 (steps: where flows actually break)

Salesforce almost never triggers a flow on exactly one record. A data import, a mass update, an API batch — a record-triggered flow can receive two hundred records in a single transaction, Salesforce's standard batch size. If your flow does one database operation per record instead of one per batch, two hundred records means two hundred queries or updates, in a single transaction, against limits that were never built for that.

## Segment 3 (code: the pattern that breaks)

Here's the shape that causes it: a Loop over a collection of Opportunities, with a Get Records and an Update Records element sitting inside that loop. Every single pass through the loop fires its own query and its own database write — two hundred of each, for a two-hundred-record batch.

## Segment 4 (code: the bulkified version)

The fix isn't a faster element — it's moving the database work outside the loop entirely. Loop once to collect the related record Ids into a collection variable. Run one Get Records against that whole collection. Loop again to update values in memory. Then one Update Records against the whole collection. Same outcome, same two hundred records — but now it's one query and one write, not two hundred of each.

## Segment 5 (steps: why it surfaces late)

This is exactly the kind of problem that hides in a sandbox. Five test records, it looks completely fine. The first real data load, integration, or mass transfer is when it actually breaks — which is exactly why you build it bulkified from the start, not after something fails in production.

## Segment 6 (outro)

The rule to carry forward: Get Records, Create Records, Update Records, and Delete Records are database operations that can act on a whole collection at once — so keep them outside loops, operating on collections, not inside loops operating one record at a time. Next up: Governor Limits in Flow, for the specific ceilings this habit keeps you under.
