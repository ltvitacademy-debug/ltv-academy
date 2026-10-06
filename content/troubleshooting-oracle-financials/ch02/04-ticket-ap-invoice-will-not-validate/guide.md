# Ticket: AP Invoice Will Not Validate

**Chapter 2 · Payables Tickets · Lesson 1 of 7**

## What you'll learn

- What the Validate action actually checks before it will move an invoice forward
- The most common reason a non-PO invoice refuses to validate: distributions that don't foot to the header
- How to confirm the cause before touching the invoice
- A complete resolution note for this ticket

## The ticket

> **Ticket #40112 — Meridian Steel Fabricators.** AP clerk reports: "I can't validate invoice INV-88341 for Summit Freight Carriers. I click Validate and nothing happens — it just stays Incomplete." Severity: Medium.

## What Validate actually does

Clicking **Validate** on an invoice in Manage Invoices runs a set of checks before Oracle will let the invoice move toward payment: it confirms required fields are complete, it checks that invoice distributions sum to the invoice header amount, it calculates and checks tax, and — for a PO-matched invoice — it checks matching tolerances against the purchase order. If any of those checks fails, the invoice doesn't advance. Depending on which check failed, you'll either see a specific validation error message, or the invoice will move to a **hold** instead of staying Incomplete (holds are their own ticket type — see Lesson 5).

A clerk describing the symptom as "nothing happens" usually means one of two things: either an error message appeared and they didn't recognize it as meaningful, or the invoice moved to Incomplete/Needs Revalidation without an obvious visual change. Your first move, always, is to open the invoice yourself and try to validate it — read whatever Oracle actually says, rather than relying on the clerk's paraphrase.

## Investigating

1. **Open the invoice** in Manage Invoices and check its status. INV-88341 shows status **Incomplete**.
2. **Click Validate yourself.** Oracle returns: *"The invoice distribution total does not equal the invoice header amount."*
3. **Compare the numbers.** The invoice header total is $18,450.00. The sum of the existing distributions is $18,420.00 — a $30.00 shortfall.
4. **Find out why.** Reviewing the invoice lines, a $30.00 freight charge line was added to the invoice *after* the original distributions were generated from the header lines, so no distribution was ever created for it.

This is the single most common reason a non-PO invoice won't validate: the distributions (the GL account-level breakdown of the invoice) don't add up to the invoice header amount. Oracle will not validate — and therefore will not allow accounting or payment — on an invoice where the ledger-level detail doesn't foot to the transaction total.

## Root cause

A $30.00 freight line was added to the invoice after the header-driven distributions were generated, leaving the distribution total $30.00 short of the header amount. Validation correctly blocked the invoice rather than letting an unbalanced invoice proceed.

## Resolution

Add a distribution line for the missing $30.00 to the appropriate freight expense account, confirm the distribution total now equals $18,450.00, and re-run Validate.

## Documenting it

> **Ticket #40112 — Meridian Steel Fabricators.** AP clerk reported invoice INV-88341 (Summit Freight Carriers) would not validate.
> **Root cause:** Distribution total ($18,420.00) did not equal invoice header amount ($18,450.00) — a $30.00 freight line was added after the original distributions were generated.
> **Fix:** Added a $30.00 distribution to the freight expense account; distribution total now matches header total.
> **Verified:** Re-ran Validate — invoice moved to Validated status with no holds.
> **Note:** No setup change was required; this was a sequencing issue on this one invoice.

## Other causes worth knowing

Not every validation failure is a distribution mismatch. Other common causes of a non-PO invoice refusing to validate: a required field left blank (like a missing invoice distribution combination), an invalid or disabled account combination on a distribution, or — for PO-matched invoices — the purchase order itself being closed or on hold (covered in Lesson 6). The investigation method is the same regardless: read the actual message Oracle returns, and check it against the specific invoice's data before assuming the cause.

## Key terms

| Term | Meaning |
|---|---|
| Validate | The Payables action that checks an invoice's completeness, distribution balance, tax, and (if matched) PO tolerance before it can be accounted or paid |
| Distribution | The GL account-level breakdown of an invoice's amount |
| Incomplete | The invoice status before it has successfully validated |

## Check yourself

Before moving on: what specifically does Validate check on a non-PO invoice, and what's the most common reason it fails?
