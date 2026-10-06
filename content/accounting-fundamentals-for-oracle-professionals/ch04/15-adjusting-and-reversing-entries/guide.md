# Adjusting and Reversing Entries

Most journal entries record something that already happened and was already documented (an invoice, a receipt, a contract). Adjusting entries are different: they exist purely to make the books accurate at period-end, for things that happened but haven't been formally recorded yet. Reversing entries exist to clean those adjustments up at the start of the next period.

## What you'll learn

- Why adjusting entries exist, and when they're made
- The main categories of adjusting entries
- What a reversing entry does, and why it's optional but extremely convenient
- How Oracle Fusion automates reversing entries specifically

## Why adjusting entries exist

Recall the matching principle from lesson 13: revenue and expenses belong in the period they're earned or incurred, not necessarily the period cash moves. In practice, some of those events don't generate an invoice or a receipt on their own — nobody sends you a bill for "wages your employees earned in the last three days of the month but won't be paid until next month's payroll run." **Adjusting entries** are made at the end of an accounting period specifically to capture these "no natural paper trail yet" events, so the financial statements for that period are accurate.

## Main categories of adjusting entries (previewed here, detailed in Chapter 5)

- **Accrued expenses**: incurred but not yet paid or billed (e.g., unpaid wages at month-end)
- **Accrued revenue**: earned but not yet billed or collected (e.g., interest earned on a loan the business made, not yet received)
- **Deferred (prepaid) expenses**: already paid, being gradually used up (e.g., the prepaid insurance from lesson 13)
- **Deferred (unearned) revenue**: already collected in cash, being gradually earned (e.g., the subscription example from lesson 12)
- **Depreciation**: allocating a long-term asset's cost across the periods it benefits (its own lesson, 23)

## Worked example: an accrued wage adjustment

A fictional retailer, **Larkspur Retail Group**, has employees who earned $3,000 of wages in the last few days of March, but payroll won't actually run (and pay them) until April 5.

```
March 31 (adjusting entry):
  Debit  Wages Expense      $3,000
  Credit Wages Payable               $3,000
Memo: Accrue wages earned but unpaid at month-end.
```

Without this entry, March's financial statements would understate expenses (and overstate net income) by $3,000 — a direct violation of the matching principle.

## Reversing entries

Once April 5 arrives and payroll actually runs, the business needs to record the real $3,000 cash payment. Without any cleanup, this risks double-counting the expense (once in March's adjustment, again if April's payroll run naively re-expenses the same $3,000). A **reversing entry**, dated the first day of the new period, simply flips the adjusting entry:

```
April 1 (reversing entry):
  Debit  Wages Payable      $3,000
  Credit Wages Expense               $3,000
```

Now, when the actual April 5 payroll entry debits Wages Expense and credits Cash for the full period's wages (which includes those same three days), the net effect across March and April comes out correct automatically — the reversal cancels out the right piece without anyone having to manually track which days were already accrued.

## Why Oracle Fusion automates this specifically

Oracle Fusion General Ledger has a built-in feature to flag a journal entry as "reverse this automatically on [a chosen date]," which is exactly the reversing-entry pattern from this lesson, done without a human remembering to create the second entry by hand. Recognizing this feature for what it is — an automation of a 500-year-old accounting technique, not a mysterious software trick — is exactly the kind of conceptual grounding this course is building.

## Recap

Adjusting entries capture period-end events with no natural paper trail, keeping the books aligned with the matching principle. Reversing entries, dated the start of the next period, flip an adjusting entry to prevent double-counting once the real transaction occurs. Oracle Fusion automates exactly this pattern. Next up, lesson 16: the general ledger and subledgers, where individual entries get aggregated into something reportable.
