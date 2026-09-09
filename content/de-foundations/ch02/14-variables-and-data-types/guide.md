# Lesson 14 — Variables and Data Types

**Chapter 2 · Python for Data Engineers · Lesson 14 of 62**

## What you'll learn

- How Python variables work — no type declaration, no fuss
- The five core data types you'll use constantly in this course
- How to check a value's type with `type()`
- Real examples using this course's NYC Taxi columns

## Assigning a variable

Python variables need no declaration keyword and no upfront type —
just a name, an equals sign, and a value:

```python
fare_amount = 14.50
passenger_count = 1
vendor_id = "2"
```

Python figures out the type from the value itself. This is called
**dynamic typing** — the variable isn't locked to a type the way it
would be in some other languages; it just holds whatever type its
current value happens to be.

## The five core types

| Type | Example | A real NYC Taxi column |
|---|---|---|
| `int` | `1`, `4`, `-3` | `passenger_count` |
| `float` | `14.50`, `2.9` | `fare_amount`, `trip_distance` |
| `str` | `"2"`, `"yellow"` | `VendorID` (yes, stored as text in the raw file) |
| `bool` | `True`, `False` | `store_and_fwd_flag` after you convert it |
| `NoneType` | `None` | A missing `fare_amount` before you handle it (Lesson 51) |

```python
fare_amount = 14.50           # float
passenger_count = 1           # int
vendor_id = "2"                # str
is_shared_ride = False         # bool
tip_amount = None              # NoneType — genuinely missing, not zero
```

## Checking a type

```python
print(type(fare_amount))       # <class 'float'>
print(type(passenger_count))   # <class 'int'>
```

`type()` is how you confirm what Python actually decided a value's type
is — useful the moment something behaves unexpectedly, which happens
constantly once you start reading real files in Lesson 22.

## Why `None` isn't the same as zero or an empty string

`None` means **genuinely absent** — no value was ever recorded. A
`fare_amount` of `0.0` means the fare was recorded as zero dollars; a
`fare_amount` of `None` means nothing was recorded at all. Confusing the
two is a real, common data engineering bug, and Lesson 51 (Null
Handling) deals with exactly this distinction in Spark specifically.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic typing | A variable's type comes from its current value, not a declaration |
| `int` / `float` | Whole numbers / decimal numbers |
| `str` | Text |
| `bool` | `True` or `False` |
| `None` | Genuinely absent — not zero, not empty |

## Lab

Open a Python file or interactive shell and run:

```python
fare_amount = 14.50
passenger_count = 1
vendor_id = "2"
tip_amount = None

for value in [fare_amount, passenger_count, vendor_id, tip_amount]:
    print(value, "->", type(value))
```

Confirm the printed types match what you'd expect for each.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
does dynamic typing mean, and why is `None` different from `0` or `""`?
