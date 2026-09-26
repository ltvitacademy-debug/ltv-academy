Every neural network, from a small classroom example to a large language model, is built from three ideas: layers, activation functions, and a loss. This lesson opens up all three.

The input layer is just your feature vector. Hidden layers each multiply by a weight matrix, add a bias, and apply an activation. The output layer produces the prediction. The weights and biases are the network's parameters, and counting them is a good habit.

Here's a forward pass in numpy for two houses: three inputs, four hidden neurons, one output. Multiply, add the bias, apply ReLU, then do it again for the output. The weights are random and untrained, so the predictions are meaningless for now. This network has twenty-one parameters.

Why bother with activations? Without one, two stacked layers collapse into a single linear model. The check prints True. On our ring data, an identity activation scored zero point five four, tanh scored zero point nine eight, and ReLU zero point nine nine.

Sigmoid squeezes values into zero to one, but flattens at the ends and slows learning in deep networks. Tanh ranges from minus one to one. ReLU returns zero for negatives and the value itself for positives. It's cheap, and the usual default for hidden layers.

The loss turns how wrong into a single number. For regression, mean squared error. For binary classification, cross-entropy: a confident right answer costs about zero point one, a coin flip costs zero point six nine, and a confident wrong answer costs over two. For multiple classes, softmax turns raw scores into probabilities that sum to one.

So match the output layer and the loss to the task. A linear output with squared error for regression. Sigmoid with binary cross-entropy for two classes. Softmax with cross-entropy for many.

Next lesson: how training actually reduces that loss, with gradient descent and backpropagation.
