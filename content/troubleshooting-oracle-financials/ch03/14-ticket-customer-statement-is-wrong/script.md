# Script — Ticket: Customer Statement Is Wrong

## Segment 1 (title)

Cascade Outdoor Supply, ticket forty-four-sixty-seven. A customer, Ridge and Pine Outfitters, says their statement doesn't show an invoice they know they owe — and they're threatening to withhold payment on everything until it's explained. High severity.

## Segment 2 (steps)

A customer statement is built from open and recent transactions as of a run date, shaped by parameters — a statement cycle, a date range, sometimes a disputed-items flag. A transaction can be completely real and correctly entered and still not show up on a given run, simply because it falls outside that run's window. That's a timing explanation, not a data error, and it's worth keeping in mind before you assume the statement is broken.

## Segment 3 (steps)

The invoice in question, INV-11284, dated the 29th of last month — it's real, it's open, it's sitting in Receivables exactly as it should be. Checking the statement: it ran on the 1st, covering transactions dated through the 28th of the prior month. INV-11284 missed that cutoff by exactly one day.

## Segment 4 (code)

So there's nothing to fix in the data. The invoice and the statement are both correct, given the parameters — this is a legitimate consequence of where the cutoff falls relative to when the invoice was entered. The resolution here is explanation, not correction: confirm the invoice is real and will show up on next month's statement, or send the customer a copy directly right now if they need it sooner.

## Segment 5 (outro)

Resolution note: state plainly that no data or setup error was found, and that the exclusion was a legitimate cutoff timing issue. Flag it to AR management if invoices dated near month-end keep raising this same question — that's a process conversation, not something to quietly work around on one ticket. Up next, lesson fifteen: a bank statement that won't reconcile.
