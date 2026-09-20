# Script — Parameter Sniffing

## Segment 1 (title)

Lesson 7 flagged parameter sniffing as one of the two usual causes of an estimated-versus-actual mismatch. This lesson covers the full mechanism, how to confirm it, and the real fixes.

## Segment 2 (code: the mechanism)

SQL Server compiles a plan for the first parameter value it sees, then caches and reuses that same plan for every later call — regardless of the value. That's fine until the column's data distribution is skewed.

## Segment 3 (code: the decisive test)

The decisive test is OPTION RECOMPILE — force a fresh compile using the current call's actual value. Dramatically better, with statistics already current? That confirms sniffing, not stale stats.

## Segment 4 (steps: three real fixes)

OPTION RECOMPILE gets the best plan every call but pays compile cost each time. OPTIMIZE FOR locks compilation to a chosen value or an average. Parameter Sensitive Plan optimization, new in SQL Server 2022, can cache multiple plan variants automatically.

## Segment 5 (outro)

None of these need a query rewrite — they change how and when the plan gets compiled. Next up: what's actually sitting inside the plan cache, and how ad hoc query bloat can hurt you long before sniffing ever comes up.
