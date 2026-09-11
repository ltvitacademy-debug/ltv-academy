# Lesson 10 — Factless Fact Tables

**Chapter 2 · Fact Tables · Lesson 10 of 39**

## What you'll learn

- What a factless fact table is, and why "no measure columns" doesn't
  mean "not useful"
- The two genuinely different reasons a fact table ends up factless:
  recording events, and recording coverage
- How to design one in T-SQL, and how you actually measure something
  with it
- How this ties back to everything Chapter 2 has covered about fact
  table types

## A fact table with nothing to measure

Every fact table this chapter has covered has had at least one numeric
measure column — quantity, revenue, a duration. A **factless fact
table** is exactly what it sounds like: a fact table with no measure
columns at all. Microsoft's guidance gives the classic example directly
— a factless fact table that records students attending class. There's
no "amount" to attach to attendance; the interesting fact is simply
that the event happened, for a specific student, in a specific class,
on a specific date. The measurement comes from a different place
entirely: **counting rows**.

## Designing one in T-SQL

```sql
CREATE TABLE f_ClassAttendance
(
    -- Dimension keys
    AttendanceDate_Date_FK   INT NOT NULL,
    Student_FK                INT NOT NULL,
    Class_FK                   INT NOT NULL,

    -- Audit attributes
    AuditCreatedDate            DATE NOT NULL
);
```

The grain: *"one row per student, per class, per date attended."* No
`Quantity`, no `Amount`, nothing to `SUM()` — because the event itself,
not any number attached to it, is what's being recorded. To answer "how
many students attended Tuesday's lecture," you don't sum a measure, you
run `COUNT(*)` grouped by class and date. The row's mere existence *is*
the measurement.

## Two different reasons a table goes factless

There are actually two distinct situations that produce a factless
fact table, and it's worth telling them apart:

- **Event tables**, like attendance — every row that *does* exist
  records something that happened. Counting rows tells you how many
  events occurred.
- **Coverage tables** — the more subtle case. Imagine a table recording
  every product that was *eligible* for a promotion in a given store
  during a given week, whether or not it actually sold. Here, the
  presence of a row doesn't mean an event happened — it means a
  *condition existed*. The real analytic power shows up when you
  compare this coverage table against a transaction fact table of
  actual sales: rows that appear in coverage but *not* in sales tell
  you which eligible products didn't sell, a question a transaction
  table alone can never answer, because it simply has no row for things
  that didn't happen.

## Chapter 2, tied together

You've now seen all four ways Chapter 2 said a fact table's rows can
behave: insert-once for an event (transaction), scheduled and repeated
regardless of activity (periodic snapshot), updated in place across a
process's lifetime (accumulating snapshot), and — this lesson —
measured by counting existence rather than summing a column
(factless). Every fact table you design from here on is one of these
four, and naming which one it is, before writing a `CREATE TABLE`
statement, is the discipline this chapter has been building toward.

## Key terms

| Term | Meaning |
|---|---|
| Factless fact table | A fact table with no measure columns; measured by counting rows |
| Event factless table | Records that something happened; a row is an occurrence |
| Coverage factless table | Records that a condition existed, useful for finding what *didn't* happen when compared to a transaction table |

## Lab

Design a factless fact table recording every sales rep assigned to
every customer account in a given month (a coverage table). Then
describe, in one sentence, how you'd use it alongside a transaction
sales fact table to find accounts that were assigned a rep but
generated zero sales that month.

## Check yourself

You're ready for Chapter 3 (Dimension Tables) when you can explain why
a factless fact table is still a legitimate fact table, the difference
between an event factless table and a coverage factless table, and
which of the four fact table types (transaction, periodic snapshot,
accumulating snapshot, factless) fits a given business scenario without
looking anything up.
