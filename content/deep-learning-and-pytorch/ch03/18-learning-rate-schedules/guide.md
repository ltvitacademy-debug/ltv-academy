# Learning Rate Schedules

A fixed learning rate is rarely the best choice for an entire training run. Early on, a larger learning rate helps the model make fast progress; later, it needs to shrink so the model can settle into a good minimum instead of bouncing around it. A learning rate scheduler automates that shrinking for you.

## What you'll learn

- Why the optimal learning rate usually changes over the course of training
- How to attach a scheduler to an optimizer and call it correctly in the training loop
- The difference between step-based decay, cosine annealing, and metric-driven decay
- Where exactly `scheduler.step()` belongs relative to `optimizer.step()`

## Why schedule the learning rate at all

A learning rate that's good for epoch 1 is often too large by epoch 40 — it keeps the loss oscillating instead of settling. A learning rate that's small enough to be stable late in training would take far too long to make progress early on. Schedules resolve this by starting higher and decaying over time, following one of a few common shapes.

## StepLR: decay by a fixed amount, periodically

```python
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)
scheduler = torch.optim.lr_scheduler.StepLR(
    optimizer, step_size=30, gamma=0.1
)

for epoch in range(100):
    train_one_epoch(model, train_loader, optimizer)
    scheduler.step()
```

Every `step_size` epochs, the learning rate is multiplied by `gamma` — here, cut to a tenth of its value every 30 epochs.

## CosineAnnealingLR: a smooth curve to a minimum

```python
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=50
)

for epoch in range(50):
    train_one_epoch(model, train_loader, optimizer)
    scheduler.step()
```

Instead of dropping in sudden steps, the learning rate follows a cosine curve down to (near) zero over `T_max` epochs — a smoother decay that many modern training recipes default to.

## ReduceLROnPlateau: decay driven by validation performance

This scheduler is different: it doesn't decay on a fixed epoch count, it waits for the validation metric to stop improving.

```python
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode="min", factor=0.5, patience=5
)

for epoch in range(epochs):
    train_one_epoch(model, train_loader, optimizer)
    val_loss = evaluate(model, val_loader, loss_fn)
    scheduler.step(val_loss)  # note: takes a metric, not nothing
```

If `val_loss` hasn't improved for `patience` epochs, the learning rate is multiplied by `factor`. Notice that `scheduler.step(val_loss)` takes an argument here — unlike `StepLR` and `CosineAnnealingLR`, which take none.

## Placement matters

`scheduler.step()` is called once per epoch (for these three schedulers), after the epoch's training is done — not per batch, and not before `optimizer.step()` inside the batch loop. Mixing this up is a common, quiet bug: the learning rate ends up decaying far faster or slower than you intended.

## Key terms

| Term | Meaning |
|---|---|
| Learning rate schedule | A rule for changing the learning rate over the course of training |
| `StepLR` | Multiplies the learning rate by `gamma` every `step_size` epochs |
| `CosineAnnealingLR` | Decays the learning rate smoothly along a cosine curve over `T_max` epochs |
| `ReduceLROnPlateau` | Decays the learning rate when a tracked validation metric stops improving |
| `scheduler.step()` | Advances the schedule; called once per epoch, after training for that epoch |
