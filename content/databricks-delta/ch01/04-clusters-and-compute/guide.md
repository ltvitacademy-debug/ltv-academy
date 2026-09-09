# Lesson 4 — Clusters and Compute

**Chapter 1 · Databricks Fundamentals · Lesson 4 of 57**

## What you'll learn

- The real "Create compute" form, and what each setting actually configures
- Driver node vs. worker node — connecting back to Foundations' Spark architecture
- Autoscaling — letting Databricks size the cluster to the workload
- Automatic termination — the setting that saves real money

## The real compute-creation form

![The Azure Databricks simple compute creation form, showing Policy, Performance settings including Databricks Runtime Version, Photon acceleration, worker node type, autoscaling min/max workers, and other cluster configuration fields.](/courses/databricks-delta/ch01/04-clusters-and-compute/simple-form.png)

*The actual Azure Databricks "Create compute" form.*

This is the real, current UI for creating a cluster ("compute" is
Databricks' broader term, covering both interactive clusters and the
job clusters Lesson 5 covers). Most users pick a **Policy** first,
which limits and simplifies which settings are even shown — a
workspace admin sets these up to keep costs and configuration sane
for everyone else.

## Driver and worker nodes — Foundations, made concrete

Recall Foundations Lesson 31: every Spark cluster has one **driver**
node and some number of **worker** nodes. This form is where that
becomes a real, billable Azure setting — you pick a **worker node
type** (an actual VM size), and by default the driver uses the same
type. Spark itself runs one executor per worker node; "worker" and
"executor" are used interchangeably in Databricks' own terminology
for exactly this reason.

## Autoscaling — sizing to the actual workload

```
Enable autoscaling: ON
Min workers: 2
Max workers: 8
```

With autoscaling on, Databricks adds workers when a job's workload
demands it, and removes them once they're idle — this is the direct
production analog of Foundations Lesson 33's point that more
partitions means more parallel work, but only up to the number of
actual workers available. Without autoscaling, you commit to a fixed
worker count regardless of what any given job actually needs.

## Automatic termination — the setting that saves money

A running cluster bills by the hour whether or not anyone's actually
using it. **Automatic termination** shuts a cluster down after a
specified period of inactivity — the single most important cost
control on this whole form, and one that's trivially easy to forget
when you're focused on getting a notebook working.

## Key terms

| Term | Meaning |
|---|---|
| Compute (cluster) | The Spark cluster a notebook or job actually runs on |
| Policy | An admin-defined template limiting which settings a user can configure |
| Autoscaling | Adds/removes workers automatically based on actual workload |
| Automatic termination | Shuts an idle cluster down — the main real-world cost control |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
is automatic termination described as the single most important
cost control on the compute form?
