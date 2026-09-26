# From Regression to Neural Networks

Welcome to AI & Generative AI Fundamentals for Data Scientists. You already build models with Python and scikit-learn. This course takes you from the models you know to the ones behind modern AI: neural networks, transformers, large language models, embeddings, and retrieval-augmented generation (RAG). It is a working-knowledge tour, not a research course. Anyone who wants to go deeper into building AI products can continue on the AI Engineer path afterward.

We begin with the good news: a neural network is not a new kind of magic. It is the regression you already know, repeated and stacked.

## What you'll learn

- How a single "neuron" is a linear regression followed by a function
- Why logistic regression is already a one-neuron neural network
- What stacking neurons into layers adds that a single model cannot do
- How to see the difference on a dataset a linear model cannot separate

## A neuron is a regression with a twist

Linear regression computes a weighted sum of features plus an intercept: `z = w1*x1 + w2*x2 + b`. A neuron computes exactly that sum, then passes it through an **activation function**. With a sigmoid activation, the output is squeezed into a number between 0 and 1, which is precisely what logistic regression does.

```python
import numpy as np

x = np.array([3.0, 1.0])    # e.g. tenure in years, support tickets
w = np.array([0.5, -2.0])   # weights (learned in real life)
b = 1.0                     # bias (the intercept)

z = x @ w + b               # the linear regression part
a = 1 / (1 + np.exp(-z))    # the sigmoid activation
print(z, a)
```

Output: `0.5 0.6224593312018546`. The weights and bias here are invented for illustration; in a real model they are learned from data, which is the subject of lesson 3.

So logistic regression, which you have already used, is a network with one neuron. The vocabulary changes (weights and bias instead of coefficients and intercept) but the arithmetic does not.

## Where a single neuron runs out

A single neuron draws one straight boundary. Many real patterns are not separable by a straight line: think of one customer segment sitting inside another. Here is a synthetic ring-shaped dataset, with a plain logistic regression next to a network with one hidden layer of 8 neurons.

```python
from sklearn.datasets import make_circles
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

X, y = make_circles(n_samples=600, noise=0.1,
                    factor=0.4, random_state=0)
Xtr, Xte, ytr, yte = train_test_split(
    X, y, test_size=0.3, random_state=0)

lr = LogisticRegression().fit(Xtr, ytr)
mlp = MLPClassifier(hidden_layer_sizes=(8,),
                    max_iter=3000, random_state=0).fit(Xtr, ytr)
print(lr.score(Xte, yte), mlp.score(Xte, yte))
```

On our run the logistic regression scored 0.54 on the held-out data (barely better than a coin flip) and the 8-neuron network scored 0.99. The chart in the video shows why: the linear model can only cut the plane with a straight line, while the hidden layer bends the boundary around the inner cluster.

## Why stacking helps

Each hidden neuron computes its own regression-plus-activation. The next layer then takes *those outputs* as its features. In effect, the network learns useful new features on its own, a bit like feature engineering that the model does for you. Without the activation function between layers, stacking would collapse back into a single linear model, which is why activations matter. We cover them in the next lesson.

Note the size of the hidden layer matters: on the same data, 2 hidden neurons scored about 0.81, 4 scored 0.97, and 8 scored 0.99. More capacity lets the network represent more complicated boundaries.

## Recap

- A neuron = weighted sum (linear regression) + activation function.
- Logistic regression is a one-neuron network.
- Hidden layers let a network learn non-linear patterns and its own features.
- Next lesson: the parts of a network in detail: layers, activations, and loss.
