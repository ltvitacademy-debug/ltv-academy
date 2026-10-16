# Lesson 20 — Reading Data Into Pandas (CSV, JSON, Excel)

**Chapter 4 · Python for Data Engineers · Lesson 20 of 48**

## What you'll learn

- `pd.read_csv()` with real options — `parse_dates`, and why they
  matter beyond just "it loads"
- `pd.read_json()`, reading back the `orders.json` file Lesson 15
  built from this same data
- `pd.read_excel()` — the syntax, and what it needs installed, even
  without an Excel file on hand for this lesson
- Filtering immediately after loading, to confirm a read actually
  worked the way you expected

## pd.read_csv() with parse_dates

```python
import pandas as pd

df = pd.read_csv("orders.csv", parse_dates=["order_date"])
print(df.dtypes["order_date"])
print(df.head(3)[["order_id", "order_date"]])
```

```
datetime64[ns]
   order_id order_date
0      1001 2026-01-03
1      1002 2026-01-04
2      1003 2026-01-05
```

Lesson 19 loaded `orders.csv` without `parse_dates`, and `order_date`
came back as `object` (plain strings). That's fine for printing, but
useless for actual date math — you can't ask "which orders happened
in the last 10 days" by comparing strings reliably. `parse_dates=["order_date"]`
tells pandas to convert that one column to a real `datetime64[ns]`
type while reading the file, which is what makes the filter below
possible.

```python
recent = df[df["order_date"] >= "2026-01-10"]
print(len(recent))
```

```
12
```

Orders from `2026-01-10` (order `1009`) through `2026-01-19` (order
`1020`) make up 12 of the 20 rows — pandas compares the string
`"2026-01-10"` against the real datetime column correctly because
`order_date` is now an actual date type, not text.

## pd.read_json(): reading Lesson 15's export back in

Lesson 15 wrote `orders.json` — the same 20 orders as a JSON array of
objects. Pandas can read that directly:

```python
df_from_json = pd.read_json("orders.json")
print(df_from_json.shape)
print(df_from_json.dtypes["quantity"])
```

```
(20, 10)
int64
```

Interesting detail: Lesson 15's JSON stored `"quantity": "2"` as a
quoted string (because `csv.DictReader` never converted it), but
`pd.read_json()` is smart enough to infer that a column of
numeric-looking strings should become a real `int64` column anyway —
unlike `pd.read_csv()`, which would also infer that correctly, JSON
columns get the same type-inference pass. `pd.read_json()`'s default
orientation expects exactly this shape — a JSON array where each
element is one record/row as an object — which is exactly what
`json.dump(orders, f)` produced.

## pd.read_excel(): the syntax, for when you need it

This course's dataset lives as a CSV, not an Excel workbook, but
Excel files are common enough in real data engineering work (a
stakeholder exports one from a reporting tool) that the syntax is
worth knowing now:

```python
df_from_excel = pd.read_excel("orders.xlsx", sheet_name="Orders")
```

`pd.read_excel()` needs the `openpyxl` package installed
(`pip install openpyxl`) to read modern `.xlsx` files — unlike
`read_csv`/`read_json`, which only need pandas itself. `sheet_name`
picks which sheet to load by name (or index, e.g. `sheet_name=0` for
the first sheet); leaving it off loads the first sheet by default.
Everything else — `.shape`, `.dtypes`, filtering — works identically
once the DataFrame exists, regardless of which of these three readers
produced it.

## Key terms

| Term | Meaning |
|---|---|
| `parse_dates=[...]` | Tells `read_csv`/`read_json` to convert listed columns to real datetime type |
| `pd.read_json()` | Reads a JSON file (array of record objects, by default) into a DataFrame |
| `pd.read_excel()` | Reads an Excel sheet into a DataFrame; needs `openpyxl` installed |
| `sheet_name` | Which worksheet `read_excel()` loads, by name or index |
| `datetime64[ns]` | Pandas' real datetime type, required for correct date comparisons |

## Lab

Load `orders.csv` with `parse_dates=["order_date"]`, then filter for
orders on or after `2026-01-10`, and print both `len(recent)` and
`recent["order_id"].tolist()` to confirm which 12 order IDs matched
(they should run from `1009` through `1020`).

```python
df = pd.read_csv("orders.csv", parse_dates=["order_date"])
recent = df[df["order_date"] >= "2026-01-10"]
print(len(recent))
print(recent["order_id"].tolist())
```

## Check yourself

Without looking back: why does `order_date` need `parse_dates` to
support a comparison like `df["order_date"] >= "2026-01-10"`
correctly, when the column prints the same either way? And what does
`pd.read_excel()` need installed that `pd.read_csv()` doesn't?
