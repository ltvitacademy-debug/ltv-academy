# Reconciling Procure-to-Pay End to End

LTV Manufacturing Corporation's bearing transaction has now reached the General Ledger. This lesson covers how a consultant confirms that the whole chain actually ties out — that nothing was lost, duplicated, or left dangling between requisition and ledger.

## What you'll learn

- What reconciliation means in a P2P context
- The AP trial balance to GL reconciliation
- The accrual reconciliation report and what an open balance there usually means
- A walk-through of LTV's transaction confirming each checkpoint

## Why reconciliation matters in P2P

Every stage of this course's transaction created a document and, often, an accounting entry: a requisition, a purchase order, a receipt with its accrual, an invoice with its accounting, and a payment. **Reconciliation** is the discipline of confirming that these pieces agree with each other and with the General Ledger — that the liability recorded in Payables matches what is sitting in GL, and that any accrual still open on the books corresponds to a real, explainable, in-progress transaction rather than an error.

## AP trial balance to GL reconciliation

One of the most common reconciliations an Oracle Fusion consultant performs is comparing the **Payables trial balance** (the total of all outstanding, unpaid AP liabilities per the Payables subledger) against the corresponding liability balance in the **General Ledger**. These two numbers should match, because Subledger Accounting is what transferred Payables' accounting into GL in the first place. If they do not match, the usual causes are: a transaction accounted in Payables but not yet transferred to GL, a manual journal entered directly in GL that bypassed the subledger, or a period-close timing difference between the two. For LTV's bearing invoice, once Chen's invoice is accounted and transferred, the amount owed to Meridian appears identically in both the Payables trial balance and the GL liability account — one of the checkpoints a consultant would confirm during a close.

## Accrual reconciliation

A separate but related check is **accrual reconciliation**: comparing the uninvoiced receipts accrual balance in Receipt Accounting against what is sitting in the corresponding GL accrual account, and investigating any receipts that have been accrued but still have no matching invoice. A lingering balance here, for a receipt with no invoice weeks after delivery, is often a sign that either the supplier never sent an invoice, or an invoice exists but is stuck somewhere (perhaps on a matching hold) before it reached accounting. For LTV's bearing transaction, once Meridian's invoice is received, matched, and accounted, the accrual clears to zero for this receipt — nothing is left open.

## Walking the whole chain, checkpoint by checkpoint

Putting the whole course together, a clean reconciliation of this transaction confirms: the requisition is approved with a complete distribution; the purchase order is Open and later Finally Closed with matching quantities; the receipt shows 50 units accepted with no open return; the invoice shows 50 units matched within tolerance with no hold; the AP liability it created matches GL; and the accrual it created and then cleared shows a zero remaining balance. Every one of those checkpoints resolving cleanly is what "the transaction worked correctly" actually means in Oracle Fusion Cloud — not a single screen, but the whole chain agreeing with itself.

## Recap

Reconciliation confirms that the documents and accounting created across requisition, purchase order, receipt, invoice, and payment agree with each other and with the General Ledger, most visibly through AP trial balance to GL reconciliation and accrual reconciliation. LTV's bearing transaction reconciles cleanly at every checkpoint. Next up, lesson 23: practicing how to troubleshoot this cycle when a checkpoint does not resolve cleanly.
