# Variables, Types & Control Flow

Every data analysis you will ever write is built from three ideas: storing a value under a name, knowing what kind of value it is, and making decisions or repeating work based on it. This lesson covers those ideas in Python, using a tiny retail example so each one has a job to do.

If you know T-SQL, you already understand variables, data types, `CASE` expressions, and loops of a kind. Python's versions are simpler in some ways: there is no `DECLARE`, no `@` prefix, and you do not state a type up front. You just assign.

## What you'll learn

- How to create variables and read their types
- The core types: `int`, `float`, `str`, `bool`, and `None`
- How to format text with f-strings
- How to branch with `if`, `elif`, and `else`
- How to repeat work with `for` and `while` loops
- A few type gotchas that trip up data work

## Variables and types

A variable is a name pointing at a value. You create it by assigning with `=`:

```python
customer = "Ada"
orders = 12
avg_order = 48.5
is_active = True

print(type(customer), type(orders), type(avg_order), type(is_active))
```

The output is `<class 'str'> <class 'int'> <class 'float'> <class 'bool'>`. Python decides the type from the value, and a variable can be reassigned to a different type later, so it pays to know what each name currently holds.

Arithmetic works as you would expect, with three division-related operators worth memorizing:

```python
total = orders * avg_order      # 582.0
print(7 / 2, 7 // 2, 7 % 2)     # 3.5 3 1
```

`/` always gives a float, `//` is floor division (drop the remainder), and `%` gives the remainder. Notice `total` is `582.0`, not `582`: multiplying an `int` by a `float` produces a `float`.

Strings can be built cleanly with an **f-string**, a string starting with `f` where `{}` holds an expression and an optional format:

```python
print(f"{customer} spent {total:.2f} across {orders} orders")
# Ada spent 582.00 across 12 orders
```

`:.2f` means "a float with two decimal places", which you will use constantly when reporting money.

## `None`, and truthiness

`None` is Python's way of saying "no value here", similar to `NULL` in SQL. Test for it with `is None`, not `== None`.

Python also treats some values as false in conditions: `0`, an empty string, an empty list, and `None`. Everything else is true. `bool(0)`, `bool("")`, and `bool([])` are all `False`, while `bool("a")` is `True`.

## Making decisions

An `if` statement runs a block only when a condition holds. The block is defined by **indentation**, four spaces by convention, not by braces:

```python
if total > 500:
    tier = "gold"
elif total > 200:
    tier = "silver"
else:
    tier = "bronze"
```

Python checks the conditions top to bottom and runs the first one that is true. With `total` at 582.0 this assigns `"gold"`. This is the Python cousin of a T-SQL `CASE WHEN` expression.

## Repeating work

A `for` loop walks through a collection one item at a time:

```python
totals = [20.0, 55.5, 130.0]
running = 0
for t in totals:
    running += t
    print(t, running)
```

This prints `20.0 20.0`, then `55.5 75.5`, then `130.0 205.5`. When you also need the position, wrap the collection in `enumerate`, which gives you `(index, item)` pairs; `enumerate(totals, start=1)` counts from 1 instead of 0. The `range(3)` function generates `0, 1, 2`. A `while` loop repeats as long as a condition stays true, so make sure something inside it changes the condition. Two keywords control loops: `break` exits immediately and `continue` skips to the next item.

In data work you will often replace explicit loops with vectorized operations in NumPy and pandas, which are faster and shorter. But loops remain the clearest way to express step-by-step logic, and you will read plenty of them.

## Gotchas worth knowing now

```python
print(0.1 + 0.2 == 0.3)            # False
print(round(0.1 + 0.2, 2) == 0.3)  # True
print("5" + "5", int("5") + 5)     # 55 10
```

Floats are stored in binary, so `0.1 + 0.2` is actually `0.30000000000000004`. Never compare floats with `==`; round first or use a tolerance. And `+` on two strings concatenates them rather than adding numbers, which is exactly the bug you get when a number column is read in as text. Convert with `int()` or `float()`.

## Recap

- Assign with `=`; check types with `type()`.
- Core types: `int`, `float`, `str`, `bool`, `None`.
- Branch with `if/elif/else`, loop with `for` and `while`, and let indentation define blocks.
- Beware float comparisons and string-versus-number mix-ups.
- Next lesson: functions and comprehensions.
