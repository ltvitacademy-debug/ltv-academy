# Indexing, Slicing & Broadcasting

Lesson 7 showed how to create arrays and do math on them. This lesson covers two skills you will use in every analysis: **selecting** the part of an array you need, and **combining** arrays of different shapes without writing loops. Selection uses indexing and slicing. Combining uses a NumPy rule called **broadcasting**.

## What you'll learn

- Index and slice one-dimensional arrays, including negative indices and steps
- Why a slice is a view of the original data, and when to use `.copy()`
- Select rows, columns, and blocks from a two-dimensional array
- Pick elements with a list of positions or a boolean mask
- Use broadcasting to combine arrays of different shapes
- Recognize and fix a broadcasting error

## Indexing and slicing in one dimension

Indexing works like Python lists: positions start at 0, and negative positions count from the end. A slice `start:stop:step` includes `start` and stops just before `stop`.

```python
import numpy as np

prices = np.array([20.0, 55.5, 130.0, 8.25, 42.0])
print(prices[0], prices[-1])   # 20.0 42.0
print(prices[1:4])             # [ 55.5  130.     8.25]
print(prices[::2])             # [ 20. 130.  42.]
print(prices[::-1])            # [ 42.     8.25 130.    55.5   20.  ]
```

Unlike lists, NumPy also lets you index with a **list of positions**, which picks exactly those elements in that order:

```python
print(prices[[0, 2, 4]])       # [ 20. 130.  42.]
```

## Slices are views, not copies

This is the most common surprise for newcomers. A basic slice does not copy the data. It gives you a window onto the same memory, so changing the slice changes the original:

```python
sl = prices[1:3]
sl[0] = 99.0
print(prices)                  # [ 20.    99.   130.     8.25  42.  ]
```

Here the price 55.5 was overwritten through the slice. When you want an independent array, call `.copy()`:

```python
cp = prices[1:3].copy()
cp[0] = 0
print(prices)                  # unchanged: [ 20.    99.   130.     8.25  42.  ]
```

Rule of thumb: if you plan to modify a selection and keep the original safe, copy it. Selection with a list of positions or a boolean mask, on the other hand, always returns a copy.

## Two dimensions: rows and columns

For a 2D array you give one index per dimension, rows first, separated by a comma. A bare `:` means "everything along this dimension."

```python
m = np.arange(12).reshape(3, 4)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
print(m[1, 2])       # 6        row 1, column 2
print(m[0])          # [0 1 2 3]   the first row
print(m[:, 1])       # [1 5 9]     the second column
print(m[0:2, 1:3])   # [[1 2]
                     #  [5 6]]    a block
```

Think of `m[rows, columns]`. Pandas uses the same mental model, so this pays off in Chapter 3.

## Boolean masks and assignment

Boolean masks from Lesson 7 also work on 2D arrays, where they return a flat array of the matching values, and they can be used to **assign**:

```python
print(m[m > 8])              # [ 9 10 11]

a = np.array([3, -1, 4, -5])
a[a < 0] = 0
print(a)                     # [3 0 4 0]
```

The second example replaces every negative value with zero in one line, a common cleaning step.

## Broadcasting: combining different shapes

What happens when you multiply a 2D array by a 1D array? Suppose `orders` holds quantities for two customers (rows) across three products (columns), and `unit` holds the price of each product:

```python
orders = np.array([[2, 1, 4], [1, 3, 2]])   # shape (2, 3)
unit = np.array([20.0, 55.5, 8.25])         # shape (3,)
print(orders * unit)
# [[ 40.    55.5   33.  ]
#  [ 20.   166.5   16.5 ]]
```

NumPy **stretches** the smaller array across the larger one, as if `unit` were repeated for each row, without actually copying it. The rule: compare shapes from the rightmost dimension backward. Two dimensions are compatible if they are equal or one of them is 1; a missing dimension counts as 1. Here `(2, 3)` and `(3,)` line up on the last dimension (3 and 3), so it works.

A column of shape `(2, 1)` stretches along the columns instead:

```python
col = np.array([[1.0], [2.0]])   # shape (2, 1)
print(col + unit)
# [[21.   56.5   9.25]
#  [22.   57.5  10.25]]          # result shape (2, 3)
```

A real use is centering each column of a dataset by subtracting its mean:

```python
data = np.array([[10., 200.], [20., 400.], [30., 600.]])
print(data - data.mean(axis=0))
# [[ -10. -200.]
#  [   0.    0.]
#  [  10.  200.]]
```

## When broadcasting fails

If the shapes are not compatible, NumPy raises an error rather than guessing:

```python
bad = np.array([1, 2])
orders + bad
# ValueError: operands could not be broadcast together with shapes (2,3) (2,)
```

The last dimensions are 3 and 2, which do not match. To combine one value per row instead, turn `bad` into a column with `bad[:, None]`, which gives shape `(2, 1)`:

```python
print(orders + bad[:, None])
# [[3 2 5]
#  [3 5 4]]
```

## Recap

- Index with `a[i]`, slice with `a[start:stop:step]`, and use `a[rows, cols]` in 2D.
- Basic slices are views; call `.copy()` when you need independence.
- Lists of positions and boolean masks select elements and can assign values.
- Broadcasting compares shapes from the right; dimensions must match or be 1.
- Next lesson: math and statistics with NumPy.
