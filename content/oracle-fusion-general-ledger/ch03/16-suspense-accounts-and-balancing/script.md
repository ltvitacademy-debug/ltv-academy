# Script — Suspense Accounts and Balancing

## Segment 1 (title)

Back in lesson six, we established that a journal has to balance to be completed. Suspense accounts are the deliberate, narrow exception to that rule. Let's see when they actually kick in.

## Segment 2 (code)

Picture an interfaced journal that's out of balance by seventeen cents, due to a rounding difference upstream. With suspense posting enabled, General Ledger doesn't reject it — it automatically adds a balancing line against a designated suspense account, and the journal posts.

## Segment 3 (steps)

You can define a default suspense account for the whole ledger, and optionally more specific ones tied to a particular source and category combination, using the exact same targeting lesson seven set up. If an unbalanced journal's source and category match one of those specific pairs, that dedicated account gets used; otherwise, General Ledger falls back to the default.

## Segment 4 (steps)

Here's what matters most: a suspense balance represents a real discrepancy that hasn't been explained yet, not a resolved transaction. It's not a place to park money — it's a flag that something upstream needs investigating.

## Segment 5 (outro)

Good practice treats a non-zero suspense balance as something to clear during the close process, which we'll get to in chapter seven. A growing, unexplained suspense balance is a classic audit red flag. Next up, chapter four: automating journals, starting with recurring journal types.
