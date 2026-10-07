# DataParallel vs. DistributedDataParallel

Once your training needs more throughput than one GPU can give you, PyTorch gives you two different ways to spread a model across several. They solve the same problem — more GPUs working on the same training run — in very different ways, and PyTorch's own documentation is blunt about which one you should actually reach for.

## What you'll learn

- How `nn.DataParallel` works, and why it's single-process and GIL-bound
- How `DistributedDataParallel` (DDP) works, and why it's the one PyTorch recommends
- The extra pieces DDP needs: `init_process_group`, `DistributedSampler`, and `torchrun`
- Why DDP scales better even on a single multi-GPU machine, not just across machines

## DataParallel: simple, but limited

`torch.nn.DataParallel` wraps a model in a single Python process. On every forward pass, it splits the input batch across your GPUs, copies the (single, up-to-date) model weights to each one, runs the forward pass on each GPU in a separate thread, then gathers the outputs back onto one GPU to compute the loss and do the backward pass. It's genuinely one line to add:

```python
model = torch.nn.DataParallel(model)
output = model(inputs)   # input batch is auto-split across GPUs
```

The catch is that it's all happening inside one Python process, bound by the Global Interpreter Lock, with repeated scatter/gather overhead every single step. It also has an imbalanced-memory problem — the GPU that gathers outputs and computes the loss uses noticeably more memory than the others. PyTorch's own docs now recommend against using it for anything beyond quick single-machine experiments.

## DistributedDataParallel: one process per GPU

`DistributedDataParallel` (DDP) takes a fundamentally different approach: it launches one independent process per GPU, each with its own full copy of the model. Each process runs forward and backward on its own shard of the data completely independently — no scatter, no gather, no shared Python process. At the end of the backward pass, the processes synchronize by running an all-reduce: they average their gradients across all processes, so every copy of the model ends up applying the identical update.

```python
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

dist.init_process_group(backend="nccl")
local_rank = int(os.environ["LOCAL_RANK"])
model = model.to(local_rank)
model = DDP(model, device_ids=[local_rank])
```

## Feeding each process its own shard

Because each process now owns one GPU and runs the loop independently, your `DataLoader` needs to hand each process a different, non-overlapping slice of the dataset. `DistributedSampler` does exactly that — it's aware of how many processes (`world_size`) there are and which one (`rank`) it's building a batch for.

```python
from torch.utils.data.distributed import DistributedSampler
from torch.utils.data import DataLoader

sampler = DistributedSampler(dataset)
loader = DataLoader(dataset, sampler=sampler, batch_size=32)
```

## Launching with torchrun

You don't start DDP scripts with plain `python`. The `torchrun` launcher starts one process per GPU and sets the environment variables (`RANK`, `LOCAL_RANK`, `WORLD_SIZE`) that `init_process_group` reads automatically:

```bash
torchrun --nproc_per_node=4 train.py
```

That one command launches four independent processes, one per GPU, each running the same `train.py`, each knowing its own rank.

## Key terms

| Term | Meaning |
|---|---|
| `nn.DataParallel` | Single-process, multi-thread parallelism; simple but GIL-bound and imbalanced |
| `DistributedDataParallel` (DDP) | Multi-process parallelism, one process per GPU, gradients synced via all-reduce |
| All-reduce | The collective operation that averages gradients across all DDP processes each step |
| `DistributedSampler` | Splits a dataset so each DDP process sees a distinct, non-overlapping shard |
| `torchrun` | The launcher that starts one process per GPU and sets up rank/world-size environment variables |
