# Model Parallelism: Tensor & Pipeline

Lesson 28 ended on a deliberate limitation: data parallelism replicates the whole model onto every GPU, so it does nothing when the model itself is too large to fit on one GPU in the first place. That's the problem this lesson solves. Model parallelism splits the model -- not the data -- across devices, so no single GPU ever has to hold the whole thing. There are two distinct ways to do this, and they get combined with data parallelism rather than replacing it, which is why they show up together under the umbrella of "3D parallelism" later in this chapter.

## What you'll learn

- Why model parallelism is needed when a model doesn't fit on one GPU, regardless of replica count
- Tensor parallelism: splitting individual weight matrices across devices
- Pipeline parallelism: splitting the model's layers into sequential stages across devices
- The pipeline bubble and why micro-batching exists to reduce it
- Why tensor parallelism needs a much faster interconnect than pipeline parallelism

## Tensor parallelism: splitting a layer's math across devices

Tensor parallelism splits an individual weight matrix across multiple GPUs, so each GPU holds a slice of a given layer rather than the whole layer. For a linear layer's weight matrix, this typically means splitting along columns on one GPU and rows on the next (the pattern Megatron-LM's tensor-parallel layers, `ColumnParallelLinear` and `RowParallelLinear`, implement): a column-parallel layer computes its slice of the output independently, and a row-parallel layer that follows it needs an all-reduce across the tensor-parallel group to combine the partial results back into the correct full output before the next operation can proceed.

The key cost: because tensor parallelism requires a communication step (typically an all-reduce or all-gather) *inside* every layer's forward and backward pass -- not once per training step, but many times per step -- it only scales well across GPUs connected by very fast, low-latency interconnects like NVLink within a single server. Stretching tensor parallelism across a slower network between servers tends to stall the GPUs waiting on communication far more than it speeds anything up.

## Pipeline parallelism: splitting the model into sequential stages

Pipeline parallelism takes a different cut: it assigns contiguous groups of layers to different GPUs as sequential **stages**, so GPU 0 holds the first few transformer blocks, GPU 1 holds the next few, and so on. Activations flow forward from stage to stage, and gradients flow backward in the opposite direction -- each GPU only ever communicates with its immediate neighbors (point-to-point sends and receives), which is far less demanding on the network than tensor parallelism's in-layer all-reduces.

```python
from deepspeed.pipe import PipelineModule, LayerSpec

layers = [LayerSpec(TransformerBlock, config) for _ in range(num_layers)]
model = PipelineModule(layers=layers, num_stages=4)
```

`PipelineModule` partitions the list of layer specs across `num_stages` GPUs and handles the forward/backward activation hand-off between them.

## The pipeline bubble

Naively, if GPU 1 has to wait for GPU 0 to finish its entire forward pass on the whole batch before starting its own work, most GPUs sit idle most of the time -- an inefficiency known as the **pipeline bubble**. The standard fix is **micro-batching**: split each batch into several smaller micro-batches and feed them into the pipeline one after another, so by the time GPU 0 is forwarding micro-batch 2, GPU 1 is already working on micro-batch 1. This keeps more stages busy simultaneously, though some bubble (idle time at the very start and end of each batch) is unavoidable with a strictly sequential pipeline -- more stages and smaller micro-batches generally shrink the bubble, at the cost of more scheduling overhead.

## Why they're combined, not chosen exclusively

Tensor and pipeline parallelism address the same underlying constraint -- a model too big for one GPU -- from different angles, and large-scale training jobs typically use both at once: tensor parallelism within a server (where NVLink is fast enough to absorb the frequent in-layer communication) and pipeline parallelism across servers (where only point-to-point activation hand-offs need to cross the slower inter-node network). Lesson 32 covers the decision framework for combining these with data parallelism into the full "3D parallelism" picture used for models like GPT-3 and BLOOM.

## Key terms

- **Model parallelism** -- splitting the model itself (rather than the data) across devices because it doesn't fit on one GPU
- **Tensor parallelism** -- splitting an individual weight matrix across devices, requiring an all-reduce/all-gather inside every layer
- **Pipeline parallelism** -- splitting the model's layers into sequential stages across devices, communicating only between neighbors
- **Pipeline bubble** -- GPU idle time caused by stages waiting on each other in a sequential pipeline
- **Micro-batching** -- splitting a batch into smaller pieces fed through the pipeline in sequence to reduce the bubble
