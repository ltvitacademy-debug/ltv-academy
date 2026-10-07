# Script — Job Queues & Cluster Basics

## Segment 1 (title)

Before getting into Slurm or Kubernetes specifics, it's worth understanding what a compute cluster and a job queue actually are — almost every research infrastructure tool is a variation on the same handful of ideas.

## Segment 2 (steps)

A cluster is a pool of nodes, each with their own CPU, memory, and often GPUs. A scheduler decides which job runs on which node and when. And a queue holds pending work until the resources it needs actually free up.

## Segment 3 (code)

A job is a request: a command to run, plus a resource specification — how many GPUs, how much memory, how much time. The scheduler doesn't know or care what the code does, only what it asked for and when it's finished.

## Segment 4 (code)

Every job moves through pending, running, and a terminal state like completed or failed. Checking a job's state is the first diagnostic step for anything that seems stuck — and a job stuck pending for a long time usually just means the resources it asked for aren't available yet, not that anything is broken.

## Segment 5 (outro)

That's cluster anatomy at the level every scheduler shares. Next: Slurm for research workloads — the scheduler most research clusters actually run, with its specific commands and patterns.
