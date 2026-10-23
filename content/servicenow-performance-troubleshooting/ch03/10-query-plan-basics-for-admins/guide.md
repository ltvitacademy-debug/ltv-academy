# Lesson 10 — Query-Plan Basics for Admins

**Chapter 3 · Database & Query Performance · Lesson 10 of 25**

## What you'll learn

- What a query execution plan actually is, at an admin level — not full DBA depth
- The two strategies that matter most: an indexed lookup versus a full table scan
- Why a full table scan on a large table is a common, real root cause of a slow query
- How adding or using the right index converts a slow scan into a fast lookup
- Why this mental model is worth having even without deep database internals knowledge

## The database has to choose a strategy

Every time a query runs — a list opens, a report pulls data, a `GlideRecord` query executes — the
underlying database doesn't just magically produce the result. It has to decide *how* to actually
go get it. That decision is the query's execution plan: the concrete strategy the database engine
chooses for running that specific query, given the table involved, the conditions in the query, and
whatever indexes exist on that table. Two queries that look nearly identical can end up with very
different plans, and very different real-world speed, depending on exactly this choice.

## Two strategies, one real distinction

At the admin level, the distinction that matters most boils down to two options. The first is an
indexed lookup: the database uses an available index (Lesson 9) to jump directly to the rows that
match the query's conditions, skipping everything that doesn't. The second is a full table scan:
the database has no useful index to work with, so it checks every single row in the table, one at a
time, evaluating the condition against each one to decide whether it belongs in the result. On a
table with a few hundred rows, a full scan is barely noticeable either way. On a table with
hundreds of thousands or millions of rows — which plenty of real ServiceNow tables are, `incident`
chief among them — the difference between "jump to the matches" and "check every row" is the
difference between a query that returns instantly and one that visibly drags.

## Why a full scan is such a common root cause

This is the practical, non-DBA-level takeaway worth carrying forward: when a query against a large
table is slow, a full table scan is one of the most common real explanations. It happens when the
query's actual filter condition — the fields in its Encoded Query or its `addQuery()` calls — isn't
covered by any existing index, so the database has no shortcut available and falls back to checking
every row. You don't need to read the database engine's internal plan output to suspect this; you
need to recognize the pattern: a query against a large table, filtered on fields that were never
indexed, running far slower than a query of similar shape against a smaller table or better-indexed
fields.

## Turning a scan into a lookup

The fix connects directly back to Lesson 9: add — or confirm the existence of — an index that
actually covers the fields the slow query filters or sorts on. Once that index exists, the same
query, with the same conditions, against the same data, no longer has to check every row. The
database engine picks the indexed-lookup plan instead of the full-scan plan, and the query's real
measured time drops accordingly — often dramatically, on a table large enough for the difference to
matter. This is the whole reason Lesson 9's guidance (index the fields genuinely used in filters
and sorts) is practical and not just theoretical: it's directly, causally connected to which
strategy the database ends up choosing the next time that query runs.

## The honest limit of this mental model

This lesson deliberately stays above full database-internals depth, and that's by design for an
admin role. You don't need to parse a raw execution-plan output or understand every strategy a
database engine can choose between to be effective here. You need the one distinction that
actually drives most real, fixable slowness on this platform: indexed lookup versus full table
scan, and the fact that the right index is usually what moves a query from one side of that line to
the other.

## Key terms

| Term | Meaning |
|---|---|
| Execution plan | The database engine's chosen strategy for actually running a specific query |
| Indexed lookup | A plan that uses an available index to jump directly to matching rows |
| Full table scan | A plan that checks every single row in the table, one at a time, because no useful index exists |
| Query shape | The combination of table, filter conditions, and sort order that determines which plan the engine picks |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: a query against a 500,000-row
table is running slowly, and the field it filters on has no index. Which of the two strategies is
the database almost certainly falling back to, and what single change is most likely to fix it?
