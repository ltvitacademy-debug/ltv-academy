# Compute Budgets & Why They Matter

Before a single GPU boots up, every large training run starts with a budget: a fixed amount of compute, usually expressed in floating-point operations (FLOPs) or GPU-hours, that has to be split between model size, dataset size, and training time. This lesson gives you the arithmetic behind that budget and the scaling-law intuition that tells practitioners how to spend it well.

## What you'll learn

- The rule-of-thumb FLOPs formula for transformer training: C ≈ 6ND
- What "compute-optimal" means, and the Chinchilla finding about parameters vs. tokens
- How to convert a FLOPs budget into real-world GPU-hours
- Why Model FLOPs Utilization (MFU) determines how much of your hardware you actually get

## The 6ND rule of thumb

For a dense transformer trained with standard backpropagation, the total training compute in FLOPs is commonly approximated as:

```
C ≈ 6 * N * D
```

where **N** is the number of (non-embedding) model parameters and **D** is the number of training tokens. The factor of 6 comes from roughly 2 FLOPs per parameter per token for the forward pass, doubled to ~4 for backward pass gradients, plus additional terms — 6 is the widely used rough constant from Kaplan et al.'s scaling-laws work. This formula is an approximation, not an exact accounting, but it's accurate enough to plan a run.

```python
def training_flops(n_params: int, n_tokens: int) -> float:
    """Rough compute estimate for dense transformer pretraining."""
    return 6 * n_params * n_tokens

# A 7B-parameter model trained on 2T tokens
flops = training_flops(n_params=7e9, n_tokens=2e12)
print(f"{flops:.2e} FLOPs")  # ~8.4e22 FLOPs
```

## Compute-optimal allocation: the Chinchilla finding

Given a fixed compute budget, how should you split it between making the model bigger (N) versus training on more tokens (D)? DeepMind's "Chinchilla" scaling-law paper (Hoffmann et al., 2022) found that many earlier large models were **over-parameterized relative to their training data** — they would have performed better at the same compute cost with a smaller model trained on proportionally more tokens. Their fitted compute-optimal relationship suggests scaling parameters and tokens at roughly the same rate as compute grows, with a commonly cited practical rule of training on somewhere around 20 tokens per parameter for compute-optimal allocation at the scales they studied. Modern frontier labs often deliberately train well past this ratio (more tokens per parameter) because inference cost, not just training compute, matters once a model ships.

## From FLOPs to GPU-hours

A FLOPs number is abstract until you convert it into wall-clock time on real hardware. That conversion depends on the accelerator's peak throughput and how much of that peak you actually realize:

```python
def gpu_hours(total_flops: float, peak_flops_per_sec: float, mfu: float) -> float:
    """Convert a FLOPs budget into GPU-hours given achieved utilization (MFU)."""
    achieved_flops_per_sec = peak_flops_per_sec * mfu
    seconds = total_flops / achieved_flops_per_sec
    return seconds / 3600

# One H100 SXM, ~989 TFLOPs/s bf16 peak (dense, no sparsity), 40% MFU
hours = gpu_hours(total_flops=8.4e22, peak_flops_per_sec=989e12, mfu=0.40)
print(f"{hours:.0f} GPU-hours on a single H100")
```

**Model FLOPs Utilization (MFU)** is the fraction of a GPU's theoretical peak FLOPs you actually achieve during real training, after accounting for communication overhead, memory-bandwidth limits, and pipeline/data-loading stalls. Well-tuned large training runs often report MFU in the 35–50% range; a poorly tuned one can fall well below that, silently doubling your real-world cost for the same FLOPs budget.

## Why this matters for every decision downstream

Every choice in this course — vocabulary size, sequence length, data mixture, even which optimizer to use — ultimately trades off against this same budget. A larger vocabulary costs more embedding/output-matrix compute; a longer context window costs more attention compute; more tokens of training data costs more wall-clock time at a fixed cluster size. Thinking in FLOPs and GPU-hours from the start keeps every later architecture and data decision grounded in what's actually affordable.

## Key terms

- **FLOPs** — floating-point operations; the standard unit for measuring total training compute
- **C ≈ 6ND** — rough compute estimate: 6 × parameters × training tokens
- **Compute-optimal (Chinchilla) scaling** — balancing model size and token count to get the best loss for a fixed compute budget
- **MFU (Model FLOPs Utilization)** — the fraction of a GPU's peak FLOPs actually achieved during real training

## Recap

Training compute is commonly estimated as roughly 6 times parameters times tokens, and the Chinchilla scaling-law work showed that balancing model size against token count — rather than just scaling up parameters — gets the best result per unit of compute. Converting a FLOPs budget into real GPU-hours depends heavily on MFU, the fraction of peak hardware performance you actually realize. Next up, Lesson 3: an overview of the data pipeline that has to supply all those tokens.
