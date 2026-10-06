# Script — Subledger Accounting Methods

## Segment 1 (title)

You met the Subledger Accounting Method briefly back in lesson three, before you knew what an AAD was. Now with the full picture, this lesson revisits it: it's the object that collects one AAD per subledger application into the single configuration a ledger will actually use.

## Segment 2 (steps)

A Subledger Accounting Method is a named object that, for every subledger application a company uses, specifies exactly one AAD. Picture "Acme Standard Accounting Method": Payables maps to your customized Payables AAD, Receivables maps to the seeded, unmodified version, Fixed Assets maps to its own custom AAD. This is final assembly - rules became rule sets, rule sets became AADs, and now AADs assemble into one method.

## Segment 3 (code)

A method isn't required to be all-seeded or all-custom. It's completely normal for one application's AAD assignment to be the seeded version, and another application's to be a custom copy, independently of each other, inside the same method.

## Segment 4 (steps)

What happens if an application has no AAD assigned in the method? Say Cash Management is in use but nothing's mapped. Events from that application have nowhere to look up rules, and Create Accounting can't process them. That's a very common root cause behind "why didn't this transaction create a journal entry."

## Segment 5 (steps)

You'll troubleshoot exactly that scenario directly in chapter five. For now, just remember the check: when something doesn't account, confirm the subledger application in question actually has an AAD assigned inside the active method.

## Segment 6 (outro)

So remember: a method maps each subledger application to exactly one AAD, mixing seeded and custom freely. That completes the chain from rule to method. Up next, lesson thirteen: assigning methods to ledgers, where this method connects to an actual primary or secondary ledger.
