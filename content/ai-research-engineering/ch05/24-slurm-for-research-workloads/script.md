# Script — Slurm for Research Workloads

## Segment 1 (title)

Slurm is the scheduler behind most academic and much industry research compute. Beyond the basic submit-and-check commands, a few Slurm-specific patterns are what make it usable for the actual shape of research workloads — sweeps, multi-GPU training, dozens of concurrent runs.

## Segment 2 (code)

A job array submits an entire sweep as one job with an index, rather than one sbatch call per trial. SLURM_ARRAY_TASK_ID gives each array element its own index at runtime, used to pick a different config per trial, and Slurm's output-path tokens route each trial's log to its own file automatically.

## Segment 3 (code)

Distributed training across multiple nodes and GPUs needs a resource request that matches what the training launcher expects. The Slurm allocation — nodes, tasks per node, GPUs — has to line up with what torch.distributed.run is told to expect, or ranks sit idle waiting for processes that were never scheduled.

## Segment 4 (steps)

A team running dozens of jobs a day needs logs that don't collide. Scoping output paths by job name and array ID keeps things navigable. And squeue only shows the live queue — sacct is what shows completed job history with exit codes, the first place to check why a trial in a finished sweep failed.

## Segment 5 (outro)

That's the Slurm-specific machinery for research workloads at scale. Next: Kubernetes for research jobs — the other major scheduler, and when a research team reaches for it instead of Slurm.
