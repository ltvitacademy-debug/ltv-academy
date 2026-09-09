# Lesson 28 — Why Apache Spark?

**Chapter 3 · Apache Spark Fundamentals · Lesson 28 of 62**

## What you'll learn

- The actual problem Spark exists to solve — not just "it's popular"
- Where Pandas genuinely stops working, using this course's own data
- Why Spark specifically, briefly, versus what came before it
- What's coming in this chapter, before Chapter 4's PySpark

## Where Pandas stops working

Chapter 2's Pandas runs entirely on **one machine**, in that machine's
memory. A single month of NYC Taxi data — a few million rows — fits
comfortably. But the real, full historical TLC dataset goes back to
2009: hundreds of millions of trips, spanning hundreds of files, adding
up to far more data than any single machine's memory can hold at once.
Pandas doesn't fail gracefully at that point — it runs out of memory
and crashes.

## The actual problem Spark solves

**Apache Spark** processes data by spreading it across **many
machines** at once — a **cluster** — instead of requiring it to fit on
one. Each machine handles a slice of the data in parallel, and Spark
coordinates the whole thing so it behaves, from your code's perspective,
like one big computation rather than dozens of separate ones running
side by side.

## Briefly, where Spark came from

Spark's direct predecessor, **Hadoop MapReduce**, solved the same
"data too big for one machine" problem — but it wrote intermediate
results to disk between every step, which was reliable but genuinely
slow. Spark's core innovation was doing as much of that intermediate
work **in memory** instead, which made it dramatically faster for the
kind of multi-step processing (Chapter 4's PySpark transformations) real
data engineering actually does.

## What this chapter covers before PySpark

This chapter (11 lessons) builds the conceptual foundation Chapter 4's
hands-on PySpark work assumes you already have:

- Distributed computing, clusters, and nodes (Lessons 29, 32)
- Spark's actual architecture — driver, executors (Lessons 30–31)
- Partitions (Lesson 33) — Spark's *own* meaning, distinct from Lesson
  9's storage partitioning
- Lazy evaluation and the transformations-vs-actions distinction
  (Lessons 34–35)
- `SparkSession`, Spark DataFrames, and Spark SQL (Lessons 36–38)

## Key terms

| Term | Meaning |
|---|---|
| Cluster | Multiple machines working together on one computation |
| Apache Spark | A framework for distributed data processing across a cluster |
| Hadoop MapReduce | Spark's predecessor — solved the same problem, slower, disk-based |

## Lab

No cluster needed for this one — just reflect: think of a dataset you've
worked with (or this course's full NYC Taxi history) that's genuinely
too large for one machine's memory. What would break first if you tried
to `pd.read_csv()` all of it at once?

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: what
actual problem does Spark solve that Pandas structurally cannot, and
what was Spark's key improvement over Hadoop MapReduce?
