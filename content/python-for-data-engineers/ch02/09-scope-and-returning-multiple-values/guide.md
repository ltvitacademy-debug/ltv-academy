# Lesson 9 — Scope & Returning Multiple Values

**Chapter 2 · Python for Data Engineers · Lesson 9 of 48**

## What you'll learn

- Scope: where a variable is visible, and where it isn't
- Local vs. global variables, and why functions shouldn't reach for
  globals
- Returning more than one value from a function, as a tuple
- Unpacking multiple return values into separate variables

## Local scope — variables live inside their function

A variable created inside a function only exists inside that function.
Once the function finishes, that variable is gone:

```python
def calculate_total(quantity, unit_price):
    line_total = quantity * unit_price   # local to this function
    return line_total

result = calculate_total(2, 129.99)
print(result)          # 259.98 — fine, this is the returned value

# print(line_total)    # NameError: line_total only exists inside calculate_total
```

`line_total` is a **local variable** — it's created when the function
runs and destroyed when the function returns. That's a feature, not a
limitation: it means two different functions can both use a variable
named `line_total` internally without stepping on each other.

## Global scope — variables defined outside any function

A variable defined at the top level of your script is **global** — it
can be read from inside a function:

```python
tax_rate = 0.08   # global

def calculate_total_with_tax(subtotal):
    return round(subtotal * (1 + tax_rate), 2)   # reads the global tax_rate

print(calculate_total_with_tax(100))   # 108.0
```

Reading a global from inside a function works fine. But *modifying* a
global from inside a function is a well-known source of bugs, because
it makes a function's behavior depend on, and silently change, state
that lives outside it — which makes the function harder to test and
harder to reason about in isolation:

```python
total_processed = 0   # global

def process_order_BAD(amount):
    global total_processed
    total_processed += amount   # modifying a global — avoid this pattern
    return amount

# Better: return the value, and let the caller decide what to do with it
def process_order_GOOD(amount):
    return amount

total_processed = 0
for amount in [259.98, 249.50]:
    total_processed += process_order_GOOD(amount)   # caller manages the running total
print(total_processed)
```

The `global` keyword exists and you'll see it in other people's code,
but the better habit — used throughout this course — is to have a
function return a value and let the caller decide what to do with it,
rather than having the function quietly reach out and change something
outside itself.

## Returning multiple values

A function can return more than one value at once, by returning a
tuple (you saw this briefly in Lesson 4):

```python
def validate_order(row):
    """Return (is_valid, reason) — reason is None when the order is valid."""
    if row["quantity"] <= 0:
        return False, "invalid quantity"
    if row.get("status") in ("Cancelled", "Returned"):
        return False, f"status is {row['status']}"
    return True, None

row = {"order_id": 1014, "quantity": -1, "unit_price": 22.00, "status": "Shipped"}
is_valid, reason = validate_order(row)

if not is_valid:
    print(f"Order {row['order_id']} rejected: {reason}")
```

`return False, "invalid quantity"` packs both values into a tuple
behind the scenes — `(False, "invalid quantity")`. On the calling side,
`is_valid, reason = validate_order(row)` **unpacks** that tuple into
two separate variables in one line. This is a much more useful pattern
than Lesson 7's `is_valid_order()`, which only answered *whether* a row
was valid — this version also tells you *why* it wasn't, which is
exactly the kind of detail you'll want to log once you reach proper
error handling in Chapter 3.

## Unpacking three or more values

The same pattern scales to any number of returned values:

```python
def summarize_order(row):
    """Return (order_id, total, is_valid) as a 3-value tuple."""
    total = round(row["quantity"] * row["unit_price"], 2)
    is_valid = row["quantity"] > 0
    return row["order_id"], total, is_valid

order_id, total, is_valid = summarize_order(
    {"order_id": 1006, "quantity": 4, "unit_price": 22.00}
)
print(order_id, total, is_valid)   # 1006 88.0 True
```

## Key terms

| Term | Meaning |
|---|---|
| Local variable | Exists only inside the function where it's created |
| Global variable | Defined at the top level of a script; readable (but shouldn't usually be modified) from inside functions |
| Scope | The region of code where a variable is visible |
| Unpacking | Assigning a tuple's values to multiple variables in one line: `a, b = (1, 2)` |

## Lab

Write a `validate_order` function returning `(is_valid, reason)`, and
use it across a small batch, printing a reason for every rejected row:

```python
def validate_order(row):
    """Return (is_valid, reason)."""
    if row["quantity"] <= 0:
        return False, "invalid quantity"
    if row.get("status") in ("Cancelled", "Returned"):
        return False, f"status is {row['status']}"
    return True, None

orders = [
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1008, "quantity": 1, "unit_price": 129.99, "status": "Returned"},
    {"order_id": 1014, "quantity": -1, "unit_price": 22.00, "status": "Shipped"},
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
]

for row in orders:
    is_valid, reason = validate_order(row)
    if is_valid:
        print(f"Order {row['order_id']}: OK")
    else:
        print(f"Order {row['order_id']}: REJECTED — {reason}")
```

## Check yourself

Without looking back: why does `line_total` disappear once
`calculate_total()` finishes running, and what would happen if you
tried to print it afterward? And why is `return False, "invalid
quantity"` more useful to a caller than a function that can only
return `True` or `False`?
