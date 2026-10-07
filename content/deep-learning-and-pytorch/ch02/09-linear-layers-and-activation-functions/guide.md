# Linear Layers & Activation Functions

The two most basic building blocks of nearly every neural network are the linear layer, which does a learned linear transformation of its input, and the activation function, which introduces the non-linearity that makes deep networks more powerful than a single giant linear layer. This lesson covers both in detail, since you'll stack them, in some combination, for the rest of this course.

## What you'll learn

- How `nn.Linear` works: its shape rules and what `weight`/`bias` actually are
- Why stacking linear layers alone gains you nothing without activations in between
- The most common activation functions: `ReLU`, `GELU`, `Sigmoid`, `Tanh`
- When to reach for each activation function
- How to chain layers with `nn.Sequential`

## nn.Linear: a learned linear transformation

```python
import torch
import torch.nn as nn

layer = nn.Linear(in_features=10, out_features=20)

x = torch.randn(32, 10)   # batch of 32, 10 features each
y = layer(x)               # shape (32, 20)

layer.weight.shape   # torch.Size([20, 10])
layer.bias.shape     # torch.Size([20])
```

`nn.Linear(in_features, out_features)` computes `y = x @ weight.T + bias`. It expects the last dimension of its input to equal `in_features`, and produces an output whose last dimension is `out_features` — every other dimension (like the batch dimension here) passes through unchanged. Both `weight` and `bias` are `nn.Parameter`s, initialized randomly (Lesson 13 covers exactly how) and learned during training.

## Why you need activation functions

Stacking two linear layers with nothing in between is mathematically equivalent to one single linear layer — composing linear functions just gives you another linear function, so you gain no expressive power:

```python
# Without activation: no better than one linear layer
model = nn.Sequential(nn.Linear(10, 20), nn.Linear(20, 1))

# With activation: now this can learn non-linear patterns
model = nn.Sequential(nn.Linear(10, 20), nn.ReLU(), nn.Linear(20, 1))
```

An activation function applies a non-linear, elementwise function between layers, which is what actually gives a deep network the ability to approximate complex, non-linear relationships in data.

## The activations you'll use constantly

```python
relu = nn.ReLU()        # max(0, x) -- zero for negatives, identity for positives
gelu = nn.GELU()        # smooth approximation of ReLU, used in Transformers
sigmoid = nn.Sigmoid()  # squashes to (0, 1) -- binary probabilities
tanh = nn.Tanh()        # squashes to (-1, 1) -- zero-centered

x = torch.tensor([-2.0, -0.5, 0.0, 0.5, 2.0])
relu(x)     # tensor([0., 0., 0., 0.5, 2.])
sigmoid(x)  # tensor([0.119, 0.378, 0.5, 0.622, 0.881])
```

- **ReLU** (`max(0, x)`) is the default choice for hidden layers in most feedforward and convolutional networks: cheap to compute, and avoids a problem called vanishing gradients (covered properly in Chapter 3) better than `Sigmoid` or `Tanh` do.
- **GELU** is a smoother variant of ReLU that's become the standard activation inside Transformer architectures (which you'll meet in Chapter 5).
- **Sigmoid** squashes any input to `(0, 1)`, which makes it the natural choice for a binary classification output (interpreted as a probability) — but a poor choice for hidden layers, because it saturates for large inputs and its gradient vanishes.
- **Tanh** squashes to `(-1, 1)` and is zero-centered, which sometimes helps optimization compared to `Sigmoid`, but shares the same saturation problem for hidden layers in deep networks.

## Chaining layers with nn.Sequential

```python
model = nn.Sequential(
    nn.Linear(10, 32),
    nn.ReLU(),
    nn.Linear(32, 16),
    nn.ReLU(),
    nn.Linear(16, 1),
)

x = torch.randn(4, 10)
y = model(x)   # shape (4, 1)
```

`nn.Sequential` is itself an `nn.Module` that runs its children in order, feeding each layer's output into the next. It's the fastest way to define a simple feedforward stack; for anything with branching or more complex control flow, you'll subclass `nn.Module` directly and write `forward` by hand, as you'll do in Lesson 12.

## Key terms

| Term | Meaning |
|---|---|
| `nn.Linear` | A learned linear transformation: `y = x @ weight.T + bias` |
| `in_features` / `out_features` | The expected size of the last dimension of input/output |
| Activation function | A non-linear, elementwise function applied between layers |
| `nn.ReLU` | `max(0, x)`; the default hidden-layer activation for most networks |
| `nn.Sequential` | A module that chains a list of layers in order |

## Recap

`nn.Linear` performs a learned linear transformation with a `weight` and `bias`, and activation functions like `ReLU`, `GELU`, `Sigmoid`, and `Tanh` insert the non-linearity that gives stacked layers real expressive power. `nn.Sequential` chains layers together for simple feedforward stacks. Next up, Lesson 10: loss functions, which measure how wrong a model's predictions are.
