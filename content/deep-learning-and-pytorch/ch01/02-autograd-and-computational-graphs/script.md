# Script — Autograd & Computational Graphs

## Segment 1 (title)

Every network learns by computing a gradient for every weight, sometimes millions of them, and nudging each one to reduce the error. Doing that by hand is impossible. PyTorch's autograd engine does it automatically, and that's what this lesson covers.

## Segment 2 (code)

Setting requires_grad to true turns on tracking. Every tensor derived from a tracked tensor gets a grad underscore fn, a record of the operation that produced it. That chain of records is the computational graph, built dynamically as your code runs. Only leaf tensors you explicitly flag this way start the chain — everything downstream inherits it automatically.

## Segment 3 (code)

Calling backward walks that graph backward from the tensor you call it on, applying the chain rule, and fills in dot grad on every leaf tensor. Think of the graph as a map from every intermediate value back to the inputs that produced it, with backward simply walking that map in reverse. backward only works directly on a scalar, which is why training loops always reduce the loss to one number first.

## Segment 4 (steps)

Here's the detail that catches everyone once: dot grad accumulates across calls to backward, it never resets on its own. That's exactly why every training loop calls optimizer dot zero_grad before each backward pass — skip it, and gradients from old batches silently pile up and corrupt your updates.

## Segment 5 (code)

Not everything should be tracked. Wrapping code in torch dot no_grad skips building the graph entirely, which is what you want during evaluation or a manual weight update. You'll use no_grad constantly once you reach lesson four's training loop, wrapped around the manual parameter update itself. Detach gives you a tensor with the same data but no gradient history attached.

## Segment 6 (outro)

Autograd tracks, backward computes, zero_grad resets. Up next, lesson three: moving tensors and models between the CPU and GPU.
