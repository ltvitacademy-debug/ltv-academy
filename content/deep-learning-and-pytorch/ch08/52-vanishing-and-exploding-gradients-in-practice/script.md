# Script — Vanishing & Exploding Gradients, in Practice

## Segment 1 (title)

You've seen vanishing gradients discussed conceptually back in Chapter 5, with RNNs and LSTMs. This lesson is about catching both vanishing and exploding gradients in a real PyTorch loop — inspecting actual gradient norms instead of only noticing after the loss curve has already gone wrong.

## Segment 2 (code)

After backward and before the optimizer step, every trainable parameter has a populated grad tensor. Computing the combined norm across the whole model gives you a direct numeric read: a healthy run keeps that number in a roughly stable range from step to step.

## Segment 3 (steps)

A gradient norm that's consistently tiny across many layers is vanishing gradients — quiet, loss just won't move, nothing crashes. A norm that's enormous or growing without bound is exploding gradients — loud, usually a loss spike or an outright nan.

## Segment 4 (code)

clip_grad_norm_ rescales a model's gradients in place so their combined norm never exceeds max_norm, which stops one unusually large batch from taking a destructive step. It's the standard first response to exploding gradients, and it returns the pre-clipping norm, which is worth logging on its own.

## Segment 5 (code)

For vanishing gradients specifically, checking the norm layer by layer rather than as one combined number usually makes the problem obvious — in a deep network, early layers can show gradients orders of magnitude smaller than later layers, because each backward step through another layer can shrink that signal further.

## Segment 6 (outro)

Next lesson: silent bugs in training code — the ones that don't crash, they just quietly make your training run wrong.
