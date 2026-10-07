# Sequence Data & RNNs

Everything you've built so far — MLPs, CNNs — assumes a fixed-size input where order inside each example doesn't fundamentally matter (shuffle the pixels in a weird way and a plain MLP doesn't care that you did). Sequence data breaks that assumption: in a sentence, a stock price history, or an audio waveform, the order *is* the information, and the length varies from example to example. This lesson introduces the recurrent neural network (RNN), the first architecture built specifically to handle that.

## What you'll learn

- Why sequence data needs a different kind of layer than `nn.Linear` or `nn.Conv2d`
- The recurrence relation that defines an RNN, and what a "hidden state" actually is
- `nn.RNN`'s real constructor and forward signature, including exact tensor shapes
- Why processing a sequence with an RNN is inherently a step-by-step, sequential operation

## What makes sequence data different

A sentence doesn't have a fixed length, and the meaning of a word depends on what came before it. A time series is the same: today's value is best understood in the context of yesterday's. You need a layer that can (a) accept variable-length input and (b) carry information forward from earlier steps to later ones. That's what a recurrent layer does: it processes one timestep at a time and maintains a **hidden state** — a running summary of everything it has seen so far in that sequence.

## The recurrence relation

At each timestep `t`, a simple (vanilla) RNN computes a new hidden state from the current input and the previous hidden state:

```python
# h_t = tanh(W_ih @ x_t + b_ih + W_hh @ h_{t-1} + b_hh)
# x_t:    input at timestep t
# h_{t-1}: hidden state carried from the previous timestep
# h_t:    new hidden state, becomes the input to timestep t+1
```

The same weights (`W_ih`, `W_hh`) are reused at every timestep — this is what lets an RNN handle sequences of any length with a fixed number of parameters. The hidden state is the only channel carrying information from early timesteps to late ones, which turns out to be both the RNN's defining trick and its biggest weakness (more on that in the next lesson).

## `nn.RNN` in PyTorch

```python
import torch
import torch.nn as nn

rnn = nn.RNN(input_size=10, hidden_size=20, num_layers=1, batch_first=True)

x = torch.randn(4, 7, 10)       # (batch=4, seq_len=7, input_size=10)
h0 = torch.zeros(1, 4, 20)      # (num_layers=1, batch=4, hidden_size=20)

output, h_n = rnn(x, h0)
# output: (4, 7, 20)  -- hidden state at EVERY timestep
# h_n:    (1, 4, 20)  -- hidden state at the FINAL timestep only
```

With `batch_first=True`, `x` is shaped `(batch, seq_len, input_size)`. `output` gives you the hidden state produced at every position — useful when you need a prediction per timestep (e.g. tagging each word). `h_n` is just the last slice of `output` along the sequence dimension, repeated per layer — useful when you only need a single summary of the whole sequence (e.g. classifying an entire sentence). If you don't pass `h0`, PyTorch initializes it to zeros for you.

## Why this is sequential, not parallel

Computing `h_t` requires `h_{t-1}` to already exist. There's no way to compute hidden state 50 before hidden state 49 is done — the recurrence is a hard, step-by-step dependency chain. On a GPU, that means an RNN can't spread the *sequence* dimension across parallel compute the way a CNN or a fully-connected layer can; it's one of the central limitations that attention-based architectures (the rest of this chapter) were designed to escape.

## Key terms

| Term | Meaning |
|---|---|
| Hidden state (`h_t`) | The running summary an RNN carries forward from one timestep to the next |
| Recurrence relation | The formula computing `h_t` from `x_t` and `h_{t-1}` using shared weights |
| `batch_first=True` | Shapes tensors as `(batch, seq_len, features)` instead of PyTorch's default `(seq_len, batch, features)` |
| Sequential dependency | The requirement that timestep `t` can't be computed until timestep `t-1` finishes |
