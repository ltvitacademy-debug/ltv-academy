# Lesson 4 — Next-Token Prediction

**Chapter 1 · How LLMs Actually Work · Lesson 4 of 31**

## What you'll learn

- The single mechanical task every LLM is actually trained to do
- How a probability distribution becomes one chosen next token
- What "autoregressive" generation means, and why the model re-reads the whole sequence each step
- Why this one mechanism explains both an LLM's fluency and its limitations

## The entire job, in one sentence

Underneath every chat interface, every coding assistant, every AI-written email: an LLM's actual
job is to look at a sequence of tokens and output a **probability distribution over what token
comes next**. That's it. Everything that feels like reasoning, planning, or knowledge is this one
mechanism, run over and over, token by token.

Given "The capital of France is," the model doesn't "know" the answer the way a database does. It
computes a probability for every token in its vocabulary being the next one — and "Paris" comes
out with a very high probability, because of everything the attention and embedding layers
(Lessons 1 and 3) encoded about that context during training. Something like "banana" gets an
almost-zero probability, because nothing in the learned patterns supports it there.

## From probabilities to one token

The model doesn't just hand you a list of probabilities — something has to pick one actual token
to output. That's **sampling**, and there are a few common strategies:

- **Greedy** — always pick the single highest-probability token. Deterministic, but can produce
  repetitive or flat text.
- **Temperature-based sampling** — introduce controlled randomness, weighted by each token's
  probability, so high-probability tokens are still favored but not guaranteed (Chapter 3 covers
  the `temperature` parameter in depth).
- **Top-k / top-p (nucleus) sampling** — restrict the random choice to only the most likely
  handful of candidates, so the model never picks something wildly implausible.

## Autoregressive generation: one token, then repeat

Once a token is chosen, it gets appended to the sequence — and the entire process runs again from
scratch, with the model now predicting the token *after* that one. This loop is called
**autoregressive generation**: each new token depends on everything generated so far, including
the tokens the model itself just produced in this response.

This explains two things people notice constantly. First, why generation takes visibly longer for
longer responses — every single token requires a fresh pass over the whole sequence so far.
Second, why a model can occasionally "paint itself into a corner": once a token is generated, it's
permanent context for every token after it, so an early mistake can compound instead of getting
silently corrected later in the response.

## Key terms

| Term | Meaning |
|---|---|
| Probability distribution | The model's output: a likelihood for every possible next token |
| Sampling | The strategy used to pick one actual token from that distribution |
| Autoregressive | Each new token is generated based on all tokens that came before it, including ones just generated |
| Greedy decoding | Always choosing the single highest-probability token |

## Check yourself

Before Lesson 5, you're ready to move on when you can explain, without looking: why does an LLM
re-process the entire sequence so far for every single token it generates?
