# Script — Ticket: Subledger Entries Did Not Transfer to GL

## Segment 1 (title)

BrightPath Facilities Group, ticket forty-five-eighty-nine. A batch of Receivables adjustments has been Accounted, Final, for three days. The GL accountant has run Transfer to GL twice. They still never show up in GL. High severity.

## Segment 2 (steps)

This looks like lesson eight's ticket, but it isn't the same problem. There, a payment was Final and just hadn't been picked up by the next scheduled run yet — a timing gap. Here, Transfer to GL has already run twice, successfully, with no errors. So whatever this is, it isn't timing.

## Segment 3 (steps)

Checking the accounting attribute that controls transfer itself: the Transfer to GL indicator on these specific entries is set to N. Subledger Accounting is intentionally excluding them from every transfer run, by design. Tracing why: this adjustment type was deliberately set that way months ago, for an internal reporting process that's since been discontinued — and nobody ever reverted the setting once that process ended.

## Segment 4 (code)

So this needs a different kind of fix entirely. Not re-running a program, and not defining a missing rule — a setup attribute that needs to be deliberately changed because the reason it existed is gone. Update the Transfer to GL setting for this adjustment type so it transfers by default, but confirm with whoever owns SLA setup first that nothing else still depends on the old behavior. Then run the transfer for the held batch.

## Segment 5 (outro)

Resolution note: name the specific attribute, explain it was intentional and outdated rather than broken, and recommend a periodic review of any exclude-from-transfer settings tied to discontinued processes — because a setting like that has no natural expiration. Up next, lesson twenty: the ticket every month-end eventually produces, a period that won't close.
