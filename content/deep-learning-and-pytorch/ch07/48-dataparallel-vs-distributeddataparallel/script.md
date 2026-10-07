# Script — DataParallel vs. DistributedDataParallel

## Segment 1 (title)

Once training needs more throughput than one GPU gives you, PyTorch offers two ways to spread a model across several. They solve the same problem very differently, and PyTorch's own docs are blunt about which one to actually reach for.

## Segment 2 (code)

DataParallel wraps a model in a single Python process: it splits the batch across GPUs, runs the forward pass on each in a thread, then gathers everything back to compute the loss. It's one line to add, but it's bound by the Global Interpreter Lock, pays scatter and gather overhead every step, and leaves one GPU doing more memory work than the rest.

## Segment 3 (steps)

DistributedDataParallel takes a different approach entirely: one independent process per GPU, each with its own full copy of the model, running forward and backward completely on its own. After backward, the processes synchronize with an all-reduce — they average gradients across every process, so every copy ends up applying the identical update.

## Segment 4 (code)

Setting it up means calling init_process_group to join the process group, moving the model to that process's GPU, and wrapping it in DistributedDataParallel with that device id.

## Segment 5 (code)

Because each process now owns one GPU, the DataLoader needs to hand each one a distinct slice of the dataset — that's what DistributedSampler does, splitting by rank so no two processes see the same data. You launch the whole thing with torchrun, which starts one process per GPU and sets up rank and world size automatically.

## Segment 6 (outro)

Next up: torch.compile, for speeding up the training step on a single GPU before you even think about adding more of them.
