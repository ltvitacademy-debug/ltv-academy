# Receivables Activities

Transactions and receipts carry their own accounting. But a lot of what happens to a customer's balance after that isn't a transaction or a receipt at all — it's an adjustment, a write-off, a late charge, an unidentified cash deposit. Receivables activities exist to give each of those a default GL account so the person recording them doesn't have to pick one from scratch.

## What you'll learn

- What a receivables activity type actually is
- The main activity types you'll encounter and what each is used for
- Why every implementation needs at least one Adjustment activity

## What a receivables activity provides

A receivables activity is a small setup record: a name, an activity type, a default GL account (or an AutoAccounting reference instead of a fixed account), and sometimes a tax rate code. When someone performs the related action — entering an adjustment, writing off a receipt, recording miscellaneous cash — they select one of these activities, and its defaults drive the accounting instead of requiring manual account entry every time.

## Key activity types

- **Adjustment** – used when creating adjustments to a transaction's balance (lesson 30 covers adjustments in Chapter 6). Every Receivables implementation must define at least one Adjustment activity before any adjustment can be entered.
- **Miscellaneous Cash** – used for miscellaneous receipts: money received that isn't a payment against a customer transaction, like a rebate, an interest payment, or a tax refund. These receipts aren't applied to invoices; they post directly against the activity's account.
- **Late Charges** – used when a late charge policy creates charges (often structured as adjustments) against overdue transactions.
- **Receipt Write-offs** – used when writing off a small remaining balance on a receipt rather than chasing a trivial underpayment.
- **Credit Card Chargeback / Credit Card Refund** – used specifically for the credit-card-processing side of chargebacks and refunds, distinct from the invoice-level chargeback transaction class covered in Chapter 4.
- **Earned Discount / Unearned Discount** – used when a customer takes an early-payment discount correctly (earned) or takes it after the discount window has closed (unearned), so each gets its own account.
- **Bank Error** – used for correcting bank-side errors identified during reconciliation.

## A worked example

Northwind Fixtures Co. sets up an "AR Adjustments – Bad Debt" activity (type: Adjustment, GL account: a bad-debt expense account) and a "Early Payment Discount" activity (type: Earned Discount, GL account: a discounts-given contra-revenue account). When a $25 balance is adjusted off a closed invoice because the customer rounded their wire transfer down, the AR clerk selects the Adjustment activity, and the $25 posts automatically to bad-debt expense with no manual account entry. When Harborline Retail Group correctly takes its 2% early-payment discount on a $10,000 invoice, the $200 discount posts automatically to the Earned Discount activity's account.

## Recap

Receivables activities default the accounting for everything that isn't the transaction or receipt itself: adjustments, miscellaneous cash, write-offs, late charges, chargebacks/refunds, and discounts. At minimum, every implementation needs an Adjustment activity before anyone can adjust a balance. Next up, lesson 15: memo lines.
