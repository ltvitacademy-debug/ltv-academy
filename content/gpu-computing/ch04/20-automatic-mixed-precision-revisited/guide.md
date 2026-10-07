# Automatic Mixed Precision, Revisited

Your Deep Learning & PyTorch course introduced mixed precision as a speed trick. Here, with Chapter 1's Tensor Cores and Chapter 3's compute-vs-memory distinction behind you, it's worth revisiting the same APIs with a clearer picture of why they work: autocast and gradient scaling aren't magic, they're a direct response to specific numerical and hardware behavior you now understand.

## What you'll learn

- Why float16 needs loss scaling but bfloat16 generally doesn't
- How `torch.autocast` decides which ops run in reduced precision and which stay in float32
- How `GradScaler` prevents small gradients from underflowing to zero in float16
- Why mixed precision is primarily a fix for compute-bound kernels, not memory-bound ones

## autocast: choosing precision per-op, not globally

`torch.autocast` wraps the forward pass and automatically runs numerically safe ops (like convolutions and matrix multiplies — the same GEMM-heavy, compute-bound ops from Chapter 3) in float16 or bfloat16, while keeping numerically sensitive ops (like reductions and loss computation) in float32:

```python
device = torch.device("cuda")
model = MyModel().to(device)
optimizer = torch.optim.Adam(model.parameters())

for inputs, labels in loader:
    inputs, labels = inputs.to(device), labels.to(device)
    optimizer.zero_grad()

    with torch.autocast(device_type="cuda", dtype=torch.float16):
        outputs = model(inputs)
        loss = loss_fn(outputs, labels)

    loss.backward()
    optimizer.step()
```

This is exactly the ops that benefited from Tensor Cores in Chapter 1 and were identified as compute-bound in Chapter 3 that see the real speedup here — autocast running a memory-bound elementwise op in float16 instead of float32 halves its memory traffic too, but the bigger win is concentrated in the GEMM-heavy layers.

## Why float16 needs a GradScaler

Float16 has a much smaller exponent range than float32. During backpropagation, gradients can be small enough to underflow to exactly zero in float16, silently killing learning for those parameters. `GradScaler` works around this by scaling the loss up before the backward pass (so gradients scale up too, away from the underflow range), then unscaling before the optimizer step:

```python
scaler = torch.cuda.amp.GradScaler()

for inputs, labels in loader:
    inputs, labels = inputs.to(device), labels.to(device)
    optimizer.zero_grad()

    with torch.autocast(device_type="cuda", dtype=torch.float16):
        outputs = model(inputs)
        loss = loss_fn(outputs, labels)

    scaler.scale(loss).backward()   # scale up before backward
    scaler.step(optimizer)          # unscales, then steps (skips on overflow)
    scaler.update()                 # adjusts the scale factor for next iteration
```

`scaler.step()` also detects if scaling caused an overflow (an `inf` or `NaN` gradient) and skips that optimizer step entirely rather than corrupting the weights, then `scaler.update()` shrinks the scale factor for next time.

## bfloat16 doesn't need this

`bfloat16` has the same exponent range as float32 (just less mantissa precision), so it doesn't suffer the underflow problem float16 does. Training with `torch.autocast(device_type="cuda", dtype=torch.bfloat16)` skips `GradScaler` entirely — simpler code, at the cost of a bit more rounding error per value than float16 on hardware that supports both equally well.

## Key terms

- **`torch.autocast`** — a context manager that runs eligible ops in reduced precision, keeping sensitive ops in float32
- **`torch.cuda.amp.GradScaler`** — scales the loss up before backward to prevent float16 gradient underflow
- **Gradient underflow** — small gradient values rounding to exactly zero in a low-precision format
- **Loss scaling** — multiplying the loss (and therefore gradients) by a factor to keep them in a representable range
- **bfloat16** — a 16-bit format with float32's exponent range, avoiding the underflow issue without a scaler
- **Op-level precision selection** — autocast's decision to run each op in the precision it's numerically safe for
