# Lesson 75 — Concurrency and Blocking

**Chapter 8 · Transactions and Error Handling · Lesson 4 of 7**

## What you'll learn

- What "blocking" actually is — one transaction waiting on another's lock
- Blocking is normal, not a bug
- Deadlocks — when two transactions block each other
- How SQL Server resolves a deadlock

## What is blocking?

**Blocking** happens when Transaction B needs a lock that Transaction A
is currently holding (Lesson 74) — B simply **waits** until A releases
it. This is completely normal, expected behavior, not an error. Every
multi-user database experiences blocking constantly; it's how
**Isolation** (Lesson 73) actually gets enforced when two transactions
genuinely need the same data at the same moment.

## When blocking becomes a problem

Blocking becomes a **practical** problem when it lasts too long —
long-running transactions holding locks while dozens of other
transactions queue up behind them, causing an application to feel slow
or frozen. The fix is almost always **shortening transactions**: doing
only what genuinely needs to be atomic inside `BEGIN`/`COMMIT`, and
moving everything else (validation, unrelated reads) outside it.

## Deadlocks — mutual blocking

A **deadlock** is a special, more serious case: Transaction A is waiting
on a lock held by Transaction B, while Transaction B is simultaneously
waiting on a lock held by Transaction A. Neither can ever proceed —
without intervention, they'd wait **forever**.

## How SQL Server resolves a deadlock

SQL Server detects this situation automatically and picks one transaction
as the **deadlock victim** — that transaction is rolled back automatically
(Lesson 72), raising an error the application needs to handle, typically
by simply **retrying** the whole transaction. The other transaction
proceeds normally, as if nothing happened.

## Why this matters for you as a developer

You can't eliminate blocking entirely — it's fundamental to how
transactions work. What you **can** do: keep transactions short and
focused, access tables in a **consistent order** across different parts
of your application (a common cause of deadlocks is two transactions
locking the same two tables in **opposite** order), and design your
application to gracefully retry a transaction that fails due to being
chosen as a deadlock victim.

## Key terms

| Term | Meaning |
|---|---|
| Blocking | One transaction waiting for a lock another transaction holds |
| Deadlock | Two transactions waiting on each other's locks, neither able to proceed |
| Deadlock victim | The transaction SQL Server automatically rolls back to resolve a deadlock |

## Lab

No runnable lab for this lesson — instead, describe in your own words a
realistic scenario in an e-commerce application where two transactions
could deadlock over the same two tables.

## Check yourself

You're ready for Lesson 76 when you can answer, without looking: is
blocking itself a bug, and how does SQL Server resolve a deadlock once
it's detected?
