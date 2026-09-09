# Lesson 73 — ACID Properties

**Chapter 8 · Transactions and Error Handling · Lesson 2 of 7**

## What you'll learn

- `ACID` — the four properties transactions guarantee
- What each letter actually means in practice
- How ACID relates to what you already learned about `COMMIT`/`ROLLBACK`

## What is ACID?

`ACID` is an acronym for the four properties a properly implemented
transaction (Lesson 72) guarantees: **Atomicity**, **Consistency**,
**Isolation**, **Durability**. These aren't abstract theory — each one
maps directly onto something you already saw last lesson.

## Atomicity

**All or nothing.** Every statement inside a transaction either **all**
succeed together, or the entire transaction is undone. This is exactly
what `COMMIT`/`ROLLBACK` implement — the inventory-transfer example from
Lesson 72 is atomicity in action: both `UPDATE`s happen, or neither does.

## Consistency

A transaction can only take the database from one **valid** state to
another valid state — it can never leave data violating a rule the
database enforces (a `CHECK` constraint, a foreign key, Chapter 11's
topics). If a transaction's changes would break such a rule, the whole
transaction fails rather than silently corrupting the data.

## Isolation

Concurrent transactions — multiple users or processes running at the same
time — shouldn't see each other's **incomplete** work. One transaction's
in-progress changes stay invisible to others until it commits. (Chapter
8's Lesson 75, Concurrency and Blocking, covers exactly how SQL Server
enforces this.)

## Durability

Once a transaction **commits**, its changes survive — even a server crash
or power failure immediately afterward can't undo a committed transaction.
`COMMIT` isn't just "mark as done in memory"; it's a genuine, permanent
write.

## Why this matters practically

You don't need to recite the acronym on the job — but understanding what
each letter guarantees explains **why** transactions behave the way they
do, and helps you reason about what can (and can't) go wrong when multiple
processes touch the same data at once.

## Key terms

| Letter | Property | Meaning |
|---|---|---|
| A | Atomicity | All statements succeed, or none do |
| C | Consistency | Only valid states are ever reached |
| I | Isolation | Incomplete transactions stay invisible to others |
| D | Durability | Committed changes survive, permanently |

## Lab

Revisit Lesson 72's inventory-transfer example and identify, in your own
words, which ACID property each part of that example demonstrates.

## Check yourself

You're ready for Lesson 74 when you can answer, without looking: what
does each letter in `ACID` stand for, and which one specifically
guarantees that a committed change survives a crash?
