# Lesson 4 — Reading Vendor Documentation Like a Developer, Not a DBA

**Chapter 1 · The Landscape · Lesson 4 of 5**

## What you'll learn

- Where each vendor's official SQL reference lives
- How to read a syntax diagram without getting lost
- Why the "compatible with standard SQL" callouts matter more than they look
- Why you need to check the version, every time

## Where the official docs actually live

Bookmark these now — you'll return to them constantly throughout this course:

| Platform | Official docs |
|---|---|
| SQL Server | learn.microsoft.com |
| Oracle | docs.oracle.com |
| MySQL | dev.mysql.com/doc |
| PostgreSQL | postgresql.org/docs |

Each of these is the primary source — more current and more authoritative than any blog post or
Stack Overflow answer, including ones in this course. When in doubt, go to the source.

## Reading a syntax diagram

Vendor docs describe SQL commands with syntax diagrams: a formal notation showing every valid
way to write a statement. The notation varies slightly by vendor, but the conventions are similar
enough once you know what to look for:

```sql
-- A typical syntax-diagram convention (illustrative, not any one vendor's
-- exact notation):
--   UPPERCASE words      = literal keywords, type them exactly
--   lowercase words       = placeholders you fill in
--   [ square brackets ]   = optional
--   { curly braces | ... } = choose exactly one of the listed options
--   ...                   = the preceding item can repeat

SELECT [ TOP (n) ] column_list
FROM table_name
[ WHERE search_condition ]
[ ORDER BY column_list ]
```

As a developer rather than a DBA, you mostly care about the syntax diagram and the examples right
below it — you can usually skip the sections on storage internals, memory configuration, and
security permissions that surround it on the same page.

## Look for "compatible with standard SQL" callouts

Good vendor docs will flag, right in the text, when a feature is part of the ANSI/ISO standard
versus a vendor-specific extension. PostgreSQL's documentation is especially good about this. Pay
attention to these callouts — they tell you directly whether what you just learned will carry over
to another platform or not, which is exactly the skill this course is built around.

## Always check the version

Dialect behavior changes between major versions — sometimes significantly. A feature might not
exist in an older version you're required to support at work, or syntax you remember may have been
replaced by something cleaner in a newer release (Oracle's IDENTITY columns, built on sequences
under the hood, are a good example — added in Oracle 12c, not available before it). Always confirm
which version a doc page applies to before you rely on it, especially for anything you found via a
general web search rather than the vendor's own current docs.

## Key terms

| Term | Meaning |
|---|---|
| Syntax diagram | A formal notation showing every valid way to write a SQL statement |
| Standard-SQL callout | A note in vendor docs flagging whether a feature is ANSI/ISO-standard or vendor-specific |
| Version-specific behavior | Documented differences in how a feature works between major releases of the same platform |

## Lab

Pick one platform you haven't used much (Oracle or PostgreSQL are good choices if you're T-SQL-
heavy). Go to its official docs and find the syntax diagram for `SELECT`. Identify one optional
clause and one piece of vendor-specific syntax the diagram includes that you don't recognize from
T-SQL.

## Check yourself

You're ready for Lesson 5 when you can list all four official doc sites from memory and explain why
checking the documented version matters, with a concrete example.
