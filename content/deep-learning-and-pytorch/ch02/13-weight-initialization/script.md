# Script — Weight Initialization

## Segment 1 (title)

Every linear layer you've created started with random weights, and you probably didn't think about where those numbers came from. The specific distribution matters a lot — a badly initialized deep network can fail to train before a single gradient update even happens.

## Segment 2 (code)

You don't have to initialize anything yourself — nn.Linear already fills its weight with small random values using a Kaiming-derived scheme scaled by the layer's input size. That default is why you've been able to ignore this topic until now.

## Segment 3 (steps)

If weights start too large, activations and their gradients explode across layers. Too small, and they vanish toward zero instead — a problem you'll study properly in chapter three. This happens before a single training step runs, purely from the starting values themselves. Good initialization is designed to keep activation variance roughly stable across every layer from the start.

## Segment 4 (code)

Xavier initialization is derived assuming Sigmoid or Tanh activations. Kaiming initialization is derived specifically for ReLU, which zeros out roughly half its inputs — Kaiming's math accounts for that, Xavier's doesn't. Since ReLU is the default activation for most networks, Kaiming is the more common explicit choice. Picking the wrong one isn't usually catastrophic, just a slower, noisier path to the same destination.

## Segment 5 (code)

Rather than initializing layer by layer, write a function and call model dot apply — it recursively visits every submodule, the same tree walk that powers dot parameters, and the isinstance check skips layers like ReLU that have no weight to initialize.

## Segment 6 (outro)

PyTorch's default works fine most of the time, but knowing when to reach for kaiming_uniform_ with ReLU networks matters as your architectures get deeper. Up next, lesson fourteen, the final lesson of this chapter: writing your own custom layers and modules.
