# Invoices and Invoice Lines

Chapter 2 gave you the supplier and customer identity layer. Chapter 3 puts real transactions on top of it, starting with the most common document in Payables: the supplier invoice. This lesson focuses on how an invoice and its lines are represented, and how the amounts on an invoice become the distributions that eventually feed accounting.

## What you'll learn

- The table that stores invoice headers, and its key columns
- The table that stores invoice lines, and how it relates to the header
- What an invoice distribution is, and why lines and distributions aren't the same thing
- How an invoice connects back to the supplier from Chapter 2

## Invoice headers: AP_INVOICES_ALL

Every supplier invoice entered into Payables creates one row in `AP_INVOICES_ALL`. The primary key is `INVOICE_ID`. This header row carries the invoice-level information you'd expect: the invoice number, invoice date, total amount, and — critically — the `VENDOR_ID` column that ties the invoice back to the `POZ_SUPPLIERS` row (and, through that, back to `HZ_PARTIES`) covered in lesson 5. Because this is an `_ALL` table, every invoice also carries a business unit context, so two invoices with the same invoice number from two different business units are not actually a duplicate.

## Invoice lines: AP_INVOICE_LINES_ALL

An invoice is rarely just one amount. `AP_INVOICE_LINES_ALL` stores the line-level detail — item descriptions, quantities, and line amounts — with a composite key of `INVOICE_ID` and `LINE_NUMBER`. Lines can be entered manually, generated automatically from a distribution set, or imported from an open interface (common when invoices arrive through an automated capture or integration process). `AP_INVOICES_ALL` is the parent of `AP_INVOICE_LINES_ALL`: one invoice header, many lines, exactly the parent/child pattern from lesson 4 where the child table repeats the parent's primary key.

## Distributions: where accounting actually happens

Here's a distinction that trips up a lot of new consultants: an invoice line is not the same thing as an accounting distribution. A single invoice line can be split across multiple accounts — part of a line's amount might belong to one cost center, another part to a different one. That split lives in `AP_INVOICE_DISTRIBUTIONS_ALL`, which holds one row per distribution, generated either manually, from a distribution set chosen at the invoice header, or automatically when a line is matched to a purchase order or receipt (in which case the matched PO or receipt supplies the accounting). It's the distribution rows — not the invoice lines themselves — that eventually feed into Subledger Accounting, the engine from Chapter 1, on the invoice's way to the General Ledger.

## Putting the chain together

```
AP_INVOICES_ALL (header)
    └── AP_INVOICE_LINES_ALL (what was billed)
            └── AP_INVOICE_DISTRIBUTIONS_ALL (how it's accounted)
```

Every level repeats the parent key: lines carry `INVOICE_ID`, and distributions carry both `INVOICE_ID` and a reference back to their line. If you're ever asked "why did this invoice post to that account," the distributions table — not the header, not the lines — is where that answer actually lives.

## Recap

`AP_INVOICES_ALL` stores invoice headers, keyed by `INVOICE_ID`, with a `VENDOR_ID` tying back to the supplier. `AP_INVOICE_LINES_ALL` stores line-level detail as a child of the header. `AP_INVOICE_DISTRIBUTIONS_ALL` stores the actual accounting split beneath each line, which is what ultimately reaches the General Ledger. Next up, lesson 9: payments, and how a payment connects back to the invoices it settles.
