# Devices: CPU, GPU & Moving Data

Deep learning is enormously more practical on a GPU than a CPU, sometimes 10-50x faster for the same model, because a GPU can perform thousands of the matrix multiplications from Lesson 1 in parallel. But PyTorch never moves data between devices for you automatically — you have to be explicit about where every tensor and every model lives. This lesson covers the handful of patterns you'll use in literally every script you write for the rest of this course.

## What you'll learn

- How to detect whether a GPU is available with `torch.cuda.is_available()`
- The `.to(device)` pattern used to move both tensors and models
- Why operations fail when tensors live on different devices, and how to avoid it
- Writing device-agnostic code that runs correctly whether or not a GPU is present
- A quick note on Apple Silicon's `mps` backend

## Detecting what's available

```python
import torch

torch.cuda.is_available()   # True if an NVIDIA GPU + CUDA toolkit is set up

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)   # device(type='cuda') or device(type='cpu')
```

Writing `device = torch.device(...)` once at the top of a script, rather than hardcoding `"cuda"` or `"cpu"` everywhere, is what makes your code **device-agnostic** — it runs correctly on a laptop with no GPU and on a workstation with one, without any changes.

## Moving tensors and models with .to()

```python
x = torch.randn(4, 4)
x = x.to(device)         # moves x to whichever device was chosen above

model = MyModel()
model = model.to(device)  # moves every parameter and buffer in the model
```

`.to(device)` returns a new tensor on the target device (for tensors, it's a copy if the device changes); for an `nn.Module`, it moves the model's parameters and buffers **in place** and returns the same model object. The convention is to call `.to(device)` on your model once, right after constructing it, and call `.to(device)` on every batch of input data inside your training loop.

## Why mismatched devices raise errors

PyTorch will not silently move data for you — if you try to combine tensors on different devices, it raises an error rather than guessing what you meant:

```python
x_cpu = torch.randn(3, 3)
x_gpu = x_cpu.to("cuda")

y = x_cpu + x_gpu
# RuntimeError: Expected all tensors to be on the same device,
# but found at least two devices, cuda:0 and cpu!
```

This is one of the most common real-world PyTorch errors. It almost always means one of three things: you moved the model but forgot to move the input batch, you moved the input batch but forgot the labels, or you created a new tensor inside a function (like `torch.zeros(...)`) without specifying its device, so it defaulted to CPU while everything else is on the GPU.

## Creating tensors directly on a device

Rather than creating a tensor on the CPU and moving it, you can create it on the target device from the start, which avoids an unnecessary copy:

```python
x = torch.zeros(4, 4, device=device)
y = torch.randn(4, 4, device=device)
```

Most tensor-creation functions (`torch.zeros`, `torch.ones`, `torch.randn`, `torch.tensor`, and others) accept a `device=` keyword argument.

## A note on Apple Silicon

On Mac laptops with Apple Silicon, PyTorch also supports the `mps` backend (Metal Performance Shaders) instead of `cuda`:

```python
device = torch.device(
    "cuda" if torch.cuda.is_available()
    else "mps" if torch.backends.mps.is_available()
    else "cpu"
)
```

The `.to(device)` pattern is identical regardless of which backend you target — that uniformity is the whole point of writing device-agnostic code.

## Key terms

| Term | Meaning |
|---|---|
| `torch.cuda.is_available()` | Returns True if an NVIDIA GPU with CUDA is usable |
| `torch.device` | An object representing a target device, e.g. `cpu`, `cuda`, `cuda:0`, `mps` |
| `.to(device)` | Moves a tensor (returns a new one) or a model (moves in place) to a device |
| Device-agnostic code | Code written to run correctly regardless of which device is available |
| `mps` | PyTorch's backend for Apple Silicon GPUs |

## Recap

GPUs make deep learning practical by parallelizing the matrix math from Lesson 1, but PyTorch requires you to explicitly move every tensor and model with `.to(device)` — it never does this silently. Writing `device = torch.device(...)` once and reusing it everywhere is what makes a script run correctly on any machine. Next up, Lesson 4: putting tensors, autograd, and devices together into a complete training loop.
