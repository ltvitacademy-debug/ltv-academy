# Lesson 32 — Clusters and Nodes

**Chapter 3 · Apache Spark Fundamentals · Lesson 32 of 62**

## What you'll learn

- What a **cluster** and a **node** actually mean, precisely
- Why one node can run **multiple** Executors
- What actually determines how many Executors fit on a node
- The difference between scaling a cluster **up** and scaling it **out**

## Cluster and node, precisely

A **cluster** is the entire group of machines working together on
Spark jobs. A **node** is one single machine in that cluster — physical
or virtual, it doesn't matter; Spark just sees a machine with some CPU
cores and some memory available to it.

## One node can run more than one Executor

Lesson 30's diagram showed one Executor per Worker Node, for simplicity
— but a single node with enough CPU cores and memory can run **several**
Executors at once, each one still an independent process with its own
slice of that node's resources:

```text
Worker Node (16 cores, 64 GB RAM)
  Executor 1 (4 cores, 16 GB)
  Executor 2 (4 cores, 16 GB)
  Executor 3 (4 cores, 16 GB)
  Executor 4 (4 cores, 16 GB)
```

How many Executors actually fit is a real configuration decision — how
many cores and how much memory you assign to *each* Executor, divided
into what the node actually has available.

## Scaling up vs. scaling out

- **Scaling up**: give each node more cores and memory — fewer, bigger
  machines
- **Scaling out**: add more nodes to the cluster — more, smaller
  machines

Both increase total capacity; they trade off differently. More, smaller
nodes tend to be more fault-tolerant (Lesson 29) — losing one node loses
a smaller fraction of total capacity — while fewer, bigger nodes reduce
the network communication overhead between them.

## Why this matters practically

When you eventually configure a real cluster (Course 2's Databricks
compute, or Course 3's Fabric Spark pools), you're making exactly this
decision: how many nodes, how big each one is, and how many Executors
per node. Understanding the tradeoff now means that configuration
screen won't just be unfamiliar settings — it'll be a direct decision
about scaling up versus scaling out.

## Key terms

| Term | Meaning |
|---|---|
| Cluster | The entire group of machines working together |
| Node | One single machine in the cluster |
| Scaling up | Fewer, bigger nodes |
| Scaling out | More, smaller nodes |

## Lab

No cluster needed — reason through this: for a job that's extremely
sensitive to losing progress if a machine fails, would you lean toward
scaling up or scaling out? Explain your answer in one sentence, tying it
back to Lesson 29's fault tolerance.

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: what's
the difference between a cluster and a node, and what's the real
tradeoff between scaling up and scaling out?
