# Lesson 16 — Conditions

**Chapter 2 · Python for Data Engineers · Lesson 16 of 62**

## What you'll learn

- `if` / `elif` / `else` — Python's decision-making structure
- Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
- Boolean operators (`and`, `or`, `not`) for combining conditions
- A real validation example using this course's taxi data

## if / elif / else

```python
fare_amount = -5.00

if fare_amount < 0:
    print("Invalid: negative fare")
elif fare_amount == 0:
    print("Warning: zero fare")
else:
    print("Valid fare")
```

Python checks each condition top to bottom, runs the first one that's
`True`, and skips the rest entirely — `elif` and `else` are both
optional, and you can chain as many `elif`s as you need.

## Comparison operators

| Operator | Meaning |
|---|---|
| `==` | Equal to |
| `!=` | Not equal to |
| `<`, `>` | Less than, greater than |
| `<=`, `>=` | Less than or equal to, greater than or equal to |

A common mistake: `=` assigns a value, `==` compares two values. Mixing
them up is one of the most common early Python errors.

## Combining conditions with and / or / not

```python
passenger_count = 0
fare_amount = 14.50

if passenger_count == 0 and fare_amount > 0:
    print("Suspicious: fare charged with no passengers")

if fare_amount < 0 or passenger_count < 0:
    print("Invalid: negative value somewhere")

if not (fare_amount > 0):
    print("Fare is zero or negative")
```

`and` requires both sides to be `True`; `or` requires at least one side;
`not` flips a condition's truth value entirely.

## A real validation example

This is exactly the logic Lesson 27's mini ETL and Chapter 4's PySpark
cleaning lessons build on:

```python
def is_valid_trip(fare_amount, passenger_count, trip_distance):
    if fare_amount <= 0:
        return False
    if passenger_count <= 0:
        return False
    if trip_distance <= 0:
        return False
    return True

print(is_valid_trip(14.50, 1, 2.3))   # True
print(is_valid_trip(-5.00, 1, 2.3))   # False
```

(Lesson 18 covers `def` and functions properly — for now, just notice
the pattern: a condition per business rule, checked in sequence.)

## Key terms

| Term | Meaning |
|---|---|
| `if` / `elif` / `else` | Branching logic — run different code depending on a condition |
| `==` vs `=` | Comparison vs. assignment — a very common typo |
| `and` / `or` / `not` | Combine or invert boolean conditions |

## Lab

```python
trips = [
    {"fare_amount": 14.50, "passenger_count": 1},
    {"fare_amount": -5.00, "passenger_count": 1},
    {"fare_amount": 9.75, "passenger_count": 0},
]

for trip in trips:
    if trip["fare_amount"] <= 0:
        print("Invalid fare:", trip)
    elif trip["passenger_count"] <= 0:
        print("Invalid passenger count:", trip)
    else:
        print("Valid trip:", trip)
```

Run this and confirm each of the three trips gets correctly classified.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what's
the difference between `and` and `or`, and what's the most common typo
involving `==`?
