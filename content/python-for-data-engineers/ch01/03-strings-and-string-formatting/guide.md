# Lesson 3 — Strings & String Formatting

**Chapter 1 · Python for Data Engineers · Lesson 3 of 48**

## What you'll learn

- String basics: creating, concatenating, and indexing text
- Useful string methods for cleaning up real data: `.strip()`,
  `.upper()`/`.lower()`, `.replace()`, `.split()`
- f-strings — the modern, readable way to build text from variables
- Splitting a raw comma-separated line the way you'll see in Chapter 3,
  before you've learned a proper CSV reader

## String basics

A string is text, wrapped in single or double quotes — Python doesn't
care which, as long as you're consistent within the pair:

```python
region = "West"
product = 'Trail Runner GTX'

full_description = region + " — " + product
print(full_description)   # West — Trail Runner GTX
```

`+` concatenates (joins) strings. You can index into a string by
position, starting at `0`:

```python
status = "Shipped"
print(status[0])     # 'S'
print(status[0:4])    # 'Ship' — a slice, from index 0 up to (not including) 4
```

## Cleaning methods you'll use constantly

Real data is messy — extra whitespace, inconsistent casing, stray
characters. These four methods handle most of it:

```python
raw_status = "  shipped \n"

cleaned = raw_status.strip()        # "shipped" — removes leading/trailing whitespace
normalized = cleaned.upper()        # "SHIPPED"
print(normalized)

product_name = "Trail Runner GTX"
safe_name = product_name.replace(" ", "_")   # "Trail_Runner_GTX"
print(safe_name)
```

`.strip()` is especially important once you start reading real files
in Chapter 3 — every line read from a text file carries an invisible
trailing newline (`\n`) that will quietly break comparisons and
conversions if you don't strip it first.

## .split() — pulling fields out of a raw line

Before you learn Python's built-in CSV reader in Chapter 3, it's worth
seeing *why* it exists, by doing it the manual way first. A raw line
from `orders.csv` is just one long string:

```python
raw_line = "1002,502,Marcus Ibeh,East,Alpine 2P Tent,Camping,1,249.50,2026-01-04,Shipped"

fields = raw_line.split(",")
print(fields)
# ['1002', '502', 'Marcus Ibeh', 'East', 'Alpine 2P Tent', 'Camping', '1', '249.50', '2026-01-04', 'Shipped']

order_id = fields[0]
customer_name = fields[2]
status = fields[9]
print(order_id, customer_name, status)
```

`.split(",")` breaks a string into a list wherever it finds a comma.
Notice every field comes back as a string — `fields[0]` is `"1002"`,
not the number `1002` — which is exactly the `int()`-conversion problem
from Lesson 2, now showing up with real data. Also notice this manual
approach breaks the moment a field itself contains a comma (like
`"Smith, Jane"` as a name) — that fragility is exactly why Chapter 3
introduces Python's real `csv` module instead of doing this by hand.

## f-strings — building text from variables

An f-string lets you embed variables directly inside a string, prefixed
with `f`:

```python
customer_name = "Priya Nandan"
quantity = 1
product = "Trail Runner GTX"

summary = f"{customer_name} ordered {quantity}x {product}"
print(summary)   # Priya Nandan ordered 1x Trail Runner GTX
```

Compare that to building the same string with `+` concatenation —
you'd need `str()` around `quantity` since it's an int, and the whole
thing gets harder to read with every added variable. f-strings also
support formatting right inside the braces, which matters for money:

```python
unit_price = 129.99
print(f"Unit price: ${unit_price:.2f}")   # Unit price: $129.99
```

`:.2f` means "format as a float with exactly 2 decimal places" — the
standard way to display currency so it never shows `$129.9` or
`$129.990000`.

## Key terms

| Term | Meaning |
|---|---|
| Concatenation | Joining strings with `+` |
| `.strip()` | Removes leading/trailing whitespace, including newlines |
| `.split(sep)` | Breaks a string into a list of substrings wherever `sep` appears |
| f-string | `f"text {variable}"` — embeds variable values directly in a string |
| `:.2f` | Format specifier inside an f-string for 2 decimal places |

## Lab

Take this raw line (one row from `orders.csv`) and produce a clean
summary string from it:

```python
raw_line = "1009,507,Keiko Tanaka,West,Alpine 2P Tent,Camping,1,249.50,2026-01-10,Shipped"

fields = raw_line.split(",")
customer_name = fields[2]
product = fields[4]
quantity = int(fields[6])
unit_price = float(fields[7])
status = fields[9].strip().upper()

summary = f"{customer_name} ordered {quantity}x {product} — status: {status}, total: ${quantity * unit_price:.2f}"
print(summary)
```

Run it, then change `raw_line` to a different row from `orders.csv` and
confirm your summary line updates correctly.

## Check yourself

Without looking back: why does every field from `.split(",")` come back
as a string, even the ones that look numeric? And where exactly would
`.strip()` matter if you read this same line from a real text file
instead of typing it directly into your script?
