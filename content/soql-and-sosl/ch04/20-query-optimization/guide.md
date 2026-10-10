# Lesson 20 — Query Optimization

**Chapter 4 · Advanced Queries and Optimization · Lesson 20 of 23**

## What you'll learn

- The governor limits that make query efficiency an architectural concern, not just a performance nicety
- How relationship subqueries consume extra query budget
- Practical habits that make queries faster and cheaper, pulling earlier lessons' ideas together
- Why "it works in my dev org" doesn't guarantee it'll work at production scale

## Why this isn't optional polish

Every SOQL query in Apex counts against hard, enforced governor limits per transaction: **100 synchronous SOQL queries** (200 asynchronous), and **50,000 total rows** retrieved by SOQL across the whole transaction. Exceeding either throws an uncatchable runtime exception that aborts the transaction. This is the architectural reason query optimization in Salesforce isn't just "make it faster" the way it might be in a traditional app — a sloppy query pattern can make a feature *stop working entirely* once data volume or a bulk operation pushes past a limit, not just run slower.

## Relationship subqueries cost extra

A documented wrinkle that catches people off guard: in a query with parent-to-child relationship subqueries, **each parent-child relationship counts as an extra query** against your limit, and these relationship subqueries get a combined budget of three times the top-level query limit. Writing one query with several nested relationship subqueries is cheaper than running separate queries for each relationship — but it isn't free, and stacking many relationship subqueries onto one query is still something to budget for deliberately, not something to treat as a free way around the 100-query cap.

## Practical habits, pulled together

Several ideas from earlier lessons are also, directly, optimization habits:

- **Select only the fields you need** (Lesson 2) — fewer fields means less data serialized per row, which matters more as row counts grow.
- **Filter out nulls explicitly where it helps** (Lesson 6) — an explicit `!= null` can help the query optimizer use an index more effectively.
- **Avoid unselective operators like `!=` and `NOT LIKE`** on large objects (Lesson 4) — they generally can't use an index, so they force a broader scan.
- **Avoid leading wildcards in LIKE** (`'%term'` or `'%term%'`) — a leading `%` prevents index use entirely, the same way `!=` does, because there's no fixed starting point for the index to narrow from.
- **Query in bulk, not in a loop.** The single most common root cause of hitting the 100-query limit isn't one expensive query — it's a SOQL query placed inside a `for` loop, run once per iteration instead of once total. Moving the query outside the loop (querying everything you need up front, then looping over the in-memory results) is the standard fix, and it's a rule general enough that Salesforce documentation treats "no SOQL inside a loop" as a foundational Apex best practice, not just a query-tuning tip.

## "Works in my dev org" is not evidence

A query that runs instantly against 50 test records can behave completely differently against 2 million production records — not because the query is wrong, but because an unselective filter that doesn't matter at small scale becomes the exact filter that forces a full object scan at large scale. This is exactly why Lesson 21 (selectivity and indexes) and the Query Plan tool (Lesson 22) matter: they give you a way to reason about a query's cost *before* it meets production-scale data, instead of discovering a problem only after it ships.

## Key terms

| Term | Meaning |
|---|---|
| SOQL inside a loop | The most common root cause of hitting the 100-query governor limit; the fix is querying once, outside the loop |
| Relationship subquery cost | Each parent-child relationship subquery counts as an extra query, with a combined budget of 3x the top-level query limit |
| Unselective operator | An operator (!=, NOT LIKE, leading-wildcard LIKE) that generally can't use an index, forcing a broader scan |

## Lab

Review a piece of Apex you've written in an earlier lesson's lab (or write a short trigger-style snippet) that queries related records inside a `for` loop over a list of records. Rewrite it to run the query once, outside the loop, using a single bulkified query (a `WHERE Id IN :idSet`-style pattern) instead. Explain in a comment why the original version would eventually hit a governor limit that the rewritten version would not.

## Check yourself

Why does placing a SOQL query inside a for loop risk hitting a governor limit, even if the query itself is perfectly correct? Why does a query that performs fine against 50 test records not guarantee it will perform fine against 2 million production records?
