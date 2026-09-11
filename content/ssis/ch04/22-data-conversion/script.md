# Script — Data Conversion

## Segment 1 (title)

Data Conversion solves one specific problem: a value's type is wrong for
where it's headed. Let's see exactly what it changes, and what it
leaves alone.

## Segment 2 (steps: the four settings)

For every column you run through this transformation, you're setting
four things. Data Type is the target SSIS type you're converting to —
maybe a four-byte integer, maybe a date. Length applies to string
output — how many characters it can hold. Precision and Scale apply to
numeric output — precision is the total number of digits, scale is how
many of those sit after the decimal point. And Code Page matters
whenever you're copying between two string columns — they have to
match, or the conversion won't behave the way you expect.

## Segment 3 (code: before/after)

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

## Segment 4 (outro)

Data Conversion fixes types. Next lesson, we look at Aggregate — the
transformation that does GROUP BY, SUM, and COUNT entirely inside your
data flow, no query required.
