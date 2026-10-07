# GPU-to-GPU Communication Basics

The last lesson showed `dist.init_process_group(backend="nccl")` without explaining what NCCL actually does. This lesson covers that directly: the communication pattern distributed training depends on, and the library that implements it efficiently over NVLink or PCIe.

## What you'll learn

- What an all-reduce operation is, and why DDP needs one
- What NCCL is, and why it exists as a separate library from CUDA itself
- Ring all-reduce, the specific algorithm NCCL commonly uses
- How to confirm NCCL is actually being used in a training run

## The problem: averaging gradients across GPUs

In DDP, every GPU computes its own gradients from its own slice of the batch. For the model to update consistently, every GPU needs the **average** of all GPUs' gradients, and every GPU needs to end up with the identical result. This operation — combine a value from every participant and give every participant the combined result — is called an **all-reduce**.

## NCCL: NVIDIA Collective Communications Library

**NCCL** (pronounced "nickel") is NVIDIA's library implementing all-reduce and related collective operations (broadcast, all-gather, reduce-scatter), specifically tuned to exploit NVLink/NVSwitch topology when available, and to fall back to PCIe-based communication otherwise. It's a separate library from the CUDA Toolkit because it solves a different problem: not "run a kernel on this GPU" but "move and combine data across many GPUs as efficiently as the physical topology allows."

```python
import torch.distributed as dist
dist.init_process_group(backend="nccl")   # NCCL handles the collective ops
# ... after loss.backward(), DDP triggers an all-reduce on gradients automatically
```

## Ring all-reduce, briefly

A naive all-reduce has one GPU collect everything, average it, and broadcast it back — that single GPU becomes a bottleneck, the same problem DataParallel had. NCCL instead commonly uses a **ring all-reduce**: GPUs are logically arranged in a ring, and each GPU only ever sends data to its immediate neighbor and receives from the other neighbor, passing partial sums around the ring until every GPU has the full result. No GPU does disproportionately more work, and the pattern maps naturally onto the direct point-to-point links NVLink provides.

## Confirming NCCL is active

```
$ NCCL_DEBUG=INFO torchrun --nproc_per_node=4 train.py
NCCL INFO Bootstrap : Using NVLink
NCCL INFO NET/Plugin: Could not find
NCCL INFO Channel 00 : 0[0] -> 1[1] via NVLINK
```

Setting `NCCL_DEBUG=INFO` makes NCCL log exactly which transport it chose for each channel — a quick way to confirm your multi-GPU job is actually using NVLink rather than silently falling back to a slower path.

## Key terms

- **All-reduce** — a collective operation that combines values from every participant and returns the combined result to all of them
- **NCCL (NVIDIA Collective Communications Library)** — NVIDIA's library implementing collective GPU-to-GPU communication operations
- **Ring all-reduce** — an all-reduce algorithm where GPUs pass partial results around a logical ring, avoiding a single bottleneck node
- **Collective operation** — any communication pattern involving all participants at once (all-reduce, broadcast, all-gather)
- **`NCCL_DEBUG=INFO`** — an environment variable that logs which transport (NVLink, PCIe) NCCL chose for communication
