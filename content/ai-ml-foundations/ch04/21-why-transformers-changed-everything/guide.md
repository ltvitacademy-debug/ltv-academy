# Lesson 21 — Why Transformers Changed Everything

**Chapter 4 · Deep Learning Foundations · Lesson 21 of 30**

## What you'll learn

- What self-attention actually computes, worked by hand on three toy word vectors
- Why "every token looks at every other token" solves the RNN's bottleneck from lesson 20
- What parallelization buys you, and why it mattered as much as the mechanism itself
- The one new idea transformers had to add back in, since attention alone forgets order
- Why this one architecture underlies virtually every modern LLM, which the rest of this path builds on

## Self-attention, computed by hand

Lesson 20 left off with a one-sentence claim: every token looks directly at every other
token. Here's what "looks at" means mathematically, on three toy word embeddings (tiny,
illustrative, 3 numbers each instead of a real model's hundreds):

```python
import numpy as np

tokens = {
    "The": np.array([1.0, 0.0, 1.0]),
    "cat": np.array([0.0, 1.0, 1.0]),
    "sat": np.array([1.0, 1.0, 0.0]),
}

q = tokens["sat"]   # the query: "sat" is asking, "what matters to me?"
scores = {k: float(np.dot(q, v)) for k, v in tokens.items()}
# {'The': 1.0, 'cat': 1.0, 'sat': 2.0}
```

The **score** between "sat" and every token (itself included) is a dot product — a measure
of how aligned two vectors are. "sat" scores highest against itself (`2.0`), and equally
against "The" and "cat" (`1.0` each) in this toy example. Turn those raw scores into
weights that sum to 1 with softmax:

```python
vals = np.array([1.0, 1.0, 2.0])
exps = np.exp(vals - vals.max())
weights = exps / exps.sum()
# The: 0.2119   cat: 0.2119   sat: 0.5761
```

"sat" ends up attending mostly to itself (`0.5761`) but still pulls in `21%` of its
representation from "The" and `21%` from "cat". In a real model, every token runs this
same calculation against every other token, producing a brand-new, context-aware
representation for each one — and crucially, every token's calculation is **independent**
of every other token's, which is the detail that changes everything operationally.

## The payoff: no bottleneck, and parallel

Lesson 20's RNN had to read a sequence step by step, each step waiting on the last, with
distant information fading as it got compressed through a single carried hidden state.
Self-attention has neither problem. Every token's score is a direct dot product against
every other token — no relay through intermediate steps — so a relationship between word 1
and word 500 is exactly as direct as one between word 1 and word 2. And because each
token's attention calculation doesn't depend on another token's calculation finishing
first, every one of them can be computed **at the same time**, on a GPU built for exactly
that kind of parallel arithmetic. That parallelism is not a minor implementation detail —
it's what made training on vastly larger datasets with vastly larger models computationally
feasible in the first place, which is a direct cause of how fast this entire field moved
once transformers arrived.

## What attention gives up, and has to add back

Dot products between vectors don't care about order: swap two tokens' positions and the
attention scores between them are unchanged unless something else encodes where they sat.
Transformers add that back explicitly with **positional encoding** — a pattern added to
each token's vector that marks its position in the sequence, so "the dog bit the man" and
"the man bit the dog" don't attend identically. This is the one piece of bookkeeping
self-attention needs that recurrence got automatically, just by processing tokens in order.

## Why this is the architecture the rest of this path builds on

Every large language model this course's path covers next — in Generative AI & LLMs, the
very next course — is built from stacks of self-attention layers like the one above, scaled
up: thousands of dimensions per token instead of 3, dozens of attention layers instead of
one, and billions of learned parameters instead of a handful. The mechanism doesn't change
between a toy example and GPT-scale models. Only the scale does.

## Recap

Self-attention computes a dot-product score between every pair of tokens, turns those
scores into weights with softmax, and blends each token's representation from all the
others, weighted by relevance. That removes the RNN's bottleneck (every relationship is
direct, however far apart) and, just as importantly, makes every token's calculation
independent enough to run in parallel on a GPU, which is what made today's model scale
possible. Positional encoding adds order back in, since dot products alone don't see it.
Chapter 4 closes here; Chapter 5 starts using real, already-trained models built on exactly
this architecture, instead of building the architecture from scratch.
