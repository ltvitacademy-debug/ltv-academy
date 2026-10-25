# Lesson 102 — What Is a Lock, and Why SQL Server Needs Them

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 3 of 30**

## What you'll learn

- What a lock actually is inside SQL Server
- Which ACID property (Lesson 101) locking exists to enforce
- The "lock manager" and the basic who-holds-what-on-what model
- Why you can't just turn locking off

## The problem locking solves

Lesson 101 covered ACID's **Isolation** property: concurrent transactions
shouldn't see each other's incomplete work. That's a nice guarantee to
state, but *how* does SQL Server actually make it true when dozens of
sessions are reading and writing the same tables at the same second?

The answer is **locking**. A lock is a flag the database engine attaches to
a resource — a row, a page, a table, among others — recording that some
transaction currently has a claim on it, and what kind of claim it is. Every
other transaction that wants to touch that same resource has to check in
with the **lock manager** first.

## A concrete scenario

Imagine two SSMS query windows open against AdventureWorks2012 — think of
them as two different users, Session A and Session B. Session A starts a
transaction that updates a product's price:

```sql
-- Session A
BEGIN TRANSACTION;

UPDATE Production.Product
SET ListPrice = 25.00
WHERE ProductID = 680;
-- transaction left open on purpose, not yet committed
```

At this instant, Session A holds an exclusive lock (the subject of Lesson
104) on that row. Session B, running at the very same moment, tries to read
it:

```sql
-- Session B
SELECT ListPrice
FROM Production.Product
WHERE ProductID = 680;
```

Session B doesn't get back a half-written, in-progress value — it waits.
The lock manager sees Session A's lock on that row, sees Session B's
request conflicts with it, and makes Session B's query block until Session
A either `COMMIT`s or `ROLLBACK`s. That blocking isn't a bug or a
performance accident; it is Isolation, implemented.

## The lock manager's job

Internally, SQL Server keeps a lock manager — think of it as a table of
**who holds what kind of lock on which resource**. Every statement that
reads or writes data has to request the appropriate lock from the lock
manager before it touches that resource. If the request is compatible with
what's already held (two readers, for instance), it's granted immediately.
If it conflicts, the requester waits.

The next several lessons in this chapter work through each *kind* of lock
SQL Server hands out — shared, exclusive, update, intent, and schema locks —
because "a lock" isn't one thing. Different kinds of work need different
kinds of claims, and the kind of lock taken is exactly what determines
whether two transactions can proceed together or must wait on each other.

## Why you can't just turn it off

It's tempting to think locking is pure overhead you'd be better off
without. You can't meaningfully disable it, because without it you'd lose
Isolation entirely: readers could see half-committed writes, two writers
could stomp on each other's changes, and the "Consistency" property from
Lesson 101 would be unenforceable. Locking is the mechanism, not an
optional add-on — later chapter lessons on isolation levels are really
about *how much* locking behavior you can relax, never about removing it
outright.

## Key terms

| Term | Meaning |
|---|---|
| Lock | A flag recording that a transaction holds a claim on a resource |
| Lock manager | The internal component tracking who holds which lock on what |
| Blocking | A transaction waiting because its lock request conflicts with an existing one |

## Lab

Open two SSMS query windows against AdventureWorks2012. In the first, run
the `BEGIN TRANSACTION` / `UPDATE` above and leave it open. In the second,
run the `SELECT` against the same `ProductID`. Watch it hang. Then go back
to the first window and run `COMMIT TRANSACTION` (or `ROLLBACK
TRANSACTION`) — watch the second window's query return immediately.

## Check yourself

You're ready for Lesson 103 when you can answer, without looking: which
ACID property does locking exist to enforce, and what, concretely, makes
Session B's `SELECT` wait in the scenario above?
