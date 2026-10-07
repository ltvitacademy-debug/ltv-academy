# Autograd & Computational Graphs

Every neural network learns the same way: compute an output, measure how wrong it is, and figure out how to nudge every weight to make it a little less wrong. That last part — figuring out which direction to nudge each weight — requires a gradient for every single parameter in the network, sometimes millions of them. Doing that by hand would be impossible. PyTorch's **autograd** engine does it automatically, and this lesson shows you exactly how.

## What you'll learn

- What `requires_grad` does and why it's the switch that turns on gradient tracking
- How PyTorch builds a computational graph as you perform operations
- What `.backward()` actually computes, and where the result ends up
- Why `optimizer.zero_grad()` (or `tensor.grad = None`) is necessary before every backward pass
- When and why to use `torch.no_grad()`

## Turning on gradient tracking

By default, operations on a tensor are not tracked for gradients. You opt in with `requires_grad=True`:

```python
import torch

x = torch.tensor([2.0, 3.0], requires_grad=True)
w = torch.tensor([0.5, -1.0], requires_grad=True)

y = (x * w).sum()   # y = x[0]*w[0] + x[1]*w[1]
```

As soon as `x` and `w` have `requires_grad=True`, every tensor derived from them (like `y`) automatically gets a `grad_fn` — a record of the operation that produced it. That chain of `grad_fn`s is the **computational graph**: a record of every operation, built dynamically as your code runs.

## Calling .backward()

`.backward()` walks the computational graph backward from the tensor you call it on, applying the chain rule at every step, and accumulates the result into each leaf tensor's `.grad` attribute:

```python
y.backward()

x.grad   # tensor([0.5, -1.0]) -- dy/dx
w.grad   # tensor([2.0, 3.0])  -- dy/dw
```

`.backward()` only works (without extra arguments) on a scalar tensor — which is almost always your loss. If you call it on a non-scalar tensor, PyTorch needs an explicit `gradient` argument telling it how to weight each element. This is exactly why training loops always reduce the loss to a single number, usually with `.mean()` or `.sum()`, before calling `.backward()`.

## Gradients accumulate — you must zero them

A critical, easy-to-miss detail: `.grad` **accumulates** across calls to `.backward()`. It does not reset automatically.

```python
x = torch.tensor([1.0], requires_grad=True)

y1 = (x ** 2).sum()
y1.backward()
print(x.grad)   # tensor([2.])

y2 = (x ** 2).sum()
y2.backward()
print(x.grad)   # tensor([4.]) -- added to the previous 2.0, not reset!
```

This is why every training loop you write calls `optimizer.zero_grad()` at the start of each iteration, before the backward pass — without it, gradients from previous batches silently pile up and corrupt your updates. You'll see this explicitly in Lesson 4's training loop.

## Stopping gradient tracking with torch.no_grad()

Not every operation should be tracked. During evaluation, or whenever you update weights directly, you don't want autograd building a graph — it wastes memory and compute, and in the case of a direct weight update, it would actually be an error to track it:

```python
with torch.no_grad():
    predictions = model(inputs)   # no graph built -- faster, less memory

# equivalent for a single tensor:
x.requires_grad_(False)

# or detach a tensor from its graph entirely:
y_detached = y.detach()
```

`torch.no_grad()` is a context manager you'll use constantly: around evaluation/inference code, and inside manual parameter updates. `.detach()` returns a new tensor that shares the same data but is disconnected from the graph — useful when you want a value without the gradient history following it around.

## Key terms

| Term | Meaning |
|---|---|
| `requires_grad` | Flag that turns on gradient tracking for a tensor |
| Computational graph | The dynamically built record of operations connecting tensors to their inputs |
| `grad_fn` | The function recorded on a tensor describing how it was produced |
| `.backward()` | Computes gradients via the chain rule, walking the graph backward from a scalar |
| `.grad` | Where the computed gradient accumulates on a leaf tensor |
| `torch.no_grad()` | Context manager that disables graph building inside its block |

## Recap

Autograd tracks every operation on tensors with `requires_grad=True` in a computational graph, and `.backward()` walks that graph to fill in `.grad` on every leaf tensor using the chain rule. Gradients accumulate rather than reset, which is why every training loop zeros them first, and `torch.no_grad()` turns tracking off when you don't need it. Next up, Lesson 3: moving tensors and models between the CPU and GPU.
