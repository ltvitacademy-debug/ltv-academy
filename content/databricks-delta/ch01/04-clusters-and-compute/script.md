# Lesson 4 — Clusters and Compute · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Every notebook needs somewhere to actually run — clusters and
compute.

## S2 · IMAGE CARD (simple form)

This is the real, current Azure Databricks create-compute form.
Most users pick a policy first, which limits and simplifies which
settings even show — a workspace admin sets these up to keep cost
and configuration sane.

## S3 · CODE CARD (driver/worker)

Recall Foundations Lesson 31 — every Spark cluster has one driver
node and some number of worker nodes. Here, that becomes a real,
billable Azure setting: an actual VM size for the worker type.
Spark runs one executor per worker, which is why the two terms get
used interchangeably.

## S4 · CODE CARD (autoscaling)

Turn on autoscaling, and Databricks adds workers when a job
actually needs them, and removes them once idle — the production
version of Foundations Lesson 33's point about partitions and
available workers. Without it, you're stuck with a fixed count no
matter what the job needs.

## S5 · OUTRO CARD

Driver and worker, sized to the workload, and don't forget
automatic termination — a running cluster bills by the hour whether
anyone's using it or not. Next lesson: all-purpose versus job
clusters, two different jobs.
