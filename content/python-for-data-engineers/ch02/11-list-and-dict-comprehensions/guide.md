# Lesson 11 — List & Dict Comprehensions

**Chapter 2 · Python for Data Engineers · Lesson 11 of 48**

## What you'll learn

- List comprehensions — building a new list from an existing one, in
  a single readable line
- Adding a filter condition to a comprehension
- Dict comprehensions — the same idea, producing a dictionary
- Why this pattern matters: it's the same filter/transform logic
  you'll apply to real record batches throughout this course

## The problem a comprehension solves

You already know how to build a new list by looping and appending:

```python
orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1005, "quantity": 3, "unit_price": 45.25, "status": "Shipped"},
]

shipped_ids = []
for row in orders:
    if row["status"] == "Shipped":
        shipped_ids.append(row["order_id"])

print(shipped_ids)   # [1001, 1005]
```

That's four lines to express a simple idea: "give me the order IDs
where status is Shipped." A list comprehension expresses the exact
same logic in one line.

## List comprehensions

```python
shipped_ids = [row["order_id"] for row in orders if row["status"] == "Shipped"]
print(shipped_ids)   # [1001, 1005]
```

Read it left to right: "`row["order_id"]` — for each `row` in `orders`
— if `row["status"] == "Shipped"`." It's the same three ingredients as
the loop above (the loop variable, the collection, the condition),
just written on one line, with the transformation (`row["order_id"]`)
stated first. This is the exact pattern the task brief calls out as
foundational: **filtering and transforming a list of dict-shaped
records** — which is precisely the shape every real record you'll
process in this course takes, from a CSV row to a JSON API response.

A comprehension without a filter, just transforming every item:

```python
line_totals = [row["quantity"] * row["unit_price"] for row in orders]
print(line_totals)   # [259.98, 129.99, 135.75]
```

## When to use a comprehension vs. a regular loop

A comprehension is great for a simple transform-and-filter that
produces a new list. Once the logic needs multiple steps, multiple
conditions, or side effects (like printing or logging each row), a
regular `for` loop is clearer — don't force a complicated comprehension
just to save lines. A good rule of thumb: if you can say what you want
in one sentence ("the order IDs where status is Shipped"), it's
probably a good candidate for a comprehension.

## Dict comprehensions

The same idea, but building a dictionary instead of a list, using
`{key_expr: value_expr for item in collection}`:

```python
order_totals_by_id = {
    row["order_id"]: round(row["quantity"] * row["unit_price"], 2)
    for row in orders
}
print(order_totals_by_id)
# {1001: 259.98, 1004: 129.99, 1005: 135.75}
```

This is a genuinely useful real pattern: turning a list of records into
a dictionary keyed by ID gives you instant lookups by key, instead of
looping through the whole list every time you need one record —
`order_totals_by_id[1001]` is immediate, where searching a list for
the row with `order_id == 1001` would mean scanning it.

A dict comprehension with a filter works the same way as a list
comprehension's:

```python
shipped_totals_by_id = {
    row["order_id"]: round(row["quantity"] * row["unit_price"], 2)
    for row in orders
    if row["status"] == "Shipped"
}
print(shipped_totals_by_id)
# {1001: 259.98, 1005: 135.75}
```

## Key terms

| Term | Meaning |
|---|---|
| List comprehension | `[expr for item in collection if condition]` — builds a new list in one line |
| Dict comprehension | `{key: value for item in collection if condition}` — builds a new dict |
| Filter condition | The optional `if ...` part of a comprehension, keeping only matching items |

## Lab

Given a batch of order rows, build three results using comprehensions:
a list of valid order IDs, a list of valid line totals, and a dict
mapping order ID to total — for shipped orders only:

```python
orders = [
    {"order_id": 1001, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
    {"order_id": 1004, "quantity": 1, "unit_price": 129.99, "status": "Cancelled"},
    {"order_id": 1005, "quantity": 3, "unit_price": 45.25, "status": "Shipped"},
    {"order_id": 1008, "quantity": 1, "unit_price": 129.99, "status": "Returned"},
    {"order_id": 1013, "quantity": 2, "unit_price": 129.99, "status": "Shipped"},
]

shipped_ids = [row["order_id"] for row in orders if row["status"] == "Shipped"]
shipped_totals = [
    round(row["quantity"] * row["unit_price"], 2)
    for row in orders
    if row["status"] == "Shipped"
]
totals_by_id = {
    row["order_id"]: round(row["quantity"] * row["unit_price"], 2)
    for row in orders
    if row["status"] == "Shipped"
}

print("Shipped order IDs:", shipped_ids)
print("Shipped totals:", shipped_totals)
print("Totals by ID:", totals_by_id)
print("Revenue for order 1005:", totals_by_id[1005])
```

## Check yourself

Without looking back: what are the three parts of a list comprehension,
in the order you write them? And why is `{row["order_id"]: total for
row in orders}` more useful for repeated lookups than keeping `orders`
as a plain list?
