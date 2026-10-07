# Script — LSTMs & the Vanishing Gradient Problem

## Segment 1 (title)

The plain RNN from the last lesson has a serious practical problem: it forgets. Train one on long sequences and the gradient signal that's supposed to teach it that something eighty timesteps ago mattered shrinks to nearly nothing by the time it gets back there. This lesson explains why, and how the LSTM fixes it.

## Segment 2 (code)

Training a recurrent network means backpropagating through time. Each backward step multiplies by a tanh or sigmoid derivative, and those are almost always less than one. Multiply fifty numbers under one together and the product collapses toward zero — early timesteps stop getting any real learning signal.

## Segment 3 (code)

The LSTM's fix is to carry long-term memory in a separate cell state, updated additively instead of through a long chain of multiplications. Three gates — forget, input, and output — decide how much old state to keep, how much new information to add, and how much to expose. Because it's a sum, a gradient can flow back through many timesteps without being forced to shrink exponentially.

## Segment 4 (code)

In PyTorch, nn.LSTM looks almost identical to nn.RNN to call, except it carries two states instead of one: the hidden state it exposes, and the cell state, its long-term memory. Both default to zero if you don't pass them in.

## Segment 5 (steps)

Hold onto those three gates: forget decides what survives, input decides what gets added, and output decides what gets exposed as the hidden state. That's the whole mechanism.

## Segment 6 (outro)

Next up: the attention mechanism — a completely different way to let a model reach back across a sequence, which this chapter builds toward for the rest of its lessons.
