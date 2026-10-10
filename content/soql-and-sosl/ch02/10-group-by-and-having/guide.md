# Lesson 10 — GROUP BY and HAVING

**Chapter 2 · Relationships and Aggregates · Lesson 10 of 23**

## What you'll learn

- How GROUP BY produces one summary row per distinct group instead of one overall summary
- The rule that every non-aggregated selected field must appear in GROUP BY
- How HAVING filters groups after aggregation, as distinct from WHERE filtering rows before it
- A realistic combined example you'll recognize from real sales/service reporting

## From one summary row to many

Lesson 9 covered aggregate functions that collapse an entire result set into a single row. `GROUP BY` changes that — it produces one summary row **per distinct value** of whatever you group by, instead of one row for everything:

```sql
SELECT StageName, COUNT(Id), SUM(Amount)
FROM Opportunity
GROUP BY StageName
```

This returns one row per distinct `StageName` value — "Prospecting," "Negotiation," "Closed Won," and so on — each with its own count and total. That's the shift from "one number for everything" to "one number per bucket," and it's the pattern behind essentially every summary report you've ever seen in Salesforce: pipeline by stage, cases by priority, leads by source.

## The rule: every plain field must be in GROUP BY

Any field you select that isn't wrapped in an aggregate function must appear in the `GROUP BY` list — otherwise SOQL has no defined way to pick which row's value to show for that field within a group that might span many rows with different values:

```sql
SELECT StageName, LeadSource, COUNT(Id)
FROM Opportunity
GROUP BY StageName, LeadSource
```

Grouping by two fields together produces one row per unique *combination* of `StageName` and `LeadSource` — not one row per `StageName` with `LeadSource` values mixed in arbitrarily.

## HAVING filters groups, WHERE filters rows

`WHERE` and `HAVING` look similar but operate at different stages:

- `WHERE` filters individual rows **before** they're grouped and aggregated
- `HAVING` filters **groups**, after aggregation, based on the aggregate value itself

```sql
SELECT StageName, COUNT(Id)
FROM Opportunity
WHERE CreatedDate = THIS_YEAR
GROUP BY StageName
HAVING COUNT(Id) > 5
```

This means: among opportunities created this year, group by stage, then keep only the stages that ended up with more than 5 opportunities in them. You could never express "keep only stages with more than 5 opportunities" with `WHERE` alone — `WHERE` has no way to reference an aggregated value, because aggregation hasn't happened yet at the point `WHERE` is evaluated.

## A realistic combined example

```sql
SELECT LeadSource, COUNT(Id) totalLeads, AVG(NumberOfEmployees) avgSize
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:90
GROUP BY LeadSource
HAVING COUNT(Id) > 10
ORDER BY totalLeads DESC
```

Lead sources from the last 90 days, counted and averaged by company size, restricted to sources that generated more than 10 leads, sorted by volume. This is close to verbatim what a marketing-operations dashboard query looks like — every clause from this lesson and the last one working together in one realistic request.

## Key terms

| Term | Meaning |
|---|---|
| GROUP BY | Produces one summary row per distinct value (or combination of values) grouped on |
| HAVING | Filters groups after aggregation, based on an aggregate value — unlike WHERE, which filters rows before aggregation |
| Grouping rule | Any selected field not wrapped in an aggregate function must appear in GROUP BY |

## Lab

Against `Case` in a Developer Edition org, write a query that groups by `Priority`, returning a count and the earliest `CreatedDate` per priority, for cases created in the last 90 days. Add a `HAVING` clause that keeps only priorities with more than 2 matching cases. Then try removing `Priority` from the `GROUP BY` list while leaving it in `SELECT`, and read the error SOQL gives you.

## Check yourself

What's the practical difference between filtering with WHERE versus filtering with HAVING in the same query? If you SELECT a plain (non-aggregated) field, what must also be true about that field for the query to be valid?
