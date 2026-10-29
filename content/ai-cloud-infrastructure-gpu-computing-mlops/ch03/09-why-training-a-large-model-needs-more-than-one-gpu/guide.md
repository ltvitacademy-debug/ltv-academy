# Lesson 9 — Why Training a Large Model Needs More Than One GPU

**Chapter 3 · Distributed Training Infrastructure · Lesson 1 of 4**

## What you'll learn

- Why a model's parameter count alone can exceed a single GPU's
  memory, before a single byte of training data is loaded
- The four things that actually have to fit in GPU memory during
  training — parameters, gradients, optimizer state, and activations
  — and why optimizer state is usually the biggest of the four
- Why even a model that *does* fit on one GPU can still need many GPUs,
  because of how long training would otherwise take
- How these two separate pressures — memory and wall-clock time — both
  push toward the same answer: distributed training

## Memory: parameters are the smallest line item, not the biggest

It's tempting to estimate GPU memory needs from parameter count alone:
a 7-billion-parameter model, stored in FP16, is "only" about 14GB —
well within an 80GB A100 or H100. That estimate is wrong, because
training keeps several other full-sized copies of the model in memory
at the same time:

- **Parameters** — the weights themselves. 14GB for a 7B model in FP16.
- **Gradients** — one gradient value per parameter, computed during the
  backward pass. Same size as the parameters: another ~14GB.
- **Optimizer state** — this is the one people forget. Adam, the
  optimizer behind most modern training, keeps a first and second
  moment estimate *per parameter*, typically in FP32 for stability.
  That's two more full-precision copies of every parameter — roughly
  4x the parameter memory on top of what's already there.
- **Activations** — the intermediate outputs of every layer, kept
  around during the forward pass so the backward pass can compute
  gradients against them. This one scales with batch size and sequence
  length, not just parameter count, and for transformer models it can
  rival or exceed the weights themselves at long context lengths.

Add it up for that same 7B model with mixed-precision Adam: parameters
(14GB) + gradients (14GB) + optimizer state (~56GB) is already past
80GB before a single activation is stored. A model doesn't have to be
GPT-3-scale to outgrow one GPU — a comparatively modest model does it
through the optimizer alone.

## Compute: fitting isn't the only problem

Suppose a model genuinely does fit, memory and all, on one GPU.
Training can still be impractical on a single device, because of how
much total compute the job requires. Training compute scales with both
model size and dataset size — a bigger model needs more FLOPs per
token processed, and a larger training set means more tokens to
process overall. Frontier models today are trained on trillions of
tokens. Even a GPU capable of hundreds of teraFLOPs of sustained
throughput would take an impractical number of GPU-days to grind
through that much data alone — weeks or months where the business
need is days.

That's the second, independent pressure: even when memory isn't the
limiter, raw training time is. Splitting the same amount of total work
across many GPUs running in parallel is what turns a multi-month job
into a multi-day one.

## Two different problems, two different fixes

This matters because memory pressure and time pressure call for
different kinds of parallelism, which the next lesson covers in
detail:

- When the model fits on a GPU but training takes too long, the fix is
  **data parallelism** — replicate the whole model on every GPU, and
  split the dataset across them.
- When the model itself doesn't fit on a GPU, replication doesn't even
  get off the ground. The fix is **model parallelism** — split the
  model itself across GPUs.

Large-scale training usually needs both at once, which is why you'll
see production training clusters described as running "3D parallelism"
— combining data, tensor, and pipeline parallelism together. Lesson 10
breaks down exactly what each of those terms means and when each one
is the right tool.

## Key terms

| Term | Meaning |
|---|---|
| Parameters | The model's learned weights; memory cost scales directly with parameter count and precision |
| Gradients | Per-parameter derivatives computed in the backward pass; same size as the parameters |
| Optimizer state | Per-parameter values an optimizer like Adam keeps between steps (e.g. first/second moment estimates); often the largest memory consumer of the four |
| Activations | Intermediate layer outputs kept for the backward pass; scales with batch size and sequence length, not just model size |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
can a 7-billion-parameter model, which easily fits in 14GB as raw
weights, still require far more than 80GB of GPU memory to train — and
why would a model that *does* fit in memory still sometimes need
multiple GPUs anyway?
