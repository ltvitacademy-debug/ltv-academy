# Creating Standard Invoices

With invoice types established, this lesson gets hands-on with the one you'll create constantly: the standard, non-PO invoice. The goal here is the invoice **header** — the fields that identify what the invoice is and who it's from — leaving invoice lines and distributions, the part that says what it's actually for, to lesson 14.

## What you'll learn

- The required fields on a standard invoice header
- Which values default in from the supplier and site, and why you'd still override them
- Why the invoice number field matters more than it looks
- What happens immediately after you save a new invoice

## The required header fields

At minimum, a standard invoice header needs:

- **Business unit** — which BU this invoice belongs to, determining its ledger and setup.
- **Supplier** and **supplier site** — who the invoice is from, and which site (with its own address, terms, and tax setup) applies.
- **Invoice number** — the identifier the supplier themselves assigned to their bill, not an internal Brightfield sequence number.
- **Invoice date** — the date on the supplier's invoice, which (from lesson 5) is usually the terms date payment terms calculate from.
- **Invoice amount** and **invoice currency** — the total the invoice is for, and what currency it's denominated in.

## Defaults from the supplier and site, and overriding them

Once a supplier site is selected, several fields default in automatically rather than requiring re-entry: payment terms default from the site's configured terms, and the default remit-to or bill-to information follows from the site's addresses. These defaults exist to save data entry on the common case, not to lock the invoice in stone — if Solara Packaging Co.'s site defaults to Net 30 but this particular invoice came with a special one-time Net 15 arrangement, the payment terms field on the invoice itself can simply be changed, and that override applies only to this invoice.

## Why the invoice number field is more important than it looks

The invoice number isn't a Brightfield-generated sequence — it's whatever number the supplier printed on their own bill. This matters because Payables checks for **duplicate invoice numbers per supplier**: if "INV-4471" from Vantree Industrial Parts has already been entered once, entering it again under the same supplier triggers a duplicate warning, which is one of the most effective, low-effort fraud and double-payment controls in the whole module. Typing the supplier's actual invoice number accurately, rather than inventing a placeholder, is what makes that control work at all.

## A worked example

Brightfield enters a standard invoice from **Vantree Industrial Parts**: business unit "Brightfield US," supplier site "Columbus Distribution," invoice number "INV-4471" (Vantree's own number), invoice date June 1, invoice amount $4,000.00 in USD. Payment terms default in from the site as "Net 30," which is accepted as-is for this invoice.

## What happens after you save

Saving the header (and, as lesson 14 covers, its lines) does not mean the invoice is done. It still needs to pass **validation** — the process that checks tolerances, required fields, and matching rules — before it can move toward approval and payment. Chapter 4 covers validation and the holds it can produce in detail; for now, just know that saving an invoice and validating it are two separate steps, matching the four-status model from lesson 2.

## Recap

A standard invoice header needs a business unit, supplier and site, the supplier's own invoice number, invoice date, and amount/currency; payment terms and address defaults come from the site but can be overridden per invoice. Accurate invoice numbers power Payables' duplicate-detection control. Next up, lesson 14: invoice lines and distributions, where the invoice says what it's actually for.
