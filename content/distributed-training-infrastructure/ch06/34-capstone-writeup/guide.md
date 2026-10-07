# Capstone Write-Up

There's no new infrastructure concept in this lesson. The capstone in Lesson 33 was the last piece of technical material in the course — this lesson is about doing the thing that turns "I built something" into "I understand what I built": writing it up. A short, honest write-up is also exactly what shows up well in a portfolio or an interview, which is the real reason it's worth doing properly rather than skipping straight to the next course.

## What you'll learn

- How to structure a short write-up of what you actually built in Lesson 33
- How to write an architecture-decision-record-style reflection on scaling your setup to 10x and 100x
- A recap of the full six-chapter arc of this course
- Where to go next: Advanced LLM Training & ML Systems

## Part one: what you built

Keep this short and concrete — three or four sentences are enough. State what you stood up (how many nodes, GPU or CPU), which pieces from the course it used (PyTorchJob, Training-Operator-injected `torchrun` env vars, FSDP, `torch.distributed.checkpoint`), and what you verified worked (a genuinely distributed job, a checkpoint that saved and restored correctly). If something didn't work the first time — a misconfigured replica spec, a checkpoint path typo — that's worth a sentence too. Debugging a real distributed setup, even a small one, is the actual skill this course has been building.

## Part two: an ADR-style reflection on scale

An **architecture decision record (ADR)** is a short, standard format for capturing *why* a decision was made, not just what the decision was — and it's the right shape for reflecting on your capstone, because the interesting question isn't "did it work," it's "what would break first if this had to get bigger." For each of the three prompts below, write a few sentences: what you'd change, and specifically *why* that piece is what breaks first.

- **At 10x your capstone's scale** (say, 40 nodes instead of 4): Would your storage choice from Chapter 5 still hold up, or would you need to move from reading shards directly off S3 to a cached parallel filesystem? Would your checkpoint frequency from Chapter 4's ideas still make sense, or would checkpointing itself start eating into training time?
- **At 100x scale** (hundreds of nodes, approaching `solara-train`'s real size): Would your network assumptions from Chapter 2 hold, or would you now need InfiniBand and a rail-optimized topology instead of whatever networking your small cluster used? Would a single Kubernetes namespace still be enough, or would you need the `training-lm` / `training-mm`-style split from Chapter 6 to keep cost and monitoring sane?
- **What's the first thing you'd automate** that you did by hand in Lesson 33 — the thing that's fine to do manually once, at small scale, but that would be a liability repeated across dozens or hundreds of jobs?

## The course, start to finish

- **Chapter 1** established the infrastructure view itself — what the cluster has to do regardless of which model trains on it, and the split between infrastructure and algorithms concerns.
- **Chapter 2** covered networking: why bandwidth dominates at scale, NCCL and collective communication, and InfiniBand versus Ethernet.
- **Chapter 3** covered orchestration: Kubernetes and Slurm scheduling, job queues, gang scheduling, and autoscaling.
- **Chapter 4** covered fault tolerance: why long runs need it, checkpoint storage strategies, resuming large jobs, and designing for node failure.
- **Chapter 5** covered storage and data loading: high-throughput `DataLoader` tuning, sharded datasets, object/block/parallel filesystem trade-offs, bottleneck diagnosis, and caching.
- **Chapter 6**, this chapter, covered monitoring and cost: GPU utilization via DCGM, cost attribution across teams, training job observability, alerting on stalls, and this capstone.

## What's next: Advanced LLM Training & ML Systems

This course deliberately stayed on the infrastructure side of the line drawn back in Chapter 1, Lesson 3 — it's about what has to be true underneath a training run, not the training algorithm running on top of it. **Advanced LLM Training & ML Systems** picks up exactly that other half: the actual techniques used to train a model like Solara-70B — optimization, parallelism strategies at the algorithm level, and the training-time decisions that this course's infrastructure exists to support. If this course was about the cluster, that one is about what runs on it.

## Key terms

- **Architecture decision record (ADR)** — a short written format capturing why a decision was made, used here to reflect on scaling choices
- **10x / 100x scale reflection** — a structured way of stress-testing a design by imagining it at larger size, rather than just describing what exists today

## Recap

You've now covered the full infrastructure view of distributed training: the cluster's responsibilities, the network, orchestration, fault tolerance, storage, and monitoring and cost — and built a small, real version of it yourself. That closes out Distributed Training Infrastructure. Advanced LLM Training & ML Systems picks up the training algorithms this infrastructure is built to run.
