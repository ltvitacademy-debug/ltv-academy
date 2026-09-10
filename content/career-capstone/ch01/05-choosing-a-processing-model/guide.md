# Lesson 5 — Choosing a Processing Model: Batch, Streaming, or Hybrid

**Chapter 1 · System Design for Data Engineers · Lesson 5 of 81**

## What you'll learn

- The single requirement that drives this choice more than any other
- Why streaming isn't just "the better version of batch"
- Hybrid as a real, common answer — not a compromise
- A decision framework using this track's own tools

## The requirement that drives this choice

Lesson 2's non-functional requirements — specifically, freshness —
answer this question almost by themselves. "Update once a night is
fine" points straight at batch. "A dispatcher needs to see this
within seconds" points straight at streaming (Fabric Chapter 2, in
full). Everything else in this lesson is detail underneath that one
answer.

## Streaming isn't just "better batch"

```
Batch:      simpler to build, easier to reason about, cheaper to
            run, easier to test (Fabric Lesson 48's whole approach
            assumes a batch-shaped pipeline is easier to unit test)
Streaming:  fresher, but genuinely more complex -- windowing
            (Fabric Lessons 30-32), watermarks (Lesson 33), and
            all of Fabric Chapter 3's production practices exist
            specifically because streaming makes things harder
```

Streaming costs more to build, run, and operate correctly — Fabric
Lesson 54's cost management lesson made this explicit for hopping
windows specifically. Choosing streaming when batch would satisfy
the actual requirement isn't more sophisticated; it's needless
cost and complexity for no real benefit.

## Hybrid — a real answer, not a compromise

```
Hot path (streaming):   the last few hours of data, fresh, for a
                        live dashboard -- Fabric's Eventstream + KQL
Cold path (batch):      everything else, reprocessed periodically
                        for accuracy and full historical reports --
                        Databricks & Delta Lake's medallion pattern
```

Most real systems that need "real-time-ish" data actually run
both: a fast, slightly-less-reliable streaming path for freshness,
and a slower, thoroughly-correct batch path for the historical
record and any reprocessing. This isn't indecision — it's
matching each requirement to the tool that actually fits it, the
same principle from Lesson 4 applied to processing instead of
storage.

## A decision framework

```
Need results within seconds/minutes, and users notice a delay?
  -> Streaming, or the hot path of a hybrid design

Nightly/hourly is genuinely fine, and simplicity has real value?
  -> Batch

Need both real-time freshness AND rock-solid historical accuracy?
  -> Hybrid -- see Lessons 6-7 for the two standard shapes this takes
```

## Key terms

| Term | Meaning |
|---|---|
| Processing model | Batch, streaming, or hybrid — chosen by freshness requirement, not sophistication |
| Hot path / cold path | Streaming for freshness, batch for accuracy, run together |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
is choosing streaming when batch would satisfy the requirement not
"more sophisticated," but actually a mistake?
