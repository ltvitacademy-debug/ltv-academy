# Script — Slurm Basics for Training Clusters

## Segment 1 (title)

Kubernetes with the Training Operator is Solara AI's primary way of running training jobs, but the platform team is also evaluating Slurm, the workload manager most HPC and research clusters have used for decades. This lesson covers what Slurm actually is and how to submit a distributed training job with it.

## Segment 2 (code)

A training job gets submitted as a batch script with SBATCH directives at the top. Here, nodes equals sixty-four and gres gpu colon eight request the same five hundred twelve GPUs as the PyTorchJob from lesson twelve — just described Slurm's way. The time directive sets a wall clock limit, seventy-two hours here, and Slurm kills the job if it runs past that. Slurm fills in its own environment variables and hands them straight to torchrun's rendezvous flags.

## Segment 3 (steps)

Two different commands do two different jobs. sbatch submits the whole script and returns immediately — the job runs whenever Slurm's scheduler decides to schedule it, maybe hours later. srun, used inside that script, is what actually launches the command across the nodes Slurm already allocated, one copy per node.

## Segment 4 (steps)

A partition is a named subset of the cluster's nodes with its own scheduling rules — close to a Kubernetes node pool, except Slurm's own scheduler decides what runs on it. solara-train splits into gpu-h100, the full sixty-four node fleet, and a smaller debug partition held back so a quick interactive session never has to wait behind a multi-day production run.

## Segment 5 (outro)

Slurm schedules training the way HPC clusters always have: describe the nodes a job needs, submit with sbatch, launch with srun. Next up, lesson fourteen: job queues and priorities.
