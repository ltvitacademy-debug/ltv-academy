# Ticket: Receipt Applied to the Wrong Invoice

**Chapter 3 · Receivables and Cash Tickets · Lesson 2 of 5**

## What you'll learn

- How a customer receipt gets applied, and what "applied" actually means in Receivables
- Why a misapplied receipt creates two wrong balances, not one
- Unapplying and reapplying correctly, without losing the audit trail
- A resolution note that accounts for the downstream effects, not just the immediate fix

## The ticket

> **Ticket #40418 — BrightPath Facilities Group.** AR clerk reports: "Customer Vantage Retail Partners called — they say we're showing an invoice as unpaid that they already paid. Their check cleared weeks ago." Severity: Medium.

## What "applied" means

A receipt (a customer payment) isn't just recorded — it has to be **applied** to the specific invoice(s) it's paying. Until it's applied, a receipt can sit **on account**, visible as cash received but not matched to anything. Applying it reduces the open balance on the specific invoice(s) chosen. If a receipt gets applied to the *wrong* invoice, two things go wrong at once: the invoice that was actually paid still shows an open balance (because nothing reduced it), and the invoice it was mistakenly applied to shows paid or partially paid even though that customer never sent money for it.

## Investigating

1. **Find the receipt.** Vantage Retail Partners sent a payment for $4,100.00 three weeks ago, intended for invoice INV-9042.
2. **Check where it actually applied.** The receipt was applied to invoice INV-9039 instead — a different invoice from the same customer, for a similar (but not identical) amount, entered around the same time.
3. **Confirm the real intent.** The remittance advice attached to the original payment explicitly references INV-9042's invoice number — this was a clerical mis-keying when the receipt was applied, not an ambiguous payment.

## Root cause

The AR clerk applying the receipt selected the wrong invoice from a list of several open invoices for the same customer, applying a $4,100.00 payment intended for INV-9042 to INV-9039 instead, which happened to have a similar balance.

## Resolving it

**Unapply** the receipt from INV-9039 (restoring that invoice's open balance), then **apply** it correctly to INV-9042 (reducing that invoice's balance by $4,100.00). Both actions are tracked in the receipt's application history — nothing is deleted, so the record shows exactly what happened and when it was corrected, which matters if this is ever questioned later.

## Don't stop at the receipt — check what it affected downstream

A misapplied receipt doesn't just affect the two invoices directly. Before closing the ticket, check: did the customer's statement go out showing the wrong balance (Lesson 14 covers exactly this)? Did INV-9039 get flagged for a dunning letter because it looked unpaid when it was actually... also unpaid, just not for the reason it appeared? Is this customer's credit limit or aging bucket affected by either invoice's incorrect status? A full resolution traces and checks every place the wrong application could have had a visible effect, not just the two invoice balances.

## Documenting it

> **Ticket #40418 — BrightPath Facilities Group.** Customer Vantage Retail Partners' payment was applied to the wrong invoice.
> **Root cause:** A $4,100.00 receipt intended for invoice INV-9042 (per the attached remittance advice) was mistakenly applied to INV-9039, a different open invoice for the same customer with a similar balance.
> **Fix:** Unapplied the receipt from INV-9039; applied it correctly to INV-9042.
> **Verified:** INV-9042 now shows paid; INV-9039 correctly shows its original open balance. Confirmed no dunning notice had gone out referencing either invoice.
> **Note:** Recommend clerks confirm the specific invoice number on remittance advice before applying, particularly for customers with multiple similar-balance open invoices.

## Key terms

| Term | Meaning |
|---|---|
| Applied | A receipt matched to a specific invoice, reducing that invoice's open balance |
| On account | A receipt recorded as received but not yet applied to any invoice |
| Unapply / reapply | Reversing an incorrect application and applying the same receipt correctly, preserving history |

## Check yourself

Why does a single misapplied receipt create two incorrect balances instead of just one?
