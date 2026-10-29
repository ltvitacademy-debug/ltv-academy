# Lesson 13 — Model Extraction: Stealing a Model Through Its API

**Chapter 4 · Model Extraction and Inversion Attacks · Lesson 1 of 4**

## What you'll learn

- What a model extraction attack actually is, and why "just an API"
  is enough to carry one out
- Why confidence scores and logits leak far more than a bare
  predicted label does
- Why model extraction is a business risk, not just a theoretical
  curiosity — the IP, pricing model, and competitive advantage behind
  a deployed model are what's actually being stolen
- How extraction connects forward to adversarial examples, which
  you'll cover in Chapter 5

## The extraction pattern

A model extraction (or "model stealing") attack doesn't touch your
training pipeline, your weights file, or your infrastructure. It
targets the one thing every hosted model has to expose to be useful
at all: its **prediction API**. The attacker sends a large number of
inputs, records whatever the API returns for each one, and uses those
input/output pairs as a labeled training set to train their own
**substitute model** — a separate model trained purely to mimic the
original's behavior, without ever seeing a single line of its code or
a single training example it was built on.

This isn't a hypothetical. Tramèr et al.'s 2016 paper "Stealing
Machine Learning Models via Prediction APIs" showed that several
production-style ML-as-a-service classifiers — including models
served by real commercial platforms at the time — could be
reconstructed to near-exact fidelity with a surprisingly small number
of queries, in some cases low thousands, sometimes even recovering the
victim model's exact parameters when the model type was simple enough
(for example logistic regression, where the decision boundary can be
solved for directly once you have enough input/output pairs).

## Why confidence scores leak more than labels

The single biggest factor in how fast a model can be extracted is
**how much information the API returns per query**. A hard label
("this is a cat") gives an attacker one bit of signal about where the
decision boundary sits. A full confidence vector or raw logit score
("cat: 0.87, dog: 0.11, other: 0.02") hands over the model's *distance*
from that boundary — which is exactly the gradient-like signal a
substitute model needs to converge quickly. Two API responses can
answer the same business question and still carry wildly different
extraction risk:

```
"high-risk":  {"label": "fraud", "confidence_vector": [0.03, 0.09, 0.88]}
"hardened":   {"label": "fraud"}
```

The first response is a gift to an attacker training a surrogate — it
turns every query into a precise probe of the decision surface. The
second gives a caller the answer they actually need for almost any
legitimate use case, and nothing more.

## Why this is a real business risk

It's tempting to file model extraction under "someone copied my
homework," but the actual damage is concrete:

- **Stolen intellectual property.** A model that took months of
  curated data, feature engineering, and compute to train can be
  approximated by an attacker in days, at a fraction of the cost —
  wiping out the R&D investment it represents.
- **A broken business model.** Many ML products are priced *per
  query* precisely because the model itself is the product. A
  working substitute model means an attacker — or a competitor —
  never has to pay for another query again.
- **A stepping stone to further attacks.** Chapter 5 covers
  adversarial examples in depth, but the short version matters here:
  once an attacker has a substitute model that mimics your decision
  boundary, they can craft adversarial inputs against *their own copy*
  offline, with no rate limits and no logging, and those inputs
  frequently **transfer** back to the real model.
- **Erosion of competitive advantage.** If the model's behavior is
  the differentiator in your product, extraction hands a competitor
  that differentiator without the years of iteration that produced it.

None of this requires a sophisticated attacker. It requires an API
that answers too precisely, too many times, without anyone watching
how it's being used — which is exactly the gap Lesson 15 closes.

## Key terms

| Term | Meaning |
|---|---|
| Model extraction | Reconstructing an approximation of a deployed model purely from its input/output behavior through a public API |
| Substitute (surrogate) model | A model an attacker trains on collected input/output pairs to mimic a victim model's decision boundary |
| Confidence vector / logits | Per-class probability or raw score output; leaks far more about the decision boundary than a single predicted label |
| Query complexity | The number of queries an attack needs to reach a given extraction fidelity — the metric defenses in Lesson 15 are designed to raise |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does returning a full confidence vector make extraction meaningfully
easier than returning only the top predicted label, and what does
that have to do with how fast a substitute model converges?
