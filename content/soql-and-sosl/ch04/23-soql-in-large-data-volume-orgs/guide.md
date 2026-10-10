# Lesson 23 — SOQL in Large Data Volume Orgs

**Chapter 4 · Advanced Queries and Optimization · Lesson 23 of 23**

## What you'll learn

- What "Large Data Volumes" (LDV) means as a distinct architectural concern
- Skinny tables: what they are, their real limits, and why they're a last resort
- PK chunking as the documented strategy for walking millions of records
- How this lesson closes the loop on everything else in this course

## LDV is a different regime, not just "more of the same"

Everything in this course so far works correctly regardless of object size — the syntax doesn't change whether `Account` has 500 rows or 50 million. What changes is which techniques actually perform well. Salesforce's own Large Data Volumes guidance treats millions of records per object as a genuinely different regime, where query patterns that were merely good practice at normal scale become load-bearing architecture decisions: an unselective filter that cost nothing noticeable at 10,000 rows can make a batch job time out at 10 million.

## Skinny tables

A **skinny table** is a custom, narrower copy of a standard or custom object, containing a subset of frequently-queried fields, that lets Salesforce fetch more rows per read by avoiding the overhead of the object's full row width. A few real constraints make this a tool you reach for deliberately, not casually:

- **It's not self-service.** You have to contact Salesforce Customer Support to have one created.
- **Changing a field's type invalidates it.** If you alter the type of a field included in the skinny table, the skinny table becomes invalid and Support has to create a new one.
- **Adding a field to your query that isn't in the skinny table means Salesforce can't use it for that query** — the skinny table only helps queries that only need fields it actually contains.
- **Sandbox support is limited.** Only Full sandboxes get a copy of production skinny tables by default; other sandbox types need a separate request.

Salesforce's own guidance frames skinny tables as something to reach for only after coding best practices (selective filters, indexed fields, bulkified queries — everything from Lessons 20–21) and custom indexes have already been tried and found insufficient. It's a real tool, but it's the last one on the list, not the first.

## PK chunking: walking millions of records safely

Lesson 3 covered why `OFFSET` tops out at 2,000 rows and can't be used to page arbitrarily deep into a large result set. **PK chunking** (primary key chunking) is Salesforce's documented answer for exactly this problem at true LDV scale — available through the Bulk API, it splits a query against a very large object into multiple smaller batches, each bounded by a range of record IDs, rather than relying on `OFFSET` at all. This is the production-grade equivalent of the "filter on an indexed field like Id instead of OFFSET" idea first raised back in Lesson 3 — now with a named, documented API feature behind it rather than just a workaround pattern.

## How this lesson closes the course

Every earlier lesson in this course assumed a query was correct once it returned the right rows in a Developer Edition org with a handful of test records. This lesson is where that assumption gets explicitly retired: a correct query and a query that will actually hold up against a production org's real data volume are not automatically the same thing. Selectivity (Lesson 21), the Query Plan tool (Lesson 22), avoiding SOQL in a loop (Lesson 20), and now skinny tables and PK chunking together form the complete answer to "will this still work once the org isn't small anymore" — the question every one of the previous 22 lessons has been quietly building toward.

## Key terms

| Term | Meaning |
|---|---|
| Large Data Volumes (LDV) | The architectural regime where an object holds millions of records and query technique becomes load-bearing, not just good practice |
| Skinny table | A custom, narrower Support-created copy of an object's frequently-queried fields, for faster reads; a last-resort tool |
| PK chunking | A Bulk API feature that splits a large query into ID-range-bounded batches, replacing OFFSET-based paging at true scale |

## Lab

Write a short design memo (a few sentences) for a hypothetical object expected to reach 20 million records: list, in order, which techniques from this course you'd apply first (selective filtering, indexed fields, avoiding SOQL in a loop), and only then explain under what specific circumstance you'd escalate to requesting a skinny table or using PK chunking, and why you wouldn't start there.

## Check yourself

Why does Salesforce's own guidance treat skinny tables as a last resort rather than a first response to a slow query? Why doesn't OFFSET work as a strategy for processing millions of records, and what documented feature replaces it at that scale?
