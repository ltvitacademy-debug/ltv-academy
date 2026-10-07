# Residual Connections & Layer-Norm Placement

Two small design decisions quietly determine whether a deep transformer trains at all: where you put the `+` signs, and where you put `LayerNorm` relative to them. This lesson unpacks both, and settles on the ordering Lesson 40's decoder-only model actually uses.

## What you'll learn

- Why `x = x + sublayer(x)` matters for training deep stacks, not just shallow ones
- Exactly what `nn.LayerNorm` computes, and over which dimension
- The two competing placements — post-norm and pre-norm — and the code for each
- Why pre-norm became the modern default, and what trade-off it makes

## Why the residual add matters

A residual (or "skip") connection is the plain addition in `x = x + sublayer(x)`. It looks almost too simple to matter, but it changes how gradients flow during backpropagation: the `+` gives the gradient an unobstructed, direct path backward through every block — the identity path — in addition to the path that flows through the sublayer's weights. Stack enough blocks without that identity path and gradients have to flow through dozens of nonlinear transformations in sequence, shrinking or exploding along the way. With it, gradients can always fall back on the `+`'s identity path no matter how deep the stack gets.

If this sounds familiar, it should — it's conceptually the same motivation behind the LSTM's additive cell-state path from Lesson 30. Both are answers to the same underlying problem: depth (in time, for an LSTM; in layers, for a transformer) makes gradients vanish unless you give them an additive shortcut.

## What `nn.LayerNorm` actually computes

```python
norm = nn.LayerNorm(d_model)
```

For each token independently, `LayerNorm` normalizes across the last dimension — the `d_model` feature axis:

```
(x - mean) / sqrt(var + eps) * weight + bias
```

`mean` and `var` are computed per token, over that token's `d_model` values — not across the batch, and not across the sequence. `weight` and `bias` are learned per-feature parameters the same size as `d_model`. The practical effect: every token's feature vector gets rescaled to have roughly zero mean and unit variance before the network does anything else with it, which keeps activations in a stable, predictable range as they flow through a deep stack.

## Two placements: post-norm vs. pre-norm

**Post-norm** — the ordering in the original 2017 "Attention Is All You Need" paper:

```python
x = norm(x + sublayer(x))
```

Normalization happens *after* the residual add. The identity path (the `+`) still exists, but the *result* of that add gets normalized before moving to the next block.

**Pre-norm** — the ordering GPT-2 and most modern large language models use:

```python
x = x + sublayer(norm(x))
```

Normalization happens *before* the sublayer runs, entirely inside the branch being added — the residual (`x` itself) passes through completely untouched.

## Why pre-norm won

The difference sounds cosmetic, but it isn't. In post-norm, the residual path gets normalized at every block, which means the clean identity signal gradients rely on is never actually clean — it's repeatedly rescaled. In pre-norm, the `x` on the left of the `+` is never touched by any normalization; the identity path stays perfectly clean all the way through the stack. Empirically, that difference gives pre-norm models dramatically more stable gradients, which in turn means you can train much deeper stacks without the careful learning-rate warmup schedules post-norm models typically need to avoid diverging early in training.

The trade-off: post-norm can produce slightly better final performance at small scale, when training stability isn't yet the bottleneck. But once you're stacking dozens of blocks — which is exactly where every real language model operates — pre-norm's training stability wins decisively. That's why Lesson 40's decoder-only build uses pre-norm, and why `TransformerBlock` back in Lesson 37 was already written that way:

```python
x = x + attn(norm1(x))
x = x + ffn(norm2(x))
```

## Key terms

| Term | Meaning |
|---|---|
| Residual connection | `x = x + sublayer(x)` — gives gradients a direct identity path backward |
| `nn.LayerNorm` | Normalizes each token's features over the last dimension; learned per-feature weight and bias |
| Post-norm | `norm(x + sublayer(x))` — original paper's ordering, normalizes after the add |
| Pre-norm | `x + sublayer(norm(x))` — modern default, keeps the residual path unnormalized |

## Recap

Residual connections give gradients an identity shortcut through every block, the same way an LSTM's cell state does across time steps. `LayerNorm` normalizes each token's own features. Pre-norm — normalizing inside the branch, before the sublayer, leaving the residual path untouched — gives far more stable training for deep stacks than the original paper's post-norm, which is why it's the ordering this course's decoder-only build uses. Next up, Lesson 40: assembling all of it into a complete decoder-only transformer.
