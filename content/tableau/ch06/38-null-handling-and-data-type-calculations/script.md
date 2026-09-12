# Script — NULL Handling & Data-Type Calculations

## Segment 1 (title)

NULL Handling and Data-Type Calculations. NULL means no value at all — not zero, not an empty string, genuinely nothing — and arithmetic on a NULL usually produces another NULL, which can quietly make an entire aggregation disappear.

## Segment 2 (code: testing for NULL)

ISNULL answers a yes-or-no question. Has Ship Date equals NOT ISNULL of Ship Date — that returns true for every row with a real ship date, false for any row still missing one. ISNULL just tells you something is missing; it doesn't fix it.

## Segment 3 (code: substituting a default)

IFNULL returns the first expression if it isn't NULL, and a fallback value if it is. Safe Discount equals IFNULL, Discount, comma, 0. If Discount has a real value, it passes through unchanged; if it's NULL, Safe Discount returns 0 instead.

## Segment 4 (code: the numeric shortcut)

ZN does exactly one job: converts a NULL numeric value to 0, passing any other number through unchanged. Safe Sales equals ZN of Sales — functionally the same as IFNULL of Sales and 0, just shorter, and specifically for numbers.

## Segment 5 (code: converting types)

Sometimes a field arrives as the wrong type — a date stored as text, for instance. Order Date Parsed equals DATE of Order Date String — that converts text like "2024-07-17" into a real date field Tableau can use in date functions and timelines. INT, FLOAT, and STR do the same job for their respective types.

## Segment 6 (outro)

Next lesson, the last one in this chapter — aggregate versus non-aggregate calculations, and the specific errors you'll hit when you mix them without realizing it.
