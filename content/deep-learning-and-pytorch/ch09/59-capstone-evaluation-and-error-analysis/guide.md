# Capstone: Evaluation & Error Analysis

Training the model is only half the capstone — the other half is being honest about how well it actually works. This lesson covers the three things you need to evaluate a from-scratch language model: a quantitative score (held-out loss and perplexity), a qualitative check (does the generated text actually look right), and error analysis (what kind of mistakes is it making, and is it overfitting). You've already met every tool this lesson uses: cross-entropy loss from Chapter 2, sampling strategies from Chapter 6, and loss-curve literacy from Chapter 8. This lesson applies all three to your trained checkpoint.

## What you'll learn

- How to compute held-out loss and convert it into perplexity, and what perplexity actually measures
- How to generate text from your trained model using greedy, top-k, and top-p sampling
- How to tell overfitting from a healthy training run by reading the train/validation loss gap
- How to compare two runs or ablations and draw a defensible conclusion from the comparison

## Computing held-out loss and perplexity

Loss on the training set tells you whether the model is learning; loss on data it never saw during training tells you whether it generalized. Load your checkpoint and run a pass over the validation set with gradients disabled:

```python
import math
import torch.nn.functional as F

@torch.no_grad()
def evaluate(model, loader, device):
    model.eval()
    total_loss, total_tokens = 0.0, 0
    for x, y in loader:
        x, y = x.to(device), y.to(device)
        logits = model(x)
        loss = F.cross_entropy(
            logits.view(-1, logits.size(-1)), y.view(-1), reduction="sum"
        )
        total_loss += loss.item()
        total_tokens += y.numel()
    model.train()
    avg_loss = total_loss / total_tokens
    return avg_loss, math.exp(avg_loss)

val_loss, val_ppl = evaluate(model, val_loader, device)
print(f"val loss {val_loss:.4f}  perplexity {val_ppl:.2f}")
```

**Perplexity is `exp(average cross-entropy loss)`.** It has an intuitive reading: a perplexity of 20 means the model is, on average, as uncertain about the next token as if it were choosing uniformly among 20 equally likely options. Lower is better. For a character-level tiny GPT on Tiny Shakespeare, a validation perplexity somewhere in the single digits to low teens after a few thousand steps is a reasonable, honest result — nowhere near state-of-the-art language models, and that's expected at this scale.

`model.eval()` matters here for the same reason it always does: it turns dropout off, so you're measuring the model's real inference-time behavior, not a noisier training-time version of it. `torch.no_grad()` skips building the autograd graph, which is both faster and uses far less memory during evaluation.

## Generating samples: greedy, top-k, top-p

A perplexity number tells you how confident the model is; it doesn't tell you what the model actually produces. Generate text and read it. This function reuses the sampling strategies from Chapter 6, Lesson 42:

```python
@torch.no_grad()
def generate(model, idx, max_new_tokens, top_k=None, top_p=None):
    model.eval()
    for _ in range(max_new_tokens):
        logits = model(idx[:, -model.block_size:])[:, -1, :]
        if top_k is not None:
            v, _ = torch.topk(logits, top_k)
            logits[logits < v[:, [-1]]] = float("-inf")
        probs = F.softmax(logits, dim=-1)
        if top_p is not None:
            sp, si = torch.sort(probs, descending=True)
            keep = torch.cumsum(sp, dim=-1) - sp <= top_p
            sp = sp * keep
            probs = torch.zeros_like(probs).scatter_(-1, si, sp)
            probs /= probs.sum(dim=-1, keepdim=True)
        next_id = torch.multinomial(probs, num_samples=1)
        idx = torch.cat([idx, next_id], dim=1)
    model.train()
    return idx

seed = torch.tensor([encode("ROMEO:")], dtype=torch.long, device=device)
out = generate(model, seed, max_new_tokens=200, top_k=20)
print(decode(out[0].tolist()))
```

Greedy decoding (always pick `argmax`) is deterministic but tends to loop and repeat itself — a classic tell of a model sampled too conservatively. Top-k and top-p introduce controlled randomness by restricting sampling to the most likely tokens, which usually produces more varied, still-plausible text. Try all three and compare; this is one of the easiest and most informative things you can do with ten minutes of a trained checkpoint.

## Reading the train/validation gap for overfitting

Chapter 8, Lesson 51 taught you to read loss curves in general; here's the specific pattern to watch for in this capstone. Log both losses during training (not just train loss) and compare their shapes:

- **Both losses falling together, validation slightly above training** — healthy. This is what you want to see.
- **Training loss keeps falling while validation loss flattens, then starts rising** — classic overfitting. The model is memorizing training sequences rather than learning generalizable structure. A tiny model on a tiny dataset with too many training steps will do this reliably; it's not a bug, it's a signal to stop training earlier, add more dropout, or add weight decay (Chapter 3, Lesson 16).
- **Both losses stuck flat from the start** — underfitting or a configuration bug (learning rate too low, a frozen parameter, or a bug Chapter 8, Lesson 53 would help you catch).

Plot both curves if you logged them; even eyeballing the last printed values from training is usually enough to tell which of these three patterns you're in.

## Comparing two runs or ablations

A single number means little without something to compare it to. Train one more variant with a single deliberate change — more layers, a different `top_k`, no dropout — and compare:

```python
runs = {
    "baseline (4 layers, dropout 0.1)": (val_loss_a, val_ppl_a),
    "ablation (no dropout)":            (val_loss_b, val_ppl_b),
}
for name, (loss, ppl) in runs.items():
    print(f"{name:35s}  loss={loss:.4f}  ppl={ppl:.2f}")
```

Keep the comparison to one changed variable at a time — if you change the model size and the dropout rate together, you won't know which one caused the difference. This habit (change one thing, compare, record the result) is the same discipline from Chapter 8, Lesson 56, applied here on your own project instead of someone else's example.

## Key terms

| Term | Meaning |
|---|---|
| Perplexity | `exp(average cross-entropy loss)`; the effective number of equally-likely next-token choices the model is "confused between" |
| Greedy decoding | Always picking the single highest-probability next token; deterministic but prone to repetition |
| Top-k sampling | Restricting sampling to the k most likely next tokens, then sampling among them |
| Top-p (nucleus) sampling | Restricting sampling to the smallest set of tokens whose cumulative probability exceeds p |
| Overfitting gap | The pattern where training loss keeps falling but validation loss flattens or rises — a sign the model is memorizing, not generalizing |
