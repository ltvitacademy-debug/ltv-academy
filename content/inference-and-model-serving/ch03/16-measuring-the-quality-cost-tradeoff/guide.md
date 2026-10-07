# Measuring the Quality/Cost Trade-off

You now have three compression levers — quantization, pruning, and distillation — plus the earlier framework-level choices from Chapter 2. None of them are free, and none of them are universally "worth it." This closing lesson of Chapter 3 is about building the habit of actually measuring the trade-off, instead of guessing at it, before any of these techniques ship to production.

## What you'll learn

- Why a single accuracy number is never enough to evaluate a compressed model
- The difference between intrinsic metrics (perplexity) and task-specific benchmarks
- How to combine quality measurements with the latency/throughput/cost numbers from Lesson 5
- A simple decision framework for choosing between quantization, pruning, and distillation

## Quality isn't one number

**Perplexity** — roughly, how "surprised" the model is by held-out real text, with lower being better — is the cheapest quality check you can run: it needs no labeled task data, just a sample of representative text. But perplexity can stay nearly flat while a model's performance on a specific downstream task quietly collapses, because perplexity measures general language modeling, not task competence. That's why production teams pair perplexity with **task-specific benchmarks** — accuracy on MMLU (broad knowledge), HellaSwag (commonsense completion), GSM8K (math reasoning), or better yet, an eval set built from your own actual use case. A quantized model can look essentially identical to its FP16 original on perplexity and general benchmarks while measurably degrading on a narrow skill your product actually depends on, like multi-step reasoning or structured output formatting — which is why relying on a published benchmark score instead of your own eval set is one of the most common mistakes in compression work.

## Quality numbers mean nothing without cost numbers next to them

Lesson 5 gave you the vocabulary for measuring inference performance: latency (time to first token, time per output token), throughput (tokens or requests per second), and the GPU memory footprint behind both. Every compression decision in this chapter should be evaluated as a pair of numbers, not one: *quality retained* **and** *cost saved*. A technique that saves 10% on GPU memory while losing 3 points of accuracy on your eval set is a bad trade if memory was never the constraint; the same 3-point loss might be an easy call if it's what lets a model fit on half as many GPUs. There is no universal threshold for "acceptable" quality loss — it depends entirely on what the saved cost is being spent on.

## A decision framework for the three levers

| Lever | Typical savings | Effort to apply | Quality-risk profile |
|---|---|---|---|
| Quantization (Ch. 12-13) | ~2-4x memory, strong decode speedup | Low — hours, calibration only | Low at INT8, moderate at INT4 depending on method |
| Pruning (Lesson 14) | Size savings reliable; speed only with structured/N:M sparsity + hardware support | Medium — needs fine-tuning to recover accuracy | Moderate to high, especially unstructured at high sparsity |
| Distillation (Lesson 15) | Largest possible size/latency cuts (new, smaller architecture) | High — a real training run | Depends heavily on training budget and teacher quality |

A practical rule of thumb: reach for quantization first, since it's the cheapest to try and reverse. Add pruning when you specifically have hardware that accelerates structured sparsity. Reserve distillation for when you need a genuinely smaller architecture and can afford a real training run — and remember all three can be stacked, so "quantization only" is a starting point, not a ceiling.

## Key terms

| Term | Meaning |
|---|---|
| Perplexity | A measure of how well a model predicts held-out text; cheap but not task-specific |
| Task-specific benchmark | An eval (MMLU, HellaSwag, GSM8K, or a custom set) targeting a specific skill |
| Quality-cost pair | Evaluating a compression technique by both quality retained and cost saved together |
| Eval harness | Tooling (e.g. lm-evaluation-harness) that runs a model against standard benchmark suites |

## Recap

No compression technique should ship on quality or cost alone — perplexity catches gross regressions cheaply, task-specific benchmarks and your own eval set catch the regressions that actually matter to your product, and every result should be read alongside the latency/throughput/memory numbers from Lesson 5. With that framework in hand, Chapter 3 is complete. Chapter 4 turns to a different category of optimization entirely: the KV cache and the LLM-specific serving techniques — PagedAttention, continuous batching, speculative decoding — built around it.
