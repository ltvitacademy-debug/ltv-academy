# Job Queues & Cluster Basics

Before Slurm or Kubernetes specifics, it's worth understanding what a compute cluster and a job queue actually are, in general — because almost every research infrastructure tool is a variation on the same handful of ideas: a shared pool of machines, a scheduler that decides what runs where, and a queue that holds work until resources are free.

## What you'll learn

- The basic anatomy of a compute cluster: nodes, resources, and the scheduler
- What a job actually is, as a unit the cluster schedules
- Queued, running, and completed states, and how a job moves between them
- Why interactive and batch jobs are handled differently

## Anatomy of a cluster

A cluster is a pool of machines (**nodes**), each with its own CPUs, memory, and often GPUs, managed by a **scheduler** that decides which job runs on which node and when. Researchers don't log into a specific node and run things directly (mostly) — they submit a description of the work to the scheduler, which finds a node with available resources and places the job there:

```
+------------------+     +------------------+     +------------------+
|  Node: gpu-01    |     |  Node: gpu-02    |     |  Node: gpu-03    |
|  8x A100, 512GB  |     |  8x A100, 512GB  |     |  8x A100, 512GB  |
+------------------+     +------------------+     +------------------+
          \                      |                      /
           \                     |                     /
                     +-----------------------+
                     |   Scheduler (Slurm /  |
                     |   Kubernetes control  |
                     |   plane)              |
                     +-----------------------+
                                 |
                     +-----------------------+
                     |   Job queue           |
                     |   (pending work)       |
                     +-----------------------+
```

## What a job is

A **job** is a request: a script or command to run, plus a resource specification (how many GPUs, how much memory, how much time). The scheduler doesn't know or care what the job's code does — it only cares what it asked for and when it's done:

```bash
#!/bin/bash
#SBATCH --job-name=train-sweep-214
#SBATCH --gres=gpu:1
#SBATCH --mem=64G
#SBATCH --time=04:00:00
python train.py --config configs/sweep_214.yaml
```

This script is a complete job description: a name for identification, a resource request (1 GPU, 64GB RAM, a 4-hour time limit), and the command to actually execute once the scheduler places it on a node.

## Queued, running, completed

Every job moves through a small set of states: **pending** (waiting for resources to free up, position determined by the scheduling policy from Lesson 20), **running** (actively executing on an allocated node), and a terminal state — **completed**, **failed**, **timeout**, or **cancelled**. Checking a job's state is the first diagnostic step for anything that seems stuck:

```bash
squeue -u $USER          # Slurm: see your jobs and their state
kubectl get pods         # Kubernetes: see pod state (Pending/Running/Completed/Failed)
```

A job stuck in `pending` for a long time usually means the requested resources (a specific GPU type, a large memory request) aren't currently available — not that anything is broken.

## Interactive vs. batch

**Batch jobs** run unattended: submit the script, walk away, come back to results. **Interactive jobs** hold a terminal session open on an allocated node, used for debugging a training script line-by-line before committing it to a long batch run:

```bash
# Slurm interactive session on a GPU node
srun --gres=gpu:1 --mem=32G --time=01:00:00 --pty bash
```

Most of the actual compute budget on a research team goes to batch jobs; interactive sessions are for the much shorter debugging phase before a job is trusted to run unattended for hours.

## Key terms

- **Node** — a single machine in the cluster with its own CPU, memory, and (often) GPU resources
- **Scheduler** — the component that decides which job runs on which node and when, based on resource availability and policy
- **Job** — a unit of work submitted to the scheduler: a command plus a resource request
- **Batch vs. interactive job** — unattended scripted execution vs. a held-open terminal session for live debugging
