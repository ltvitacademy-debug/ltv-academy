# Lesson 11 — Designing for Idempotency

**Chapter 1 · System Design for Data Engineers · Lesson 11 of 81**

## What you'll learn

- Why retries are unavoidable, and why that makes idempotency mandatory
- Idempotency keys — giving a retry a way to recognize itself
- `MERGE`/upsert as the real mechanism, not just a definition
- Natural vs. surrogate keys, and which one dedup actually needs

## Retries are unavoidable — so idempotency isn't optional

A write can fail after it actually succeeds — the server commits
the row, then the acknowledgment back to the caller gets lost on
the network. The caller, seeing no confirmation, retries. This isn't
a rare edge case; across a large enough system, over a long enough
time, it *will* happen. **Idempotency** is the property that makes
this safe: running the same write twice produces the same result as
running it once.

Databricks & Delta Lake Lesson 29 already named this directly for a
bronze-to-silver pipeline: "a pipeline is idempotent if running it
twice on the same input produces the same result as running it
once... a non-idempotent pipeline silently corrupts data on a
second run." That's the exact property this lesson generalizes past
one pipeline, to any write in a system design.

## Idempotency keys — letting a retry recognize itself

```text
Request 1: POST /orders  {idempotency_key: "abc-123", ...}
  -> Server processes it, creates order #4471, stores "abc-123" -> #4471

Request 2 (a retry of the SAME request): POST /orders  {idempotency_key: "abc-123", ...}
  -> Server sees "abc-123" already processed, returns order #4471
     again -- WITHOUT creating a second order
```

An **idempotency key** is a value the caller generates once per
logical operation (not per network attempt) and sends with every
retry of that same operation. The receiving system stores which
keys it's already processed; a retry with a key it's already seen
gets the *original* result back, instead of being treated as a
brand-new request. Without a key like this, the server has no way
to tell "this is a retry of something I already did" apart from
"this is a genuinely new, duplicate order."

## `MERGE`/upsert — the mechanism, not just a definition

```sql
MERGE INTO FactOrders AS target
USING IncomingOrders AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

Databricks & Delta Lake Lesson 22 introduced `MERGE INTO` as the
upsert pattern; Lesson 29 showed exactly *why* it's the idempotency
mechanism a real pipeline relies on: matching on `order_id`, a
reprocessed batch updates the same rows instead of inserting
duplicates. Plain `append` has no such protection — the same batch
processed twice produces the same rows twice, which is precisely
the failure idempotency is meant to prevent. Designing for
idempotency, concretely, usually means designing the merge key, not
adding some separate "idempotency layer" on top.

## Natural vs. surrogate keys — which one dedup actually needs

```text
Natural key:    order_id from the source system (e.g., the vendor's
                own order number) -- exists BEFORE the row reaches you
Surrogate key:  OrderSK, an auto-generated integer YOUR warehouse
                assigns on load -- means nothing outside your system
```

`MERGE`'s `ON` clause has to match on something that identifies the
*same real-world fact* across a retry or a reprocessed batch — that
has to be a **natural key** (the source's own `order_id`), because a
surrogate key generated fresh on each load wouldn't be stable across
attempts. Star schema dimensions (Lesson 8) commonly use surrogate
keys internally for join performance, but the merge/dedup logic
that keeps a fact table idempotent has to key off the natural
identifier the source system actually provides.

## Key terms

| Term | Meaning |
|---|---|
| Idempotency | Running the same write twice produces the same result as running it once |
| Idempotency key | A caller-generated value letting a retry be recognized as the same operation |
| Natural key | An identifier that exists in the source data itself — what `MERGE` should match on |
| Surrogate key | A system-generated key — useful for joins, not stable enough for dedup across retries |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
would matching a `MERGE` statement's `ON` clause on a surrogate key,
instead of a natural one, break idempotency?
