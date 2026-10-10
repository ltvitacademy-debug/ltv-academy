# Lesson 3 — Performance vs. Complexity

**Chapter 1 · Architecture Tradeoffs · Lesson 3 of 20**

## What you'll learn

- Why the fastest-performing solution is usually also the most complex one
- Concrete Salesforce examples: bulkified triggers, indexed fields and selective queries, caching patterns, denormalized reporting objects
- How to decide whether a performance optimization is worth the complexity it adds
- Why premature optimization is its own architecture mistake

## Speed is rarely free

Every meaningful performance gain in a Salesforce org comes from doing something less obvious than the simplest possible implementation. A single, naive, unbulkified trigger that issues one SOQL query per record is the easiest code to read and the first thing most new developers write — and it's also the code that hits governor limits the moment someone imports 500 records at once. The fix, a properly bulkified trigger that collects IDs into a set and issues one query for the whole batch, performs far better under load, and it is measurably harder to read, harder to unit test completely, and easier to get subtly wrong (forgetting to handle `Trigger.isUpdate` versus `Trigger.isInsert`, or missing the case where the collection is empty). The performance gain is real. So is the complexity cost.

The same pattern repeats at every layer of the platform. A denormalized reporting object that pre-aggregates data nightly makes dashboards load instantly, at the cost of a batch job, a sync-timing lag, and one more moving part that can silently drift out of date if the batch fails. A caching layer in front of a slow external callout makes a page feel instant on the second load, at the cost of a cache-invalidation strategy someone now has to maintain correctly, forever, or risk showing stale data. Selective SOQL queries that use indexed fields in the `WHERE` clause avoid a full table scan on a large object, at the cost of an architect having to actually understand which fields are indexed (standard indexed fields, custom fields marked External ID or Unique, or a custom index requested from Salesforce support) and design the query and the data model around that constraint from the start, rather than writing the query that reads most naturally.

## Deciding whether the gain is worth the cost

Not every object needs the fastest possible query path, and not every page needs sub-second load time. The questions that actually decide this tradeoff:

- **How many records, how often?** A list view that twenty users check once a day against a 2,000-row object does not need the same optimization investment as a dashboard refreshed by every user, every few minutes, against an object with ten million rows. Optimize where the volume and frequency actually create pain, not uniformly.
- **What's the cost of being wrong, slowly, versus being wrong, quickly?** A slow page is an annoyance. A bug introduced by overly clever bulkification that silently drops records under a specific edge case is a data-integrity incident. More complexity means more surface area for that kind of mistake, so the performance win has to be big enough to justify the added risk of a harder-to-verify implementation.
- **Who maintains this after you leave?** A solution that only the original architect can safely modify is a liability the moment that person moves to a different project. If a performance optimization requires specialized knowledge the team doesn't have and isn't planning to build, that's a real cost that belongs in the decision, not an afterthought.
- **Is the complexity isolated or does it spread?** A caching layer contained behind a single, well-tested service class is a manageable cost. The same caching logic copy-pasted into a dozen different Apex classes, each with a slightly different invalidation rule, turns one complexity cost into a maintenance burden that compounds every time someone touches any of those dozen places.

A useful discipline: don't add complexity for performance you haven't measured a real need for. Premature optimization — bulkifying, caching, or denormalizing before there's evidence of an actual bottleneck — pays the full complexity cost for a performance gain nobody was waiting on. The right sequence is almost always: build the simple version, measure where it actually struggles under real load, and spend the complexity budget exactly there.

## Key terms

| Term | Meaning |
|---|---|
| Bulkification | Writing Apex (especially triggers) to operate on a collection of records in one pass instead of one record at a time, avoiding per-record governor limit consumption |
| Selective query | A SOQL query that filters on indexed fields so Salesforce can use an index instead of scanning the whole object |
| Denormalization | Pre-computing or duplicating data (often via a batch job into a reporting object) to make read performance faster, at the cost of a sync lag and an extra moving part |
| Premature optimization | Adding performance-driven complexity before there's measured evidence of a real bottleneck |

## Lab

A client's Opportunity object has grown to several million records. Their sales dashboard, which aggregates pipeline by region and stage, has started taking over ten seconds to load, and sales reps are complaining. Someone proposes building a nightly batch job that pre-aggregates the numbers into a custom reporting object, cutting load time to under a second. Using the criteria above, write a short case for or against building this: what questions would you ask before committing to the added batch-job complexity, and what would make you recommend a simpler fix instead (like adding a selective index, or narrowing the dashboard's default filters)?

## Check yourself

Can you explain, with a concrete Salesforce example, why a faster-performing solution is usually also a more complex one? Can you list at least three questions you'd ask before deciding a performance optimization is worth its complexity cost in a specific scenario?
