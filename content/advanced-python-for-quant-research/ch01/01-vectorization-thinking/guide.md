# Vectorization Thinking

You already know what a NumPy array is and that pandas is built on top of one. This lesson is about a mental habit, not a new function: when you sit down to process a column or an array, the first question should be "what's the vectorized way to say this?" rather than "how do I loop over it?" That shift is the single biggest performance lever you have in quantitative Python code, usually worth more than any library swap.

## What you'll learn

- Why `.iterrows()` and row-wise `.apply()` are slow, and roughly how much slower
- How to rewrite common loop patterns as array/Series operations
- Vectorized string operations (`.str`) and vectorized boolean logic
- `np.where` and `np.select` as vectorized if/elif/else
- When a loop is genuinely still the right tool

## Why `.iterrows()` is a trap

`.iterrows()` looks innocent — it reads like plain English — but it reconstructs a new `Series` for every row, boxing each value in a Python object along the way. On a DataFrame with a few hundred thousand rows, that overhead dominates the runtime of whatever math you're actually trying to do.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({"price": np.random.uniform(10, 500, 200_000),
                    "qty": np.random.randint(1, 100, 200_000)})

# Slow: Python-level loop, one Series built per row
total = 0.0
for _, row in df.iterrows():
    total += row["price"] * row["qty"]

# Fast: vectorized, stays in compiled code the whole way
total_vec = (df["price"] * df["qty"]).sum()
```

On a typical laptop the loop version takes on the order of seconds; the vectorized version takes milliseconds. `.apply(axis=1)` is marginally better than `.iterrows()` but still calls a Python function once per row — it is not vectorized, just a tidier loop in disguise.

## Rewriting loops as array operations

The pattern is almost always the same: replace "for each element, compute X" with "compute X for the whole column." A few common rewrites:

```python
# Loop version: flag rows where return exceeds 2 standard deviations
flags = []
for r in df_returns["ret"]:
    flags.append(abs(r) > 2 * df_returns["ret"].std())

# Vectorized version
threshold = 2 * df_returns["ret"].std()
flags_vec = df_returns["ret"].abs() > threshold
```

```python
# Loop version: bucket a price into a tier
def tier(p):
    if p < 50:
        return "low"
    elif p < 200:
        return "mid"
    return "high"

df["tier"] = df["price"].apply(tier)   # still row-by-row

# Vectorized version with np.select
conditions = [df["price"] < 50, df["price"] < 200]
choices = ["low", "mid"]
df["tier_vec"] = np.select(conditions, choices, default="high")
```

`np.select` evaluates each condition array once, over the whole column, and picks the matching choice — it is the vectorized equivalent of an if/elif/elif/else chain. For a simple two-way branch, `np.where(cond, a, b)` is the lighter-weight cousin.

## Vectorized string operations

pandas exposes vectorized string methods through the `.str` accessor. They look like regular Python string methods but run across the whole Series at once instead of in a loop:

```python
tickers = pd.Series(["aapl us equity", "MSFT US Equity", " googl us equity "])

clean = tickers.str.strip().str.upper().str.replace(" EQUITY", "", regex=False)
print(clean.tolist())
# ['AAPL US', 'MSFT US', 'GOOGL US']

is_us = clean.str.endswith("US")
print(is_us.tolist())   # [True, True, True]
```

Chaining `.str` calls stays vectorized the whole way; dropping into a list comprehension with `.strip()` on each element one at a time (`[t.strip() for t in tickers]`) gives the same result but loses the speed and the readability.

## Vectorized boolean logic

Combine boolean Series with `&`, `|`, and `~` — not Python's `and`, `or`, `not`, which only work on single values, not arrays. Parentheses matter because of operator precedence:

```python
mask = (df["price"] > 100) & (df["qty"] < 50) | ~df["tier_vec"].eq("low")
df.loc[mask, "flagged"] = True
```

Boolean masks compose like SQL `WHERE` clauses: each comparison produces an array of `True`/`False`, and `&`/`|`/`~` combine those arrays elementwise.

## When a loop is still correct

Vectorization is not a religion. A loop is the right tool when each step depends on the *previous computed result* and there's no clean closed-form or built-in rolling operation for it — for example, a stateful simulation where tomorrow's value depends on today's simulated value, not just today's input data. pandas and NumPy have built-ins for most "depends on the previous row" patterns (`cumsum`, `cumprod`, `shift`, `ewm`), so reach for those first; write a real loop (or, as you'll see in Chapter 3, a Numba-compiled one) only once you've confirmed nothing vectorized covers it.

## Key terms

| Term | Meaning |
|---|---|
| Vectorization | Expressing a computation as whole-array operations instead of a per-element Python loop |
| `.iterrows()` | A DataFrame method that yields each row as a `Series`; correct but slow at scale |
| `.str` accessor | Namespace for vectorized, Series-wide string methods |
| `np.where` / `np.select` | Vectorized two-way / multi-way conditional selection |
| Boolean mask | An array of `True`/`False` used to filter or combine conditions with `&`, `|`, `~` |

## Recap

Loops that process a DataFrame or array one element at a time are almost always the slowest available option, because each step pays Python's per-object overhead. Rewriting those loops as array operations — comparisons, `.str` methods, `np.where`/`np.select` — keeps the work inside compiled code and is usually both faster and shorter to read. Next lesson: the broadcasting rules and memory layout that make these vectorized operations work.
