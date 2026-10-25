# Lesson 1 — SQL Standard vs. Vendor Dialects: Why They Diverge

**Chapter 1 · The Landscape · Lesson 1 of 5**

## What you'll learn

- What the ANSI/ISO SQL standard actually covers — and what it deliberately leaves out
- Why every vendor ships a dialect, not a pure implementation of the standard
- The three real reasons SQL dialects diverge: history, competition, and gaps in the standard
- How this course is scoped: the SQL *language*, not administration

## There is no such thing as "pure SQL" in production

You already know T-SQL deeply. What you may not have had reason to notice is that T-SQL is not
"SQL" — it's Microsoft's dialect of SQL, built on top of an ANSI/ISO standard that no vendor ships
unmodified. Every platform you'll touch in your career — Oracle, MySQL, PostgreSQL, Snowflake —
does the same thing: it implements the common core of the standard, then adds its own extensions
on top, and sometimes diverges from the standard outright where its own history pulled it a
different direction.

```sql
-- Standard SQL (ANSI/ISO) — portable across every platform in this course
SELECT CustomerId, OrderDate
FROM Orders
WHERE OrderDate >= '2024-01-01';
```

That query runs, with zero changes, on SQL Server, Oracle, MySQL, PostgreSQL, and Snowflake. Basic
`SELECT`/`FROM`/`WHERE` is where the standard is strongest and the dialects agree almost completely.
The divergence shows up as soon as you need something the standard either didn't anticipate or
left for vendors to decide.

## Why dialects diverge: three real reasons

**1. History.** SQL Server's T-SQL and Sybase's Transact-SQL share a common ancestor from the
1980s. Oracle's PL/SQL grew out of Oracle's own procedural extensions, developed independently.
MySQL was built from scratch in the 1990s with different storage-engine assumptions. These products
made different design decisions decades before today's standard existed in its current form, and
backward compatibility means those decisions are still visible today.

**2. Competitive differentiation.** Vendors add proprietary functions, syntax shortcuts, and
performance features specifically to make their platform more attractive (or to lock customers in).
Oracle's `CONNECT BY` for hierarchical queries and SQL Server's `CROSS APPLY` are both examples of a
vendor solving a real problem with a proprietary extension before the standard ever addressed it.

**3. The standard is deliberately incomplete.** The ANSI/ISO SQL standard focuses on data
definition and query language. It has never fully standardized procedural extensions (stored
procedures, control flow, exception handling) in a way every vendor adopted — which is exactly why
T-SQL, PL/SQL, and MySQL's procedural syntax look so different from each other. You'll spend most
of this course's later chapters in that gap.

```sql
-- Where they agree: basic WHERE / ORDER BY — standard SQL
SELECT ProductName, UnitPrice
FROM Products
WHERE UnitPrice > 50
ORDER BY UnitPrice DESC;

-- Where they diverge: getting only the top N rows has FOUR different syntaxes
-- across the platforms in this course (you'll see all of them in Lesson 5
-- and again in Chapter 3) — because the standard's FETCH FIRST syntax is
-- relatively recent, and every vendor already had its own way before that.
```

## What this course does and doesn't teach

This course is scoped to the **SQL language** — how you write queries, data types, and procedural
code differently across platforms. It is deliberately **not** a database administration course:
you won't find backup/restore, user security, or performance tuning internals here (LTV Academy's
DBA-focused courses cover that ground). Your T-SQL knowledge is the baseline every lesson compares
against, so expect each new dialect to be introduced in terms of "how is this different from what
you already do in T-SQL."

## Key terms

| Term | Meaning |
|---|---|
| ANSI/ISO SQL standard | The common specification all major relational platforms partially implement |
| Vendor dialect | A platform's full SQL implementation: the standard core plus its own extensions and deviations |
| T-SQL | Microsoft SQL Server's dialect |
| PL/SQL | Oracle's dialect (procedural SQL extension) |

## Lab

Pick any T-SQL query you've written recently that uses a feature beyond basic `SELECT`/`WHERE`/
`ORDER BY` (a CTE, a window function, `TOP`, string concatenation with `+`). For each feature,
write one sentence predicting whether you think it's part of the ANSI/ISO standard or a SQL Server
extension. You'll be able to check your answers as this course covers each one.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what are the three reasons SQL
dialects diverge from the standard and from each other, and why does this course focus on language
differences rather than administration?
