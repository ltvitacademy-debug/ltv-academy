# Script — Gradient Accumulation

## Segment 1 (title)

Bigger batches generally give you smoother gradient estimates, but bigger batches also mean more activations in GPU memory at once, and eventually you run out. Gradient accumulation simulates a large batch on hardware that only fits a small one.

## Segment 2 (steps)

The idea: do a forward and backward pass on a small micro-batch, but don't step the optimizer yet. Because backward adds to existing gradients instead of replacing them, those gradients keep accumulating across several micro-batches. Only after N of them do you actually call optimizer.step and zero the gradients.

## Segment 3 (code)

So the loop looks almost identical to a normal one, except optimizer.step and zero_grad move inside an if that only fires every accum_steps iterations. Four micro-batches of size 16 end up behaving like one batch of 64, just spread across four forward and backward passes instead of one.

## Segment 4 (code)

Here's the detail that trips people up: backward accumulates sums, not averages. If you don't divide the loss by accum_steps before calling backward, the accumulated gradient ends up accum_steps times too large — which silently acts like multiplying your learning rate, with no error thrown anywhere.

## Segment 5 (steps)

One thing accumulation doesn't fix: batch normalization computes its statistics from whichever micro-batch is actually passing through at that instant. It doesn't retroactively pool those stats across the micro-batches the way a real large batch would. Usually close enough in practice, but worth knowing it's not exact.

## Segment 6 (outro)

Next up: spreading a model across more than one GPU, and why DistributedDataParallel has mostly replaced the older DataParallel.
