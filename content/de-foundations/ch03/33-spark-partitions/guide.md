# Lesson 33 — Spark Partitions

**Chapter 3 · Apache Spark Fundamentals · Lesson 33 of 62**

## What you'll learn

- What a **Spark partition** actually is — resolving the word
  collision flagged back in Lesson 9
- How many partitions a DataFrame gets, and where that number comes
  from
- Why too few partitions underutilizes your cluster, and too many
  creates its own overhead
- How partitions connect to Lesson 31's Tasks

## Resolving the word collision from Lesson 9

Lesson 9 promised this moment. A **Spark partition** is a chunk of a
DataFrame's data held **in memory** on one Executor — completely
unrelated to Lesson 9's storage partitioning (directories on disk, like
`year=2024/month=01/`). Same word, genuinely two different concepts:

| | Storage partition (Lesson 9) | Spark partition (this lesson) |
|---|---|---|
| Where | A directory on disk | A chunk of data in memory |
| Purpose | Let queries skip whole files/directories | Let Spark process chunks of data in parallel |
| Set by | How you organize files when writing | Spark automatically, or you, explicitly |

## Where the number of partitions comes from

When Spark reads a file (or a directory of files), it automatically
splits the data into partitions — roughly based on file size and the
number of files. Each **Task** (Lesson 31) processes exactly **one**
partition. More partitions means more independent chunks of work that
can genuinely run at the same time, up to however many Executor cores
you actually have available.

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")
print(df.rdd.getNumPartitions())
```

## Too few, too many

- **Too few partitions**: if you have 100 available cores across your
  Executors but only 10 partitions, 90 of those cores sit idle — your
  cluster is bigger than your job can actually use
- **Too many partitions**: each partition carries its own small
  overhead (scheduling, coordination); thousands of tiny partitions can
  spend more time being managed than doing real work

Getting this right — matching partition count to actual cluster
capacity — is exactly what Lesson 62 (Spark Performance Fundamentals)
and Lesson 61 (Partitioning Output) come back to in depth.

## How this connects to what you've already learned

A Task (Lesson 31) is the actual unit of work an Executor runs; a Spark
partition is *what that Task runs on*. One partition, one Task, running
on one Executor core, at a time — multiply that across every partition
and every available core, and that's genuinely how Spark achieves
parallelism at all.

## Key terms

| Term | Meaning |
|---|---|
| Spark partition | A chunk of a DataFrame's data held in memory on one Executor |
| `getNumPartitions()` | Returns how many partitions a DataFrame currently has |
| Task | The unit of work that processes exactly one partition |

## Lab

No cluster needed — reason through this: if a DataFrame has 4
partitions, and your cluster has 16 available Executor cores, how many
of those cores can actually be doing useful work on this DataFrame at
once? What would you need to change to use more of them?

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: how
does a Spark partition differ from Lesson 9's storage partition, and
what's the relationship between a partition and a Task?
