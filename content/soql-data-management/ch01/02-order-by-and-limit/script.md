# Script — ORDER BY & LIMIT

## Segment 1 (title)

Sorting and capping results is one of the most familiar parts of SOQL — and also where the syntax quietly moves on you. ORDER BY works exactly like T-SQL. LIMIT does the same job as T-SQL's TOP, but it doesn't sit in the same place.

## Segment 2 (code: sorting, familiar plus one extra)

ORDER BY StageName ascending, then Amount descending — sort on multiple fields left to right, exactly like T-SQL. SOQL adds one real extra: NULLS FIRST or NULLS LAST, giving you direct control over where nulls land that T-SQL doesn't expose.

## Segment 3 (code: same job, different address)

Here's the actual difference. T-SQL's TOP sits right up front next to SELECT. SOQL's LIMIT does the same job — capping the row count — but it's written at the very end of the query, after ORDER BY, the way MySQL or PostgreSQL do it. Get the placement wrong and the query won't parse.

## Segment 4 (outro)

Clause order is fixed: WHERE, then ORDER BY, then LIMIT, then OFFSET if you're paging through results. Next up: comparison and logical operators — equals, LIKE, and IN.
