# Lesson 14 — Working With CSV Files

**Chapter 3 · Python for Data Engineers · Lesson 14 of 48**

## What you'll learn

- Why the `csv` module exists instead of just splitting lines on commas
- `csv.reader` (rows as lists) vs. `csv.DictReader` (rows as
  dictionaries keyed by header)
- Using `csv.DictReader` to actually find this course's `orders.csv`
  data problems — not just describe them
- Writing a cleaned-up CSV back out with `csv.DictWriter`

## csv.reader: rows as lists

```python
import csv

with open("orders.csv", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)
    first_row = next(reader)

print(header)
print(first_row)
```

```
['order_id', 'customer_id', 'customer_name', 'region', 'product', 'category', 'quantity', 'unit_price', 'order_date', 'status']
['1001', '501', 'Dana Whitfield', 'West', 'Trail Runner GTX', 'Footwear', '2', '129.99', '2026-01-03', 'Shipped']
```

`csv.reader` correctly handles quoted fields with embedded commas —
the exact case that broke Lesson 13's plain `.split(",")`. The
`newline=""` argument on `open()` is the documented, correct way to
open a file for the `csv` module on every platform; leaving it off can
produce extra blank rows on Windows. Every value still comes back as a
string, even `order_id` and `quantity` — the `csv` module doesn't guess
types for you.

## csv.DictReader: rows as dictionaries

```python
with open("orders.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["customer_name"] == "":
            print("Missing name:", row)
        if int(row["quantity"]) < 0:
            print("Negative quantity:", row)
```

```
Missing name: {'order_id': '1005', 'customer_id': '504', 'customer_name': '', 'region': 'West', 'product': 'Camp Stove Duo', 'category': 'Camping', 'quantity': '3', 'unit_price': '45.25', 'order_date': '2026-01-06', 'status': 'Shipped'}
Negative quantity: {'order_id': '1014', 'customer_id': '502', 'customer_name': 'Marcus Ibeh', 'region': 'East', 'product': 'Insulated Bottle 1L', 'category': 'Accessories', 'quantity': '-1', 'unit_price': '22.00', 'order_date': '2026-01-14', 'status': 'Shipped'}
```

`DictReader` uses the header row as keys automatically, so `row["quantity"]`
is far more readable than `row[6]` from `csv.reader`. This is the first
place in the course you've actually located this dataset's two real
issues in code, instead of just reading about them: order `1005` is
missing a customer name, and order `1014` has a quantity of `-1` — a
data-entry error, since you can't order negative one of something.

## Writing a CSV with csv.DictWriter

```python
with open("orders.csv", newline="") as f_in, \
     open("orders_flagged.csv", "w", newline="") as f_out:

    reader = csv.DictReader(f_in)
    fieldnames = reader.fieldnames + ["issue"]
    writer = csv.DictWriter(f_out, fieldnames=fieldnames)
    writer.writeheader()

    for row in reader:
        row["issue"] = ""
        if row["customer_name"] == "":
            row["issue"] = "missing_customer_name"
        elif int(row["quantity"]) < 0:
            row["issue"] = "negative_quantity"
        writer.writerow(row)
```

`DictWriter` needs an explicit `fieldnames` list — unlike `DictReader`,
it has no CSV to read column names from, so you have to tell it the
column order yourself. `writeheader()` writes that row first, then
`writerow()` writes each dictionary as a row in that same column
order. The result, `orders_flagged.csv`, is the same 20 orders plus one
new column that tags exactly the two problem rows — real output you
could hand to someone else on the data team.

## Key terms

| Term | Meaning |
|---|---|
| `csv.reader` | Reads each row as a plain list of string values |
| `csv.DictReader` | Reads each row as a dict keyed by the header row |
| `newline=""` | Required `open()` argument for correct cross-platform CSV reading/writing |
| `csv.DictWriter` | Writes dicts to a CSV; needs `fieldnames` and a `writeheader()` call |
| `fieldnames` | The column names/order a `DictWriter` uses — set explicitly, not inferred |

## Lab

Using `csv.DictReader` on `orders.csv`, write a script that builds two
separate lists: `clean_rows` (rows with a non-empty `customer_name` AND
a `quantity` of `0` or more) and `bad_rows` (everything else). Print
`len(clean_rows)` and `len(bad_rows)`.

```python
clean_rows = []
bad_rows = []

with open("orders.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row["customer_name"] != "" and int(row["quantity"]) >= 0:
            clean_rows.append(row)
        else:
            bad_rows.append(row)

print(len(clean_rows), len(bad_rows))
```

That should print `18 2` — 18 clean rows, and the same 2 problem rows
(`1005` and `1014`) you found above.

## Check yourself

Without looking back: what's the actual difference between
`csv.reader` and `csv.DictReader`, and why does `DictWriter` need a
`fieldnames` argument when `DictReader` doesn't?
