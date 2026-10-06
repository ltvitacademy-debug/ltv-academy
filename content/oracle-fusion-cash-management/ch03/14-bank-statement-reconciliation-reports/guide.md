# Bank Statement Reconciliation Reports

Reconciliation produces a lot of activity — automatic matches, manual matches, exceptions, aging items. This lesson covers the reports a Cash Manager actually pulls to see that activity clearly, and when to reach for each one.

## What you'll learn

- The main reports used to monitor reconciliation
- What question each report is built to answer
- How these reports support month-end close
- How to read a Cash to General Ledger Reconciliation report specifically

## The core reports

- **Transactions Available for Reconciliation report** — lists system transactions that are open and eligible to be matched against a bank statement, but haven't been yet. This is the "what's still waiting" view from the system side, useful for spotting transactions that should have cleared by now but haven't found a statement counterpart.
- **Bank Statement reconciliation report (detail)** — shows, line by line, which statement lines reconciled, against which system transactions, and which remain unreconciled. This is the primary working report for a Cash Manager reviewing a specific statement.
- **Cash to General Ledger Reconciliation report** — compares the reconciled cash balance in Cash Management against the balance sitting in the GL cash account. Because posting reconciled transactions to GL depends on the Create Accounting process (previewed in Lesson 4, covered fully in Lesson 19), this report is where a Cash Manager confirms the two sides actually tie out, rather than assuming they do.

## Why the GL comparison report matters most at close

During month-end close, the single most important question is usually: does the cash shown in the General Ledger actually match what's reconciled in Cash Management? A difference between the two doesn't necessarily mean an error — it might just mean some reconciled transactions haven't been through Create Accounting yet — but it's a difference that has to be explained before the books can be considered closed, not one that can be waved away. The Cash to General Ledger Reconciliation report is built specifically to surface and quantify that difference.

## Using these reports together

A typical month-end workflow: pull the Transactions Available for Reconciliation report first, to catch anything that should already be matched but isn't. Work the Bank Statement reconciliation report's unreconciled items using the categories from Lesson 13. Finally, run the Cash to General Ledger Reconciliation report to confirm the GL and Cash Management now agree — if they don't, that gap points straight back to either an unreconciled item or a pending accounting run.

## A worked example

At month-end, Harborview Metals Inc.'s Cash Manager runs the Cash to General Ledger Reconciliation report on the operating account and finds a $4,200 difference. Checking the Transactions Available for Reconciliation report shows nothing obviously missing on the system side; checking the Bank Statement reconciliation report shows all lines reconciled. The remaining explanation is the correct one: $4,200 in already-reconciled transactions simply hadn't been through that day's Create Accounting run yet, and the gap closes automatically once it runs that evening.

## Key terms

| Term | Meaning |
|---|---|
| Transactions Available for Reconciliation report | Open system transactions not yet matched to a statement |
| Bank Statement reconciliation report | Line-by-line detail of what reconciled and what didn't, for one statement |
| Cash to General Ledger Reconciliation report | Compares reconciled cash balance to the GL cash account balance |

## Recap

Three reports cover the workflow: what's waiting on the system side, what matched (or didn't) on a given statement, and whether Cash Management and the General Ledger actually agree. That last comparison is what month-end close depends on. Next up, lesson 15: external cash transactions, the catch-all for cash activity that never existed anywhere else in Oracle.
