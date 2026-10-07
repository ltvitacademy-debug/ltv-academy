# LSTMs & the Vanishing Gradient Problem

The plain RNN from the last lesson has a serious practical problem: it forgets. Train one on long sequences and the gradient signal that's supposed to teach it "something 80 timesteps ago mattered" shrinks to nearly nothing by the time it gets back there. This lesson explains why that happens and how the LSTM (Long Short-Term Memory) architecture fixes it with one simple structural change: an additive path for the cell state.

## What you'll learn

- Why backpropagation through a long RNN causes gradients to vanish
- The LSTM's three gates and the cell state they control
- `nn.LSTM`'s real constructor and forward signature, including shapes
- Why an *additive* update is the key fix, not just "more parameters"

## Why gradients vanish in a plain RNN

Training a recurrent network means backpropagating through time: to update the weights based on an error at timestep 50, you have to compute how that error flows backward through timesteps 49, 48, 47... all the way back. Each one of those backward steps involves multiplying by a derivative that comes from a `tanh` (or sigmoid) activation — and those derivatives are almost always less than 1. Multiply 50 numbers that are each less than 1 together, and the product shrinks toward zero fast. The result: gradients from early timesteps become vanishingly small, so the network effectively never learns to use information from far in the past. (The same chain of small multiplications can occasionally blow up instead of vanish — that's the related "exploding gradient" problem, usually handled with gradient clipping, covered later in this course.)

## How the LSTM fixes it: an additive cell state

The LSTM's key idea is to carry long-term memory in a separate **cell state** `c_t`, updated *additively* rather than through a repeated chain of multiplications by small numbers:

```python
# forget gate:  f_t = sigmoid(...)   -- how much of c_{t-1} to keep
# input gate:   i_t = sigmoid(...)   -- how much of the new info to add
# output gate:  o_t = sigmoid(...)   -- how much of c_t to expose as h_t
# candidate:    g_t = tanh(...)      -- the new information itself
#
# c_t = f_t * c_{t-1} + i_t * g_t    -- ADDITIVE update
# h_t = o_t * tanh(c_t)
```

Because `c_t` is built from a sum (not a long product of small derivatives), a gradient can flow straight back through many timesteps along that `+` without being forced to shrink exponentially — as long as the forget gate `f_t` stays close to 1 for the timesteps that matter. The three gates (forget, input, output) are what let the network *learn* which information to keep, which to add, and which to expose, rather than having that behavior hard-coded.

## `nn.LSTM` in PyTorch

```python
import torch
import torch.nn as nn

lstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=1, batch_first=True)

x = torch.randn(4, 7, 10)        # (batch, seq_len, input_size)
h0 = torch.zeros(1, 4, 20)       # (num_layers, batch, hidden_size)
c0 = torch.zeros(1, 4, 20)       # (num_layers, batch, hidden_size)

output, (h_n, c_n) = lstm(x, (h0, c0))
# output: (4, 7, 20) -- hidden state at every timestep
# h_n:    (1, 4, 20) -- final hidden state
# c_n:    (1, 4, 20) -- final cell state
```

Notice the LSTM carries *two* states instead of one — the hidden state `h_t` (what it exposes) and the cell state `c_t` (its long-term memory). If you omit `(h0, c0)`, PyTorch initializes both to zeros. Everything else about calling it looks just like `nn.RNN` from the previous lesson.

## Key terms

| Term | Meaning |
|---|---|
| Vanishing gradient | Gradients shrinking toward zero as they backpropagate through many timesteps of small-derivative multiplications |
| Cell state (`c_t`) | The LSTM's long-term memory, updated additively rather than through repeated multiplication |
| Forget / input / output gates | Learned sigmoid gates controlling what the cell state keeps, adds, and exposes |
| Exploding gradient | The opposite failure mode — gradients growing instead of shrinking — usually handled with gradient clipping |
