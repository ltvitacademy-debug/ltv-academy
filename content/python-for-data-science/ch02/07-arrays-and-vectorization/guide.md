# Arrays & Vectorization

Chapter 2 introduces **NumPy**, the numerical library underneath nearly all of Python's data science stack. pandas is built on it, scikit-learn consumes it, and matplotlib plots it. You will use NumPy directly for fast math, simulations, and statistics, and indirectly every time you touch a DataFrame column. The core idea is the **array**, and the core skill is **vectorization**: doing math on a whole array at once instead of writing a loop.

## What you'll learn

- What a NumPy array is and how it differs from a list
- How to inspect an array's `dtype`, `shape`, `ndim`, and `size`
- How vectorized operations replace loops
- How to compare and filter with boolean arrays
- Common ways to create arrays
- Why NumPy is dramatically faster

## Your first array

Install NumPy into your environment (`pip install numpy`) and import it under the conventional name `np`:

```python
import numpy as np

prices = np.array([20.0, 55.5, 130.0, 8.25])
print(prices)           # [ 20.    55.5  130.     8.25]
print(prices.dtype)     # float64
print(prices.shape)     # (4,)
print(prices.ndim)      # 1
print(prices.size)      # 4
```

An array is a grid of values that all share one **dtype**, here `float64`. That restriction is what makes NumPy fast: the values sit side by side in memory in a single format, unlike a list, which can mix anything. `shape` is a tuple of dimension sizes. `(4,)` means one dimension with four elements.

Two-dimensional arrays are built from a list of lists, and their shape reports rows then columns:

```python
m = np.array([[1, 2, 3], [4, 5, 6]])
print(m.shape, m.ndim)   # (2, 3) 2
```

## Vectorization: math without loops

With a list, "add 8% tax to every price" needs a loop or a comprehension. With an array, you write the math once and it applies to every element:

```python
print(prices * 1.08)    # [ 21.6   59.94 140.4    8.91]
print(prices + prices)  # [ 40.  111.  260.   16.5]
```

Compare that with a plain Python list, where `*` means something else entirely:

```python
print([20.0, 55.5] * 2)   # [20.0, 55.5, 20.0, 55.5]
```

Lists repeat; arrays do arithmetic. Operations between two arrays of the same shape work element by element. This style of writing is called vectorized code, and it is shorter, clearer, and much faster than looping. If you have written SQL, it will feel familiar: you say what to do with a column, not how to walk through the rows.

## Comparisons and boolean filtering

Comparison operators are vectorized too. They return an array of `True` and `False`, and you can use that array to select elements:

```python
print(prices > 50)           # [False  True  True False]
print(prices[prices > 50])   # [ 55.5 130. ]
```

That second line is the NumPy equivalent of `WHERE price > 50`. It is the single most-used pattern in this chapter, and pandas uses the same idea for filtering rows.

## Types and conversion

Because every element shares a dtype, NumPy picks one that fits all your values. Mixing integers and decimals produces `float64`. You can change type explicitly with `.astype`:

```python
print(np.array([1, 2.5]).dtype)              # float64
print(np.array([1.9, 2.7]).astype(int))      # [1 2]
```

Note that converting to `int` truncates toward zero; it does not round. On Windows with NumPy 1.x, plain integers default to `int32`, while macOS and Linux typically use `int64`; this rarely matters but explains why dtypes can differ between machines. Float arrays can hold `nan` (not a number), which is how missing values are represented; a plain `sum` of an array containing `nan` returns `nan`, while `np.nansum` ignores it:

```python
x = np.array([1.0, np.nan, 3.0])
print(x.sum(), np.nansum(x))   # nan 4.0
```

## Creating arrays quickly

You rarely type values by hand. NumPy has constructors for common cases:

```python
np.zeros(3)             # [0. 0. 0.]
np.arange(0, 10, 2)     # [0 2 4 6 8]
np.linspace(0, 1, 5)    # [0.   0.25 0.5  0.75 1.  ]
np.arange(6).reshape(2, 3)
```

`arange` works like `range` but returns an array. `linspace(start, stop, count)` gives evenly spaced points including both ends. `reshape` rearranges the same values into a new shape; the total number of elements must match.

## Why it is fast

Try this on your own machine: double a million numbers with a list comprehension, then with an array.

```python
import time
n = 1_000_000
lst = list(range(n))
arr = np.arange(n)

t0 = time.perf_counter(); [x * 2 for x in lst]; t1 = time.perf_counter()
arr * 2; t2 = time.perf_counter()
print(t1 - t0, t2 - t1)
```

On the machine used to write this lesson the list took about 0.16 seconds and the array about 0.002 seconds, roughly 78 times faster. Your numbers will differ, but the gap is typically large. The loop runs in NumPy's compiled code rather than Python's interpreter.

## Recap

- An array holds values of one dtype; inspect it with `dtype`, `shape`, `ndim`, and `size`.
- Vectorized operations apply to every element with no loop; list operators behave differently.
- Boolean arrays filter: `prices[prices > 50]`.
- Create arrays with `zeros`, `arange`, `linspace`, and `reshape`.
- Next lesson: indexing, slicing, and broadcasting.
