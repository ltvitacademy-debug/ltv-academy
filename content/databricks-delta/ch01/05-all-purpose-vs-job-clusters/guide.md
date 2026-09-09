# Lesson 5 — All-Purpose vs. Job Clusters

**Chapter 1 · Databricks Fundamentals · Lesson 5 of 57**

## What you'll learn

- All-purpose clusters — interactive, shared, for exploration
- Job clusters — created for one run, then destroyed
- Why job clusters cost meaningfully less per DBU
- Choosing the right one for a given piece of work

## All-purpose clusters — for people, interactively

An **all-purpose cluster** is what Lesson 4 walked through creating
manually. It's meant to stay running, be attached to by multiple
notebooks, and support live, back-and-forth exploration — running
one cell, checking the output, adjusting, running the next. This is
exactly the mode every lab in Data Engineering Foundations assumed:
a person, actively working.

## Job clusters — created for one run, then gone

A **job cluster** is created automatically when a scheduled job
(Lesson 11) runs, used for exactly that one run, and terminated
immediately afterward — no idle time, no manual creation. Nobody
attaches to a job cluster interactively; it exists only to execute
one specific piece of work.

```
Job run starts
  -> job cluster provisioned
  -> notebook/script executes
  -> job cluster terminated
Job run ends
```

## Why job clusters cost less

Because a job cluster's entire lifetime is one job run, Databricks
prices the compute (DBU) portion lower than an all-purpose cluster —
there's no risk of it sitting idle and billing for nothing, the way
a forgotten all-purpose cluster can. This is a genuine, material
cost difference in real production usage, not just a technical
distinction.

## Choosing the right one

| Situation | Cluster type |
|---|---|
| Exploring a new dataset, writing/debugging PySpark interactively | All-purpose |
| A nightly ETL job that runs the same notebook unattended | Job |
| Multiple people sharing one environment during active development | All-purpose |
| A scheduled pipeline with no human in the loop | Job |

The general rule: if a human is actively watching and iterating,
all-purpose. If it's meant to run unattended on a schedule, job.

## Key terms

| Term | Meaning |
|---|---|
| All-purpose cluster | Interactive, shared, stays running for active exploration |
| Job cluster | Created for one scheduled run, terminated immediately after |
| DBU | Databricks' compute-pricing unit — job clusters cost less per DBU |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does a job cluster typically cost less per DBU than an all-purpose
cluster?
