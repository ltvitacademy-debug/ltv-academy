# Core Data Structures

A single number or string is rarely useful on its own. Real data comes in collections: a column of prices, a customer with several attributes, a list of orders. Python gives you four built-in structures for holding collections, and each fits a different job. Even though pandas will soon take over most of your day-to-day data handling, these four appear constantly underneath it, and data arriving from APIs and JSON files shows up as exactly these structures.

## What you'll learn

- Lists: ordered, changeable sequences
- Tuples: ordered, fixed sequences
- Dictionaries: labeled values looked up by key
- Sets: unordered collections of unique items
- How a list of dictionaries represents rows of data
- The aliasing trap that surprises everyone once

## Lists

A **list** holds items in order, written in square brackets. You can add to it, change it, and pick out items by position, counting from zero. Negative positions count from the end, and a slice takes a range:

```python
totals = [20.0, 55.5, 130.0, 8.25]
totals.append(42.0)
print(totals[0], totals[-1], totals[1:3])
# 20.0 42.0 [55.5, 130.0]
```

A slice like `[1:3]` includes position 1 and stops before position 3. Handy list methods include `append`, `sort`, and `len(totals)` for the count.

## Tuples

A **tuple** is like a list that cannot be changed after it is created, written in parentheses. Use it for a small fixed group of related values, such as a latitude and longitude:

```python
point = (40.7, -74.0)
lat, lon = point       # unpacking
point[0] = 1           # TypeError: 'tuple' object does not support item assignment
```

Unpacking assigns each element to its own name, which is the same trick you used when a function returned several values. Trying to change a tuple raises a `TypeError`.

## Dictionaries

A **dictionary** stores values under labels, called keys. It is the natural structure for one record, such as a single customer:

```python
customer = {"id": 101, "name": "Ada"}
print(customer["name"])                # Ada
print(customer.get("email"))           # None
print(customer.get("email", "n/a"))    # n/a
customer["email"] = "ada@example.com"  # add or update a key
```

Square brackets raise a `KeyError` if the key is missing. `.get()` returns `None`, or a default you provide, instead, which is safer when data is incomplete. Loop over `customer.items()` to get each key and value together, or use `.keys()` and `.values()`.

## A list of dictionaries is a table

Put dictionaries in a list and you have a table where each dictionary is a row and each key is a column name:

```python
rows = [
    {"name": "Ada", "total": 55.5},
    {"name": "Grace", "total": 8.25},
    {"name": "Linus", "total": 130.0},
]
print([r["name"] for r in rows if r["total"] > 50])   # ['Ada', 'Linus']
print(sum(r["total"] for r in rows))                  # 193.75
```

This shape matters because it is exactly what JSON from a web API looks like once parsed. Chapter 6 covers that, and pandas can turn this structure straight into a DataFrame.

## Sets

A **set** stores each value at most once and does not keep order. It is the quickest way to find the distinct values in a collection and to test membership:

```python
cities = ["ATL", "BOS", "ATL", "DEN"]
print(set(cities), len(set(cities)))
# {'BOS', 'DEN', 'ATL'} 3   (order can vary)
```

Sets also support math: `a & b` for items in both, `a | b` for either, and `a - b` for items only in `a`. That is handy for questions like "which customers bought in both months?"

## The aliasing trap

Assigning a list to a second name does not copy it. Both names point at the same list:

```python
x = [1, 2, 3]
y = x
y.append(4)
print(x)        # [1, 2, 3, 4]
z = x.copy()    # an independent copy
```

Changing `y` also changed `x`. Use `.copy()` when you need a separate list. You will meet the same idea with NumPy views in Chapter 2 and pandas DataFrames in Chapter 3.

## Choosing a structure

- Ordered and changeable: a **list**.
- Fixed group of values: a **tuple**.
- Look things up by name: a **dict**.
- Unique values or overlap questions: a **set**.

## Recap

- Lists, tuples, dicts, and sets each fit a different job.
- A list of dicts is a table in disguise, and it is the shape of JSON data.
- `.get()` avoids `KeyError`; `.copy()` avoids aliasing surprises.
- Next lesson: errors and debugging.
