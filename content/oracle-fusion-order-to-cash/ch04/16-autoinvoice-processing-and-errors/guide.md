# AutoInvoice Processing and Errors

AutoInvoice runs against the staged data from lesson 15. Most of the time, for a well-configured customer and item, it runs cleanly and a transaction appears in Receivables within minutes. This lesson covers what AutoInvoice actually checks, the difference between a rejection and an error, and walks through a realistic scenario where SO-48217's line does not pass cleanly the first time.

## What you'll learn

- What AutoInvoice validates before creating a transaction
- The difference between a "rejected" record and an "error" record
- The Manage AutoInvoice Lines tool used to investigate and fix problems
- A specific, realistic AutoInvoice failure on SO-48217, and how it gets resolved

## What AutoInvoice checks

AutoInvoice validates each staged record against current Receivables setup before it will create a transaction: does the customer exist and is their account active, is the item recognized, does a valid transaction type and source apply, is the currency and tax setup complete, and — critically — can a **remit-to address** be determined for this customer and site. A remit-to address tells the customer where to send payment, and AutoInvoice will not create a transaction it can't tell the customer how to pay.

## Rejected vs. error

These aren't quite the same outcome:

- A **rejected** record usually fails for a structural or setup reason — like a missing remit-to address — and the standard AutoInvoice Execution Report may only show a count of rejected records without always detailing why, which is part of why the investigation tool in the next section matters.
- An **error** record is one that was processed but flagged with a more specific, visible reason, such as a data mismatch Receivables can point to directly.

In both cases, the record stays in the interface tables — nothing is lost — but nothing becomes a real transaction until it's corrected and AutoInvoice runs again.

## A realistic failure: missing remit-to on SO-48217

Harborview Industrial Supply was recently set up with a brand-new secondary bill-to site for a regional office, and that new site was never assigned a remit-to address. When AutoInvoice runs against SO-48217's staged line, it cannot determine where Harborview should send payment for that site, and the line is rejected.

The correction happens through **Manage AutoInvoice Lines**, which lets a user search the interface tables, review rejected and errored records with their reasons, make corrections (here, assigning the missing remit-to address to the site setup, or correcting the bill-to site reference on the line), and flag the corrected rows so the next AutoInvoice run picks them up. Once the remit-to address exists, AutoInvoice is submitted again, the line passes validation this time, and a real Receivables transaction is finally created for SO-48217.

## Recap

AutoInvoice validates staged data against customer, item, currency, tax, and remit-to setup before creating a transaction; records that don't pass are rejected or errored but remain safely in the interface tables for correction. SO-48217's line was rejected once, due to a missing remit-to address on a new bill-to site, and corrected using Manage AutoInvoice Lines before a second AutoInvoice run succeeded. Next up, lesson 17: the financial side of the 20 damaged units from lesson 13 — the credit memo.
