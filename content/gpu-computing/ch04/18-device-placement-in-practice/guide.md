# Device Placement in Practice

Chapter 3 was about understanding what happens on the GPU once work gets there. This chapter is about actually getting work there correctly from PyTorch — and the single most common source of bugs and silent slowdowns is a tensor or a model sitting on the wrong device. This lesson covers the patterns that make device placement explicit and correct instead of accidental.

## What you'll learn

- How to check for a GPU and select a device in a way that degrades gracefully without one
- Why a model and its input tensors must be on the same device, and what happens when they aren't
- The difference between `.to(device)` and `.cuda()`, and which one to prefer
- Common device-placement mistakes and how to spot them before they cause a runtime error

## Checking for a GPU and picking a device

The standard pattern checks availability once and stores the result, rather than hardcoding `'cuda'` everywhere:

```python
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)   # cuda or cpu, depending on what's actually available
```

`torch.cuda.is_available()` returns `True` only if PyTorch was built with CUDA support and a compatible GPU and driver are visible. Writing code this way means the same script runs (just slower) on a machine with no GPU, instead of crashing immediately.

## Moving a model and its tensors

Both the model's parameters and every input tensor that reaches it must live on the same device. `.to(device)` moves a module or tensor there:

```python
model = MyModel()
model = model.to(device)          # moves all parameters and buffers

for batch in dataloader:
    inputs, labels = batch
    inputs = inputs.to(device)
    labels = labels.to(device)
    outputs = model(inputs)       # inputs and model are now on the same device
```

A model's `.to(device)` call is in-place for its parameters (you don't strictly need to reassign `model =`, but doing so is the conventional, safe pattern). A tensor's `.to(device)`, by contrast, returns a new tensor — the original is unaffected — which is why reassigning `inputs = inputs.to(device)` is required, not optional.

## `.to(device)` vs. `.cuda()`

`.cuda()` is an older, CUDA-specific shorthand for moving a tensor or module to the default GPU. `.to(device)` is the more general, preferred form: the same code path works whether `device` is `'cuda'`, `'cpu'`, or (on supported hardware) another backend like `'mps'`, without an `if` statement scattered through the codebase.

```python
x = x.cuda()          # works, but hardcodes "a CUDA GPU, specifically"
x = x.to(device)       # preferred — device is decided once, used everywhere
```

## The classic device-mismatch error

Forgetting to move one tensor raises a clear but easy-to-miss error at the exact line where the mismatched tensors meet:

```python
>>> output = model(cpu_tensor)
RuntimeError: Expected all tensors to be on the same device, but found at least two devices, cuda:0 and cpu!
```

This almost always means one specific tensor — often something created fresh inside a function with `torch.zeros(...)` or `torch.tensor(...)` and no `device=` argument, defaulting to CPU — was never moved. The fix is either to move that tensor explicitly, or to create it on the right device from the start: `torch.zeros(shape, device=device)`.

## Key terms

- **`torch.device`** — an object representing a compute device (`'cpu'`, `'cuda'`, `'cuda:0'`, etc.)
- **`torch.cuda.is_available()`** — returns whether a CUDA GPU is visible to this PyTorch build
- **`.to(device)`** — the general-purpose method to move a tensor or module to a device
- **`.cuda()`** — the older, CUDA-specific shorthand for the same move
- **Device mismatch** — a `RuntimeError` raised when tensors on different devices are combined in one operation
- **In-place vs. returned** — a module's `.to()` moves it in place; a tensor's `.to()` returns a new tensor
