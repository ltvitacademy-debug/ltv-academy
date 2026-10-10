# Lesson 4 — Query Optimization

**Chapter 1 · Performance Foundations · Lesson 4 of 16**

## What you'll learn

- What makes a SOQL query "selective" versus a query the optimizer treats as a full table scan
- The standard-index and custom-index selectivity thresholds that decide whether an index actually gets used
- Common query mistakes that silently defeat an otherwise-indexed field
- How to use the Developer Console's Query Plan tool to see which path the optimizer actually chose

## Selectivity: the question the optimizer is really asking

Every SOQL query gets evaluated by Salesforce's internal query optimizer, which decides whether to use an index to narrow the search or fall back to scanning a larger portion of the table. The deciding factor is **selectivity** — roughly, what fraction of the table's rows the filter is expected to match. A highly selective filter (one that matches a small slice of the table) is cheap to serve through an index. A non-selective filter (one that matches a large fraction of the table) gains little from an index and the optimizer may skip it entirely.

Salesforce publishes specific thresholds for this. For a **standard index**, a filter is treated as selective if it targets under 30% of the first million records in the table, and under 15% of records beyond that first million — with an overall cap of 1 million targeted records regardless of table size. A **custom index** has tighter thresholds: under 10% of the first million records, and under 5% beyond that, capped at 333,333 records. In concrete terms: on a 2.5-million-row Account table, a standard-indexed filter stays selective only if it targets fewer than roughly 525,000 rows (30% of the first million, plus 15% of the next 1.5 million). Past that, the optimizer decides the index isn't worth using and may do a larger scan instead.

## Mistakes that quietly defeat an index

A field being indexed doesn't guarantee a query against it stays fast — several common patterns defeat the index even when one exists:

```soql
-- Non-selective: != and NOT typically don't drive an index, even on an indexed field
SELECT Id FROM Account WHERE Industry != 'Technology'

-- Better: rephrase as a selective positive match where possible
SELECT Id FROM Account WHERE Industry = 'Technology'
```

```soql
-- Non-selective: a leading wildcard means the index can't narrow anything
SELECT Id, Name FROM Contact WHERE LastName LIKE '%son'

-- Selective: a trailing wildcard can still use an index on LastName
SELECT Id, Name FROM Contact WHERE LastName LIKE 'John%'
```

```soql
-- Wrapping an indexed field in a function usually defeats the index entirely
SELECT Id FROM Opportunity WHERE CALENDAR_YEAR(CloseDate) = 2026

-- Rewritten as a plain range on the bare field, the index can be used
SELECT Id FROM Opportunity WHERE CloseDate >= 2026-01-01 AND CloseDate <= 2026-12-31
```

The pattern across all three: the optimizer can generally only use an index when the filter compares the bare, unmodified field directly. Negations, leading wildcards, and functions wrapped around the field each break that condition in their own way.

## Selecting only what you need

Beyond selectivity, the other half of query optimization is simply not asking for more than the operation requires:

```soql
-- Pulls every field on the object, most of which this code never reads
SELECT * FROM Account WHERE Id = :accId
```

SOQL has no `SELECT *` — but the equivalent mistake, naming far more fields than needed, has the same effect: more data crossing into heap (Lesson 2's 6MB/12MB ceiling), more data serialized back to the client if it's a Lightning Web Component Apex call, and in relationship queries, every additional child relationship you traverse adds real cost. Name only the fields the transaction actually uses.

## Seeing the optimizer's actual decision: the Query Plan tool

You don't have to guess whether a query is selective — the Developer Console has a **Query Plan** tool that shows the real execution plan the optimizer chose, including its estimated cost and whether it's using an index or falling back to a table scan. It isn't enabled by default: in the Developer Console, go to **Help > Preferences** and enable **"Enable Query Plan"**. Once enabled, a **Query Plan** button appears next to **Execute** in the Query Editor tab. Running it against a non-selective query (for example, a filter on a low-cardinality picklist field across a large table) will show a `TableScan` operation in the plan — a direct, visible signal that the query isn't benefiting from an index the way you might assume.

## Key terms

| Term | Meaning |
|---|---|
| Selectivity | The fraction of a table's rows a filter is expected to match; lower is more selective |
| Standard index threshold | Under 30% of the first million rows, 15% beyond that, capped at 1 million rows |
| Custom index threshold | Under 10% of the first million rows, 5% beyond that, capped at 333,333 rows |
| Query Plan tool | A Developer Console feature showing the optimizer's actual chosen execution plan and cost |
| Table scan | The optimizer reading a large portion of the table directly instead of using an index |

## Lab

In a Developer Edition org, enable the Query Plan tool (Developer Console > Help > Preferences > Enable Query Plan) and run two queries against the Account object: one filtering on a low-selectivity condition (for example, a boolean or small-picklist field most records share the same value for) and one filtering on `Id` or another highly selective field. Compare the two Query Plan results and write down which operation type (index-driven vs. table scan) each one shows, and why that matches the selectivity thresholds covered in this lesson.

## Check yourself

Can you explain, without looking it up, why `WHERE Industry != 'Technology'` is less selective than `WHERE Industry = 'Technology'`, even though both reference the same indexed field? Can you name two specific patterns (beyond a leading wildcard) that defeat an index even when the field itself is indexed?
