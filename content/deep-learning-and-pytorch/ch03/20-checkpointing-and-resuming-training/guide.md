# Checkpointing & Resuming Training

Real training runs take hours or days, and something will eventually interrupt one — a crash, a preemption, or just you needing to stop for the night. Checkpointing saves enough state to resume exactly where you left off, instead of starting over.

## What you'll learn

- What actually needs to be saved to resume training correctly, not just to run inference later
- How to save and load a full checkpoint dictionary with `torch.save` / `torch.load`
- Why the optimizer's state matters just as much as the model's weights
- How to structure a resumable training loop around a saved `epoch` number

## Why a checkpoint is more than just the weights

If you only save `model.state_dict()`, you can reload the model for inference — but you can't *resume training* cleanly. Adam and similar optimizers track per-parameter running averages, and a scheduler tracks where it is in its decay curve. Restarting those from scratch produces a different (usually worse) trajectory than the run would have had if it never stopped. A proper training checkpoint bundles everything needed to continue as if nothing happened.

## Saving a full checkpoint

```python
checkpoint = {
    "epoch": epoch,
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "scheduler_state_dict": scheduler.state_dict(),
    "best_val_loss": best_val_loss,
}
torch.save(checkpoint, "checkpoint.pt")
```

`state_dict()` on a model, optimizer, or scheduler returns a plain dictionary of its internal tensors and settings — exactly the pieces needed to restore it later. Saving a plain Python dictionary around those state dicts lets you bundle in whatever else matters, like the epoch number or your best validation score so far.

## Loading and resuming

```python
checkpoint = torch.load(
    "checkpoint.pt", map_location=device, weights_only=False
)

model.load_state_dict(checkpoint["model_state_dict"])
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
scheduler.load_state_dict(checkpoint["scheduler_state_dict"])

start_epoch = checkpoint["epoch"] + 1
best_val_loss = checkpoint["best_val_loss"]

for epoch in range(start_epoch, total_epochs):
    train_one_epoch(model, train_loader, optimizer)
    scheduler.step()
```

Two details matter here. `map_location=device` lets you load a checkpoint saved on a GPU machine onto a CPU-only machine (or a different GPU index) without crashing. And `weights_only=False` is required for a checkpoint like this one, because it contains more than just tensors — PyTorch's default of `weights_only=True` is a safety measure meant for loading model weights from untrusted sources, and it will reject a dict with optimizer/scheduler state; only pass `weights_only=False` for files you saved yourself and trust.

## Checkpointing cadence

A common pattern is to save at the end of every epoch, or every N steps for very long runs, often keeping both a "latest" checkpoint (to resume from) and a separate "best" checkpoint (lowest validation loss seen, saved whenever it improves).

## Key terms

| Term | Meaning |
|---|---|
| Checkpoint | A saved snapshot of everything needed to resume training |
| `state_dict()` | A dictionary of a module's/optimizer's/scheduler's internal tensors and settings |
| `torch.save` / `torch.load` | PyTorch's functions for serializing and deserializing Python objects, including checkpoints |
| `map_location` | Remaps which device a loaded checkpoint's tensors land on |
| `weights_only` | A `torch.load` safety flag; must be `False` to load a checkpoint containing non-tensor state like optimizer dicts |
