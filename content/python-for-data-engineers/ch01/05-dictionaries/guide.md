# Lesson 5 — Dictionaries

**Chapter 1 · Python for Data Engineers · Lesson 5 of 48**

## What you'll learn

- Dictionaries: key-value pairs — the shape a single real-world record
  actually takes
- Creating, reading, updating, and checking keys in a dict
- `.get()` — reading a key safely, with a default, instead of crashing
- Nested dictionaries, and lists of dictionaries (a "table" in memory)

## Why dictionaries matter more than any other type in this course

Every data format you'll touch starting in Chapter 3 — a JSON API
response, a row pulled from a database, a record in a pipeline — is
naturally key-value shaped. A dictionary is Python's native way to
represent exactly that: one record, with named fields, instead of a
list where you have to remember that index `2` happens to mean
"customer name."

```python
order = {
    "order_id": 1001,
    "customer_name": "Dana Whitfield",
    "region": "West",
    "quantity": 2,
    "unit_price": 129.99,
    "status": "Shipped",
}

print(order["customer_name"])   # Dana Whitfield
print(order["quantity"] * order["unit_price"])   # 259.98
```

Compare this to Lesson 3's `fields[2]` from a split line — `order["customer_name"]`
is self-documenting. Anyone reading the code (including future you)
knows exactly what's being accessed, without needing to count commas.

## Reading, updating, and adding keys

```python
order["status"] = "Delivered"          # update an existing key
order["tracking_number"] = "1Z999AA1"  # add a new key

print(order)
```

Dictionaries are mutable — you can change them freely after creation,
the same way lists are.

## .get() — reading safely

Accessing a key that doesn't exist with `order["missing_key"]` raises a
`KeyError` and crashes your script. That's dangerous once you're
processing real records, where not every row has every field — look
back at `orders.csv`, where customer 504's `customer_name` is blank.
`.get()` solves this by returning a default instead of crashing:

```python
discount_code = order.get("discount_code")        # None — key doesn't exist, no error
discount_code = order.get("discount_code", "NONE")  # "NONE" — explicit default instead

print(discount_code)
```

Use `.get()` any time you're reading a field that might legitimately be
missing from a real record — which, once you're parsing files and API
responses starting in Chapter 3, is most of the time.

## Checking for a key, and looping over a dict

```python
if "tracking_number" in order:
    print("Has tracking:", order["tracking_number"])

for key, value in order.items():
    print(key, "->", value)
```

`.items()` gives you both the key and the value together in a loop —
you'll use this constantly once you're validating or transforming
records field by field.

## A list of dictionaries — your first "table" in memory

This is the pattern that everything from Chapter 4's pandas onward
builds on: a list, where each item is a dictionary representing one
row. It's exactly the shape of `orders.csv`, just living in Python
instead of a file:

```python
orders = [
    {"order_id": 1001, "customer_name": "Dana Whitfield", "quantity": 2, "unit_price": 129.99},
    {"order_id": 1002, "customer_name": "Marcus Ibeh", "quantity": 1, "unit_price": 249.50},
    {"order_id": 1004, "customer_name": "Priya Nandan", "quantity": 1, "unit_price": 129.99},
]

for row in orders:
    total = row["quantity"] * row["unit_price"]
    print(f"Order {row['order_id']}: ${total:.2f}")
```

This small block — a list of dicts, looped over, with a calculation
per row — is the mental model for almost every pipeline you'll build
in this course, long before you ever import pandas.

## Key terms

| Term | Meaning |
|---|---|
| Dictionary (`dict`) | Key-value pairs — `{"key": value, ...}` |
| Key | The name used to look up a value, like `"customer_name"` |
| `.get(key, default)` | Reads a key safely, returning `default` if missing, instead of raising an error |
| `KeyError` | Raised by `dict["missing_key"]` when the key doesn't exist |
| `.items()` | Returns key-value pairs together, for looping |

## Lab

Build a small in-memory "table" from three rows of `orders.csv`, and
compute each row's total safely even if a field is missing:

```python
orders = [
    {"order_id": 1005, "customer_name": None, "quantity": 3, "unit_price": 45.25},
    {"order_id": 1006, "customer_name": "Elena Marsh", "quantity": 4, "unit_price": 22.00},
    {"order_id": 1008, "customer_name": "Oren Castillo", "quantity": 1, "unit_price": 129.99, "status": "Returned"},
]

for row in orders:
    name = row.get("customer_name") or "UNKNOWN CUSTOMER"
    total = row["quantity"] * row["unit_price"]
    status = row.get("status", "Shipped")
    print(f"Order {row['order_id']} ({name}): ${total:.2f} — {status}")
```

Notice `row.get("customer_name") or "UNKNOWN CUSTOMER"` — this handles
both a missing key *and* a key present but set to `None`, which is
exactly order 1005's real situation from `orders.csv`.

## Check yourself

Without looking back: why is `order.get("field")` safer than
`order["field"]` when processing real records? And why does a list of
dictionaries make a more natural "table" than a list of plain lists?
