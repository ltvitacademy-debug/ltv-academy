# Script — Derived Column

## Segment 1 (title)

Derived Column is the transformation you'll reach for constantly — any
time you need to compute a new value or reshape an existing one, this is
where that logic lives.

## Segment 2 (code: expression examples)

These four patterns cover most of what you'll actually do with this
transformation. Concatenating FirstName and LastName into a FullName.
Pulling a single character out of a string with SUBSTRING. Rounding a
numeric value like SalesTax down to two decimal places. And extracting
just the year out of a date with DATEPART. Every expression here can
combine columns, variables, functions, and operators in any combination
you need, and a single Derived Column transformation can define as many
of these as your package requires.

## Segment 3 (steps: new column vs replace)

For each derived column, you make one choice: add the result as a
brand-new output column, or replace the value in an existing column.
Both run the exact same expression — the only difference is where the
result ends up. Here's the subtlety worth remembering: if an expression
references a column that this same transformation is also overwriting,
that expression sees the original value, not the new one being derived.
SSIS doesn't let expressions leak into each other mid-execution the way
you might expect. And when you're adding to a new column, the editor
automatically figures out the data type, length, precision, and scale
for you — just double check it before wiring that output somewhere
strongly typed.

## Segment 4 (outro)

Derived Column is how you compute new values inside the pipeline. Next
lesson: Data Conversion, the transformation you use when a value's
*type* — not its content — is what needs to change.
