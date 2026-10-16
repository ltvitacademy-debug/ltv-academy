# Lesson 16 — Exception Handling for Real Pipelines

**Chapter 3 · Python for Data Engineers · Lesson 16 of 48**

## What you'll learn

- `try` / `except` / `else` / `finally`, and what each block is actually for
- Catching specific exception types instead of a bare `except:`
- Using `raise` to turn a silent bad value (like `orders.csv`'s
  negative quantity) into an exception you can catch and log
- Writing a row-by-row CSV processor that survives bad data instead of
  crashing on it

## try/except: catching a specific failure

```python
with open("orders.csv", newline="") as f:
    import csv
    reader = csv.DictReader(f)
    for row in reader:
        try:
            line_total = int(row["quantity"]) * float(row["unit_price"])
        except ValueError as e:
            print(f"Skipping order {row['order_id']}: {e}")
            continue
        print(row["order_id"], line_total)
```

Every row in `orders.csv` actually has numeric-looking `quantity` and
`unit_price` strings, so this particular `except ValueError` branch
never fires here — but it's there because a real export sometimes has
a blank or corrupted numeric field, and `int("")` or `float("N/A")`
raises exactly that `ValueError`. Catching `ValueError` specifically —
not a bare `except:` — means a genuinely different bug (like a typo in
`row["qty"]` raising `KeyError`) still surfaces loudly instead of
getting silently swallowed by the same `except` block.

## raise: turning a bad value into an exception on purpose

`orders.csv` has a row that's numerically valid but **logically**
wrong: order `1014` has `quantity = -1`. `int("-1")` doesn't raise
anything — Python parses it fine. If you want bad business data to
stop a row the same way a bad *type* does, you raise the exception
yourself:

```python
def line_total(row):
    qty = int(row["quantity"])
    price = float(row["unit_price"])
    if qty < 0:
        raise ValueError(f"Negative quantity ({qty}) on order {row['order_id']}")
    return qty * price
```

```python
with open("orders.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            total = line_total(row)
        except ValueError as e:
            print(f"Skipping: {e}")
            continue
        print(row["order_id"], total)
```

```
...
Skipping: Negative quantity (-1) on order 1014
...
```

Now the one row with a real data-entry error is caught by the exact
same `except ValueError` block that would catch a type problem —
`raise` lets your own validation logic plug into Python's normal
error-handling machinery instead of needing a separate `if`/`continue`
scattered through the loop.

## else and finally

```python
processed = 0
skipped = 0

with open("orders.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            total = line_total(row)
        except ValueError as e:
            print(f"Skipping: {e}")
            skipped += 1
        else:
            processed += 1
        finally:
            pass  # a real pipeline might log "row N handled" here

print(f"Processed: {processed}, Skipped: {skipped}")
```

```
Processed: 19, Skipped: 1
```

`else` runs only if the `try` block did **not** raise — it's the
"it succeeded" branch, kept separate from the `try` body so you can
tell at a glance which lines are the risky operation and which are
what happens after it worked. `finally` runs **no matter what** —
exception or not — which is exactly why Lesson 5 for SQL connections
and Lesson 25 of Chapter 2's file-closing pattern both use it: cleanup
code that has to run either way belongs in `finally`.

## Key terms

| Term | Meaning |
|---|---|
| `try` / `except` | Run risky code; catch and handle a specific exception type if it fails |
| `except SomeError as e` | Catches only that exception type, binding the exception object to `e` |
| Bare `except:` | Catches *everything*, including bugs you didn't anticipate — generally avoided |
| `raise` | Triggers an exception on purpose, from your own validation logic |
| `else` (on try) | Runs only if the `try` block succeeded with no exception |
| `finally` | Runs whether or not an exception occurred — for cleanup that must always happen |

## Lab

Write a script that processes every row of `orders.csv`, computing
`quantity * unit_price` for each one, but:

- Skips (with a printed warning) any row with a blank `customer_name`
- Skips (with a printed warning) any row with a negative `quantity`,
  using a `raise`d `ValueError` inside a helper function, caught in the
  loop
- Prints a final count of rows processed vs. skipped, without the
  script ever crashing

You should end up with 18 processed and 2 skipped — orders `1005` and
`1014`, the same two rows this chapter keeps finding.

## Check yourself

Without looking back: what's the difference between the `else` block
on a `try` statement and just putting that code after the `try/except`
with no `else`? And why is catching `ValueError` specifically better
than a bare `except:` in a pipeline that processes a file row by row?
