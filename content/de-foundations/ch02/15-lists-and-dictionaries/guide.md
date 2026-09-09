# Lesson 15 — Lists and Dictionaries

**Chapter 2 · Python for Data Engineers · Lesson 15 of 62**

## What you'll learn

- **Lists** — ordered collections, indexed by position
- **Dictionaries** — key-value collections, indexed by name
- Why a list of dictionaries is basically a tiny table — and exactly
  what Lesson 24's JSON data actually looks like in Python

## Lists — ordered, indexed by position

A **list** holds multiple values in order, accessed by a zero-based
index:

```python
fare_amounts = [14.50, 9.75, 22.00, 8.25]

print(fare_amounts[0])      # 14.50 — the first element
print(fare_amounts[-1])     # 8.25  — the last element
fare_amounts.append(11.00)  # adds a new element at the end
print(len(fare_amounts))    # 5
```

Lists are **mutable** — you can add, remove, or change elements after
creating one, which is exactly what `.append()` just did.

## Dictionaries — key-value pairs

A **dictionary** holds values accessed by a name (a **key**) instead of
a position:

```python
trip = {
    "VendorID": "2",
    "passenger_count": 1,
    "fare_amount": 14.50,
}

print(trip["fare_amount"])       # 14.50
trip["tip_amount"] = 3.00        # adds a new key
```

This should look familiar — it's structurally identical to the JSON
object from Lesson 8. That's not a coincidence: Lesson 24 (Processing
JSON) reads a JSON object and hands you back exactly this kind of
dictionary, automatically.

## A list of dictionaries: a tiny table

Put the two together, and you get something that looks a lot like rows
in a table — which is exactly what it is:

```python
trips = [
    {"VendorID": "2", "passenger_count": 1, "fare_amount": 14.50},
    {"VendorID": "1", "passenger_count": 3, "fare_amount": 9.75},
]

for trip in trips:
    print(trip["fare_amount"])
```

This pattern — a list of dictionaries, each one representing one row —
is exactly what Lesson 22 gets back from reading a JSON file full of
records, and it's conceptually what Lesson 21's Pandas DataFrame
formalizes into something far more powerful.

## Key terms

| Term | Meaning |
|---|---|
| List | An ordered collection, accessed by position (index) |
| Dictionary | A key-value collection, accessed by name (key) |
| Mutable | Can be changed after creation — add, remove, update elements |
| List of dictionaries | The Python shape of a table's rows, and of parsed JSON records |

## Lab

```python
trips = [
    {"VendorID": "2", "passenger_count": 1, "fare_amount": 14.50},
    {"VendorID": "1", "passenger_count": 3, "fare_amount": 9.75},
    {"VendorID": "2", "passenger_count": 2, "fare_amount": 22.00},
]

total = 0
for trip in trips:
    total = total + trip["fare_amount"]

print("Total fares:", total)
```

Run this and confirm you get `46.25` — you're doing Lesson 17's loops a
lesson early, on exactly the data shape this lesson just introduced.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what's
the difference between accessing a list element and a dictionary value,
and why does a list of dictionaries look like a table?
