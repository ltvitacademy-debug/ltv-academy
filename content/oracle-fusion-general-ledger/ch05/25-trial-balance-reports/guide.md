# Trial Balance Reports

**Chapter 5 · Balances, Inquiries and Monitoring · Lesson 25 of 37**

## What you'll learn

- What the General Ledger Trial Balance Report actually shows
- The difference between the Detail, Begin Year, End Year, and Results trial balance types
- Why a trial balance "balancing" doesn't mean the books are correct
- How a trial balance feeds financial statement preparation

## From interactive tools to a formal report

Lessons 22 through 24 covered interactive ways to look at balances — an inquiry, a watchlist, a pivot. The **Trial Balance Report** is different: it's a formal, point-in-time report that lists every account, its activity, and its ending balance for a ledger and a period, typically run and retained as part of the close process rather than used for ad hoc browsing.

At its core, a trial balance proves one mechanical fact: that total debits equal total credits across every account in the ledger. That's the origin of the name — accountants have historically used this report to "try the balance" of the books before closing.

## Trial balance type matters

When running the General Ledger Trial Balance Report, a key parameter is the **trial balance type**, which changes what the numbers represent:

- **Detail** — the default; prints every account in the selected range with its activity and ending balance
- **Begin Year** — shows balances as of the start of the fiscal year, useful for confirming opening balances carried forward correctly
- **End Year** — shows balances as of the end of the fiscal year, after any year-end adjustments
- **Results** — an income-statement-style view showing net results for the period

Oracle also offers a related **Trial Balance – Average Balances** report, which shows period, quarter, and year average-to-date balances as of an effective date — useful for industries (like banking) where average balances matter more than point-in-time snapshots.

## Running one for LTV Manufacturing Corporation

A controller closing March 2026 for **LTV Manufacturing Corporation** would run the Detail trial balance for the primary ledger, scoped to period Mar-2026, and review it line by line: does Cash look reasonable, did Accrued Payroll move the way payroll run data suggests it should, is there a balance in a suspense account that needs investigating before close. The report "balancing" — debits equal credits — is a prerequisite for closing the period, not proof the numbers are right.

## Balancing is necessary, not sufficient

This is the point new accountants most often miss: a trial balance that balances only confirms that every journal posted with equal debits and credits, which Oracle Fusion already enforces at journal entry regardless. It says nothing about whether an account was coded to the wrong cost center, whether an accrual was missed, or whether a journal posted to the right account for the wrong amount. A trial balance review is where a human looks for things that are *wrong but balanced* — which is most of what period-end review actually catches.

## Where the trial balance goes next

Once reviewed and accepted, the trial balance is the source data for financial statement preparation — the income statement and balance sheet are, structurally, just the trial balance's accounts regrouped and summarized into a different presentation. Lesson 26 covers the reports that support reviewing the journal activity *behind* the trial balance, and the audit trail that proves who did what.

## Key terms

| Term | Meaning |
|---|---|
| Trial Balance Report | A formal report listing every account's activity and ending balance for a ledger and period |
| Trial balance type | Parameter controlling whether the report shows Detail, Begin Year, End Year, or Results |
| Balancing | Confirms debits equal credits; does not confirm the numbers are correct |

## Recap

The Trial Balance Report is the formal, retained record that debits equal credits for a ledger and period, and it is the base data financial statements are built from — but balancing only proves mechanical correctness, not that every account was coded or valued correctly. Next up, lesson 26: Journal Reports and Audit Trails, the tools used to review what actually drove those balances.
