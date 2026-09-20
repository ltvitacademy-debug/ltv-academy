# Script — Migrating SQL Server to Oracle: Key Differences

## Segment 1 (title)

Earlier chapters taught Oracle on its own terms. This lesson revisits that knowledge from a migration angle — the specific, concrete differences a SQL Server-to-Oracle migration has to address, not a generic relational-database comparison.

## Segment 2 (code: TOP vs. ROWNUM)

SQL Server's TOP has no direct Oracle equivalent. Older Oracle code uses ROWNUM, which filters before the ORDER BY logically executes — a classic source of wrong results. Oracle 12c and later support the ANSI-standard FETCH FIRST ROWS ONLY, which behaves the way a SQL Server developer expects.

## Segment 3 (code: IDENTITY vs. sequences)

SQL Server's IDENTITY auto-generates values with no extra object. Older Oracle required a SEQUENCE plus a BEFORE INSERT trigger to emulate it. Oracle 12c introduced GENERATED AS IDENTITY, much closer to SQL Server's syntax — so knowing the target Oracle version changes the scope of this piece significantly.

## Segment 4 (steps: empty string and case folding)

Oracle treats an empty string as NULL for VARCHAR2 and CHAR columns — a well-known, dangerous gotcha. A WHERE clause checking for empty string never matches in Oracle and has to be rewritten as IS NULL. Separately, Oracle folds unquoted object names to uppercase by default, the opposite of SQL Server's case-preserving behavior.

## Segment 5 (outro)

Both of these gotchas pass testing with small data and fail quietly in production if missed. Next up: the key differences a SQL Server-to-PostgreSQL migration has to address instead.
