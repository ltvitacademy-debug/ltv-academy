# Lesson 66 — WHILE Loops

**Chapter 7 · Programming with T-SQL · Lesson 5 of 10**

## What you'll learn

- `WHILE` — repeating a block as long as a condition stays true
- Why a loop needs something that changes each pass
- `BREAK` and `CONTINUE`
- Why T-SQL developers reach for `WHILE` less often than you'd expect

## Basic WHILE loop

```sql
DECLARE @Counter INT = 1;

WHILE @Counter <= 5
BEGIN
    PRINT 'Iteration: ' + CAST(@Counter AS VARCHAR(10));
    SET @Counter = @Counter + 1;
END
```

`WHILE` checks its condition **before** each pass and keeps running the
`BEGIN`/`END` block (Lesson 65) for as long as that condition stays `TRUE`.
`@Counter` is incremented **inside** the loop — this is essential; without
something that eventually makes the condition `FALSE`, the loop runs
**forever**.

## BREAK — exiting early

```sql
DECLARE @Counter INT = 1;

WHILE @Counter <= 100
BEGIN
    IF @Counter = 5
        BREAK;
    PRINT 'Counter: ' + CAST(@Counter AS VARCHAR(10));
    SET @Counter = @Counter + 1;
END
```

`BREAK` exits the loop **immediately**, regardless of what the `WHILE`
condition would otherwise say — here, the loop is set up to run up to 100
times, but `BREAK` stops it at 5.

## CONTINUE — skipping to the next pass

```sql
DECLARE @Counter INT = 0;

WHILE @Counter < 10
BEGIN
    SET @Counter = @Counter + 1;
    IF @Counter % 2 = 0
        CONTINUE;
    PRINT 'Odd number: ' + CAST(@Counter AS VARCHAR(10));
END
```

`CONTINUE` skips the **rest** of the current pass and jumps straight back
to re-checking the `WHILE` condition — here, even numbers are skipped
(`% ` is the modulo/remainder operator) without stopping the loop entirely.

## Why WHILE is used less than you'd expect

T-SQL is fundamentally **set-based** — it's built to operate on entire
tables of rows **at once**, which is almost always faster than looping
row-by-row with `WHILE`. Experienced T-SQL developers reach for `WHILE`
sparingly: administrative scripts, batching large deletes, or genuinely
sequential logic that can't be expressed as a set operation. When you find
yourself writing a `WHILE` loop to process rows one at a time, it's worth
asking whether a set-based query (a `JOIN`, `UPDATE`, or `CASE`) could do
the same job.

## Key terms

| Term | Meaning |
|---|---|
| `WHILE` | Repeats a block while a condition remains true |
| `BREAK` | Exits the loop immediately |
| `CONTINUE` | Skips to the next iteration's condition check |

## Lab

Run the `BREAK` example above against AdventureWorks2012 (no table needed
for this one — it's pure logic), then modify it to stop at 10 instead of
5.

## Check yourself

You're ready for Lesson 67 when you can answer, without looking: what
happens if a `WHILE` loop's condition never becomes false, and what's the
difference between `BREAK` and `CONTINUE`?
