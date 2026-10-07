# Script — What the Cluster Has to Do

## Segment 1 (title)

Welcome to Distributed Training Infrastructure. This course assumes you've already taken GPU Computing and Kubernetes Orchestration, and it asks a different question than either of those: what has to be true at the infrastructure level for hundreds of GPUs to train one model together? We'll follow one running example the whole way through — Solara AI, a fictional research company training a seventy billion parameter model called Solara-70B.

## Segment 2 (steps)

Their cluster is called solara-train: sixty-four nodes, eight NVIDIA H100 GPUs per node, five hundred twelve GPUs in total. Inside a node, NVLink connects the GPUs to each other at up to nine hundred gigabytes per second each. Between nodes, the fabric is InfiniBand NDR at four hundred gigabits per second, wired in what's called a rail-optimized topology — you'll learn exactly what that means later in the course. On top of all that hardware runs PyTorch, with FSDP and NCCL, launched through a tool called torchrun.

## Segment 3 (steps)

Whatever model is training, the infrastructure underneath has the same four jobs. Keep the GPUs fed, so the network isn't the bottleneck. Survive failures, because across five hundred twelve GPUs running for weeks, something breaking isn't rare, it's expected. Checkpoint and resume, so a crash costs minutes, not days. And schedule fairly, because two research teams share this one cluster.

## Segment 4 (code)

Every training job on solara-train eventually runs a command like this one — torchrun, told how many nodes and how many processes per node to launch. Notice that nnodes and nproc_per_node are facts about the cluster, not facts about the model. That distinction, infrastructure versus algorithms, is the spine of this whole course, and lesson three goes deep on it.

## Segment 5 (outro)

Hold onto that four-job list — feed the GPUs, survive failures, checkpoint, schedule. Up next, lesson two: the specific failure modes that make "survive failures" a real job and not just a slide.
