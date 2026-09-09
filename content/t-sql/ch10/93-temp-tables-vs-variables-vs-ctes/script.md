# Lesson 93 — Temp Tables vs. Table Variables vs. CTEs: Performance Tradeoffs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Three ways to hold an intermediate result set in T-SQL: a temp table, a
table variable, or a CTE. They can look almost interchangeable in a script —
but under the hood, SQL Server treats them very differently.

## S2 · CODE CARD (#temp table)

A local temp table, prefixed with a single pound sign, is a real table,
physically stored in tempdb. Crucially, SQL Server maintains real
statistics on it — row counts the optimizer can trust. You can add indexes
to it explicitly. That makes it the right choice for large result sets
you're going to touch more than once.

## S3 · CODE CARD (@table variable)

A table variable also lives in tempdb, but it's scoped to the batch it's
declared in, and — historically — the optimizer doesn't maintain real
statistics for it. It just assumes a small, fixed row count. For a handful
of rows inside a stored procedure, that's actually a feature: fewer
recompiles. For a large result set, it can badly mislead the optimizer.

## S4 · CODE CARD (CTE)

A CTE isn't a table at all. It's a named subquery that gets inlined
wherever you reference it. Nothing is stored. Reference the same CTE three
times in one query, and SQL Server may literally re-run its underlying
logic three separate times, unless it decides on its own to spool the
result.

## S5 · STEPS CARD (decision rule)

So here's the rule. Large, reused, might need its own index — temp table.
Small, inside a procedure, want to avoid recompiles — table variable. Just
organizing one query for readability, or writing recursion like Lesson 57's
bill-of-materials walk — CTE.

## S6 · OUTRO CARD

Same job, three tools, three very different performance stories depending
on size. Next lesson wraps up Performance Tuning: the common T-SQL
anti-patterns worth learning to spot on sight. See you there.
