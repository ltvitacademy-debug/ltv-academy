# Script — Silent Bugs in Training Code

## Segment 1 (title)

You saw PyTorch's basic debugging tools back in Chapter 1 — things that throw errors. These bugs are worse: they don't crash anything. The loss goes down, everything looks fine, and the model is quietly learning the wrong thing.

## Segment 2 (code)

First: loss is a tensor attached to the whole computation graph for that step. Accumulate it directly into a running total instead of calling item on it, and you keep that entire graph alive for every batch, all epoch. Nothing crashes — you just slowly run out of memory.

## Segment 3 (code)

Second: dropout and batch norm behave differently in training versus evaluation mode. Validate without calling model.eval first, and your validation loss is computed with training-mode behavior still active — no crash, just a number that doesn't mean what you think it means.

## Segment 4 (code)

Third, and maybe the most common: backward adds to each parameter's existing gradient, it doesn't replace it. Skip zero_grad, and every step's gradient becomes a sum of that step plus every previous one that never got cleared. The optimizer takes increasingly wrong steps with no error anywhere.

## Segment 5 (steps)

A fourth one, more about waste than wrongness: running inference without torch.no_grad still builds a full autograd graph even with eval mode set correctly. So the five-second checklist before trusting any run: item on the loss, eval paired with train, zero_grad every step, no_grad around inference.

## Segment 6 (outro)

Next lesson: experiment tracking tools, so you're not relying on memory and terminal scrollback to compare what actually happened across different runs.
