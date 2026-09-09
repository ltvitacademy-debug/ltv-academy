# Lesson 8 — CSV vs. JSON vs. Parquet vs. Delta

**Chapter 1 · Azure Data Lake & Storage · Lesson 8 of 62**

## What you'll learn

- The real tradeoffs between the four file formats you'll read and
  write constantly in this course
- Why **row-based** formats (CSV, JSON) and **columnar** formats
  (Parquet) perform so differently on analytics workloads
- What Delta adds on top of Parquet — a preview of Course 2

## CSV — simple, row-based, human-readable

```text
VendorID,pickup_datetime,passenger_count,fare_amount
2,2024-01-01 00:15:32,1,14.50
1,2024-01-01 00:22:18,3,9.75
```

Every row is a full line of text; every value is a string until
something parses it. Simple to read, simple to write, but there's **no
schema**, **no compression**, and — critically for analytics — **no way
to read just one column** without reading every character of every row.

## JSON — semi-structured, nested

```json
{"VendorID": 2, "pickup_datetime": "2024-01-01T00:15:32", "passenger_count": 1, "fare_amount": 14.50}
```

JSON adds real structure and **nesting** — an object can contain arrays
and other objects, which CSV simply cannot express. Still text, still
row-oriented, and still no built-in compression — you're trading CSV's
simplicity for the ability to represent genuinely hierarchical data.

## Parquet — columnar, binary, built for analytics

Parquet flips the layout entirely: instead of storing row-by-row, it
stores **column-by-column**, in a compressed binary format with the
schema embedded directly in the file. That single change unlocks two
things CSV and JSON structurally can't do:

- **Column pruning** — a query that only needs `fare_amount` can skip
  reading every other column's bytes entirely
- **Predicate pushdown** — Parquet stores min/max statistics per column
  chunk, so a filter like `WHERE fare_amount > 100` can skip whole
  chunks without decompressing them at all

For the NYC Taxi data this course uses, a query touching 3 of 19 columns
against Parquet reads a small fraction of the bytes a CSV read of the
same query would require — this is exactly why Chapters 3–4's Spark and
PySpark lessons lean on Parquet by default.

## Delta — Parquet, plus a transaction log

**Delta Lake** (covered in full depth in this track's second course)
takes Parquet one step further: it's still Parquet files underneath, but
with a **transaction log** alongside them that tracks every change ever
made. That log is what enables things plain Parquet files can't do on
their own: ACID transactions, safely reading while another process
writes, and — genuinely useful in practice — **time travel**, querying
what a table looked like at a previous point in time.

```text
/taxi-data/
  _delta_log/          <- the transaction log: what makes it "Delta"
    00000000000000000000.json
    00000000000000000001.json
  part-00000.parquet   <- the actual data, still Parquet
  part-00001.parquet
```

## Which one, when

| Format | Use it for |
|---|---|
| CSV | Quick exports, small files, anything a human needs to open directly |
| JSON | APIs, nested/semi-structured data (Lesson 23–24 cover this directly) |
| Parquet | Anything analytics-heavy — this course's default from Chapter 3 onward |
| Delta | Anything Parquet, plus you need transactional safety or history — Course 2's whole subject |

## Key terms

| Term | Meaning |
|---|---|
| Row-based | Data stored one full row at a time — CSV, JSON |
| Columnar | Data stored one column at a time — Parquet |
| Column pruning | Skipping columns a query doesn't need, entirely |
| Predicate pushdown | Skipping data chunks a filter can't possibly match, using stored statistics |

## Lab

No Azure account needed for this one — just compare files directly:

1. Open any small CSV file in a text editor and note: every value is
   plain text, no type information at all.
2. If you have a `.parquet` file (Lesson 42 shows you how to create
   one), try opening it in a plain text editor — it's genuinely
   unreadable without a tool that understands the columnar binary
   format, which is itself a hint at how differently it's structured.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what
does "columnar" actually mean, and why does it make column pruning and
predicate pushdown possible in a way row-based formats can't match?
