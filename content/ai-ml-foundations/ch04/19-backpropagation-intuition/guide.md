# Lesson 19 — Backpropagation, Intuition

**Chapter 4 · Deep Learning Foundations · Lesson 19 of 30**

## What you'll learn

- What backpropagation actually computes: how much each weight contributed to the error
- The chain rule, applied to a real two-layer network, one derivative at a time
- How to work every gradient by hand on a tiny network, then verify it numerically
- How those gradients turn into a weight update, and that the update actually helps
- Why this is the same gradient descent from Chapter 2, just with the chain rule added

## The question backpropagation answers

Lesson 10 of this course (Chapter 2) covered gradient descent: nudge each parameter a
little in the direction that reduces the loss. For one weighted sum, that gradient is easy.
For a network with layers stacked on layers, the question gets harder: how much did a
weight buried in the *first* layer contribute to an error measured all the way out at the
*output*? **Backpropagation** is the algorithm that answers this — it is not a different
kind of learning, it is the chain rule from calculus, applied layer by layer, computing
exactly the gradients that gradient descent already knows what to do with.

## A tiny network: one input, one hidden neuron, one output

Strip the network down to the smallest shape that still has the problem: one input `x`,
one hidden neuron with a sigmoid activation, one linear output neuron.

```python
import math

def sigmoid(z): return 1 / (1 + math.exp(-z))
def dsigmoid(z):
    s = sigmoid(z)
    return s * (1 - s)   # sigmoid's own derivative

x, y = 1.5, 1.0          # one input, one true target
w1, b1 = 0.4, 0.0        # layer 1 (hidden)
w2, b2 = 0.7, 0.0        # layer 2 (output, linear)

z1 = w1*x + b1            # 0.6000
h  = sigmoid(z1)          # 0.6457
z2 = w2*h + b2             # 0.4520  <- this is the prediction, yhat
loss = 0.5 * (z2 - y)**2   # 0.1502
```

The forward pass predicts `0.4520` against a true target of `1.0`, for a squared-error
loss of `0.1502`. Backpropagation's job: find `dL/dw1` and `dL/dw2`, the exact amount the
loss would change per unit change in each weight.

## The chain rule, one link at a time

Start from the loss and work backward — that's the "back" in backpropagation. Each step
is one derivative, multiplied into the running product:

```python
dL_dyhat  = (z2 - y)              # -0.5480   d(loss)/d(prediction)
dyhat_dw2 = h                     #  0.6457   d(prediction)/d(w2)
dL_dw2    = dL_dyhat * dyhat_dw2  # -0.3538

dyhat_dh  = w2                    #  0.7000   d(prediction)/d(hidden output)
dh_dz1    = dsigmoid(z1)          #  0.2288   d(hidden output)/d(z1)
dz1_dw1   = x                     #  1.5000   d(z1)/d(w1)
dL_dw1    = dL_dyhat * dyhat_dh * dh_dz1 * dz1_dw1   # -0.1317
```

`dL/dw2` only needed two links, because `w2` sits right next to the output. `dL/dw1`
needed all four, because the error has to flow backward *through* the output weight and
*through* the hidden activation's own derivative before it reaches `w1`. That's the whole
algorithm: multiply derivatives along the path from the loss back to each weight. Every
weight in a real network, however deep, is found this same way — more links in the chain,
same rule.

## Checking the math is actually right

A hand-derived gradient is easy to get subtly wrong, so verify it the way you would any
other result in this course: compute the same thing a second way and compare. Here, nudge
each weight by a tiny amount and measure how much the loss actually moves (a **numerical
gradient**):

```python
eps = 1e-6
# bump w1 up and down slightly, re-run the forward pass, compare losses
numeric_dL_dw1 = (loss(w1+eps) - loss(w1-eps)) / (2*eps)
numeric_dL_dw2 = (loss(w2+eps) - loss(w2-eps)) / (2*eps)

print(numeric_dL_dw1, numeric_dL_dw2)
# -0.1317  -0.3538   <- matches the chain-rule result exactly
```

The numerical check and the chain-rule derivation agree to four decimal places. This is
exactly how deep learning frameworks like PyTorch and TensorFlow test their own automatic
differentiation code, and it is a genuinely useful habit for anyone implementing a custom
gradient by hand.

## From gradient to update

The gradients are just the direction; gradient descent (Chapter 2) does the rest —
step a learning rate's worth in the opposite direction:

```python
lr = 0.5
w1 = w1 - lr * dL_dw1    # 0.4 - 0.5*(-0.1317) = 0.4658
w2 = w2 - lr * dL_dw2    # 0.7 - 0.5*(-0.3538) = 0.8769

# re-run the forward pass with the new weights:
# yhat_new = 0.5857, loss_new = 0.0858   (was 0.1502)
```

One step, and the loss fell from `0.1502` to `0.0858` — the network's prediction moved
from `0.4520` toward the true target of `1.0`. Repeat this forward-pass-then-backward-pass
loop thousands of times, across every weight in every layer, and that is the entire
training loop for every neural network in this chapter, including the ones underneath an
LLM.

## Recap

Backpropagation is the chain rule, applied layer by layer, to find how much each weight
contributed to the loss. Working through a tiny one-input, one-hidden-neuron network by
hand produced `dL/dw1 = -0.1317` and `dL/dw2 = -0.3538`, confirmed with a numerical check,
and one gradient-descent step using those gradients cut the loss nearly in half. Next,
lesson 20 looks at how different network architectures — CNNs, RNNs, and transformers —
arrange these same layers differently depending on the kind of data they're reading.
