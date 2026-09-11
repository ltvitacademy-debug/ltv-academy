# Lesson 22 — Data Conversion

**Chapter 4 · Data Flow Transformations · Lesson 22 of 49**

## What you'll learn

- What the Data Conversion transformation does and when you actually
  need it
- The four attributes it lets you set: Data Type, Length, Precision, and
  Scale
- Why string-to-string conversions need a matching **Code Page**
- What happens when an output string column is shorter than its input

## Converting a column's type, not its content

The **Data Conversion** transformation converts the data in an input
column to a **different data type**, then copies the converted value
into a **new output column**. Unlike Derived Column — which reshapes a
value with an expression — Data Conversion exists purely to fix a
*type* mismatch. You'll reach for it constantly whenever a source hands
you data typed one way (a flat file's every column arrives as string,
for instance) and a destination needs it typed another way.

You can apply multiple conversions to a single input column, and this
transformation has exactly one input, one regular output, and one error
output.

## The four things you can set per column

For each column you convert, the **Data Conversion Transformation
Editor** lets you configure:

- **Data Type** — the target type from the full list of SSIS data types
  (`DT_I4`, `DT_WSTR`, `DT_DATE`, and so on).
- **Length** — the column length, for string data.
- **Precision** and **Scale** — for numeric data, how many total digits
  and how many of those sit after the decimal point.
- **Output Alias** — the new column's name, defaulting to `Copy of`
  followed by the original column name.

If you're converting to a date or datetime type, note that the output
column's value is always in **ISO format**, regardless of your locale
settings — a detail worth remembering the first time a report looks
"wrong" purely because of a display format assumption.

## Code pages and truncation

Whenever you copy between two columns with a string data type, both
columns must use the **same code page** — the Data Conversion editor
lets you pick it explicitly for `DT_STR` output columns. And if the
output column's length is shorter than the input column's length, the
data gets **truncated** — SSIS treats this as a row-level error you can
handle through **Configure Error Output**, the same error-handling
pattern you'll formalize in Chapter 6.

## Key terms

| Term | Meaning |
|---|---|
| Data Conversion | Converts an input column's value to a different data type in a new output column |
| Output Alias | The name of the new, converted column — defaults to "Copy of \<original name\>" |
| Code page | Character-encoding setting that must match between two string columns being copied |
| Truncation | What happens when an output string column's length is shorter than the input's |

## Lab

1. Add a Flat File source that reads a CSV where every column is typed
   as `DT_WSTR` (the default for flat file text) — for example, an
   export of `Production.Product` with an `OrderQty`-style numeric
   column stored as text.
2. Drag a **Data Conversion** transformation onto the data flow and
   connect the flat file source to it.
3. Check the box for the numeric-looking text column, set **Data Type**
   to `four-byte signed integer [DT_I4]`, and leave the **Output Alias**
   at its default `Copy of <column>`.
4. Add a data viewer after the transformation and run the package.
   Confirm the new column shows up as an actual integer, not text, and
   that it sits alongside the original untouched string column.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what's
the real difference between what Derived Column does and what Data
Conversion does, and why would you ever need both in the same data flow?
