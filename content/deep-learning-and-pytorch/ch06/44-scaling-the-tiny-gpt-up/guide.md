# Scaling the Tiny GPT Up

Every piece is now in place: the architecture, the training loop, sampling, and a way to measure quality with perplexity. This closing lesson of Chapter 6 looks at the knobs available to make your tiny GPT bigger and more capable, what each one actually costs, and how to scale them sensibly instead of just turning everything up at once.

## What you'll learn

- The six levers that control a transformer's capacity and training cost
- Why `num_heads` must divide `d_model` evenly, and what a sensible head dimension looks like
- Why parameter count grows with `num_layers * d_model^2`, and what that means for compute and memory
- The idea behind scaling laws, kept at a conceptual level
- Practical guidance for scaling a tiny GPT without immediately overfitting

## The six levers

| Lever | What it controls |
|---|---|
| `d_model` | Width — the size of the embedding/hidden vector at every position |
| `num_layers` | Depth — how many transformer blocks are stacked |
| `num_heads` | How many parallel attention "views" each layer computes |
| `max_seq_len` | Context length — how many tokens of history the model can attend to |
| Dataset size / training steps | How much (and how long) the model actually trains on |
| Batch size | How many sequences are averaged into each gradient update |

Each lever trades capacity against cost in a different way, and they interact — which is why scaling is a balancing act, not just "turn one number up."

## Width, depth, and heads together

`num_heads` must divide `d_model` evenly, since each head operates on a slice of size `d_model / num_heads` (the **head dimension**). A common, well-behaved range for head dimension is roughly 64–128: too small and each head has too little room to represent anything useful, too large and you lose the benefit of having multiple independent attention "views" in the first place. In practice this means `num_heads` should grow alongside `d_model`, not stay fixed — doubling `d_model` while keeping `num_heads` the same doubles the head dimension, which can push it out of that sensible range.

Depth (`num_layers`) and width (`d_model`) should generally scale together rather than one at a time. A model that's very deep but very narrow, or very wide but very shallow, tends to train less efficiently than one where both grow in proportion.

## Why parameter count scales with `num_layers * d_model^2`

Inside each transformer block, the dominant costs are the attention projections (query, key, value, and output, each roughly `d_model × d_model`) and the feed-forward sublayer (typically `d_model × 4*d_model` and back). All of these are quadratic in `d_model`, and they repeat once per layer — so total parameter count grows roughly proportional to `num_layers * d_model^2`. Doubling `d_model` roughly quadruples the parameters contributed by each layer; doubling `num_layers` only doubles them. This is also why width is the more expensive lever to turn up compared to depth.

## Context length is the expensive one, separately

`max_seq_len` doesn't factor into that `num_layers * d_model^2` parameter count directly (the same attention weights are reused at every position), but the *compute and memory cost of a single forward pass* grows **quadratically** with sequence length — every position attends to every other position, so attention's cost is `O(T^2)`. Doubling context length quadruples the attention compute for a given batch, which is why context length is usually scaled cautiously and separately from model width/depth.

## Bigger models need more data too

A larger model has more capacity to simply memorize its training set rather than learn generalizable patterns — the same overfitting risk from Chapter 3's regularization material, just more acute as model size grows relative to dataset size. Watch validation loss and perplexity (Lesson 43) as you scale: if training loss keeps falling while validation loss stalls or rises, the model has outgrown the data, and you need more training data, more dropout/weight decay, or a smaller model — not more training steps.

## Scaling laws, conceptually

Empirically, as you scale model size, dataset size, and compute together, loss tends to improve smoothly and predictably rather than erratically — this is the core idea behind the "scaling laws" research that shaped GPT and subsequent large language models. The practical takeaway for this course isn't a specific formula, just the mindset: more capacity is reliably useful *only* when paired with proportionally more data and compute, and scaling just one lever in isolation gives diminishing (or negative) returns.

## Practical guidance for scaling your tiny GPT

- Scale `d_model` and `num_layers` together, not just one.
- Grow `num_heads` alongside `d_model` to keep head dimension in the 64–128 range.
- Increase `max_seq_len` cautiously and separately — remember its `O(T^2)` cost.
- Scale dataset size and training steps along with model size, not after the fact.
- Track validation perplexity throughout — it's your early warning system for "the model has outgrown the data."

## Key terms

| Term | Meaning |
|---|---|
| `d_model` | The width of the model's embedding/hidden representation at each position |
| Head dimension | `d_model / num_heads`; commonly kept in the 64–128 range |
| `O(T^2)` attention cost | Attention compute grows quadratically with sequence length `T` |
| Scaling laws | The empirical pattern that loss improves smoothly as model size, data, and compute scale together |

## Recap

Six levers — width, depth, heads, context length, data, and batch size — control a transformer's capacity and cost, and they need to scale together: width and depth in proportion, heads alongside width, context length cautiously because of its quadratic cost, and always with proportionally more data and training to avoid overfitting. That closes out Chapter 6 — you've built a complete transformer from scratch, trained it, sampled from it, and evaluated it. Up next, Lesson 45: Floating-Point Precision: FP32, FP16, BF16, opening Chapter 7 on scaling up with mixed precision and multi-GPU training.
