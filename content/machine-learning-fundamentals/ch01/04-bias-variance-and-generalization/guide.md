# Bias, Variance & Generalization

A model that scores brilliantly on its training data can still fail on new data, and a model that is too simple can fail on both. Understanding *why* is the most useful piece of theory in machine learning, because it tells you what to do when a model disappoints. Two ideas explain it: **bias** and **variance**.

## What you'll learn

- What generalization means, and why it is the actual goal
- Bias: error from a model that is too simple to capture the pattern
- Variance: error from a model that is too sensitive to the particular training sample
- How to measure both with a small experiment you can run yourself
- Why more flexibility is not automatically better

## Generalization is the goal

Training error tells you how well the model fits rows it has already seen. **Generalization** is how well it performs on new rows drawn from the same source. The gap between the two is the price of having learned from a limited sample. Every choice in this course, from splitting data to regularization, is about managing that gap.

## Bias and variance in plain words

- **Bias** is systematic error. A model with high bias makes strong simplifying assumptions (for example "the relationship is a straight line"), so even with unlimited data it misses the true pattern. It is consistently wrong in the same direction. This is **underfitting**.
- **Variance** is sensitivity to the training sample. A model with high variance is so flexible that it bends to follow the noise in whatever rows it happened to see. Give it a different sample and it produces a very different model. This is **overfitting**.
- **Noise** is randomness in the data itself. No model can remove it, so some error is irreducible.

Simple models sit at high bias, low variance. Flexible models sit at low bias, high variance. This is the **bias-variance tradeoff**: making a model more flexible lowers bias but raises variance, and the best model balances the two.

## An experiment

We generate 40 noisy points from a sine curve (the "truth" is a sine wave, so we know the right answer), split them 50/50, and fit polynomials of degree 1, 3 and 9. The data is illustrative and seeded, so your numbers will match.

```python
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

def truth(x):
    return np.sin(2 * np.pi * x)

rng = np.random.default_rng(0)
x = rng.uniform(0, 1, 40)
y = truth(x) + rng.normal(0, 0.3, 40)
X = x.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.5, random_state=1)

def make(degree):
    return make_pipeline(PolynomialFeatures(degree), LinearRegression())

print("degree  train MSE  test MSE")
fits = {}
for d in (1, 3, 9):
    m = make(d).fit(X_tr, y_tr)
    fits[d] = m
    tr = mean_squared_error(y_tr, m.predict(X_tr))
    te = mean_squared_error(y_te, m.predict(X_te))
    print(f"{d:>6}  {tr:9.3f}  {te:8.3f}")
```

Output:

```
degree  train MSE  test MSE
     1      0.287     0.461
     3      0.079     0.135
     9      0.058     6.805
```

(MSE, mean squared error, is the average squared miss; lower is better.)

Read it row by row. **Degree 1**, a straight line, is bad on both sets: high bias. **Degree 3** is good on both, with a small gap. **Degree 9** has the *lowest* training error and the *worst* test error by a wide margin, the signature of high variance. If you judged models on training error alone you would pick the worst one.

## Measuring bias and variance directly

To see variance, imagine collecting a fresh training set many times. We refit each model on 200 new samples of 20 points and record its prediction at x = 0.25, where the true value is 1.0.

```python
x0 = np.array([[0.25]])                       # true value there is 1.0
print("degree  mean prediction  spread (std)")
for d in (1, 3, 9):
    preds = []
    for seed in range(200):
        r = np.random.default_rng(100 + seed)
        xs = r.uniform(0, 1, 20)
        ys = truth(xs) + r.normal(0, 0.3, 20)
        preds.append(make(d).fit(xs.reshape(-1, 1), ys).predict(x0)[0])
    print(f"{d:>6}  {np.mean(preds):15.2f}  {np.std(preds):12.2f}")
```

```
degree  mean prediction  spread (std)
     1             0.49          0.17
     3             1.01          0.13
     9             0.97          0.59
```

The line's average prediction is 0.49, far from the truth of 1.0: that is bias. Degree 9 averages 0.97, nearly right, but its individual predictions scatter with a standard deviation of 0.59, more than four times that of degree 3: that is variance. Degree 3 is close on both counts.

## The picture

The chart below is the output of the fitting code (styling omitted). The dashed gold curve is the true pattern.

```python
import matplotlib.pyplot as plt
grid = np.linspace(0, 1, 200).reshape(-1, 1)
fig, axes = plt.subplots(1, 3, figsize=(10, 4), sharey=True)
for ax, d in zip(axes, (1, 3, 9)):
    ax.scatter(X_tr, y_tr)
    ax.plot(grid, truth(grid), "--")
    ax.plot(grid, fits[d].predict(grid))
    ax.set_ylim(-2, 2)
plt.show()
```

## Recap

Generalization, performance on unseen data, is the goal. Too-simple models have high bias and underfit; too-flexible models have high variance and overfit. Training error always improves with flexibility, so only held-out data can reveal which is which. Next up, lesson 5: how to diagnose and fix overfitting and underfitting in practice.
