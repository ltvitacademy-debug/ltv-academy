# Capacity Planning for a Training Job

Before the Solara ML Platform team commits solara-train's 512 GPUs to a run, they need an answer to one question: how long will this actually take? This lesson walks through the real formula for estimating that, using Solara-70B as the worked example, so "capacity planning" means arithmetic you can check, not a guess.

## What you'll learn

- The compute-estimate formula — FLOPs needed as a function of parameters and tokens
- What MFU (Model FLOPs Utilization) means and why it's never 100%
- A full worked estimate for training Solara-70B on solara-train, start to finish
- How to convert GPU-hours into wall-clock days once you know the cluster size

## The compute formula: C ≈ 6ND

The widely used approximation for the total training compute of a transformer model is:

```text
C ≈ 6 × N × D

N = number of model parameters
D = number of training tokens
C = total FLOPs required for training
```

The factor of 6 comes from the forward and backward passes together: a forward pass costs roughly 2 FLOPs per parameter per token, and the backward pass costs roughly twice that — 4 more — for a total of 6.

## Worked example: Solara-70B

Solara-70B has N = 70 billion parameters. Following Chinchilla-style compute-optimal scaling (roughly 20 tokens per parameter), the team plans to train on D = 1.4 trillion tokens.

```text
C = 6 × 70e9 × 1.4e12
C = 5.88 × 10^23 FLOPs
```

## From FLOPs to GPU-hours: MFU matters

Each H100 has a dense BF16 peak throughput of 989 teraFLOPs/s. But no real training job hits peak — overhead from communication, data loading stalls, and kernel launch gaps always eats into it. Real-world FSDP training runs commonly land around 35-50% **Model FLOPs Utilization (MFU)**; the Solara ML Platform team plans conservatively at 40%.

```text
Per-GPU effective throughput = 989e12 × 0.40 = 3.956e14 FLOPs/s
Cluster effective throughput = 3.956e14 × 512 GPUs = 2.025e17 FLOPs/s

GPU-seconds required = C / per-GPU effective throughput
                      = 5.88e23 / 3.956e14
                      ≈ 1.487e9 GPU-seconds

GPU-hours required = 1.487e9 / 3600 ≈ 413,000 GPU-hours
```

## From GPU-hours to wall-clock time

With all 512 GPUs running the job simultaneously:

```text
Wall-clock hours = GPU-hours / number of GPUs
                 = 413,000 / 512
                 ≈ 807 hours ≈ 33.6 days
```

That's the number the Solara ML Platform team takes to the scheduling conversation in Chapter 3 — and it's also exactly why the fault-tolerance work in Chapter 4 matters: a 33-day run has a lot of time in it for something in Lesson 2's failure taxonomy to happen at least once.

## Key terms

- **C ≈ 6ND** — the standard compute estimate: ~6 FLOPs per parameter per training token
- **MFU (Model FLOPs Utilization)** — the fraction of a GPU's theoretical peak FLOPs actually realized during training
- **GPU-hours** — the unit capacity planning is denominated in: one GPU running for one hour
- **Wall-clock time** — GPU-hours divided by the number of GPUs running in parallel

## Recap

Capacity planning is three steps: estimate total FLOPs with C ≈ 6ND, divide by realistic per-GPU throughput (peak × MFU) to get GPU-hours, then divide by the cluster size to get wall-clock days. For Solara-70B on solara-train, that comes out to roughly 413,000 GPU-hours, or about 33.6 days end to end. That closes out Chapter 1 — Chapter 2 starts with why the network has to keep up at all: why bandwidth dominates at scale.
