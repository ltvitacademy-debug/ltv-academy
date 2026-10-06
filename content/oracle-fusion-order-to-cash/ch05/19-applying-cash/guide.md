# Applying Cash

Twenty-eight days after SO-48217's invoice date, Harborview Industrial Supply pays. This lesson covers how that payment actually gets recorded and matched to the right invoice in Oracle Fusion, including the method Harborview's bank uses to send it.

## What you'll learn

- The difference between receipt creation and receipt application
- How lockbox processing automates both for high-volume payments
- What happens when an application isn't perfectly clean
- How Harborview's $52,345.00 payment gets applied to SO-48217

## Two separate actions: create, then apply

A cash receipt involves two distinct actions. **Creating** the receipt records that money arrived — an amount, a date, a payment method, a remitter. **Applying** the receipt decides which open invoice(s) that money pays off, reducing their open balances. These can happen in the same action or be split apart, and a receipt can sit "on account," created but not yet applied, if it's not immediately clear which invoice it belongs to.

## Lockbox: automating both steps at scale

Harborview, like most of LTV Manufacturing's customers, pays by mailing a check to a bank lockbox rather than wiring money or logging into a portal. **Lockbox processing** is how Oracle Fusion handles this at scale: the remittance bank scans the checks and the accompanying remittance data, and sends that data to Oracle Fusion as a file. The lockbox process then runs in stages — importing that file into a staging area, validating the data, and finally creating and attempting to automatically apply receipts, using the invoice number and amount the customer referenced on their remittance. When Harborview mails their check referencing SO-48217's invoice number for the exact $52,345.00 balance, the lockbox process creates the receipt and applies it to that invoice automatically, with no manual intervention required.

## When it's not perfectly clean

Automatic application depends on the remittance data matching an open invoice cleanly. If Harborview had referenced the wrong invoice number, paid a slightly different amount, or sent one check covering multiple invoices without itemizing them, Receivables would be unable to apply the receipt with full confidence. In that case, the receipt still gets created — the cash is recorded — but it generates a list of recommended matches for a cash applications specialist to review and apply manually, rather than failing outright. This is exactly why an unapplied or "on account" receipt shows up as a routine, expected part of a collections team's daily work, not a sign that something is broken.

## SO-48217's payment

Harborview's check, remitted exactly against SO-48217's invoice for $52,345.00, arrives through lockbox. The receipt is created and automatically applied in full against that invoice, bringing its open balance to zero. The receivable that opened in lesson 18 is now closed — but closing it in Receivables isn't the same as the accounting being finished, which is where the next lesson goes.

## Recap

A cash receipt involves creating the record of cash arriving and applying it to specific invoices, and lockbox processing automates both for high-volume payments when remittance data matches cleanly — otherwise, a receipt is created but left for manual application. Harborview's exact, correctly-referenced payment lets lockbox automatically close SO-48217's $52,345.00 balance. Next up, lesson 20: the accounting entries this entire cycle — invoice, credit memo, and receipt — actually generates.
