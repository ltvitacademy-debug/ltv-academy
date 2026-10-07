# Custom Layers & Modules

This closes out Chapter 2. You've used `nn.Linear`, `nn.ReLU`, and `nn.Sequential` — all layers PyTorch provides out of the box. But research and real-world work constantly require something PyTorch doesn't ship: a custom operation with its own learnable parameters, or a reusable block you want to drop into multiple models. Because `nn.Module` is just a Python class with a specific contract, writing your own is completely ordinary. This lesson shows you how, and introduces `nn.ModuleList` for managing a variable number of submodules.

## What you'll learn

- Writing a custom layer with its own `nn.Parameter`s
- Registering a non-learnable constant with `register_buffer`
- Building a reusable block and composing it into a larger model
- `nn.ModuleList`, and why a plain Python list of layers doesn't work
- A recap of everything `nn.Module` auto-discovers

## A custom layer from scratch

Suppose you want a layer that scales its input by a learnable per-feature factor, then adds a learnable bias — nothing PyTorch ships by default, but a two-line `forward`:

```python
import torch
import torch.nn as nn

class ScaleShift(nn.Module):
    def __init__(self, num_features):
        super().__init__()
        self.scale = nn.Parameter(torch.ones(num_features))
        self.shift = nn.Parameter(torch.zeros(num_features))

    def forward(self, x):
        return x * self.scale + self.shift

layer = ScaleShift(10)
x = torch.randn(4, 10)
y = layer(x)   # shape (4, 10)
```

This is exactly the pattern from Lesson 8, applied to something PyTorch doesn't provide: initialize `nn.Parameter`s in `__init__`, use them in `forward`. `scale` and `shift` are discovered by `.parameters()` automatically, flow through autograd automatically, and get saved/loaded by `state_dict()` automatically — all for free, just by being `nn.Parameter`s assigned as attributes.

## Non-learnable state: register_buffer

Sometimes a module needs to carry a tensor that isn't learned (not updated by the optimizer) but should still move with `.to(device)` and be saved in `state_dict()` — a classic example is a running average or a fixed mask:

```python
class WithRunningMean(nn.Module):
    def __init__(self, num_features):
        super().__init__()
        self.register_buffer("running_mean", torch.zeros(num_features))

    def forward(self, x):
        return x - self.running_mean
```

`register_buffer` tells `nn.Module` "track this tensor like a parameter for device-moving and saving purposes, but never include it in `.parameters()` or update it via gradients." You'll see this exact pattern again in Chapter 3 inside `nn.BatchNorm1d`, which tracks running statistics this same way.

## Composing a reusable block

Custom modules shine when you want to reuse a pattern across a model:

```python
class MLPBlock(nn.Module):
    def __init__(self, in_features, out_features):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features)
        self.relu = nn.ReLU()

    def forward(self, x):
        return self.relu(self.linear(x))

class DeepMLP(nn.Module):
    def __init__(self, sizes):
        super().__init__()
        self.blocks = nn.ModuleList(
            MLPBlock(sizes[i], sizes[i + 1]) for i in range(len(sizes) - 1)
        )

    def forward(self, x):
        for block in self.blocks:
            x = block(x)
        return x

model = DeepMLP([20, 64, 64, 32])
```

`MLPBlock` packages "linear then ReLU" as one reusable unit. `DeepMLP` then builds an arbitrary-depth network by composing blocks — this is exactly the kind of flexibility `nn.Sequential` alone can't give you once your logic gets more complex than "run these layers in a straight line."

## Why nn.ModuleList, not a plain Python list

```python
# Wrong -- a plain list hides its contents from nn.Module
self.blocks = [MLPBlock(10, 10) for _ in range(3)]  # parameters NOT discovered!

# Correct
self.blocks = nn.ModuleList([MLPBlock(10, 10) for _ in range(3)])
```

If you store submodules in a plain Python list, `nn.Module`'s attribute-scanning (Lesson 8) never finds them — `.parameters()` silently returns nothing for those layers, they never move with `.to(device)`, and they're missing from `state_dict()`. This is a genuinely dangerous silent bug: your code runs without error, but those layers never train. `nn.ModuleList` is a container that behaves like a Python list for indexing and iteration, but properly registers every module inside it.

## Key terms

| Term | Meaning |
|---|---|
| Custom layer | An `nn.Module` subclass with its own `nn.Parameter`s and `forward` logic |
| `register_buffer` | Registers a non-learnable tensor that still moves with the model and saves in `state_dict()` |
| `nn.ModuleList` | A list-like container that properly registers the modules inside it |
| Reusable block | A small custom module composed repeatedly to build larger architectures |

## Recap

Writing a custom layer is just Lesson 8's pattern — `nn.Parameter`s in `__init__`, logic in `forward` — applied to whatever operation you need. `register_buffer` handles non-learnable state the same way, and `nn.ModuleList` is required (not a plain Python list) whenever you store a variable number of submodules so they're properly discovered. That's the full toolkit from Chapter 2: `nn.Module`, layers, activations, losses, optimizers, initialization, and now custom components — everything you need to build real architectures, starting with convolutional networks in Chapter 3.
