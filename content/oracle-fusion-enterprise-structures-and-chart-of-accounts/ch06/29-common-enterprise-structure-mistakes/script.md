# Script — Common Enterprise Structure Mistakes

## Segment 1 (title)

This course closes with the mistakes that recur across real implementations — not because the concepts are hard, but because these decisions get made early, under pressure, and become expensive to undo.

## Segment 2 (code)

Chart of accounts mistakes: too many segments just in case, no reserved Future segment, cost center omitted then needed for Assets or Expenses, cross-validation rules written against individual values instead of hierarchies, and rules deployed but never actually tested.

## Segment 3 (code)

Ledger and legal entity mistakes: a legal entity registered with no address prepared first, a missing balancing-segment-value assignment, ledgers grouped into a set despite different charts of accounts, and over-segmented reference data sets.

## Segment 4 (steps)

The single most damaging mistake is skipping the balancing-segment-value-to-legal-entity assignment. It silently breaks a clean trial balance per entity, and it's usually discovered at period close, under pressure, far later than when the mistake was made.

## Segment 5 (outro)

Nearly every mistake traces back to skipping deliberate design in favor of configuring quickly. That completes Enterprise Structures and Chart of Accounts. Next up in this path: Oracle Fusion General Ledger, where you'll put this foundation to work recording real journal activity.
