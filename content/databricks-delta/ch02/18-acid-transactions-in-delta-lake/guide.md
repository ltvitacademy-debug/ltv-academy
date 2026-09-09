# Lesson 18 — ACID Transactions in Delta Lake

**Chapter 2 · Delta Lake · Lesson 18 of 57**

## What you'll learn

- ACID: a real database term, applied to files in cloud storage
- Each of the four letters, made concrete with the transaction log
- Optimistic concurrency — how two simultaneous writers actually get resolved
- Why this is the single sentence that summarizes this whole chapter's value

## ACID, quickly, as a checklist

**A**tomicity, **C**onsistency, **I**solation, **D**urability — the
classic guarantees a relational database makes about every
transaction. Foundations never needed this vocabulary, because
nothing in that course wrote data more than once, concurrently, to
the same location. Delta Lake brings these same four guarantees to
files sitting in ordinary cloud storage — no database server
required.

## Each letter, tied back to the log

| Guarantee | What it means, concretely |
|---|---|
| **Atomicity** | A commit (Lesson 17) either completes entirely or leaves no trace — never half-written |
| **Consistency** | Every reader sees a valid, complete table state — never files from two different in-progress writes mixed together |
| **Isolation** | Concurrent writers don't see each other's uncommitted changes | 
| **Durability** | Once a commit is written, it's permanent — the same durability real cloud storage already provides |

Every one of these is enforced through the exact mechanism Lesson 17
covered: numbered, append-only commits, read in strict order.

## Optimistic concurrency — how conflicts actually resolve

```
Writer A reads version 5, starts writing version 6
Writer B reads version 5, starts writing version 6 (at the same time)

Writer A commits version 6 first -- succeeds.
Writer B tries to commit version 6 -- CONFLICT.
  Delta re-checks: does B's change actually conflict with A's?
    If not: B's commit becomes version 7, automatically.
    If so: B's write fails, with a clear error to retry.
```

Delta doesn't lock the table and make one writer wait for the
other — both write optimistically, and only check for a real
conflict at commit time. This resolves cleanly far more often than
you'd expect, since most concurrent writes (different partitions,
different rows) don't actually conflict at all.

## Why this is the whole chapter's thesis

"Delta Lake adds ACID transactions to files in cloud storage" is the
single sentence that explains why every subsequent lesson in this
chapter — schema enforcement, time travel, safe `MERGE` — is even
possible at all. It all traces back to this one property.

## Key terms

| Term | Meaning |
|---|---|
| ACID | Atomicity, Consistency, Isolation, Durability — Delta's core guarantee |
| Optimistic concurrency | Writers proceed without locking; conflicts are detected and resolved at commit time |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: does
Delta Lake make one concurrent writer wait for another, or do both
writers proceed and get checked afterward?
