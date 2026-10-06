# Invoice Tax Basics

Chapter 3 has mentioned tax lines and tax options in passing several times without stopping on them. This closing lesson of the chapter does that, at the level a Payables user needs — not as a deep tax-configuration lesson (that belongs in a tax specialist's training), but enough to recognize what's happening on an invoice and why a tax amount shows up the way it does.

## What you'll learn

- That Oracle Fusion Tax, not Payables itself, drives the calculation
- What a tax determinant is, and why defaulted tax can be overridden
- What self-assessed tax is, and why it doesn't change the invoice total
- The difference between transaction tax (this lesson) and withholding tax (later lessons)

## Tax calculation is a shared service, not a Payables feature

Transaction tax on an invoice — sales tax, VAT, and similar — isn't calculated by some logic built into Payables itself. It's calculated by **Oracle Fusion Tax**, a shared tax engine used across Payables, Receivables, and other modules, based on the invoice's details and whatever tax configuration (rates, rules, jurisdictions) has been set up. Payables invoices — standard, prepayment, credit memo, debit memo, and expense report — all go through this same shared engine.

## Tax determinants drive the calculation

A **tax determinant** is one of the pieces of information on the invoice header or line that the tax engine actually uses to figure out which tax applies and at what rate — things like the ship-from/ship-to locations, the product or service category, and the parties involved. These determinants default onto the invoice automatically based on the supplier, item, and business unit, but a Payables user can review and, where appropriate, override them. Tax itself gets calculated automatically during validation, or on demand by viewing the tax lines or running a Calculate Taxes action.

## Self-assessed tax: a tax Brightfield owes, not the supplier

Sometimes a supplier doesn't charge tax on an invoice at all, but tax is still legally owed on the transaction — the purchaser, not the supplier, is responsible for remitting it. This is **self-assessed tax** (sometimes called reverse-charge tax). The distinctive behavior: a self-assessed tax doesn't change the invoice's total amount — the supplier still only gets paid what they billed — but Payables still calculates the tax amount internally and creates offsetting distributions so the tax liability is recorded without inflating what's actually paid to the supplier. You can see the self-assessed amount by looking at the detail tax lines, even though it never shows up as part of the number the supplier is paid.

## Transaction tax vs. withholding tax: don't confuse them

This lesson covers **transaction tax** — tax on the transaction itself, like sales tax or VAT. **Withholding tax** is a different thing entirely: an amount withheld from what's paid *to the supplier*, and remitted to a tax authority on the supplier's behalf (common for payments to certain contractors or international suppliers). Withholding concepts return in Chapter 5 alongside other special invoice handling; this lesson is strictly about tax on the transaction, not withheld from the payment.

## A worked example

Brightfield receives an invoice from **Solara Packaging Co.** for $1,000 of taxable goods, with an 8% sales tax determinant applying based on the ship-to location. Tax calculates automatically during validation: an $80 tax line is added, the invoice totals $1,080, and that full $1,080 is what gets paid to Solara. If instead this had been a self-assessed scenario (say, a cross-border service where Brightfield itself owes the tax), the invoice total would stay at $1,000 paid to the supplier, with the $80 recorded separately as a liability Brightfield owes directly to the tax authority.

## Recap

Transaction tax on Payables invoices is calculated by the shared Oracle Fusion Tax engine, driven by tax determinants that default in but can be reviewed and overridden. Self-assessed tax is owed by the purchaser rather than charged by the supplier, and doesn't change what the supplier is actually paid. This closes Chapter 3. Next up, Chapter 4: Validation, Holds and Approvals, starting with invoice validation itself.
