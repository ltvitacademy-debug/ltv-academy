# Script — Measuring the Quality/Cost Trade-off

## Segment 1 (title)

You now have three compression levers — quantization, pruning, distillation. None of them are free, and none are universally worth it. This closing lesson is about actually measuring the trade-off instead of guessing at it.

## Segment 2 (steps)

Perplexity is the cheapest quality check — no labeled data needed, just a sample of real text — but it can stay flat while a specific downstream skill quietly collapses, because it measures general language modeling, not task competence. That's why teams pair it with task-specific benchmarks, and ideally an eval set built from their own actual use case.

## Segment 3 (steps)

Quality numbers mean nothing without cost numbers next to them. Every compression decision should be read as a pair: quality retained, and cost saved — latency, throughput, memory footprint, the vocabulary from lesson five. A ten percent memory savings for a three point accuracy loss is a bad trade if memory was never the constraint, and an easy call if it's what lets the model fit on half as many GPUs.

## Segment 4 (steps)

A practical order: reach for quantization first, since it's cheapest to try and easiest to reverse. Add pruning when you specifically have hardware that accelerates structured sparsity. Reserve distillation for when you need a genuinely smaller architecture and can afford a real training run. And remember all three stack.

## Segment 5 (code)

Here's what running that evaluation actually looks like: lm-evaluation-harness against your compressed checkpoint, across a few standard tasks, compared against the same run on the uncompressed baseline.

## Segment 6 (outro)

That closes chapter three. Chapter four turns to a different category of optimization: the KV cache, and the serving techniques — PagedAttention, continuous batching, speculative decoding — built around it, starting with lesson seventeen.
