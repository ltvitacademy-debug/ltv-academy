# Lesson 19 — Exception Handling

**Chapter 2 · Python for Data Engineers · Lesson 19 of 62**

## What you'll learn

- `try` / `except` — catching an error instead of crashing
- Catching **specific** exception types, not just "anything went wrong"
- `finally` — code that runs no matter what
- Why one bad row should never crash an entire data engineering job

## The problem: real data has bad rows

```python
fare_amount_str = "N/A"
fare_amount = float(fare_amount_str)
# ValueError: could not convert string to float: 'N/A'
```

Without handling it, that error **crashes the entire program** — if
this line is inside a loop processing ten thousand rows, one bad row
stops all ten thousand.

## try / except

```python
fare_amount_str = "N/A"

try:
    fare_amount = float(fare_amount_str)
except ValueError:
    print("Could not parse fare amount:", fare_amount_str)
    fare_amount = None
```

Python runs the `try` block; if a `ValueError` happens inside it, control
jumps to `except ValueError` instead of crashing, and the program keeps
going.

## Catching specific exceptions

```python
trip = {"fare_amount": "14.50"}

try:
    fare = float(trip["fare_amount"])
    tip = trip["tip_amount"]      # this key doesn't exist
except KeyError:
    print("Missing expected field")
except ValueError:
    print("Field had the wrong type")
```

Catching the **specific** exception type (`KeyError`, `ValueError`) — not
just a bare `except:` that catches everything — matters because a bare
`except` can accidentally hide a real bug you actually needed to see.
Catch what you expect to go wrong, and let genuinely unexpected errors
surface.

## finally — runs no matter what

```python
try:
    fare_amount = float("N/A")
except ValueError:
    fare_amount = None
finally:
    print("Finished processing this row")
```

The `finally` block runs whether the `try` succeeded, failed, or even if
you `return` in the middle of it — useful for cleanup work (closing a
file, a database connection) that has to happen either way.

## The real pattern: one bad row shouldn't crash the job

```python
raw_fares = ["14.50", "9.75", "N/A", "22.00", "bad-data"]
clean_fares = []

for raw in raw_fares:
    try:
        clean_fares.append(float(raw))
    except ValueError:
        print("Skipping unparseable value:", raw)

print(clean_fares)   # [14.50, 9.75, 22.00]
```

This is exactly the resilience Lesson 27's ETL script (and every real
production pipeline) needs — real files always have a few genuinely bad
rows, and the job's job is to process everything else anyway.

## Key terms

| Term | Meaning |
|---|---|
| `try` / `except` | Catch an error instead of crashing the program |
| `ValueError` | Raised when a value has the right type but the wrong content (like an unparseable number) |
| `KeyError` | Raised when a dictionary key doesn't exist |
| `finally` | Runs no matter what happened in the `try` block |

## Lab

```python
raw_values = ["14.50", "N/A", "9.75", "", "22.00"]
clean_values = []
skipped = 0

for raw in raw_values:
    try:
        clean_values.append(float(raw))
    except ValueError:
        skipped = skipped + 1

print("Clean values:", clean_values)
print("Skipped:", skipped)
```

Confirm you get 3 clean values and 2 skipped.

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why is
catching a specific exception type better than a bare `except:`, and why
does `finally` matter?
