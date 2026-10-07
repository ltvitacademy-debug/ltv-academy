# Reading Loss Curves

A loss curve is the single most information-dense plot you'll look at while training. Chapter 7 was about making a training run fast; Chapter 8 is about making it correct, or at least noticing quickly when it isn't. This lesson teaches you to read the shapes a loss curve makes and translate them into specific, actionable diagnoses, instead of just watching the number go down and hoping.

## What you'll learn

- The difference between batch-level noise and the epoch-level trend you actually care about
- What a healthy train/validation gap looks like, versus overfitting
- What a plateau, a spike, and outright divergence each usually mean
- A minimal pattern for logging and plotting loss history yourself

## Logging loss history

Before you can read a curve, you need to actually record one. The habit to build now: track per-epoch averages for both training and validation loss, not just the last batch's number.

```python
history = {"train_loss": [], "val_loss": []}

for epoch in range(num_epochs):
    train_loss = run_training_epoch(model, train_loader, optimizer, loss_fn)
    val_loss = run_validation_epoch(model, val_loader, loss_fn)
    history["train_loss"].append(train_loss)
    history["val_loss"].append(val_loss)
    print(f"epoch {epoch}: train={train_loss:.4f} val={val_loss:.4f}")
```

```python
import matplotlib.pyplot as plt

plt.plot(history["train_loss"], label="train")
plt.plot(history["val_loss"], label="val")
plt.xlabel("epoch")
plt.ylabel("loss")
plt.legend()
plt.show()
```

## Batch noise vs. the real trend

If you log loss every batch instead of every epoch, the curve will look jagged even when training is going perfectly well — each batch is a noisy sample of the true loss, not the true loss itself. That's normal and expected. What matters is the trend over many batches or epochs, not whether any single point went up. If you want a batch-level view without the noise drowning the signal, smooth it with a moving average before you read anything into small wiggles.

## Reading the shape

A healthy run has training loss and validation loss both dropping together, with a small, fairly stable gap between them. A few shapes you'll see that mean something specific:

- **Widening gap** — training loss keeps falling but validation loss flattens or rises. That's overfitting: the model is memorizing training data instead of learning something general.
- **Plateau** — both losses flatten out well before you expected convergence. Often a learning rate that's too low, or the model has genuinely run out of capacity for the data as given.
- **Sudden spike** — loss jumps sharply for one or a few steps, sometimes recovering, sometimes not. A common cause is a learning rate that's too high relative to a particular batch's gradients, or a single bad/corrupted batch.
- **Divergence** — loss climbs and keeps climbing, often toward `inf` or `nan`. This usually means the learning rate is too high outright, or gradients are exploding (the next lesson's topic).

## Key terms

| Term | Meaning |
|---|---|
| Train/validation gap | The difference between training and validation loss; widening over time signals overfitting |
| Plateau | Loss flattening out before expected, often from too low a learning rate or capacity limits |
| Divergence | Loss climbing without recovering, often toward `inf`/`nan`, usually a learning-rate or gradient problem |
| Moving average | A smoothing technique that reveals the real trend underneath per-batch noise |
