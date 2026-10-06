# From Transactions to Financial Statements

This lesson doesn't introduce a single new concept. Instead, it walks the entire path, start to finish, from a single real-world business event all the way to its appearance on a financial statement — the complete **accounting cycle** this whole course has been building toward, one piece at a time.

## What you'll learn

- The full accounting cycle, as one continuous sequence
- A single transaction traced through every stage
- How every chapter of this course maps onto one stage of the cycle
- Why seeing the whole cycle at once matters more than any single piece of it

## The accounting cycle, end to end

1. **Transaction occurs** — a real business event happens.
2. **Journal entry recorded** — analyzed using the four-step method (lesson 7), formatted properly (lesson 14), following the normal-balance rules (lesson 5).
3. **Posted to accounts / subledgers** — the entry lands in the appropriate subledger or directly in the general ledger (lesson 16), building up each account's T-account balance (lesson 6).
4. **Adjusting entries at period-end** — accruals and deferrals (lesson 22) and depreciation (lesson 23) capture anything with no natural paper trail yet, following accrual accounting (lesson 19) and the matching principle (lesson 13).
5. **Trial balance prepared** — every account's balance is listed and checked for total debits equaling total credits (lesson 17), with errors diagnosed if it doesn't (lesson 18).
6. **Financial statements prepared** — the income statement (lesson 25), balance sheet (lesson 26), and cash flow statement (lesson 27) are built from the now-verified account balances.
7. **Period closed** — the period is locked against further postings (lesson 21), and, at year-end, revenue and expense accounts close into Retained Earnings (lesson 11).
8. **Reversing entries posted** — certain adjusting entries from step 4 are reversed at the start of the new period (lesson 15), and the cycle begins again.

## Tracing one transaction through the whole cycle

A fictional company, **Everhart Manufacturing Co.**, performs $15,000 of custom fabrication work for a client on March 20, to be paid in 45 days.

```
1. Transaction: $15,000 of work completed, billed on credit.

2-3. Journal entry, posted:
   Debit  Accounts Receivable   $15,000
   Credit Service Revenue                $15,000
   (posted to the Receivables subledger, which feeds the GL)

4. No adjustment needed - this transaction is already fully
   recorded; it didn't require an accrual or deferral itself.

5. Trial balance: Accounts Receivable and Service Revenue
   both reflect this $15,000, among all other balances,
   and debits still equal credits across the whole ledger.

6. Financial statements: the $15,000 appears in Revenue on
   the income statement, and the still-unpaid amount appears
   in Accounts Receivable on the balance sheet.

7. Period closes once April's payment doesn't change March's
   already-reported figures.
```

## Why seeing the whole cycle matters

Each individual lesson in this course taught one link in this chain extremely well, but an Oracle Fusion consultant's real job is understanding how the *whole chain* connects — because when a client says "this number on my income statement looks wrong," the actual cause could be sitting at any single link: a miscoded transaction, a missed adjusting entry, a account misclassification carried all the way to the trial balance. Seeing the complete cycle is what lets you narrow down where to look.

## Why this matters for Oracle Fusion

Every stage of this cycle has a direct, named counterpart somewhere in Oracle Fusion Financials: transactions originate in subledgers (Payables, Receivables, Assets), Subledger Accounting turns them into journal entries, General Ledger posts and summarizes them, period-close processes handle adjusting and reversing entries, and financial reporting tools generate the three statements. You now have the complete conceptual map before ever touching the software itself.

## Recap

The accounting cycle runs from a transaction, through a journal entry, posting, adjustments, a trial balance, financial statements, and period close, before beginning again. Every chapter of this course maps onto exactly one stage. Next up, the final lesson of this course, lesson 29: month-end and year-end close overview, a closer look at step 7.
