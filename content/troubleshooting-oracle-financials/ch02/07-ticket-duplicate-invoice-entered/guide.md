# Ticket: Duplicate Invoice Entered

**Chapter 2 · Payables Tickets · Lesson 4 of 7**

## What you'll learn

- The two duplicate invoice checks Payables runs, and what each one actually compares
- How to tell a true duplicate from a legitimate second invoice that merely looks similar
- Why overriding this hold carelessly risks an actual double payment
- A resolution note for a confirmed duplicate

## Two checks, not one

Oracle Fusion Payables runs a **standard duplicate invoice check** automatically, with nothing to configure: it compares business unit, supplier, supplier site, and invoice number. If those four match an existing invoice, a **Potential Duplicate Invoice** hold is placed. A separate, optional check — enabled through a lookup code — compares supplier, invoice type, amount, currency, and date instead, to catch invoices that arrived under a *different* invoice number but share the same financial fingerprint. BrightPath Facilities Group, where this ticket comes from, has the optional check enabled.

## The ticket

> **Ticket #40254 — BrightPath Facilities Group.** AP clerk reports: "System put a Potential Duplicate hold on an invoice from Allied Janitorial Services. I don't think it's actually a duplicate — can you check?" Severity: Medium.

## Investigating

1. **Open the Holds tab.** One hold: **Potential Duplicate Invoice**.
2. **Find the matching existing invoice.** Oracle flagged it against invoice INV-7731 — same supplier, same invoice type, same amount ($3,200.00), same currency, and the same date, but a *different* invoice number (INV-7731 vs. INV-7756).
3. **Go back to source documents.** Pulling the two source PDFs: they are literally the same monthly janitorial services invoice. The supplier's billing system generated a second PDF with a new reference number when the original was resent after an email bounce, and both versions were entered into Payables by two different clerks who didn't know about each other's entry.

## Root cause

This is a true duplicate, not a false positive: the same janitorial services charge was entered twice, under two different invoice numbers, because the supplier re-sent the same invoice and two different clerks each entered a copy without checking for an existing entry.

## Resolving it — carefully

The wrong move here is to just release the hold because the clerk "doesn't think it's a duplicate." The right move is to confirm against the actual source documents first, exactly as above. Once confirmed as a true duplicate:

- **Cancel or void the second invoice** (INV-7756) — do not pay it.
- Leave the original (INV-7731) to proceed through its normal validation and payment cycle.
- If the duplicate had *already* been paid before the hold caught it, this becomes a separate ticket: recovering an overpayment from the supplier, which is a different process entirely (and the reason this check exists in the first place — to catch it before payment, not after).

Not every Potential Duplicate hold is a true duplicate. A supplier can legitimately issue two separate invoices in the same month for the same dollar amount (a flat recurring fee, for instance) — same amount, same date pattern, different actual services. The investigation step — pulling the real source documents and comparing line by line — is what tells you which situation you're in. Never resolve this hold by assumption in either direction.

## Documenting it

> **Ticket #40254 — BrightPath Facilities Group.** AP clerk flagged a Potential Duplicate Invoice hold on an invoice from Allied Janitorial Services, requesting confirmation.
> **Root cause:** Confirmed true duplicate — the supplier resent the same monthly invoice after an email bounce, and two different clerks each entered a copy (INV-7731 and INV-7756) for the identical $3,200.00 charge.
> **Fix:** Canceled the duplicate invoice (INV-7756); original (INV-7731) proceeds normally.
> **Verified:** Confirmed by comparing both source PDFs line by line; only one invoice remains active for this charge.
> **Note:** Recommend clerks check Manage Invoices for an existing entry before re-entering a resent invoice from the same supplier and period.

## Key terms

| Term | Meaning |
|---|---|
| Standard duplicate check | Always-on check comparing business unit, supplier, supplier site, and invoice number |
| Optional duplicate check | Lookup-enabled check comparing supplier, invoice type, amount, currency, and date |
| Potential Duplicate Invoice hold | Placed when either check finds a match; requires investigation, not an automatic release |

## Check yourself

Why is it unsafe to resolve a Potential Duplicate Invoice hold purely based on a clerk's instinct, in either direction?
