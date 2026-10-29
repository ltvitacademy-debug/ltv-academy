# Lesson 22 — Spot GPUs, and the Real Interruption Tradeoffs for Training

**Chapter 6 · Cost Optimization for AI and GPU Workloads · Lesson 22 of 32**

## What you'll learn

- What a spot (AWS) or Spot/low-priority (Azure) GPU instance actually
  is, and why the discount compared to on-demand is substantial
- Why that discount exists — spare capacity the cloud can reclaim on
  short notice — and what "short notice" means in practice
- Why losing a spot GPU mid-training is a much bigger problem than
  losing a spot CPU instance mid-batch-job
- Why checkpointing, covered earlier in this course, is the mechanism
  that makes spot GPUs for training a reasonable tradeoff instead of a
  gamble

## What a spot GPU instance actually is

Both major clouds sell the same underlying idea under different
names: **Spot Instances** on AWS, **Spot VMs** on Azure. Instead of
guaranteeing you a GPU for as long as you keep paying for it, the
cloud sells you access to *spare* GPU capacity it isn't currently
using for on-demand or reserved customers — at a meaningfully lower
price, because that capacity would otherwise sit idle. In exchange,
the cloud reserves the right to take that GPU back with short notice
(commonly on the order of two minutes) whenever an on-demand or
reserved customer needs it, or whenever the spot market price moves
against you, depending on the cloud's specific mechanism.

The discount is genuinely significant — illustrative framing again,
not a quoted rate: spot GPU pricing commonly lands somewhere in the
range of a fraction to well under half of the equivalent on-demand
rate, which, given how expensive GPU on-demand pricing already is
(Lesson 21), is real money at any scale. That's exactly why it's
tempting, and exactly why it's worth understanding the tradeoff
precisely rather than treating it as a free discount.

## Why the discount exists: reclaimable, not guaranteed

The mechanism behind the discount is the same on both clouds: you are
using capacity the provider would rather sell to you cheaply than let
sit unused, and you are agreeing that it can be reclaimed with little
warning. On AWS, a Spot Instance can be interrupted when EC2 needs the
capacity back, with a two-minute interruption notice delivered before
reclamation. On Azure, a Spot VM can be evicted either when Azure
needs the capacity back or when the current spot price exceeds the
max price you set, and eviction notice is similarly short. Neither
cloud is promising you anything about *when* that happens — it could
be five minutes into a job or five days in.

## Why this matters more for training than for almost anything else

A spot CPU instance running a stateless batch job is a comfortable
use case: if it's reclaimed, you restart the batch job, and you've
lost a few minutes of progress on work that was cheap to redo. A spot
GPU instance running a multi-hour (or multi-day) training run is a
completely different risk profile. Training runs accumulate state —
model weights, optimizer state, the position in the data pipeline —
over hours of expensive compute. If the instance is reclaimed with
two minutes' notice and that state hasn't been saved anywhere durable,
you don't lose a few minutes of cheap work; you lose however many
hours of GPU time the job had already consumed, at the GPU's already
high rate, and you start over from nothing.

This is the real tradeoff spot GPUs present for training: a
substantial discount against a real, non-hypothetical risk of losing
expensive, already-sunk compute time to an interruption you don't
control the timing of.

## Checkpointing is what makes the tradeoff survivable

This is exactly why Chapter 3's lesson on checkpointing and fault
tolerance for long training runs isn't just a reliability concern — it's
the mechanism that turns spot GPUs from a gamble into a legitimate
cost-optimization tool. If a training job checkpoints its model and
optimizer state to durable storage at a reasonable interval (say,
every N steps or every few minutes), then a spot interruption only
costs you the work done *since the last checkpoint*, not the entire
run. Combine that with a job orchestrator that, on receiving the
interruption notice, triggers an immediate checkpoint save and then
automatically relaunches the job on new spot capacity resuming from
that checkpoint, and the interruption becomes an operational blip
measured in minutes, not a catastrophic loss measured in days.

In practice this means: the decision to run a training job on spot
GPUs and the decision about how aggressively to checkpoint are not
separate decisions. A team that wants the spot discount on a long
training run needs tighter checkpointing than a team that's paying
on-demand for guaranteed, uninterrupted capacity. Treat frequent,
reliable checkpointing as the price of admission for using spot GPUs
on anything that takes more than a few minutes to train.

## Where spot GPUs fit, and where they don't

Spot GPUs are a strong fit for checkpoint-friendly training workloads:
large pretraining or fine-tuning jobs with regular checkpointing,
hyperparameter sweeps where any individual run is disposable,
and batch or offline inference jobs that can simply resume or retry.
They're a poor fit for anything that needs a guaranteed, continuously
available GPU with no tolerance for a gap — most notably real-time
inference serving, which Chapter 4 covered, where an interruption
means dropped requests, not just a delayed training step. The cost
decision in this chapter is specifically about training; serving
workloads generally stay on-demand or reserved capacity precisely
because they can't absorb an unscheduled eviction the way a
checkpointed training job can.

## Key terms

| Term | Meaning |
|---|---|
| Spot Instance / Spot VM | A discounted GPU instance drawn from spare cloud capacity, reclaimable with short notice (AWS: Spot Instances; Azure: Spot VMs) |
| Interruption / eviction notice | The short warning window (commonly around two minutes) a cloud gives before reclaiming a spot instance |
| Checkpointing | Periodically saving model and optimizer state to durable storage so a job can resume rather than restart from zero |
| Resumable job design | A training pipeline built to detect an interruption, save state, and automatically relaunch from the last checkpoint on new capacity |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
is losing a spot GPU mid-training a fundamentally bigger problem than
losing a spot CPU instance mid-batch-job, and what specific practice
from Chapter 3 turns that risk into something a team can reasonably
accept in exchange for the discount?
