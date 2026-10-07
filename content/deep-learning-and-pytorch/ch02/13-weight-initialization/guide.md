# Weight Initialization

Every `nn.Linear` layer you've created so far started with random weights, and you probably didn't think twice about where those random numbers came from. It turns out the specific distribution matters a great deal: a badly initialized deep network can fail to train at all, with activations exploding to huge values or shrinking to zero within the first few layers, before a single gradient update even happens. This lesson explains why, and what PyTorch does about it by default.

## What you'll learn

- What PyTorch's default initialization for `nn.Linear` actually does
- Why initialization scale matters: exploding and vanishing activations
- `nn.init.xavier_uniform_` and when it's appropriate
- `nn.init.kaiming_uniform_` and why it pairs with ReLU
- How to apply a custom initialization across a whole model

## What happens by default

You don't have to initialize anything yourself — `nn.Linear` already does it:

```python
import torch.nn as nn

layer = nn.Linear(10, 20)
layer.weight   # already filled with small random values, not zeros
```

PyTorch initializes `nn.Linear`'s `weight` and `bias` using a uniform distribution scaled by the layer's input size (specifically, a Kaiming-uniform-derived scheme). This default is a reasonable choice for most networks and is exactly why you've been able to ignore this topic until now — but it's worth understanding what's happening and when you'd want to override it.

## Why scale matters

If every weight in a deep network is initialized too large, each layer's output variance grows layer over layer, and activations can explode to huge values within a few layers — gradients computed from huge activations tend to explode too. If weights are initialized too small, the opposite happens: activations shrink toward zero deeper into the network, and so do the gradients flowing back through them, a problem called **vanishing gradients** that you'll study properly in Chapter 3. Good initialization schemes are designed specifically to keep the variance of activations roughly stable as they pass through each layer, neither exploding nor vanishing.

## Xavier/Glorot initialization

```python
layer = nn.Linear(10, 20)
nn.init.xavier_uniform_(layer.weight)
nn.init.zeros_(layer.bias)
```

Xavier (also called Glorot) initialization scales the random weights based on both the number of inputs and outputs of the layer, and is derived assuming activations like `Sigmoid` or `Tanh`. The trailing underscore in `xavier_uniform_` follows PyTorch's convention for in-place operations — it modifies `layer.weight` directly rather than returning a new tensor.

## Kaiming/He initialization

```python
layer = nn.Linear(10, 20)
nn.init.kaiming_uniform_(layer.weight, nonlinearity="relu")
nn.init.zeros_(layer.bias)
```

Kaiming (also called He) initialization is derived specifically for ReLU-family activations, which zero out roughly half of their inputs — Kaiming's math accounts for that, where Xavier's does not. Since ReLU is the default activation for most networks (Lesson 9), Kaiming initialization is the more common explicit choice when you do decide to override PyTorch's default.

## Applying initialization across a whole model

Rather than initializing one layer at a time, you typically write a function and apply it to every submodule:

```python
def init_weights(module):
    if isinstance(module, nn.Linear):
        nn.init.kaiming_uniform_(module.weight, nonlinearity="relu")
        nn.init.zeros_(module.bias)

model = MLP(in_features=20, hidden_size=64, num_classes=3)
model.apply(init_weights)
```

`model.apply(fn)` calls `fn` on every submodule in the model, recursively — exactly the same tree-walk that powers `.parameters()` from Lesson 8. The `isinstance` check matters because `apply` visits every submodule, including activation layers like `nn.ReLU` that have no `weight` to initialize at all.

## Key terms

| Term | Meaning |
|---|---|
| Weight initialization | The strategy for choosing a layer's starting random values before training |
| Exploding/vanishing activations | Activations (and their gradients) growing or shrinking uncontrollably across layers |
| `nn.init.xavier_uniform_` | Initialization scheme suited to Sigmoid/Tanh activations |
| `nn.init.kaiming_uniform_` | Initialization scheme suited to ReLU-family activations |
| `model.apply(fn)` | Recursively applies `fn` to every submodule in a model |

## Recap

PyTorch's default `nn.Linear` initialization works fine for most cases, but understanding why initialization scale matters — and reaching for `kaiming_uniform_` with ReLU networks or `xavier_uniform_` with Sigmoid/Tanh networks — becomes important as you build deeper architectures in later chapters. `model.apply()` is how you apply a custom scheme across an entire model at once. Next up, Lesson 14, the final lesson of this chapter: writing your own custom layers and modules beyond what `nn.Linear` and friends provide.
