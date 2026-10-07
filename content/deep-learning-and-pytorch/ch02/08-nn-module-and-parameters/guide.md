# nn.Module & Parameters

Chapter 1 built a training loop by hand, tracking two loose tensors, `w` and `b`, as parameters. That's fine for one line, but a real network has dozens of layers and thousands or millions of parameters — managing them as individual variables would be unworkable. `nn.Module` is PyTorch's answer: a base class that organizes parameters, sub-layers, and the forward computation into one clean object. Nearly every model you will ever write in PyTorch is an `nn.Module` subclass, so this lesson is the foundation for the rest of the course.

## What you'll learn

- How to define a model by subclassing `nn.Module`
- What `nn.Parameter` is and how `nn.Module` auto-discovers parameters
- Writing the `forward` method, and why you call the model, not `forward`, directly
- Inspecting a model with `.parameters()` and `.named_parameters()`
- How submodules nest and how `state_dict()` names reflect that nesting

## Defining a model

```python
import torch
import torch.nn as nn

class LinearRegression(nn.Module):
    def __init__(self):
        super().__init__()
        self.w = nn.Parameter(torch.randn(1))
        self.b = nn.Parameter(torch.randn(1))

    def forward(self, x):
        return self.w * x + self.b

model = LinearRegression()
```

Three things are mandatory: subclass `nn.Module`, call `super().__init__()` first in your `__init__` (this sets up the internal bookkeeping `nn.Module` needs), and implement `forward`. Everything else is up to you.

## nn.Parameter: how auto-discovery works

`nn.Parameter` is a thin wrapper around a tensor (it automatically sets `requires_grad=True`) that tells `nn.Module` "track this as a learnable parameter of the model." The moment you assign an `nn.Parameter` as an attribute on a module — `self.w = nn.Parameter(...)` — it's automatically registered:

```python
for name, p in model.named_parameters():
    print(name, p.shape)
# w torch.Size([1])
# b torch.Size([1])
```

This is the entire mechanism that makes `model.parameters()` work when you hand it to an optimizer in Lesson 11 — `nn.Module` walks its own attributes (and recursively, any submodules' attributes) looking for `nn.Parameter` instances and submodules, and collects every parameter it finds.

## forward() and why you call the model, not forward directly

```python
x = torch.tensor([2.0])

y = model(x)          # correct -- calls model.__call__, which calls forward
y = model.forward(x)   # works, but skips important hooks -- avoid this
```

`nn.Module` defines `__call__` to do bookkeeping (like running registered hooks) before and after invoking your `forward` method. Calling `model(x)` goes through that machinery; calling `model.forward(x)` directly bypasses it. Always call the model as a function — `model(x)`, never `model.forward(x)`.

## Submodules nest naturally

In Chapter 2's later lessons you'll build models out of layers like `nn.Linear`, which are themselves `nn.Module`s. Assigning one as an attribute registers it as a **submodule**, and its parameters get swept up automatically too:

```python
class TwoLayer(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(10, 20)
        self.output = nn.Linear(20, 1)

    def forward(self, x):
        return self.output(self.hidden(x))

model = TwoLayer()
for name, p in model.named_parameters():
    print(name, p.shape)
# hidden.weight torch.Size([20, 10])
# hidden.bias   torch.Size([20])
# output.weight torch.Size([1, 20])
# output.bias   torch.Size([1])
```

Notice the dotted names: `hidden.weight` reflects that `weight` belongs to the submodule stored at `self.hidden`. This is exactly the naming scheme you saw in `state_dict()` in Lesson 6 — it's the same underlying mechanism, just displayed two different ways.

## Key terms

| Term | Meaning |
|---|---|
| `nn.Module` | Base class for all PyTorch models and layers; handles parameter/submodule tracking |
| `nn.Parameter` | A tensor wrapper with `requires_grad=True` that auto-registers with its owning module |
| `forward()` | The method defining what the model computes; call the model, never `.forward()`, directly |
| `.parameters()` | Returns an iterator over every registered `nn.Parameter`, including those in submodules |
| Submodule | An `nn.Module` assigned as an attribute of another `nn.Module`, nested automatically |

## Recap

`nn.Module` is the base class behind every PyTorch model: subclass it, call `super().__init__()`, assign `nn.Parameter`s and submodules as attributes, and implement `forward`. Auto-discovery means `.parameters()` always reflects exactly what's registered, no matter how deeply nested your submodules get. Next up, Lesson 9: the actual layers — linear layers and activation functions — that you'll use to build real networks.
