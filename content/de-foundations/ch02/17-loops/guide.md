# Lesson 17 — Loops

**Chapter 2 · Python for Data Engineers · Lesson 17 of 62**

## What you'll learn

- `for` loops — doing something to every item in a list
- `while` loops — repeating until a condition stops being true
- `break` and `continue` — controlling a loop mid-flight
- Combining loops with Lesson 16's conditions on real trip data

## for loops — one item at a time

```python
fare_amounts = [14.50, 9.75, 22.00, 8.25]

for fare in fare_amounts:
    print(fare)
```

`for` walks through a list (or anything iterable) one item at a time,
running the loop body once per item, with `fare` taking on each value in
turn. This is the loop you'll use constantly — processing one row at a
time is most of what a data engineering script actually does.

## while loops — repeat until a condition changes

```python
count = 0
total = 0
fares = [14.50, 9.75, 22.00]

while count < len(fares):
    total = total + fares[count]
    count = count + 1

print(total)
```

`while` keeps running as long as its condition stays `True` — useful
when you don't know in advance how many times you'll need to loop (for
example, reading from an API a page at a time until there's no more
data, in Lesson 23).

## break and continue

```python
for fare in [14.50, -5.00, 9.75, -2.00]:
    if fare < 0:
        continue          # skip this one, keep going
    print("Processing:", fare)

for fare in [14.50, 9999.00, 9.75]:
    if fare > 1000:
        break             # stop the loop entirely
    print("Processing:", fare)
```

`continue` skips the rest of the current iteration and moves to the
next one; `break` stops the loop entirely, right where it is.

## Loops and conditions together: a real pattern

This is Lesson 16's validation logic, now actually applied to every
trip in a list — precisely what Lesson 27's mini ETL does at scale:

```python
trips = [
    {"fare_amount": 14.50, "passenger_count": 1},
    {"fare_amount": -5.00, "passenger_count": 1},
    {"fare_amount": 9.75, "passenger_count": 0},
]

valid_trips = []
for trip in trips:
    if trip["fare_amount"] <= 0:
        continue
    if trip["passenger_count"] <= 0:
        continue
    valid_trips.append(trip)

print(len(valid_trips))   # 1
```

## Key terms

| Term | Meaning |
|---|---|
| `for` loop | Runs once per item in a list (or anything iterable) |
| `while` loop | Runs as long as a condition stays True |
| `break` | Stops the loop entirely |
| `continue` | Skips to the next iteration |

## Lab

```python
trips = [
    {"fare_amount": 14.50, "passenger_count": 1},
    {"fare_amount": -5.00, "passenger_count": 1},
    {"fare_amount": 9.75, "passenger_count": 0},
    {"fare_amount": 22.00, "passenger_count": 2},
]

valid_trips = []
for trip in trips:
    if trip["fare_amount"] <= 0 or trip["passenger_count"] <= 0:
        continue
    valid_trips.append(trip)

print("Valid trips:", len(valid_trips))
for t in valid_trips:
    print(t)
```

Confirm you get exactly 2 valid trips.

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: when
would you reach for `while` instead of `for`, and what's the difference
between `break` and `continue`?
