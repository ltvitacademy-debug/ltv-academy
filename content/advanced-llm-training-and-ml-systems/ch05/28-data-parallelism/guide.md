# Data Parallelism

Chapter 4 covered how to fine-tune a model that already fits comfortably on one GPU. Real pretraining -- and plenty of large-scale fine-tuning -- doesn't look like that: the dataset is too large to get through in a reasonable amount of wall-clock time on a single device, even when the model itself fits in memory. Chapter 5 is about the techniques that let training use more than one GPU at once. This lesson starts with the simplest and most common of them: data parallelism, where every device holds a full copy of the model and training goes faster only because each copy works through a different slice of data at the same time.

## What you'll learn

- What data parallelism is and why it speeds up training without changing the model itself
- How gradient synchronization keeps every replica's weights identical across steps
- The real PyTorch mechanism: `DistributedDataParallel` (DDP) and `torchrun`
- Why DP's memory cost per GPU is the same as training on a single GPU alone
- How global batch size relates to the number of data-parallel replicas

## The core idea: same model, different data

Data parallelism (DP) replicates the full model -- weights, gradients, and optimizer state -- onto every participating GPU. Each replica receives a different shard of the current batch (its own micro-batch), runs a normal forward and backward pass independently, and produces its own set of gradients. Those gradients are then averaged across all replicas before any weight update happens, so every replica applies the exact same update and stays bit-for-bit identical to every other replica after each step. From the model's point of view, nothing about the math of training has changed; what changed is that eight GPUs computing on eight micro-batches in parallel get through a step in roughly the time one GPU takes to get through one micro-batch.

## The synchronization step: all-reduce

The mechanism that keeps replicas identical is an **all-reduce**: every GPU's locally computed gradients are summed (or averaged) across all GPUs, and the result is written back to every GPU, so each one ends the step holding the same averaged gradient tensor. This has to happen for every parameter's gradient, every single training step, which means the volume of data moved over the network scales with the size of the model, not the size of the batch. Frameworks overlap this communication with the backward pass itself -- gradients for layers computed earlier in the backward pass are reduced while later layers are still computing -- so the synchronization cost is mostly hidden rather than added on top of compute time, as long as the interconnect is fast enough to keep up.

## The real mechanism: PyTorch DistributedDataParallel

PyTorch's native implementation of this pattern is `torch.nn.parallel.DistributedDataParallel` (DDP). Each process in the job owns one GPU, calls `torch.distributed.init_process_group` to join the group, wraps the local model in `DistributedDataParallel`, and uses a `DistributedSampler` so each process sees a disjoint shard of the dataset rather than the same data repeated on every GPU.

```python
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data import DataLoader
from torch.utils.data.distributed import DistributedSampler

dist.init_process_group(backend="nccl")
local_rank = int(os.environ["LOCAL_RANK"])
torch.cuda.set_device(local_rank)

model = MyModel().to(local_rank)
model = DDP(model, device_ids=[local_rank])

sampler = DistributedSampler(train_dataset)
loader = DataLoader(train_dataset, sampler=sampler, batch_size=per_gpu_batch_size)
```

The job is launched with `torchrun`, which spawns one process per GPU and sets the environment variables (`LOCAL_RANK`, `RANK`, `WORLD_SIZE`) each process reads to find its place in the group:

```bash
torchrun --nproc_per_node=8 train.py
```

## What DP does *not* solve: per-GPU memory

It's worth being explicit about the limitation this lesson sets up for the rest of the chapter: DP does nothing to reduce the memory footprint on any single GPU. Every replica still holds a full copy of the model weights, a full copy of the gradients, and a full copy of the optimizer state (for AdamW, that's two extra float32 buffers per parameter). If a model is too large to fit on one GPU in the first place, adding more GPUs with plain DP doesn't help at all -- it just gives you more copies of a thing that still doesn't fit. That's the problem the model-parallelism techniques in the next few lessons exist to solve.

## Global batch size scales with replica count

Because each replica consumes its own micro-batch per step, the **global batch size** -- the effective batch size the optimizer update actually reflects -- is the per-GPU micro-batch size multiplied by the number of replicas (times gradient accumulation steps, if any are used on top). Scaling up the number of GPUs without adjusting anything else therefore scales up the global batch size, which is why large-scale distributed training is usually paired with a learning-rate schedule tuned for a much larger batch than a single-GPU run would use -- a detail that gets revisited concretely in Lesson 34's full config walkthrough.

## Key terms

- **Data parallelism (DP)** -- replicating the full model on every GPU and splitting the data across replicas
- **DistributedDataParallel (DDP)** -- PyTorch's native implementation of data parallelism
- **All-reduce** -- the collective communication operation that averages gradients across all replicas so they stay identical
- **DistributedSampler** -- ensures each replica's DataLoader sees a disjoint shard of the dataset, not duplicated data
- **Global batch size** -- per-GPU micro-batch size times the number of replicas (times gradient accumulation steps)
