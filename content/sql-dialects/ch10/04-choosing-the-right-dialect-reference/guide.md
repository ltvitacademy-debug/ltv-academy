# Lesson 61 — Choosing the Right Dialect Reference for the Job

**Chapter 10 · Migration, Translation & Capstone · Lesson 4 of 5**

## What you'll learn

- Which authoritative documentation source to trust for each platform this course covered
- Why PostgreSQL's own documentation is a genuine standout worth knowing about
- The one practical habit — checking the version — that prevents the most real-world confusion
- Where to look for the cloud warehouse platforms this course only briefly introduced

## This course ends; your need for a reference doesn't

Nine chapters of comparison can't cover every function, every edge case, on every platform,
forever. What this course can leave you with is the right habit: knowing exactly which source to
open first for each dialect, and how to read it correctly once you're there.

## The five references worth bookmarking

| Platform | Authoritative source |
|---|---|
| T-SQL | **learn.microsoft.com** — Microsoft's official SQL Server / T-SQL reference, organized by statement and function, versioned by SQL Server release and by Azure SQL |
| PL/SQL (Oracle) | **docs.oracle.com** — Oracle's official Database SQL Language Reference and PL/SQL Language Reference, versioned by database release (19c, 21c, 23ai, and so on) |
| MySQL | **dev.mysql.com/doc/refman** — the MySQL Reference Manual, versioned per major release (8.0, 8.4, and so on) |
| PostgreSQL | **postgresql.org/docs** — genuinely excellent, detailed, versioned per major release (13 through 17 and beyond) |
| Cloud warehouses | Each vendor's own docs — Snowflake's docs.snowflake.com, Databricks's docs.databricks.com, Google's cloud.google.com/bigquery/docs, and AWS's docs.aws.amazon.com/redshift |

## PostgreSQL's documentation deserves a specific callout

Of every reference in this table, PostgreSQL's is worth a direct mention: it is widely regarded as
some of the best technical documentation in the entire open-source world — not just adequate, but
genuinely thorough, with real worked examples for nearly every function and a clear, consistent
structure across releases. If you only remember one specific recommendation from this lesson,
remember that `postgresql.org/docs` is worth opening even when you're not sure PostgreSQL has the
answer — it usually does, and it usually explains it well.

## The one habit that matters most: check the version

```text
-- The question to ask before trusting ANY doc page:
-- "Does this page match the ACTUAL version/edition I'm running against?"
```

Every single platform in this course has genuinely changed behavior across major versions —
this isn't a hypothetical caution, it's something you've already seen directly:

- **MySQL 8.0** added CTEs and window functions that simply didn't exist before (Lesson 60's
  capstone depended on this).
- **MySQL's `sql_mode` defaults** tightened starting at 5.7, changing how strictly types and
  values are enforced (Lesson 59).
- **SQL Server / Azure SQL** editions differ in which features are available at all — some
  T-SQL syntax that works on SQL Server Enterprise or Azure SQL doesn't exist on every edition.
- **Oracle** has introduced new PL/SQL features release by release (23ai added genuinely new
  capabilities that don't exist on 19c).

A doc page without a version selector, or one you opened without checking which version it's
describing, can describe behavior your actual database doesn't have — or omit a feature your
actual database does have. Get in the habit of confirming the version/edition on both sides: what
you're running, and what the page you're reading is describing.

## Key terms

| Term | Meaning |
|---|---|
| `learn.microsoft.com` | Microsoft's official docs source for T-SQL, SQL Server, and Azure SQL |
| `docs.oracle.com` | Oracle's official docs source for the Database SQL and PL/SQL Language References |
| `dev.mysql.com/doc/refman` | The official MySQL Reference Manual, versioned by major release |
| `postgresql.org/docs` | PostgreSQL's official, versioned documentation — exceptionally thorough |
| Version gate | A documented behavior or feature that only applies from a specific release onward |

## Lab

Pick any one platform from this course and open its official docs. Find the version selector (or
version-specific URL path) and confirm it matches a real, current release of that platform — then
write one sentence naming a feature from this course (CTEs on MySQL, a PL/SQL feature, etc.) that
would be missing or different on an older version of the same docs.

## Check yourself

You're ready for the final lesson when you can name the authoritative doc source for all five
platform categories in this course without looking, and explain why checking the version is the
single habit that matters most once you're working from documentation on your own.
