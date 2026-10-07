# Script — Building a Multilayer Perceptron

## Segment 1 (title)

Everything in this chapter was building toward this lesson. A multilayer perceptron is linear layers and activations stacked inside a real nn.Module, trained with a real optimizer on data from a real DataLoader — every piece from this chapter, assembled into one script.

## Segment 2 (code)

The output layer returns raw logits with no activation on top, exactly what CrossEntropyLoss expects. Two hidden layers of size sixty-four is a reasonable starting point for small tabular data — there's no single correct answer.

## Segment 3 (code)

The training loop itself has nothing new in it. DataLoader from lesson five, dot to device from lesson three, CrossEntropyLoss from lesson ten, Adam and the zero_grad, backward, step pattern from lesson eleven.

## Segment 4 (steps)

Hidden size and depth are choices without a universal answer — chapter three covers more principled ways to think about them. What matters more right now: the output layer stays raw logits, since CrossEntropyLoss needs them unmodified.

## Segment 5 (code)

Evaluating uses model dot eval and torch dot no_grad together, doing different jobs — eval changes layer behavior, no_grad just skips building a graph you don't need. argmax picks the highest-scoring class per example, which you compare directly against the integer labels.

## Segment 6 (outro)

You've now built, trained, and evaluated a real neural network from scratch. Up next, lesson thirteen: weight initialization, and why the random starting point for your parameters matters more than it might seem.
