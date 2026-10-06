# Lesson 22 — LoRA & Parameter-Efficient Tuning, Conceptually

**Chapter 4 · Fine-Tuning & Customization · Lesson 22 of 31**

## What you'll learn

- Why full fine-tuning is expensive in a specific, structural way — not just "it costs money"
- The core idea behind LoRA (Low-Rank Adaptation): freeze almost everything, train a tiny add-on
- The math shape, at a conceptual level — no linear algebra background required
- Why LoRA adapters are small enough to swap like plugins
- The two hyperparameters you'll actually encounter: rank and alpha

## The problem with full fine-tuning

A full fine-tune updates **every weight** in the model — potentially billions of numbers.
That means: training needs enough memory to hold gradients for the whole model, the
resulting checkpoint is the same enormous size as the base model, and if you want five
different fine-tuned variants, you're storing and serving five full copies of a massive
model.

## LoRA's idea: freeze the model, train a tiny detour

**LoRA (Low-Rank Adaptation)** takes a different approach. The original weights are
**frozen entirely** — never touched. Instead, small trainable matrices are inserted
alongside specific weight matrices (most commonly the attention layer's query and value
projections). Only *those* small matrices get trained.

```
Full fine-tuning:    train W directly           (huge: e.g. 4096 × 4096 = ~16.7M params)
LoRA:                freeze W, train B and A     (tiny: e.g. 4096×8 + 8×4096 = ~65K params)
                      effective weight = W + B·A
```

`B` and `A` are much smaller matrices whose product approximates the *change* a full
fine-tune would have made — not the weight itself, just a small, learned detour added on
top. The "rank" (`r`) is that narrow inner dimension — the bottleneck that keeps the whole
thing small.

## Why this matters in practice

- **Dramatically fewer trainable parameters** — often under 1% of the full model, which
  means less memory needed to train and much faster training runs.
- **Tiny storage per fine-tune** — the LoRA matrices alone are megabytes, not gigabytes,
  so storing ten task-specific adapters costs almost nothing compared to ten full model
  copies.
- **Swappable like plugins** — because the base model stays frozen and shared, you can
  load different LoRA adapters on top of the *same* base model for different tasks, and
  switch between them at inference time.
- **Less catastrophic forgetting** — since the original weights are never modified, the
  model's general capabilities are naturally preserved; the adapter only adds a narrow,
  targeted behavior.
- **Mergeable at zero extra cost** — once trained, `B·A` can optionally be merged back
  into `W` for serving, so inference has no extra latency at all compared to the original
  model.

## The two hyperparameters worth knowing

| Hyperparameter | What it controls |
|---|---|
| Rank (`r`) | The size of the bottleneck — higher rank means more capacity to learn, but more parameters and less of the efficiency win |
| Alpha | A scaling factor applied to the LoRA update, tuned alongside rank to control how strongly the adapter influences the output |

A common, well-tested starting point is a small rank (think single digits to a few dozen)
applied just to attention projections — enough capacity for most narrow customization
tasks without giving up LoRA's core efficiency advantage.

## Key terms

| Term | Meaning |
|---|---|
| LoRA | Low-Rank Adaptation — freezing the base model and training small low-rank matrices instead |
| Rank (`r`) | The bottleneck dimension of the trainable matrices; controls capacity vs. efficiency |
| Adapter | The small set of trained LoRA matrices for one task, loadable on top of a shared frozen base |
| Catastrophic forgetting | A model losing general capability while being specialized for a narrow task |
| Merging | Folding a trained LoRA adapter's effect back into the base weights for zero extra inference cost |

## Lab

1. Explain, in one sentence, why a LoRA adapter can be megabytes instead of gigabytes.
2. Describe what "merging" an adapter means, and why you might choose to do it (or not).
3. Explain why training only a small low-rank detour tends to preserve the base model's
   general capabilities better than updating every weight.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking, what LoRA actually
trains instead of the full weight matrix, and why that makes adapters small enough to
swap like plugins.
