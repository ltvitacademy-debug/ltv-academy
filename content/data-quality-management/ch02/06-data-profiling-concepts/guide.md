# Lesson 6 — Data Profiling Concepts

**Chapter 2 · Profiling · Lesson 6 of 30**

## What you'll learn

- What data profiling actually is, and how it differs from data quality
  checking
- The three levels profiling typically works at: column, relationship,
  and pattern
- The core metrics every profiling pass produces
- Where profiling fits in the environment you'll use for the rest of
  this chapter

## Profiling is discovery, not judgment

Lesson 5 named "profile" as the first stage of the data quality
lifecycle, deliberately separate from "define." That separation
matters: **profiling describes what data actually contains — it
doesn't decide whether that's good or bad.** A profiling pass might
report "this column is 3% NULL" without any opinion on whether 3% is
acceptable; that judgment belongs to the *define* stage (Chapter 4),
made by the data owner and steward (Lesson 4). Profiling's only job is
to make the real shape of the data visible, because you can't set a
sensible rule for data you haven't actually looked at.

## The environment: SQL Server Management Studio

Every profiling technique in this chapter runs as a T-SQL query inside
SQL Server Management Studio (SSMS) — the same tool this catalog's
T-SQL course uses throughout. If you haven't used SSMS before: it's
Microsoft's free client for connecting to and querying SQL Server, with
an **Object Explorer** panel on the left (every database, table, and
view you can access) and a **Query Editor** on the right where you
write and run SQL.

![SQL Server Management Studio showing Object Explorer on the left, with an AdventureWorks database tree expanded (Tables, Views, Programmability), and an empty Query Editor pane on the right.](/courses/data-quality-management/ch02/06-data-profiling-concepts/ssms.png)
*SQL Server Management Studio — every profiling query in this chapter is written and run here, in a Query Editor tab like the empty one on the right.*

Lesson 7 walks through actually writing and running profiling queries
here. For now, just notice the shape: Object Explorer tells you what
tables *exist*; profiling queries tell you what's actually *inside*
them — the two are not the same thing. A table showing up in Object
Explorer confirms it exists; it tells you nothing about whether the
data inside it is any good.

## Three levels of profiling

Profiling techniques generally work at three levels, each covered by
its own lesson later in this chapter:

1. **Column profiling (Lesson 8).** Looking at one column at a time:
   how many rows, how many are NULL, how many distinct values, what's
   the min/max, what data types and lengths actually show up.
2. **Relationship profiling (Lesson 9).** Looking across tables: do
   foreign keys actually match up, are there orphaned rows, do
   supposedly-linked tables agree with each other.
3. **Pattern profiling (Lesson 9).** Looking at the *shape* of values
   within a column — does every row in a `phone` column actually look
   like a phone number, or do some rows contain text, extra characters,
   or wildly different formats?

## Core profiling metrics

Regardless of level, most profiling results boil down to a handful of
repeating metrics you'll use constantly starting next lesson:

| Metric | What it tells you |
|---|---|
| Row count | Total rows in the table — the denominator for every percentage below |
| NULL count / rate | How many rows are missing a value in a given column |
| Distinct count | How many unique values exist in a column |
| Min / max | The range of values — catches outliers and impossible values |
| Pattern/format breakdown | How many rows match an expected shape (e.g. `XXX-XXX-XXXX`) vs. don't |

## Why this matters before you write a single query

It's tempting to open SSMS and start writing `SELECT COUNT(*)` queries
immediately. Knowing the vocabulary first — column vs. relationship vs.
pattern profiling, and the five core metrics above — means that when
Lesson 7 shows you the actual T-SQL, you'll recognize what each query
is doing and why, instead of just copying syntax.

## Key terms

| Term | Meaning |
|---|---|
| Data profiling | Discovering the actual shape and content of data, without judging it |
| Column profiling | Profiling one column's values in isolation |
| Relationship profiling | Checking whether linked tables actually agree with each other |
| Pattern profiling | Checking whether values within a column match an expected shape |
| NULL rate | The percentage of rows missing a value in a given column |

## Lab

1. Pick a table you have access to (a real SQL Server database, or even
   a spreadsheet you can treat like one).
2. Without writing any code yet, write down — in plain English — what
   you'd expect a column profile, a relationship profile, and a pattern
   profile to each reveal about that table.
3. Pick one column specifically and predict its NULL rate and distinct
   count before you check. You'll verify this prediction with real SQL
   in the next lesson.

## Check yourself

Can you explain, in one sentence, why profiling is described as
"discovery, not judgment," and name the three levels profiling works
at? If yes, you're ready for Lesson 7's hands-on T-SQL profiling
queries.
