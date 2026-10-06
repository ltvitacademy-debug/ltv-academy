# Script — Invoices and Invoice Lines

## Segment 1 (title)

Chapter two gave you the supplier and customer identity layer. Chapter three puts real transactions on top of it, starting with the most common document in Payables: the supplier invoice.

## Segment 2 (code)

Every supplier invoice creates one row in AP_INVOICES_ALL, primary key INVOICE_ID. The header carries the invoice number, date, total amount, and a VENDOR_ID column tying it back to the supplier from chapter two. Because it's an ALL table, every invoice also carries a business unit context.

## Segment 3 (steps)

An invoice is rarely just one amount. AP_INVOICE_LINES_ALL stores the line-level detail, keyed by invoice I-D plus line number. AP_INVOICES_ALL is the parent, AP_INVOICE_LINES_ALL is the child — one header, many lines, the same pattern from our naming-conventions lesson.

## Segment 4 (steps)

Here's the trip-up for new consultants: an invoice line is not the same as an accounting distribution. A single line can split across multiple accounts. That split lives in AP_INVOICE_DISTRIBUTIONS_ALL — generated manually, from a distribution set, or automatically when a line matches a purchase order. It's the distributions, not the lines, that feed Subledger Accounting.

## Segment 5 (outro)

So the chain is: invoice header, then lines, then distributions — each level repeating the parent's key. If anyone ever asks why an invoice posted to a particular account, the distributions table is where that answer lives, not the header or the lines. Up next, lesson nine: payments, and how they connect back to the invoices they settle.
