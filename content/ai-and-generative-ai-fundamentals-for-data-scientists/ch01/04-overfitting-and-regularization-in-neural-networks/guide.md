# Overfitting & Regularization in Neural Networks

You know overfitting from classical machine learning: a model that memorizes its training data does well there and poorly on new data. Neural networks are especially prone to it, because a large network has far more parameters than a small dataset has rows. This lesson shows the problem on a small example and the standard tools for fighting it: L2 regularization, early stopping, dropout, and simply choosing a smaller model or getting more data.

## What you'll learn

- How to recognize overfitting in a network (the train/test gap)
- How L2 regularization (`alpha` in scikit-learn, weight decay elsewhere) tames a large network
- Why early stopping is not a free lunch on small data
- What dropout does, and the train-versus-eval mode gotcha in PyTorch

## Seeing the problem

The data is illustrative: 60 noisy points from a sine wave (noise standard deviation 0.5, so the best possible test MSE is about 0.25). The network is deliberately oversized: two hidden layers of 200 neurons.

```python
import numpy as np
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error

rng = np.random.default_rng(1)
X = rng.uniform(-3, 3, size=(60, 1))
y = 3 * np.sin(X).ravel() + rng.normal(scale=0.5, size=60)
X_test = rng.uniform(-3, 3, size=(500, 1))
y_test = 3 * np.sin(X_test).ravel() + rng.normal(scale=0.5, size=500)

for alpha in (0, 0.1):
    m = MLPRegressor(hidden_layer_sizes=(200, 200), activation="tanh",
                     alpha=alpha, max_iter=5000, tol=1e-7,
                     n_iter_no_change=50, random_state=0).fit(X, y)
    print(alpha,
          round(mean_squared_error(y, m.predict(X)), 3),
          round(mean_squared_error(y_test, m.predict(X_test)), 3))
```

Our output (alpha, train MSE, test MSE): `0 0.06 0.445` and `0.1 0.12 0.34`. With no regularization the network squeezes the training error to 0.06, far below the 0.25 noise floor. That is a red flag: it is fitting noise. Its test error is 0.445, a big gap. The chart in the video shows the result: the unregularized curve wiggles through individual noisy points, while the regularized one follows the underlying sine.

## L2 regularization

In scikit-learn, `alpha` is an **L2 penalty** on the weights: the loss gets an extra term that grows with the squared size of the weights, so large, extreme weights (which create sharp wiggles) are discouraged. Other libraries call the same idea **weight decay**. On the single example above, alpha = 0.1 raised the training error a little (0.06 to 0.12) and lowered the test error (0.445 to 0.34). We also repeated the comparison on five different random datasets and averaged: test MSE was 0.437 with `alpha=0` and 0.332 with `alpha=0.1`. A small 8-neuron network with no penalty also averaged 0.332, which is a good reminder that **a smaller model is itself a form of regularization**.

## Early stopping

Another idea is to watch a validation set while training and stop when its score stops improving. In scikit-learn: `early_stopping=True`, with `validation_fraction` and `n_iter_no_change`.

Here it was a mixed result. On the dataset above it stopped after 349 epochs and reached a test MSE of 0.381 (better than 0.445). But averaged over the five datasets it did badly, about 1.20, because with 60 rows the validation set is only 12 points and a noisy dip can stop training far too early. Early stopping works best when you have enough data for a reliable validation set. (Note that scikit-learn holds that validation data out of the training set.)

## Dropout (PyTorch)

**Dropout** randomly switches off a fraction of hidden neurons on every training step, so the network cannot rely on any single neuron and must spread what it learns. It is a staple in deep learning frameworks; scikit-learn's MLP does not offer it. In PyTorch (installed separately with `pip install torch`), we ran this with version 2.8.0 (CPU):

```python
import torch
from torch import nn

torch.manual_seed(0)
model = nn.Sequential(
    nn.Linear(4, 64), nn.ReLU(), nn.Dropout(p=0.5),
    nn.Linear(64, 1))
optimizer = torch.optim.Adam(model.parameters(), lr=0.001,
                             weight_decay=1e-4)   # L2-style penalty

x = torch.ones(1, 4)
model.train()
print("train mode:", model(x).item(), model(x).item())
model.eval()
print("eval mode: ", model(x).item(), model(x).item())
```

Output: train mode `0.8306 0.8520` (two calls, two different answers, because different neurons were dropped each time) and eval mode `0.7188 0.7188` (identical, dropout off). The gotcha: **you must call `model.eval()` before predicting**, or your predictions will be noisy. The weights here are untrained; this only demonstrates the behavior.

## Practical checklist

1. Always compare training and held-out error; a big gap means overfitting.
2. Try a smaller network or more data first.
3. Add L2 (`alpha` or weight decay); tune it on validation data.
4. Use early stopping when you have enough data for a stable validation set.
5. Use dropout in deep networks built with a framework.

## Recap

- Overfitting shows up as low training error and high held-out error.
- L2 regularization, smaller models, early stopping, and dropout all limit a network's freedom to memorize.
- Next lesson: given all this, when do neural networks actually beat classical ML?
