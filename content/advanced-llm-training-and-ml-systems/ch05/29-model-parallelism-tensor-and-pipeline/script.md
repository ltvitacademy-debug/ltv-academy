# Script — Model Parallelism: Tensor & Pipeline

## Segment 1 (title)

Lesson 28 ended on a limitation: data parallelism replicates the whole model, so it does nothing when the model itself is too big for one GPU. Model parallelism solves that by splitting the model, not the data, across devices. There are two distinct ways to do it.

## Segment 2 (steps)

Tensor parallelism splits an individual weight matrix across GPUs, so each one holds a slice of a layer rather than the whole layer. Each GPU computes its slice of the output, and then an all-reduce combines the partial results back into the correct full output -- inside every layer, many times per step. That makes tensor parallelism very communication-heavy, which is why it needs a fast interconnect like NVLink within one server.

## Segment 3 (steps)

Pipeline parallelism cuts differently: it assigns groups of layers to different GPUs as sequential stages, and each GPU only talks to its immediate neighbors passing activations forward and gradients backward. That's much lighter on the network. The catch is the pipeline bubble -- GPUs sitting idle waiting on each other -- which micro-batching reduces by feeding smaller pieces of the batch through the pipeline one after another.

## Segment 4 (code)

DeepSpeed's PipelineModule is the real mechanism: you give it a list of layer specs, tell it how many stages to split across, and it handles partitioning the model and the activation hand-off between stages automatically.

## Segment 5 (outro)

In practice, tensor and pipeline parallelism get combined, not chosen exclusively -- tensor parallelism inside a server where NVLink can absorb the frequent traffic, pipeline parallelism across servers where only activations need to cross the slower network. Next: ZeRO and FSDP, which take a different approach entirely -- sharding memory within ordinary data parallelism instead of splitting the model's structure apart.
