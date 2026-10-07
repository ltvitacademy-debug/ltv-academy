# Numerical Issues in Training Code

NaN loss is the most famous numerical failure in deep learning, but it's the loud version — the run obviously breaks and everyone notices. The more dangerous numerical issues are the ones that degrade a run without crashing it: gradients that silently overflow under mixed precision, a `log(0)` that happens rarely enough to go unnoticed, or a loss that's technically finite but has lost most of its useful precision. This lesson covers both ends: catching the loud NaN fast, and catching the quieter precision problems that only show up as "this run is a bit worse than it should be."

## What you'll learn

- Where NaNs and Infs actually originate in a training loop, and how to localize them fast
- Why mixed-precision training (fp16/bf16) introduces a specific category of numerical bug that fp32 doesn't have
- Gradient clipping and loss scaling as the standard mitigations, and what each actually does
- How to add cheap, targeted checks that catch numerical issues within a few steps instead of a few hours

## Where NaNs actually come from

A NaN in the loss is a symptom, not the cause — the actual source is almost always a handful of specific operations:

- `log(0)` or `log(negative)`, often from a probability that underflowed to exactly 0.0 before `log` was applied
- Division by a sum that can be exactly zero (an empty mask, a batch with no positive examples)
- `0/0` inside a normalization (e.g., a `LayerNorm` or softmax column where every input was masked out)
- Exploding gradients during backward, particularly in recurrent or very deep architectures without normalization

The fastest way to localize which operation produced a NaN is `torch.autograd.set_detect_anomaly(True)`, which raises at the exact backward op responsible instead of letting the NaN silently flow downstream through dozens of subsequent operations:

```python
import torch

torch.autograd.set_detect_anomaly(True)   # expensive -- use for debugging, not every run

loss = compute_loss(model, batch)
loss.backward()   # raises here, naming the exact op, if a NaN/Inf shows up in its gradient
```

For a cheaper always-on check that doesn't carry anomaly detection's overhead, assert on the loss value directly before calling `.backward()`:

```python
loss = compute_loss(model, batch)
if not torch.isfinite(loss):
    raise RuntimeError(f"Non-finite loss at step {step}: {loss.item()}")
loss.backward()
```

## The mixed-precision-specific failure mode

Training in fp16 halves memory and roughly doubles throughput on supporting hardware, but fp16 has a much smaller exponent range than fp32 — gradients that would be representable in fp32 can silently underflow to zero or overflow to Inf in fp16, well before the loss itself looks wrong. This is why `torch.cuda.amp` pairs mixed precision with **loss scaling**: multiply the loss by a scale factor before backward (pushing small gradients up into fp16's representable range), then unscale before the optimizer step:

```python
scaler = torch.cuda.amp.GradScaler()

with torch.cuda.amp.autocast():
    loss = compute_loss(model, batch)

scaler.scale(loss).backward()      # scales up before backward to avoid underflow
scaler.unscale_(optimizer)          # unscale before clipping/stepping
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
scaler.step(optimizer)              # skips the step entirely if an Inf/NaN was found
scaler.update()                     # adjusts the scale factor for next time
```

`bf16` (bfloat16) sidesteps the underflow/overflow problem almost entirely — it keeps fp32's exponent range but with less mantissa precision — which is why many large-scale training setups prefer it over fp16 specifically to avoid loss-scaling complexity, at the cost of somewhat coarser precision per value.

## Gradient clipping as a general safety net

Independent of precision, gradient clipping caps the norm of the gradient before the optimizer step, which prevents a single bad batch (or a brief instability) from throwing weights into a region they can't recover from:

```python
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
```

A clipped gradient norm that's consistently hitting the max (rather than occasionally) is itself a useful diagnostic signal — it usually means the learning rate is too high or there's an underlying instability worth investigating rather than just clipping away.

## Cheap continuous checks worth leaving on

A few numerical checks are cheap enough to run every step without materially slowing training down, and catch issues within minutes instead of after a multi-hour run has already wasted compute: asserting the loss is finite, logging the gradient norm every step (not just when clipped), and logging the fraction of parameters whose gradient is exactly zero (a sign of dead units or a detached subgraph).

## Key terms

- **Loss scaling** — multiplying the loss by a scale factor before backward to push small gradients into fp16's representable range, then unscaling before the optimizer step
- **Gradient clipping** — capping the norm of the gradient before the optimizer step to prevent a single unstable batch from corrupting the weights
- **bf16 (bfloat16)** — a 16-bit float format with fp32's exponent range but reduced mantissa precision, avoiding fp16's underflow/overflow failure mode
- **Anomaly detection** — a PyTorch debug mode that raises an exception at the specific backward operation that produced a NaN/Inf
