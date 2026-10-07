# Regularization: Weight Decay & Dropout

A network with enough capacity can memorize its training set perfectly and still fail badly on new data. Regularization is the set of techniques that trade a little training accuracy for a model that generalizes better. This lesson covers the two you'll reach for most often in PyTorch: weight decay and dropout.

## What you'll learn

- Why a model that fits its training data perfectly can still generalize poorly
- How weight decay penalizes large weights, and how to set it on an optimizer
- Why `AdamW` decouples weight decay from the gradient update, unlike plain `Adam`
- How `nn.Dropout` works, and why it behaves differently in `train()` vs `eval()` mode

## Overfitting, briefly

A model overfits when it has learned patterns specific to the training set — including its noise — rather than patterns that generalize. You can usually see this as a growing gap between training loss (still falling) and validation loss (flat or rising). Regularization methods fight this gap directly, by constraining what the model is allowed to learn.

## Weight decay

Weight decay adds a penalty proportional to the size of the weights, pushing the optimizer toward smaller weight values unless the data gives it a strong reason not to. In PyTorch it's just an optimizer argument:

```python
optimizer = torch.optim.SGD(
    model.parameters(), lr=0.01, weight_decay=1e-4
)
```

With plain `torch.optim.Adam`, `weight_decay` is implemented as classic L2 regularization added directly to the gradient — which interacts awkwardly with Adam's adaptive per-parameter learning rates. `AdamW` fixes this by decoupling the decay step from the gradient-based update entirely, and it's the version almost everyone should reach for today:

```python
optimizer = torch.optim.AdamW(
    model.parameters(), lr=1e-3, weight_decay=0.01
)
```

## Dropout

Dropout randomly zeroes out a fraction of a layer's activations on every forward pass during training, forcing the network to not rely too heavily on any single unit:

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(p=0.5),
    nn.Linear(256, 10),
)
```

`p` is the probability a given activation gets zeroed — `p=0.5` is a common default for fully-connected layers, often lower (`0.1`-`0.3`) for convolutional ones.

## Train mode vs. eval mode matters here

Dropout (and batch normalization, covered next lesson) behaves differently depending on the module's mode:

```python
model.train()   # dropout is active: random zeroing happens
# ... training steps ...

model.eval()    # dropout is disabled: every activation passes through
# ... validation / inference ...
```

Forgetting to call `model.eval()` before validation is one of the most common silent bugs in a training script — it quietly makes your validation metrics noisier and usually worse than the model actually is.

## Key terms

| Term | Meaning |
|---|---|
| Overfitting | Learning training-specific patterns that don't generalize to new data |
| Weight decay | A penalty on large weight values, added via an optimizer's `weight_decay` argument |
| AdamW | Adam with weight decay decoupled from the gradient-based update |
| Dropout | Randomly zeroing a fraction of activations during training to reduce over-reliance on specific units |
| `model.train()` / `model.eval()` | Switches that control whether dropout and batch norm behave in "training" or "inference" mode |
