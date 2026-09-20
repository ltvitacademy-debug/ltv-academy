# Script — Function Performance Pitfalls

## Segment 1 (title)

Lesson 20 flagged scalar UDFs in a WHERE clause as an anti-pattern. This lesson goes deep on exactly why, and gives you the real, better alternative: the inline table-valued function.

## Segment 2 (code: scalar UDF, opaque black box)

Before SQL Server 2019's inlining feature, and even then only for simple functions, the optimizer treats a scalar function as an opaque black box. It can't fold the function's logic into the surrounding plan, so it falls back to calling it once per row — a hidden, uncosted loop the execution plan doesn't show you directly.

## Segment 3 (code: the real fix)

An inline table-valued function returns a table through a single RETURN SELECT statement, with no procedural body. Because it's really just a parameterized view, the optimizer can substitute its definition directly into the surrounding query and optimize the whole thing as one set-based statement.

## Segment 4 (steps: recognize, then rewrite)

The signal to watch for is a scalar RETURNS type with a BEGIN END body, called against many rows. The rewrite is almost always the same: convert the body to a single RETURN SELECT returning TABLE, and change the call site from a direct function call to CROSS APPLY.

## Segment 5 (outro)

Inline table-valued functions get you reusable logic without the hidden per-row cost. Next up: batch processing techniques — chunking large DELETE and UPDATE operations safely.
