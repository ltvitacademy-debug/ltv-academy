# Lesson 32 — Error Outputs on Data Flow Components

**Chapter 6 · Error Handling & Logging · Lesson 32 of 49**

## What you'll learn

- Why one bad row can fail an entire data flow by default, and the "error
  output" mechanism that fixes that
- The difference between an **error** and a **truncation** — SSIS treats
  them as two different problems
- The three dispositions you can set on either one: Fail Component, Ignore
  Failure, Redirect Row
- The two extra columns — ErrorCode and ErrorColumn — that ride along on
  every redirected row

## The default is brutal: one bad row fails everything

By default, most data flow components — sources, many transformations,
destinations — treat any row-level problem as fatal. If one row out of ten
million can't be converted to the right data type, the entire Data Flow
task fails. No rows load, no partial success, nothing. That's rarely what
you actually want in production: you want the 9,999,999 good rows to load,
and the one bad row set aside somewhere you can look at later.

**Error outputs** are the fix. Any component that supports them exposes a
second, red output path in addition to its normal green one. Rows that
fail get redirected down the red path instead of failing the component.

![A simple data flow with two Source components feeding a Transformation, which feeds more Transformations before a Destination — with a second red "Error Flow" arrow branching off the same Transformation into a separate Destination for the failed rows.](/courses/ssis/ch06/32-error-outputs-on-data-flow-components/data-flow-with-error-output.gif)
*The error output is a second path out of a component — failed rows go right instead of down.*

## Errors vs. truncations — SSIS keeps them separate

SSIS distinguishes two categories of row-level problem, and you configure
them independently, column by column:

- **Error** — an unequivocal failure. A data conversion that can't happen
  at all, an expression that can't evaluate. The result is a `NULL` and the
  row simply cannot be processed as-is.
- **Truncation** — less severe. The data got cut short (a string too long
  for its destination column, for instance) but a usable, if incomplete,
  result still exists.

Because they're tracked separately, you can tell a component to fail on a
real error but only ignore a truncation on a column you don't care much
about — or the reverse.

## The three dispositions

For every column on an input or output, and for the input/output as a
whole, you choose one of three behaviors when an error or truncation
happens:

- **Fail Component** — the default. The Data Flow task fails immediately.
- **Ignore Failure** — the problem is ignored, and the row continues down
  the component's normal (green) output as if nothing happened. Use this
  sparingly — a truncated value that silently passes through can be worse
  than a loud failure.
- **Redirect Row** — the row is sent down the error output instead. This is
  the setting that actually gives you a second processing path.

## What travels with a redirected row

When you configure a component's error output, SSIS automatically adds two
columns to it: **ErrorCode**, a numeric code identifying what went wrong,
and **ErrorColumn**, the ID of the column that caused it. On their own
these aren't very readable — a common pattern (used in the official
Microsoft tutorial) is to connect the error output into a Script Component
that calls `GetErrorDescription()` against the ErrorCode to turn it into an
actual sentence before writing the row to a file or error table.

## A realistic error branch

A typical pattern: Flat File Source → Lookup (on a reference key) → error
output branches off the Lookup into a Derived Column that adds an
ErrorDescription, into a Flat File Destination that writes the bad rows to
`rejected_rows.txt` for someone to review — while the main path continues
on to the real destination table untouched.

## Key terms

| Term | Meaning |
|---|---|
| Error output | A component's second output path for rows it can't process normally |
| Error | An unrecoverable row-level failure (produces a NULL) |
| Truncation | Data cut short but still usable (e.g. an oversized string) |
| Fail Component | Disposition that stops the Data Flow task on error/truncation (the default) |
| Ignore Failure | Disposition that lets the row continue down the normal output anyway |
| Redirect Row | Disposition that sends the row down the error output |
| ErrorCode / ErrorColumn | The two columns SSIS auto-adds to every error output |

## Lab

1. Open a package with an OLE DB Source or Lookup transformation from an
   earlier chapter's data flow.
2. Double-click the component and find **Configure Error Output** (or the
   error-output columns on the component's editor).
3. Set the **Error** disposition to **Redirect Row** on at least one
   column.
4. Drag a new Flat File Destination onto the data flow, and connect the
   component's red error-output arrow to it. Configure the destination file
   path.
5. Run the package with data you know will fail on that column, and confirm
   the bad rows land in the error file instead of failing the whole task.

## Check yourself

You're ready for Lesson 33 when you can explain: what's the difference
between an error and a truncation in SSIS, and which of the three
dispositions actually gives you a second path to process the bad row
separately?
