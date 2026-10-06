# Script — Transaction Sources and Batch Sources

## Segment 1 (title)

A transaction type says what a transaction is. A transaction source says where it came from, and it controls a surprising amount of day-to-day behavior: numbering, date handling, defaulting. Batch source is the formal name; transaction source is what you'll hear in conversation.

## Segment 2 (steps)

Every source is one of two kinds. Manual, for transactions keyed directly in by a person, typically a small AR team's day-to-day work. Or Imported, used exclusively for transactions brought in through AutoInvoice from order management, project billing, or an outside feed. You can't manually key a transaction against an Imported source, it exists purely for the AutoInvoice interface.

## Segment 3 (steps)

Here's what a source actually controls. Numbering, automatic or manual, and often a different sequence per source so you can tell at a glance where a transaction came from. Date derivation for imports when the upstream system doesn't supply a clean date. Default transaction type, so operators don't pick it every time. And validation strictness, tighter for manual entry, looser for a trusted, pre-validated import feed.

## Segment 4 (outro)

Picture Northwind Fixtures Co with two sources. AR Manual Entry, numbering starting at one hundred thousand, defaults to Standard Invoice. And OM AutoInvoice Import, numbering starting at five hundred thousand, used only by the AutoInvoice program. Anyone reviewing a batch can tell immediately, just from the number range, which transactions a human keyed in and which arrived automatically. Up next, lesson fourteen: receivables activities.
