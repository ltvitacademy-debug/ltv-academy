# Lesson 9 — Neural Networks, Intuition

**Chapter 2 · Core ML Concepts · Lesson 9 of 30**

## What you'll learn

- What a single "neuron" actually computes — it's simpler than the name suggests
- How neurons stack into layers, and layers stack into a network
- Why networks need a nonlinear activation function to be useful at all
- The big picture: a neural network is a flexible function, built from small pieces

## One neuron is just a weighted sum plus a squeeze

Despite the biological name, a single artificial neuron does something very mechanical: it takes several numeric inputs, multiplies each by its own learned weight, adds a bias, sums the result, and passes that sum through a simple nonlinear function called an **activation function**.

```python
def neuron(inputs, weights, bias, activation):
    z = sum(i * w for i, w in zip(inputs, weights)) + bias
    return activation(z)   # e.g. ReLU: max(0, z)
```

That's it — no magic. The "intelligence" doesn't live in any one neuron; it lives in the combination of many of them, and in exactly what values their weights settle into during training.

## Neurons stack into layers, layers stack into a network

A neural network arranges neurons into **layers**: an input layer (just the feature values, one slot per feature), one or more **hidden layers** of neurons, and an output layer that produces the final prediction. Every neuron in one layer typically connects to every neuron in the next, each connection carrying its own weight.

```
INPUT LAYER       HIDDEN LAYER        OUTPUT LAYER
 x1 -----\        /--- h1 ---\
 x2 ------>------<----- h2 ---->------  y_pred
 x3 -----/        \--- h3 ---/

 each arrow = one learned weight
```

A **forward pass** — the same thing as inference from Lesson 2 — means pushing an input all the way through: compute every neuron's weighted sum and activation in the input layer, feed those outputs forward as the next layer's inputs, repeat through every hidden layer, and read the final number(s) off the output layer.

## Why the nonlinear step actually matters

It's tempting to think stacking more layers always adds more power, but that's only true because of the activation function. Without it, each layer would just be a weighted sum of the layer before — and a weighted sum of a weighted sum is still, mathematically, just one big weighted sum. Stack a hundred purely linear layers and the entire network collapses to the exact same thing as a single linear regression.

```
No activation:  layer2(layer1(x)) = W2*(W1*x + b1) + b2
                                   = (W2*W1)*x + (W2*b1 + b2)
                                   = just one bigger linear layer!

With ReLU:      every layer can bend the function, not just scale it
```

The nonlinear activation function (ReLU, sigmoid, and others — covered in detail in Chapter 4) is what lets each additional layer genuinely add representational power, letting the network approximate curved, complex relationships that a purely linear model never could.

## The big picture

A neural network, underneath all the layered structure, is really just one very large, very flexible mathematical function — built by composing many small weighted-sum-plus-activation steps. Training it (covered next, in Lesson 10) means searching for the values of every single weight, across every connection in the whole network, that make this giant function best match the training data.

## Recap

A single neuron computes a weighted sum of its inputs plus a bias, then applies a nonlinear activation function. Networks stack neurons into layers — input, hidden, output — and a forward pass pushes data through all of them to produce a prediction. Nonlinearity is what lets stacking layers actually add power; without it, any number of layers collapses to one linear function. Next, we look at exactly how all those weights get adjusted during training: loss functions and gradient descent.
