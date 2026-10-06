# Ticket: Payment Process Request Failed

**Chapter 2 · Payables Tickets · Lesson 6 of 7**

## What you'll learn

- The stages a Payment Process Request (PPR) moves through, and where each kind of failure happens
- "Failed Document Validation" and what it's actually telling you
- Why a PPR can reject a specific invoice silently rather than reject the whole batch
- A resolution note for a missing payee bank account

## PPR, in stages

A Payment Process Request bundles eligible invoices into a batch and moves them through **Select → Build → Format → Confirm**. Select gathers eligible invoices. Build attempts to construct the actual payment documents. Format produces the output file sent to the bank. Confirm finalizes the payment. A failure can happen at any of these stages, and the error you see depends entirely on which one it is — a Build-stage validation failure looks nothing like a Format-stage file issue, even though a clerk might describe both simply as "the payment run failed."

## The ticket

> **Ticket #40301 — Meridian Steel Fabricators.** AP supervisor reports: "Ran the weekly payment batch, it shows Failed Document Validation. 46 invoices were supposed to be in it." Severity: High.

## Investigating

1. **Open the PPR and view its status.** **Failed Document Validation** — this is a Build-stage failure, meaning Oracle successfully selected invoices but couldn't build valid payment documents for at least one of them.
2. **Open the Resolve Payment Validation Errors page**, which lists each invoice that failed validation and why, rather than failing the whole batch opaquely.
3. **Read the specific error.** One supplier, Keystone Rigging Supply, shows: *"Document Payee Bank Account Number is required."* The other 45 invoices validated fine.

## Root cause

Keystone Rigging Supply was recently added as a new supplier, and electronic payment was selected as the payment method on its supplier site, but no bank account was ever entered for that site — so Build correctly could not construct an EFT payment document with no destination account.

## Resolving it

Two valid paths, same principle as earlier holds — fix the actual missing setup, don't just force something through:

- **Correct the supplier setup**: add the missing bank account to Keystone Rigging Supply's supplier site, then resubmit the PPR for just that invoice (or the whole batch).
- If the bank account truly isn't available yet, **remove that one invoice from this batch** so the other 45 aren't held up, and pay Keystone separately once the account is on file.

Here, the supervisor confirms Keystone's bank account was received from the supplier that morning — it just hadn't been entered yet. The correct fix is adding it to the supplier site before resubmitting.

## Documenting it

> **Ticket #40301 — Meridian Steel Fabricators.** Weekly Payment Process Request failed with Failed Document Validation.
> **Root cause:** One invoice (Keystone Rigging Supply) had no bank account on its supplier site despite electronic payment being selected as the payment method; the other 45 invoices validated correctly.
> **Fix:** Entered the supplier's bank account (received that morning) on the Keystone Rigging Supply supplier site; resubmitted the Payment Process Request.
> **Verified:** PPR completed successfully for all 46 invoices; payment file confirmed.
> **Note:** Recommend new-supplier onboarding checklist confirm bank account entry before the supplier's first scheduled payment run.

## Key terms

| Term | Meaning |
|---|---|
| Payment Process Request (PPR) | The process that selects, builds, formats, and confirms a batch of payments |
| Failed Document Validation | A Build-stage failure — Oracle selected invoices but couldn't build valid payment documents for one or more of them |
| Resolve Payment Validation Errors | The page that lists exactly which invoices failed Build validation and why |

## Check yourself

Why does a Build-stage PPR failure usually point you to one specific invoice rather than the whole batch, and where do you go to find out which one and why?
