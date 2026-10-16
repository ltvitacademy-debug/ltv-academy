# Lesson 6 — Control Flow: Conditions & Loops

**Chapter 1 · Python for Data Engineers · Lesson 6 of 48**

## What you'll learn

- `if` / `elif` / `else` — branching based on a condition
- `for` loops — processing every row in a batch of data
- `while` loops — repeating until a condition changes
- `break` and `continue` — controlling a loop's flow
- Validating a batch of real order records, row by row

## if / elif / else

A conditional runs different code depending on whether an expression is
`True` or `False`:

```python
quantity = -1

if quantity > 0:
    print("Valid quantity")
elif quantity == 0:
    print("Zero quantity — nothing ordered")
else:
    print("Invalid: negative quantity")
```

Python checks each condition top to bottom and runs the first branch
that's `True`, then skips the rest — `elif` and `else` are optional,
but `else` is your catch-all for "none of the above." Look back at
`orders.csv`: order 1014 has `quantity = -1`, which is exactly the case
this `else` branch is written to catch.

## for loops — processing a batch

A `for` loop runs its body once for each item in a collection — this is
how you'll process every row of real data, starting now and for the
rest of this course:

```python
orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99},
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1014, "quantity": -1, "unit_price": 22.00},
]

for row in orders:
    if row["quantity"] <= 0:
        print(f"Order {row['order_id']}: SKIPPED — invalid quantity {row['quantity']}")
        continue   # skip the rest of this iteration, move to the next row

    if row.get("status") == "Cancelled":
        print(f"Order {row['order_id']}: SKIPPED — cancelled")
        continue

    total = row["quantity"] * row["unit_price"]
    print(f"Order {row['order_id']}: ${total:.2f}")
```

`continue` jumps straight to the next item in the loop, skipping
whatever code comes after it for the current one. This pattern — check
a condition, `continue` past bad rows, otherwise process the row — is
the backbone of real-world data validation, and you'll formalize it
with proper exception handling in Chapter 3.

## range() — looping a fixed number of times

When you need to loop a specific number of times rather than over a
collection, use `range()`:

```python
for i in range(5):
    print("Processing batch number", i)   # prints 0, 1, 2, 3, 4
```

`range(5)` produces `0, 1, 2, 3, 4` — five values, starting at `0`,
never reaching `5`. You'll use this for things like retry attempts
("try up to 3 times") once you reach API work in Chapter 3.

## while loops — repeating until something changes

A `while` loop keeps running as long as its condition stays `True`.
It's the right tool when you don't know in advance how many times
you'll need to repeat — like retrying a failed connection:

```python
attempts = 0
connected = False

while not connected and attempts < 3:
    attempts += 1
    print(f"Attempt {attempts}: trying to connect...")
    if attempts == 3:          # pretend the connection succeeds on the 3rd try
        connected = True

print("Connected:", connected, "after", attempts, "attempts")
```

`attempts < 3` is the condition — the loop keeps going as long as it's
`True`. Forgetting to change the condition inside the loop (here,
`attempts += 1`) is the classic way to write an infinite loop, so
always double check that something inside the loop moves you toward
the exit condition.

## break — exiting a loop early

`break` stops a loop immediately, regardless of its condition:

```python
order_ids = [1001, 1002, 1004, 1006, 1008]
target = 1004

for order_id in order_ids:
    if order_id == target:
        print("Found it:", order_id)
        break   # no need to keep checking the rest
    print("Checking:", order_id)
```

Once the target is found, there's no reason to keep looping — `break`
exits immediately, instead of wastefully checking every remaining
item.

## Key terms

| Term | Meaning |
|---|---|
| `if` / `elif` / `else` | Runs different code depending on which condition is `True` |
| `for` loop | Runs its body once per item in a collection |
| `while` loop | Runs its body as long as a condition stays `True` |
| `range(n)` | Produces `0, 1, ..., n-1` — for looping a fixed number of times |
| `continue` | Skips the rest of the current iteration, moves to the next |
| `break` | Exits the loop immediately |

## Lab

Validate a full batch of order rows, printing a clear reason for every
row that's skipped:

```python
orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1005, "quantity": 3, "unit_price": 45.25, "status": "Shipped"},
    {"order_id": 1008, "quantity": 1, "unit_price": 129.99, "status": "Returned"},
    {"order_id": 1014, "quantity": -1, "unit_price": 22.00, "status": "Shipped"},
]

valid_total = 0.0
skipped_count = 0

for row in orders:
    if row["quantity"] <= 0:
        print(f"Order {row['order_id']}: skipped — invalid quantity")
        skipped_count += 1
        continue
    if row["status"] in ("Cancelled", "Returned"):
        print(f"Order {row['order_id']}: skipped — status is {row['status']}")
        skipped_count += 1
        continue

    valid_total += row["quantity"] * row["unit_price"]

print(f"\nValid revenue: ${valid_total:.2f}")
print(f"Rows skipped: {skipped_count}")
```

## Check yourself

Without looking back: what's the difference between what `continue`
does and what `break` does inside a loop? And why is a `for` loop the
right tool for processing a batch of order rows, while a `while` loop
is the right tool for something like a retry attempt?
