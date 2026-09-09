# Lesson 18 — Functions

**Chapter 2 · Python for Data Engineers · Lesson 18 of 62**

## What you'll learn

- `def` — packaging logic into a reusable, named block
- Parameters, return values, and default parameter values
- Turning Lesson 16's inline validation logic into a real function
- Why this matters: every PySpark transformation in Chapter 4 is really
  just calling functions

## Defining a function

```python
def is_valid_fare(fare_amount):
    if fare_amount <= 0:
        return False
    return True

print(is_valid_fare(14.50))   # True
print(is_valid_fare(-5.00))   # False
```

`def` names the function, `(fare_amount)` names its **parameter** — the
value it expects to be given — and `return` sends a value back to
whoever called it. Once defined, you can call `is_valid_fare(...)` as
many times as you want, on as many different values as you want,
without ever rewriting the logic inside it.

## Multiple parameters, and default values

```python
def is_valid_trip(fare_amount, passenger_count, min_fare=0.01):
    if fare_amount < min_fare:
        return False
    if passenger_count <= 0:
        return False
    return True

print(is_valid_trip(14.50, 1))              # True — min_fare defaults to 0.01
print(is_valid_trip(0.00, 1))               # False
print(is_valid_trip(0.00, 1, min_fare=0))   # True — explicit override
```

`min_fare=0.01` gives that parameter a **default value** — callers can
leave it out entirely and get the default, or override it explicitly.

## Refactoring Lesson 16's inline logic into a function

Compare this to Lesson 17's inline validation:

```python
def is_valid_trip(trip):
    if trip["fare_amount"] <= 0:
        return False
    if trip["passenger_count"] <= 0:
        return False
    return True

trips = [
    {"fare_amount": 14.50, "passenger_count": 1},
    {"fare_amount": -5.00, "passenger_count": 1},
    {"fare_amount": 9.75, "passenger_count": 0},
]

valid_trips = [trip for trip in trips if is_valid_trip(trip)]
print(len(valid_trips))   # 1
```

Same logic as Lesson 17's loop, but now it's a named, reusable,
independently testable piece — call `is_valid_trip` from anywhere, on
any trip, without duplicating the rule.

## Why this matters for Chapter 4's PySpark

Every PySpark transformation — `.filter()`, `.withColumn()`, `.select()`
— is fundamentally "call a function, get a result back," often passing
in a function of your own. Getting comfortable with `def`, parameters,
and `return` now is directly preparing you for that.

## Key terms

| Term | Meaning |
|---|---|
| `def` | Defines a new, named function |
| Parameter | A named input a function expects |
| Return value | What a function hands back to its caller |
| Default value | A parameter's value if the caller doesn't provide one |

## Lab

```python
def is_valid_trip(fare_amount, passenger_count):
    return fare_amount > 0 and passenger_count > 0

trips = [
    (14.50, 1),
    (-5.00, 1),
    (9.75, 0),
    (22.00, 2),
]

valid_count = 0
for fare, passengers in trips:
    if is_valid_trip(fare, passengers):
        valid_count = valid_count + 1

print("Valid trips:", valid_count)
```

Confirm you get `2`.

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what's
a default parameter value, and why does turning inline logic into a
function actually help?
