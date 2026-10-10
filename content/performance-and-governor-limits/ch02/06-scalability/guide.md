# Lesson 6 — Scalability

**Chapter 2 · Measuring and Diagnosing · Lesson 6 of 16**

## What you'll learn

- Why code that performs fine today can become a production incident purely from data growth, with no code changes at all
- The three classic "data skew" problems Salesforce architects watch for at scale
- Why "it worked in the sandbox" is not evidence that code will scale
- How to reason about an org's growth trajectory before a performance problem exists, not after

## Performance and scalability are related, but not the same question

Chapter 1 was about writing code that behaves well right now — bulkified, selective, inside its governor limits. **Scalability** is a related but distinct question: will that same code still behave well as the org's data volume, user count, and automation complexity grow over the next one, three, or five years? A query that's comfortably selective against 50,000 Accounts today might cross the standard-index selectivity threshold covered in Lesson 4 once that table reaches 2 million rows — with literally no code changes, just data growth. This is why a Technical Architect's review of a solution has to include a growth question, not just a correctness question: what does this look like at 10x the current data volume?

## Data skew: when scale isn't evenly distributed

A large org's data volume problems are rarely "everything is proportionally bigger." They're usually concentrated in specific, uneven patterns, commonly described as **data skew**:

- **Ownership skew.** A very large number of records (Accounts, Cases, Opportunities) owned by a single user or queue. Sharing calculations, which Salesforce has to recompute whenever ownership or sharing rules change, become disproportionately expensive for that one owner's enormous slice of records, compared to the same operation for an owner with a normal-sized book of records.
- **Lookup skew.** A very large number of child records pointing to the same single parent record through a lookup or master-detail relationship — for example, one "House Account" that every orphaned Opportunity gets attached to. Any operation that touches that parent (recalculating a rollup, locking the record during an update) now has to account for an unusually large number of children.
- **Parent-child (ownership) record locking.** Related to lookup skew: when many child records share a parent, concurrent updates to those children can contend for a lock on the shared parent, causing `UNABLE_TO_LOCK_ROW` errors under load that wouldn't appear in a low-concurrency sandbox test.

None of these show up in a small sandbox with a few hundred test records. They are specifically volume-and-distribution problems, which is exactly why "it worked in the sandbox" is not evidence of anything about scale — a sandbox with realistic *shape* (skewed distribution, not just raw row count) is what would actually surface them, and even that is only a partial substitute for production-scale data.

## Designing with growth in mind, before the problem exists

Scalability review is most valuable before a solution ships, not after it's already struggling in production. Three habits support this:

1. **Ask about growth trajectory during design**, not just current volume — a solution reviewed against "what we have now" with no regard for "what we'll have in two years" is reviewed against the wrong number.
2. **Avoid designs that concentrate records on a single parent or owner by construction** — a "catch-all" record (one default Account, one default Queue) is a common, well-intentioned pattern that directly creates ownership or lookup skew as volume grows.
3. **Revisit bulkification and selectivity (Chapter 1) specifically under projected future volume**, not just today's volume — a query that's selective today may not stay selective, and bulkified code that's comfortably under a limit today may not stay comfortably under it once automation and data volume both grow.

## Key terms

| Term | Meaning |
|---|---|
| Scalability | Whether a solution continues to perform acceptably as data volume, users, and automation complexity grow over time |
| Data skew | An uneven concentration of records against a single owner, parent, or relationship, rather than an even distribution |
| Ownership skew | A very large number of records owned by one user or queue, making sharing recalculation disproportionately expensive |
| Lookup skew | A very large number of child records pointing to the same single parent record |

## Lab

A client's design proposes a single "Default Account" that every web-to-lead conversion with no identified company gets attached to, to avoid leaving the Account field blank. Write a short architecture review memo (4-6 sentences) explaining, in terms of this lesson's concepts, what will happen to that Default Account as web-to-lead volume grows over several years, which specific type of skew it creates, and one alternative design that avoids concentrating that many child records on a single parent.

## Check yourself

Can you explain the difference between a performance problem and a scalability problem in your own words? Can you name and describe, without looking back at the lesson, at least two of the three data skew patterns covered here?
