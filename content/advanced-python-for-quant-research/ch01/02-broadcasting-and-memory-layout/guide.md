# Broadcasting & Memory Layout

Vectorized operations feel like magic until you look at what NumPy actually does under the hood: it stretches arrays of different shapes to match without copying data, and it lays values out in contiguous memory so the CPU can stream through them efficiently. This lesson covers both halves — the broadcasting rules that let `prices * 1.08` and `matrix + vector` just work, and the memory layout details (C-order, F-order, strides, views vs. copies) that explain why some operations are fast and others quietly copy gigabytes.

## What you'll learn

- The exact broadcasting rule NumPy applies when shapes don't match
- Common broadcasting patterns: scalar-to-array, row-to-matrix, column-to-matrix
- C-order vs. F-order (row-major vs. column-major) and why it matters for performance
- Strides: what they are and how to read them
- Views vs. copies, and how to tell which one an operation gave you

## The broadcasting rule

NumPy compares two array shapes element by element, starting from the **trailing** (rightmost) dimension. Two dimensions are compatible if they're equal, or if one of them is 1. Any missing leading dimension is treated as 1.

```python
import numpy as np

a = np.ones((3, 4))      # shape (3, 4)
b = np.array([1, 2, 3, 4])   # shape (4,) -> treated as (1, 4)
print((a + b).shape)     # (3, 4) — b is "stretched" across each row

c = np.array([[10], [20], [30]])  # shape (3, 1)
print((a + c).shape)     # (3, 4) — c is "stretched" across each column
```

Nothing is physically duplicated in memory to make this work — NumPy just reuses `b`'s single row (or `c`'s single column) for every row (or column) it needs, which is why broadcasting is both convenient and cheap.

A shape mismatch that doesn't satisfy the rule raises immediately, which is a feature: it catches bugs where you expected alignment that isn't actually there.

```python
x = np.ones((3, 4))
y = np.ones((3, 5))
# x + y -> ValueError: operands could not be broadcast together
# with shapes (3,4) (3,5)
```

## A quant example: standardizing a return matrix

Broadcasting is the natural tool for "subtract each column's mean, divide by each column's standard deviation" — a common step before PCA or a covariance calculation:

```python
returns = np.random.normal(0, 0.02, size=(250, 5))  # 250 days, 5 assets
col_mean = returns.mean(axis=0)       # shape (5,)
col_std = returns.std(axis=0)         # shape (5,)
standardized = (returns - col_mean) / col_std   # (250,5) - (5,) broadcasts
```

`col_mean` and `col_std` have shape `(5,)`, which broadcasts against each of the 250 rows automatically — no loop over assets required.

## C-order vs. F-order

A NumPy array is a flat block of memory plus metadata describing how to interpret it as a grid. By default (`order="C"`), rows are stored one after another — this is **row-major**, the same layout C arrays use. `order="F"` stores columns one after another — **column-major**, the layout Fortran (and MATLAB) use.

```python
m = np.arange(6).reshape(2, 3)
print(m.flags["C_CONTIGUOUS"])   # True
print(m.flags["F_CONTIGUOUS"])   # False

m_f = np.asfortranarray(m)
print(m_f.flags["F_CONTIGUOUS"])  # True
```

The practical consequence: iterating over an array in the direction that matches its memory order is cache-friendly (the CPU reads nearby memory it already fetched), while iterating against the grain forces the CPU to jump around memory, which is slower even though the math is identical. Row-wise operations on a C-order array (the NumPy default) are fast; column-wise operations on that same array involve bigger memory jumps.

## Strides

A **stride** is the number of bytes NumPy must skip in memory to move one step along a given axis. `.strides` makes the layout concrete instead of abstract:

```python
m = np.arange(6, dtype=np.int64).reshape(2, 3)
print(m.strides)   # (24, 8) — 24 bytes to the next row, 8 to the next column
```

Each `int64` is 8 bytes. Moving one column over costs 8 bytes; moving one row over costs 24 bytes (three columns' worth), because the row is stored contiguously. Transposing an array doesn't move any data — it just swaps the strides:

```python
print(m.T.strides)   # (8, 24) — same memory, new interpretation
```

That's why `.T` is instant even on huge arrays: it's a *view* with different metadata, not a copy.

## Views vs. copies

Slicing a NumPy array normally returns a **view** — a new array object that shares the same underlying memory buffer as the original. Mutating a view mutates the original:

```python
arr = np.arange(10)
sl = arr[2:5]
sl[0] = 999
print(arr[2])   # 999 — sl is a view, not an independent copy
```

`.base` tells you whether an array owns its memory, and `np.shares_memory` checks whether two arrays overlap in memory directly:

```python
print(sl.base is arr)                 # True
print(np.shares_memory(arr, sl))      # True

copy = arr[2:5].copy()
print(np.shares_memory(arr, copy))    # False
```

Fancy indexing (an integer array or boolean mask, rather than a slice) always returns a **copy**, not a view — a common source of surprise bugs when you expected a mutation to propagate back:

```python
fancy = arr[[2, 3, 4]]
fancy[0] = -1
print(arr[2])   # unchanged — fancy indexing copied
```

## Key terms

| Term | Meaning |
|---|---|
| Broadcasting | NumPy's rule for stretching smaller-shaped arrays to match a larger shape without copying data |
| C-order (row-major) | Memory layout where consecutive elements of a row are adjacent; NumPy's default |
| F-order (column-major) | Memory layout where consecutive elements of a column are adjacent |
| Stride | Bytes to skip in memory to advance one step along an axis |
| View | An array that shares memory with another; mutating one mutates the other |
| Copy | An independent array with its own memory; `np.shares_memory` returns False against the original |

## Recap

Broadcasting lets shapes of 1 stretch to match a larger dimension with no data duplication, which is why `matrix - row_vector` and `matrix / column_vector` just work. Memory layout — C-order by default, with strides describing the jump between elements — explains why some access patterns are fast and others aren't, and slicing usually gives you a view sharing memory with the original rather than an independent copy. Next lesson: putting this to work in pandas with MultiIndex and time series operations.
