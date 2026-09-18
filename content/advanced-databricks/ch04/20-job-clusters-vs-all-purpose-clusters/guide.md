# Lesson 20 — Job Clusters vs. All-Purpose Clusters

**Chapter 4 · Jobs, Workflows & Orchestration · Lesson 20 of 34**

## What you'll learn

- Databricks & Delta Lake Lesson 5 already covered the basic distinction — this is not a re-teach
- The real choice inside a multi-task job: one shared job cluster, or a separate job cluster per task
- Cluster reuse — what it actually saves, and what it actually costs you in isolation
- Choosing correctly for a real multi-task pipeline, not just "job cluster is cheaper"

## What Lesson 5 already covered

Lesson 5 established the basic split: all-purpose clusters stay running for
interactive work and cost more per DBU; job clusters spin up for one run and
terminate immediately after, costing less because there's no idle risk.
That's still true, and still the right first answer. This lesson goes one
level deeper: a multi-task job doesn't just choose "job cluster" once — it
chooses between one *shared* job cluster and several *separate* ones, per
task.

## One shared job cluster

```
Job: nyc_taxi_orchestration
  job_cluster_key: shared_cluster     (defined once)
  Task 1: run_pipeline       -- uses shared_cluster
  Task 2: send_notification  -- uses shared_cluster
```

Every task in the job runs on the **same** job cluster, provisioned once
when the job starts and terminated once every task finishes. Cheapest
option — one cluster's worth of spin-up time and DBUs, not several — and
simplest to configure.

## Separate job clusters, per task

```
Job: nyc_taxi_orchestration
  Task 1: run_pipeline       -- job_cluster_key: pipeline_cluster (large)
  Task 2: send_notification  -- job_cluster_key: light_cluster (small)
```

Each task instead gets its own job cluster, sized for exactly that task's
workload. Costs more in aggregate (two spin-ups instead of one) but buys
real isolation: a memory-hungry pipeline task can run on genuinely
different hardware than a lightweight notification task, and neither
task's cluster configuration constrains the other's.

## Choosing correctly

| Situation | Choice |
|---|---|
| Every task has similar, modest compute needs | One shared job cluster |
| Tasks have very different sizing needs (heavy transform + light notification) | Separate job clusters per task |
| A task's failure shouldn't affect other tasks' compute | Separate job clusters |
| Minimizing total job cost is the priority | One shared job cluster, if sizing allows |

"Job cluster is cheaper than all-purpose" (Lesson 5) is still true either
way — the real decision inside a multi-task job is shared-vs-separate, not
job-vs-all-purpose.

## Key terms

| Term | Meaning |
|---|---|
| Shared job cluster | One job cluster used by every task in a multi-task job |
| Separate job clusters | Each task provisions and terminates its own job cluster, sized independently |
| Isolation trade-off | Separate clusters cost more in aggregate but isolate one task's compute from another's |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why might
a job with one heavy transformation task and one lightweight notification
task be better served by separate job clusters than one shared one?
