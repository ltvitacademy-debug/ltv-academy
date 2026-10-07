# Floating-Point Arithmetic & Numerical Stability

Chapter 2 shifts from data wrangling to numerical computing — the math itself, and the ways computers represent it imperfectly. Every `float64` in NumPy or pandas is an approximation, not an exact value, and the gap between "the number you meant" and "the number the computer stored" is the source of some of the most confusing bugs in quantitative code: a backtest that "should" sum to zero but doesn't, or a Sharpe ratio that changes slightly depending on summation order. This lesson covers IEEE-754 basics, where approximation bites, and the tools to compare floats correctly.

## What you'll learn

- The IEEE-754 double-precision format and why decimals like 0.1 can't be stored exactly
- Machine epsilon, and what it tells you about the smallest meaningful gap between floats
- Catastrophic cancellation: subtracting nearly-equal numbers and losing precision
- Why summation order changes the result, and `math.fsum` / `np.add.reduce` as fixes
- Comparing floats correctly with `np.isclose` / `np.allclose`
- A brief look at condition numbers

## IEEE-754 in one paragraph

A `float64` stores a number as a sign bit, an 11-bit exponent, and a 52-bit mantissa — effectively a fraction times a power of two. That representation is exact for integers and for fractions that are sums of powers of two (0.5, 0.25, 0.125), but most decimal fractions, including 0.1, aren't sums of powers of two and can only be approximated:

```python
print(0.1 + 0.2)              # 0.30000000000000004
print(0.1 + 0.2 == 0.3)       # False
```

This is not a pandas or NumPy quirk — it is true in every language that uses IEEE-754 doubles, which is almost all of them. The number stored for `0.1` is the closest `float64` value to 0.1, not 0.1 itself, and arithmetic on that approximation accumulates small errors.

## Machine epsilon

**Machine epsilon** is the smallest gap between 1.0 and the next representable `float64`. It sets the scale of relative floating-point error you should expect from a single operation:

```python
import numpy as np
print(np.finfo(np.float64).eps)   # 2.220446049250313e-16
```

A single arithmetic operation typically introduces relative error on the order of epsilon — about 1 part in 4.5 quadrillion. That sounds negligible, and for one operation it is. The problem is that errors can compound across millions of operations (a long backtest, an iterative solver), and certain operations amplify small errors dramatically, which is what the rest of this lesson covers.

## Catastrophic cancellation

Subtracting two nearly-equal floating-point numbers can destroy most of the significant digits you started with, because the small *difference* between two large, similar values is dominated by whatever rounding error each one already carried:

```python
a = 1.0000000000001234
b = 1.0000000000001233
print(a - b)        # 1.0658141036401503e-13 -- some digits are just noise
```

Both `a` and `b` individually have about 16 correct significant digits, but their difference has almost none left — the digits that mattered canceled out, and what's left is close to the error margin itself. In quant code this shows up most often in computing a small spread between two large prices, or a return close to zero computed as `(price_t / price_t_minus_1) - 1` when both prices are nearly identical. Where possible, reformulate the computation to avoid subtracting nearly-equal large numbers — compute the difference directly if the data allows it, rather than computing two large quantities and subtracting them afterward.

## Summation order matters

Floating-point addition is not associative — `(a + b) + c` can differ from `a + (b + c)` — because each intermediate addition rounds. Summing a long list of numbers in different orders can give measurably different totals, especially when the values vary widely in magnitude:

```python
values = [1e16, 1.0, -1e16]
print(sum(values))                 # 0.0  -- the 1.0 got rounded away
print(sum(sorted(values)))         # may differ depending on order

import math
print(math.fsum(values))           # 1.0 -- correct, using extended precision internally
```

`math.fsum` tracks the error at each step and corrects for it, giving a correctly-rounded result regardless of input order — useful when you need an exact sum and the standard `sum()` or `.sum()` isn't trustworthy enough. NumPy's `np.add.reduce` (what `.sum()` calls internally) uses pairwise summation for 1-D arrays, which is more accurate than naive left-to-right summation but still not as exact as `fsum`.

## Comparing floats correctly

Because of accumulated rounding error, `==` between two floats that are "mathematically" equal often returns `False`. `np.isclose` and `np.allclose` compare within a tolerance instead:

```python
x = 0.1 + 0.2
print(x == 0.3)                       # False
print(np.isclose(x, 0.3))             # True
print(np.allclose([x, 1.0], [0.3, 1.0 + 1e-12]))  # True
```

The default tolerance combines a relative component (`rtol`, default `1e-5`) and an absolute component (`atol`, default `1e-8`): `|a - b| <= atol + rtol * |b|`. Tighten both when you need stricter correctness checks (e.g. comparing two implementations of the same formula), and widen them when comparing results that went through genuinely different numerical paths (e.g. two different optimizers converging to "the same" answer).

## A brief word on condition numbers

A problem's **condition number** measures how much a small change in the input can be amplified in the output. A well-conditioned problem keeps errors roughly proportional; an ill-conditioned one can blow a tiny rounding error up into a large error in the result. You'll meet this concretely in Lesson 9 when inverting a nearly-singular matrix, but the intuition is the same one from catastrophic cancellation: some computations are inherently more sensitive to the small errors floating-point arithmetic always introduces, regardless of how carefully you write the code.

## Key terms

| Term | Meaning |
|---|---|
| IEEE-754 | The standard binary floating-point format `float64` implements; most decimals are approximations |
| Machine epsilon | Smallest gap between 1.0 and the next representable float; sets the scale of per-operation error |
| Catastrophic cancellation | Precision loss from subtracting two nearly-equal numbers |
| `math.fsum` | Correctly-rounded summation regardless of input order, using extended internal precision |
| `np.isclose` / `np.allclose` | Compare floats within a tolerance instead of exact equality |
| Condition number | How much a problem amplifies small input errors into output errors |

## Recap

Every `float64` is an approximation, and operations like subtracting nearly-equal numbers or summing in different orders can amplify that approximation into meaningful error — always compare floats with `np.isclose`/`np.allclose`, never `==`. Next lesson: SciPy, the library that builds a huge amount of numerical machinery — optimization, statistics, signal processing, sparse matrices — on top of this same floating-point foundation.
