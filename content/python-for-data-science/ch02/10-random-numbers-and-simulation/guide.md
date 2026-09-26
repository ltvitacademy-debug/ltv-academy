# Random Numbers & Simulation

Random numbers are one of the most useful tools in data science. You use them to split data into training and test sets, to create fake data for practice, to shuffle, to sample, and to **simulate**: answering "what would happen if...?" by running an experiment thousands of times on the computer instead of working out a formula. This lesson closes out the NumPy chapter.

## What you'll learn

- Create a random number generator and set a seed for reproducible results
- Draw uniform, integer, and normal random numbers
- Sample and shuffle with `choice`, `permutation`, and `shuffle`
- Estimate a probability by simulation
- See why averages of samples behave predictably
- Use resampling (a bootstrap) to gauge uncertainty

## The generator and the seed

Modern NumPy uses a **generator** object. You create one with `np.random.default_rng` and call methods on it:

```python
import numpy as np

rng = np.random.default_rng(42)
print(rng.random(3))   # [0.77395605 0.43887844 0.85859792]
```

`rng.random(3)` gives three floats between 0 and 1. The number `42` is the **seed**. A computer's random numbers are pseudo-random: they come from a formula, and the seed picks the starting point. Create a new generator with the same seed and you get the identical sequence:

```python
rng = np.random.default_rng(42)
print(rng.random(3))   # [0.77395605 0.43887844 0.85859792] again
```

Setting a seed makes your analysis **reproducible**, so a teammate, or you next month, gets the same numbers. Use it whenever results must be repeatable, such as in a lesson, a report, or a model comparison. The older functions such as `np.random.seed` and `np.random.rand` still work and you will see them in older code, but the generator style is the recommended one for new code.

## Common distributions

```python
rng = np.random.default_rng(42)
rng.integers(1, 7, size=10)              # dice rolls, 1 to 6 (7 is excluded)
rng.normal(loc=100, scale=15, size=5)    # bell curve: mean 100, std 15
rng.uniform(10, 20, size=3)              # evenly between 10 and 20
```

Note that `integers(1, 7)` excludes the upper end, just like `range`. Passing a tuple such as `size=(2, 3)` returns a 2D array. `normal` draws from the bell curve you will study in the statistics chapter, and the `loc` and `scale` arguments are its mean and standard deviation. `rng.exponential(scale=50, size=...)` gives skewed data, which is useful for things like order values.

## Sampling and shuffling

`choice` picks from an array. By default it samples **with replacement**, so the same item can appear more than once. Pass `replace=False` to sample without repeats, and `p` to weight the choices:

```python
a = np.array(["A", "B", "C", "D", "E"])
rng = np.random.default_rng(0)
rng.choice(a, size=3, replace=False)          # three distinct letters
rng.choice(["heads", "tails"], size=5, p=[0.7, 0.3])   # a biased coin
rng.permutation(5)    # a shuffled copy of 0..4
```

`rng.shuffle(arr)` shuffles an array in place and returns nothing, while `permutation` returns a new shuffled array. Random train/test splits are built on exactly this idea: shuffle the row numbers, then cut.

## Estimating a probability by simulation

What is the chance that two dice add up to 7? You can work it out by counting (6 of 36 outcomes, or 0.1667), or you can simulate:

```python
rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, size=(100000, 2)).sum(axis=1)
print((rolls == 7).mean())   # 0.16775
```

We rolled two dice 100,000 times as a `(100000, 2)` array, summed across each row with `axis=1` from Lesson 9, and took the mean of a boolean array. Because `True` counts as 1, the mean of `rolls == 7` is the fraction of rolls that were 7. The result, 0.16775, is close to the exact 0.1667. More trials bring the estimate closer to the truth.

The same trick works for business questions where the maths is awkward. If each customer has an assumed 15% chance of churning, `rng.random(1000) < 0.15` simulates a group of 1,000 customers, and `.sum()` counts how many left. With seed 1 that came to 143, and a different seed gives a slightly different count, which shows the natural variation you should expect.

## A simulation recipe

Most simulations follow the same four steps: define the random process, repeat it many times using arrays, summarize the results, and check against a case where you know the answer.

## Averages and resampling

Draw 2,000 samples of 50 orders each from a skewed population and average each sample. The sample means cluster tightly and their spread matches the theory (the population standard deviation divided by the square root of 50):

```python
rng = np.random.default_rng(7)
orders = rng.exponential(scale=50, size=100000)
means = rng.choice(orders, size=(2000, 50)).mean(axis=1)
print(means.std())               # 7.07 (approximately)
print(orders.std() / np.sqrt(50))   # 7.02 (approximately)
```

That match is the idea behind the central limit theorem, which later lessons develop. It also enables the **bootstrap**: with only one small sample, resample it with replacement many times and see how much the mean moves.

```python
rng = np.random.default_rng(5)
x = np.array([12, 15, 11, 18, 14, 22, 9, 16])   # illustrative
bm = rng.choice(x, size=(5000, len(x)), replace=True).mean(axis=1)
print(x.mean())                        # 14.625
print(np.percentile(bm, [2.5, 97.5]))  # [12.    17.375]
```

The range from the 2.5th to 97.5th percentile of the resampled means is a rough 95% interval for the true mean. Treat it as an illustration of the method, not a rigorous result from only eight values.

## Recap

- `rng = np.random.default_rng(seed)` gives reproducible random numbers.
- Use `random`, `integers`, `normal`, and `uniform` to draw values, and `choice`, `shuffle`, and `permutation` to sample and reorder.
- Simulate by running an experiment many times in one array and taking the mean of a boolean.
- Bootstrap by resampling your data with replacement.
- Chapter 3 moves from raw arrays to labeled tables. Next lesson: Series and DataFrames in pandas.
