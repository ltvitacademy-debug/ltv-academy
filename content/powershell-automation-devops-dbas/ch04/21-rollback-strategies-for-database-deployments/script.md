# Script — Rollback Strategies for Database Deployments

## Segment 1 (title)

The SQL Server DBA course covered rollback as an operational concept. This lesson expands that for a CI/CD context: what rollback actually looks like when the deployment was automated, and the real limits on what rollback can mean once a migration has touched real data.

## Segment 2 (code: paired up/down migrations)

The cleanest strategy is a down-migration paired with every up-migration — a script that reverses exactly what the up-migration did. Adding then dropping a column is fully symmetric, as long as nothing has started depending on that column's data yet.

## Segment 3 (steps: where clean reversal breaks)

Not every change stays symmetric. If real orders pick up real status values in a column a week after it's added, dropping that column to roll back doesn't just undo a schema change anymore — it destroys real data that now exists because of it.

## Segment 4 (steps: forward-fix-only)

For changes where clean reversal isn't possible without losing data, the honest strategy is forward-fix-only: deploy a new migration that corrects the actual problem, rather than trying to travel backward to a state that no longer safely exists.

## Segment 5 (outro)

Which strategy applies should be flagged in code review, before an incident, not discovered during one. Next up: a real pipeline walkthrough, tying this whole chapter together from commit to production.
