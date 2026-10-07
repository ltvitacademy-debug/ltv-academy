# Script — Linear Layers & Activation Functions

## Segment 1 (title)

The two most basic building blocks of almost every network are the linear layer, a learned linear transformation, and the activation function, which adds the non-linearity that makes deep networks powerful. You'll stack these two for the rest of this course.

## Segment 2 (code)

nn.Linear computes x times weight transpose plus bias. It expects the last dimension of the input to match in_features, and produces an output whose last dimension is out_features — weight and bias are both learnable parameters. Every other dimension, like the batch dimension, just passes through unchanged, which is why the same layer works whether you feed it one example or a few thousand at once.

## Segment 3 (code)

Stack two linear layers with nothing between them and you gain nothing — composing linear functions just gives you another linear function. Even a network with a hundred linear layers stacked back to back, with no activation between any of them, is still mathematically just one matrix. Add an activation in between, and now the network can learn genuinely non-linear patterns.

## Segment 4 (steps)

ReLU is the default for hidden layers — cheap, and it avoids vanishing gradients better than the alternatives. GELU is a smoother version that's become standard inside Transformers. Sigmoid and Tanh squash their output into a fixed range, which makes them good output-layer choices but poor hidden-layer choices, since they saturate. Sigmoid's output can be read directly as a probability, which is exactly why you still see it on a final output layer even though it's a poor choice everywhere else in the network.

## Segment 5 (code)

nn.Sequential chains a list of layers, feeding each one's output into the next — the fastest way to define a simple feedforward stack. For anything with branching, skip connections, or multiple inputs, Sequential stops being enough, and you'll subclass nn.Module directly instead.

## Segment 6 (outro)

Linear layers transform, activations add non-linearity, Sequential chains them together. Up next, lesson ten: loss functions, which measure exactly how wrong a prediction is.
