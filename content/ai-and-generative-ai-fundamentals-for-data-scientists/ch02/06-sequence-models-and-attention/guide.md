# Sequence Models & Attention

Most of the models you have built so far treat each row as an independent bag of features. Language does not work that way: "the dog bit the man" and "the man bit the dog" contain the same words, and order changes the meaning. This lesson explains how neural networks came to handle sequences, why the first approach (recurrent networks) hit a wall, and how **attention** solved it. Attention is the idea the whole large-language-model era is built on. We use small numpy demos, all of which we ran, so you can see the mechanism rather than take it on trust.

## What you'll learn

- What a sequence model must do that an ordinary MLP cannot
- How a recurrent network (RNN) carries a hidden state from token to token
- Why long-range information fades in an RNN, with a measurement
- What attention is: a learned, weighted average over every position at once

## Sequences need memory

An MLP takes a fixed-size input. Text has variable length and meaningful order. The classic answer is the **recurrent neural network**: read one token at a time and keep a **hidden state** vector that summarizes everything read so far. At each step the network combines the previous hidden state with the new token and squashes the result:

`h_t = tanh(W h_{t-1} + U x_t)`

The same weights `W` and `U` are reused at every step. That is elegant, but it has two problems: tokens must be processed one after another (slow, hard to parallelize on a GPU), and information from early tokens must survive many repeated transformations.

## Measuring the fading memory

Here is a tiny RNN in numpy with random weights (illustrative; we scale the recurrent matrix so its largest eigenvalue has magnitude 0.9). We change only the first token of a sequence by a small amount and measure how much the final hidden state moves.

```python
import numpy as np

rng = np.random.default_rng(0)
d = 8
W = rng.normal(size=(d, d))
W *= 0.9 / max(abs(np.linalg.eigvals(W)))
U = rng.normal(size=(d, 3)) * 0.5

def run(xs):
    h = np.zeros(d)
    for x in xs:
        h = np.tanh(W @ h + U @ x)
    return h

for T in (2, 5, 10, 20, 40):
    effects = []
    for _ in range(50):
        xs = rng.normal(size=(T, 3))
        xs2 = xs.copy()
        xs2[0] += 0.1              # nudge only the first token
        effects.append(np.linalg.norm(run(xs) - run(xs2)))
    print(f"T={T:2d}  effect: {np.mean(effects):.2e}")
```

Our output: `1.04e-01` at length 2, `1.44e-02` at 5, `3.91e-04` at 10, `1.10e-06` at 20, and `4.46e-12` at 40. The influence of the first token shrinks by roughly ten orders of magnitude. This is the **vanishing gradient** problem seen from the forward direction: the same shrinkage that erases the signal also starves the training gradient, so the network cannot learn dependencies between distant words. Gated variants such as the **LSTM** (1997) and GRU improved this a great deal, but the path from an early token to a late one is still as long as the sequence, and the processing is still sequential.

## Attention: look at everything directly

**Attention** removes the long path. Instead of squeezing the past into one state, each position computes a score against every other position, turns the scores into weights with a softmax, and takes a weighted average of their **value** vectors. The idea appeared in 2014 for machine translation (Bahdanau, Cho and Bengio) as an add-on to RNNs; in 2017 the paper "Attention Is All You Need" dropped the RNN entirely.

A hand-built example. The vectors below are hand-picked for illustration, not learned. The word "it" asks a question (the query); each word offers a key; the dot product scores the match:

```python
tokens = ["animal", "street", "tired", "it"]
keys = np.array([[1.0, 0.2, 0.0], [0.0, 1.0, 0.1],
                 [0.3, 0.0, 1.0], [0.2, 0.1, 0.2]])
values = keys.copy()
query = np.array([2.0, 0.0, 1.0])

scores = keys @ query
weights = np.exp(scores) / np.exp(scores).sum()   # softmax
context = weights @ values
```

The weights come out as animal 0.484, street 0.072, tired 0.324, and it 0.119 (they sum to 1), and the context vector for "it" is `[0.605 0.181 0.355]`. So "it" pulls most of its meaning from "animal", in **one step**, no matter how far away that word is. In a real model the query, key, and value vectors are produced from the token embeddings by learned weight matrices, which is the subject of the next lesson.

The chart below plots both results from the code above.

## Why this mattered

- **Direct paths**: any token can read any other in one step, so distance no longer erodes information.
- **Parallelism**: all positions are scored at once as matrix multiplications, which GPUs are built for.
- **Cost**: attention compares every pair of tokens, so compute grows with the square of the sequence length. That is one reason context windows are limited.

## Recap

- RNNs read a sequence step by step through a hidden state, and early information fades.
- Attention computes softmax-weighted averages over all positions, so every token can look at every other directly.
- Next lesson: how attention is combined with feed-forward layers, positional information, and multiple heads to form the Transformer.
