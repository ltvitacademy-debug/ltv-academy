# Lesson 49 — Using Query Store to Find Regressed Queries

**Chapter 8 · Query Performance Tuning · Lesson 49 of 95**

## What you'll learn

- How to confirm a query has genuinely **regressed** — gone from a good plan to a worse one — instead of just guessing
- How to visually confirm a fix (like a new index) actually improved a query's plan, using the same Plan Summary chart from Lesson 48
- How to compare two plans for the same query side by side, operator by operator
- How to force a known-good plan with Query Store, and when to unforce it later

## From "this query is slow" to "this query got slower"

Lesson 44 asked you to determine whether a problem is new or has
always existed. Query Store is how you actually answer that for a
specific query, with evidence instead of a guess. Built on Lesson
48's Plan Summary view, Query Store's **Regressed Queries** report
surfaces exactly the queries whose average duration, CPU, or reads
got meaningfully worse recently compared to an earlier baseline
window — no manual comparison required.

## Confirming an index fix actually worked

Once you've found a candidate (say, from Lesson 47's missing-index
DMVs) and created an index, Query Store's Plan Summary chart is the
fastest way to *prove* it worked, because the query's new plan shows
up as a new cluster of points right next to the old one:

![A Query Store Plan Summary chart for a single query, annotated with "Before Index Creation" and "After Index Creation" labels and a green arrow marking the moment a new index was created, showing average duration dropping from roughly 17-20 million microseconds to roughly 8-12 million after the index was added.](/courses/azure-dba/ch08/49-using-query-store-to-find-regressed-queries/query-store-usage-3.png)

This is the same chart type from Lesson 48, just read differently:
instead of looking for *whether* two plan clusters exist, you're
looking at the moment the new plan (`plan id 15`) took over from the
old one (`plan id 1`), and confirming the new cluster sits meaningfully
lower than the old one. If it doesn't drop, the index didn't fix
what you thought it would, and it's back to Lesson 45's execution
plan for a second look.

## Comparing two plans side by side

The single most useful Query Store feature for a genuine regression
is **Compare Plans** — pick any two plan IDs for the same query and
SSMS lays their full graphical plans out top and bottom, operator by
operator:

![SSMS's Compare Query Plans dialog, showing "Plan 1 [not forced]" on top and "Plan 15 [not forced]" below for the same query, with a red-boxed Clustered Index Scan operator (cost 51%) in the top plan and a green-boxed Index Seek operator (cost 24%) in the bottom plan on the same LINEITEM/HISTORY join.](/courses/azure-dba/ch08/49-using-query-store-to-find-regressed-queries/query-store-usage-4.png)

Read the two plans as before/after: Plan 1's `Clustered Index Scan`
at 51% cost is exactly the operator that changed in Plan 15, replaced
by an `Index Seek` at 24% cost against a newer index — this is
Lesson 46's seek-vs-scan distinction, made directly visible as the
cause of a regression (or, read the other direction, as the fix for
one). SSMS highlights matching operators automatically so you don't
have to hunt for what actually changed between the two plans.

## Forcing a known-good plan

If a regression happened because the optimizer picked a worse plan
for reasons you don't want to wait to fix properly (a parameter
sniffing issue, a statistics update), Query Store lets you **force**
a specific plan ID so the optimizer uses it going forward, without
touching the query itself:

```sql
-- Force plan 15 for query 1 (IDs come from the Query Store reports)
EXEC sys.sp_query_store_force_plan @query_id = 1, @plan_id = 15;

-- Later, once a real fix (new index, rewritten query) is in place,
-- release the forced plan so the optimizer can choose freely again
EXEC sys.sp_query_store_unforce_plan @query_id = 1, @plan_id = 15;
```

Forcing a plan is a stabilizer, not a permanent fix — it buys time
while you diagnose the real cause. Both `sp_query_store_force_plan`
and `unforce_plan` are also exposed directly as buttons in the SSMS
reports (visible as **Force Plan** / **Unforce Plan** in Lesson 48's
Plan Summary screenshot), so you rarely need to type the T-SQL by
hand.

## Key terms

| Term | Meaning |
|---|---|
| Regressed query | A query whose performance got meaningfully worse recently compared to an earlier baseline |
| Compare Plans | SSMS feature that lays two plans for the same query side by side, highlighting differing operators |
| `sp_query_store_force_plan` | Forces the optimizer to reuse a specific known-good plan ID for a query |

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: what
does forcing a plan with Query Store actually buy you, and why is it
described as a stabilizer rather than a permanent fix?
