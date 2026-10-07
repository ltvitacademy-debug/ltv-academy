# Choosing a Parallelism Strategy

The last four lessons covered data parallelism, tensor parallelism, pipeline parallelism, ZeRO/FSDP sharding, and activation checkpointing as separate techniques. In practice, nobody picks exactly one and ignores the rest -- real training jobs combine several of them, and the combination depends on concrete facts about the model and the cluster: how big the model is relative to one GPU's memory, how many GPUs are available, and how fast they're connected to each other. This lesson is the decision framework that ties the previous four lessons together.

## What you'll learn

- The first question that determines everything else: does the model fit on one GPU?
- When ZeRO/FSDP alone is enough, and when it isn't
- Why tensor parallelism stays confined to a single server's fast interconnect
- "3D parallelism": combining data, tensor, and pipeline parallelism at once
- A concrete decision path from small fine-tunes to frontier-scale pretraining

## Question one: does the model fit on a single GPU?

This is the fork in the road everything else depends on. If a model's weights (plus activations, plus optimizer state) fit on one GPU, even if barely, the simplest path is plain data parallelism, with ZeRO stage 1 or 2 layered on top once optimizer state becomes the memory bottleneck across replicas. There's no reason to reach for tensor or pipeline parallelism here -- model parallelism exists specifically to solve the case where this question's answer is no.

## When the model doesn't fit: ZeRO-3/FSDP first, model parallelism second

If the model doesn't fit on one GPU, the next cheapest lever is ZeRO stage 3 or FSDP's `FULL_SHARD`, combined with activation checkpointing -- both of these are comparatively simple to turn on (a config flag or a wrapping call, as covered in Lessons 30 and 31) and don't require restructuring the model's code. For many fine-tuning scenarios up to tens of billions of parameters on a multi-GPU node, this combination alone is often sufficient and is the path of least complexity, worth trying before reaching for tensor or pipeline parallelism at all.

## When sharding alone still isn't enough

ZeRO-3/FSDP's all-gather-heavy communication pattern starts to dominate step time once the model is large enough, or once training needs to scale across many nodes where the network between nodes is much slower than the NVLink within one. That's the point where explicit model parallelism earns its communication cost:

- **Tensor parallelism** stays confined to the fastest interconnect available -- typically within a single server where NVLink keeps its frequent in-layer all-reduces cheap. It is rarely stretched across nodes.
- **Pipeline parallelism** is tolerant of slower networks, since it only needs point-to-point activation hand-offs between neighboring stages, which makes it the natural way to span multiple servers.

## 3D parallelism: combining all three axes

Frontier-scale pretraining runs (the kind used for models like GPT-3-class systems and BLOOM) typically combine all three parallelism axes at once, each solving a different constraint:

- **Tensor parallel** group: GPUs within a server, connected by NVLink
- **Pipeline parallel** stages: groups of servers, each stage holding a contiguous chunk of layers
- **Data parallel** replicas: multiple copies of the entire tensor-parallel + pipeline-parallel structure, each processing different data, synchronized the usual way

This is commonly called **3D parallelism**, and it's exactly what frameworks like Megatron-DeepSpeed are built to orchestrate -- configuring the tensor-parallel degree, the pipeline-parallel degree, and the data-parallel degree (often alongside ZeRO stage 1 on top of the data-parallel axis) as independent knobs that multiply together to use the full cluster.

## A practical decision path

- Model fits on one GPU → data parallelism (+ ZeRO stage 1/2 if optimizer memory is tight)
- Model doesn't fit, single node → ZeRO-3/FSDP + activation checkpointing
- Model doesn't fit, sharding alone bottlenecks on communication or still doesn't fit → add tensor parallelism within each node
- Scaling across many nodes → add pipeline parallelism across nodes, data parallelism across replicas of the whole structure

## Key terms

- **3D parallelism** -- combining data, tensor, and pipeline parallelism simultaneously, each on its own axis of the cluster
- **Interconnect bandwidth** -- the speed of the connection between GPUs (NVLink within a server vs. a network between servers), which determines which techniques are viable where
- **Hybrid parallelism** -- using more than one parallelism technique together rather than relying on a single one
- **Communication-bound** -- a training step where time is dominated by data movement between GPUs rather than computation
