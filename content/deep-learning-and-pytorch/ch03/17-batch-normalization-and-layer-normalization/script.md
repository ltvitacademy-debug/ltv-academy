# Script — Batch Normalization & Layer Normalization

## Segment 1 (title)

Deep networks can be surprisingly hard to train just because activation distributions drift from layer to layer and batch to batch. Normalization layers exist to tame that drift, and you'll meet two constantly: batch norm, the default in convolutional networks, and layer norm, the default in transformers.

## Segment 2 (code)

Batch norm computes its mean and standard deviation across the batch dimension, separately for each channel, then applies a learned scale and shift. During training it uses the current batch's statistics and also updates a running estimate; at eval time it switches to that stored running estimate instead.

## Segment 3 (code)

Layer norm normalizes across the feature dimension of a single sample instead of across the batch, which makes it completely insensitive to batch size. That's exactly why it's the default in transformers, where batch composition can vary a lot from step to step.

## Segment 4 (steps)

As a rule of thumb: batch norm for convolutional vision networks with a reasonably large batch size, layer norm for sequence models and transformers or anywhere your batch size is small or variable. Neither is a strict replacement for the other — they normalize over different axes for different reasons.

## Segment 5 (outro)

Both layers depend on train versus eval mode, same as dropout did last lesson. Up next, lesson eighteen: learning rate schedules — changing the learning rate on purpose as training progresses.
