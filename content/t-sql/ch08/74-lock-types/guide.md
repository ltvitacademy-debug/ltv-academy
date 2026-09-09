# Lesson 74 — Lock Types

**Chapter 8 · Transactions and Error Handling · Lesson 3 of 7**

## What you'll learn

- What a lock is — how SQL Server enforces Isolation (Lesson 73)
- Shared locks vs. exclusive locks
- Lock granularity: row, page, table
- Why locks are usually invisible to you

## What is a lock?

A **lock** is how SQL Server prevents two transactions from interfering
with each other's data at the same moment — the actual mechanism behind
the **Isolation** property from Lesson 73. When a transaction needs to
read or change data, it acquires a lock on that data first, which
controls what **other** transactions are allowed to do with it at the
same time.

## Shared locks (read)

A **shared lock** is acquired when a transaction **reads** data. Multiple
transactions can hold shared locks on the **same** data simultaneously —
reading doesn't conflict with other reading. This is why many people can
run `SELECT` against the same table at once without blocking each other.

## Exclusive locks (write)

An **exclusive lock** is acquired when a transaction **changes** data
(`INSERT`, `UPDATE`, `DELETE`). Only **one** transaction can hold an
exclusive lock on a given piece of data at a time — and while it's held,
other transactions can't read **or** write that same data until it's
released. This is what prevents two transactions from corrupting the same
row by changing it simultaneously.

## Lock granularity: how much gets locked

SQL Server can lock at different **levels of granularity**:

| Granularity | Locks |
|---|---|
| Row | A single row |
| Page | An 8 KB page of rows |
| Table | The entire table |

SQL Server automatically chooses the granularity based on how much of the
table a statement affects — locking a single row for a targeted `UPDATE`,
but potentially escalating to page or table-level locks for operations
touching a large portion of the table, to keep lock-tracking overhead
reasonable.

## Why locks are usually invisible

For the vast majority of everyday T-SQL work, SQL Server manages locking
**automatically** — you don't explicitly request locks (there are
advanced techniques to influence this, out of scope here). What you
**do** need to understand is the consequence: when one transaction holds
a lock another transaction needs, the second transaction has to **wait**.
Lesson 75 (Concurrency and Blocking) covers exactly what that waiting
looks like and why it happens.

## Key terms

| Term | Meaning |
|---|---|
| Shared lock | Held while reading; multiple transactions can share it |
| Exclusive lock | Held while writing; only one transaction at a time |
| Lock granularity | How much data (row/page/table) a lock covers |

## Lab

No runnable lab for this lesson — instead, write out in your own words:
if Transaction A holds an exclusive lock on a row, what happens when
Transaction B tries to read that same row?

## Check yourself

You're ready for Lesson 75 when you can answer, without looking: what's
the difference between a shared lock and an exclusive lock, and can
multiple transactions hold shared locks on the same data at once?
