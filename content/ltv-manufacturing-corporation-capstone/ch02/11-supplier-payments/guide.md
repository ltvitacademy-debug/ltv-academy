# Supplier Payments

**Chapter 2 · Running the Business · Lesson 11 of 25**

Two Meridian invoices get paid in January: the bearings invoice from lesson 10, and a smaller, routine invoice for a separate replenishment order. Both payments go out clean from LTV's side — but one of them is about to have a problem on the bank's side that nobody at LTV will see until the bank statement loads.

## What you'll learn

- How Chen Liu builds and submits a Payment Process Request for Meridian's invoices
- The two separate payments this creates, and their amounts
- Why "the payment posted correctly in Oracle Fusion" doesn't guarantee the bank received it only once
- What Chapter 2's bank reconciliation lesson is about to discover

## The two invoices to pay

| Invoice | Amount | What it's for |
|---|---|---|
| INV-MER-88341 | $18,400.00 | The PB-4400 bearings from lessons 9-10 |
| INV-MER-88290 | $9,200.00 | A routine replenishment order for smaller MRO parts, unrelated to the bearings |

Both are validated, approved, and ready to pay by mid-January.

## Building the payment process request

Chen Liu selects both Meridian invoices into a single **Payment Process Request**, paid by Electronic Funds Transfer from Regions Bank account ...7734 (lesson 8), using the EFT payment method configured on Meridian's supplier record (lesson 6):

- **PMT-21094** — EFT, $18,400.00, pays INV-MER-88341
- **PMT-21087** — EFT, $9,200.00, pays INV-MER-88290

The payment process request formats, builds, and transmits the payment file on **January 10**. Both payments post in Oracle Fusion exactly once each, debiting Accounts Payable — Trade (2110) and crediting Cash — Operating (1110), both under cost center 420 and Company 1000. Oracle Fusion's own records are completely correct: one payment event per invoice, no duplicates, no errors.

## What happens next, outside Oracle Fusion

The payment file transmits to Regions Bank once. What the bank's ACH processor actually *does* with that file is not something Oracle Fusion controls or can see — and this is exactly where PMT-21087's $9,200.00 payment to Meridian runs into trouble. The bank's processor retransmits the file a second time due to a network timeout retry on its end, and Meridian's account at its own bank receives two $9,200.00 EFT credits instead of one.

LTV's books are right. Oracle Fusion shows one $9,200.00 disbursement, matching one validated invoice. The problem exists entirely outside the system you're configuring — on the bank's side — and it won't surface until lesson 16 loads January's bank statement and finds Regions Bank's account debited for $9,200.00 twice.

## Why this matters for a consultant

Not every month-end discrepancy is a configuration mistake or a user error inside Oracle Fusion. Sometimes the subledger and the GL are both exactly right, and the break is between the GL and an external source — the bank. Recognizing that distinction, instead of assuming every variance is "something we did wrong in the system," is itself a skill this capstone is testing.

## Key terms

| Term | Meaning |
|---|---|
| Payment Process Request | A batch of approved invoices grouped, formatted, and transmitted as one or more payments |
| Reconciling item | A difference between two sets of records (here, the GL and the bank) that doesn't mean either side's own records are wrong |

## Recap

Chen Liu pays both Meridian invoices in January — PMT-21094 for $18,400.00 and PMT-21087 for $9,200.00 — and Oracle Fusion's records are completely accurate for both. Unknown to anyone at LTV yet, the bank's processor duplicates PMT-21087's transmission, debiting Regions Bank's account twice for the same $9,200.00 payment. Next up, lesson 12: customer invoicing, where Harborview Industrial Supply's order becomes a Receivables invoice.
