# Ticket: Supplier Was Configured Incorrectly

**Chapter 2 · Payables Tickets · Lesson 7 of 7**

## What you'll learn

- The supplier → supplier site setup hierarchy, and which level wins when they disagree
- Why a setup fix is never retroactive on invoices already entered
- How to trace a wrong default back to where it actually came from
- A resolution note that separates "fix the setup" from "fix the data already affected by it"

## The ticket

> **Ticket #40339 — Cascade Outdoor Supply.** AP manager reports: "Every invoice we've entered for our new supplier, Alpine Trail Gear, defaulted to Net 30 payment terms. Our contract with them is Net 60. Did someone set this up wrong?" Severity: Medium.

## Supplier vs. supplier site: which one wins

Payment terms, pay group, and several other defaults can be set at both the **supplier** level and the **supplier site** level. When a site-level value is specified, it overrides the supplier-level value for invoices entered against that site — the site is more specific, and more specific wins. This matters here because the correct value might exist in one place while the invoice is actually defaulting from the other.

## Investigating

1. **Check the invoice.** It shows Net 30 payment terms, defaulted automatically (the clerk never typed it in).
2. **Check the supplier record** for Alpine Trail Gear. Payment terms at the supplier level: **Net 60** — correct.
3. **Check the supplier site** actually used on these invoices. Payment terms at the site level: **Net 30** — this is the override, and it's wrong.

## Root cause

Alpine Trail Gear's supplier-level payment terms were set up correctly (Net 60), but the specific supplier site used for these invoices had its own Net 30 payment terms entered during setup — likely copied from a template or a different supplier without being corrected — and the more specific site-level value is what Oracle actually applies.

## Resolving it — and why this needs two separate actions

This ticket has two parts that must be handled separately, not blended together:

1. **Fix the setup** so it doesn't happen again: correct the supplier site's payment terms to Net 60.
2. **Fix the data already affected**: the setup fix only changes what *defaults* on new invoices — it does not retroactively change payment terms already recorded on invoices entered before the fix. Each already-entered invoice with the wrong Net 30 terms needs to be corrected individually (if not yet paid) so it's actually due and payable on the correct schedule.

Skipping step 2 is a common mistake — fixing the setup feels like "fixing the problem," but every invoice entered under the wrong terms before the fix is still wrong until it's corrected individually.

## Documenting it

> **Ticket #40339 — Cascade Outdoor Supply.** AP manager reported invoices for Alpine Trail Gear defaulting to Net 30 instead of the contracted Net 60.
> **Root cause:** Supplier-level payment terms were correctly set to Net 60, but the specific supplier site used on these invoices had an incorrect site-level override of Net 30, which takes precedence over the supplier-level value.
> **Fix:** Corrected the supplier site's payment terms to Net 60. Identified 6 unpaid invoices entered under the wrong terms and corrected payment terms on each individually.
> **Verified:** New test invoice against this site now defaults correctly to Net 60; the 6 corrected invoices show the updated due dates.
> **Note:** Recommend reviewing other recently added supplier sites for the same mismatch between supplier-level and site-level payment terms.

## Key terms

| Term | Meaning |
|---|---|
| Supplier | The vendor record itself, holding default values |
| Supplier site | A specific address/purpose record under a supplier; site-level values override supplier-level values |
| Default | A value Oracle automatically populates on a new transaction, which the setup fix affects going forward only |

## Check yourself

Why doesn't correcting a supplier site's payment terms automatically fix invoices that were already entered under the wrong terms?
