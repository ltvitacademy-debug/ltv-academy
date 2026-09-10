# Lesson 22 — What Is KQL?

**Chapter 2 · Real-Time Data Engineering · Lesson 22 of 70**

## What you'll learn

- KQL: a real query language, purpose-built for time-series and log data
- The pipe operator — the one syntax idea that shapes everything else
- The genuine family resemblance to (and real differences from) T-SQL
- Why this course teaches it as its own language, not "SQL with different keywords"

## A real, purpose-built language

**KQL** (Kusto Query Language) is the query language for a KQL
Database (Lesson 21) — genuinely its own language, not a KQL dialect
of T-SQL, even though both are declarative query languages this
track's own T-SQL course would find familiar in spirit.

## The pipe operator — the one idea that shapes everything

```kql
RawTripEvents
| where fare_amount > 0
| project VendorID, fare_amount, pickup_time
| take 10
```

Every KQL query starts with a table name, then pipes (`|`) through
a sequence of operators — `where`, `project`, `take`, and dozens
more — each one transforming the result of the operator before it.
This is genuinely closer to Databricks & Delta Lake's method-chain
DataFrame style (`.filter().select().limit()`) than to T-SQL's
`SELECT ... FROM ... WHERE` structure, even though KQL is a query
language and PySpark's DataFrame API is not.

## Family resemblance to T-SQL, and real differences

| Concept | T-SQL | KQL |
|---|---|---|
| Filter rows | `WHERE fare_amount > 0` | `\| where fare_amount > 0` |
| Choose columns | `SELECT VendorID, fare_amount` | `\| project VendorID, fare_amount` |
| Limit rows | `TOP 10` | `\| take 10` |
| Order matters | `SELECT` written first, logically applied last | Each pipe step runs in the literal order written |

That last row is the real, substantive difference: T-SQL's clauses
have a fixed logical evaluation order regardless of how they're
typed; KQL's pipe steps execute in the exact order they're written,
top to bottom — genuinely more like a PySpark method chain than
like T-SQL.

## Why this course teaches it as its own language

Treating KQL as "SQL with different keywords" causes real
confusion the moment pipe-order semantics matter — Lesson 24's
`summarize` and Lesson 25's joins behave differently depending on
where they sit in the pipe, in a way T-SQL's clause-based structure
never requires thinking about. This chapter teaches KQL on its own
terms, drawing T-SQL and PySpark parallels only where they
genuinely hold.

## Key terms

| Term | Meaning |
|---|---|
| KQL | Kusto Query Language — the real, purpose-built language for a KQL Database |
| Pipe operator (`\|`) | Chains operators in literal written order — closer to a method chain than T-SQL clauses |
| `where` / `project` / `take` | KQL's filter/select/limit equivalents |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
does KQL's pipe-based order matter in a way T-SQL's clause order
doesn't?
