# Script — Capstone: Standing Up a Small Training Cluster

## Segment 1 (title)

Everything so far has described solara-train — sixty-four nodes, five hundred twelve H100s, a seventy billion parameter model. You don't need that cluster to practice the actual skills this course covers. This capstone walks through standing up a small, real, multi-node PyTorch setup that exercises the same pieces solara-train runs at scale, just at a size you can actually run yourself.

## Segment 2 (code)

First, install the Kubeflow Training Operator — the controller that watches for PyTorchJob objects and turns them into the right number of pods automatically. Then submit a PyTorchJob defining one master and three workers, four nodes total. Drop the GPU resource request entirely if you're running CPU-only — the pattern doesn't change.

## Segment 3 (code)

Here's the detail that trips people up coming from single-machine PyTorch: you don't set MASTER_ADDR, RANK, or WORLD_SIZE yourself. The Training Operator injects all of it automatically, based on the replica spec. If your script prints a world size of four with a distinct rank on every pod, it's genuinely distributed. From there, wrapping the model in FSDP shards its parameters across all four ranks, and torch.distributed.checkpoint saves and restores that sharded state against any S3-compatible endpoint.

## Segment 4 (steps)

Five steps, start to finish: install the operator, submit the job, verify it's actually distributed by checking rank and world size, wrap the model in FSDP with DCP checkpointing, and confirm health with kubectl — job status and logs across every worker pod at once. If you have GPU nodes available, the full DCGM, Prometheus, and Grafana stack from Lesson 29 drops onto this same small cluster unchanged.

## Segment 5 (outro)

This exercises the exact same pieces solara-train runs at five hundred twelve GPU scale — a PyTorchJob, automatically injected environment variables, FSDP plus checkpointing, and kubectl-level monitoring. Next, the final lesson of the course: writing up what you built.
