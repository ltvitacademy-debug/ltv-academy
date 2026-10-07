# Script — Reading Loss Curves

## Segment 1 (title)

A loss curve is the single most information-dense plot you'll look at while training. Chapter 7 was about making a run fast; Chapter 8 is about making it correct, or noticing quickly when it isn't — starting with learning to actually read the shape of that curve.

## Segment 2 (code)

Before you can read a curve, you need to record one. Build the habit of tracking per-epoch averages for both training and validation loss, not just whatever the last batch happened to show.

## Segment 3 (steps)

If you log every batch instead of every epoch, the curve looks jagged even when training is going perfectly well — each batch is just a noisy sample of the true loss. What matters is the trend over many batches or epochs. A moving average can pull that trend out if the per-batch noise is distracting.

## Segment 4 (steps)

A healthy run has train and validation loss dropping together with a small, stable gap. A widening gap means overfitting. A plateau usually means the learning rate is too low or the model's out of capacity. A sudden spike often means one bad batch or a learning rate too aggressive for that step. Outright divergence, climbing toward infinity, usually means the learning rate is too high or gradients are exploding.

## Segment 5 (code)

Plotting is simple once you've logged the history — just put train and validation loss on the same axes, every time. Looking at only one of them is how overfitting goes unnoticed.

## Segment 6 (outro)

Next lesson digs into exactly what causes that divergence and plateau pattern in practice: vanishing and exploding gradients.
