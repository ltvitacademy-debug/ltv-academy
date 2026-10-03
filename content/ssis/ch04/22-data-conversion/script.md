# Script — Data Conversion

## Segment 1 (title)

Data Conversion solves one specific problem: a value's type is wrong for
where it's headed. Let's see exactly what it changes, and what it leaves
alone.

## Segment 2 (screenshot: dconv-pipeline-position.png)

Here's exactly where this transformation tends to sit. A Flat File
Source hands off its columns — and every single one of them arrives
typed as a string, no matter what the data actually looks like. Data
Conversion sits right after it, fixing those types before anything
downstream — here, a Derived Column transformation — ever has to deal
with text where it expected a number.

## Segment 3 (screenshot: dconv-mssqltips-editor.png)

This is the Data Conversion Transformation Editor itself, with three
columns checked for conversion. ProductID and Units both convert to a
four-byte signed integer. Revenue converts to a numeric type — and look
at Precision and Scale over on the right: 18 and 6, set explicitly,
because a numeric type needs to know exactly how many digits it's
holding and how many of those sit after the decimal point.

## Segment 4 (steps: the four settings)

For every column you run through this transformation, you're setting
four things. Data Type is the target SSIS type you're converting to —
maybe a four-byte integer, maybe a date. Length applies to string
output — how many characters it can hold. Precision and Scale apply to
numeric output — precision is the total number of digits, scale is how
many of those sit after the decimal point. And Code Page matters
whenever you're copying between two string columns — they have to
match, or the conversion won't behave the way you expect.

## Segment 5 (code: before/after)

Here's the whole idea in one picture. Say a flat file hands you OrderQty
as text — literally the string "24" — because every column from a flat
file source arrives typed as a wide string by default. Data Conversion
takes that column, and produces a brand-new output column, Copy of
OrderQty, holding the exact same value, but now as a real four-byte
integer. The original string column is untouched — it's still sitting
right there in the data flow — you're just adding a properly typed copy
next to it. And if you shrink a string's length in the process, SSIS
truncates the value and flags it as a row-level error you can catch on
the error output.

## Segment 6 (screenshot: dconv-advanced-editor.png)

One more thing worth knowing: Data Conversion isn't the only place
these four fields show up. A source component's own Advanced Editor —
under Input and Output Properties — exposes the identical DataType,
Length, Precision, and Scale fields for any output column, letting you
change a column's type in place instead of adding a separate
transformation. Same four settings, same effect on the metadata — just
a different dialog, and no new column added alongside the original.

## Segment 7 (outro)

Data Conversion fixes types. Next lesson, we look at Aggregate — the
transformation that does GROUP BY, SUM, and COUNT entirely inside your
data flow, no query required.
