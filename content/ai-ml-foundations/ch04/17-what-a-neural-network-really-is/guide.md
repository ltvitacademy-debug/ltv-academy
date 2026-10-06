# Lesson 17 — What a Neural Network Really Is

**Chapter 4 · Deep Learning Foundations · Lesson 17 of 30**

## What you'll learn

- What a neural network actually is underneath the hype: numbers, weights, and arithmetic
- How a single artificial neuron computes a weighted sum plus a bias
- How to work a complete forward pass by hand, with real numbers, from input to output
- Why this is the same `fit`/`predict` idea from earlier in this course, just with more layers
- The vocabulary (weights, bias, layer, activation) you'll see in every lesson from here on

## It's arithmetic, not magic

Chapter 2 of this course covered linear regression: a prediction is a weighted sum of the
inputs plus a bias, `y = w1*x1 + w2*x2 + b`. A neural network is built from exactly that
operation, repeated and stacked. One "neuron" is one weighted sum plus a bias, passed
through a small nonlinear function called an **activation function**. A "layer" is a group
of neurons computing their own weighted sums from the same inputs. A "network" is layers
chained together, each layer's output feeding the next layer's input.

That's the whole idea. Everything else — backpropagation (lesson 19), convolutions and
attention (lessons 20-21), the billions of parameters in a large language model — is this
same operation, repeated at scale.

## One neuron, by hand

A single neuron with two inputs computes:

```
z = w1*x1 + w2*x2 + b
a = activation(z)
```

`w1` and `w2` are **weights** (how much each input matters), `b` is the **bias** (a
baseline nudge), `z` is the weighted sum before activation, and `a` is the neuron's
output after activation. Take `x1 = 0.5`, `x2 = 0.8`, weights `w1 = 0.3`, `w2 = 0.9`, and
bias `b = 0.1`:

```
z = 0.3*0.5 + 0.9*0.8 + 0.1 = 0.15 + 0.72 + 0.1 = 0.97
```

Run `z = 0.97` through the sigmoid activation function (lesson 18 covers activations in
depth): `sigmoid(0.97) ≈ 0.725`. That single number, 0.725, is the neuron's output.

## A full forward pass: two inputs, one hidden layer, one output

Stack several neurons into a **hidden layer**, then feed their outputs into one more
neuron to get a final prediction. This is the smallest network that still deserves the
name "network" — illustrative numbers, worked by hand so every step is checkable:

```python
import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

x1, x2 = 0.5, 0.8

# Hidden layer: 2 neurons, each with its own weights and bias
z1 = 0.3*x1 + 0.9*x2 + 0.1     # neuron 1
z2 = -0.4*x1 + 0.2*x2 + 0.05   # neuron 2
h1, h2 = sigmoid(z1), sigmoid(z2)

# Output layer: 1 neuron, reading the hidden layer's outputs
zo = 1.1*h1 + -0.6*h2 + 0.2
out = sigmoid(zo)

print(round(z1, 4), round(h1, 4))   # 0.97   0.7251
print(round(z2, 4), round(h2, 4))   # 0.01   0.5025
print(round(zo, 4), round(out, 4))  # 0.6961 0.6673
```

Walk it through: neuron 1's weighted sum is `0.97`, which sigmoid squashes to `0.7251`.
Neuron 2's weighted sum is `0.01`, squashed to `0.5025`. Those two numbers — `0.7251` and
`0.5025` — are **not** the original inputs anymore; they're a new, learned representation
of them. The output neuron then takes *those* as its inputs: `1.1*0.7251 + -0.6*0.5025 +
0.2 = 0.6961`, which sigmoid turns into a final prediction of `0.6673` — read as "67%
confidence" if this were a binary classifier.

## Why go through a hidden layer at all

If every input in this course's earlier chapters (linear regression, logistic regression)
was already one weighted sum, what does stacking buy you? The hidden layer lets the
network build its *own* intermediate features instead of you hand-engineering them. In
Chapter 3 of this course, you engineered features by hand (ratios, buckets, encodings).
A hidden neuron is a tiny, trainable feature of its own — "how much does this combination
of inputs matter" — and training (lesson 19) is what sets its weights so that combination
is a *useful* one. A one-layer network can only draw a straight decision line; add a
hidden layer with a nonlinear activation and it can bend that line into curves. Lesson 18
makes that nonlinearity concrete, and lesson 19 shows how the weights in this example —
0.3, 0.9, 0.1, and the rest — are actually learned rather than chosen by hand.

## The vocabulary, collected

| Term | Meaning |
|---|---|
| Weight | A learned number that scales one input's contribution to a neuron's sum |
| Bias | A learned constant added to the weighted sum, shifting it up or down |
| Weighted sum (`z`) | `w1*x1 + w2*x2 + ... + b`, computed before activation |
| Activation function | A nonlinear function applied to `z` to produce the neuron's output |
| Layer | A group of neurons computing their own weighted sums from the same input |
| Hidden layer | Any layer between the input and the final output layer |
| Forward pass | Computing a prediction by running inputs through every layer in order |

## Recap

A neural network is layers of weighted sums plus biases, each passed through an
activation function, chained so one layer's output becomes the next layer's input. You
worked a full forward pass by hand — two inputs, two hidden neurons, one output neuron —
and landed on the same arithmetic scikit-learn's `fit`/`predict` already taught you,
just stacked. Next, lesson 18 looks closely at the activation functions that make
stacking worth doing at all.
