# Single-Node Multi-GPU Setups

You know how GPUs are wired together inside a server. This lesson covers how to actually use more than one of them from PyTorch — the three approaches you'll encounter, from the simplest (and most limited) to the one almost every real training job uses.

## What you'll learn

- How to check how many GPUs a process can see
- `torch.nn.DataParallel` and why it's considered legacy
- `torch.nn.parallel.DistributedDataParallel` (DDP) and why it's the real default
- The basic shape of launching a DDP training script

## Checking visible GPUs

```python
import torch
print(torch.cuda.device_count())      # e.g. 4
print(torch.cuda.get_device_name(0))  # "NVIDIA A100-SXM4-80GB"
```

`CUDA_VISIBLE_DEVICES` is the environment variable that controls which physical GPUs a process can even see — setting `CUDA_VISIBLE_DEVICES=0,2` restricts a process to GPUs 0 and 2, remapped internally as device 0 and 1.

## DataParallel: simple, and mostly deprecated

`torch.nn.DataParallel` wraps a model so a single Python process splits a batch across GPUs, runs the forward pass on each, and gathers results back onto one GPU:

```python
model = torch.nn.DataParallel(model)   # single process, splits batches
output = model(input)
```

It's simple to add, but has real downsides: it's single-process (limited by Python's GIL), it funnels gradient-gathering through one GPU (creating a bottleneck), and it doesn't scale across multiple nodes at all. PyTorch's own documentation recommends `DistributedDataParallel` instead for essentially all cases.

## DistributedDataParallel (DDP): the real default

**DDP** runs one separate process per GPU, each with its own copy of the model. After each backward pass, gradients are synchronized across processes using NCCL (covered next lesson), averaged, and applied identically on every GPU — no single GPU ever acts as a bottleneck gathering point:

```python
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

dist.init_process_group(backend="nccl")
torch.cuda.set_device(local_rank)
model = model.to(local_rank)
model = DDP(model, device_ids=[local_rank])
```

## Launching a DDP script

```
$ torchrun --nproc_per_node=4 train.py
```

`torchrun` (PyTorch's launch utility) starts 4 separate Python processes, one per GPU, each receiving a `LOCAL_RANK` environment variable (0 through 3) that the training script reads to know which GPU it owns — this is the standard way single-node multi-GPU training actually gets launched.

## Key terms

- **`CUDA_VISIBLE_DEVICES`** — environment variable restricting which physical GPUs a process can see
- **`torch.nn.DataParallel`** — legacy single-process multi-GPU wrapper with a gradient-gathering bottleneck
- **`DistributedDataParallel` (DDP)** — one process per GPU, synchronized gradients, the modern default
- **`torchrun`** — PyTorch's utility for launching one process per GPU
- **`LOCAL_RANK`** — the environment variable each DDP process reads to know which GPU it owns
