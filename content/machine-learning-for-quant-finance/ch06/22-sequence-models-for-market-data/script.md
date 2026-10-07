# Script — Sequence Models for Market Data

## Segment 1 (title)

Every model so far has treated each row of data as an independent example. Sequence models drop that assumption: they look at an ordered window of history and learn how the sequence itself, not just the latest snapshot, predicts what comes next.

## Segment 2 (steps)

A recurrent neural network processes a sequence step by step, carrying forward a hidden state meant to summarize everything seen so far. Plain versions struggle to carry information across long sequences, so LSTMs and GRUs add gating mechanisms that let the network learn what to keep or forget at each step. Transformers take a different approach entirely, using attention to let the model directly weigh how relevant every other position in the sequence is, without processing it strictly step by step, which is a big part of why they've displaced recurrent networks as the default in most domains.

## Segment 3 (code)

A simple version in Keras takes a window of, say, twenty trading days across a dozen features as one training example, feeds it through an LSTM layer, and predicts something like next-period return from the result. The key shift is that the model sees the whole window as a sequence, not just the most recent row.

## Segment 4 (steps)

Here's the catch. Chapter four built an entire validation framework around overlapping outcomes and leakage between training and test data. Sequence models make that worse in a specific way: a training example is a window, not a single row, so if you step a twenty-day window forward one day at a time, consecutive examples overlap by nineteen out of twenty days. That's the same overlapping-labels problem from chapter one, now baked into how the sequences themselves are built, combined with a lot more model parameters and finance's usual low signal-to-noise ratio, which raises real risk of memorizing noise instead of learning genuine temporal structure.

## Segment 5 (outro)

Given that risk, sequence models earn their place mainly in short-horizon microstructure, like order-book dynamics, or in high-frequency settings with enough data to support a large model. Up next, lesson twenty-three: NLP for financial text and news, where the sequence is language instead of price history.
