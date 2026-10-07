# Evaluating a Tiny Language Model

Training loss tells you the model is fitting the data it's seen, but it says nothing about whether the model has actually learned something that generalizes. This lesson covers how language models get evaluated: a quantitative metric — perplexity — computed the right way on held-out data, paired with an honest look at what that metric does and doesn't tell you.

## What you'll learn

- Why evaluation always happens on a held-out validation split the model never trained on
- What perplexity is, how it's computed from cross-entropy loss, and how to read its value
- Why `model.eval()` and `torch.no_grad()` both matter during evaluation
- Why perplexity alone can't tell you if generated text is actually good — and what to check instead

## Why you need a held-out validation split

A model can drive its training loss arbitrarily low simply by memorizing the training data, without learning anything that transfers to new text. To know whether the model generalizes, you evaluate it on a **validation split** — text set aside before training and never shown to the model during a single gradient update. A low validation loss means the model is predicting tokens it never directly memorized; a training loss that keeps dropping while validation loss rises is the classic signature of overfitting (the same regularization concerns from Chapter 3 apply here).

## Perplexity: the standard metric

Perplexity is defined as `exp(average cross-entropy loss per token)`:

```
perplexity = exp(loss)
```

Average cross-entropy loss is already "how surprised the model was, on average, per token, in nats." Exponentiating converts that into a number with a more intuitive reading: perplexity is roughly "how many tokens the model was effectively choosing between at each step," as if it were guessing uniformly among that many options. A perplexity of 1 means the model predicted every token with complete certainty (the theoretical floor). A perplexity equal to the vocabulary size means the model is doing no better than guessing uniformly at random. Lower is always better, and perplexity is the number you'll see reported for essentially every language model, tiny or enormous.

## Computing perplexity correctly

```python
import torch
import math
import torch.nn.functional as F

model.eval()
total_loss, total_tokens = 0.0, 0

with torch.no_grad():
    for inputs, targets in val_loader:
        logits = model(inputs)
        loss = F.cross_entropy(
            logits.reshape(-1, logits.size(-1)),
            targets.reshape(-1),
            reduction="sum",
        )
        total_loss += loss.item()
        total_tokens += targets.numel()

perplexity = math.exp(total_loss / total_tokens)
```

Three details matter here. First, `model.eval()` disables dropout, so evaluation reflects the model's actual learned behavior rather than a randomly-thinned version of it. Second, `torch.no_grad()` tells autograd not to track operations — evaluation needs no gradients, and skipping that bookkeeping saves memory and time. Third, `reduction="sum"` (instead of the default `"mean"`) is deliberate: you need the *total* loss summed across every token and every batch, together with the *total* token count (`targets.numel()`), so that batches of different sizes are weighted correctly. Averaging per-batch means first and then averaging those averages would silently over- or under-weight batches with fewer tokens.

## What perplexity doesn't tell you

A low validation perplexity means the model assigns high probability to the real next tokens in held-out text — but that's a narrower claim than "the model generates good text." Two failure modes perplexity won't catch on its own:

- **Memorization that still generalizes narrowly.** A model can achieve a deceptively good perplexity on text that's very similar in style to training data while still producing dull, repetitive, or incoherent completions on genuinely new prompts.
- **Degenerate generation.** Perplexity is measured with **teacher forcing** — the real previous tokens are always fed in, one correct step at a time. During actual generation, the model feeds its *own* previous output back in, and small errors can compound: a model with a fine perplexity score can still fall into repetition loops or drift off-topic once it's generating freely rather than being graded one step at a time against ground truth.

## Qualitative evaluation: actually read the output

The complement to perplexity is simple but essential: generate samples (using the sampling strategies from Lesson 42) and read them.

- Is the text locally coherent — do sentences and phrases hang together grammatically?
- Does the model just repeat chunks of the training data verbatim, rather than producing anything new?
- Does generation degenerate into loops ("the the the the...") — a sign to try a higher temperature or top-k/top-p instead of greedy?

Neither perplexity nor qualitative reading alone is sufficient. Perplexity gives you a cheap, objective number to track across training runs and compare models; reading actual generations catches failure modes that a single scalar metric structurally cannot.

## Key terms

| Term | Meaning |
|---|---|
| Validation split | Held-out text never used in a training update, used to measure generalization |
| Perplexity | `exp(average cross-entropy loss per token)`; lower is better, 1 is the theoretical floor |
| Teacher forcing | Evaluating with the real previous tokens fed in, rather than the model's own generated output |
| `torch.no_grad()` | Context manager that disables gradient tracking, used during evaluation/inference |

## Recap

Evaluate on held-out data, in `eval()` mode, under `no_grad()`, summing loss and tokens correctly before exponentiating to get perplexity — a number that tells you how well the model predicted real next tokens, but not whether its free-running generations are actually good. Pair the metric with reading real samples. Next up, Lesson 44: the knobs you can turn to make this tiny GPT bigger, and what each one costs you.
