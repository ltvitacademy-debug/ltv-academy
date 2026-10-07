# Script — Single-Node Multi-GPU Setups

## Segment 1 (title)

You know how GPUs are wired together inside a server. This lesson covers how to actually use more than one of them from PyTorch — from the simplest approach to the one almost every real training job uses.

## Segment 2 (code)

torch.cuda.device_count tells a process how many GPUs it can see, and the CUDA_VISIBLE_DEVICES environment variable controls which physical GPUs are visible to it at all.

## Segment 3 (steps)

DataParallel wraps a model in a single process that splits a batch across GPUs and gathers results back onto one of them, which becomes a bottleneck and doesn't scale past one node. DistributedDataParallel instead runs one separate process per GPU, each with its own copy of the model, with no single gathering point.

## Segment 4 (code)

A DDP script initializes a process group with the NCCL backend, moves its model to the GPU it owns, and wraps it — after every backward pass, gradients synchronize across all processes automatically.

## Segment 5 (code)

torchrun launches that script, starting one process per GPU and handing each one a LOCAL_RANK so it knows which GPU is its own — the standard way multi-GPU training actually gets started.

## Segment 6 (outro)

DDP is the real default; DataParallel is legacy. Next up, lesson twenty-six: GPU-to-GPU communication basics — what NCCL is actually doing when those gradients synchronize.
