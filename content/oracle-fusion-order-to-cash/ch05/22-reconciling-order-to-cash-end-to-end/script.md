# Script — Reconciling Order-to-Cash End to End

## Segment 1 (title)

Every lesson so far has shown one piece of SO-48217 in isolation. Reconciliation is checking that all those pieces actually agree with each other - that nothing was lost, duplicated, or left dangling. Let's walk the whole order through a reconciliation check.

## Segment 2 (steps)

Reconciling an O2C transaction means confirming quantity, amount, and status agree at every handoff: order to shipment, shipment to invoice, invoice to credit memo, invoice to receipt, subledger to GL. A transaction reconciles cleanly when every downstream document is fully explained by what came before it.

## Segment 3 (code)

Here's our order's checkpoints. Four hundred ordered equals four hundred shipped. Four hundred shipped equals four hundred invoiced at the net unit price. Twenty units returned equals two thousand, seven hundred fifty-five dollars credited. Fifty-five thousand, one hundred minus the credit equals fifty-two thousand, three hundred forty-five received. And the subledger entries match the posted GL balances.

## Segment 4 (steps)

Nobody reconciles every order by hand day to day - Fusion's own reports do most of this automatically. But when something doesn't tie out, a consultant needs exactly this checklist to find where the chain actually breaks, because it always breaks at one specific checkpoint, not everywhere at once.

## Segment 5 (outro)

That's the real skill here: checking handoffs in order, not assuming they agree. Chapter five is complete, and so is SO-48217's entire journey. Up next, chapter six: a full recap, new exception scenarios, and troubleshooting practice.
