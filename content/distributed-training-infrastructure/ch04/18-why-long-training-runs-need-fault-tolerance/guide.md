# Why Long Training Runs Need Fault Tolerance

Chapter 3 covered how Solara-70B's training job gets scheduled, queued, and gang-scheduled onto all 512 GPUs at once. This chapter asks the next question: what happens when, hours or days into that run, one of those 512 GPUs — or one of the 64 nodes, or a network link, or a power supply — simply fails? At this scale, "if" is the wrong word. This lesson makes the case, with real numbers, for why fault tolerance isn't an optional nicety for a run like Solara-70B's.

## What you'll learn

- Why failure probability compounds with scale, not just with time
- Rough hardware failure rates for GPUs and how they translate to expected failures across 512 of them over weeks
- What "fault tolerance" actually buys you: not avoiding failure, but surviving it cheaply
- Where checkpointing, elastic training, and node-failure design (the rest of this chapter) each fit into the answer

## Failure probability compounds with scale

A single GPU failing during a week of training is rare. But solara-train isn't training on one GPU — it's training on 512 of them simultaneously, for a run that might take weeks. If any single GPU has even a small probability of a hardware fault in a given week, the probability that *at least one* of 512 GPUs fails that week is much higher than the single-GPU number, because the chance compounds across every GPU and every node, every NVLink connection, and every InfiniBand port in the fleet. This is the same logic as "what's the chance at least one person in a room of 500 shares your birthday" — individually unlikely events become likely once you have enough of them running in parallel.

## Putting rough numbers on it

Industry-reported annualized failure rates for GPUs in large fleets are commonly cited in the low single-digit percent range per GPU per year (exact rates vary by hardware generation, cooling, and workload). Even at a conservative 2% annualized failure rate per GPU, with 512 GPUs running continuously, the expected number of GPU-level failures across the fleet over a single year works out to roughly 512 × 0.02 ≈ 10 failures — spread across the months a Solara-70B training run might span. That's before counting node-level failures (a failed DIMM, a bad PSU, a NIC flapping) that take all 8 GPUs on that node offline at once, or network failures that strand a node from the fabric without any GPU itself being broken. A training run long enough to need weeks of wall-clock time should expect to encounter at least one hardware fault somewhere in the fleet, not treat it as a surprise.

## What a single failure costs without fault tolerance

Recall from Lesson 15: NCCL's collective operations are synchronous across every rank. If one of the 512 GPUs backing Solara-70B's training disappears mid-`AllReduce`, that collective call hangs — it doesn't silently continue with 511. Without any fault-tolerance strategy, the only recovery is restarting the entire job from scratch, which means every GPU-hour spent on that run since it started is gone. For a job that's been running for two weeks, a single bad GPU on day 13 would otherwise cost two weeks of 512-GPU time — an enormous, completely avoidable loss.

## What fault tolerance actually buys you

Fault tolerance isn't about preventing hardware from failing — hardware will fail, at the rate the numbers above suggest, regardless of how careful anyone is. It's about making a single failure cheap to recover from instead of catastrophic. The rest of this chapter covers the three pieces that do that: checkpointing (Lessons 19-20) so a restart resumes from minutes of lost progress instead of weeks, elastic training (Lesson 22) so a job can sometimes keep running with fewer nodes rather than stopping outright, and node-failure design (Lesson 23) so the platform detects and routes around a bad node automatically instead of requiring a human to notice first.

## Key terms

| Term | Meaning |
|---|---|
| Annualized failure rate (AFR) | Expected probability a given piece of hardware fails within a year |
| Compounding failure probability | Why a fleet of many components fails more often than any single component suggests |
| Node-level failure | A hardware fault (PSU, DIMM, NIC) that takes an entire multi-GPU node offline at once |
| Fault tolerance | Design that makes recovering from a failure cheap, not design that prevents failure |

## Recap

At 512 GPUs and weeks of wall-clock time, hardware failure during a Solara-70B run isn't a tail risk — it's an expected event, and without fault tolerance it costs the entire run's progress. Next lesson: Checkpoint Storage Strategies, the first and most important piece of making that failure cheap.
