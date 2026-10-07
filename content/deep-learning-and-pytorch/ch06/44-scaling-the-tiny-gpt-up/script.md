# Script — Scaling the Tiny GPT Up

## Segment 1 (title)

Every piece is in place now: architecture, training loop, sampling, and a way to measure quality with perplexity. This closing lesson of chapter six looks at the knobs available to make your tiny GPT bigger, what each one actually costs, and how to turn them up sensibly instead of all at once.

## Segment 2 (steps)

There are six real levers: model width and depth, which should scale together rather than one at a time; the number of attention heads and how far back the model can see; and dataset size, training steps, and batch size — how much the model actually gets to learn from. Each one trades capacity against cost differently, which is why scaling is a balancing act.

## Segment 3 (steps)

Head dimension is d_model divided by num_heads, and num_heads has to divide d_model evenly. The sweet spot is usually somewhere around 64 to 128 — too small and each head is too cramped to represent much, too large and you waste the benefit of having multiple independent views. So grow num_heads alongside d_model, since doubling width alone doubles head dimension too.

## Segment 4 (code)

Parameter count scales roughly with num_layers times d_model squared, because the attention and feed-forward projections inside every layer are both quadratic in width and repeat once per layer. Doubling d_model roughly quadruples the parameters each layer contributes; doubling num_layers only doubles them. Width is the more expensive lever to turn up.

## Segment 5 (steps)

Context length is a separate, costlier story: attention cost grows quadratically with sequence length, since every position attends to every other position. And a bigger model relative to a fixed dataset is more prone to overfitting — watch validation perplexity as you scale, and if training loss keeps falling while validation stalls, the model has outgrown the data.

## Segment 6 (outro)

That closes out chapter six — you've built a transformer from scratch, trained it, sampled from it, and evaluated it. Up next, lesson forty-five, opening chapter seven: floating point precision, FP32, FP16, and BF16, where scaling up means thinking about memory and multiple GPUs too.
