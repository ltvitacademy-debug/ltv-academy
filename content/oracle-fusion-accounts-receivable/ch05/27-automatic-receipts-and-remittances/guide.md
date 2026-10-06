# Automatic Receipts and Remittances

Every receipt covered so far has been entered manually by a clerk. For a business with recurring customers on standing payment arrangements — direct debit, pre-authorized bank transfers — manually keying every receipt doesn't scale. Oracle Fusion Receivables supports **automatic receipts**: receipts the system creates itself, in bulk, for transactions that are eligible, based on rules configured in advance.

## What you'll learn

- What qualifies a transaction for automatic receipt creation
- The automatic receipts batch process: create, approve, format, confirm, remit
- What a remittance batch is and why it exists
- Risk controls built into the automatic process

## Why automatic receipts exist

Picture a company with hundreds of customers on standing direct-debit agreements: it's authorized to pull payment directly from each customer's bank account on or near the due date. Nobody should have to manually create hundreds of individual receipts every week for this. Automatic receipts let Receivables identify every transaction that is due, that belongs to a customer set up for automatic collection, and generate the receipts as a batch.

## Eligibility for automatic receipts

A transaction is only eligible for automatic receipt creation if several conditions line up:

- The customer (or the specific transaction) is assigned a **receipt method** whose receipt class has a creation method of **Automatic**
- The transaction's due date falls within the **lead days** configured for the batch (the gap between the batch run date and the due date must be within an allowed window)
- The transaction total is greater than or equal to a configured minimum receipt amount

Receivables compares every open, eligible transaction against these rules each time an automatic receipt batch runs, and pulls in everything that qualifies.

## The batch process: create, approve, format, confirm, remit

Automatic receipts move through a defined sequence, and a company can choose how much of it runs unattended:

1. **Create** — Receivables generates the batch of receipts for every eligible transaction.
2. **Approve** — someone (or an automated step) reviews and approves the batch before it becomes final — a control point to catch anything unexpected before money actually moves.
3. **Format** — the batch is formatted into the output file or document the bank or payment network expects.
4. **Confirm** — the receipts are confirmed as real, finalizing them in Receivables.
5. **Remit** — the confirmed receipts are sent (remitted) to the bank for actual processing/collection.

A company can configure the receipt class to stop at any of these stages and require a manual step, or to run all the way through unattended for a fully automated process.

## Remittance batches

A **remittance batch** groups confirmed receipts together to send to the bank in one submission rather than one at a time. Receivables selects eligible receipts — ordered by maturity date, then amount — and includes them in the batch up to a configured maximum remittance total. This mirrors how banks actually prefer to receive deposits: in batches, not as a flood of one-off transactions.

Fictional example: Larkspur Furnishings Inc. has 40 customers on automatic direct debit. Every Friday, the automatic receipts batch creates 40 receipts for whatever invoices are due, a controller approves the batch, it's formatted into the bank's required file layout, confirmed, and remitted to the bank in one submission — instead of 40 manual entries.

## Recap

Automatic receipts let Receivables create receipts in bulk for transactions that meet configured eligibility rules — the right receipt method, due date within lead days, amount above the minimum. The batch moves through create, approve, format, confirm, and remit, with configurable manual checkpoints along the way, and a remittance batch groups confirmed receipts for one submission to the bank. Next up, lesson 28: lockbox processing, where the bank itself supplies the payment data.
