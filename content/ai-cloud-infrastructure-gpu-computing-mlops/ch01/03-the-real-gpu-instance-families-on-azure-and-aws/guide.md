# Lesson 3 — The Real GPU Instance Families on Azure and AWS

**Chapter 1 · GPU Computing Fundamentals for Cloud Architects · Lesson 3 of 4**

## What you'll learn

- What Azure's **NC**, **ND**, and **NV** series actually mean, and
  which real workloads each one is built for
- What AWS's **P-series** and **G-series** actually mean, and how they
  map onto the same workload categories
- Why "training" and "inference/visualization" instances are
  genuinely different product lines, not just different sizes of the
  same thing
- How the memory math from Lesson 2 shows up directly in which GPU
  (and how much of it) each family gives you

## Azure: NC, ND, and NV are not interchangeable

Azure's GPU VM families split along the same line that matters most
in practice — training vs. everything else:

- **NC-series** — the general-purpose GPU compute line. NCv3 VMs use
  NVIDIA V100 GPUs; the newer **NC A100 v4-series** uses A100 GPUs
  (available in partial and full-card sizes). This is the workhorse
  tier for GPU compute, HPC simulation, and training jobs that don't
  need the most aggressive multi-node scaling.
- **ND-series** — purpose-built for large-scale deep learning
  *training*. ND A100 v4-series and the newer **ND H100 v5-series**
  pair A100 or H100 GPUs with NVLink between GPUs on the same VM and
  InfiniBand networking between VMs, which is exactly what multi-node
  distributed training needs to keep GPUs fed with gradients during
  synchronization. If you're training a large model across many GPUs,
  this is the series built for it.
- **NV-series** — built for visualization and virtual desktop
  workloads, not deep learning training. NVv4 VMs (AMD GPUs,
  partitioned) and the newer **NVadsA10 v5-series** (NVIDIA A10 GPUs)
  target GPU-accelerated remote desktops, CAD, and light inference —
  not the massive matmul throughput ND-series targets.

The naming is a genuine signal: NC for general compute, ND for
deep-learning-scale training, NV for visualization. Picking the wrong
one isn't just suboptimal — an NV-series VM is simply not built to
carry a multi-node LLM training job.

## AWS: P-series trains, G-series mostly serves

AWS draws a similar line with different letters:

- **P-series** — the training-focused line. P3 instances use NVIDIA
  V100 GPUs; **P4d/P4de** instances use A100 GPUs; the newest
  **P5** instances use H100 GPUs. P4d/P4de and P5 add NVLink between
  GPUs and high-bandwidth EFA (Elastic Fabric Adapter) networking
  between instances — again, the networking that distributed,
  multi-node training actually depends on.
- **G-series** — the cost-effective graphics/inference line.
  **G4dn** instances use NVIDIA T4 GPUs; **G5** instances use NVIDIA
  A10G GPUs; the newer **G6** instances use NVIDIA L4 GPUs. These are
  priced and positioned for inference serving, graphics workloads, and
  smaller-scale fine-tuning — not frontier-scale training runs.

The same pattern holds: P-series pairs its GPUs with the interconnect
multi-node training needs, while G-series optimizes for cost-per-hour
on workloads that don't need that interconnect at all.

## The memory math shows up directly in these names

Lesson 2 covered why VRAM capacity decides whether a job even fits.
That's precisely why these families are offered in multiple GPU-memory
sizes — an ND A100 v4 VM, a P4d instance, and a G5 instance can all
have "a GPU," but an A100 with 80 GB of HBM and a T4 with 16 GB are not
remotely interchangeable for a job whose working set (weights +
gradients + optimizer state + activations) needs 60+ GB. Before sizing
anything, the real question is never "does this VM have a GPU" — it's
"does this specific GPU model have enough VRAM, and enough interconnect
bandwidth to other GPUs, for this specific job."

## Key terms

| Term | Meaning |
|---|---|
| NC / ND / NV-series | Azure's GPU VM families: NC = general GPU compute, ND = large-scale training (NVLink + InfiniBand), NV = visualization/virtual desktop |
| P-series / G-series | AWS's GPU instance families: P = training-focused (NVLink + EFA), G = cost-effective inference/graphics |
| NVLink | High-bandwidth, direct GPU-to-GPU interconnect within a single server, used on ND and P4d/P5-class instances |
| EFA / InfiniBand | High-bandwidth networking between separate VMs/instances, needed for multi-node distributed training |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
is an Azure NV-series VM or an AWS G4dn instance the wrong choice for
training a large model across multiple GPUs, even though both have
NVIDIA GPUs attached?
