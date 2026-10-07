# Script — The Training Loop, From Scratch

## Segment 1 (title)

You now have tensors, autograd, and devices. This lesson assembles them into the pattern you'll type in every PyTorch project you ever write: the training loop. We'll build one from scratch, without nn.Module or torch.optim yet, so the raw mechanics make sense before anything wraps them.

## Segment 2 (code)

We're fitting a line, y equals w times x plus b, to noisy synthetic data from a known w and b, so we can check training actually recovers them. We know the true answer ahead of time, which makes it easy to confirm the loop is actually learning something real, instead of just running without errors. w and b start as random tensors with requires_grad turned on.

## Segment 3 (steps)

Every training loop repeats the same five steps. Forward pass: predict with the current parameters. Loss: reduce the error to one scalar. Zero the old gradients, then call backward to compute new ones. And finally, update each parameter a small step against its gradient.

## Segment 4 (code)

Here's all five steps together in the loop. Notice zero grad happens before backward, and the update happens after — that ordering is the one thing that never changes, whatever model you're training. Each pass through this loop is one iteration, and running it two hundred times is enough for this tiny problem to converge.

## Segment 5 (code)

The update line changes w using w dot grad, and it's wrapped in torch dot no_grad. Without that, autograd would try to track the update step itself, which is wasteful and conceptually wrong — we're not differentiating through the optimizer.

## Segment 6 (outro)

Watch the loss: it should shrink steadily, and w and b should land close to their true values. You just trained a model with nothing but tensors and autograd. Up next, lesson five: replacing this hand-rolled data with real Dataset and DataLoader objects.
