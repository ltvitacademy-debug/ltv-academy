# The Chinchilla Trade-off: Params vs. Tokens

The last lesson established that loss falls predictably as you scale parameters, data, or compute on their own. The much more useful question for anyone actually planning a training run is: given a fixed compute budget, what's the best way to split it between a bigger model and more training tokens? That question has a well-known answer, and it came from a 2022 DeepMind paper that trained a model called Chinchilla to test it.

## What you'll learn

- The problem with the original (Kaplan-era) guidance on model size vs. data size
- What the Hoffmann et al. (2022) "Chinchilla" paper actually did differently
- The compute-optimal rule of thumb: roughly 20 tokens per parameter
- Why many earlier large models were undertrained relative to their size
- How to apply this trade-off when planning your own pretraining run

## The problem Chinchilla fixed

Kaplan et al.'s original scaling-law work suggested that, for a fixed compute budget, it was better to scale model size aggressively and scale data more slowly — in practice, this led several major labs to train very large models (GPT-3 among them) on a comparatively modest number of tokens relative to their parameter count. That guidance turned out to rest on a methodological issue: the original fits didn't correct for learning-rate schedules that weren't properly tuned for each run length, which biased the recommended split toward bigger models.

## What Hoffmann et al. did differently

The Chinchilla paper ("Training Compute-Optimal Large Language Models," Hoffmann et al., 2022) reran the scaling-law analysis far more carefully: over 400 models were trained, ranging from 70 million to 16 billion parameters, each with a properly tuned learning-rate schedule matched to its training length, and training token counts from 5 billion to 500 billion. Three independent approaches all converged on the same conclusion: for a fixed compute budget, model size and dataset size should be scaled in roughly equal proportion — not model size dominating.

The headline result was Chinchilla itself: a 70-billion-parameter model trained on 1.4 trillion tokens, using the *same* compute budget as the 280-billion-parameter Gopher model, which had been trained on far fewer tokens per parameter. Chinchilla outperformed the much larger Gopher (and also outperformed GPT-3) on a wide range of downstream evaluations, despite being a quarter of the size, simply because its compute had been split differently.

## The rule of thumb: ~20 tokens per parameter

The practical, widely cited takeaway from Chinchilla's fitted curves is that compute-optimal training uses roughly 20 tokens for every parameter in the model. A 7-billion-parameter model's compute-optimal token budget is therefore in the neighborhood of 140 billion tokens. This is a planning heuristic, not a hard law — the real optimum shifts somewhat with architecture and data quality, and plenty of modern open models are deliberately trained well past the compute-optimal point (see below) — but "~20x params in tokens" is the number to anchor on when someone asks "is this run under-trained or over-trained for its size?"

```text
# Chinchilla-style compute-optimal planning
compute_budget_flops = 6 * N * D        # same C ≈ 6ND identity from Lesson 14

# Hoffmann et al.'s fitted optimum, approximately:
D_optimal ≈ 20 * N                      # tokens ≈ 20x parameters

# Example: N = 7e9 params
D_optimal ≈ 20 * 7e9 = 1.4e11 tokens    # ~140B tokens
```

## Why "overtraining past compute-optimal" is common today

Compute-optimal minimizes training-time loss for a fixed training budget — but it says nothing about inference cost. A smaller model trained on far more than its "optimal" token count (sometimes called overtraining, relative to the Chinchilla point) costs more to train than strictly necessary, but is cheaper and faster to serve at inference time for a given quality bar, because inference cost scales with parameters, not with how many tokens it was trained on. Many widely used open-weight models deliberately choose a smaller, overtrained model over a larger, compute-optimal one for exactly this reason — total lifetime cost (training once plus serving billions of inference requests) favors the smaller model.

## Key terms

- **Compute-optimal frontier** — the N/D split that minimizes loss for a fixed compute budget C
- **Chinchilla (Hoffmann et al., 2022)** — the paper that corrected earlier scaling-law guidance using properly tuned learning-rate schedules
- **~20 tokens per parameter** — the widely cited compute-optimal rule of thumb from Chinchilla's fitted curves
- **Overtraining (relative to compute-optimal)** — deliberately training a smaller model on more tokens than the compute-optimal point, to reduce inference cost
