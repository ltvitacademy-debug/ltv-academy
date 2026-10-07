# The Infrastructure vs. Algorithms Split

Lesson 1 mentioned this course draws a hard line between infrastructure and algorithms. This lesson makes that line precise, because it's the single most useful mental model for deciding what belongs in this course versus Solara AI's companion course, Advanced LLM Training & ML Systems. Both courses talk about FSDP, NCCL, and torchrun — they just ask different questions about them.

## What you'll learn

- A working test for sorting any decision into "infrastructure" or "algorithms"
- Concrete infrastructure-side decisions on solara-train: network, scheduling, checkpointing, storage
- Concrete algorithm-side decisions: sharding strategy, optimizer, learning rate schedule, data mixture
- Why the same tool (like FSDP) can show up on both sides of the line, depending on the question

## The test: does changing it change the answer?

Ask this about any decision: **if you changed it, would the model's final weights come out numerically different, given the same hardware?** If yes, it's an algorithm decision. If the model is mathematically indifferent to it — the same weights come out whether the job ran on 64 nodes with InfiniBand or (hypothetically) 128 nodes with Ethernet, just at a different speed — it's an infrastructure decision.

## Infrastructure: how fast and how reliably

These are the questions this course answers:

- **Network** (Chapter 2) — does NCCL move gradients over NVLink and InfiniBand fast enough that compute, not communication, limits throughput?
- **Scheduling** (Chapter 3) — does the `training` namespace's `PyTorchJob` get the GPUs it needs, and does it coexist fairly with the multimodal team's jobs?
- **Fault tolerance & checkpointing** (Chapter 4) — when a node dies, does the job resume from the last DCP checkpoint in `solara-checkpoints` instead of restarting from zero?
- **Storage & data loading** (Chapter 5) — can data loaders pull sharded training data from S3 and FSx for Lustre fast enough to keep GPUs from stalling?

## Algorithms: what the model actually learns

These are the questions the companion course answers, and this course deliberately doesn't:

- Which FSDP **sharding strategy** (full shard vs. hybrid shard) and wrapping policy to use
- Which **optimizer** (AdamW, with what betas and weight decay) and **learning rate schedule** (warmup, cosine decay) to use
- What the **data mixture** is — what fraction of tokens come from code, web text, or curated sources
- The model's **architecture** — layer count, hidden size, attention variant

## Where the line gets interesting: FSDP

FSDP (Fully Sharded Data Parallel) sits on both sides at once. Choosing *that* Solara-70B uses FSDP instead of plain data parallelism, and choosing *how* to shard its parameters, is an algorithms/systems-design decision — it changes memory usage and communication patterns, which the companion course covers. But once that choice is made, making FSDP's AllGather and ReduceScatter calls actually run fast across 512 GPUs — picking the right NCCL settings, the right network topology — is infrastructure, and it's this course's job.

```python
# algorithms side: which wrapping policy, how to shard — not this course
model = FSDP(model, sharding_strategy=ShardingStrategy.FULL_SHARD)

# infrastructure side: whether torchrun launches it correctly across
# 64 nodes, and whether NCCL moves the resulting traffic fast — this course
torchrun --nnodes=64 --nproc_per_node=8 train_solara70b.py
```

## Key terms

- **Infrastructure decision** — one that changes speed or reliability, not the model's final numerical output
- **Algorithm decision** — one that changes the model's final numerical output
- **FSDP (Fully Sharded Data Parallel)** — a PyTorch parallelism strategy that spans both sides of the split depending on the question asked

## Recap

The test is simple: would changing this decision change the model's final weights? If yes, it's algorithms, and belongs in Advanced LLM Training & ML Systems. If no — it only changes speed or reliability — it's infrastructure, and it's what the rest of this course covers. Next, Lesson 4 teaches you to read a cluster topology diagram, the first concrete infrastructure skill.
