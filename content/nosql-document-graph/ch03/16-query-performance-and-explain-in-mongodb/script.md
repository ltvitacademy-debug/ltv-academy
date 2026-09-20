# Script — Query Performance & explain() in MongoDB

## Segment 1 (title)

You can create every index in the world and still not know whether MongoDB is actually using them. The answer is explain() — a real method that shows exactly what the query planner decided to do. This is the same exercise as pulling up an execution plan in SSMS; the vocabulary changes, the reasoning doesn't.

## Segment 2 (code: explain() and its modes)

explain() attaches to a query and returns the plan instead of the data. queryPlanner, the default, shows the winning plan without running it. executionStats actually runs the query and adds real numbers — documents examined, keys examined, execution time. allPlansExecution also reports the rejected candidate plans.

## Segment 3 (steps: COLLSCAN vs IXSCAN)

Inside the winning plan, the stage field tells you the single most important thing. COLLSCAN means a full collection scan — no usable index existed, the equivalent of a SQL Server table scan. IXSCAN means an index was used to jump straight to the relevant entries — the equivalent of an index seek.

## Segment 4 (code: reading executionStats)

nReturned is how many documents came back. totalDocsExamined is how many MongoDB had to look at to get there. When those two numbers are roughly equal, the index is doing its job. When docsExamined is dramatically larger than nReturned, the index isn't selective enough — the same red flag as a huge scan-to-result gap on a SQL Server plan.

## Segment 5 (outro)

explain() turns "is this query fast" from a guess into a read of real numbers. Next up: Chapter Four begins with MongoDB authentication and users — and a security gotcha every fresh install ships with.
