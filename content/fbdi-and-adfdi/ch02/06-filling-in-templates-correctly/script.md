# Script — Filling in Templates Correctly

## Segment 1 (title)

Knowing a template's structure is one thing. Filling it in without breaking it is another. This lesson covers the practical rules for entering data so it survives the trip through CSV generation, upload, and the interface table.

## Segment 2 (steps)

Not every column needs a value — some are required, some optional, and the template's instructions or Oracle's field reference will tell you which. Leaving a required column blank doesn't crash anything while you're typing. It just guarantees that row gets rejected later, during the import, when business-rule validation runs.

## Segment 3 (steps)

Data types and formats have to match exactly what the interface table expects — a date column wants a date, a number column wants a number, not a number with a currency symbol typed in as text. Excel's own formatting can sabotage this quietly: a date can store a different value than what's displayed, and a text-formatted cell can keep leading zeros a numeric cell would drop.

## Segment 4 (steps)

Many fields are coded lookups, not free text — a currency code, a payment terms code. The template wants the exact code, like USD, not a friendly label like "US Dollars." This is one of the most common sources of rejected rows, so check the valid values before you fill in hundreds of rows with a guess.

## Segment 5 (outro)

Each row is exactly one record. Stray blank rows or leftover sample rows get picked up during CSV generation and rejected during import. Delete what you're not using, keep your data contiguous, and don't leave gaps. Up next, lesson seven: generating the actual CSV and ZIP files from a completed template.
