# Tensor Cores & Mixed-Precision Hardware

CUDA cores do one floating-point operation per clock cycle, per core. Modern NVIDIA GPUs also carry a second, specialized kind of core built for exactly one thing — small matrix multiplications — and it's the reason training has gotten dramatically faster even on GPUs with the same CUDA core count. This lesson covers tensor cores and the mixed-precision formats that unlock them.

## What you'll learn

- What a tensor core is and how it differs from a CUDA core
- The common numeric formats involved: FP32, FP16, BF16, and TF32
- Why "mixed precision" means more than just "use less precision everywhere"
- How to confirm tensor cores are actually being used from PyTorch

## Tensor cores: matrix multiply as a single hardware operation

A regular CUDA core computes one multiply-accumulate at a time. A **tensor core** computes an entire small matrix multiply-accumulate (classically a 4x4 times 4x4 matrix) in a single operation. Since the overwhelming majority of deep learning compute is matrix multiplication, a chip with tensor cores can push far more effective FLOPs through the same silicon than CUDA cores alone — this is where the headline "AI TFLOPS" numbers on an NVIDIA spec sheet come from, and why they're dramatically higher than the "FP32 TFLOPS" number for the same card.

## The precision formats involved

- **FP32** — standard 32-bit single precision; the default for most values in a PyTorch model unless you intervene.
- **FP16** — 16-bit half precision; roughly 2x less memory and 2x+ more throughput than FP32, but a much smaller representable range, which can cause numeric underflow/overflow during training.
- **BF16** — 16-bit "brain float"; same exponent range as FP32 (so less prone to overflow) but less mantissa precision than FP16. Widely used for training on Ampere and newer GPUs.
- **TF32** — a tensor-core-only internal format (19 effective mantissa bits) that PyTorch can use automatically for FP32 matrix multiplications on Ampere+ GPUs, trading a little precision for a large speedup without you changing your model's dtype at all.

## Mixed precision in practice

"Mixed precision" means running most of a model's matrix multiplications in a lower-precision format (feeding the tensor cores) while keeping certain values — gradients during accumulation, and a running loss-scale factor — in FP32 to protect numeric stability:

```python
import torch

model = model.cuda()
scaler = torch.cuda.amp.GradScaler()

for inputs, targets in dataloader:
    inputs, targets = inputs.cuda(), targets.cuda()
    with torch.autocast(device_type="cuda", dtype=torch.float16):
        outputs = model(inputs)
        loss = loss_fn(outputs, targets)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad()
```

`torch.autocast` automatically runs eligible operations (matrix multiplies, convolutions) in FP16 while keeping loss-sensitive operations in FP32. `GradScaler` scales the loss up before `backward()` so small gradient values don't underflow to zero in FP16, then unscales before the optimizer step.

## Confirming tensor cores are in use

```
$ python -c "import torch; print(torch.backends.cuda.matmul.allow_tf32)"
True
```

On an Ampere-or-newer GPU, `torch.backends.cuda.matmul.allow_tf32` defaults to `True`, meaning ordinary FP32 matrix multiplies are already quietly running through tensor cores via TF32, before you've written a single line of `autocast` code.

## Key terms

- **Tensor core** — specialized hardware that performs a small matrix multiply-accumulate as one operation
- **FP32 / FP16 / BF16 / TF32** — numeric precision formats with different range and memory trade-offs
- **Mixed precision** — training with most ops in low precision while protecting numerically sensitive values in FP32
- **`torch.autocast`** — context manager that automatically casts eligible PyTorch operations to a lower precision
- **`GradScaler`** — scales loss values to prevent FP16 gradient underflow during backpropagation
