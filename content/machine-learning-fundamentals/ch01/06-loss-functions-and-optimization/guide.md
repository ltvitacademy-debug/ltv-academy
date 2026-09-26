# Loss Functions & Optimization

So far `fit` has been a black box. This lesson opens it. Nearly every supervised algorithm learns the same way: define a number that measures how wrong the model is (the **loss**), then adjust the model's parameters step by step to make that number smaller (**optimization**). Understanding this loop demystifies model training, and explains settings you will meet again and again, such as learning rates and iteration limits.

## What you'll learn

- What a loss function is and why the choice of loss matters
- The common losses: mean squared error, mean absolute error and log loss
- How gradient descent minimizes a loss, step by step
- What the learning rate does, and what happens when it is wrong
- How this connects to what scikit-learn's `fit` actually does

## Loss: one number for "how wrong"

A loss function compares predictions with the true answers and returns a single number; lower is better. Training is the search for the parameters that make it as low as possible.

The choice of loss encodes what you care about. Take five houses where four predictions are within $2k and one is off by $30k:

```python
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, log_loss

y_true = np.array([200, 250, 300, 350, 400])
y_pred = np.array([201, 252, 299, 352, 430])       # one big miss
print("MSE:", mean_squared_error(y_true, y_pred))
print("MAE:", mean_absolute_error(y_true, y_pred))
```

```
MSE: 182.0
MAE: 7.2
```

- **Mean squared error (MSE)** averages the squared misses. Squaring makes big errors count disproportionately: the single $30k miss dominates, giving 182. It is smooth and easy to optimize, and is the default for regression, but sensitive to outliers.
- **Mean absolute error (MAE)** averages the absolute misses. Every dollar of error counts the same, so the result is 7.2, in the same units as the target and far less swayed by the one outlier.

For classification the standard loss is **log loss** (also called cross-entropy). The model outputs a probability, and log loss punishes confident wrong answers severely:

```python
print("said 0.9 and it happened:", round(log_loss([1], [[0.1, 0.9]], labels=[0, 1]), 3))
print("said 0.1 and it happened:", round(log_loss([1], [[0.9, 0.1]], labels=[0, 1]), 3))
```

```
said 0.9 and it happened: 0.105
said 0.1 and it happened: 2.303
```

Being confidently wrong is about twenty times worse than being confidently right. That pushes models toward honest probabilities.

## Optimization: walking downhill

Picture the loss as a landscape where every combination of parameters is a location and the height is the loss. Training means walking downhill. **Gradient descent** does this: at each step it computes the **gradient**, the slope of the loss with respect to each parameter, and moves a small distance in the opposite direction. The size of that step is the **learning rate**.

Here it is from scratch, fitting `price = w * size + b` on the seeded, illustrative house data from lesson 1. We standardize the input first (subtract the mean, divide by the standard deviation), a habit lesson 10 explains.

```python
rng = np.random.default_rng(42)
size = rng.uniform(600, 3000, 60)
price = 50 + 0.12 * size + rng.normal(0, 25, 60)
x = (size - size.mean()) / size.std()

def run(lr, steps=60):
    w, b, history = 0.0, 0.0, []
    for _ in range(steps):
        error = (w * x + b) - price
        history.append(np.mean(error ** 2))
        w -= lr * 2 * np.mean(error * x)   # slope of the loss w.r.t. w
        b -= lr * 2 * np.mean(error)       # slope of the loss w.r.t. b
    return w, b, history

for lr in (0.01, 0.1, 1.05):
    w, b, h = run(lr)
    print(f"lr={lr:<5} first loss {h[0]:10.1f}  last loss {h[-1]:14.1f}")
```

```
lr=0.01  first loss    77888.4  last loss         7497.7
lr=0.1   first loss    77888.4  last loss          349.5
lr=1.05  first loss    77888.4  last loss   5940961063.7
```

Same start, three learning rates:

- **0.01** is too timid. The loss falls, but after 60 steps it is still far from the bottom.
- **0.1** is about right: the loss plunges and levels off near 350.
- **1.05** is too bold. Each step overshoots the valley and lands higher on the other side, so the loss explodes to billions. This is called divergence.

Let the good run go on longer and check it against the exact least-squares answer:

```python
w, b, h = run(0.1, steps=200)
print("final w, b:", round(w, 2), round(b, 2), " loss:", round(h[-1], 1))
print("closed-form check:", np.round(np.polyfit(x, price, 1), 2))
```

```
final w, b: 80.63 266.53  loss: 349.5
closed-form check: [80.63 266.53]
```

Gradient descent arrived at exactly the same line as the direct formula. (The slope is in dollars-thousands per standard deviation of size, because we standardized.)

## The chart

The loss-curve chart below is the output of the code above, plotting `history` for each learning rate on a log scale (styling omitted):

```python
import matplotlib.pyplot as plt
for lr in (0.01, 0.1, 1.05):
    plt.plot(run(lr, steps=30)[2], label=f"learning rate {lr}")
plt.yscale("log"); plt.xlabel("step"); plt.ylabel("loss (MSE)")
plt.legend(); plt.show()
```

## How this relates to scikit-learn

`LinearRegression` does not iterate: for squared error it uses a direct linear-algebra solution. Many other models do iterate. When `LogisticRegression` warns that it "failed to converge", it is telling you the optimizer ran out of iterations before the loss stopped improving, which is why you saw `max_iter` earlier. Large neural networks use a variant called stochastic gradient descent, which computes each step from a small batch of rows.

## Recap

A loss function turns "how wrong" into a number, and the choice of loss (MSE, MAE, log loss) reflects what errors cost you. Optimization, usually gradient descent, adjusts parameters downhill on that number, with the learning rate controlling the step size: too small is slow, too large diverges. Next up, chapter 2: preparing data for models, beginning with lesson 7 on train, validation and test splits.
