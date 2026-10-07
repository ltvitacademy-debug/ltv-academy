# Implementing the Training Loop for a Tiny GPT

You now have a complete `TinyGPT`: token embeddings, positional embeddings, a stack of pre-norm transformer blocks, a final LayerNorm, and a linear head that produces logits over the vocabulary. An untrained model is just a pile of random numbers wired together correctly. This lesson writes the training loop that turns it into a model that actually predicts language — the same next-token-prediction objective underneath every GPT-style model, scaled down to something your laptop can run.

## What you'll learn

- Why language model training is framed as next-token prediction, and how inputs/targets are built from one chunk of token ids
- How to compute the loss with `F.cross_entropy` over flattened batch and sequence dimensions
- The standard training step: forward → loss → `zero_grad` → `backward` → clip → `optimizer.step`
- Why AdamW and gradient clipping are the defaults for training transformers
- `model.train()` / `model.eval()` mode switching and periodic checkpointing

## Next-token prediction: building inputs and targets

A language model's entire job is to predict the next token given everything before it. You never need separate "input" and "label" files — a single sequence of token ids gives you both, just shifted by one position. If `chunk` is a sequence of length `T + 1`:

```python
inputs = chunk[:, :-1]   # positions 0 .. T-1
targets = chunk[:, 1:]   # positions 1 .. T
```

At every position `t`, `inputs[t]` is the token the model sees, and `targets[t]` is the token that actually came next in the real text. The model has to predict `targets[t]` using only `inputs[0:t+1]` — which is exactly what the causal mask inside your attention blocks enforces. One chunk of real text gives you a full batch of supervised next-token examples for free.

## Computing the loss

`model(inputs)` returns logits of shape `(B, T, vocab_size)` — a full probability distribution over the vocabulary at every position. `targets` is `(B, T)` — one correct token id per position. `F.cross_entropy` expects a 2D input of shape `(N, C)` and a 1D target of shape `(N,)`, so you flatten batch and sequence together before comparing:

```python
import torch.nn.functional as F

logits = model(inputs)                                  # (B, T, vocab_size)
loss = F.cross_entropy(
    logits.reshape(-1, logits.size(-1)),                 # (B*T, vocab_size)
    targets.reshape(-1),                                 # (B*T,)
)
```

This computes one cross-entropy value per position and averages them — a single scalar `loss` you can call `.backward()` on. Every position in every sequence in the batch contributes to the gradient simultaneously.

## The training step

```python
import torch
import torch.nn.functional as F

optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

model.train()
for step, batch in enumerate(train_loader):
    inputs, targets = batch[:, :-1], batch[:, 1:]

    logits = model(inputs)
    loss = F.cross_entropy(logits.reshape(-1, logits.size(-1)), targets.reshape(-1))

    optimizer.zero_grad()
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    optimizer.step()

    if step % 100 == 0:
        print(f"step {step}: loss {loss.item():.4f}")
```

`AdamW` is the standard optimizer for transformers — it's Adam with weight decay decoupled from the gradient update, which regularizes the weights without distorting Adam's adaptive learning rates. `optimizer.zero_grad()` clears gradients left over from the previous step (PyTorch accumulates by default), `loss.backward()` populates fresh gradients via autograd, and `optimizer.step()` applies the update.

## Gradient clipping

`torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)` rescales the gradient vector in-place so its total norm never exceeds `max_norm`, called after `backward()` and before `step()`. Transformers are deep stacks of matrix multiplications, and an unlucky batch can occasionally produce a gradient spike large enough to blow the weights into a bad region (or `NaN`) in one update. Clipping caps the size of any single step without changing its direction, which is cheap insurance that nearly every transformer training script includes by default.

## train() vs. eval(), and checkpointing

`model.train()` and `model.eval()` switch the behavior of layers like dropout (active in training, disabled in eval) — you saw this distinction back in Chapter 3's regularization material, and it matters again here because a tiny GPT typically uses dropout inside its attention and feed-forward sublayers. Always call `model.train()` before a training step and `model.eval()` before generating text or computing validation metrics (Lesson 43).

Training a model and then losing it to a crash or a closed notebook is a classic beginner mistake. Save state periodically with `torch.save`:

```python
torch.save({
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": step,
}, "tinygpt_checkpoint.pt")
```

Saving both the model and optimizer state (not just the weights) lets you resume training later with Adam's moment estimates intact, rather than restarting optimization from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Next-token prediction | Training objective: predict `targets = chunk[1:]` from `inputs = chunk[:-1]` |
| `F.cross_entropy` | Loss comparing flattened `(N, vocab_size)` logits against `(N,)` target ids |
| AdamW | Adam optimizer with decoupled weight decay; the default for transformers |
| Gradient clipping | Rescaling gradients so their norm never exceeds `max_norm`, preventing exploding updates |
| `model.train()` / `model.eval()` | Toggles dropout (and similar layers) on/off for training vs. inference |

## Recap

Language model training reuses one sequence as both input and target, just shifted by one position, and the loss is cross-entropy over every position at once via flattened logits. The training step itself — forward, loss, zero gradients, backward, clip, step — is the same loop you'll reuse for every transformer you ever train, tiny or otherwise. Next up, Lesson 42: turning a trained model's logits into actual generated text.
