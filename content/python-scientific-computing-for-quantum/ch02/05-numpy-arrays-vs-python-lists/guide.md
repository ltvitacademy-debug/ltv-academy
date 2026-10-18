# NumPy Arrays vs. Python Lists

Every quantum state you'll ever represent in code — a qubit amplitude pair, a 4-dimensional two-qubit vector, a gate matrix — is a grid of numbers that needs real math applied to it, not just storage. Python lists store numbers; NumPy arrays let you compute with them the way physics notation expects.

## What you'll learn

- Why a Python list cannot do the math a quantum state vector needs
- What `*`, `+`, and other operators actually do on a `list` vs. on an `np.array`
- How NumPy's fixed dtype and contiguous memory make vectorized math possible
- How to represent a qubit amplitude pair as an array and check it's a valid state
- When a plain list is still the right tool

## The core problem: lists don't do element-wise math

A Python list is a general-purpose container. It has no idea its contents are numbers, so operators on it do container things, not math things:

```python
a = [1, 2, 3, 4]
print(a * 2)        # [1, 2, 3, 4, 1, 2, 3, 4]  -- repeats the list
print(a + [5, 6, 7, 8])  # [1, 2, 3, 4, 5, 6, 7, 8] -- concatenates
```

`a * 2` duplicates the list; it does not double each entry. `a + [5, 6, 7, 8]` appends, it does not add element-by-element. To actually scale or add the numbers with a plain list you'd have to write a loop or a list comprehension every single time:

```python
doubled = [x * 2 for x in a]        # [2, 4, 6, 8]
```

## NumPy arrays do real element-wise math

An `np.array` wraps the same numbers but overloads the operators to mean actual arithmetic:

```python
import numpy as np

arr = np.array([1, 2, 3, 4])
print(arr * 2)
# [2 4 6 8]

b = np.array([5, 6, 7, 8])
print(arr + b)
# [ 6  8 10 12]
print(arr * b)
# [ 5 12 21 32]
```

These results are exact integer arithmetic, confirmed directly: `[1,2,3,4]*2 = [2,4,6,8]`, `[1,2,3,4]+[5,6,7,8] = [6,8,10,12]`, and `[1,2,3,4]*[5,6,7,8] = [5,12,21,32]` (element by element: 1×5=5, 2×6=12, 3×7=21, 4×8=32). No loop, no comprehension — the array itself knows how to apply the operator to every entry.

## Why this matters: representing a qubit

A single qubit's state is two complex amplitudes, conventionally written as a column vector. In code that's naturally an array, not a list, because you need to do linear algebra on it immediately — scale it, take its norm, multiply a matrix into it:

```python
import numpy as np

# amplitudes for alpha|0> + beta|1>
state = np.array([0.6, 0.8])

prob_sum = np.sum(state ** 2)
print(prob_sum)
# 1.0
```

`state ** 2` squares each amplitude element-wise (`0.6**2 = 0.36`, `0.8**2 = 0.64`), and `np.sum` adds them: `0.36 + 0.64 = 1.0`. That confirms `state` is a validly normalized qubit — its total probability is exactly 1. Doing this with a plain list would require `sum(x**2 for x in state)`, which works but doesn't scale to the matrix operations the next lessons need (`@`, `.T`, `np.linalg.eig`) — those simply don't exist on a `list`.

## Fixed dtype and contiguous memory — why NumPy is fast and consistent

A Python list can hold mixed types (`[1, "two", 3.0]`) because each element is a separate Python object with its own type tag. An `np.array` instead commits to one `dtype` (e.g. `float64`, `complex128`) for the whole array and stores the raw numbers in one contiguous memory block:

```python
a = np.array([1, 2, 3])
print(a.dtype)       # int64 (or int32 on some platforms)

b = np.array([1, 2, 3.5])
print(b.dtype)       # float64 -- NumPy "upcasts" the whole array

c = np.array([1, 2j])
print(c.dtype)       # complex128 -- needed for Pauli-Y and other complex gates
```

This matters for quantum work specifically: amplitudes are often complex numbers, and NumPy's `complex128` dtype lets an entire state vector or gate matrix carry real and imaginary parts together, with every arithmetic operator already understanding how to combine them correctly.

## When a plain list is still fine

Not everything needs to be an array. If you're just collecting lesson names, qubit labels, or file paths — anything you're not doing arithmetic on — a list is simpler and has no real downside. Reach for `np.array` specifically when you need elementwise math, linear algebra, or a fixed numeric dtype; reach for `list` for everything else.

## Key terms

| Term | Meaning |
|---|---|
| `np.array` | NumPy's core data structure: a fixed-dtype, contiguous grid of numbers that supports element-wise and linear-algebra operations |
| Element-wise operation | An operation applied independently to each matching pair of entries (e.g. `arr + b` adds position 0 to position 0, position 1 to position 1, ...) |
| `dtype` | The single data type (e.g. `int64`, `float64`, `complex128`) that every element in an array shares |
| Vectorization | Applying an operation to a whole array at once via NumPy's compiled internals, instead of looping in Python |
| Upcasting | NumPy automatically promoting an array to a wider type (e.g. `int` to `float`) when the data requires it |

## Check yourself

You write `probs = [0.25, 0.25, 0.5]` as a plain Python list, then try `probs * 100` expecting each probability converted to a percentage. What actually happens, why, and what one-line change makes `probs * 100` do what you intended?
