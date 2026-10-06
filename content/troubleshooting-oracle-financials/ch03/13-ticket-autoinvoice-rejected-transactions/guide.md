# Ticket: AutoInvoice Rejected Transactions

**Chapter 3 · Receivables and Cash Tickets · Lesson 3 of 5**

## What you'll learn

- What AutoInvoice does, and the difference between a rejected line and an error line
- Why one bad tax rate code can take down an entire invoice, not just one line
- Where rejected transactions actually live, and how to read them
- A resolution note for a batch-level setup gap

## What AutoInvoice does

AutoInvoice pulls transaction lines from an interface table (fed by an external order or billing system) and turns them into real Receivables transactions. During import, it validates every line — customer, item, tax, accounting — and anything that fails gets diverted into **`RA_INTERFACE_ERRORS_ALL`** instead of becoming an invoice. The **AutoInvoice Execution Report** summarizes the run, but it draws a real distinction worth knowing: a line that's **rejected** for missing setup (like a missing customer account profile) shows up only as a count, with no reason given; a line that goes into **error** shows the actual error detail. That difference changes how you investigate.

## The ticket

> **Ticket #40441 — Meridian Steel Fabricators.** Billing coordinator reports: "This morning's AutoInvoice run shows 214 transactions imported and 18 rejected. I need to know what's wrong with those 18 before I manually create anything." Severity: High (daily billing run).

## Investigating

1. **Check the Execution Report.** 18 lines in error (not just "rejected" with no reason) — with actual messages.
2. **Query `RA_INTERFACE_ERRORS_ALL`** for this batch. All 18 errors point to the same cause: *"Invalid tax rate code."*
3. **Trace the source.** All 18 transactions came from one product line recently added in the upstream order system — a new SKU category whose orders are tagged with a tax rate code that was never set up in Oracle Receivables' tax configuration.

## Root cause

The upstream order system is sending a tax rate code for a new product category that doesn't exist in Oracle's tax rate setup, so every transaction tagged with it fails AutoInvoice's tax validation. Importantly, an invalid tax rate code rejects the **entire invoice**, not just the taxable line — if even one line on a multi-line invoice carries a bad tax code, none of that invoice's lines import.

## Resolving it

1. **Add the missing tax rate code** to Receivables tax configuration so it matches what the upstream system is actually sending (coordinating with whoever owns tax rates to confirm the correct rate, not just inventing one to make the error disappear).
2. **Correct the 18 interface rows** (or have the upstream system resend them) now that the tax code will validate.
3. **Re-run AutoInvoice** for just the corrected rows.

## Documenting it

> **Ticket #40441 — Meridian Steel Fabricators.** AutoInvoice run rejected 18 of 232 transactions, all with "Invalid tax rate code."
> **Root cause:** A new upstream product category sends a tax rate code that was never configured in Oracle Receivables' tax setup; an invalid tax rate code rejects the entire invoice, not just the affected line.
> **Fix:** Added the missing tax rate code to Receivables tax configuration (confirmed correct rate with Tax); corrected the 18 interface rows; re-ran AutoInvoice.
> **Verified:** All 18 transactions imported successfully on re-run; AutoInvoice Execution Report shows 0 errors for this batch.
> **Note:** Recommend the upstream order system team notify Receivables before adding any new product category/tax code combination, to avoid the same gap recurring.

## Key terms

| Term | Meaning |
|---|---|
| `RA_INTERFACE_ERRORS_ALL` | The table holding transaction lines AutoInvoice couldn't import, with error detail |
| Rejected vs. error | Rejected (missing setup) shows only a count; error shows the actual message |
| Invalid tax rate code | A validation failure that rejects the whole invoice, not just one line |

## Check yourself

Why did all 18 rejected transactions share the exact same cause, and why does that matter for how you'd fix this versus a batch of 18 unrelated errors?
