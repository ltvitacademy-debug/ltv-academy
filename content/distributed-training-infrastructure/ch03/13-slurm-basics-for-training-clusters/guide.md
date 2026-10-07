# Slurm Basics for Training Clusters

Kubernetes with the Training Operator is Solara AI's primary way of running Solara-70B training jobs, but the Solara ML Platform team is also evaluating **Slurm**, the workload manager most HPC and ML research clusters have used for decades. Some researchers on the language-modeling team already know Slurm from academic clusters, and Slurm's batch-scheduling model is a close match for "run this exact job on exactly these GPUs, nothing else." This lesson covers what Slurm is and how to submit a distributed training job with it, so the comparison in Lesson 16 has something concrete to compare against.

## What you'll learn

- What Slurm is and why HPC clusters have used it for distributed, multi-node jobs since before Kubernetes existed
- How to write an `sbatch` script that requests GPU nodes for a training job
- The difference between `sbatch` (submit a batch job) and `srun` (run a step inside an allocation)
- How Slurm's partitions map onto solara-train's node pools

## What Slurm actually is

Slurm (Simple Linux Utility for Resource Management) is a workload manager: you describe the resources a job needs — how many nodes, how many GPUs per node, how long it can run — and Slurm's scheduler decides when and where to run it, queuing jobs that can't start immediately. Unlike Kubernetes, which is built around long-running services that reconcile toward a declared state, Slurm is built around jobs: batch scripts that start, run to completion (or failure), and stop. That model maps directly onto a training run, which is fundamentally a batch job that happens to take days.

## Submitting a training job with sbatch

A training job gets submitted as a batch script with `#SBATCH` directives at the top, then `sbatch script.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=solara-70b-train
#SBATCH --partition=gpu-h100
#SBATCH --nodes=64
#SBATCH --ntasks-per-node=8
#SBATCH --gres=gpu:8
#SBATCH --time=72:00:00
#SBATCH --output=logs/%x-%j.out

srun torchrun \
  --nnodes=$SLURM_NNODES \
  --nproc_per_node=8 \
  --rdzv_id=$SLURM_JOB_ID \
  --rdzv_backend=c10d \
  --rdzv_endpoint=$SLURM_LAUNCH_NODE_IPADDR:29500 \
  train.py
```

`--nodes=64` and `--gres=gpu:8` request the same 512 GPUs as the PyTorchJob in Lesson 12 — 64 nodes, 8 GPUs each. `--time=72:00:00` sets a wall-clock limit (here, 72 hours); Slurm kills the job if it runs past that, so this number has to be set deliberately for a long training run. Slurm populates `$SLURM_NNODES`, `$SLURM_JOB_ID`, and `$SLURM_LAUNCH_NODE_IPADDR` itself, which the script hands straight to torchrun's own rendezvous flags — Slurm doesn't replace torchrun here, it just launches it with the right environment already in place.

## sbatch vs. srun

`sbatch` submits the whole script as a job and returns immediately — the job runs whenever Slurm schedules it, even if that's hours later. `srun`, used inside the script above, launches a parallel step across the nodes Slurm already allocated to that job; it's what actually starts one copy of the command per node (or per task) once the allocation exists. You can also run `srun` directly on the command line for an interactive, blocking allocation, which the platform team uses for quick debugging runs rather than queuing a full batch job.

## Partitions and node pools

A Slurm **partition** is a named subset of the cluster's nodes with its own limits and priority rules — conceptually close to a Kubernetes node pool, but Slurm's scheduler, not Kubernetes', decides what runs on it. solara-train's partitions mirror its hardware pools: `gpu-h100` for the full 64-node training fleet, and a smaller `gpu-h100-debug` partition held back for short interactive jobs so a debugging session never has to wait in queue behind a multi-day production run.

## Key terms

| Term | Meaning |
|---|---|
| Slurm | Workload manager for HPC/ML clusters; schedules batch jobs onto nodes |
| sbatch | Submits a batch script as a job; returns immediately, job runs when scheduled |
| srun | Launches a parallel step across an already-allocated set of nodes |
| Partition | A named subset of cluster nodes with its own scheduling rules, roughly like a node pool |

## Recap

Slurm schedules training the way HPC clusters have for decades: describe the nodes and GPUs a batch job needs, submit it with `sbatch`, and let `srun` launch torchrun once the allocation exists. Next lesson: Job Queues & Priorities, covering how both Slurm and Kubernetes decide whose job runs first when solara-train is full.
