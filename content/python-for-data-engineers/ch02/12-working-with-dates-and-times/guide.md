# Lesson 12 — Working With Dates & Times

**Chapter 2 · Python for Data Engineers · Lesson 12 of 48**

## What you'll learn

- The `datetime` module, and why dates need their own type instead of
  staying plain strings
- Parsing a date string into a real `datetime` object with
  `strptime()`
- Formatting a `datetime` back into a string with `strftime()`
- Date arithmetic — finding the number of days between two dates
- Why this matters immediately: every row in `orders.csv`, every log
  line, and every API response you'll touch from Chapter 3 onward
  carries a date as text that needs to be parsed exactly this way

## Why a date needs its own type

Look back at `orders.csv` — every `order_date` value, like
`"2026-01-13"`, is just text. Text comparisons work by accident for
same-format dates (`"2026-01-13" > "2026-01-03"` happens to return
`True`), but they break the moment you need something like "how many
days between these two orders," or a date in a different format shows
up. The `datetime` module exists to represent a date as an actual
date — with real calendar math built in, not string tricks.

```python
from datetime import datetime

order_date = datetime(2026, 1, 13)
print(order_date)          # 2026-01-13 00:00:00
print(order_date.year)     # 2026
print(order_date.month)    # 1
print(order_date.day)      # 13
```

`datetime(year, month, day)` builds a date directly. But in real data
engineering work, you almost never construct a date this way by
hand — you're given a date as a string, from a file or an API, and you
need to parse it.

## strptime() — parsing a string into a datetime

`strptime` stands for "string parse time." You give it the string and
a **format code** describing exactly how that string is laid out:

```python
from datetime import datetime

raw_date = "2026-01-13"
order_date = datetime.strptime(raw_date, "%Y-%m-%d")

print(order_date)         # 2026-01-13 00:00:00
print(type(order_date))   # <class 'datetime.datetime'>
```

`%Y` means a 4-digit year, `%m` a 2-digit month, `%d` a 2-digit day —
the format string `"%Y-%m-%d"` matches `"2026-01-13"` piece by piece.
Get the format string wrong (say, the data actually uses `"01/13/2026"`)
and `strptime()` raises a `ValueError` — which is actually useful,
since it tells you immediately that your assumption about the data's
shape was wrong, rather than silently producing garbage.

A timestamp with time included works the same way, with more format
codes:

```python
raw_timestamp = "2026-01-13 14:32:07"
event_time = datetime.strptime(raw_timestamp, "%Y-%m-%d %H:%M:%S")
print(event_time)   # 2026-01-13 14:32:07
```

`%H`, `%M`, `%S` are hour (24-hour), minute, and second. This exact
pattern — parsing a timestamp string with `strptime()` — is what you'll
do with almost every real API response and log line starting in
Chapter 3; APIs very commonly return timestamps as text that need
parsing exactly this way before you can do anything useful with them.

## strftime() — formatting a datetime back into a string

`strftime` ("string format time") is the reverse operation — turning a
`datetime` object back into text, in whatever layout you choose:

```python
order_date = datetime(2026, 1, 13)

print(order_date.strftime("%Y-%m-%d"))      # 2026-01-13
print(order_date.strftime("%B %d, %Y"))     # January 13, 2026
print(order_date.strftime("%m/%d/%Y"))      # 01/13/2026
```

The same format codes from `strptime()` work here, just in reverse —
you'll use `strftime()` any time you need to display a date to a
person, or write it back out in a specific format a downstream system
expects.

## Date arithmetic with timedelta

Subtracting one `datetime` from another gives you a `timedelta` — a
span of time — which makes "how many days between these two orders"
trivial:

```python
first_order = datetime.strptime("2026-01-03", "%Y-%m-%d")
latest_order = datetime.strptime("2026-01-19", "%Y-%m-%d")

days_between = (latest_order - first_order).days
print(days_between)   # 16
```

`.days` pulls the whole-number day count out of the `timedelta`. This
is exactly the kind of calculation behind a real pipeline concept
you'll meet in Chapter 6 — an "incremental load," which asks "what's
new since the last time this pipeline ran," a question that only makes
sense once dates are real `datetime` objects you can subtract, not
plain strings.

## Key terms

| Term | Meaning |
|---|---|
| `datetime` | Python's type for representing a specific date and time |
| `strptime(text, format)` | Parses a string into a `datetime`, using a format code |
| `strftime(format)` | Formats a `datetime` back into a string |
| `%Y` `%m` `%d` `%H` `%M` `%S` | Format codes: year, month, day, hour, minute, second |
| `timedelta` | A span of time, produced by subtracting one `datetime` from another |

## Lab

Parse every order date from a small batch, find the earliest and
latest, and compute the span between them:

```python
from datetime import datetime

raw_order_dates = ["2026-01-03", "2026-01-13", "2026-01-19", "2026-01-06"]

parsed_dates = [datetime.strptime(d, "%Y-%m-%d") for d in raw_order_dates]

earliest = min(parsed_dates)
latest = max(parsed_dates)
span_days = (latest - earliest).days

print("Earliest order:", earliest.strftime("%B %d, %Y"))
print("Latest order:", latest.strftime("%B %d, %Y"))
print("Order window spans", span_days, "days")
```

Notice the first line reuses Lesson 11's list comprehension pattern —
parsing every raw string in one line, instead of a four-line loop.

## Check yourself

Without looking back: why does `"2026-01-13" > "2026-01-03"` happen to
give the right answer as plain strings, but comparing dates as strings
is still a bad habit? And what does subtracting two `datetime` objects
actually give you back?
