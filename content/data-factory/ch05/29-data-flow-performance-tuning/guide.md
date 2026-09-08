# Lesson 29 — Data Flow Performance Tuning

**Chapter 5 · Mapping Data Flows · Lesson 7 of 7**

## What you'll learn

- The four real bottlenecks to check for, in order
- What the Optimize tab's partitioning options actually do
- Why "Use current partitioning" is the right default almost always
- The logging-level setting that trades detail for speed

## Four places a data flow can actually slow down

Every data flow's monitoring view breaks execution into four
possible bottlenecks:

![Screenshot of the data flow monitoring view, highlighting cluster start-up time, source read time, transformation time, and sink write time as the four stages to check for bottlenecks.](/courses/data-factory/ch05/29-data-flow-performance-tuning/monitoring-performance.png)

1. **Cluster start-up time** — spinning up the Spark cluster, usually
   3-5 minutes. For sequential jobs, raise the **time to live**
   (Lesson 24) to avoid repeatedly paying this cost.
2. **Reading from a source** — if this stage dominates, look at
   source-side optimization, like partitioning a SQL source.
3. **Transformation time** — if a specific transformation stage takes
   the longest, consider repartitioning or a larger integration
   runtime.
4. **Writing to a sink** — if this dominates, check whether you're
   scaling the destination appropriately, or accidentally writing to
   a single file instead of many in parallel.

Find the largest number in the monitoring view first — that's where
tuning effort actually pays off, not wherever intuition points.

## The Optimize tab: partitioning

Every transformation carries an **Optimize** tab controlling how data
gets repartitioned across the Spark cluster **after** that step:

![Screenshot of the Optimize tab, showing Partition option, Partition type, and Number of partitions settings.](/courses/data-factory/ch05/29-data-flow-performance-tuning/optimize.png)

**Use current partitioning** is the default, and the right choice in
most scenarios — repartitioning itself takes real time, so only
override it deliberately:

| Partition type | Use it when |
|---|---|
| **Round robin** | No good key candidates exist for a smarter strategy |
| **Hash** | You want similar values grouped together — test for skew first |
| **Dynamic range** | Let Spark determine ranges automatically from your columns |
| **Fixed range** | You understand your data well enough to define ranges by hand |
| **Key** | Genuinely high-cardinality data, one partition per unique value |

**Single partition** — combining everything into one — is strongly
discouraged outside a specific business reason; it's a slow operation
that drags down every downstream step too.

## Logging level: detail vs. speed

By default, data flows log **Verbose** telemetry — full detail at
every individual partition. That's expensive. If you don't need that
level of detail on every single run:

![Screenshot of the logging level setting, showing Verbose, Basic, and None radio button options.](/courses/data-factory/ch05/29-data-flow-performance-tuning/logging.png)

**Basic** logs only transformation durations. **None** gives just a
summary. Reserve **Verbose** for when you're actively troubleshooting
— running it by default on every production run is a real, avoidable
performance cost.

## Key terms

| Term | Meaning |
|---|---|
| Bottleneck | The single largest time cost in a data flow run — start-up, read, transform, or write |
| Use current partitioning | The default Optimize setting, avoiding an unnecessary repartition cost |
| Logging level | Verbose, Basic, or None — how much telemetry a run actually records |

## Lab

1. Run a data flow you've built from a pipeline, and open its
   monitoring view — identify which of the four bottleneck stages is
   actually the largest.
2. On one transformation, open the Optimize tab and note which
   partitioning option is currently active.
3. Change a data flow's logging level to Basic, rerun it, and compare
   what the monitoring view shows versus a Verbose run.

## Check yourself

Chapter 5 is complete when you can explain, in one sentence, why
finding the actual bottleneck in the monitoring view should come
before changing any partitioning setting — not the other way around.
