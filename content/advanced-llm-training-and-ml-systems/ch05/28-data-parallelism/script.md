# Script — Data Parallelism

## Segment 1 (title)

Chapter 4 covered fine-tuning a model that fits comfortably on one GPU. Real pretraining, and plenty of large-scale fine-tuning, doesn't look like that -- the dataset is just too large to get through on a single device in reasonable time. This chapter covers the techniques for training across multiple GPUs, starting with the simplest: data parallelism.

## Segment 2 (steps)

Every GPU gets a full copy of the model. Each copy processes a different slice of the current batch, independently, in parallel. Then an all-reduce averages the gradients across every replica, so each one applies the exact same update and stays identical to the others. The model's math doesn't change -- training just gets through more data per step.

## Segment 3 (steps)

Here's the limitation this sets up for the rest of the chapter: data parallelism does nothing for per-GPU memory. Every replica still holds the full weights, the full gradients, and the full optimizer state. If the model doesn't fit on one GPU to begin with, adding more GPUs with plain data parallelism just gives you more copies of something that still doesn't fit.

## Segment 4 (code)

In PyTorch, this is DistributedDataParallel, or DDP. One process per GPU joins a process group, wraps the local model, and uses a DistributedSampler so each process sees a different shard of the data rather than duplicates. The whole job launches with torchrun, which spawns one process per GPU automatically and sets the environment variables each process reads to find its rank.

## Segment 5 (outro)

One more thing to notice: global batch size is the per-GPU batch size times the number of replicas, times any gradient accumulation steps on top, which matters for how you set the learning rate -- more on that in Lesson 34's full config walkthrough. Next up: what happens when the model itself is too big for any single GPU to hold, no matter how many replicas you add.
