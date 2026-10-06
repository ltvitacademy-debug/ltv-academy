# Lesson 1 — The Transformer Architecture, Conceptually

**Chapter 1 · How LLMs Actually Work · Lesson 1 of 31**

## What you'll learn

- The four-stage pipeline every transformer-based LLM runs: tokens, embeddings, attention, prediction
- What "self-attention" actually computes, in plain terms
- Why transformers replaced the older recurrent (RNN) approach to language models
- Why this matters before anything else in the course: every later lesson assumes this mental model

## The architecture that started it all

Every major LLM in production today — GPT, Claude, Gemini, Llama, Grok — is built on the
**transformer** architecture, introduced by Google researchers in the 2017 paper "Attention Is
All You Need." You don't need the math to use these models well, but you do need the shape of
what's happening, because it explains behavior you'll see constantly: why longer context costs
more, why models sometimes lose track of something said many messages ago, and why two models
can give wildly different answers to the same prompt.

At a high level, text moves through four stages on its way to a response:

1. **Tokenize** — break the input text into tokens (Lesson 2 covers this in depth)
2. **Embed** — convert each token into a vector of numbers that encodes meaning (Lesson 3)
3. **Attend** — let every token look at every other token and weigh which ones matter to it
4. **Predict** — turn the result into a probability distribution over what token comes next (Lesson 4)

## Self-attention: the mechanism that makes transformers work

Step 3 is the actual innovation. For each token, the model computes a **query** (what am I
looking for?), and every token — including itself — offers a **key** (what do I represent?) and
a **value** (what information do I carry?). The query is compared against every key to produce
an attention weight: how relevant is that token to this one, right now?

Take the sentence "The cat sat because it was tired." To understand what "it" refers to, the
model needs "it" to attend strongly to "cat" — not to "sat" or "the." Self-attention gives every
token a direct, weighted connection to every other token in the sequence, so that link can form
no matter how far apart the two words are. The model then blends the **value** vectors according
to those weights, producing a new, context-aware representation of "it" that effectively means
"it (the cat)."

This computation happens for every token, against every other token, simultaneously — which is
exactly why transformers are fast to train at scale and why "attention" is the right name: it's
a learned, per-token spotlight over the rest of the sequence.

## Why this replaced RNNs

Older language models (recurrent neural networks, or RNNs) processed text one word at a time, in
order, carrying a single running summary forward. That made them slow to train (no
parallelization) and bad at long-range connections (the summary degrades the further back you
go). Transformers process an entire sequence at once and let any token connect directly to any
other token, regardless of distance. That parallelism is also why GPUs — built for doing many
small computations at once — are exactly the right hardware for this architecture.

## Key terms

| Term | Meaning |
|---|---|
| Transformer | The architecture (2017) underlying essentially all modern LLMs |
| Self-attention | Each token computes a weighted relevance score against every other token |
| Query / Key / Value | The three vectors attention compares and blends per token |
| Parallelization | Processing all tokens at once, instead of one at a time like an RNN |

## Check yourself

Before Lesson 2, you're ready to move on when you can explain, without looking: what problem does
self-attention solve that a word-by-word RNN struggles with, and why?
