# Early Stopping & Validation Strategy

Training longer isn't always better — past a certain point, a model starts fitting noise in the training set rather than learning anything new and useful. Early stopping is the simple, effective fix: stop training once validation performance stops improving, and keep the best version you saw along the way.

## What you'll learn

- Why train / validation / test splits exist, and what each one is actually for
- How to implement early stopping by hand around a training loop — PyTorch has no built-in `EarlyStopping` class
- What `patience` controls, and how to pick a reasonable value
- Why the best checkpoint is usually not the one from the final epoch

## Three splits, three jobs

- **Training set** — what the model's weights are actually updated on.
- **Validation set** — used after each epoch to check generalization, pick hyperparameters, and decide when to stop. The model never trains directly on it.
- **Test set** — touched only once, at the very end, to report a final, unbiased estimate of performance. If you tune anything based on the test set, it stops being a fair estimate.

Early stopping leans entirely on the validation set. That's the whole reason it exists separately from the test set.

## Implementing early stopping by hand

PyTorch doesn't ship an `EarlyStopping` class — this is a pattern you build directly into your training loop:

```python
best_val_loss = float("inf")
patience, patience_counter = 5, 0

for epoch in range(max_epochs):
    train_one_epoch(model, train_loader, optimizer)
    val_loss = evaluate(model, val_loader, loss_fn)

    if val_loss < best_val_loss:
        best_val_loss = val_loss
        patience_counter = 0
        torch.save(model.state_dict(), "best_model.pt")
    else:
        patience_counter += 1
        if patience_counter >= patience:
            print(f"Stopping early at epoch {epoch}")
            break
```

Every epoch, validation loss either improves (reset the counter, save a new "best" checkpoint) or doesn't (increment the counter). Once the counter reaches `patience`, training stops.

## Choosing `patience`

Too small a `patience` (e.g. 1-2) stops training on normal validation-loss noise, before the model has really converged. Too large a `patience` wastes compute waiting out a plateau that was never going to improve. A patience of 5-15 epochs is a reasonable starting range for most small-to-medium training runs — tune it based on how noisy your validation curve looks.

## Why the last epoch usually isn't the best one

Without early stopping, it's common for validation loss to bottom out and then slowly creep back up as the model starts overfitting, even while training loss keeps falling. That's exactly why the pattern above saves `best_model.pt` only when validation loss improves — the checkpoint you actually deploy is rarely the one from the final epoch of a fixed-length run.

## Key terms

| Term | Meaning |
|---|---|
| Train / validation / test split | Three disjoint datasets used for fitting, tuning/stopping decisions, and final unbiased evaluation |
| Early stopping | Halting training once a tracked validation metric stops improving for a set number of epochs |
| `patience` | The number of epochs without improvement to tolerate before stopping |
| Best checkpoint | The saved model state from the epoch with the best validation metric seen so far, not necessarily the last epoch |
