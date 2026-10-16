# Lesson 2 — Variables, Data Types & Operators

**Chapter 1 · Python for Data Engineers · Lesson 2 of 48**

## What you'll learn

- Variables: naming values so you can reuse and reason about them
- Python's core data types: `int`, `float`, `str`, `bool`, and `None`
- `type()` — checking what you're actually holding
- Arithmetic, comparison, and logical operators
- Why getting a field's data type right matters the moment you touch
  real records, not just in theory

## Variables are labeled boxes for values

A variable is just a name pointing at a value in memory. In data
engineering, variables usually represent fields from a real record —
not abstract placeholders:

```python
order_id = 1001
customer_name = "Dana Whitfield"
quantity = 2
unit_price = 129.99
```

Python figures out the type from the value you assign — you don't
declare `int order_id` the way you would in some other languages. That
convenience is also the risk: nothing stops you from later assigning
`order_id = "1001"` (a string) by mistake, which is a real and common
source of pipeline bugs, as you'll see below.

## Core data types

```python
order_id = 1001            # int — whole number
unit_price = 129.99        # float — decimal number
customer_name = "Dana Whitfield"   # str — text
in_stock = True            # bool — True or False
discount_code = None       # None — explicitly "no value"
```

Check any of these with `type()`:

```python
print(type(order_id))      # <class 'int'>
print(type(unit_price))    # <class 'float'>
print(type(customer_name)) # <class 'str'>
```

`None` deserves a callout: it's not zero, not an empty string, and not
`False` — it's Python's explicit way of saying "this field has no
value." You'll use it constantly once you're parsing real-world data,
where a field is sometimes just missing (look back at the sample
`orders.csv` row for customer 504 — the `customer_name` field is blank).

## Arithmetic, comparison, and logical operators

```python
quantity = 2
unit_price = 129.99

line_total = quantity * unit_price      # 259.98
print(line_total)

is_large_order = quantity >= 10         # False — comparison operator
is_valid = quantity > 0 and unit_price > 0   # True — logical operator
```

`*`, `+`, `-`, `/` are arithmetic. `==`, `!=`, `<`, `>`, `<=`, `>=` are
comparisons, and always return a `bool`. `and`, `or`, `not` combine
`bool` values — `is_valid` above is only `True` if *both* conditions
hold, which is exactly the kind of check you'll write constantly when
validating incoming data in Chapter 6.

## Why type mix-ups break pipelines

This is the single most common bug new data engineers hit. A field
read from a file or an API often arrives as a string, even when it
looks like a number:

```python
quantity_from_file = "2"      # a string, not an int — common after reading raw text
unit_price = 129.99

# line_total = quantity_from_file * unit_price   # TypeError!
line_total = int(quantity_from_file) * unit_price  # convert first: 259.98
```

`int()`, `float()`, and `str()` convert between types. Multiplying a
string by a float raises a `TypeError` — Python won't silently guess
what you meant. Converting explicitly, with `int(quantity_from_file)`,
is the fix, and it's a pattern you'll use in every lesson from here
through Chapter 3, where you start reading real text files and CSV
rows that arrive as strings by default.

## Key terms

| Term | Meaning |
|---|---|
| Variable | A name bound to a value, reusable throughout your code |
| `int` / `float` | Whole number / decimal number types |
| `str` | Text type |
| `bool` | `True` or `False` |
| `None` | Explicitly "no value," distinct from `0`, `""`, or `False` |
| `type()` | Returns the data type of a value |
| `TypeError` | Raised when an operation is used on an incompatible type, like multiplying a string by a float |

## Lab

Model one row from `orders.csv` as variables, and compute its total:

```python
order_id = 1006
customer_name = "Elena Marsh"
quantity = 4
unit_price = 22.00

line_total = quantity * unit_price
is_valid_order = quantity > 0 and unit_price > 0

print("Order", order_id, "for", customer_name)
print("Line total:", line_total)
print("Valid order:", is_valid_order)
```

Then add a line that simulates a value read from a file as text —
`quantity_text = "4"` — and convert it with `int()` before using it in
the same multiplication. Confirm it gives the same `line_total`.

## Check yourself

Without looking back: why does `"2" * 129.99` raise an error instead of
just working, and what do you do about it? And what's the practical
difference between a field being `None` versus being `0`?
