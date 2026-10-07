# Capstone: Building & Training the Model

With a dataset and a character-level tokenizer in hand from Lesson 57, it's time to build. Nothing here is new: you're assembling the decoder-only transformer from Chapter 6, wrapping your tokenized text in a `Dataset`/`DataLoader` pair the way Chapter 1 taught you, training it with the AdamW-plus-gradient-clipping habits from Chapters 2-3, and — if you're on a GPU and want faster steps — layering in the mixed precision and gradient accumulation from Chapter 7. This lesson walks through the whole pipeline as one continuous, runnable script.

## What you'll learn

- How to turn a long token sequence into training examples with a custom `Dataset`
- How to instantiate the decoder-only transformer from Chapter 6 for this capstone's scope
- A complete training loop combining AdamW, a cosine learning-rate schedule, and gradient clipping
- How to add automatic mixed precision and gradient accumulation on top, without changing the model
- Why checkpointing matters even for a training run this short

## Turning text into training examples

A language model is trained on (input, target) pairs where the target is the input shifted one position to the right — predict the next character at every position. A custom `Dataset` makes this a one-liner per example:

```python
import torch
from torch.utils.data import Dataset, DataLoader

class TokenBlockDataset(Dataset):
    def __init__(self, ids: torch.Tensor, block_size: int):
        self.ids = ids
        self.block_size = block_size

    def __len__(self):
        return len(self.ids) - self.block_size

    def __getitem__(self, i):
        chunk = self.ids[i : i + self.block_size + 1]
        return chunk[:-1], chunk[1:]

data = torch.tensor(encode(text), dtype=torch.long)
n = int(0.9 * len(data))
train_ids, val_ids = data[:n], data[n:]

train_loader = DataLoader(TokenBlockDataset(train_ids, block_size=128),
                           batch_size=64, shuffle=True, drop_last=True)
```

This is exactly the `Dataset`/`DataLoader` pattern from Chapter 1, Lesson 5 — nothing capstone-specific about the mechanics, just applied to token IDs instead of images or tabular rows.

## Instantiating the model from Chapter 6

Reuse the decoder-only transformer class you built in Chapter 6, Lesson 40 (`nn.Embedding` for tokens and positions, a stack of transformer blocks with causal self-attention, a final `nn.LayerNorm`, and an `nn.Linear` output head projecting back to `vocab_size`). Size it to the budget from Lesson 57:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"

model = TinyGPT(
    vocab_size=vocab_size,
    block_size=128,
    n_layer=4,
    n_head=4,
    n_embd=128,
    dropout=0.1,
).to(device)

print(sum(p.numel() for p in model.parameters()), "parameters")
```

The `dropout=0.1` here is the same regularization habit from Chapter 3, Lesson 16 — a tiny model trained on a small dataset for several thousand steps can and will overfit without it.

## The training loop

This loop combines the from-scratch training loop (Chapter 1, Lesson 4), AdamW and a cosine learning-rate schedule (Chapter 2, Lesson 11 and Chapter 3, Lesson 18), and gradient clipping (Chapter 3, Lesson 19):

```python
import torch.nn.functional as F

max_steps = 3000
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.1)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=max_steps)

model.train()
step = 0
while step < max_steps:
    for x, y in train_loader:
        x, y = x.to(device), y.to(device)

        logits = model(x)
        loss = F.cross_entropy(logits.view(-1, vocab_size), y.view(-1))

        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()
        scheduler.step()

        if step % 200 == 0:
            print(f"step {step:5d}  loss {loss.item():.4f}")
        step += 1
        if step >= max_steps:
            break
```

`F.cross_entropy` expects `(N, vocab_size)` logits and `(N,)` integer targets, which is why both `logits` and `y` get flattened with `.view(-1, ...)` before the loss — the model itself still outputs `(batch, block_size, vocab_size)`.

## Optional: mixed precision and gradient accumulation (Chapter 7)

If you're training on a GPU and want faster steps, or a CPU and want a bigger effective batch size than memory allows, layer in the Chapter 7 techniques without touching the model or the data pipeline:

```python
scaler = torch.amp.GradScaler("cuda")
accum_steps = 4  # effective batch size = batch_size * accum_steps

optimizer.zero_grad()
for i, (x, y) in enumerate(train_loader):
    x, y = x.to(device), y.to(device)
    with torch.amp.autocast("cuda", dtype=torch.bfloat16):
        logits = model(x)
        loss = F.cross_entropy(logits.view(-1, vocab_size), y.view(-1))

    scaler.scale(loss / accum_steps).backward()

    if (i + 1) % accum_steps == 0:
        scaler.unscale_(optimizer)
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        scaler.step(optimizer)
        scaler.update()
        optimizer.zero_grad()
        scheduler.step()
```

`torch.amp.autocast` runs the forward pass in a lower-precision dtype where it's safe to; `GradScaler` keeps the backward pass numerically stable. This is purely a speed/memory optimization — it should not change what the model learns, only how fast it gets there. If you're on CPU, skip this block entirely; `autocast("cuda", ...)` has no CPU equivalent worth bothering with at this scale.

## Checkpoint as you go

Even a 20-minute training run is worth checkpointing, the way Chapter 3, Lesson 20 taught you, so you can resume or roll back to your best validation loss instead of re-running from scratch:

```python
torch.save({
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "step": step,
    "vocab_size": vocab_size,
}, "checkpoint.pt")
```

Save at least once at the end of training, and optionally every few hundred steps if you want the ability to roll back. Lesson 59 loads this checkpoint to evaluate the model, and Lesson 60 references it in the write-up.

## Key terms

| Term | Meaning |
|---|---|
| Causal self-attention | Self-attention masked so a position can only attend to itself and earlier positions — what makes the transformer "decoder-only" |
| Cosine learning-rate schedule | A schedule that decays the learning rate along a cosine curve from its initial value to near zero over training |
| Gradient accumulation | Summing gradients over several mini-batches before stepping the optimizer, simulating a larger batch size |
| Automatic mixed precision (AMP) | Running parts of the forward pass in a lower-precision dtype for speed, while keeping training numerically stable |
| Checkpoint | A saved snapshot of model and optimizer state that training can resume from or be evaluated against |
