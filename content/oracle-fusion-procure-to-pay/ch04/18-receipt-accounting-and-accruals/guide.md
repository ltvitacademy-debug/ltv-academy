# Receipt Accounting and Accruals

The bearings are received and accepted. Before Meridian's invoice ever shows up, the receipt itself already triggers accounting. This lesson covers Receipt Accounting and the concept of an accrual — the liability a company owes for goods it has received but not yet been invoiced for.

## What you'll learn

- What Receipt Accounting is and why it runs on receipt, not on invoice
- Perpetual (on-receipt) accrual versus period-end accrual
- Why inventory items and expense items are treated differently
- The accrual journal created for LTV's bearing receipt

## Why accounting happens at receipt, not just at invoice

A business that has received goods owes money for them, whether or not the supplier's paperwork has caught up yet. Oracle Fusion's **Receipt Accounting** subledger exists to recognize that obligation at the moment of receipt, rather than waiting for an invoice that might arrive days or weeks later. This matters for accurate financial statements: without it, a company that received goods on the last day of a month, but had not yet received the invoice, would understate its liabilities for that period.

## Perpetual accrual versus period-end accrual

Oracle Fusion supports two accrual approaches, and the choice depends on the item type:

- **Perpetual accrual (on-receipt accrual)** — the receiving transaction automatically creates an accrual journal the moment the receipt is recorded, debiting a receiving inventory or expense account and crediting an uninvoiced receipts (accrual) liability account. This is **required** for inventory (asset) items — Oracle Fusion always accrues inventory items on receipt, with no option to defer it.
- **Period-end accrual** — used only for expense items, and only when configured that way. Instead of accruing automatically on receipt, the system waits, and if no invoice has shown up by period end, a separate process (Create Uninvoiced Receipt Accruals) generates the accrual and a reversing journal, which is later completed and transferred to the General Ledger through a follow-up process (Create Accrual Reversal Accounting).

LTV Manufacturing Corporation has Industrial Pump Bearing, Model PB-4400 configured as an expense item (as established back in lesson 8's distribution discussion) with the **Accrue Expense Items option set to receipt**, meaning it behaves like perpetual accrual even though it is an expense item: the accrual journal is created automatically as soon as Priya's receipt is recorded, rather than waiting for period end.

## The journal created for LTV's bearing receipt

When Priya's receipt is accepted, Receipt Accounting creates a journal that debits the maintenance expense account (the same account the requisition's distribution pointed to back in lesson 8) and credits an **uninvoiced receipts accrual** liability account, for the full received value of the 50 bearings. This liability sits on LTV's books, representing what the company now owes Meridian, even though no invoice exists yet. When Chen eventually matches and accounts Meridian's invoice in Chapter 5, the invoice accounting will debit this same accrual account and credit accounts payable liability — clearing the accrual and replacing it with a liability to a specific, named supplier invoice.

## Recap

Receipt Accounting recognizes a company's obligation for received goods immediately, rather than waiting for the supplier's invoice. Inventory items always accrue on receipt; expense items can use either on-receipt or period-end accrual, and LTV's bearing is configured for on-receipt. The receipt debits the maintenance expense account and credits an uninvoiced receipts accrual account, which the eventual invoice will clear. Next up, Chapter 5: matching Meridian's invoice against this receipt and the purchase order.
