# Script — Sequence Data & RNNs

## Segment 1 (title)

Everything you've built so far assumes a fixed-size input where order inside an example doesn't fundamentally matter. Sequence data breaks that: in a sentence or a time series, order is the information, and length varies example to example. This lesson introduces the recurrent neural network, the first architecture built specifically to handle that.

## Segment 2 (steps)

Sequence data needs variable length, it needs order to carry meaning, and it needs memory — a running summary of everything seen so far. That running summary is called a hidden state, and it's what a recurrent layer maintains as it processes one timestep at a time.

## Segment 3 (code)

A vanilla RNN computes a new hidden state at each timestep from the current input and the previous hidden state, using the same weights every time. That's the trick that lets one small set of parameters handle a sequence of any length.

## Segment 4 (code)

In PyTorch, nn.RNN takes an input shaped batch, sequence length, input size, and returns two things: output, the hidden state at every single timestep, and h_n, just the hidden state at the final timestep. You'll reach for output when you need a prediction per position, and h_n when you just need one summary of the whole sequence.

## Segment 5 (steps)

Here's the catch: computing hidden state t requires hidden state t minus one to already exist. That's a hard, step-by-step dependency chain, which means an RNN can't spread the sequence dimension across parallel GPU compute. That exact limitation is what the rest of this chapter — attention — was built to escape.

## Segment 6 (outro)

Next up: LSTMs, and the vanishing gradient problem that plain RNNs run into over long sequences.
