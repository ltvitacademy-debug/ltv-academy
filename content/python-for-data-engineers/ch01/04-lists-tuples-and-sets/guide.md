# Lesson 4 — Lists, Tuples & Sets

**Chapter 1 · Python for Data Engineers · Lesson 4 of 48**

## What you'll learn

- Lists: ordered, mutable collections — your main tool for holding
  many rows of data
- Tuples: ordered, immutable collections — useful for a fixed record
  that shouldn't change
- Sets: unordered collections of unique values — how you deduplicate
- When to reach for each one, with real order data

## Lists — ordered and changeable

A list holds multiple values in order, and you can add, remove, or
change them after creation:

```python
line_totals = [259.98, 249.50, 79.00]

line_totals.append(129.99)     # add a new total to the end
print(line_totals)              # [259.98, 249.50, 79.00, 129.99]

print(line_totals[0])           # 259.98 — first item, index 0
print(line_totals[-1])          # 129.99 — last item, negative indexing
print(len(line_totals))         # 4 — how many items
```

Negative indexing (`[-1]` for the last item) comes up constantly once
you're working with real batches of records — it's the normal way to
grab "the most recent one" without knowing exactly how many there are.

Lists can hold any type, including other collections — which is how
you'll represent a whole batch of orders once you reach dictionaries in
Lesson 5:

```python
customer_names = ["Dana Whitfield", "Marcus Ibeh", "Priya Nandan"]
for name in customer_names:
    print(name)
```

(You'll cover `for` loops properly in Lesson 6 — this is just a preview
of why lists and loops go together.)

## Tuples — ordered and fixed

A tuple looks like a list but uses parentheses, and once created, it
can't be changed:

```python
order_record = (1001, "Dana Whitfield", "Shipped")

print(order_record[0])    # 1001
# order_record[0] = 9999  # TypeError: 'tuple' object does not support item assignment
```

Why would you want something you *can't* change? Because it signals
intent: a tuple says "this is a fixed, complete record — not a
work-in-progress list I'm still building." A common real use is
returning more than one value from a function, which you'll do
constantly starting in Lesson 9:

```python
def min_and_max(values):
    return min(values), max(values)   # returns a tuple: (min, max)

lowest, highest = min_and_max([259.98, 249.50, 79.00])
print(lowest, highest)   # 79.0 259.98
```

## Sets — unique, unordered values

A set automatically removes duplicates and has no guaranteed order.
It's the right tool whenever the question is "what are the distinct
values here":

```python
customer_ids = [501, 502, 501, 503, 502, 501]   # repeated customer IDs from orders.csv

unique_customers = set(customer_ids)
print(unique_customers)          # {501, 502, 503} — order not guaranteed
print(len(unique_customers))     # 3 — exactly 3 distinct customers placed these orders
```

This is a real, common data-engineering question: "how many *distinct*
customers are in this batch of orders?" — not how many order rows, but
how many unique customers. Counting `len(customer_ids)` would give you
6 (the number of orders); `len(set(customer_ids))` gives you 3 (the
number of actual customers), which is usually the number you want.

Sets also support fast membership checks:

```python
regions_we_ship_to = {"West", "East", "South", "North"}
print("West" in regions_we_ship_to)      # True
print("Overseas" in regions_we_ship_to)  # False
```

## Choosing the right one

| You need to... | Use |
|---|---|
| Hold a batch of rows, possibly adding/removing | List |
| Represent one fixed record, or return multiple values from a function | Tuple |
| Find distinct values, or check membership quickly | Set |

## Key terms

| Term | Meaning |
|---|---|
| List | Ordered, mutable collection — `[item1, item2, ...]` |
| Tuple | Ordered, immutable collection — `(item1, item2, ...)` |
| Set | Unordered collection of unique values — `{item1, item2, ...}` |
| `.append()` | Adds an item to the end of a list |
| `len()` | Returns the number of items in a collection |
| `in` | Checks membership — `value in collection` |

## Lab

Using the customer IDs from `orders.csv` (`501, 502, 501, 503, 504,
505, 502, 506, 507, 503, 508, 505, 509, 502, 510, 506, 511, 501, 512,
513`), write a script that:

```python
customer_ids = [501, 502, 501, 503, 504, 505, 502, 506, 507, 503,
                508, 505, 509, 502, 510, 506, 511, 501, 512, 513]

total_orders = len(customer_ids)
unique_customers = set(customer_ids)
distinct_customer_count = len(unique_customers)

print("Total orders:", total_orders)
print("Distinct customers:", distinct_customer_count)
print("Did customer 501 order more than once?", customer_ids.count(501) > 1)
```

`.count(value)` tells you how many times a value appears in a list —
confirm the numbers make sense against the raw list above.

## Check yourself

Without looking back: why would `len()` of a list of customer IDs give
a different, usually larger, number than `len()` of a set made from
that same list? And why might you choose a tuple over a list for a
single order record you don't plan to modify?
