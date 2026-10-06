# Payment and Accounting

Meridian's invoice matched cleanly in the previous lesson. This lesson covers the two steps left before the transaction's money side is finished: validating and accounting the invoice, and actually paying Meridian.

## What you'll learn

- What invoice validation checks, beyond matching
- How the invoice's accounting clears the receipt accrual
- How a Payment Process Request selects and pays invoices
- Where payment terms and discounts fit into timing

## Validation: the last gate before accounting

Once Chen's invoice passes matching, it still has to be **validated** — a broader check confirming the invoice has no holds of any kind (matching holds, but also other holds such as a tax calculation issue, a missing required field, or a budgetary control failure if encumbrance accounting applies), and that the invoice distributions are complete and valid. An invoice with any unresolved hold cannot be accounted or paid. Meridian's invoice, matching cleanly within tolerance and complete in its distribution, passes validation without issue.

## Accounting the invoice: clearing the accrual

Once validated, the invoice can be **accounted** — generating the accounting entries in Payables and transferring them (via Subledger Accounting) toward the General Ledger. For a receipt-accrued expense item like LTV's bearings, the invoice accounting debits the same **uninvoiced receipts accrual** account that Priya's receipt credited back in lesson 18, and credits **accounts payable liability**. This is the step that converts a generic "we owe someone for received goods" accrual into a specific "we owe Meridian Bearing Supply Co., per invoice number such-and-such" liability. If the invoice amount is different from the receipt's accrued amount — within tolerance — a small variance account may absorb the difference, which is one more reason tolerances and accurate pricing matter.

## Paying the invoice: Payment Process Requests

Validated, accounted invoices become eligible for payment, but Oracle Fusion Payables does not usually pay one invoice at a time by hand. A **Payment Process Request (PPR)** selects a batch of eligible invoices — based on criteria like due date, supplier, business unit, or payment method — and generates payments for all of them together, often as part of a regular payment run. Meridian's invoice, once validated and accounted, becomes eligible for the next PPR that matches its criteria, and is paid alongside whatever other supplier invoices are also due around the same time, rather than in a special one-off payment just for this transaction.

## Payment terms and discounts

**Payment terms** (such as Net 30, defaulted from Meridian's supplier setup back in lesson 11) determine the invoice's due date, which in turn affects when a PPR picks it up for payment. Some payment terms also include an **early payment discount** (for example, 2% off if paid within 10 days) — if LTV's payment terms with Meridian include one, the PPR can take the discount automatically by paying within the discount window, reducing the cash LTV actually pays out, with the difference recorded as a discount taken rather than a dispute over price.

## Recap

Validation confirms an invoice is free of holds before it can be accounted or paid. Accounting the invoice clears the receipt's accrual and replaces it with a specific accounts payable liability. Payment happens through a batch Payment Process Request, timed by payment terms and any available early payment discount. Next up, lesson 21: following this transaction's accounting the rest of the way into the General Ledger.
