# Lesson 7 — Writing Functions

**Chapter 2 · Python for Data Engineers · Lesson 7 of 48**

## What you'll learn

- Why functions exist: reusable, testable, named blocks of logic
- Defining a function with `def`, parameters, and `return`
- Docstrings — documenting what a function does
- Turning the repeated validation logic from Lesson 6 into real,
  reusable functions

## Why functions matter

Look back at Lesson 6's lab: the validation logic (`quantity <= 0`,
`status in ("Cancelled", "Returned")`) was written once, inline, inside
a loop. That's fine for a five-row example. But in a real pipeline,
you'd want to run that exact same check in multiple places — once
while loading data, maybe again before writing it out — and copy-pasted
logic is logic that drifts out of sync the moment you fix a bug in one
copy but forget the other. A function fixes that: write the logic once,
give it a name, and call it from anywhere.

## Defining a function

```python
def calculate_line_total(quantity, unit_price):
    return quantity * unit_price

total = calculate_line_total(2, 129.99)
print(total)   # 259.98
```

`def` starts a function definition, followed by a name, then the
parameters in parentheses — `quantity` and `unit_price` are the inputs
this function expects. `return` sends a value back to whoever called
the function. Once defined, you call it by name with real values
(called *arguments*), exactly like you've been calling `len()` or
`print()` all along — those are functions too, just ones Python
provides for you.

## A function with no return value

Not every function needs to hand back a value — sometimes the point is
just an action, like printing:

```python
def print_order_summary(order_id, customer_name, total):
    print(f"Order {order_id} ({customer_name}): ${total:.2f}")

print_order_summary(1001, "Dana Whitfield", 259.98)
```

A function with no explicit `return` implicitly returns `None` — worth
knowing, because trying to use its result (`result = print_order_summary(...)`)
would give you `None`, not an error, which can be a confusing bug if
you don't expect it.

## Turning Lesson 6's validation into a function

This is the real payoff. Instead of inline checks scattered through a
loop, wrap the logic in a function with a clear name and a clear
answer:

```python
def is_valid_order(row):
    """Return True if an order row should be counted as valid revenue."""
    if row["quantity"] <= 0:
        return False
    if row.get("status") in ("Cancelled", "Returned"):
        return False
    return True

orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1014, "quantity": -1, "unit_price": 22.00, "status": "Shipped"},
]

for row in orders:
    if is_valid_order(row):
        print(f"Order {row['order_id']}: valid")
    else:
        print(f"Order {row['order_id']}: invalid, skipping")
```

The text in triple quotes right under `def is_valid_order(row):` is a
**docstring** — a special comment describing what the function does,
its parameters, and what it returns. Unlike a regular `#` comment,
tools (and other developers) can read a docstring programmatically —
it's the standard way to document a function in Python, and you should
get in the habit of writing one for any function whose purpose isn't
obvious from its name alone.

## A function that returns a computed value, used immediately

```python
def calculate_line_total(quantity, unit_price):
    """Return quantity * unit_price, rounded to 2 decimal places."""
    return round(quantity * unit_price, 2)

orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99},
    {"order_id": 1006, "quantity": 4, "unit_price": 22.00},
]

grand_total = 0
for row in orders:
    grand_total += calculate_line_total(row["quantity"], row["unit_price"])

print(f"Grand total: ${grand_total:.2f}")
```

`round(value, 2)` rounds a number to 2 decimal places — useful here to
guard against floating-point math producing something like
`259.9800000001` instead of a clean `259.98`.

## Key terms

| Term | Meaning |
|---|---|
| `def` | Keyword that begins a function definition |
| Parameter | A named input a function expects, listed in its parentheses |
| Argument | The actual value passed in when calling a function |
| `return` | Sends a value back to the caller; ends the function |
| Docstring | A triple-quoted string right under `def ...:` documenting the function |

## Lab

Write two functions and use them together on a small batch of orders:

```python
def is_valid_order(row):
    """Return True if quantity is positive and status isn't Cancelled/Returned."""
    if row["quantity"] <= 0:
        return False
    if row.get("status") in ("Cancelled", "Returned"):
        return False
    return True

def calculate_line_total(quantity, unit_price):
    """Return quantity * unit_price, rounded to 2 decimal places."""
    return round(quantity * unit_price, 2)

orders = [
    {"order_id": 1005, "quantity": 3, "unit_price": 45.25, "status": "Shipped"},
    {"order_id": 1008, "quantity": 1, "unit_price": 129.99, "status": "Returned"},
    {"order_id": 1013, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
]

valid_revenue = 0
for row in orders:
    if is_valid_order(row):
        valid_revenue += calculate_line_total(row["quantity"], row["unit_price"])

print(f"Valid revenue: ${valid_revenue:.2f}")
```

## Check yourself

Without looking back: what does a function return if it has no
explicit `return` statement? And why is wrapping validation logic in a
named function better than repeating the same `if` checks inline every
place you need them?
