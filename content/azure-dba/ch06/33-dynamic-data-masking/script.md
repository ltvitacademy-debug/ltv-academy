# Script — Dynamic Data Masking

## Segment 1 (title)

TDE and Always Encrypted protect against someone who shouldn't have access at all. Dynamic Data Masking solves a different problem — a user with legitimate query access who doesn't need to see the real value of every sensitive column.

## Segment 2 (code: stored vs seen)

The stored data never changes. A privileged user's query sees the real email address. A masked user running the exact same query sees a masked version instead — the rewrite happens in the result set, not on disk.

## Segment 3 (screenshot: random masking rule)

Random masking replaces a numeric value with a plausible but fake number inside a defined range — configured right here, on the column's masking rule.

## Segment 4 (steps: four function types)

Default masks fully based on data type. Email keeps the first letter and a fixed domain. Random substitutes a fake number in range. Partial shows a defined number of real characters at the start or end and masks the middle.

## Segment 5 (outro)

DDM is a least-exposure convenience, not a security boundary — a WHERE clause can still filter on the real value. Next up: Row-Level Security, which controls which rows a user sees at all, not just how a column displays.
