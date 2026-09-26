# Layers, Activations & Loss

Lesson 1 showed that a neuron is a regression plus an activation, and that stacking neurons lets a network bend its decision boundary. Now we open the box. Every neural network, from a tiny classroom example to a large language model, is built from three ideas: **layers** that transform data, **activation functions** that make stacking worthwhile, and a **loss** that scores how wrong the output is.

## What you'll learn

- The roles of the input, hidden, and output layers and how to count parameters
- Why activation functions are essential, and how sigmoid, tanh, and ReLU differ
- How to run a forward pass by hand in numpy
- Which output layer and loss pair with regression, binary, and multi-class problems

## Layers and a forward pass

The **input layer** is just your feature vector. **Hidden layers** each multiply by a weight matrix, add a bias, and apply an activation. The **output layer** produces the prediction. Below is a tiny network for two houses (features are illustrative: size in thousands of sq ft, bedrooms, age in decades): 3 inputs, 4 hidden neurons, 1 output.

```python
import numpy as np
rng = np.random.default_rng(0)

def relu(z):
    return np.maximum(0, z)

X = np.array([[1.2, 3, 0.5],
              [2.0, 4, 1.0]])
W1 = rng.normal(size=(3, 4)) * 0.3; b1 = np.zeros(4)
W2 = rng.normal(size=(4, 1)) * 0.3; b2 = np.zeros(1)

h = relu(X @ W1 + b1)      # hidden layer
y_hat = h @ W2 + b2        # output layer (regression)
print(h)
print(y_hat.ravel())
```

On our run the hidden activations were `[[0, 0.088, 1.311, 0.896], [0, 0, 1.762, 1.212]]` and the predictions `[-0.693, -0.925]`. The weights are random and untrained, so the predictions are meaningless for now. Training (lesson 3) is what fixes them.

Counting parameters is a useful habit: this network has 3x4 + 4 weights and biases in the hidden layer plus 4x1 + 1 in the output layer, 21 in total. In scikit-learn you can read them from `coefs_` and `intercepts_`; a fitted `MLPClassifier(hidden_layer_sizes=(8, 4))` on 2 input features had weight shapes (2, 8), (8, 4), (4, 1), which is 65 parameters.

## Why activations matter

Without an activation, two stacked layers are just one linear model in disguise:

```python
lin = (X @ W1 + b1) @ W2 + b2
one = X @ (W1 @ W2) + b2
print(np.allclose(lin, one))   # True
```

The two are identical, so depth would add nothing. The activation between layers is what allows curves. You can see it on the ring data from lesson 1: with 8 hidden neurons, `activation="identity"` scored 0.54 on held-out data, `"tanh"` 0.98, and `"relu"` 0.99. (`identity`, `logistic`, `tanh`, and `relu` are the options for `MLPClassifier`; `relu` is the default.)

You can plot the shapes yourself with a few lines of numpy and matplotlib:

```python
import matplotlib.pyplot as plt

z = np.linspace(-5, 5, 400)
plt.plot(z, 1 / (1 + np.exp(-z)), label="sigmoid")
plt.plot(z, np.tanh(z), label="tanh")
plt.plot(z, np.maximum(0, z), label="ReLU")
plt.ylim(-1.3, 3)
plt.legend()
plt.show()
```

The three common shapes:

- **Sigmoid** squeezes any value into 0 to 1. Great for a probability at the output, but it flattens at both ends, which slows learning in deep networks.
- **Tanh** is similar but ranges from -1 to 1 and is centered on zero.
- **ReLU** returns 0 for negatives and the value itself for positives. It is cheap and the usual default for hidden layers.

## Loss: scoring the error

A **loss function** turns "how wrong is this prediction?" into one number the training process can reduce.

- **Regression:** mean squared error. With targets `[2.5, 3.1]` and the untrained predictions above, the MSE was about 13.2, a large number that training will shrink.
- **Binary classification:** the output layer uses a sigmoid to give a probability, and the loss is binary cross-entropy. When the true label is 1, the loss is `-log(p)`: a confident right answer (p = 0.9) costs 0.105, a coin flip (0.5) costs 0.693, and a confident wrong answer (0.1) costs 2.303. Cross-entropy punishes confident mistakes much harder than MSE would.
- **Multi-class:** the output layer uses **softmax**, which turns raw scores into probabilities that sum to 1. Scores `[2.0, 1.0, 0.1]` become `[0.659, 0.242, 0.099]`.

## Recap

- Layers transform features; parameters are the weights and biases.
- Activations (ReLU, tanh, sigmoid) are what make depth useful.
- Match the output and loss to the task: linear + MSE, sigmoid + binary cross-entropy, softmax + cross-entropy.
- Next lesson: how training actually reduces the loss, by gradient descent and backpropagation.
