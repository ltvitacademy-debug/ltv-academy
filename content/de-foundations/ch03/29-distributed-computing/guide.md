# Lesson 29 — Distributed Computing

**Chapter 3 · Apache Spark Fundamentals · Lesson 29 of 62**

## What you'll learn

- What "distributed computing" actually means, as a general idea
- **Data locality** — why Spark moves computation to the data, not data
  to the computation
- **Fault tolerance** — what happens when one machine in a cluster fails
- Why this general idea matters before Lesson 30's Spark-specific
  architecture

## The general idea

**Distributed computing** means splitting one large task across
multiple machines so they work on pieces of it simultaneously, instead
of one machine working through the whole thing sequentially. Twelve
months of NYC Taxi data split across twelve machines, each processing
one month in parallel, finishes in roughly the time it takes to process
*one* month — not twelve times that.

## Data locality: move the computation, not the data

Moving a large dataset across a network is slow — often the actual
bottleneck in distributed systems, more than the computation itself.
Spark's approach (and distributed computing generally) is **data
locality**: whenever possible, send the small piece of *code* to run
**where the data already lives**, instead of moving the large *data* to
wherever the code happens to be running.

```text
Slow:  move 500 GB of data  -> to one machine running the code
Fast:  move a few KB of code -> to the machines already holding the data
```

This single idea is why distributed systems can process far more data
than would ever be practical to move across a network first.

## Fault tolerance: machines fail, work continues

With enough machines running long enough, individual machine failures
become a statistical certainty, not an edge case. Distributed systems
are built assuming this will happen: if one machine fails mid-task,
the work assigned to it gets **redetected and re-run elsewhere** in the
cluster, rather than the entire job failing. Spark tracks exactly what
work has and hasn't completed for precisely this reason — Lesson 34's
lazy evaluation is part of how it makes this recovery possible.

## Why this matters before Spark's specific architecture

Lesson 30 introduces Spark's actual components — the driver, the
cluster manager, executors — but every one of those exists to implement
these two general ideas: get code close to data, and keep working
correctly even when individual pieces fail. Understanding *why* those
components exist makes Lesson 30's *what* make much more sense.

## Key terms

| Term | Meaning |
|---|---|
| Distributed computing | Splitting one task across multiple machines working in parallel |
| Data locality | Running code where the data already lives, instead of moving the data |
| Fault tolerance | The system's ability to keep working correctly despite individual machine failures |

## Lab

No cluster needed — reason through this: if you had to process 100 GB
of data spread across 10 machines (10 GB each), and your code was only
1 MB, would you rather move the code to each machine, or move all the
data to one machine first? Explain why in one sentence.

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: what
does "data locality" mean, and why does a distributed system need to
plan for individual machine failures as a normal occurrence?
