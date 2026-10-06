# Script — Ticket: Journal Import Failed

## Segment 1 (title)

Harbor & Vance Logistics, ticket forty-five-thirty-eight. Nightly Journal Import from the legacy payroll system failed — sixty rows were supposed to come in, and nothing did. High severity.

## Segment 2 (steps)

This is one step earlier than last lesson's journal that wouldn't post. Journal Import reads rows from GL_INTERFACE, usually fed by an external system like payroll, and turns them into actual GL journals. If Journal Import fails, there's no journal yet to even attempt posting — the rows are just stuck in the interface table.

## Segment 3 (steps)

Journal Import gives you real error codes, not a vague failure. EF04 means the account is invalid. EF03 means it's disabled. EU02 means unbalanced with no suspense posting allowed. WU01 means unbalanced but suspense posting is allowed, so it processed anyway — a warning, not a failure. Here, all sixty rows show EF04, invalid account.

## Segment 4 (code)

Checking dynamic insertion for this ledger: it's off. That means if a row's account combination doesn't already exist, Journal Import won't create it — it just rejects the row. Tracing the combination itself: payroll started sending a new department cost center this month, added on their end but never communicated to GL. It genuinely doesn't exist yet in this chart of accounts.

## Segment 5 (outro)

The fix isn't to flip dynamic insertion on — for a cost center, that risks creating an incomplete or badly structured combination. Instead: confirm the new cost center with Enterprise Structures, create it properly, and re-run Journal Import for the sixty held rows. Resolution note should recommend payroll notify GL before adding any new segment value going forward. Up next, lesson eighteen: when the journal exists and imports fine, but the Create Accounting process itself fails.
