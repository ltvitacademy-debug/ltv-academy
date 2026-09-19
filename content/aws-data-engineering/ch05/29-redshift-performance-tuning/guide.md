# Redshift Performance Tuning

The rest of this chapter gave you the levers: how data is stored, distributed, sorted, and
queued. This lesson is about actually **diagnosing** a slow query and knowing which lever to
pull — the maintenance commands and the query plan reading skill that turn "Redshift is slow"
into a specific, fixable cause.

## What you'll learn

- VACUUM and ANALYZE, and why both are routine maintenance, not one-time setup
- Reading a query plan with EXPLAIN
- Cross joins, and why they're an expensive default to fall into
- How this lesson's tools connect back to distribution and sort keys

## VACUUM

When rows are updated or deleted in Redshift, the old versions aren't removed immediately —
they're marked for reclaiming. **VACUUM** reclaims that space and, just as importantly,
**re-sorts** rows back into SORTKEY order, since new inserts and updates land at the end of a
table rather than in sorted position. A table that goes a long time without a VACUUM after
heavy write activity slowly loses the zone-map skipping benefit from Lesson 26, because its
physical row order drifts away from its declared SORTKEY. Modern Redshift auto-vacuums in the
background under normal conditions, but heavy-write pipelines still benefit from knowing this
command exists and what it's fixing.

## ANALYZE

**ANALYZE** updates a table's statistics — row counts, distinct value estimates per column —
that Redshift's query planner uses to decide *how* to execute a query: which join algorithm to
pick, which table to scan first. Stale statistics after a large load or bulk delete can lead
the planner to a genuinely bad plan, even though your DISTKEY and SORTKEY are correctly chosen.
Like VACUUM, Redshift runs this automatically in many cases, but a manual `ANALYZE` after a
large COPY is a standard step in a serious pipeline.

## Reading a query plan with EXPLAIN

`EXPLAIN SELECT ...` shows the plan the query optimizer chose, without running the query. The
two things worth scanning for: a **sequential scan** over a large table when you expected an
index-like skip (a sign your SORTKEY or filter don't line up), and a broadcast or shuffle step
that moves a large amount of data between nodes (a sign your DISTKEY doesn't match your join
column). `EXPLAIN` turns "this query is slow" from a guess into a specific, visible cause.

## Cross joins

A **cross join** — every row of one table paired with every row of another, whether from an
explicit `CROSS JOIN` or an accidental missing `WHERE`/`ON` condition — produces a result set
sized by *multiplication*, not addition. Two 100,000-row tables cross-joined produce ten
billion rows. It's almost always an accident, and `EXPLAIN` will show it as a nested loop over
the full row count of both tables — one of the fastest ways to make a cluster grind to a halt.

## Key terms

| Term | Meaning |
|---|---|
| VACUUM | Reclaims space from deleted/updated rows and re-sorts rows into SORTKEY order |
| ANALYZE | Updates table statistics the query planner uses to choose an execution plan |
| EXPLAIN | Shows a query's execution plan without running it |
| Cross join | Every row of one table paired with every row of another; result size multiplies |

## Check yourself

`EXPLAIN` on a slow query shows a large amount of data being shuffled between nodes during a
join. Which lesson's concept does this point back to, and what change would you make to the
tables involved?
