# Feed-Forward Sublayers

Attention gets all the attention, but roughly two-thirds of a transformer's parameters live somewhere else entirely: the feed-forward sublayer sitting right after it in every block. This lesson looks closely at that piece — what it computes, why it's "position-wise," and why it's conventionally four times wider than `d_model`.

## What you'll learn

- What "position-wise" feed-forward means, and why it's attention's structural opposite
- The exact two-`Linear`-layers-plus-activation shape, and PyTorch code for it
- Why `d_ff` is conventionally `4 * d_model`, with real model numbers
- Why most of a transformer block's parameters live in the FFN, not in attention

## Position-wise: no mixing across positions

Inside a transformer block, attention is the *only* sublayer that lets information move between positions — token 5 can look at token 2 only through attention. The feed-forward sublayer does the opposite: it's applied **independently to each position**, using the exact same weights at every position, with zero communication between them. If attention is "look around," the feed-forward sublayer is "now think about what you found, on your own."

That's why it's called **position-wise** (or sometimes token-wise): the same `Linear -> activation -> Linear` transformation runs on token 1, token 2, ... token T separately, as if you'd `reshape`d `(B, T, d_model)` into `(B*T, d_model)`, run a plain MLP, and reshaped back. In practice `nn.Linear` already broadcasts over leading dimensions, so you never need that reshape explicitly.

## The shape: two linear layers, one activation

```python
import torch.nn as nn

ffn = nn.Sequential(
    nn.Linear(d_model, d_ff),
    nn.GELU(),
    nn.Linear(d_ff, d_model),
)
# input/output shape: (batch, seq_len, d_model) -- unchanged
```

The first `Linear` *expands* each token's representation from `d_model` up to a wider `d_ff`. The activation introduces non-linearity — without it, two stacked linear layers would collapse into one linear layer, mathematically. The second `Linear` *projects back down* from `d_ff` to `d_model`, so the sublayer's output can be added straight back onto the residual stream with `x = x + ffn(norm2(x))`.

The original "Attention Is All You Need" paper used `nn.ReLU()` here. Most modern models — GPT-2 and onward — use `nn.GELU()` instead, a smoother activation that tends to train slightly better in practice. Either is a drop-in swap; the shape of the sublayer doesn't change.

## Why `d_ff` is conventionally `4 * d_model`

The expand-then-contract ratio is a convention that's held up remarkably well:

| Model | `d_model` | `d_ff` | ratio |
|---|---|---|---|
| Original Transformer (base) | 512 | 2048 | 4x |
| GPT-2 small | 768 | 3072 | 4x |

There's no deep mathematical law forcing exactly 4x — it's an empirically-found sweet spot between giving the FFN enough extra capacity to do useful work and not letting it dominate the parameter budget. You'll sometimes see other ratios in newer architectures, but 4x remains the default you should reach for unless you have a specific reason not to.

## Where the parameters actually live

Each `Linear(d_model, d_ff)` has roughly `d_model * d_ff` weights, and there are two of them per block (expand and contract) — about `2 * d_model * d_ff = 8 * d_model^2` parameters when `d_ff = 4 * d_model`. Compare that to self-attention's four `d_model * d_model` projection matrices (Q, K, V, and the output projection) — about `4 * d_model^2`. The FFN's two big matrices outweigh attention's four smaller ones, which is why, parameter-for-parameter, the feed-forward sublayer is where most of a transformer's capacity actually sits. The intuition for *why* it matters: attention mixes information across positions, but it's the FFN that gets to do the nonlinear, per-token "thinking" with everything attention just gathered.

## Key terms

| Term | Meaning |
|---|---|
| Position-wise feed-forward | An MLP applied independently and identically to every position, with no cross-position mixing |
| `d_ff` | The FFN's hidden width, conventionally `4 * d_model` |
| GELU | A smooth activation function, the modern default inside transformer FFNs |
| Expand-contract | The FFN's shape: `d_model -> d_ff` then `d_ff -> d_model` |

## Recap

The feed-forward sublayer is a small, position-wise MLP — `Linear(d_model, d_ff)`, an activation, `Linear(d_ff, d_model)` — applied identically and independently to every token. `d_ff` is conventionally four times `d_model`, and these two linear layers hold more parameters than the entire attention mechanism in the same block. Next up, Lesson 39: why the residual adds around both sublayers matter, and where exactly LayerNorm belongs.
