# What the Cluster Has to Do

Welcome to Distributed Training Infrastructure, the second course in the AI Infrastructure / ML Systems Engineer destination. It assumes you've already taken GPU Computing and Kubernetes Orchestration — this course doesn't re-teach what a GPU is or how a Pod gets scheduled, it asks what has to be true at the infrastructure level for hundreds of GPUs to train one model together. Our running example throughout the course is **Solara AI**, a fictional AI research company training a 70-billion-parameter language model, Solara-70B, on a 512-GPU cluster called **solara-train**.

## What you'll learn

- The shape of the solara-train cluster: 64 nodes, 8 NVIDIA H100 GPUs each, NVLink inside a node and InfiniBand between nodes
- The four jobs the infrastructure has to do regardless of which model or algorithm is training
- Why this course draws a hard line between "infrastructure" and "algorithms" — previewed here, covered in full in Lesson 3
- How the next ten lessons of Chapters 1 and 2 build toward diagnosing real network bottlenecks

## The cluster: solara-train

Solara AI's training cluster, solara-train, has 64 nodes. Each node carries 8 NVIDIA H100 GPUs connected to each other by NVLink, giving every GPU in a node up to 900 GB/s of bidirectional bandwidth to its seven neighbors. That's 512 GPUs total. Between nodes, the fabric is InfiniBand NDR running at 400 Gb/s per port, wired in a rail-optimized topology (Lesson 10 unpacks exactly what that means). The Solara ML Platform team runs this cluster for two research teams — a language-modeling team and a multimodal team — who share it through Kubernetes, in the `training` namespace, using the Kubeflow Training Operator's `PyTorchJob` custom resource to launch jobs built on PyTorch, FSDP, and NCCL.

## The four jobs of the infrastructure

No matter which model is training, the infrastructure underneath has the same four responsibilities:

- **Keep the GPUs fed.** 512 H100s are nearly worthless if they spend half their time waiting on data or on each other. The network has to move gradients and parameters fast enough that compute, not communication, is the bottleneck. That's the whole subject of Chapter 2.
- **Survive failures over weeks, not minutes.** Training Solara-70B takes days to weeks of continuous runtime across 512 GPUs. At that scale, a GPU Xid error, a flaky NIC, or a node reboot isn't rare — it's expected. Lesson 2 catalogs exactly what fails.
- **Checkpoint and resume.** Progress has to survive a crash. Solara AI checkpoints to the `solara-checkpoints` S3 bucket roughly every 500 steps (about 30 minutes) using `torch.distributed.checkpoint` (DCP), so a restart loses minutes, not days. Chapter 4 goes deep on this.
- **Schedule and share fairly.** Two research teams, one cluster. Kubernetes and the Training Operator decide who gets which GPUs, when. Chapter 3 covers that.

## A first look at launching a job

Every `PyTorchJob` on solara-train ultimately runs `torchrun` inside its Pods. You'll see this command in more detail in later lessons; for now, just notice the shape of it — it names how many machines and how many processes per machine, which is an infrastructure fact, not an algorithm fact:

```bash
torchrun \
  --nnodes=64 \
  --nproc_per_node=8 \
  --rdzv_backend=c10d \
  --rdzv_endpoint=$MASTER_ADDR:29500 \
  train_solara70b.py
```

## Key terms

- **solara-train** — Solara AI's 512-GPU training cluster (64 nodes × 8 H100 GPUs)
- **NVLink** — high-bandwidth GPU-to-GPU interconnect within a node (up to 900 GB/s per H100)
- **InfiniBand NDR** — the 400 Gb/s fabric connecting nodes to each other
- **PyTorchJob** — the Kubeflow Training Operator's custom resource for launching a distributed PyTorch job on Kubernetes
- **torch.distributed.checkpoint (DCP)** — PyTorch's API for saving and loading sharded training state across many ranks

## Recap

Solara-train's job, at the infrastructure level, is to keep 512 GPUs fed, keep training alive through failures, checkpoint reliably, and share the cluster fairly — all independent of which model or algorithm is running on top. Next, Lesson 2 catalogs the specific failure modes that make the "survive failures" job necessary in the first place.
