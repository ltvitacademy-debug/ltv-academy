# Overfitting & Underfitting

Last lesson gave you the theory: bias, variance and generalization. This lesson turns it into a practical skill. When a model disappoints, you should be able to look at two numbers, its score on the training data and its score on held-out data, and say *which* problem you have and what to try next.

## What you'll learn

- How to recognise underfitting and overfitting from train and held-out scores
- How to sweep a flexibility setting and read the resulting curve
- The standard remedies for each problem
- Why the held-out data you tune on eventually needs a third, untouched set

## The diagnosis table

Compare training performance with held-out performance:

| Training score | Held-out score | Diagnosis |
|---|---|---|
| Poor | Poor (similar) | **Underfitting**: high bias, model too simple |
| Excellent | Much worse | **Overfitting**: high variance, model memorized |
| Good | Similar, slightly lower | **Good fit** |

The size of the *gap* between the two tells you about variance; the *level* of both tells you about bias.

## A flexibility sweep

We need a dataset with real noise. scikit-learn's `make_moons` generates two interleaving half-circles; with `noise=0.35` the classes overlap, so no model can be perfect. (Illustrative data, seeded.) We use a decision tree, whose flexibility is easy to control: `max_depth` limits how many questions it may ask in a row. You will study trees properly in chapter 4; here we just use depth as a dial.

```python
import numpy as np
from sklearn.datasets import make_moons
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = make_moons(n_samples=400, noise=0.35, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.4, random_state=0)

depths = list(range(1, 16))
train_acc, test_acc = [], []
for d in depths:
    tree = DecisionTreeClassifier(max_depth=d, random_state=0).fit(X_tr, y_tr)
    train_acc.append(tree.score(X_tr, y_tr))
    test_acc.append(tree.score(X_te, y_te))

print("depth  train  test")
for d in (1, 2, 3, 5, 8, 15):
    print(f"{d:>5}  {train_acc[d-1]:.3f}  {test_acc[d-1]:.3f}")
best = depths[int(np.argmax(test_acc))]
print("best depth on held-out data:", best, round(max(test_acc), 3))
```

Output:

```
depth  train  test
    1  0.804  0.794
    2  0.871  0.906
    3  0.871  0.906
    5  0.896  0.838
    8  0.950  0.856
   15  1.000  0.856
best depth on held-out data: 2 0.906
```

Follow the rows down:

- **Depth 1** scores about 80% on both sets. Poor on training data means the model cannot even fit what it sees: **underfitting**.
- **Depths 2 to 4** have held-out accuracy around 91% and a training score close behind. This is the sweet spot.
- **Depth 15** memorizes the training set (100%) but scores only 85.6% on held-out rows: a gap of nearly 15 points. That is **overfitting**.

Notice that the training score only ever rises. If you tuned on training accuracy you would always choose the deepest tree. Only the held-out curve turns downward.

## The validation curve

Plotting both scores against the dial makes the pattern obvious: the two curves start together, then the training curve keeps climbing while the held-out curve peaks and falls away. The chart is the output of this code (styling omitted):

```python
import matplotlib.pyplot as plt
plt.plot(depths, train_acc, label="training accuracy")
plt.plot(depths, test_acc, label="held-out accuracy")
plt.axvline(best, ls="--")
plt.xlabel("max_depth"); plt.ylabel("accuracy")
plt.legend(); plt.show()
```

## Fixing each problem

**If you are underfitting** (both scores poor):
- Use a more flexible model or add capacity (more depth, more trees).
- Add informative features or interactions (chapter 2 covers feature engineering).
- Reduce regularization if you are using it.

**If you are overfitting** (big gap):
- Constrain the model: limit tree depth, or use regularization, which you will meet in chapter 3.
- Get more data if you can.
- Remove noisy or redundant features.
- Use an ensemble such as a random forest, which averages away variance (chapter 4).

For example, holding the unlimited tree back:

```python
for name, kw in [("unlimited", {}), ("max_depth=3", {"max_depth": 3}),
                 ("min_samples_leaf=15", {"min_samples_leaf": 15})]:
    t = DecisionTreeClassifier(random_state=0, **kw).fit(X_tr, y_tr)
    print(f"{name:20s} train {t.score(X_tr, y_tr):.3f}  test {t.score(X_te, y_te):.3f}")
```

```
unlimited            train 1.000  test 0.856
max_depth=3          train 0.871  test 0.906
min_samples_leaf=15  train 0.871  test 0.844
```

Limiting depth to 3 lifts held-out accuracy from 0.856 to 0.906. The `min_samples_leaf=15` setting closed the gap but did not improve the score here, a reminder that fixes need testing, not assuming. Also remember there are only 160 held-out rows, so differences of a percentage point or two are noise.

## A caution

We chose the best depth by peeking at held-out accuracy. That makes the 0.906 slightly optimistic, because we picked the winner from many candidates on the same rows. The remedy, coming in lesson 7, is a three-way split: train, validation (for choosing settings), and a test set used exactly once.

## Recap

Compare training and held-out scores. Both poor means underfitting, so add flexibility or features. Excellent then poor means overfitting, so constrain the model, simplify, or get more data. Tune on held-out data, then confirm on a set you never touched. Next up, lesson 6: loss functions and optimization, how models actually learn.
