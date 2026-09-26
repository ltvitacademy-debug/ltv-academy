# Functions & Comprehensions

Once you have written the same three lines a second time, it is time for a function. Data work is full of small repeated operations: add tax to a price, clean a name, flag a large order. A **function** gives that operation a name, so you can reuse it, test it, and read it. A **comprehension** is Python's compact way of building a new list (or dictionary, or set) from an existing one, and you will see it in nearly every piece of data code.

## What you'll learn

- How to define functions with parameters, defaults, and return values
- How to return more than one value
- How to build lists with list comprehensions, including filters and conditions
- How dictionary comprehensions work
- When a short `lambda` function is useful

## Defining a function

A function starts with `def`, a name, parameters in parentheses, and an indented body. The `return` statement sends a value back to the caller:

```python
def add_tax(price, rate=0.08):
    return round(price * (1 + rate), 2)

print(add_tax(50))              # 54.0
print(add_tax(50, rate=0.10))   # 55.0
```

`rate=0.08` is a **default value**: if the caller omits it, Python uses 0.08. You can pass arguments by position or by name; naming them (`rate=0.10`) makes calls easier to read, especially when a function has several parameters. Put a short description on the first line of the body inside triple quotes, called a **docstring**, and tools will show it as help text:

```python
def margin(revenue, cost):
    """Return profit as a fraction of revenue."""
    return (revenue - cost) / revenue

print(margin(200, 150))   # 0.25
```

## Returning several values

A function can return more than one value; Python packs them into a tuple, which you can unpack on the spot:

```python
def order_stats(totals):
    return min(totals), max(totals), sum(totals) / len(totals)

lo, hi, avg = order_stats([20.0, 55.5, 130.0, 8.25])
print(lo, hi, round(avg, 2))    # 8.25 130.0 53.44
```

A common beginner mistake is forgetting `return`. A function without one still runs, but it hands back `None`. If `def no_return(x): x * 2` is called as `no_return(3)`, the result is `None`, because the doubled value was computed and thrown away.

## List comprehensions

Here is the loop version of "apply tax to every total":

```python
totals = [20.0, 55.5, 130.0, 8.25]
with_tax = []
for t in totals:
    with_tax.append(add_tax(t))
```

And here is the comprehension version, one line that says the same thing:

```python
with_tax = [add_tax(t) for t in totals]
print(with_tax)   # [21.6, 59.94, 140.4, 8.91]
```

Read it as: "an `add_tax(t)` for each `t` in `totals`". The general shape is `[expression for item in items if condition]`. The optional `if` filters which items are kept:

```python
big = [t for t in totals if t > 20]
print(big)        # [55.5, 130.0]
```

To choose between two values for each item, put a conditional expression at the front, before the `for`:

```python
labels = ["big" if t > 50 else "small" for t in totals]
print(labels)     # ['small', 'big', 'big', 'small']
```

Note the difference: an `if` at the end filters items out; an `if ... else` at the front transforms every item.

## Dictionary comprehensions

The same idea works with curly braces and a `key: value` pair. This one cleans messy names and records each name's length:

```python
names = ["  ada ", "GRACE", "Linus "]
lookup = {n.strip().title(): len(n.strip()) for n in names}
print(lookup)     # {'Ada': 3, 'Grace': 5, 'Linus': 5}
```

Keep comprehensions short. If one needs more than about one line of thinking, a regular loop is the kinder choice for the next reader.

## Lambda: a throwaway function

A `lambda` is a one-expression function with no name. It is most useful as a `key` argument when sorting:

```python
orders = [("Ada", 55.5), ("Grace", 8.25), ("Linus", 130.0)]
print(sorted(orders, key=lambda o: o[1], reverse=True))
# [('Linus', 130.0), ('Ada', 55.5), ('Grace', 8.25)]
```

That sorts the orders by their second element, the amount, largest first. You will meet the same pattern again in pandas when you apply small functions to columns.

## Recap

- `def` names a piece of logic; defaults make parameters optional; forgetting `return` gives back `None`.
- A comprehension is `[expression for item in items if condition]`.
- Dict comprehensions use `{key: value for ...}`, and `lambda` covers tiny one-off functions.
- Next lesson: the core data structures, lists, tuples, dictionaries, and sets.
