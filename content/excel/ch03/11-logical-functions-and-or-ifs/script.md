# Script — Logical Functions: AND, OR & IFS

## Segment 1 (title)

AND and OR combine multiple conditions into a single true or false that IF can test. Mixing them up is one of the most common silent logic bugs in Excel.

## Segment 2 (code: AND vs OR)

AND requires every condition to be true — a passing score and enough attendance, both required. OR only needs one match — either region name qualifies. Swap one for the other and the formula still calculates, it just quietly returns the wrong answer.

## Segment 3 (code: IFS)

IFS flattens a long IF chain into condition-result pairs with no nesting at all. The final TRUE pair is the catch-all — skip it, and IFS returns an error instead of a result when nothing matches.

## Segment 4 (outro)

Next lesson: date and text functions — EOMONTH, DATEDIF, TEXT, and the cleanup functions that fix messy imported data.
