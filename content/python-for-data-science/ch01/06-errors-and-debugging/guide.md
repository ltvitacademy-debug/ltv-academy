# Errors & Debugging

Every programmer, at every level, spends a large share of their time looking at error messages. The difference between a beginner and an experienced analyst is not that the experienced one sees fewer errors. It is that they read them calmly, know what the common ones mean, and have a routine for tracking down the cause. This lesson gives you that routine and finishes Chapter 1.

## What you'll learn

- How to read a traceback from the bottom up
- What the most common Python exceptions mean
- How to handle expected problems with `try` and `except`
- How to raise your own errors and use `assert` for sanity checks
- A repeatable debugging routine

## Reading a traceback

When Python hits an error it stops and prints a **traceback**: the chain of calls that led to the failure. Here is a small program in which a customer has no orders:

```python
def avg_order(totals):
    return sum(totals) / len(totals)

def report(customers):
    for name, totals in customers.items():
        print(name, avg_order(totals))

report({"Ada": [20.0, 55.5], "Grace": []})
```

Run it and Python prints `Ada 37.75` before failing with a traceback (shortened here; the real one also prints the source line under each entry):

```text
Traceback (most recent call last):
  File "run.py", line 8, in <module>
  File "run.py", line 6, in report
  File "run.py", line 2, in avg_order
ZeroDivisionError: division by zero
```

Read it from the bottom. The last line names the error type and reason. The entries above it are the path Python took, with the most recent call last. The bottom entry is where the error happened; the entries above show how you got there. Here Grace has an empty list, so `len(totals)` is 0. The fix is to handle the empty case, which we will do shortly.

## The usual suspects

Most errors you will meet fall into a handful of types:

| Error | Typical message | Usual cause |
| --- | --- | --- |
| `KeyError` | `'email'` | Dictionary key does not exist |
| `IndexError` | `list index out of range` | Position past the end of a list |
| `TypeError` | `can only concatenate str (not "int") to str` | Wrong type for the operation |
| `ValueError` | `invalid literal for int() with base 10: '12.5'` | Right type, unusable value |
| `NameError` | `name 'undefined_name' is not defined` | Typo, or a notebook cell was not run |
| `AttributeError` | `'str' object has no attribute 'push'` | Method or attribute does not exist |
| `ZeroDivisionError` | `division by zero` | Dividing by 0 |

These messages come from running each case in Python 3.9; wording can differ in newer versions. In a notebook, a `NameError` very often means you skipped a cell or restarted the kernel, which connects back to Lesson 2.

## Handling expected problems with try/except

Sometimes an error is not a bug but a fact of messy data. A column of prices might contain `"n/a"` or blank strings. Wrap the risky step in `try` and catch only the specific error you expect:

```python
raw = ["12.5", "8", "n/a", "", "40"]
clean = []
for r in raw:
    try:
        clean.append(float(r))
    except ValueError:
        print("skipping", repr(r))
print(clean)
# skipping 'n/a'
# skipping ''
# [12.5, 8.0, 40.0]
```

`repr(r)` prints the value with its quotes, which makes empty strings and stray spaces visible. Catch a specific exception such as `ValueError`, not everything at once; a bare `except:` hides real bugs.

## Raising errors and assertions

You can raise an error deliberately when your function receives input it cannot handle. That fixes the earlier problem in an honest way:

```python
def safe_avg(totals):
    if not totals:
        raise ValueError("no orders to average")
    return sum(totals) / len(totals)
```

Now the empty case gives a clear message instead of a mysterious division error. An **assertion** is a one-line sanity check that stays silent when true and raises `AssertionError` when false:

```python
assert safe_avg([10, 20]) == 15   # passes silently
assert safe_avg([10, 20]) == 20   # AssertionError
```

Assertions are a quick way to state what you believe about your data, and they become the seed of real testing in Chapter 7.

## A debugging routine

1. **Read the last line** of the traceback. It names the problem.
2. **Find your own line** by working up through the traceback to your code, not the library's.
3. **Inspect the values.** Add `print(repr(x), type(x))` right before the failing line. Guessing what a variable holds is the most common way to waste an hour.
4. **Shrink the problem.** Reduce the data to the smallest input that still fails.
5. **Use a debugger when printing is not enough.** Python's built-in `breakpoint()` pauses execution so you can look around, and editors such as VS Code have graphical debuggers (check current docs for setup).
6. **Fix, then rerun from a clean state** with Restart Kernel and Run All.

## Recap

- Read tracebacks bottom-up: error type and reason first, then your line.
- Learn the common exceptions: `KeyError`, `TypeError`, `ValueError`, `NameError`, and friends.
- Use `try/except` for expected data problems, `raise` for invalid input, `assert` for sanity checks.
- Next lesson starts Chapter 2, NumPy, with arrays and vectorization.
