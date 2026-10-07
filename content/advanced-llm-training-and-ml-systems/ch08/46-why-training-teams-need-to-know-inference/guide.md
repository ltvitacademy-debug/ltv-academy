# Why Training Teams Need to Know Inference

Everything so far in this course — tokenization, pretraining, SFT, parallelism, evaluation — has been about producing a good checkpoint. None of it matters to a user until that checkpoint is actually serving requests. This chapter is a deliberately narrow slice of inference engineering aimed at training engineers: not how to build a production serving stack, but enough of the vocabulary and the cost structure to make training-time decisions that don't create serving headaches, and to talk credibly with the team that will run the model in production.

## What you'll learn

- Why training and inference have fundamentally different performance profiles
- The prefill vs. decode split, and why decode is the expensive, awkward phase
- How architecture choices made for training quality quietly set an inference cost floor
- The vocabulary (throughput, latency, time-to-first-token) that lets you talk to a serving team
- Where the rest of this chapter is headed: KV cache, quantization, cost estimation, handoff

## Training is throughput-bound; inference is often latency-bound

Training optimizes for one thing: get through as much data as possible per GPU-hour, at whatever batch size keeps the hardware saturated. Latency on any single example is irrelevant — nobody is waiting on one forward-backward pass. Inference, especially interactive inference, is the opposite: a user is waiting right now for tokens to appear, and a technically "efficient" server that batches aggressively but makes every user wait 10 seconds for a first token is a product failure, not a win. The same model, the same GPUs, and a completely different optimization target.

## Prefill and decode are different workloads

Serving an autoregressive LLM happens in two phases with very different hardware behavior:

- **Prefill** — the prompt's tokens are processed in a single forward pass. This is compute-bound: large matrix multiplies, good GPU utilization, and it's where **time-to-first-token (TTFT)** comes from.
- **Decode** — each subsequent output token requires its own forward pass over just that one new token, attending back over everything generated so far via the KV cache (next lesson). This is memory-bandwidth-bound, not compute-bound — the GPU spends most of its time moving cached keys and values rather than doing dense math, and it's where **time-per-output-token (TPOT)** and overall throughput come from.

A model that trains efficiently can still decode slowly, because training never exercises the decode path at all — training sees full sequences in parallel, with teacher-forcing, not one token generated at a time.

```python
# What "latency" actually decomposes into for a serving team
# TTFT: time-to-first-token   -- dominated by prefill, scales with prompt length
# TPOT: time-per-output-token -- dominated by decode, scales with KV cache size
# Total latency ~= TTFT + (num_output_tokens * TPOT)
# Throughput (tokens/sec) is what a serving team maximizes across *concurrent* requests,
# which is a different objective than minimizing one user's latency.
```

## Architecture choices made in training set an inference floor

Decisions this course has already covered for training-quality reasons have direct, sometimes dominant, inference costs:

- **Context length** — a model trained to support very long contexts carries a KV cache cost at serving time proportional to that length, for every request, whether or not most requests use it.
- **Attention variant** — plain multi-head attention (MHA) keeps a full set of key/value projections per head; grouped-query attention (GQA) and multi-query attention (MQA), chosen partly for training efficiency at scale, also shrink the KV cache dramatically at serving time. This is a case where a training-side choice and a serving-side win happen to align.
- **Vocabulary size** — a larger vocabulary means a larger final projection layer and a larger logits tensor to compute and sample from on every single decode step.

None of this means training engineers should start making serving decisions unilaterally — but a model handed off with no awareness of these costs is how a team ends up needing an emergency re-architecture after the fact.

## The vocabulary worth knowing

Even without running a serving stack yourself, these terms let you read a serving team's dashboards and have a real conversation: **throughput** (tokens/sec across all concurrent requests), **latency** (TTFT and TPOT, as above), **batch size** (how many requests are processed together — batching helps throughput but can hurt individual latency), and **concurrency** (how many requests are in flight at once, which is what a serving stack like vLLM or TGI is built to manage).

## Key terms

- **Prefill** — the compute-bound forward pass over a prompt's tokens, producing the first output token
- **Decode** — the memory-bandwidth-bound, one-token-at-a-time generation phase that follows prefill
- **Time-to-first-token (TTFT)** — latency from request arrival to the first generated token, dominated by prefill
- **Time-per-output-token (TPOT)** — the marginal latency of each subsequent token, dominated by decode
- **Throughput** — aggregate tokens/sec a serving system produces across concurrent requests, not a single user's speed
