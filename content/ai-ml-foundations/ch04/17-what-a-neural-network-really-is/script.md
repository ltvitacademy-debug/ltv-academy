# Script — What a Neural Network Really Is

## Segment 1 (title)

A neural network sounds like magic. It isn't. It's arithmetic: weighted sums, biases, and a small nonlinear twist, stacked in layers. This lesson works a full one by hand, with real numbers, so you can see exactly what's inside.

## Segment 2 (steps)

One neuron computes a weighted sum of its inputs plus a bias, then squashes it with an activation function. A layer is a group of neurons doing that in parallel. A network is layers chained together. That's the entire idea underneath every model in this chapter.

## Segment 3 (code)

Take two inputs, point five and point eight. One neuron with weights point three and point nine and a bias of point one computes a weighted sum of point nine seven. Pass that through sigmoid, and the neuron's output is about point seven two five. One neuron, one number.

## Segment 4 (code)

Now a full forward pass. Two inputs feed two hidden neurons, each with its own weights. Neuron one outputs point seven two five one. Neuron two outputs point five zero two five. Those two numbers are not the original inputs anymore — they're a new, learned representation the network built for itself.

## Segment 5 (code)

The output neuron reads those two hidden values as its own inputs, computes one more weighted sum, point six nine six one, and sigmoid turns that into point six six seven three — the network's final prediction.

## Segment 6 (steps)

Why bother with a hidden layer? Because it lets the network build its own intermediate features instead of you hand-engineering every one, the way earlier lessons in this course did by hand. A hidden layer, with a nonlinear activation, is what lets the model bend a straight decision line into a curve.

## Segment 7 (outro)

Every weight in that example — point three, point nine, point one, all of it — was learned, not chosen by hand. Next lesson looks closely at the activation functions that make the stacking worthwhile, then lesson nineteen shows exactly how those weights get learned.
