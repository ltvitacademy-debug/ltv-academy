# CPU vs. GPU Workload Characteristics

This closes out the architecture chapter by making the CPU/GPU decision concrete. You now know why GPUs have thousands of simple cores, how their memory hierarchy is shaped, and what tensor cores add — this lesson turns that into a practical checklist for deciding which device a given piece of work belongs on.

## What you'll learn

- The concrete traits that make a workload GPU-shaped versus CPU-shaped
- Why data transfer cost can erase a GPU's advantage for small workloads
- How a typical ML training pipeline actually splits work across both devices
- How to check, from code, which device a tensor or model currently lives on

## The checklist

A workload tends to run faster on a GPU when it has:
- **High arithmetic intensity** — many floating-point operations per byte of data moved (matrix multiplication, convolution)
- **Large, independent, repeatable work** — the same operation applied across many elements, with little to no cross-dependency
- **Enough total volume to amortize overhead** — large enough that kernel launch and data transfer costs are small relative to the compute itself

A workload tends to belong on a CPU when it is:
- **Small** — a handful of elements, where transfer and launch overhead dominates total time
- **Branch-heavy and sequential** — control flow and logic with real data dependencies between steps
- **I/O-bound** — reading files, parsing text, making network calls — none of which a GPU accelerates

## Where the real training pipeline splits

A typical PyTorch training loop is already a CPU/GPU split, even if it doesn't look like one:

```python
for batch in dataloader:          # CPU: file I/O, augmentation, collation
    images, labels = batch
    images = images.to("cuda")    # transfer: CPU -> GPU
    labels = labels.to("cuda")
    outputs = model(images)       # GPU: forward pass (matmuls, convs)
    loss = loss_fn(outputs, labels)   # GPU
    loss.backward()               # GPU: gradient computation
    optimizer.step()              # GPU: parameter update
```

The `DataLoader`'s work — reading image files from disk, applying augmentations, batching — is deliberately kept on the CPU (often across multiple worker processes), while every tensor operation after `.to("cuda")` runs on the GPU. A common real-world bottleneck is a CPU-bound data loader that can't feed the GPU fast enough, leaving expensive GPU time idle — a topic you'll diagnose directly in Chapter 3.

## Checking device placement

```python
import torch
print(torch.cuda.is_available())        # True if a CUDA-capable GPU is visible
x = torch.randn(4, 4)
print(x.device)                         # device(type='cpu')
x = x.to("cuda")
print(x.device)                         # device(type='cuda', index=0)
print(next(model.parameters()).device)  # check where a model's weights live
```

Every tensor and every model parameter in PyTorch has a `.device` attribute. Mismatched devices between a model and its input (one on CPU, one on GPU) raise a `RuntimeError` at the first operation that touches both — a mistake you'll see constantly until device placement becomes automatic habit, which Chapter 4 covers in full.

## Key terms

- **Arithmetic intensity** — the ratio of compute operations to bytes of data moved; high intensity favors the GPU
- **Overhead amortization** — spreading a fixed cost (kernel launch, data transfer) across enough work that it stops mattering
- **I/O-bound** — work limited by reading/writing data rather than computation, unsuited to GPU acceleration
- **`.to("cuda")` / `.to("cpu")`** — PyTorch's explicit device-transfer call
- **Device mismatch error** — a `RuntimeError` raised when an operation mixes tensors on different devices
