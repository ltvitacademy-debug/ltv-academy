# Payments and Payment Applications

An invoice sitting unpaid isn't the end of the story — eventually a payment has to go out, and that payment has to be tracked against the invoice (or invoices) it settles. This lesson separates three ideas that are easy to blur together: the schedule of when a payment is expected, the actual application of a payment to an invoice, and the physical payment document itself.

## What you'll learn

- What AP_PAYMENT_SCHEDULES_ALL tracks, and how it differs from an actual payment
- What AP_INVOICE_PAYMENTS_ALL records, and why it's a many-to-many relationship
- Where the disbursement document itself (the check or EFT) is represented
- Why "scheduled," "applied," and "disbursed" are three different states, not one

## The schedule: a plan, not a payment

When an invoice is validated, Oracle Fusion calculates when it's due to be paid and under what terms, based on payment terms configured for that supplier or invoice. That plan — due dates, discount terms, amounts expected — is stored in `AP_PAYMENT_SCHEDULES_ALL`, with one row needed for each time a payment is intended to be made against the invoice. It's important to be precise here: a payment schedule is a **plan**. It exists the moment an invoice is validated, whether or not any money has actually moved yet.

## The application: linking a payment to an invoice

Once a payment is actually made, the link between that payment and the invoice(s) it settles is recorded in `AP_INVOICE_PAYMENTS_ALL`. This is a many-to-many relationship in practice: a single invoice can be paid across multiple payments (partial payments over time), and a single payment can cover multiple invoices at once (a batch payment to one supplier covering several outstanding invoices). Each row in this table records the amount applied in that specific pairing — so summing this table's `AMOUNT` column for a given invoice, filtered to that invoice's `INVOICE_ID`, is how you'd determine how much of an invoice has actually been paid so far, as opposed to just scheduled.

## The payment document itself

`AP_INVOICE_PAYMENTS_ALL` records that an invoice and a payment were linked, but the actual disbursement document — the check number, the EFT reference, the payment method — is generated and tracked through Oracle Payments, the module with the `IBY_` prefix introduced in lesson 5 for bank account storage. Oracle Payments owns the physical mechanics of disbursement: selecting a payment method, formatting a payment file for the bank, and recording what was actually sent. This is a deliberate architectural choice in Fusion: the disbursement engine is shared across products (any module that needs to pay someone uses the same engine), rather than Payables maintaining its own private "checks" table the way older systems sometimes did.

## Three different states, not one

It helps to keep these as three separate questions you could ask about the same invoice:

- **Scheduled** — what does `AP_PAYMENT_SCHEDULES_ALL` say is due, and when?
- **Applied** — what does `AP_INVOICE_PAYMENTS_ALL` say has actually been matched to a payment?
- **Disbursed** — has Oracle Payments actually sent money, and by what method?

An invoice can be fully scheduled but not yet applied; it can be applied to a payment that hasn't finished disbursing. Collapsing these into a single "is it paid?" question is exactly the kind of shortcut that produces wrong answers later — a theme this course returns to in Chapter 3's later lessons on status and lifecycle columns.

## Recap

`AP_PAYMENT_SCHEDULES_ALL` tracks the planned due dates and amounts for an invoice. `AP_INVOICE_PAYMENTS_ALL` records the actual many-to-many linkage between invoices and the payments applied against them. The physical disbursement — the check or EFT itself — is tracked in Oracle Payments (`IBY_`), a shared engine across products. Next up, lesson 10: the Receivables side of this same pattern — customer transactions and the receipts applied against them.
