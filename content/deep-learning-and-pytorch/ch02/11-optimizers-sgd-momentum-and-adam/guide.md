# Optimizers: SGD, Momentum & Adam

In Lesson 4, we updated `w` and `b` by hand: `w -= lr * w.grad`. That's literally what an optimizer does, just formalized and made more sophisticated. `torch.optim` packages this update rule into a reusable object that knows about every parameter in your model, and offers several strategies for turning a gradient into an update — some much better than plain subtraction. This lesson covers the three you'll use most.

## What you'll learn

- How to construct an optimizer and hand it your model's parameters
- The `optimizer.zero_grad()` → `loss.backward()` → `optimizer.step()` pattern
- What momentum adds to plain SGD, and why it helps
- Why Adam is the default choice for most modern training
- Where the learning rate fits into each of these

## Constructing an optimizer

```python
import torch.optim as optim

model = MyModel()
optimizer = optim.SGD(model.parameters(), lr=0.01)
```

Every optimizer in `torch.optim` is constructed with the parameters it should update — almost always `model.parameters()`, the auto-discovered iterator from Lesson 8 — plus a learning rate and whatever other hyperparameters that optimizer supports.

## The three-call pattern

```python
for x_batch, y_batch in loader:
    optimizer.zero_grad()           # 1. clear old gradients
    predictions = model(x_batch)
    loss = criterion(predictions, y_batch)
    loss.backward()                 # 2. compute new gradients
    optimizer.step()                # 3. update every parameter
```

This replaces the manual `with torch.no_grad(): w -= lr * w.grad` from Lesson 4 with `optimizer.step()`, and replaces `w.grad = None` with `optimizer.zero_grad()`. `optimizer.step()` reads `.grad` off of every parameter it was given and applies its specific update rule — the mechanics inside `torch.no_grad()` are exactly what used to be written by hand.

## Plain SGD and the problem with it

Plain stochastic gradient descent, `optim.SGD(params, lr=...)`, does exactly the hand-rolled update from Lesson 4: `param -= lr * param.grad`. It works, but it can be slow to converge and prone to oscillating in narrow valleys of the loss landscape, because it only ever looks at the current gradient.

## Momentum: remembering recent direction

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
```

Momentum keeps a running average of recent gradients and uses that average, rather than just the current gradient, to update parameters. Intuitively, it's like a ball rolling downhill that builds up speed in a consistent direction and damps out oscillation across narrow, bouncy directions. `momentum=0.9` is a very common default — it means roughly 90% of the previous update direction carries forward into the next step.

## Adam: the default for most modern training

```python
optimizer = optim.Adam(model.parameters(), lr=0.001)
```

`optim.Adam` (Adaptive Moment Estimation) combines momentum with a per-parameter adaptive learning rate: it tracks both a running average of gradients (like momentum) and a running average of *squared* gradients, using the latter to automatically shrink the effective step size for parameters that have been receiving large or noisy gradients. In practice, this makes Adam far more forgiving of a suboptimal learning rate choice than plain SGD, and it's why `optim.Adam` is the default starting point for most deep learning tasks today — note its default learning rate of `0.001` is much smaller than SGD's typical `0.01`-`0.1`, since Adam's adaptive scaling already does a lot of the work.

## Where the learning rate fits

The learning rate (`lr`) scales every update regardless of which optimizer you use — it's the one hyperparameter every optimizer has in common. Momentum and Adam both change the *direction and effective size* of the step beyond what the raw gradient alone would suggest, but `lr` is still the base multiplier on top of that. Lesson 18 (Chapter 3) covers changing `lr` over the course of training with a schedule.

## Key terms

| Term | Meaning |
|---|---|
| `torch.optim` | Module containing optimizer classes that update parameters from gradients |
| `optimizer.step()` | Applies the optimizer's update rule to every parameter using its current `.grad` |
| `optimizer.zero_grad()` | Clears `.grad` on every tracked parameter before the next backward pass |
| Momentum | Uses a running average of past gradients to smooth and accelerate updates |
| `optim.Adam` | Combines momentum with a per-parameter adaptive learning rate; the common default |

## Recap

Every optimizer wraps the same core idea from Lesson 4's manual update, formalized into `zero_grad()` → `backward()` → `step()`. Plain SGD updates directly from the current gradient; momentum smooths that update using recent history; Adam adds a per-parameter adaptive learning rate on top, which is why it's the default choice for most training today. Next up, Lesson 12: putting `nn.Module`, layers, losses, and optimizers together to build a complete multilayer perceptron.
