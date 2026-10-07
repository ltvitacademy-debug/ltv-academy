# Script — Residual Connections & Layer-Norm Placement

## Segment 1 (title)

Two small design decisions quietly decide whether a deep transformer trains at all: where you put the plus signs, and where you put layer norm relative to them. This lesson settles both, landing on the ordering Lesson 40's model actually uses.

## Segment 2 (code)

A residual add, x equals x plus sublayer of x, looks almost too simple to matter, but that plus sign gives the gradient a direct, unobstructed path backward through every block. Stack enough layers without it and gradients have to pass through dozens of nonlinear transforms in a row, shrinking along the way. It's the same motivation as the LSTM's additive cell-state path from Lesson 30.

## Segment 3 (code)

Layer norm normalizes each token independently, across its own d model features — not across the batch, not across the sequence. Mean and variance are computed per token, then the result is rescaled by a learned weight and bias, keeping activations in a stable range as they move through a deep stack.

## Segment 4 (steps)

There are two competing placements. Post-norm, from the original twenty seventeen paper, normalizes after the residual add. Pre-norm, the modern default used by GPT-2 and onward, normalizes before the sublayer runs, inside the branch being added. This course's transformer block and tiny GPT both use pre-norm.

## Segment 5 (steps)

The difference isn't cosmetic. In post-norm, the identity path gets rescaled at every single block, so it's never actually clean. In pre-norm, the x on the residual side is never touched by normalization at all. That keeps gradients dramatically more stable for deep stacks, at the cost of occasionally slightly weaker results at small scale.

## Segment 6 (outro)

Up next, Lesson 40: assembling every piece built so far into a complete decoder-only transformer.
