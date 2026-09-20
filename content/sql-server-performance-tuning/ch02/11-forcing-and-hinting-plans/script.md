# Script — Forcing & Hinting Plans

## Segment 1 (title)

Lessons 9 and 10 covered why a cached plan misbehaves and where it actually lives. This lesson is about the last resort: taking direct control over which plan SQL Server uses.

## Segment 2 (code: query hints)

Query hints steer the optimizer without rewriting the query. FORCESEEK forces an index seek instead of a scan, and OPTION MAXDOP caps parallelism for one query only — the server-wide setting stays untouched. Both are narrow, targeted, and visible right in the query text.

## Segment 3 (code: USE PLAN)

USE PLAN goes further — it hands the optimizer a complete captured plan as XML and asks it to reproduce that exact shape. It's the most powerful hint here, but also the most brittle: tied to the schema and statistics that existed at capture time, and it breaks silently the moment either one drifts.

## Segment 4 (code: sp_query_store_force_plan)

Query Store offers a more surgical alternative — sp_query_store_force_plan forces a previously captured, already-executed plan by its plan ID, entirely outside the application code. It's reversible with one statement, and the forced state is visible directly in Query Store's own views.

## Segment 5 (outro)

Chapter 7 goes deep on forcing plans through Query Store — this lesson was just the introduction to why it's usually the better option. Next up: Chapter Three begins, with the fundamentals of index design.
