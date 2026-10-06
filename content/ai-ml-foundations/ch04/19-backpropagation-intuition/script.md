# Script — Backpropagation, Intuition

## Segment 1 (title)

Gradient descent needs a gradient for every weight. For a network with layers stacked on layers, finding that gradient for a weight buried deep inside is the hard part. Backpropagation is how. It's not a different kind of learning — it's the chain rule, applied layer by layer.

## Segment 2 (code)

Strip it down to the smallest network that still has the problem: one input, one hidden neuron, one output neuron. Input one point five, target one point zero. The forward pass predicts point four five two, against a true target of one, for a loss of point one five.

## Segment 3 (code)

Backpropagation starts at the loss and works backward. The gradient for the output weight needs two links in the chain: how the loss changes with the prediction, times how the prediction changes with that weight. Two multiplications, done.

## Segment 4 (code)

The gradient for the first-layer weight needs four links, because the error has to flow backward through the output weight and through the hidden neuron's own derivative before it ever reaches that first weight. Multiply all four, and you get negative point one three one seven.

## Segment 5 (code)

Hand-derived gradients are easy to get subtly wrong, so check them a second way: nudge each weight by a tiny amount, measure how much the loss actually moves. That numerical gradient matches the chain-rule result exactly, to four decimal places. This is literally how PyTorch tests its own automatic differentiation.

## Segment 6 (code)

Now take one gradient descent step with those gradients. The loss drops from point one five zero two to point zero eight five eight. The prediction moved from point four five two toward the true target of one. That's one step, out of the thousands a real network takes.

## Segment 7 (outro)

Every weight in a real network, however deep, is found this same way — more links in the chain, same rule. Next lesson looks at how CNNs, RNNs, and transformers arrange these same layers differently, depending on the kind of data they're reading.
