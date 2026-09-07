# Lesson 5 — Lists & Dictionaries

**Chapter 2 · Python Fundamentals · Lesson 5 of 20**

## What you'll learn

- Lists — an ordered collection you access by position
- Dictionaries — a collection you access by name, not position
- Why this matters specifically for Pandas, not just Python in general
- Just enough of each to read and write real data-cleaning code

## Lists: ordered, accessed by position

A **list** holds multiple values in order, in square brackets, separated
by commas:

```python
products = ["Widget A", "Widget B", "Widget C"]
```

Access an item by its position — called its **index** — also in square
brackets. Counting starts at `0`, not `1`, and `-1` always means "the last
item," which saves you from having to know the list's exact length:

```python
print(products[0])
# Widget A

print(products[-1])
# Widget C
```

Add a new item to the end with `.append()`, and check how many items a
list holds with `len()`:

```python
products.append("Widget D")
print(products)
# ['Widget A', 'Widget B', 'Widget C', 'Widget D']

print(len(products))
# 4
```

## Dictionaries: accessed by name, not position

A **dictionary** pairs each value with a name — called a **key** — instead
of a position, in curly braces:

```python
customer = {"name": "Alex Rivera", "region": "West", "total_orders": 12}
```

Access a value by its key, not a position number:

```python
print(customer["name"])
# Alex Rivera

print(customer["region"])
# West
```

Update a value by assigning to its key directly — no `.append()` needed,
since a dictionary isn't ordered the way a list is:

```python
customer["total_orders"] = 13
print(customer)
# {'name': 'Alex Rivera', 'region': 'West', 'total_orders': 13}
```

## Why this matters for Pandas specifically

You won't spend this whole course writing lists and dictionaries by hand —
but you need to *recognize* them, because Pandas is built entirely out of
these two shapes. A Pandas **Series** (Lesson 7) behaves like a list with
labels attached. A Pandas **DataFrame** behaves like a dictionary of lists,
one list per column. Every time Lesson 7 onward shows you a DataFrame,
you're looking at lists and dictionaries wearing a table's clothing.

## Key terms

| Term | Meaning |
|---|---|
| List | An ordered collection, accessed by position (index), in `[ ]` |
| Index | A position in a list — counting starts at `0` |
| Dictionary | A collection of key-value pairs, accessed by name, in `{ }` |
| Key | The name used to look up a value in a dictionary |
| `.append()` | Adds a new item to the end of a list |

## Lab

1. Create a list of three product names, then print the first and last
   items using index positions.
2. Add a fourth product with `.append()`, then print the list's length
   with `len()`.
3. Create a dictionary describing one customer — name, region, and total
   orders — then update the total orders value and print the result.

## Check yourself

You're ready for Lesson 6 when you can explain, in one sentence each, the
difference between how you access a value in a list versus a dictionary —
and why that distinction matters once real DataFrames show up in Lesson 7.
