# Sampling Strategies: Greedy, Top-K, Top-P

A trained TinyGPT doesn't output words — at every step it outputs logits, one raw score per vocabulary token, describing how likely each one is to come next. Turning those logits into an actual chosen token id is a separate decision called a sampling strategy, and the choice matters enormously: the same trained model can sound robotic and repetitive or lively and varied depending only on how you sample from it. This lesson covers the four sampling strategies you'll actually use.

## What you'll learn

- Why generation needs a separate sampling step after the model produces logits
- Greedy decoding and why it's deterministic but often repetitive
- Temperature scaling, and why values below/above 1 sharpen or flatten the distribution
- Top-k and top-p (nucleus) sampling, and how each restricts the candidate pool before sampling
- The determinism/diversity trade-off across all four strategies

## From logits to a token: the basic shape

`model(inputs)` gives you logits of shape `(B, T, vocab_size)`. For generation you only care about the logits at the final position — `logits[:, -1, :]`, shape `(B, vocab_size)` — since that's the prediction for the next token after everything seen so far. Every sampling strategy below starts from that single row of vocabulary-sized scores.

## Greedy decoding

The simplest strategy: always take the single highest-scoring token.

```python
next_id = torch.argmax(logits[:, -1, :], dim=-1)
```

Greedy decoding is fully deterministic — same model, same prompt, same output, every time. That's useful for debugging and reproducibility, but it has a real weakness: it never considers a close second-best option, which tends to produce bland, repetitive text (a model that greedily picks "the" after "the" after "the" if that's locally the highest-scoring choice at every step).

## Temperature scaling

Before converting logits to probabilities, you can divide by a **temperature** `T`:

```python
probs = F.softmax(logits[:, -1, :] / temperature, dim=-1)
```

`temperature < 1` sharpens the distribution — it exaggerates the gap between high and low scores, pushing behavior closer to greedy. `temperature > 1` flattens it, giving lower-probability tokens a better chance and producing more varied (and more surprising, sometimes incoherent) output. `temperature = 1` leaves the distribution unchanged. Temperature alone doesn't restrict *which* tokens are candidates — every token in the vocabulary can still be picked, just with reshaped odds.

## Top-k sampling

Top-k narrows the candidate pool to the `k` highest-scoring tokens, renormalizes just those into a probability distribution, and samples from that smaller set:

```python
def top_k_sample(logits, k=20, temperature=1.0):
    logits = logits / temperature
    values, indices = torch.topk(logits, k)        # k highest scores + their token ids
    probs = F.softmax(values, dim=-1)               # renormalize over just those k
    choice = torch.multinomial(probs, num_samples=1)
    return indices.gather(-1, choice)
```

`torch.topk(logits, k)` returns the `k` largest values and their indices along the last dimension. `torch.multinomial(probs, num_samples=1)` draws one random index according to the probability weights in `probs` — this is the actual randomness in sampling, as opposed to argmax's deterministic pick. By cutting off the long tail of implausible tokens before sampling, top-k avoids the rare disaster of randomly landing on a token with near-zero probability, while still allowing variety among the tokens that are actually plausible.

## Top-p (nucleus) sampling

Top-k uses a fixed candidate count, but the "right" number of plausible tokens varies from step to step — sometimes only 2 tokens are remotely likely, sometimes 200 are. Top-p (nucleus sampling) instead keeps a *variable-size* set: sort probabilities descending, accumulate them, and keep only the smallest prefix whose cumulative probability exceeds `p`.

```python
def top_p_sample(logits, p=0.9, temperature=1.0):
    probs = F.softmax(logits / temperature, dim=-1)
    sorted_probs, sorted_idx = torch.sort(probs, descending=True, dim=-1)
    cumulative = torch.cumsum(sorted_probs, dim=-1)

    cutoff = cumulative > p
    cutoff[..., 1:] = cutoff[..., :-1].clone()   # keep the first token that crosses p
    cutoff[..., 0] = False
    sorted_probs[cutoff] = 0.0

    sorted_probs = sorted_probs / sorted_probs.sum(dim=-1, keepdim=True)
    choice = torch.multinomial(sorted_probs, num_samples=1)
    return sorted_idx.gather(-1, choice)
```

With `p=0.9`, if the model is very confident (one token has 95% probability), the nucleus is just that one token — nearly greedy. If the model is uncertain and probability is spread thin, the nucleus naturally grows to include more candidates. This adaptiveness is why top-p is the default sampling strategy in most modern text-generation libraries.

## The trade-off

| Strategy | Determinism | Diversity |
|---|---|---|
| Greedy | Fully deterministic | Lowest — often repetitive |
| Low temperature | Nearly deterministic | Low |
| High temperature | Random | High — can become incoherent |
| Top-k | Random within top k | Fixed-size variety |
| Top-p | Random within nucleus | Adaptive variety |

There's no universally "correct" choice — greedy is right when you want reproducible output (evaluation, debugging), while top-k/top-p with a moderate temperature is right when you want text that reads as more natural and less repetitive.

## Key terms

| Term | Meaning |
|---|---|
| Greedy decoding | Always pick `argmax` of the logits — deterministic, prone to repetition |
| Temperature | Scalar dividing logits before softmax; <1 sharpens, >1 flattens the distribution |
| Top-k sampling | Sample only from the k highest-probability tokens, renormalized |
| Top-p (nucleus) sampling | Sample from the smallest token set whose cumulative probability exceeds p |
| `torch.multinomial` | Draws random sample(s) according to a given probability-weight tensor |

## Recap

Logits aren't text — a sampling strategy decides how they become a token. Greedy is deterministic but repetitive; temperature reshapes confidence; top-k and top-p both restrict the candidate pool before a random draw, with top-p's nucleus adapting its size to how confident the model actually is at each step. Next up, Lesson 43: now that you can generate text, how do you measure whether the model is actually any good?
