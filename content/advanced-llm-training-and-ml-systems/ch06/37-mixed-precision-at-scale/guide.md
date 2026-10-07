# Mixed Precision at Scale

Every lesson so far in this chapter has assumed training happens in some mix of floating-point precisions, without saying exactly what that means or why it matters at scale. This lesson makes that explicit: why full fp32 training is wasteful, what can go wrong with naive fp16, why bf16 became the practical default for large models, and how precision choices interact with the distributed systems machinery from Lessons 35 and 36.

## What you'll learn

- Why fp32 everywhere is too slow and memory-hungry for large-scale training
- The specific numerical failure mode fp16 has that bf16 avoids
- How `torch.autocast` and `GradScaler` work together for fp16 training
- Why bf16 needs no loss scaling, and why that simplicity matters at scale
- Where mixed precision is configured in FSDP and DeepSpeed, and the emerging role of fp8

## Why not just train in fp32

Full 32-bit floating point gives the most numerical headroom, but it costs twice the memory of 16-bit formats for every parameter, gradient, and activation, and modern GPU tensor cores run 16-bit matrix multiplies substantially faster than 32-bit ones. At the scale of a multi-billion-parameter model, that memory and throughput cost is the difference between a run that fits on the available hardware and one that doesn't, or between a run that finishes in weeks versus months. Mixed precision training keeps numerically sensitive operations (like the master weight copy and certain reductions) in fp32 while running the bulk of the matrix multiplications in a 16-bit format, capturing most of the speed and memory benefit without fully sacrificing numerical stability.

## fp16's specific failure mode

fp16 (IEEE half precision) has a much narrower *exponent* range than fp32 — it can represent fewer orders of magnitude before overflowing to infinity or underflowing to zero. Gradients during training routinely span a wide dynamic range, and small gradients common in deep networks can underflow to exactly zero in fp16, silently stopping those weights from updating. The standard fix is loss scaling: multiply the loss by a scale factor before backpropagation (pushing small gradients up into fp16's representable range), then divide the resulting gradients by the same factor before the optimizer step. `torch.cuda.amp.GradScaler` automates this, including dynamically adjusting the scale factor up or down based on whether it detects overflow (inf/nan) in a given step.

```python
import torch
from torch.cuda.amp import GradScaler

scaler = GradScaler()

with torch.autocast(device_type="cuda", dtype=torch.float16):
    loss = model(input_ids).loss

scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
```

## Why bf16 avoids the problem entirely

bf16 (bfloat16) trades precision for range: it has the *same* 8-bit exponent width as fp32 (so the same dynamic range and overflow/underflow behavior) but fewer mantissa bits than fp16 (less fine-grained precision within that range). For LLM training, where avoiding gradient underflow matters more than mantissa precision, this trade is almost always favorable — bf16 training needs no loss scaling at all, which removes an entire class of tuning (scale factor schedules, overflow-triggered step skips) that fp16 requires. This is why bf16, not fp16, became the practical default for large-model pretraining once hardware (Ampere-generation GPUs and later) supported it natively.

```python
with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
    loss = model(input_ids).loss
loss.backward()
optimizer.step()
# No GradScaler needed -- bf16's exponent range matches fp32
```

## Configuring it at the framework level

In FSDP, precision is set declaratively through `MixedPrecision(param_dtype=torch.bfloat16, reduce_dtype=torch.bfloat16, buffer_dtype=torch.bfloat16)` passed to the FSDP wrapper, controlling the dtype used for parameters, gradient reduction, and buffers independently. DeepSpeed exposes the equivalent through its JSON config with `"bf16": {"enabled": true}` or `"fp16": {"enabled": true, "loss_scale": 0}` (a `loss_scale` of `0` tells DeepSpeed to use dynamic loss scaling automatically). Looking slightly ahead of this course's scope, fp8 is an emerging lower-precision format (supported via NVIDIA's Transformer Engine on Hopper-generation GPUs) that pushes the same trade-off further for even more throughput, at the cost of needing careful per-tensor scaling to stay numerically stable.

## Key terms

- **Mixed precision training** — running most matrix multiplications in a 16-bit format while keeping numerically sensitive operations in fp32
- **Loss scaling** — multiplying the loss before backpropagation to push small gradients into fp16's representable range, then unscaling before the optimizer step
- **`GradScaler`** — PyTorch's utility that automates and dynamically tunes loss scaling for fp16 training
- **bf16 (bfloat16)** — a 16-bit format with fp32's exponent range but fewer mantissa bits, avoiding fp16's underflow problem without loss scaling
- **fp8** — an emerging 8-bit format offering further throughput gains at the cost of requiring careful per-tensor scaling
