# Script — Aggregation Pipeline Fundamentals

## Segment 1 (title)

find() filters and shapes a single query's worth of documents, but it can't group data or reshape it through multiple steps the way GROUP BY and CTEs can in SQL. For that, MongoDB has the aggregation pipeline.

## Segment 2 (code: a pipeline is an array of stages)

An aggregation pipeline runs with aggregate(), and the argument is an array of stage documents. Each stage takes the documents from the previous stage, does one job, and passes its output forward. Read it left to right — filter, then sort, then limit.

## Segment 3 (code: $match)

$match uses the exact same query operators as find() — $eq, $gt, $in, all of it — but as a pipeline stage. Put it as early as possible. Just like a WHERE clause narrowing rows before expensive work in SQL Server, an early $match can use an index and cuts down what later stages have to process.

## Segment 4 (code: $project)

$project looks like a find() projection, but inside a pipeline it can also compute new fields, not just include or exclude existing ones. That's the aggregation equivalent of a computed column in a SELECT list.

## Segment 5 (steps: match, sort, limit)

$sort and $limit work exactly like ORDER BY and TOP. Order matters — sort before you limit, or you'll cap the input before it's actually ordered, the same trap as forgetting ORDER BY before TOP in T-SQL.

## Segment 6 (outro)

Match, project, sort, and limit get you a long way, but they can't do joins or grouping on their own. Next: $lookup, $group, and $facet — the aggregation stages that do the heavier lifting.
