# Automatic Mixed Precision Training

Last lesson you converted whole tensors between FP32, FP16, and BF16 by hand. In a real training loop, you don't want to think about that operation by operation — some ops (like matrix multiplies) are safe and fast in reduced precision, while others (like reductions and loss computation) need FP32's range to stay numerically stable. Automatic Mixed Precision, or AMP, does that triage for you. This lesson builds the real training-loop pattern you'll reuse for the rest of this chapter.

## What you'll learn

- What `torch.autocast` actually does inside a training step
- Why FP16 autocast needs a `GradScaler`, and why BF16 usually doesn't
- The exact loop shape: autocast forward, scale, backward, step, update
- The difference between the legacy `torch.cuda.amp` API and the newer unified `torch.amp` API

## What autocast does

`torch.autocast` is a context manager. Inside it, PyTorch automatically runs certain ops — mainly matrix multiplies and convolutions — in a reduced-precision dtype (FP16 or BF16), while keeping numerically sensitive ops (like softmax, layer norm, and loss reductions) in FP32. You don't rewrite your model; you just wrap the forward pass and loss computation.

```python
import torch

with torch.autocast(device_type="cuda", dtype=torch.float16):
    output = model(inputs)
    loss = loss_fn(output, targets)

loss.backward()
```

## Why FP16 needs a GradScaler

FP16's small range means small gradient values can underflow to zero before they ever reach the optimizer — a real problem, not a theoretical one. `GradScaler` fixes this by multiplying the loss by a large scale factor before `backward()`, which pushes small gradients up into FP16's representable range, then unscales them back down before the optimizer step. It also watches for `inf`/`nan` gradients and skips a step if it sees one, adjusting the scale automatically.

```python
scaler = torch.amp.GradScaler("cuda")   # newer unified API
# legacy equivalent: torch.cuda.amp.GradScaler()

for inputs, targets in train_loader:
    optimizer.zero_grad()
    with torch.autocast(device_type="cuda", dtype=torch.float16):
        output = model(inputs)
        loss = loss_fn(output, targets)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
```

## BF16: usually no scaler needed

Because BF16 keeps FP32's exponent range, gradients rarely underflow in the first place — so the standard recommendation when your GPU supports BF16 natively (Ampere and newer) is to skip `GradScaler` entirely and just autocast with `dtype=torch.bfloat16`.

```python
for inputs, targets in train_loader:
    optimizer.zero_grad()
    with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
        output = model(inputs)
        loss = loss_fn(output, targets)
    loss.backward()
    optimizer.step()
```

## Legacy vs. unified API

Older code uses `torch.cuda.amp.autocast()` and `torch.cuda.amp.GradScaler()`. PyTorch now recommends the device-agnostic `torch.autocast(device_type=..., dtype=...)` and `torch.amp.GradScaler(device)`, which work the same way but let the same code target CUDA, CPU, or other backends by changing one string. Both forms are still valid in current PyTorch — you'll see the legacy form in a lot of existing training scripts, so recognizing it matters even though you should write the unified form going forward.

## Key terms

| Term | Meaning |
|---|---|
| `torch.autocast` | Context manager that runs eligible ops in reduced precision, keeps sensitive ops in FP32 |
| `GradScaler` | Scales the loss up before backward (and back down before the step) to avoid FP16 gradient underflow |
| Underflow | A gradient value too small for a dtype's range, rounding to zero and killing learning for that weight |
| `torch.amp` | The newer, device-agnostic AMP API (`torch.cuda.amp` is the older, CUDA-only equivalent) |
