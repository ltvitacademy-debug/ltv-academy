# Lesson 15 — Working With JSON

**Chapter 3 · Python for Data Engineers · Lesson 15 of 48**

## What you'll learn

- `json.dumps()`/`json.loads()` (strings) vs. `json.dump()`/`json.load()`
  (files) — four names that trip people up until you see them side by side
- Converting this course's `orders.csv` into real JSON, and reading it back
- Building a nested JSON structure (orders grouped by customer) —
  something a flat CSV can't represent at all
- Why numbers that started in a CSV are still strings in your JSON
  unless you convert them first

## From CSV rows to a JSON file

```python
import csv
import json

with open("orders.csv", newline="") as f:
    reader = csv.DictReader(f)
    orders = list(reader)

with open("orders.json", "w") as f:
    json.dump(orders, f, indent=2)
```

`orders` is a list of 20 dictionaries — exactly what `csv.DictReader`
gave you in Lesson 14. `json.dump()` writes that list straight to a
file as JSON; `indent=2` makes the output human-readable instead of
one unbroken line. The first record in `orders.json` now looks like:

```json
[
  {
    "order_id": "1001",
    "customer_id": "501",
    "customer_name": "Dana Whitfield",
    "region": "West",
    "product": "Trail Runner GTX",
    "category": "Footwear",
    "quantity": "2",
    "unit_price": "129.99",
    "order_date": "2026-01-03",
    "status": "Shipped"
  },
```

Notice `"quantity": "2"` and `"unit_price": "129.99"` are quoted —
still strings. `csv.DictReader` never converted them to numbers, so
`json.dump()` had no numbers to write either. JSON *can* represent
real numbers (`"quantity": 2`, no quotes) — but only if you convert the
value in Python first, before dumping it.

## Reading JSON back: json.load()

```python
with open("orders.json") as f:
    loaded_orders = json.load(f)

print(len(loaded_orders))
print(loaded_orders[0]["customer_name"])
```

```
20
Dana Whitfield
```

`json.load()` is the mirror of `json.dump()` — it parses a file's
JSON text back into Python lists and dicts. If you only have a JSON
*string* already in memory (say, from an API response body, which
you'll see in Lesson 17) you'd use `json.loads()` instead — the `s`
stands for "string", and it's the pattern to remember: the file
versions (`dump`/`load`) take a file object; the string versions
(`dumps`/`loads`) take or return a string.

## Building a nested structure: orders grouped by customer

A flat CSV can't express "one customer, many orders" without
repeating that customer's name on every row — which is exactly what
`orders.csv` does. JSON can nest, so you can reshape it:

```python
from collections import defaultdict

by_customer = defaultdict(list)
for order in orders:
    by_customer[order["customer_id"]].append(order)

print(json.dumps(by_customer["501"], indent=2))
```

```json
[
  {
    "order_id": "1001",
    "customer_id": "501",
    "customer_name": "Dana Whitfield",
    ...
    "product": "Trail Runner GTX",
    ...
  },
  {
    "order_id": "1003",
    ...
    "product": "Summit Daypack 22L",
    ...
  },
  {
    "order_id": "1018",
    ...
    "product": "Insulated Bottle 1L",
    ...
  }
]
```

Customer `501` is Dana Whitfield, and she has exactly three orders in
this dataset (`1001`, `1003`, `1018`) — `defaultdict(list)` collects
them under her `customer_id` without you having to check whether the
key already exists first. This time `json.dumps()` (the string
version) is used just to pretty-print the result to the terminal,
since there's nothing to save to a file.

## Key terms

| Term | Meaning |
|---|---|
| `json.dump(obj, f)` | Writes a Python object as JSON to an open file |
| `json.load(f)` | Reads JSON from an open file back into a Python object |
| `json.dumps(obj)` | Converts a Python object to a JSON **string** (no file) |
| `json.loads(s)` | Parses a JSON **string** into a Python object (no file) |
| `indent=2` | Pretty-prints JSON output with 2-space indentation |

## Lab

Using the `orders` list you built from `orders.csv`, write a script
that groups orders by `region` instead of `customer_id`, and saves the
result to `orders_by_region.json`:

```python
by_region = defaultdict(list)
for order in orders:
    by_region[order["region"]].append(order)

with open("orders_by_region.json", "w") as f:
    json.dump(by_region, f, indent=2)
```

Open the resulting file and confirm it has exactly four top-level
keys — `"West"`, `"East"`, `"South"`, `"North"` — and that `"West"`'s
list contains 7 orders.

## Check yourself

Without looking back: what's the actual difference between
`json.dump()` and `json.dumps()`? And why are the numbers in
`orders.json` still stored as quoted strings, even though JSON
supports real numbers?
