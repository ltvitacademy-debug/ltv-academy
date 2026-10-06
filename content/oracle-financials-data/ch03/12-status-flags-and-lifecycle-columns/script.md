# Script — Status Flags and Lifecycle Columns

## Segment 1 (title)

Every lesson in this chapter has quietly pointed at the same idea: a transaction moves through stages, and those stages get recorded in status columns scattered across multiple tables, not summarized in one place. This lesson makes that explicit.

## Segment 2 (steps)

Think about everything that happens to one supplier invoice: entered, validated, accounted, posted to GL, scheduled, paid. Each stage leaves evidence somewhere — sometimes a status column, sometimes just a timestamp. There's no single lifecycle-stage column anywhere that summarizes all of it. You have to know which table holds which piece.

## Segment 3 (steps)

AP_INVOICES_ALL carries a status reflecting validation and accounting state, but it says nothing about whether the invoice has actually been paid — that lives separately in the payments table. Reading only the header status and assuming it tells you payment state is a common, avoidable mistake.

## Segment 4 (steps)

AR takes a different approach. Rather than one payment flag, AR_PAYMENT_SCHEDULES_ALL carries a status, open or closed, alongside a numeric amount-due-remaining figure. That numeric figure is the actually authoritative signal — a status can say open while the remaining balance is a tiny rounding leftover.

## Segment 5 (outro)

And separately again: has the accounting actually reached the General Ledger yet? That's tracked through its own posting-related status, a different axis entirely from payment status. Chapter three is complete. Up next, chapter four: Ledger Data, where you'll see exactly where all of this accounting ends up.
