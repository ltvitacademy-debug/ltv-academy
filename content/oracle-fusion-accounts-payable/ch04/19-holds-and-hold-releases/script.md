# Script — Holds and Hold Releases

## Segment 1 (title)

Last lesson kept saying validation applies or releases holds without stopping to say what a hold actually is, or how it goes away. This lesson closes that gap: the categories Payables uses, and the very different ways each one gets released.

## Segment 2 (steps)

Holds group into a handful of categories. Account holds mean an invalid GL account combination. Matching holds mean a price or quantity variance beyond tolerance. Variance holds mean the invoice's own numbers don't add up internally. Funds holds mean a budgetary control shortfall. Installment holds sit on one installment instead of the whole invoice. Supplier site holds are tied to the site itself, like a matching-required condition that wasn't met.

## Segment 3 (steps)

Here's the distinction that matters day to day. Holds the application placed, based on a condition it can re-check, clear themselves the next time you validate, once the underlying problem is fixed - no separate release click needed. Some system holds, like a line or distribution variance, can only go away that way. A manually placed hold, though, only releases through a deliberate action, and only if it was configured to allow that.

## Segment 4 (steps)

Where you click to release one depends on where you're working - a Release button on the dashboard or Invoices page, a Manage Holds action on the invoice itself, the Validate action re-checking things, or a Release Holds action elsewhere. They all do the same job.

## Segment 5 (outro)

Take Vantree's invoice with two holds: an account hold, fixed by correcting the distribution and re-validating, clears itself. A matching hold from a 7% price variance needs either a tolerance override with proper authority, or getting the supplier to correct the PO price - clicking release alone won't fix what's actually wrong. Up next, lesson twenty: invoice approvals, the workflow that runs once an invoice is clean.
