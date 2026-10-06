# Lesson 39 — Accrual Reconciliation

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 39 of 42**

## What you'll learn

- Why an accrual account exists between receiving and invoicing
- What causes an accrual balance to grow, and what causes it to clear
- What the Payables Accrual Reconciliation Report is for
- What an unexplained accrual balance usually means

## The gap between "received" and "invoiced"

For purchase orders set up to **accrue at receipt**, receiving goods creates an accounting entry *before* any invoice has arrived — a debit to inventory or expense, and a credit to an **accrual (uninvoiced receipts) liability account**. This is distinct from the AP liability account used once an invoice is actually validated (Lesson 36). The accrual account exists specifically to represent "we know we owe something for this, but the bill hasn't shown up yet."

| Event | Entry |
|---|---|
| Goods received (accrue at receipt) | Debit Inventory/Expense, Credit **Accrual** liability |
| Invoice matched and validated | Debit **Accrual** liability, Credit **AP** liability |

When the invoice finally arrives and matches the receipt, it clears the accrual account and moves the liability over to the normal AP liability account instead. In a clean world, every dollar that goes into the accrual account eventually clears out the same way.

## Why the balance doesn't always clear cleanly

Reality introduces timing gaps and outright errors:

- **Timing**: a receipt posted this period, invoice not expected until next period — a normal, temporary balance
- **Quantity mismatches**: a receipt was logged incorrectly (wrong quantity) and never corrected
- **Cancelled orders**: goods were received and accrued, then the PO was cancelled before an invoice was ever submitted
- **Return-to-vendor without a correcting invoice**: goods were returned, but the accrual entry from the original receipt was never reversed

## The Payables Accrual Reconciliation Report

This report (sometimes paired with an accrual "rebuild" or "clear" utility) lists the accrual account's components: what's still open awaiting invoice, what's cleared, and crucially, anything that **doesn't tie cleanly** to an open receipt or a cleared transaction — the balances that need investigation.

### Illustrative example

**Meridian Office Supply** (fictional, reused from Lesson 25) has an accrual account showing a $3,400 balance at month end for a single receipt of office chairs. The AP team runs the Accrual Reconciliation Report and finds:

| Component | Amount |
|---|---|
| Receipt awaiting invoice (normal, invoice expected next week) | $2,100 |
| Receipt tied to a PO cancelled last month, invoice never coming | $1,300 |
| **Total accrual balance** | **$3,400** |

The $2,100 is expected and will clear naturally next week. The $1,300 is a real problem — it needs a manual correcting entry, because no invoice will ever arrive to clear it on its own.

## Why this matters at close

An accrual balance that's grown for months without anyone reviewing it is a red flag during period close — it usually means either real liabilities are being invoiced unusually slowly, or there are stale, uncorrected entries inflating the balance sheet.

## Key terms

| Term | Meaning |
|---|---|
| Accrual (uninvoiced receipts) account | The liability recognized at receipt, before an invoice exists |
| Accrue at receipt | A PO setting that triggers accounting at the receiving event |
| Payables Accrual Reconciliation Report | The report used to tie the accrual balance back to open receipts and catch stale entries |

## Check yourself

You're ready for Lesson 40 when you can answer, without looking: what two accounts does a receipt-then-invoice sequence move a liability through, in order?
