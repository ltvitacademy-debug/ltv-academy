# Subledger Accounting and General Ledger Posting

**Chapter 2 · Running the Business · Lesson 17 of 25**

This lesson runs Create Accounting across January's activity and posts it to the General Ledger — closing out Chapter 2. It also plants the last two of Chapter 3's six problems: a missing Subledger Accounting rule, and a journal that never got submitted.

## What you'll learn

- How Create Accounting turns subledger transactions into GL journals
- What happens when a transaction has no applicable Account Rule
- The intercompany journal Victor Okafor prepares but doesn't post
- The complete state Chapter 2 hands off to Chapter 3

## Running Create Accounting

Sarah Lindqvist, LTV's senior accountant, runs **Create Accounting** for January across Payables, Receivables, and Fixed Assets, then transfers the results to the General Ledger. Almost everything processes cleanly: the Meridian invoices and payments, Harborview's control panel invoice, FA-10452's depreciation (as miscategorized), and the routine activity throughout the month all generate accounting and post without issue.

## The accounts that fail

Fourteen January Receivables transactions don't process. Each one is a **freight-out charge** — the same kind of charge first introduced on Harborview's invoice in lesson 12 — crediting account **7850 (Freight Out — Customer Shipments)**. Account 7850 was added to the chart of accounts in December (lesson 5), but the **Subledger Accounting Account Rule** that tells Receivables which account to credit for a "Freight Charge" transaction type was never updated to include it — the rule still only recognizes the accounts that existed before 7850 was created.

Create Accounting's result for these 14 transactions: **accounting status "Incomplete," error: no applicable Account Rule found.** Total value stuck, not posted to the General Ledger: **$4,250.00**. Sarah notes the error in her working papers, intending to add the missing Account Rule and rerun Create Accounting before period close — but a separate fire drill elsewhere pulls her away, and it doesn't get fixed before January 31.

## The journal that doesn't get posted

Separately, Victor Okafor, LTV's controller, prepares January's routine **intercompany overhead allocation journal** — the US parent's Corporate Overhead cost center (510) allocates a portion of shared corporate costs to the Canadian subsidiary, consistent with the intercompany design from lesson 5:

- **Journal:** INTERCO-JAN-0131
- **Amount:** $27,750.00
- **From:** 1000-510-7110-2000-000 (US entity, Corporate Overhead, Overhead Allocation Expense, intercompany leg to Canada)
- **To:** 2000-510-7110-1000-000 (Canadian entity, mirrored overhead expense, intercompany leg to US)

Victor enters and saves the journal, intending to review it once more before submitting it for posting. He gets pulled into reviewing the same fire drill Sarah is dealing with, and the journal is left sitting in **Draft / Unposted** status at month-end — complete, balanced, and ready to post, but never actually posted.

## Chapter 2's complete state, going into Chapter 3

Six problems now exist, quietly, inside a month that otherwise ran cleanly:

1. An unreversed December GRNI accrual ($18,400.00), double-counting Meridian's bearing invoice (lesson 10)
2. A misapplied cash receipt, overstating one Harborview invoice and leaving another falsely open (lesson 13)
3. A miscategorized fixed asset overstating January depreciation by $1,208.34 (lessons 14-15)
4. An unreconciled $9,200.00 bank variance from a duplicated EFT transmission (lesson 16)
5. Fourteen Receivables transactions, $4,250.00, stuck Incomplete for lack of an Account Rule (this lesson)
6. An unposted $27,750.00 intercompany overhead allocation journal (this lesson)

Every one of these is individually explainable, individually small enough to seem manageable, and individually easy to miss under end-of-month time pressure. Together, they're why January 31 doesn't go smoothly.

## Key terms

| Term | Meaning |
|---|---|
| Account Rule | A Subledger Accounting rule that determines which GL account a given transaction type and attribute combination posts to |
| Accounting status: Incomplete | A subledger transaction that Create Accounting could not generate a full accounting entry for |

## Recap

Create Accounting posts January cleanly except for 14 Receivables freight-out transactions ($4,250.00) stuck Incomplete for lack of an Account Rule, and a complete but unposted $27,750.00 intercompany overhead journal. Chapter 2 now ends with all six of Chapter 3's problems quietly in place. Next up, Chapter 3 begins with lesson 18: the CFO's call — the books don't balance.
