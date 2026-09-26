# Training & Backpropagation

Lesson 2 gave us a network with random weights and a loss that scores its mistakes. Training is the process of nudging the weights until the loss goes down. The recipe is **gradient descent**, and the algorithm that makes it practical for many-layered networks is **backpropagation**. This lesson builds both from scratch in numpy on a tiny network so you can see nothing is hidden.

## What you'll learn

- The four-step training loop: forward pass, loss, backward pass, update
- What backpropagation computes, and how to check it against a numerical gradient
- How the learning rate makes training slow, fine, or explosive
- How the same loop looks in scikit-learn and in PyTorch

## The training loop

1. **Forward pass:** compute predictions from the current weights.
2. **Loss:** score them.
3. **Backward pass (backpropagation):** compute the gradient, the direction in which each weight would increase the loss the most.
4. **Update:** step every weight a little in the opposite direction, scaled by the **learning rate**.

Repeat for many **epochs** (full passes over the data).

Backpropagation is just the chain rule from calculus applied layer by layer, from the loss back to the inputs. Each layer receives "how much does the loss change if my output changes?" from the layer after it, and passes back the same question about its own inputs.

## Backprop by hand: a 1-8-1 network

Illustrative data: a noisy sine wave. The network has one input, 8 tanh hidden neurons, and a linear output.

```python
import numpy as np
rng = np.random.default_rng(0)

X = rng.uniform(-3, 3, size=(200, 1))
y = 3 * np.sin(X) + rng.normal(scale=0.3, size=(200, 1))

W1 = rng.normal(size=(1, 8)) * 0.5; b1 = np.zeros(8)
W2 = rng.normal(size=(8, 1)) * 0.5; b2 = np.zeros(1)

def forward(X):
    a1 = np.tanh(X @ W1 + b1)
    return a1, a1 @ W2 + b2

def grads():
    a1, y_hat = forward(X)
    d_yhat = 2 * (y_hat - y) / len(X)          # d loss / d y_hat
    dW2 = a1.T @ d_yhat                        # output layer
    db2 = d_yhat.sum(axis=0)
    d_z1 = (d_yhat @ W2.T) * (1 - a1 ** 2)     # back through tanh
    return X.T @ d_z1, d_z1.sum(axis=0), dW2, db2

def loss():
    return np.mean((forward(X)[1] - y) ** 2)
```

The line `(1 - a1 ** 2)` is the derivative of tanh. Every activation has a derivative; that is the one place activations enter the backward pass.

## Trust, but verify: the gradient check

A classic test of a hand-written backprop is comparing one analytic gradient to a numerical estimate made by nudging the weight up and down:

```python
dW1, db1, dW2, db2 = grads()
eps = 1e-6
W1[0, 0] += eps; up = loss()
W1[0, 0] -= 2 * eps; down = loss()
W1[0, 0] += eps
print("analytic ", dW1[0, 0])
print("numerical", (up - down) / (2 * eps))
```

Our output: analytic `-0.96037332937`, numerical `-0.96037332953`. They agree to about nine digits, so the backward pass is correct.

## The update loop

```python
lr = 0.05
for epoch in range(3001):
    dW1, db1, dW2, db2 = grads()
    W1 -= lr * dW1; b1 -= lr * db1
    W2 -= lr * dW2; b2 -= lr * db2
```

The loss printed at epochs 0, 1000, 2000, and 3000 was 3.13, 0.21, 0.19, and 0.13. The noise we added has variance 0.09, so about 0.09 is the best any model could do on this data. The chart in the video shows the loss curve and the fitted curve. You may notice a brief spike near epoch 1000: plain gradient descent can overshoot, then recover.

## The learning rate

Running the same network for 300 epochs with different learning rates, the MSE at the end was:

| learning rate | MSE after 300 epochs |
|---|---|
| 0.001 | 0.96 (too slow) |
| 0.05 | 0.32 (fine) |
| 0.5 | nan (diverged) |

Too small and training crawls; too large and the loss explodes. It is the single most important setting to tune, which is why optimizers such as **Adam** adapt the step size per weight.

## The same loop in scikit-learn and PyTorch

scikit-learn hides the loop inside `fit`:

```python
from sklearn.neural_network import MLPRegressor
m = MLPRegressor(hidden_layer_sizes=(8,), activation="tanh",
                 solver="adam", learning_rate_init=0.01,
                 max_iter=2000, random_state=0).fit(X, y.ravel())
print(m.n_iter_, m.loss_curve_[0], m.loss_curve_[-1])
```

Our run stopped after 586 epochs, with the loss going from about 1.65 to 0.058 (scikit-learn's squared-error loss includes a factor of one half). `solver` can be `"lbfgs"`, `"sgd"`, or `"adam"`.

PyTorch (not installed in this course's base environment; `pip install torch`) makes the four steps explicit, and `loss.backward()` does the backpropagation for you:

```python
import torch
from torch import nn

model = nn.Sequential(nn.Linear(1, 8), nn.Tanh(), nn.Linear(8, 1))
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)

for epoch in range(3001):
    loss = loss_fn(model(X_t), y_t)   # forward + loss
    optimizer.zero_grad()
    loss.backward()                   # backpropagation
    optimizer.step()                  # update
```

We ran this with PyTorch 2.8.0 (CPU) on the same data (converted to float32 tensors `X_t` and `y_t`); the loss at epochs 0, 1000, 2000, 3000 was 2.45, 0.11, 0.09, 0.09. Its starting weights differ from our numpy ones, so the numbers differ slightly.

## Recap

- Training = forward, loss, backward, update, repeated.
- Backpropagation is the chain rule; you can verify it with a numerical gradient.
- The learning rate can make training too slow or unstable.
- Next lesson: a network that trains well can still memorize. We tackle overfitting and regularization.
