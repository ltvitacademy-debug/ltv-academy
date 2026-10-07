# Slurm for Research Workloads

Slurm (Simple Linux Utility for Resource Management) is the scheduler behind most academic and many industry research clusters. Beyond the `sbatch`/`squeue` basics from the previous lesson, a few Slurm-specific patterns — job arrays, multi-node jobs, and log management — are what make it usable for the actual shape of research workloads: sweeps, multi-GPU training, and dozens of concurrent runs.

## What you'll learn

- Job arrays for running an entire sweep as a single Slurm submission
- Multi-node, multi-GPU job configuration for distributed training
- Where logs go by default and how to organize them for many concurrent jobs
- Common `sbatch` directives beyond the basics and what they actually control

## Job arrays for sweeps

Rather than submitting one `sbatch` call per sweep trial, a **job array** submits all of them as a single job with an index, letting Slurm manage them as a batch:

```bash
#!/bin/bash
#SBATCH --job-name=sweep-214
#SBATCH --array=0-39          # 40 trials, indices 0 through 39
#SBATCH --gres=gpu:1
#SBATCH --mem=32G
#SBATCH --time=02:00:00
#SBATCH --output=logs/sweep-214_%A_%a.log

CONFIGS=(configs/trial_*.yaml)
python train.py --config "${CONFIGS[$SLURM_ARRAY_TASK_ID]}"
```

`$SLURM_ARRAY_TASK_ID` gives each array element its own index at runtime, used here to pick a different config file per trial. `%A` and `%a` in the output path expand to the array's job ID and this element's task ID, so each trial's log lands in its own file automatically.

## Multi-node, multi-GPU jobs

Distributed training across multiple GPUs or nodes needs an explicit resource request matching the training framework's expectations:

```bash
#!/bin/bash
#SBATCH --job-name=distributed-train
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=8
#SBATCH --gres=gpu:8
#SBATCH --time=12:00:00

srun python -m torch.distributed.run \
  --nnodes=2 --nproc_per_node=8 \
  train_distributed.py --config configs/large_run.yaml
```

The Slurm resource request (`--nodes`, `--ntasks-per-node`, `--gres`) has to match what the distributed training launcher (here, `torch.distributed.run`) expects, or ranks will either fail to find each other or sit idle waiting for processes that were never scheduled.

## Organizing logs for many concurrent jobs

A team running dozens of jobs a day needs log output that doesn't collide or get lost. Scoping output paths by job name, array ID, and date keeps things navigable:

```bash
#SBATCH --output=logs/%x/%A_%a_%j.log   # %x = job name, %A = array job ID, %a = array task ID, %j = job ID
```

```bash
mkdir -p logs/sweep-214
sacct -u $USER --format=JobID,JobName,State,Elapsed,ExitCode   # job history with exit codes
```

`sacct` (as opposed to `squeue`, which only shows active/pending jobs) shows completed job history, including exit codes — the first place to check why a job in a sweep failed after the fact, once it's no longer in the live queue.

## Key terms

- **Job array** — a single Slurm submission that runs many indexed copies of the same job script, each with a different `$SLURM_ARRAY_TASK_ID`
- **`srun`** — the Slurm command that launches a task across allocated resources, often wrapping a distributed-training launcher
- **`sacct`** — the Slurm command for querying completed/historical job records, including exit codes, as opposed to `squeue`'s live queue view
- **Output path tokens (`%A`, `%a`, `%j`, `%x`)** — Slurm's substitution variables for routing each job's logs to its own file automatically
