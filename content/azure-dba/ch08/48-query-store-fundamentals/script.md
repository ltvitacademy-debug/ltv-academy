# Script — Query Store Fundamentals

## Segment 1 (title)

Execution plans and DMVs show you a query right now. None of them answer whether it was always this slow, and DMVs like query stats reset on restart. Query Store persists query text, every plan, and runtime stats to disk, across restarts.

## Segment 2 (screenshot: plan summary view)

Azure SQL Database has this on by default; on-prem you turn it on per database. This is the Plan Summary view for one query -- each dot is a time interval, colored by which of its plans ran. Two clusters at very different heights means this query ran under two meaningfully different plans.

## Segment 3 (screenshot: top resource consumers)

Top Resource Consumers ranks the top twenty-five queries by whichever metric you pick -- duration, CPU time, logical reads. This replaces guessing which query to tune first with an actual measured ranking, and drills straight into that query's own plan summary.

## Segment 4 (steps: what Query Store captures)

Query text, every plan a query has used, and runtime stats per plan, all persisted to disk. Capture mode set to automatic skips one-off ad hoc queries so the store doesn't fill with noise. This is the foundation Lesson 49 builds on.

## Segment 5 (outro)

Reading a single query's plan history and knowing which queries are worth looking at -- that's the foundation. Next up: using these exact same views to catch a query that regressed, and forcing a fix.
