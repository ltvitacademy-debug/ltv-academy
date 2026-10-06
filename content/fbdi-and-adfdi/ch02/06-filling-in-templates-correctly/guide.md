# Filling in Templates Correctly

Knowing a template's structure is one thing; filling it in without breaking it is another. This lesson covers the practical rules for entering data into an FBDI template so that it survives the trip through CSV generation, UCM upload, and the interface table — and actually has a chance of being accepted by the import process.

## What you'll learn

- The difference between required and optional columns, and how to tell them apart
- Why data types and formats must match exactly what the interface table expects
- How lookup codes and reference values work, and why typing a "close enough" value fails
- The "one row, one record" rule and why extra blank rows cause problems

## Required versus optional columns

Not every column on a template needs a value. Templates typically mark, or document, which columns are mandatory for a row to be accepted and which are optional — optional columns might capture something like a secondary reference number that only some rows will have. Leaving a required column blank doesn't crash anything at data-entry time; it simply guarantees that row will be rejected later, during the import process, when the business-rule validation runs. Reading the template's instructions tab (or Oracle's published field reference for that import) before you start is the only reliable way to know which is which — guessing is how required fields get skipped.

## Data types and formats must match exactly

An interface table column defined as a date expects a date in a specific format; a column defined as a number expects a number, not a number with a currency symbol or thousands separators typed in as text. Excel's own formatting can quietly sabotage this: a cell that displays "01/15/2026" might store a different underlying value depending on your system's date settings, and a cell formatted as text will keep leading zeros that a numeric cell would silently drop. The safe habit is to format each column consistently with what the field is supposed to hold, and to double-check a few cells by looking at the actual value Excel stores, not just what's displayed.

## Lookup codes and reference values

Many Oracle Fusion fields aren't free text — they're coded lookups tied to values already configured in your environment: a currency code, a payment terms code, a supplier type. The template expects the exact code, not a human-friendly label. Typing "US Dollars" into a field expecting the code `USD` will fail, even though a person reading it would understand exactly what you meant. This is one of the most common sources of rejected rows, and it's why reviewing the valid values for a coded field — often available from the corresponding setup page in Oracle Fusion — is worth doing before you fill in hundreds of rows with a guess.

## One row, one record — and no extra blank rows

Each row on a data tab represents exactly one record (or, for header/line templates, one line tied to a header). Leaving stray blank rows in the middle of your data, or leaving old sample rows in place below your real data, can cause the CSV generation step to pick up empty or garbage rows that the import process then has to reject. The habit worth building here is simple: delete every row you're not using, keep your real data contiguous starting at the first data row, and don't leave gaps.

## Recap

Filling in a template correctly means knowing which columns are required, matching data types and formats exactly, using coded lookup values instead of friendly labels, and keeping one clean row per record with no stray blanks. Get these right and your data has a real chance of being accepted; get them wrong and the import process will reject rows for reasons that look invisible until you know what to check. Next up, lesson 7: generating the actual CSV and ZIP files from a completed template.
