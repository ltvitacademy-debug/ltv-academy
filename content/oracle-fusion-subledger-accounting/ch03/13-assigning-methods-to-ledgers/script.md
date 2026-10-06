# Script — Assigning Methods to Ledgers

## Segment 1 (title)

You now have a complete accounting method, built from AADs, built from rules. This lesson closes the loop: how that method actually gets connected to a real ledger, and what that means when a company has more than one ledger.

## Segment 2 (steps)

Back in General Ledger, you learned a ledger is defined by four things: a Chart of Accounts, a calendar, a currency, and an accounting method. That fourth element is what this course has spent twelve lessons building toward. You select it by name on the ledger, the same way you'd select a calendar or currency - and it's a ledger-level assignment, not a business-unit-level one.

## Segment 3 (steps)

Why ledger-level? Because the ledger is what actually gets debited and credited - the Chart of Accounts and trial balance live there. A business unit is mainly an operational and security construct layered on top. Since the accounting method determines how transactions become GL journal entries, and journal entries live in a ledger, that's where the assignment belongs.

## Segment 4 (steps)

A company can have a primary ledger and secondary ledgers recording the same transactions for a different reporting purpose. Each ledger is defined independently and carries its own accounting method assignment - a primary ledger built for local GAAP, a secondary ledger built for IFRS, same underlying transactions, different methods. Full detail comes in chapter six.

## Segment 5 (code)

Once a ledger has a method assigned, every event any subledger raises for that ledger processes using that method's AADs. Changing that assignment is a significant, carefully controlled action - it changes how every future transaction accounts, across every subledger, for that ledger.

## Segment 6 (outro)

So remember: the accounting method is a core ledger attribute, assigned at the ledger, not the business unit, and primary and secondary ledgers can each carry a different one. That closes out chapter three's configuration. Up next, lesson fourteen: validating and activating definitions, the final check before any of this can be used.
