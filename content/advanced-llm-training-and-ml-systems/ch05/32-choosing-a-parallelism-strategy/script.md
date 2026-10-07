# Script — Choosing a Parallelism Strategy

## Segment 1 (title)

The last four lessons covered data parallelism, tensor and pipeline parallelism, ZeRO and FSDP, and activation checkpointing as separate techniques. Real training jobs combine several of them, and which combination depends on concrete facts about the model and the cluster. This lesson ties it together into a decision framework.

## Segment 2 (steps)

The first question is whether the model fits on one GPU at all. If it does, plain data parallelism plus ZeRO stage 1 or 2 for optimizer memory is the simplest path -- no need for model parallelism. If it doesn't, and you're on a single multi-GPU node, ZeRO-3 or FSDP's FULL_SHARD plus activation checkpointing is the next cheapest lever, since both are just a config flag or a wrapping call.

## Segment 3 (steps)

Once sharding alone starts bottlenecking on communication, or the model is simply too large, that's when explicit model parallelism earns its cost. Frontier-scale pretraining combines all three axes: tensor parallelism within a server over NVLink, pipeline parallelism across servers using only neighbor hand-offs, and data parallelism replicating that entire structure. That's called 3D parallelism.

## Segment 4 (code)

Frameworks like Megatron-DeepSpeed treat this as three independent degrees that multiply together -- a tensor-parallel size, a pipeline-parallel size, and a data-parallel size -- to use the full cluster. Eight-way tensor parallel times four pipeline stages times sixteen data-parallel replicas is five hundred twelve GPUs, each one playing one specific, well-defined role in the structure.

## Segment 5 (outro)

The practical path: start simple, and only add a technique once you've confirmed the simpler ones genuinely don't fit your model and cluster. Next: a closer look at what all this communication actually costs in wall-clock time, and why some of these choices are so sensitive to network speed between devices.
