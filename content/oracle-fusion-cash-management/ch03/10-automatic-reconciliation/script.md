# Script — Automatic Reconciliation

## Segment 1 (title)

With rule sets and matching rules defined, the next question is what actually runs them. This lesson covers the automatic reconciliation process — when to use it, how it behaves, and what it leaves behind for a human to handle.

## Segment 2 (steps)

Automatic reconciliation takes the imported, unreconciled lines on a statement and attempts to match them against open system transactions, using the rule set attached to that account. For each candidate pair or group, it checks whether the matching criteria align — exactly, or within a tolerance for one to one rules — and if so, reconciles them with no manual intervention.

## Segment 3 (steps)

This is ideally suited to high volume accounts — a general operating account processing hundreds of transactions a day. A well tuned rule set reconciles the overwhelming majority of routine transactions automatically, freeing staff for the exceptions that need judgment. It's a poor fit for accounts with very few transactions a month, where maintaining rules costs more than it saves — those suit manual reconciliation better.

## Segment 4 (steps)

The process is deliberately conservative. Lines that don't find a matching counterpart — not yet recorded, outside tolerance, or no rule covers that source — are left unreconciled as exceptions. It never guesses or forces a match that doesn't actually satisfy the rule.

## Segment 5 (outro)

A fictional example: Harborview Metals Inc runs this nightly, and on a typical night 480 of 500 lines reconcile automatically, leaving 20 exceptions — bank charges with no system counterpart, and receipts that haven't posted yet — for Treasury to review the next morning. Up next, lesson eleven: manual reconciliation, where a human picks up from here.
