# Lesson 20 — Working With Files

**Chapter 2 · Python for Data Engineers · Lesson 20 of 62**

## What you'll learn

- `open()` and the `with` statement — Python's safe way to work with
  files
- Reading a file line by line
- Writing a file
- Why this lesson exists even though Lesson 21's Pandas usually does
  this for you

## Opening a file safely with `with`

```python
with open("yellow_tripdata_2024-01.csv", "r") as f:
    first_line = f.readline()
    print(first_line)
```

`open()` takes a file path and a **mode** (`"r"` for read, `"w"` for
write, `"a"` for append). The `with` statement is a **context manager**
— it guarantees the file gets closed automatically when the block ends,
even if an error happens inside it. Writing `open()` without `with`
means remembering to call `.close()` yourself, every time, including on
every error path — `with` removes that entire class of bug.

## Reading line by line

```python
with open("yellow_tripdata_2024-01.csv", "r") as f:
    header = f.readline()
    for line in f:
        columns = line.strip().split(",")
        fare_amount = columns[10]   # whichever column index that is
        print(fare_amount)
```

Iterating a file object with `for line in f` reads one line at a time —
important for large files, since it never loads the whole file into
memory at once. `.strip()` removes the trailing newline; `.split(",")`
breaks a CSV line into its comma-separated fields (a manual version of
what Lesson 22 and Pandas do properly).

## Writing a file

```python
with open("cleaned_fares.txt", "w") as f:
    for fare in [14.50, 9.75, 22.00]:
        f.write(str(fare) + "\n")
```

`"w"` mode creates the file if it doesn't exist, and **overwrites** it
completely if it does — `"a"` (append) would add to the end instead,
without erasing what's already there.

## Why this matters even though Pandas will do it for you

Starting next lesson, `pandas.read_csv()` handles all of this file
mechanics automatically — you'll rarely call `open()` directly on a CSV
again in this course. But understanding what's happening underneath —
opening, reading line by line, closing safely — matters the moment
something goes wrong: an encoding error, a file that won't close, a
memory problem on a file too large to load all at once. Chapter 4's
PySpark `.write()` operations (Lesson 60) are built on exactly this same
open-write-close idea, just distributed across a whole cluster.

## Key terms

| Term | Meaning |
|---|---|
| `open()` | Opens a file, given a path and a mode |
| Context manager (`with`) | Guarantees cleanup (closing the file) happens automatically |
| `"r"` / `"w"` / `"a"` | Read / write (overwrite) / append modes |

## Lab

```python
with open("sample_fares.txt", "w") as f:
    for fare in [14.50, 9.75, 22.00, -5.00]:
        f.write(str(fare) + "\n")

valid_total = 0
with open("sample_fares.txt", "r") as f:
    for line in f:
        fare = float(line.strip())
        if fare > 0:
            valid_total = valid_total + fare

print("Total of valid fares:", valid_total)
```

Confirm you get `46.25`.

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: what
does the `with` statement guarantee, and why does reading a file line by
line matter for large files?
