# Script — Expense Accounting

## Segment 1 (title)

Every approved expense report eventually needs a proper accounting entry - a debit to an expense account, a credit to a liability account, the same double-entry logic from Accounting Fundamentals. Let's see how Expenses builds that entry through Subledger Accounting, the same engine behind Payables and Receivables.

## Segment 2 (code)

Here's the basic entry. A cash-paid hotel expense debits Travel and Lodging Expense and credits Employee Expense Payable. The exact same hotel charge on a company-liability card debits the same expense account, but credits Corporate Card Payable instead. Same debit, different liability, depending on who the company now owes.

## Segment 3 (steps)

Expenses doesn't write directly to the General Ledger. It generates accounting events that Subledger Accounting interprets using rules - the same architecture as Payables and Receivables. That buys a complete audit trail from the original item to the GL journal, the ability to preview accounting before posting, and consistent multi-currency and intercompany handling without Expenses needing its own separate logic.

## Segment 4 (code)

Remember Priya's itemized hotel folio? Three expense items from one receipt means three accounting events. Hotel debits Travel and Lodging. The breakfast debits Business Meals. The personal movie charge is non-reimbursable - it still needs to be visible for policy tracking, but there's no liability credit, since the company isn't paying for it.

## Segment 5 (steps)

The expense account debited is identical either way a hotel gets paid - cash or card, it's still Travel and Lodging Expense. What changes is only the liability account credited, because that's what determines who Payables actually pays when the payment process runs: the employee, or the card issuer.

## Segment 6 (outro)

An approved report generates a debit to an expense account and a credit to a liability account, built through Subledger Accounting exactly like Payables and Receivables. Itemization multiplies accounting events, not complexity, and non-reimbursable items get tracked without creating a liability. Up next, lesson fifteen: following that liability all the way from Expenses, through Payables, to the General Ledger.
