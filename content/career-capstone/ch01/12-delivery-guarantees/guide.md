# Lesson 12 — Exactly-Once vs. At-Least-Once Delivery

**Chapter 1 · System Design for Data Engineers · Lesson 12 of 81**

## What you'll learn

- Three delivery guarantees, and why one of them is a genuine impossibility
- Why true exactly-once delivery can't exist across an unreliable network
- How Lesson 11's idempotency turns at-least-once into "effectively exactly-once"
- Seeing this in practice: Fabric's Eventstream and Databricks's Autoloader

## Three guarantees, one of them impossible

```text
At-most-once:   send once, don't retry -- message might get lost,
                 never duplicated
At-least-once:  retry until confirmed -- message might get
                 duplicated, never lost
Exactly-once:   ...delivered once, no loss, no duplication
```

At-most-once and at-least-once are both real, achievable choices —
they trade loss against duplication. **True** exactly-once delivery,
at the network layer, is not actually achievable: a sender can never
be fully certain whether its message was received and the
*acknowledgment* was lost, or whether the message itself never
arrived at all. Retrying risks a duplicate; not retrying risks a
loss. There is no third option at that layer — this is a known
result, not a gap in tooling.

## "Effectively exactly-once," via idempotency

```text
At-least-once delivery (retries on any doubt)
     +
Idempotent processing (Lesson 11 -- MERGE on a natural key)
     =
Effectively exactly-once RESULT
   (duplicates may arrive, but never change the outcome)
```

This is the actual resolution real systems use: accept at-least-
once delivery (retry whenever there's doubt, accepting some
duplicates will arrive), and make the *processing* of each message
idempotent (Lesson 11), so a duplicate arriving has zero effect on
the result. The guarantee shifts from "the network never sends it
twice" (impossible) to "sending it twice never matters" (fully
achievable) — this is why Lesson 11 came immediately before this
one; idempotency is the mechanism, not a side note.

## Seeing it in Databricks: Autoloader's checkpoint

Databricks & Delta Lake Lesson 32 already showed this pattern
concretely. Autoloader's `checkpointLocation` provides "correct,
once-only processing per file guaranteed by the checkpoint" — not
because the underlying file system promises exactly-once delivery
(it doesn't), but because the checkpoint makes reprocessing a file
it's already recorded a no-op. Delivery is at-least-once; the
*result* is exactly-once.

## Seeing it in Fabric: Eventstream

```text
Eventstream source -> [event might be redelivered on a retry] ->
    destination table
```

Fabric's Eventstream (Fabric Lesson 19) is built the same way:
sources are expected to occasionally redeliver an event rather than
risk losing one. A destination table that lands events keyed on a
stable event ID, using the same `MERGE` mechanism Lesson 11
described, absorbs that redelivery without producing a duplicate
row — the delivery guarantee underneath is at-least-once; the
observed guarantee, because of how the destination is designed, is
effectively exactly-once.

## Key terms

| Term | Meaning |
|---|---|
| At-most-once | No retries — risks losing messages, never duplicates them |
| At-least-once | Retries on doubt — risks duplicates, never loses a message |
| True exactly-once | Not achievable across an unreliable network — a known impossibility |
| Effectively exactly-once | At-least-once delivery + idempotent processing — the real, achievable answer |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
is "effectively exactly-once" a fundamentally different claim than
"exactly-once delivery," even though the end result looks identical?
