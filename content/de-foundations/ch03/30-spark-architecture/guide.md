# Lesson 30 — Spark Architecture

**Chapter 3 · Apache Spark Fundamentals · Lesson 30 of 62**

## What you'll learn

- Spark's real architecture, straight from Apache Spark's own official
  documentation
- What the **Driver Program**, **Cluster Manager**, and **Worker
  Nodes** each actually do
- How this maps onto Lesson 29's general distributed computing ideas
- What's coming next: a lesson each on the Driver/Executors and
  Clusters/Nodes specifically

## The real architecture

This is Apache Spark's own official cluster diagram — not a
simplification, the actual picture from Spark's documentation:

![Apache Spark's official cluster architecture diagram, showing a Driver Program containing a SparkContext, connected to a Cluster Manager, which coordinates two Worker Nodes, each containing an Executor with a Cache and two Tasks.](/courses/de-foundations/ch03/30-spark-architecture/cluster-overview.png)
*Driver Program on the left, Cluster Manager in the middle, Worker Nodes (each running an Executor) on the right.*

## What each piece actually does

- **Driver Program** — where your actual code runs, and the
  `SparkContext` (or, in modern Spark, `SparkSession` — Lesson 36) lives.
  The driver plans the work but doesn't do the heavy lifting itself.
- **Cluster Manager** — the middleman that allocates machines and
  resources to your Spark job. This could be Spark's own built-in
  standalone manager, or an external one like Kubernetes or YARN.
- **Worker Nodes** — the actual machines doing the work, each running
  one or more **Executors**.
- **Executor** — a process on a worker node that runs **Tasks** (the
  actual units of computation) and can **Cache** data in memory for
  reuse across steps.

## Mapping this back to Lesson 29's ideas

- **Data locality**: the Cluster Manager tries to place Executors on
  machines that already hold the relevant data, rather than moving data
  to wherever an Executor happens to be running.
- **Fault tolerance**: if a Worker Node (and its Executor) fails
  mid-job, the Driver notices and reschedules that Executor's unfinished
  Tasks onto a different Worker Node.

## What's next

Lesson 31 zooms into the Driver/Executor relationship specifically —
what the Driver actually sends to Executors, and what comes back.
Lesson 32 zooms into Worker Nodes and clusters — how many Executors can
run on one node, and what determines that.

## Key terms

| Term | Meaning |
|---|---|
| Driver Program | Where your code runs; plans and coordinates the job |
| Cluster Manager | Allocates machines/resources to a Spark job |
| Worker Node | A machine running one or more Executors |
| Executor | A process that runs Tasks and can cache data |

## Lab

No cluster needed — using the diagram above, trace through what happens,
step by step, when your driver program calls one operation on a large
DataFrame: which component decides where the work runs, and which
component actually runs it?

## Check yourself

You're ready for Lesson 31 when you can name, without looking, all four
components in Spark's architecture diagram and explain what each one is
responsible for.
