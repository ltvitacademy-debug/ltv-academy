# Lesson 58 — Reading a Migration Guide: What to Look For

**Chapter 10 · Migration, Translation & Capstone · Lesson 1 of 5**

## What you'll learn

- Why real migration projects lean on vendor migration guides and tools instead of hand-translating everything
- The three sections every real migration guide covers, in the order they matter
- What Oracle SQL Developer's Migration Workbench, AWS Schema Conversion Tool (SCT), and Azure
  Database Migration Service (DMS) actually do
- Why procedural code is always the section that takes the longest, no matter which tool you use

## Why migration guides exist

Every comparison in this course so far has been hand-built, lesson by lesson, so you could see
exactly what changes and why. A real migration — moving a production SQL Server application onto
Oracle, MySQL, or PostgreSQL, or into a cloud warehouse — is too large to hand-translate line by
line. Teams instead lean on a **migration guide** (the vendor's own documentation for moving onto
their platform) and, usually, an **automated migration tool** that reads the guide's rules and
applies them at scale. Your job as the developer isn't to memorize every rule in the guide — it's
to know what to look for so you can sanity-check the tool's output and finish what it can't.

## The three sections that matter, in order

Every real migration guide — Oracle's, AWS's, Microsoft's, Google's — organizes itself around the
same three concerns, and they get harder to resolve automatically as you go down the list:

1. **Data type mapping tables** — a row-by-row table of "source type → target type," built from
   exactly the kind of comparisons Chapter 2 of this course covered (`DATETIME2` → `TIMESTAMP`,
   `NVARCHAR` → `NVARCHAR2` or `TEXT`, and so on).
2. **Unsupported or differently-behaving functions** — a list of built-in functions that either
   don't exist on the target platform or exist with different behavior (`ISNULL` vs. `NVL` vs.
   `IFNULL` vs. `COALESCE` is the exact kind of entry you'll find here).
3. **Procedural code** — stored procedures, functions, triggers, and packages. This is almost
   always flagged as the section requiring the most manual rework, because procedural dialects
   diverge the most of anything this course has covered (Chapters 5 through 8 were built entirely
   around that divergence).

## Real tools that read these guides for you

These aren't hypothetical — they're genuine tools companies use on real migrations:

- **Oracle SQL Developer's Migration Workbench** (Tools → Migration inside SQL Developer) connects
  to a source database — commonly SQL Server or MySQL — captures its schema, and generates
  equivalent Oracle DDL plus a first-pass translation of views and simple procedural objects into
  PL/SQL.
- **AWS Schema Conversion Tool (SCT)** connects to a source engine (SQL Server, Oracle, MySQL, and
  others) and a target (commonly Aurora MySQL, Aurora PostgreSQL, or Redshift), then produces an
  **assessment report**: what percentage of objects converted automatically, and an explicit list
  of "action items" for anything it couldn't convert on its own.
- **Azure Database Migration Service (DMS)**, usually paired with the free **Data Migration
  Assistant (DMA)** for the compatibility assessment step, migrates SQL Server workloads into Azure
  SQL Database or Azure SQL Managed Instance and flags blocking issues before the migration runs.

## Reading a data type mapping table

A mapping table from a real guide looks like this — notice it's the same comparison you already
know how to make from Chapter 2, just laid out for lookup instead of narration:

| Source (SQL Server) | Target (Oracle) | Note |
|---|---|---|
| `DATETIME2` | `TIMESTAMP` | Precision mapping isn't always 1:1 — check the fractional-seconds scale |
| `NVARCHAR(n)` | `NVARCHAR2(n)` | Oracle's max length differs by database character set |
| `BIT` | `NUMBER(1)` | Oracle has no native boolean type (Lesson 9 covered this directly) |

When you open a real mapping table for the first time, read it the same way: find the type you
already understand from this course, then check the "note" column for the one detail that keeps
it from being a clean 1:1 swap.

## The procedural code section is always the hard part

Every guide eventually arrives at a section titled something like "Converting Stored Procedures"
or "PL/SQL Conversion," and every one of them says, in some form, the same thing: **automated
tools translate basic query syntax well, but procedural objects almost always need a human to
finish the job.** AWS SCT's own assessment reports literally count this in "action items" per
object. That's not a tooling failure — it's a direct consequence of everything Chapters 5 through
8 showed you: `TRY/CATCH` has no literal MySQL equivalent, PL/SQL packages have no T-SQL
equivalent, and cursors behave differently enough across all four platforms that no tool can
safely guess your intent every time.

## Key terms

| Term | Meaning |
|---|---|
| Migration guide | Vendor documentation describing how to move schema and code onto their platform |
| Data type mapping table | Row-by-row lookup from a source type to its nearest target-platform equivalent |
| Assessment report | A migration tool's summary of what converted automatically vs. what needs manual rework |
| Oracle Migration Workbench | SQL Developer's built-in tool for migrating a source schema into Oracle |
| AWS SCT | Schema Conversion Tool — assesses and converts schema/code across engines, including into AWS targets |
| Azure DMS / DMA | Azure's migration service, typically paired with the Data Migration Assistant for compatibility checks |

## Lab

Pick any one type-mapping entry from the table above (`DATETIME2` → `TIMESTAMP` is a good one).
Write one sentence describing the "note" you'd want a real migration guide to spell out before you
trusted an automated tool's conversion of that type — then compare it to what Lesson 8 (Date and
Time Types Across Platforms) already told you about precision differences.

## Check yourself

You're ready for the next lesson when you can name, without looking, the three sections every real
migration guide covers, name one real tool from each of Oracle, AWS, and Microsoft, and explain why
the procedural-code section is consistently the one requiring the most manual work.
