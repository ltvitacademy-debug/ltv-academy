# Lesson 31 — Driver and Executors

**Chapter 3 · Apache Spark Fundamentals · Lesson 31 of 62**

## What you'll learn

- Exactly what the Driver sends to Executors — and what it's not
- What comes back from an Executor, and when
- Why this relationship is the whole reason Lesson 34's lazy evaluation
  exists
- A closer look at the same real diagram from Lesson 30

## Zooming into one relationship

Lesson 30 showed the full architecture. This lesson zooms into just one
connection in it — the Driver talking to an Executor:

![The same official Apache Spark architecture diagram from Lesson 30, with the Driver Program and one Worker Node's Executor highlighted as the two ends of the relationship this lesson focuses on.](/courses/de-foundations/ch03/31-driver-and-executors/cluster-overview.png)
*Same diagram, narrower focus: what actually travels between the Driver on the left and an Executor on the right.*

## What the Driver actually sends

The Driver doesn't send *data* to Executors — it sends **instructions**:
a serialized description of the computation to run (in PySpark terms,
your DataFrame operations, compiled down into a plan), plus which piece
of data, already sitting on that Executor's machine (Lesson 29's data
locality), to run it against. The Driver builds this entire plan
*before* any Executor does a single unit of real work.

## What comes back — and when

Executors don't send their full results back to the Driver by default —
doing that for a large dataset would just recreate the exact memory
problem Lesson 28 said Spark exists to avoid. Instead:

- For most operations, Executors write their results to storage
  directly, and only report back that they're **done**
- For a genuinely small result — a `count()`, a `collect()` on a tiny
  DataFrame — the Executors *do* send the actual values back, because
  the Driver explicitly asked for them

This distinction is exactly what Lesson 35 calls **transformations**
(stay distributed, no data returned to the Driver) versus **actions**
(trigger real work and return something to the Driver).

## Why this relationship is why lazy evaluation exists

Because the Driver builds the *entire plan* before any Executor starts
running, Spark can look at everything you're about to do **at once** and
optimize it — skip unnecessary steps, combine several operations into
one pass over the data — instead of running each line of your code
immediately, one at a time, the way Pandas does. Lesson 34 explains
exactly how that works; this lesson is why it's even possible.

## Key terms

| Term | Meaning |
|---|---|
| Serialized instructions | The computation plan the Driver sends, not the data itself |
| Transformation | An operation that stays distributed — no data returned to the Driver |
| Action | An operation that triggers real work and returns something to the Driver |

## Lab

No cluster needed — reason through this: if you called `.count()` on a
500-million-row Spark DataFrame, would the Executors send 500 million
rows back to the Driver, or something much smaller? What, specifically?

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: what
does the Driver actually send to an Executor, and why don't Executors
send their full results back by default?
